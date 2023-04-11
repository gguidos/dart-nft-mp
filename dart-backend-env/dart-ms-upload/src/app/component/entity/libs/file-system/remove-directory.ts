export default function makeRemoveDirectory({ fs }) {
  return Object.freeze({ removeDirectory })
  function removeDirectory({ path }) {
    fs.rmSync(path, { recursive: true, force: true });

    return;
  }
}