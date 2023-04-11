import * as fs from 'fs';
import * as path from 'path';
import { create, globSource } from 'ipfs-core';
import * as Hash from 'ipfs-only-hash';
import * as crypto from 'crypto';
import makeRepoFolders from './make-repo-folders';
import makeIAPI from './make-ipfs-repo';
import makeIPFSHashesObj from './make-ipfs-hashes';
import makeCidsObject from './make-cids-object';
import makeIPFSFileObject from './make-ipfs-file-object';
import makeUpload from './make-ipfs-upload';
import makeIAPIStop from './make-iapi.stop';

const makeIPFSRepoFolders = () => makeRepoFolders({ fs, path }).ipfsRepoFolders();

const makeIPFSFile = ({ IPFSFile }) => makeIPFSFileObject().IPFSfileObject({ IPFSFile })

const IAPIStop = ({ IAPI }) => makeIAPIStop().IAPIStop({ IAPI })

const IAPIStart = ({ IPFSRepoPath }) => {
  return new Promise((resolve, reject) => {
    makeIAPI({
      create 
    })
    .IPFSRepo({ IPFSRepoPath })
    .then(res => resolve(res))
    .catch(err => reject(err))
  })
}

const makeIPFSUpload = ({ 
  filesFolderPath,
  IPFSRepoPath,
  IAPI 
}) => {
  return new Promise((resolve, reject) => {
    try {
    makeUpload({ 
      globSource,
      makeIPFSFile
    })
    .IPFSUpload({
      filesFolderPath,
      IPFSRepoPath,
      IAPI
    })
    .then(res => resolve(res))
    .catch(err => reject(err))
    } catch(err) {
      reject(err)
    }
  })
}

const makeIPFSRepo = ({ filesFolderPath, IPFSRepoPath, IAPI }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const IPFSRepoConfig = await makeIPFSUpload({ 
        filesFolderPath,
        IPFSRepoPath,
        IAPI
      })
      resolve(IPFSRepoConfig);
    
    } catch(err) {
      reject(err);
    }
  })
}

const makeCids = ({ cidProperties }) => makeCidsObject().cidsObject({ cidProperties }) 

const makeIPFSHashes = ({ filesFolderPath }) => {
  return new Promise((resolve, reject) => {
    try {
      makeIPFSHashesObj({
        fs,
        path,
        crypto,
        Hash,
        globSource,
        makeCids
      })
      .IPFSHashes({ filesFolderPath })
      .then(res => resolve(res))
      .catch(err => reject(err))
    } catch(err) {
      resolve(err)
    }
  })
}

export { makeIPFSRepoFolders, makeIPFSUpload, makeIPFSHashes, IAPIStart, IAPIStop }