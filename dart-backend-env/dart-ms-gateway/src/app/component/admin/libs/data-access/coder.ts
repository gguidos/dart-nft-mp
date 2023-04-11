export default function makeCoder({ codeJWT }) {
  return Object.freeze({ coder })
  
  function coder({ options, secret }) {
    return codeJWT({ options, secret })
  }
}