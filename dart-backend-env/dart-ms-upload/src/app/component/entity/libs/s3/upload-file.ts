export default function makeUploadToS3({ fs, AWS }) {
  return Object.freeze({ uploadToS3 })
  function uploadToS3({ S3Options,uploadParams,filePath }) {
    try {
      const fileStream = fs.createReadStream(filePath);
      uploadParams['Body'] = fileStream
      const s3 = new AWS.S3(S3Options)
      return s3.upload(uploadParams).promise()
    } catch(err) {
      return new Error(err)
    }
  }
}