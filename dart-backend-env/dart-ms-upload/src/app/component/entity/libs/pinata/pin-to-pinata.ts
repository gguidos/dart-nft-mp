export default function makePinataPin({
  path,
  pinataSDK
}) {
  return Object.freeze({ pinataPin })
  function pinataPin({ 
    filesFolderPath,
    ipfsBaseString,
    pinataAPIKey,
    pinataSecret
  }) {
    return new Promise((resolve, reject) => {
      try {
        let pinata = new pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET);
        let buildFolder = filesFolderPath.split(path.sep).pop();
        let pinataOptions = {
          pinataMetadata: { name: buildFolder }
        };
        pinata.pinByHash(ipfsBaseString, pinataOptions)
        .then(res => resolve(res))
        .catch(err => reject(err))
      } catch(err) {
        reject(err);
      }
    })
  }
}