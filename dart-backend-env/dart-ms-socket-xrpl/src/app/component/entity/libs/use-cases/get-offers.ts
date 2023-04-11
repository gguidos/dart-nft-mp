export default function getOffers({
	offerResultsObject,
	createXRPLRequest
}) {
	return Object.freeze({ offers });
	function offers({ nft_id, config, type }) {
		return new Promise(async (resolve, reject) => {
			try {
				const offerOptions = {
          method: config.methods[type],
          nft_id
				};
				createXRPLRequest({ requestOptions: offerOptions})
				.then(res => {
					const SOResultsObj = offerResultsObject({ data: res });
					const SOResults = {
						nft_id: SOResultsObj.nft_id(),
						offers: SOResultsObj.offers()
					};
					resolve(SOResults)
				})
				.catch(err => reject(err))
			} catch(err) {
				reject(err)
			}
		})
	};
}

