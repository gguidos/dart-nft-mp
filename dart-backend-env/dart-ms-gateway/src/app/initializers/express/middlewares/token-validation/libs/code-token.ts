export default function makeJWTCoder({ jwt }) {
    function codeToken({ options }) {
      return jwt.sign(options, secret)
    }
  
    export Object.freeze({ codeToken })
  }