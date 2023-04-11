export default function makeMetadataObject() {
  return Object.freeze({ metadataObject })
  function metadataObject({ metadata, metadataFilename, checksum }) {
    const {
        title,
        description,
        filename,
        size,
        cover
    } = JSON.parse(metadata).metadata;

    const {
      name,
      email,
      xrpWallet
  } = JSON.parse(metadata).author;
    
    return Object.freeze({
      metadata: {
        title: () => title,
        description: () => description,
        filename: () => filename,
        size: () => size,
        cover: () => cover,
        metadataFilename: () => metadataFilename,
        checksum: () => checksum
      },
      author: {
        name: () => name,
        email: () => email,
        xrpWallet: () => xrpWallet
      }
    })
  }
}