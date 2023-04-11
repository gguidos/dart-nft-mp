export default function makeRegisterDocument({
  documentToRegister,
  findDocuments,
  findKeyInCache,
  addDocumentToCache,
  makeMail
}) {

  return Object.freeze({ registerDocument })

  async function registerDocument({ info }) {
    return new Promise(async (resolve,reject) => {
      try {
        const document = documentToRegister({ info });
        const newUser = {
          name: document.getName(),
          email: document.getEmail(),
          username: document.getUsername(),
          password: document.getPassword(),
          emailHash: document.getEmailHash(),
          usernameHash: document.getUsernameHash(),
          longHash: document.getLongHash()
        };
        let emailQuery = { emailHash: newUser.emailHash }
        let existingDBUser = await findDocuments({ query: emailQuery });
        if (existingDBUser.length > 0) return reject({ error: 1, message: 'duplicated entry'})
        let usernameQuery = { usernameHash: newUser.usernameHash }
        existingDBUser = await findDocuments({ query: usernameQuery });
        if (existingDBUser.length > 0) return reject({ error: 1, message: 'duplicated entry'})
        const existingCacheUser = await findKeyInCache({ cacheKey: newUser.longHash });
        
        if (existingCacheUser.length > 0) return reject({ error: 1, message: 'duplicated entry'})
        await addDocumentToCache({ newUser });
        const mail = sendMail({ emailAddress: newUser.email, token: newUser.longHash})

        resolve(newUser)
      } catch (err) {
        reject(err)
      }
    })
  }

  function sendMail({ emailAddress, token }) {
    const sentMail = makeMail({ emailAddress, token })
    return sentMail
  }
}