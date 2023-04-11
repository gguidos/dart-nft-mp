import jwt from 'jsonwebtoken';
import makeDecoder from './libs/decode-token';
import makeCoder from './libs/code-token';

const decodeJWT = ({ params, token }) => {
  const { decodeToken } = makeDecoder({ jwt });

  return decodeToken({ params, token });
}

const codeJWT = ({ options }) => {
  const { codeToken } = makeCoder({ jwt });

  return codeToken({ options })
}

export { decodeJWT, codeJWT }