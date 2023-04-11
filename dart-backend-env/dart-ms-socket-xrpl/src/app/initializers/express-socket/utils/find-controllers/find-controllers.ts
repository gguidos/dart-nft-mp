export default function makeFindControllers({ fs, appRootPath, logger }) {
  return {
    findControllers
  }

  async function findControllers() {
    try {
      const componentDir = appRootPath + '/src/app/component';
      let controllerPaths = deepGetDirectories(componentDir);
      let imported = []
      for (let path of controllerPaths) {
        logger.info(`[EXPRESS][CONTROLLERS] Bootstrapping ${path}` )
        const controllerObj = await import(componentDir + '/' + path)
        imported.push(controllerObj)
      }
      const controllers = []
      imported.forEach(controller => {
        Object.keys(controller).forEach(key => {
          controllers.push(controller[key])
        })
      })
      return Promise.resolve(controllers);
    } catch(err) {
      return Promise.reject(err)
    }
  }

  function deepGetDirectories(distPath) {
    return fs.readdirSync(distPath).filter(function (file) {
        return fs.statSync(distPath + '/' + file).isDirectory();
    }).reduce(function(all, subDir) {
        return [...all, ...fs.readdirSync(distPath + '/' + subDir).map(e => subDir + '/' + e)]
          .filter(dirName => dirName.includes('controller'))
    }, []);
  }
  
}
