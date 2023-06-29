const io = require('socket.io')({
    cors: {
        origin: "http://localhost:9999", // 允许跨域的源地址
        methods: ["GET", "POST"], // 允许的请求方法
        additionalHeaders: ["Authorization"]
      }
});

io.on('connection', (socket) => {
  console.log(socket.handshake.headers);
  const token = socket.handshake.query.token || socket.handshake.headers['Token']
  let num = 20
  let data = [10,20,30,22,2,65,90]
  setInterval(() => {
      data = data.map((item => {
        if(item < 1000) return item += 10
        else return item -= 1000
      }))
      console.log(Math.trunc(num += (Math.random() * 10)));
      socket.emit('message', Math.trunc(num += (Math.random() * 10)));
      socket.emit('PIE_MESSAGE', data);
  }, 1000)
//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//   });
});

io.listen(3333, () => console.log('Socket.IO listening on port 3000'));
console.log('启动成功');