import * as fs from 'fs';
import * as crypto from 'crypto';
import makeRemoveFile from './remove-file';
import makeRemoveDirectory from './remove-directory'
import makeGetChecksum from './make-get-checksum';
import makeGetFilenames from './make-get-filenames';

const removeFile = ({ path }) => makeRemoveFile({ fs }).removeFile({ path });

const removeDirectory = ({ path }) => makeRemoveDirectory({ fs }).removeDirectory({ path });

const getFilenames = ({ path }) => makeGetFilenames({ fs }).getFilenames({ path })

const getChecksum = ({ path }) => {
  return new Promise((resolve,reject) => {
    try {
      makeGetChecksum({ crypto, fs })
      .getChecksum({ path })
      .then(res => resolve(res))
    } catch (error) {
      reject(error)
    }
  })
}

export { removeFile, getChecksum, getFilenames, removeDirectory }

