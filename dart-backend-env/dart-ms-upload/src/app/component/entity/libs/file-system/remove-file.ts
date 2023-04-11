export default function makeRemoveFile({ fs }) {
  return Object.freeze({ removeFile })
  function removeFile({ path }) {
    fs.unlinkSync(path);
  
    return;
  }
}