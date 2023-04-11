export default function getSellOffers({
	sellOfferResultsObject,
	createXRPLRequest
}) {
	return Object.freeze({ sellOffers });
	function sellOffers({ nft_id, config }) {
		return new Promise(async (resolve, reject) => {
			try {
				const sellOfferOptions = {
          method: config.methods.NFTSellOffers,
          nft_id
				};
				createXRPLRequest({ requestOptions: sellOfferOptions})
				.then(res => {
					const SOResultsObj = sellOfferResultsObject({ data: res });
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

