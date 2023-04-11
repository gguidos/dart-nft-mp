export default function makeIAPIStop() {
  return Object.freeze({ IAPIStop })
  function IAPIStop({ IAPI }) {
    IAPI.stop();
  }
}