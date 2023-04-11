import * as fs from 'fs';
const appRootPath = require('app-root-path');
import makeFindControllers from './find-controllers';

const logger = require('../../../../libs/logger');
export default async function getControllers() {
  try {
    const { findControllers } = makeFindControllers({ fs, appRootPath, logger });
    const controllers = await findControllers()
    return Promise.resolve(controllers)
  } catch(err) {
    return Promise.reject(err)
  }
}
