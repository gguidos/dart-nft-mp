const jwt = require('jsonwebtoken');
import makeDecoder from './libs/decode-token';
import makeCoder from './libs/code-token';

const decodeJWT = ({ token }) =>  makeDecoder({ jwt }).validateJWT({ token });
const codeJWT = ({ data, secret }) => jwt.sign({ data }, secret)

export { decodeJWT, codeJWT }