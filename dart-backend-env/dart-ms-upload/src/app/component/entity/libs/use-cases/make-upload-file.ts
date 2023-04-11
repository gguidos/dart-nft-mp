export default function makeUploadFile({ makeS3FileOpts, uploadToS3, removeFile }) {
  return Object.freeze({ uploadFile });
  function uploadFile({ file, username }) {
    return new Promise ((resolve, reject) => {
      try {
        const s3FileOptsObj = makeS3FileOpts({ file, username });
        const S3Options = {
          region: s3FileOptsObj.getRegion(),
          accessKeyId: s3FileOptsObj.getAccessKeyId(),
          secretAccessKey: s3FileOptsObj.getSecretAccessKey()
        };
        const uploadParams = {
          Bucket: s3FileOptsObj.getBucket(),
          Key: s3FileOptsObj.getKey(),
          // ACL: s3FileOptsObj.getACL()
        }
        const filePath = s3FileOptsObj.getFilePath();
        uploadToS3({ S3Options, uploadParams, filePath }).then(res => {
          removeFile({ path: filePath })
          resolve(res.Location)
        })
      } catch(err) {
        reject(new Error(err))
      }
    })
  }
}