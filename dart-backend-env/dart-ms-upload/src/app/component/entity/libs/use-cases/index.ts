import { makeS3FileOpts, makeFileSettings } from '../file';
import { uploadToS3, uploadsToS3 } from '../s3';
import { removeFile, getChecksum, getFilenames, removeDirectory } from '../file-system';
import { insertOneDocument } from '../data-access';
import {
  makeIPFSRepoFolders,
  IAPIStart,
  IAPIStop,
  makeIPFSUpload,
  makeIPFSHashes
} from '../ipfs';
import { makeMetadata, saveMetadata } from '../metadata';
import { makePinataPin, makePinataDetails } from '../pinata';
import makeUploadFile from './make-upload-file';
import makeFileUploads from './make-upload-nft-files';

const uploadNFTFiles = ({ files, metadata, username }) => {
  return new Promise((resolve, reject) => {
    makeFileUploads({
      getChecksum,
      makeFileSettings,
      makeMetadata,
      saveMetadata,
      makeIPFSHashes,
      makeIPFSRepoFolders,
      IAPIStart,
      makeIPFSUpload,
      makePinataPin,
      makePinataDetails,
      makeS3FileOpts,
      uploadsToS3,
      IAPIStop,
      getFilenames,
      insertOneDocument,
      removeDirectory
    })
    .filesUpload({ files, metadata, username })
    .then(res => resolve(res))
    .catch(err => resolve(err));
  });
}

const uploadFile = ({ file, username }) =>{
  return new Promise((resolve, reject) => {
    try { 
      makeUploadFile({
        makeS3FileOpts,
        uploadToS3,
        removeFile
      })
      .uploadFile({ file, username })
      .then(res => resolve(res))
      .catch(err => reject(err));
    } catch(err) {
      resolve(err);
    }
  });
}

export default { uploadFile, uploadNFTFiles }