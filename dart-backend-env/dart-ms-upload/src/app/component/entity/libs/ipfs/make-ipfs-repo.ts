export default function makeIPFSRepo({
  create
}) {
  return Object.freeze({ IPFSRepo })
  function IPFSRepo({ IPFSRepoPath }) {
    return new Promise((resolve, reject) => {
      try {
        create({ repo: IPFSRepoPath })
        .then(res => resolve(res))
        .catch(err => reject(err))
      } catch(err) {
        reject(err)
      }
    })
  }
}