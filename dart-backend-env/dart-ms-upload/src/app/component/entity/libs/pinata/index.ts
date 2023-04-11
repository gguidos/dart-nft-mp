import * as path from 'path';
import * as pinataSDK from '@pinata/sdk';
import makePinToPinata from './pin-to-pinata';
import makePinataDetailsObj from './make-pinata-details';

const makePinataDetails = ({ data }) => makePinataDetailsObj().pinataDetails({ data });

const makePinataPin = ({
  filesFolderPath,
  ipfsBaseString
}) => {
  return new Promise((resolve, reject) => {
    try {
      const pinataAPIKey = process.env.PINATA_API_KEY;
      const pinataSecret = process.env.PINATA_SECRET;
      makePinToPinata({ path, pinataSDK })
      .pinataPin({
        filesFolderPath,
        ipfsBaseString,
        pinataAPIKey,
        pinataSecret
      })
      .then(res => resolve(res))
      .catch(err => resolve(err))
    } catch(err) {
      reject(err);
    }
  })
}

export { makePinataPin, makePinataDetails }