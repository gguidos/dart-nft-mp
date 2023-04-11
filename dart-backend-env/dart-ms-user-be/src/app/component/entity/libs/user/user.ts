export default function buildMakeDocument() {
	return Object.freeze({ makeDocument });

	function makeDocument({ cachedDocument }) {
		let {
			email,
			contactPhone = undefined,
			name,
			password,
			username,
			pictureUrl = '',
			xrpWallet = '',
			xrpTag = '',
			role = 'user',
			NFTTokenMinter = '',
			createdOn = Date.now(),
			modifiedOn = Date.now(),
			emailHash,
			usernameHash,
			longHash,
			createdBy,
			modifiedBy,
			source,
		} = cachedDocument;

		let hash;

		return Object.freeze({
			getName: () => name,
			getUsername: () => username,
			getEmail: () => email,
			getContactPhone: () => contactPhone,
			getPassword: () => password,
			getEmailHash: () => emailHash,
			getUsernameHash: () => usernameHash,
			getPictureUrl: () => pictureUrl,
			getXRPWallet: () => xrpWallet,
			getXRPTag: () => xrpTag,
			getNFTTokenMinter: () => NFTTokenMinter,
			getRole: () => role,
			getLongHash: () => longHash, 
			getModifiedBy: () => username,
			getCreatedBy: () => username,
			getCreatedOn: () => createdOn,
			getModifiedOn: () => modifiedOn
		});
	}
}
