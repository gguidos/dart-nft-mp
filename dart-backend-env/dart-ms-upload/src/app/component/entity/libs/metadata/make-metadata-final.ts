export default function makeFinalMetadataObject({
  makeFileMetadata
}) {
  return Object.freeze({ finalMetadataObject });
  function finalMetadataObject({ metadataElements }) {
    const {
      uploadID,
      fileMetadata,
      authorMetadata,
      IPFSRepoConfig,
      pinataResponse,
      s3UploadResponse
    } = metadataElements;

    return Object.freeze({
      uploadID: () => uploadID,
      fileMetadata: () => fileMetadata,
      IPFSRepoConfig: () => IPFSRepoConfig,
      pinataResponse: () => pinataResponse,
      s3UploadResponse: () => s3UploadResponse
    })
  }
}