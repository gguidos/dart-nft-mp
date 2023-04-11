export default function makeVerify({
  documentToInsert,
  findDocuments,
  findKeyInCache,
  findDocumentInCache,
  insertOneDocument
}) {
  return Object.freeze({ verifyDocument })
  async function verifyDocument({ token }) {
    return new Promise(async (resolve, reject) => {
      try {
        const cachedKey = await findKeyInCache({ cacheKey: token });
        
        if (cachedKey.length < 1) {
          return reject('Account not found');
        }

        const query = { longHash: token };
        let existingDbDocument = await findDocuments({ query });

        if (existingDbDocument.length > 0) return reject({ error: 1, message: 'duplicated entry'});

        const cachedDocument = await findDocumentInCache({ token });
        const document = documentToInsert({ cachedDocument: cachedDocument[0] });
   
        const newUser = {
          name: document.getName(),
          username: document.getUsername(),
          email: document.getEmail(),
          contactPhone: document.getContactPhone(),
          password: document.getPassword(),
          pictureUrl: document.getPictureUrl(),
          xrpWallet: document.getXRPWallet(),
          xrpTag: document.getXRPTag(),
          role: document.getRole(),
          emailHash: document.getEmailHash(),
          usernameHash: document.getUsernameHash(),
          longHash: document.getLongHash(),
          createdBy: document.getCreatedBy(),
          modifiedBy: document.getModifiedBy(),
          createdOn: document.getCreatedOn(),
          modifiedOn: document.getModifiedOn()
        };

        const eHash = { emailHash: newUser.emailHash };
        existingDbDocument = await findDocuments({ query: eHash });
   
        const uHash = { usernameHash: newUser.usernameHash };
        existingDbDocument = existingDbDocument.length < 1 ? 
        await findDocuments({ query: uHash }) : existingDbDocument;

        if (existingDbDocument.length > 0) return reject({ error: 1, message: 'duplicated entry'})
        const { addDocument } = await insertOneDocument(newUser);

        resolve(addDocument);
      } catch (err) {
       reject(err)
      }
    })
  }
}