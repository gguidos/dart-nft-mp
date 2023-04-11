import buildS3FileOpts from '../s3/make-save-file-opts';
import makeFileSettingsObject from './file-settings';
import * as path from 'path';

const makeS3FileOpts = ({ file, username }) => 
  buildS3FileOpts({ pathSep: path.sep }).s3FileOpts({ file, username });

const makeFileSettings = ({ file }) => makeFileSettingsObject().fileSettings({ file });

export { makeS3FileOpts, makeFileSettings }