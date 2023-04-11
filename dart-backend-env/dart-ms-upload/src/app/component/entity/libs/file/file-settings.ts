export default function makeFileSettings() {
  return Object.freeze({ fileSettings })
  function fileSettings({ file }) {
    const {
      fieldname,
      originalname,
      encoding,
      mimetype,
      destination,
      filename,
      path,
      size
    } = file;

    return Object.freeze({
      fieldname: () => fieldname,
      originalname: () => originalname,
      encoding: () => encoding,
      mimetype: () => mimetype,
      destination: () => destination,
      filename: () => filename,
      path: () => path,
      size: () => size
    })
  }
}