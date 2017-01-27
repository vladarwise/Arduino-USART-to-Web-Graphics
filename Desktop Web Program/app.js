var io = require('socket.io');
var http = require('http');
var static = require('node-static');
var file = new static.Server('./public', { indexFile: "index.htm" });
var fs = require('fs');
var SerialPort = require('serialport');
var app = http.createServer();
var io = io.listen(app);
app.listen(3001);
var now = parseInt(new Date().getTime()/1000);
var fname = './export'+now+'.csv';
var argv = require('minimist')(process.argv.slice(2));
var port_name = argv['p'];
var writer = fs.createWriteStream(fname, {flags: 'a'});
writer.on('finish', function() {
    console.error('Запись выполнена успешно.');
});
var socket = io.sockets.on('connection', function (socket) {
	socket.on('disconnect', function () {
		console.log('user disconnected');
	});
});
var count_soket_paket = 0;
function write(data) {
	now_time = parseInt(new Date().getTime()/1000);
	arr = data.split(':');
	arr2 = arr[1].split(';');
	writer.write(arr['1']+';'+now_time+'\r\n');
	if(count_soket_paket>10){
		count_soket_paket = 0;
		socket.emit('eventData', { d0: arr2[0], d1: arr2[1], d2: arr2[2], d3: arr2[3],d4: arr2[4], d5: arr2[5], d6: arr2[6], d7: arr2[7] });
	}
	count_soket_paket++;
}
var port = new SerialPort(port_name, {
	parser: SerialPort.parsers.readline('\r\n')
});
	port.on('open', function() {
		port.on('data', function (data) {
			console.log(data);
			write(data);
		});
	});
	port.on('error', function(err) {
		console.log(err.message);
		process.exit("Ошибка при открытии порта");
	});
http.createServer(function(req, res) {
  file.serve(req, res);
}).listen(80);
