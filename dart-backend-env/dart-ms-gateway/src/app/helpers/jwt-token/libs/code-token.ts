export default function makeJWTCoder({ jwt }) {
   const codeToken = ({ data, secret }) => jwt.sign({ data }, secret)
  
   return Object.freeze({ codeToken })

  }