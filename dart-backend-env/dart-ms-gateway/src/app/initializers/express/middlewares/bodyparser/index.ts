import * as bodyparser from 'body-parser';

const URLMiddleware = bodyparser.urlencoded({ extended: true });
const JSONMiddleware = bodyparser.json({type: '*/*'})

export default function bParser(req, res, next) {
  console.log(req.headers)
  // var type = req.get('Content-Type');
  //if (isMultipart.test(type)) return next();
  var isMultipart = /^multipart\//i;
  bodyparser.json({type: '*/*'})
  bodyparser.urlencoded({ extended: true });

  next();
  // console.log(req.headers)
  // next();
}