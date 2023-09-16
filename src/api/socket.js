const socket = new WebSocket('ws://localhost:5000/')

  // socket.onmessage = (event) => {
  //   console.log("Message from server: ", event.data)
  // }

export default socket;