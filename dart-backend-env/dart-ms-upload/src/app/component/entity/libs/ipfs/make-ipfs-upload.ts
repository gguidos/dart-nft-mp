import { makeIPFSRepoFolders } from '.';

export default function makeIPFSUpload({
  globSource,
  makeIPFSFile
}) {
  return Object.freeze({ IPFSUpload })
  function IPFSUpload({ filesFolderPath, IPFSRepoPath, IAPI }) {
    return new Promise(async (resolve, reject) => {
      try {
        const online = await IAPI.isOnline();

        const globSourceOptions = { recursive: true }
        const addOptions = {
          pin: true,
          wrapWithDirectory: true,
          cidVersion: 0,
          timeout: 300000,
        }
        let rootFolderCID = {};
        let IPFSFiles = [];
        let globSourceEl = globSource(filesFolderPath, '**/*.*', globSourceOptions);

        for await (const file of IAPI.addAll(globSourceEl, addOptions)) {
          if (!file.path || file.path === '') {
            rootFolderCID = file;
          } else {
            const fileObj = makeIPFSFile({ IPFSFile: file });
            const nFile = {
              path: fileObj.path(),
              cid: fileObj.cid(),
              size: fileObj.size(),
              mode: fileObj.mode(),
              mtime: fileObj.mtime()
            };
            IPFSFiles.push(nFile)
          }
        }

        if (Object.keys(rootFolderCID).length < 1) throw Error('invalid cid returned, empty cid')

        const ipfsBaseString = rootFolderCID['cid'].toString();
        const ipfsBaseStringURL = `ipfs://${ipfsBaseString}`;

        const results = Object.freeze({ 
          ipfsBaseStringURL: () => ipfsBaseStringURL,
          ipfsBaseString: () => ipfsBaseString,
          IPFSFiles: () => IPFSFiles
        });

        resolve(results)
      } catch (err) {
        reject(err)
      }
    })
  }
}