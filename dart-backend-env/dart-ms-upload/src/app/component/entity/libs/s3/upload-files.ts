import makeS3UploadObject from './make-S3-upload-details';

export default function makeUploadsToS3({
  fs,
  path,
  makeS3FileOpts,
  uploadToS3,
  makeS3UploadDetails,
  removeFile
}) {
  return Object.freeze({ uploadsToS3 })
  function uploadsToS3({ filesFolderPath, username }) {
    return new Promise(async (resolve, reject) => {
      try {
        const files = fs.readdirSync(filesFolderPath);
        const s3FolderPath = filesFolderPath.split(path.sep)

        const fileResults = await Promise.all(
          files.map(async filename => {
            const nFilePath = filesFolderPath + path.sep + filename;
            const nFile = { filename, path: nFilePath };
            const { S3Options, uploadParams, filePath } = createS3Options({ file: nFile, username });
            const uploadDetails = await uploadToS3({ S3Options, uploadParams, filePath });
            const s3UploadDetailsObj = makeS3UploadDetails({ uploadDetails });
            const s3UploadDetails = {
              bucket: s3UploadDetailsObj.bucket(),
              Etag: s3UploadDetailsObj.Etag(),
              Key: s3UploadDetailsObj.Key(),
              location: s3UploadDetailsObj.location(),
              key: s3UploadDetailsObj.key()
            }
            removeFile({ path: filePath })
            return s3UploadDetails;
          })
        );
        resolve(fileResults)
      } catch(err) {
        reject(err)
      }
    })
  }

  function createS3Options({ file, username }) {
    const s3FileOptsObj = makeS3FileOpts({ file, username });
    const S3Options = {
      region: s3FileOptsObj.getRegion(),
      accessKeyId: s3FileOptsObj.getAccessKeyId(),
      secretAccessKey: s3FileOptsObj.getSecretAccessKey()
    };
    const uploadParams = {
      Bucket: s3FileOptsObj.getBucket(),
      Key: s3FileOptsObj.getKey(),
    }
    const filePath = s3FileOptsObj.getFilePath();

    return Object.freeze({ S3Options, uploadParams, filePath })
  }
}