export default function buildS3FileOpts({ pathSep }) {
  return Object.freeze({ s3FileOpts })
  
  function s3FileOpts({ file, username }) {
    const {
      filename,
      path
    } = file;
    const bucket = process.env.AWS_BUCKET_NAME;
    const region = process.env.AWS_BUCKET_REGION;
    const accessKeyId = process.env.AWS_ACCESS_KEY;
    const secretAccessKey = process.env.AWS_SECRET;
    const key = `${username}${pathSep}${filename}`;
    const acl = 'public-read';

    return {
      getRegion: () => region,
      getAccessKeyId: () => accessKeyId,
      getSecretAccessKey: () => secretAccessKey,
      getBucket: () => bucket,
      getKey: () => key,
      getFilename: () => filename,
      getFilePath: () => path,
      getACL: () => acl
    }
  }
}