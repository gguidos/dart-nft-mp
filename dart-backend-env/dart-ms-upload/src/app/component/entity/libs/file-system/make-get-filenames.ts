export default function makeGetFilenames({
  fs
}){
  return Object.freeze({ getFilenames })
  function getFilenames({ path }) {
    try {
      return fs.readdirSync(path)
    } catch(error) {
      throw new Error(error)
    }
  }
}