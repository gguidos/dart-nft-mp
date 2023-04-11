import * as socketClient from 'socket.io-client'
import { cachedData } from '../../common/libs/use-cases'

module.exports = account

function account(io) {
  const accountnamespace = io.of('/ws/ripple-account')
  accountnamespace.on('connection', (socket) => {

    socket.on('update_account_info', async data => {
      try {
        const token = data.token.split('\"')[1]
        const userInfo = await cachedData({ token })

        const internalSocket = socketClient.io('http://localhost:4000/ws/ripple-account');
        internalSocket.on('connect', () => console.log(internalSocket.id))
        internalSocket.emit('update_account_info', userInfo);
        internalSocket.on('account', data => {
          socket.emit('account', data)
          internalSocket.disconnect();
        });
      } catch(err) {
        socket.emit('nft', { error: 1, data: err});
      }
    })

    socket.on('createBrokerSellOffer', async data => {
      try {
        const nData = {
          params: data.params
        }

        const token = data.token.split('\"')[1]
        nData['userInfo'] = await cachedData({ token })

        const internalSocket = socketClient.io(
          'http://localhost:4000/ws/ripple-account',
          { reconnection: false });
        internalSocket.on('connect', () => console.log(internalSocket.id))
        internalSocket.on('log', data => {
          socket.emit('log', data)
        })
        internalSocket.emit('createBrokeSellOffer', nData);
        internalSocket.on('sell_offer', data => {
          socket.emit('sell_offer', data)
          internalSocket.disconnect();
        });
        internalSocket.on('error', data => {
          socket.emit('error', data)
          internalSocket.disconnect();
        });
      } catch(err) {
        socket.emit('error', { error: 1, data: err});
      }
    })

    socket.on('createBuyOffer', async data => {
      try {
        const nData = {
          params: data.params
        }

        const token = data.token.split('\"')[1]
        nData['userInfo'] = await cachedData({ token })

        const internalSocket = socketClient.io(
          'http://localhost:4000/ws/ripple-account',
          { reconnection: false });
        internalSocket.on('connect', () => console.log(internalSocket.id))
        internalSocket.on('log', data => {
          socket.emit('log', data)
        })
        internalSocket.emit('createBuyOffer', nData);
        internalSocket.on('buy_offer', data => {
          socket.emit('buy_offer', data)
          internalSocket.disconnect();
        });
        internalSocket.on('error', data => {
          socket.emit('error', data)
          internalSocket.disconnect();
        });
      } catch(err) {
        socket.emit('error', { error: 1, data: err});
      }
    })

    socket.on('brokerSale', async data => {
      try {
        const nData = {
          params: data.params
        }
        if (!data.token) {
          socket.emit('error', { error: 1, data: { message: 'Unauthorized'}});
        }
        const token = data.token.split('\"')[1]
        nData['userInfo'] = await cachedData({ token })

        const internalSocket = socketClient.io(
          'http://localhost:4000/ws/ripple-account',
          { reconnection: false });
        internalSocket.on('connect', () => console.log(internalSocket.id))
        internalSocket.on('log', data => {
          socket.emit('log', data)
        })
        internalSocket.emit('brokerSale', nData);
        internalSocket.on('brokerSale', data => {
          socket.emit('brokerSale', 'data')
          internalSocket.disconnect();
        });
        internalSocket.on('error', data => {
          socket.emit('error', data)
          internalSocket.disconnect();
        });
      } catch(err) {
        socket.emit('error', { error: 1, data: err});
      }
    })

    socket.on('list_nfts', async data => {
      try {
        const nData = {
          query: data.params || {}
        }

        const token = data.token.split('\"')[1]
        nData['userInfo'] = await cachedData({ token })

        const internalSocket = socketClient.io(
          'http://localhost:4000/ws/ripple-account',
          { reconnection: false });
        internalSocket.on('connect', () => console.log(internalSocket.id))
        internalSocket.emit('list_nfts', nData);
        internalSocket.on('nft_list', data => {
          socket.emit('nft_list', data)
          internalSocket.disconnect();
        });
      } catch(err) {
        socket.emit('nft', { error: 1, data: err});
      }
    })

    socket.on('list_salable_nfts', async data => {
      try {
        const nData = {
          query: data.params || {}
        }
        
        const token = data.token.split('\"')[1]
        nData['userInfo'] = await cachedData({ token })

        const internalSocket = socketClient.io(
          'http://localhost:4000/ws/ripple-account',
          { reconnection: false });
        internalSocket.on('connect', () => console.log(internalSocket.id))
        internalSocket.emit('list_salable_nfts', nData);
        internalSocket.on('list_salable_nfts', data => {
          // console.log(data)
          socket.emit('list_salable_nfts', data)
          internalSocket.disconnect();
        });
        internalSocket.on('error', error => {
          socket.emit('error', error)
          internalSocket.disconnect()
        })
      } catch(err) {
        socket.emit('error', err)
      }
    })

    socket.on('mint_nfts', async data => {
      try {
        const token = data.token.split('\"')[1]
        const userInfo = await cachedData({ token })
        
        if (userInfo['role'] !== 'creator') {
          socket.emit('error', { error: 1, data: 'unallowed operation' })
        }

        const nData = {
          ...data,
          ...userInfo
        }

        delete nData.token;

        const internalSocket = socketClient.io('http://localhost:4000/ws/ripple-account');
        internalSocket.emit('mint_nft', nData);
        internalSocket.on('nftLog', data => {
          socket.emit('nftLog', data)
        })
        internalSocket.on('nft', data => {
          socket.emit('nfts', data)
          internalSocket.disconnect()
        });
        internalSocket.on('error', error => {
          socket.emit('error', error)
          internalSocket.disconnect()
        })
      } catch(err) {
        socket.emit('error', { error: 1, data: err });
        socket.disconnect()
      }
    })

    socket.on('disconnect', () => {
      socket.disconnect()
    });
  })
}