export default function makeGetChecksum({
  crypto,
  fs
}){
  return Object.freeze({ getChecksum })
  function getChecksum({ path }) {
    return new Promise((resolve, reject) => {
      try {
        const hash = crypto.createHash('sha256');
        const input = fs.createReadStream(path);
        input.on('error', err => reject(err));
        input.on('data', chunk => hash.update(chunk));
        input.on('close', () => resolve(hash.digest('hex')));
      } catch (error) {
        reject(error)
      }
    })
  }
}