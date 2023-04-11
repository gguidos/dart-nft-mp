export default function makeTokenize({ codeJWT }) {
  return Object.freeze({ tokenize })
  function tokenize({ data }) {
    data.date = Date.now()
    const secret = process.env.NODE_ACCESS_EP_TOKEN_SECRET;
    const token = codeJWT({ data, secret });
    return Object.freeze({
      token
    })
  }
}