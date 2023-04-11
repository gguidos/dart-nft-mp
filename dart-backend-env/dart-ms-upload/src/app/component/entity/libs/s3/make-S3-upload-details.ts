export default function makeS3UploadObject() {
  return Object.freeze({ S3UploadObject })
  function S3UploadObject({ uploadDetails }) {
      const { 
        Bucket,
        Etag,
        Key,
        Location,
        key
      } = uploadDetails;
      return Object.freeze({
        bucket: () => Bucket,
        Etag: () => Etag,
        Key: () => Key,
        location: () => Location,
        key: () => key
    });
  }
}