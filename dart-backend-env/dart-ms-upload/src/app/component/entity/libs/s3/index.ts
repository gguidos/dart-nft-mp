import * as AWS from 'aws-sdk';
import * as fs from 'fs';
import * as path from 'path';
import makeUploadToS3 from './upload-file';
import makeUploadsToS3 from './upload-files';
import buildS3FileOpts from './make-save-file-opts';
import makeS3UploadDetailsObj from './make-S3-upload-details';
import { removeFile } from '../file-system';

const makeS3FileOpts = ({ file, username }) => 
  buildS3FileOpts({ pathSep: path.sep }).s3FileOpts({ file, username });

const uploadToS3 = ({ S3Options, uploadParams, filePath }) =>
  makeUploadToS3({ AWS, fs }).uploadToS3({ S3Options,uploadParams,filePath });

const makeS3UploadDetails = ({ uploadDetails }) => 
  makeS3UploadDetailsObj().S3UploadObject({ uploadDetails });

const uploadsToS3 = ({
  filesFolderPath,
  username
}) => {
  return new Promise((resolve, reject) => {
    try {
      makeUploadsToS3({
        fs,
        path,
        makeS3FileOpts,
        uploadToS3,
        makeS3UploadDetails,
        removeFile
      })
      .uploadsToS3({
        filesFolderPath,
        username
      })
      .then(res => resolve(res))
      .catch(err => reject(err));
    } catch(err) {
      reject(err)
    }
  });
}

export { uploadToS3, uploadsToS3 }