import * as multer from 'multer';
const appRootDir = require('app-root-dir').get();
import * as path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => { cb(null, `${path.resolve("./")}${path.sep}files`) },
  filename: (req, file, cb) => {
    console.log(req)
    const ext = file.mimetype.split('/')[1]
    cb(null, `${file.originalname.split('.')[0]}-${Date.now()}.${ext}`)
  }
})

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['jpg','png']
  if (!file || file.size < 1 ||
    !allowedTypes.includes(file.mimetype.split("/")[1])){
      cb(new Error("Not an allowed image file!!"), false);
    }
  cb(null, true);
};

const upload = multer({ storage, fileFilter })

export default upload