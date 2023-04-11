import makeMintDataObject from './make-mint-data-object';
import makeSellOfferDataObject from './make-sell-offer-data-object';
import makeMintResponseObject from './make-mint-response-object';
import makeSellOfferResultsObject from './make-sell-offer-results-object';
import makeAcceptOfferDataObject from './make-accept-offer-data-object';
import makeOfferDataObject from './make-offer-data-object';
import makeOfferResultsObject from './make-offer-results-object';

const mintDataObject = ({ requestData }) => makeMintDataObject().mintDataObject({ requestData });
const sellOfferDataObject = ({ data }) => makeSellOfferDataObject().sellOfferDataObject({ data })
const sellOfferResultsObject = ({ data }) => makeSellOfferResultsObject().sellOfferResultsObject({ data })
const acceptOfferDataObject = ({ data }) => makeAcceptOfferDataObject().acceptOfferDataObject({ data })
const offerDataObject = ({ data }) => makeOfferDataObject().offerDataObject({ data })
const offerResultsObject = ({ data }) => makeOfferResultsObject().offerResultsObject({ data })

const mintResponseObject = ({
  uploadID,
  NFTokenID,
  audioFileURI,
  coverFileURI,
  jsonFileURI,
  transactionType,
  minted,
  metadata
}) => makeMintResponseObject()
.mintResultsObject({
  uploadID,
  NFTokenID,
  audioFileURI,
  coverFileURI,
  jsonFileURI,
  transactionType,
  minted,
  metadata
});

export { 
  mintDataObject,
  mintResponseObject,
  offerDataObject,
  sellOfferDataObject,
  sellOfferResultsObject,
  acceptOfferDataObject,
  offerResultsObject
}