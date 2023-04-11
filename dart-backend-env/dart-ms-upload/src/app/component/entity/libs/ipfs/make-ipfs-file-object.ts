export default function makeIPFSFileObject() {
  return Object.freeze({ IPFSfileObject })
  function IPFSfileObject({ IPFSFile }) {
      const { 
        path,
        cid,
        size,
        mode,
        mtime
      } = IPFSFile;
      return Object.freeze({
        path: () => path,
        cid: () => cid,
        size: () => size,
        mode: () => mode,
        mtime: () => mtime
    });
  }
}