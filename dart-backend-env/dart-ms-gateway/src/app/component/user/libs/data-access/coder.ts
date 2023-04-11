export default function makeCoder({ codeJWT }) {
  const coder = ({ data, secret }) => codeJWT({ data, secret });
  
  return Object.freeze({ coder });
}