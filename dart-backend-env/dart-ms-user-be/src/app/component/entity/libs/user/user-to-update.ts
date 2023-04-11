export default function buildMakeDocument() {
	return Object.freeze({ makeDocument });

	function makeDocument({ params }) {
		let {
			username,
			usernameHash,
			name,
			contactPhone,
			pictureUrl,
			xrpWallet,
			xrpTag,
			NFTTokenMinter,
			role,
			modifiedOn = Date.now(),
			modifiedBy,
		} = params;

		return Object.freeze({
			getName: () => name,
			usernameHash: () => usernameHash,
			getUsername: () => username,
			getPictureUrl: () => pictureUrl,
			getXRPWallet: () => xrpWallet,
			getXRPTag: () => xrpTag,
			getNFTTokenMinter: () => NFTTokenMinter,
			getRole: () => role,
			getContactPhone:() => contactPhone,
			getModifiedBy: () => username,
			getModifiedOn: () => modifiedOn
		});
	}
}