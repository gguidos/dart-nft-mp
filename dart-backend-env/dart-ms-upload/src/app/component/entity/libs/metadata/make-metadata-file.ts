import { resolve } from 'url';

export default function makeMetadataFile({
  fs,
  path
}) {
  return Object.freeze({ metadataFile })
  function metadataFile({ metadataFilename, filesFolderPath, metadata }) {
    return new Promise((resolve, reject) => {
      const filePath = filesFolderPath + path.sep + metadataFilename;
      fs.writeFileSync(filePath, JSON.stringify(metadata, null, 4));
      resolve()
    })
    
  }
}