import * as multer from 'multer';
const appRootDir = require('app-root-dir').get();
import * as path from 'path';
import * as fs from 'fs';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDirPath = `${path.resolve("./")}${path.sep}files/${req.body.username}`
    if (!fs.existsSync(uploadDirPath)) fs.mkdirSync(uploadDirPath)
    cb(null, uploadDirPath) 
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.')
    cb(null, `${file.originalname.split('.')[0]}-${Date.now()}.${ext[ext.length - 1]}`)
  }
})

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['jpg','png', 'mp3', 'mpeg', 'jpeg']
  if (!file || file.size < 1 ||
    !allowedTypes.includes(file.mimetype.split('/')[1])){
      cb(new Error("Not an allowed image file!!"), false);
    }
  cb(null, true);
};

const multiUpload = multer({ storage, fileFilter })

export default multiUpload