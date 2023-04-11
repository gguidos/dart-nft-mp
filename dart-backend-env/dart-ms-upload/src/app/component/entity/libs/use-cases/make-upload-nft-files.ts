export default function makeFilesUpload({
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
  getFilenames,
  IAPIStop,
  insertOneDocument,
  removeDirectory
}) {
  return Object.freeze({ filesUpload })
  function filesUpload({ files, username, metadata }) {
    return new Promise(async (resolve, reject) => {
      try {
        const file = files[0];
        const uploadID = await getFilesChecksum({ files });
        const fileObj = makeFileSettings({ file });
        const filesFolderPath = fileObj.destination();
        const metadataFilename = fileObj.originalname().split('.')[0] + '.json';
        const nMetadata = makeNewMetadata({ metadata, metadataFilename, checksum: uploadID });
        await saveMetadata({ metadataFilename, filesFolderPath, metadata: nMetadata });
        const uploaderXRPWallet = nMetadata.author.xrpWallet;
        const nftHashesObj = await makeIPFSHashes({ filesFolderPath });
        const nftHashes = nftHashesObj.nftHashes();
        const cids = nftHashesObj.cids();
        const IPFSRepoPath = makeIPFSRepoFolders().repoFolderPath();
        const IAPI = await IAPIStart({ IPFSRepoPath });
        const IPFSRepoConfigObj = await IPFSFilesUpload({ filesFolderPath, IPFSRepoPath, IAPI });
        const fileCIDS = getFileCIDS({ cids });
        console.log(fileCIDS)
        const pinataResponse = await makePinataPin({
          filesFolderPath,
          ipfsBaseString: IPFSRepoConfigObj['ipfsBaseString']
        });
        const pinataDetails = makeNewPinataDetails({ pinataResponse });
        const s3UploadResponse = await uploadsToS3({ filesFolderPath, username });
   
        const metadataFinal = {
          uploadID,
          uploaderXRPWallet,
          metadata: nMetadata,
          IPFSDetails: IPFSRepoConfigObj,
          pinataResponse,
          s3UploadResponse
        };

        const response = {
          uploadID,
          uploaderXRPWallet,
          ipfsAddress: IPFSRepoConfigObj['ipfsBaseStringURL'],
          metadata: nMetadata,
          ...fileCIDS
        }

        await IAPI.stop();
        removeDirectory({ path: IPFSRepoPath });
        removeDirectory({ path: filesFolderPath })
        insertOneDocument(metadataFinal)
        
        resolve(response);
      } catch(err) {
        console.log(err)
        reject(err);
      }
    })
  }

  async function getFilesChecksum({ files }) {
    return new Promise((resolve, reject) => {
      try {
        files = files.map(file => {
          getChecksum({ path: file.path })
          .then(res => {
            if (file.mimetype.split('/')[0] === 'audio') resolve(res)
          })
          .catch(err => reject(err))
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  async function IPFSFilesUpload({filesFolderPath, IPFSRepoPath, IAPI }) {
    return new Promise((resolve, reject) => {
      makeIPFSUpload({ filesFolderPath, IPFSRepoPath, IAPI })
      .then(res => {
        const IPFSDetails = makeIPFSDetails({ IPFSRepoConfigObj: res });
        resolve(IPFSDetails)
      })
      .catch(err => reject(err))
    })
  }

  function makeNewMetadata({ metadata, metadataFilename, checksum }){
    const nMetadataObj = makeMetadata({ metadata, metadataFilename, checksum })
    return Object.freeze({
      metadata: {
        title: nMetadataObj.metadata.title(),
        description: nMetadataObj.metadata.description(),
        filename: nMetadataObj.metadata.filename(),
        size: nMetadataObj.metadata.size(),
        cover: nMetadataObj.metadata.cover(),
        metadataFilename: nMetadataObj.metadata.metadataFilename(),
        checksum: nMetadataObj.metadata.checksum()
      },
      author: {
        name: nMetadataObj.author.name(),
        email: nMetadataObj.author.email(),
        xrpWallet: nMetadataObj.author.xrpWallet(),
      }
    })
  }

  function makeNewPinataDetails({ pinataResponse }) {
    const pinataDetaisObj = makePinataDetails({ data: pinataResponse });
    return Object.freeze({
      id: pinataDetaisObj.id(),
      ipfsHash: pinataDetaisObj.ipfsHash(),
      status: pinataDetaisObj.status(),
      name: pinataDetaisObj.name()
    })
  }

  function makeIPFSDetails({ IPFSRepoConfigObj }){
    return Object.freeze({
      ipfsBaseStringURL: IPFSRepoConfigObj.ipfsBaseStringURL(),
      ipfsBaseString: IPFSRepoConfigObj.ipfsBaseString(),
      IPFSFiles: IPFSRepoConfigObj.IPFSFiles()
    });
  }

  // function getNewFileURIS({ ipfsBaseString, path }) {
  //   const filenames = getFilenames({ path });
  //   let fileURIS = {}
  //   filenames.forEach(element => {
  //     const fileExt = element.split('.')[1]
  //     if (fileExt === 'mp3') {
  //       fileURIS['audioFile'] = element.cid.split('(')[1].split(')')[0];
  //       return;
  //     }
  //     if (fileExt === 'json') {
  //       fileURIS['jsonFile'] = ipfsBaseString + '/' + element;
  //       return;
  //     }
  //     fileURIS['coverFile'] = ipfsBaseString + '/' + element;
  //   });
  //   return fileURIS;
  // }

  function getFileCIDS({ cids }) {
    let fileCIDS = {}
    cids.forEach(element => {
      if (element.fileType === 'mp3') {
        fileCIDS['audioFile'] = element.cid;
        return;
      }
      if (element.fileType === 'json') {
        fileCIDS['jsonFile'] = element.cid;
        return;
      }
      fileCIDS['coverFile'] = element.cid;
    });
    return fileCIDS;
  }
}