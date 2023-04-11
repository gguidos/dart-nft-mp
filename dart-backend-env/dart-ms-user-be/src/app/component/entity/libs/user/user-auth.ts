export default function makeUserAuthObj({ md5 }) {
  return Object.freeze({ userAuthObj })
  
  function userAuthObj({ params }) {
    const {
      username,
      password
    } = params;

    return Object.freeze({
      usernameHash: () => md5(username),
      passwordHash: () => md5(password)
    })
  }
}