import * as crypto from 'crypto';
import makeTokenOptions from './make-token.options';

const tokenOpts = ({ options }) => {
  const { tokenOptions } = makeTokenOptions({ md5 })
  
  return tokenOptions({ options })
}

function md5(text) {
	return crypto.createHash('md5').update(text, 'utf8').digest('hex');
}

export { tokenOpts }