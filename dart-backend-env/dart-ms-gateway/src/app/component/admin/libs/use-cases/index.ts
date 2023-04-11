import { tokenOpts } from '../token';
import makeCodeToken from './code-token';
import { rules, consumers } from '../consumers/make-consumer';
import makeFindDocuments from './list-document';

import {
	insertOneDocument,
	findDocumentsByQuery,
  coder
} from '../data-access';

const findDocuments = makeFindDocuments({ findDocumentsByQuery });

const registerConsumer = ({ hostname, ip, createdBy, createdByHost }) => {
  return new Promise((resolve, reject) => {
    try {
      makeCodeToken({ 
        tokenOpts, 
        coder,
        consumers,
        insertOneDocument,
        findDocuments
       }).registerConsumer({ hostname, ip, createdBy, createdByHost })
       .then(res => resolve(res))
       .catch(err => reject(err))
      } catch(err) {
      return err;
    }
  })
  
}

const makeRules = (useCase) => rules;

export { registerConsumer, rules }