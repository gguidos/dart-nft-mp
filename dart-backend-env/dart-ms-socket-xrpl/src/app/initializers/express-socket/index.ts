import * as helmet from 'helmet';

const express = require('express');
const app = express();

export default () => {
  app.use(helmet())

  const server = require('http').createServer(app);

  const io = require('socket.io')(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  })

  const account = require('../../component/entity/controller')(io)
  
  io.of('/ws/ripple-account').on('connection', socket => account)
  
  
  const port = 4000;
  server.listen(port, () => {
    console.log(`listening on port ${port}`)
  })
}