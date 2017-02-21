// %%%%%%%%%%%%%%%%%   simulação de envio de dados   %%%%%%%%%%%%%%%%%
var sendData = {};
sendData.intervalTime = 5000;
sendData.action = function() {
  console.log(28);
};
sendData.start = function() {
  setInterval(this.action, this.intervalTime);
};

sendData.start();
