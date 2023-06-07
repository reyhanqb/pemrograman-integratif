const ws = io();

ws.emit("msg", "Hello");

ws.on("notification", (data) => {
  console.log(`New notification: ${data}`);
});