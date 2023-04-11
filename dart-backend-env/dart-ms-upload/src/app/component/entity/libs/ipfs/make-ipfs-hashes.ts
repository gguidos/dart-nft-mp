export default function makeIPFSHashes({
  fs,
  crypto,
  Hash,
  path,
  globSource,
  makeCids
}) {
  return Object.freeze({ IPFSHashes })
  function IPFSHashes({ filesFolderPath }) {
    return new Promise(async (resolve, reject) => {
      try {
        let cids = [];
        let fileCIDS = [];
        let excludedHead = path.sep + filesFolderPath.split(path.sep).pop();
        excludedHead = excludedHead.replace(/\//g,'').replace(/\\/g,'');
        const globSourceOptions = { recursive: true }
        for await (const value of globSource(filesFolderPath, '**/*.*', globSourceOptions)) {
          if (!value.path.endsWith(excludedHead)) {
            const fileData = await fs.readFileSync(value.content.path);
            const cid = await Hash.of(fileData);
            const hash = crypto.createHash('sha256');
            const hdigest = hash.digest('hex');
            let cidProperties = {file: value.path, cid, sha256: hdigest}
            const cidObj = makeCids({ cidProperties })
            cidProperties = {
              file: cidObj.file(),
              cid: cidObj.cid(),
              sha256: cidObj.sha256()
            }
            cids.push(cidProperties)
            
            const fileType = value.path.split('.')[1]
            let nCIDObj = {}
            nCIDObj['fileType'] = fileType;
            nCIDObj['cid'] = cid
            fileCIDS.push(nCIDObj)
          }
        }
        const nftHashes = Object.freeze({
          nftHashes: () => cids,
          cids: () => fileCIDS
        })

        resolve(nftHashes)
        } catch(err) {
          reject(err)
        }
    })
  }
}