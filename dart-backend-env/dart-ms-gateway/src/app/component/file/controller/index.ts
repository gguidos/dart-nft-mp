import Controller from '../../../initializers/express/decorators/controller-decorators';
import { 
	Get,
	Post,
  Put } from '../../../initializers/express/decorators/handlers-decorators';
import * as fs from 'fs';
import * as bodyparser from 'body-parser';
import * as multer from 'multer';
import * as path from 'path';
import got from 'got';

const storage = multer.diskStorage({
  destination: (req, file, cb) => { cb(null, `${path.resolve("./")}${path.sep}files`) },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1]
    cb(null, `${file.originalname.split('.')[0]}.${Date.now()}.${ext}`)
  }
})
const upload = multer({ storage }).single('file')

const bParser = (req, res, next) => {
  bodyparser.json({ limit: '50mb' })
  bodyparser.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000})
  next()
}

// function uploadAsync(req,res){
//   return new Promise(function(resolve,reject){
//     upload(req,res,function(err){
//         if(err !== undefined) return reject(err);
//         console.log('uploaded')
//         resolve(req.file);
//     });
//   });
// }

const FormData = require('form-data');

const logger = require('../../../libs/logger');

@Controller('/api/v1/file')
export class ExampleController {
  @Post('/', [ upload ] )
  post(req, res, next) {
    try {
      logger.info('[COMPONENT][CONTROLLER] initiating POST operation');
      if (fs.existsSync(req.file.path)) {
        const url = 'http://localhost:3006/api/v1/file';
        // const ws = fs.createWriteStream(path.resolve("./")+'/files/test.png')
        const buffer = fs.readFileSync(req.file.path);
        let fd = new FormData();
        // fd.append('fieldname', req.file.fieldname)
        // data.append('originalname', req.file.originalname)
        // data.append('encoding', req.file.encoding)
        // data.append('mimetype', req.file.mimetype)
        // fd.append('enctype', 'multipart/form-data')
        fd.append('file', buffer)
        // data.append('size', req.file.size)
        
        const options = {
          method: 'post',
          body: fd,
 
        }

        console.log(options)
        // delete options.headers['Content-Type'];
        // console.log(options)
        fetch(url, options)
        .then(response => {
          if (!response.ok) return { error: response.statusText};
          return response.json();
        }).then(data => {
          if (data && data.error) {
            return res.status(403).send({ data: data.error })
          }
          res.status(200).send(data)
          res.end()
        }).catch(err => {
          console.log(err)
          logger.error(err)
        })
      }
      
      fs.statSync(req.file.path)



    } catch (err) {
      return res.status(403).send({ data: err })
    }
  }
}