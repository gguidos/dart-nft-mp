export default function makeCidsObject() {
  return Object.freeze({ cidsObject })
  function cidsObject({ cidProperties }) {
      const { file, cid, sha256 } = cidProperties;
      return Object.freeze({
        file: () => file,
        cid: () => cid,
        sha256: () => sha256
    })
  }
}