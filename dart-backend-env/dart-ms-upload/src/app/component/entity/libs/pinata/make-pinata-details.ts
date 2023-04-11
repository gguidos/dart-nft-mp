export default function makePinataDetails() {
  return Object.freeze({ pinataDetails });
  function pinataDetails({ data }) {
    try {
      const {
        id,
        ipfsHash,
        status,
        name
      } = data;
      return Object.freeze({
        id: () => id,
        ipfsHash: () => ipfsHash,
        status: () => status,
        name: () => name
      })
    } catch(err) { 
      return err
    }
  }
}