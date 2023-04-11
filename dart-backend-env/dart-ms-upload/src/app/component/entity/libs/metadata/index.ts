import * as fs from 'fs';
import * as path from 'path';
import makeMetadataFile from './make-metadata-file';
import makeMetadataObject from './make-metadata-object';

import { resolve } from 'url';

const saveMetadata = ({ metadataFilename, filesFolderPath, metadata }) => {
  return new Promise((resolve,reject) => {
    makeMetadataFile({ fs, path })
    .metadataFile({ metadataFilename, filesFolderPath, metadata })
    .then(() => resolve())
  })
}

const makeMetadata = ({ 
  metadata, 
  metadataFilename, 
  checksum 
}) => makeMetadataObject().metadataObject({ 
  metadata,
  metadataFilename,
  checksum 
})

export { saveMetadata, makeMetadata }