export default function makeJWTDecoder({ jwt }) {
  function decodeToken({ params, token }) {
    let parts = token.split(' ');
  
    if (parts.length !== 2) {
      return 0;
    }
  
    let scheme = parts[0];
    let credentials = parts[1];
    if (!/^Bearer$/i.test(scheme)) {
      return 0;
    }
  
      let decoded = jwt.decode(credentials, process.env.JWT_SECRET);
  
      return decoded;
    }
  
    export Object.freeze({ decodeToken })
  }