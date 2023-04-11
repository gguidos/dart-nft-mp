import makeConnectionParams from './connection-params';
import makeClassicAddress from './classic-address';
import makeSeed from './account-seed';
import makeArtistAccount from './artist-account';
import makeNFTokenMinter from './minter-response';

const makeConnectionParamsObj = ({ classicAddress }) => 
  makeConnectionParams().connectionParams({ classicAddress })

const makeArtistAccountObj = ({ artistAccount }) =>
  makeArtistAccount().artistAccountObj({ artistAccount })

const makeClassicAddressObj = ({ classicAddress }) =>
  makeClassicAddress().classicAddressObj({ classicAddress })

const makeSeedObj = ({ seed }) => makeSeed().seedObj({ seed })

const makeNFTokenMinterObj = ({ account }) => makeNFTokenMinter().NFTokenMinterObj({ account })

export { 
  makeNFTokenMinterObj,
  makeConnectionParamsObj, 
  makeClassicAddressObj, 
  makeArtistAccountObj,
  makeSeedObj 
}