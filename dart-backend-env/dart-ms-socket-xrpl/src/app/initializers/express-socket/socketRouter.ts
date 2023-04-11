module.exports = account

function account(io) {
  const accountnamespace = io.of('/ripple-account')
  accountnamespace.on('connection', (socket) => {
    socket.on('update_account_info', data => {
      console.log(socket.id)
    })
  })
}