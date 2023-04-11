export default function makeIPFSRepoFolders({
  fs,
  path
}) {
  return Object.freeze({ ipfsRepoFolders })
  function ipfsRepoFolders() {
    const ipfsRootFolder = process.env.PWD + path.sep + 'ipfs-repo';
    const repoRootFolder = makeDir(ipfsRootFolder);
    const repoFolderPath = ipfsRootFolder + path.sep + Date.now();
    const repoFolder = makeDir(repoFolderPath);

    return Object.freeze({
      repoFolderPath: () => repoFolderPath
    })
  }

  function makeDir(path){
    if (!fs.existsSync(path)) fs.mkdirSync(path);
  }
}