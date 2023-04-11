import eventEmitter from '../event-handler';

import { 
  artistAccountConnection,
  mintNFTProcess,
  getAccountNFTS,
  findMintedNFTs,
  brokedSellOfferProcess,
  brokeredBuyOfferProcess,
  brokerSaleProcess
} from '../libs/use-cases';

const logger = require('../../../libs/logger');

module.exports = account

function account(io) {
  const accountnamespace = io.of('/ws/ripple-account')
  accountnamespace.on('connection', (socket) => {

    socket.on('update_account_info', data => {
      try {
        artistAccountConnection({ account: data })
        .then(res => socket.emit('account', { error: 0, data: res }))
        .catch(err => socket.emit('error', { error: 1, data: err }))
      } catch(err) {
        socket.emit('error', { error: 1, data: err })
      }
    })

    socket.on('list_nfts', data => {
      try {
        findMintedNFTs({ 
          query: data.query, 
          xrpWallet: data.userInfo.xrpWallet 
        })
        .then(res => socket.emit('nft_list', { error: 0, data: res }))
        .catch(err => socket.emit('error', { error: 1, data: err }))
      } catch(err) {
        socket.emit('error', { error: 1, data: err })
      }
    })

    socket.on('list_salable_nfts', data => {
      try {
        
        eventEmitter.on('log', data => {
          socket.emit('log', { error: 0, data })
        })
        
        data.query = { $or: [] }
        data.query.$or.push({ brokedSellOffer: { $exists: true }})
        data.query.$or.push({ owner: data.userInfo.xrpWallet })

        findMintedNFTs({ 
          query: data.query, 
          xrpWallet: data.userInfo.xrpWallet 
        })
        .then(res => socket.emit('list_salable_nfts', { error: 0, data: res }))
        .catch(err => socket.emit('error', { error: 1, data: err }))
      } catch(err) {
        socket.emit('error', { error: 1, data: err })
      }
    })

    socket.on('mint_nft', data => {
      try {
        eventEmitter.on('mintprocess', data => {
          socket.emit('nftLog', { error: 0, data })
        })
        mintNFTProcess({ requestData: data })
        .then(res => {
          socket.emit('nft', { error: 0, data: res })
        })
        .catch(err => socket.emit('error', { error: 1, data: err }))
      } catch(err) {
        socket.emit('error', { error: 1, data: err})
      }
    })

    socket.on('getServerNFTs', data => {
      try {
        getAccountNFTS({ account: data.account })
        .then(res => socket.emit('server_nfts', { error: 0, data: res }))
        .catch(err => socket.emit('error', { error: 1, data: err }))
      } catch(err) {
        socket.emit('error', { error: 1, data: err})
      }
    })

    socket.on('createBrokeSellOffer', data => {
      try {
        eventEmitter.on('log', data => {
          socket.emit('log', { error: 0, data })
        })
        brokedSellOfferProcess({ data })
        .then(res => socket.emit('sell_offer', { error: 0, data: res }))
        .catch(err => socket.emit('error', { error: 1, data: err }))
      } catch(err) {
        socket.emit('error', { error: 1, data: err})
      }
    })

    socket.on('createBuyOffer', data => {
      try {
        eventEmitter.on('log', data => {
          socket.emit('log', { error: 0, data })
        })
        brokeredBuyOfferProcess({ data })
        .then(res => socket.emit('buy_offer', { error: 0, data: res }))
        .catch(err => socket.emit('error', { error: 1, data: err }))
      } catch(err) {
        socket.emit('error', { error: 1, data: err})
      }
    })

    socket.on('brokerSale', data => {
      try {
        eventEmitter.on('log', data => {
          socket.emit('log', { error: 0, data })
        })
        brokerSaleProcess({ data })
        .then(res => socket.emit('brokerSale', { error: 0, data: res }))
        .catch(err => socket.emit('error', { error: 1, data: err }))
      } catch(err) {
        socket.emit('error', { error: 1, data: err})
      }
    })

    socket.on('disconnect', () => {
      socket.disconnect()
    })
  })
}