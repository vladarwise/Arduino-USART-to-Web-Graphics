var co = require('co');
var prompt = require('co-prompt');
var SerialPort = require('serialport');
var nrc = require('node-run-cmd');
var ports_array = [];
console.log('COM порты PC\r');
SerialPort.list(function (err, ports) {
	ports.forEach(function(port, id) {
		ports_array[id] = port.comName;
		console.log('%s) %s,	%s,		%s \r', id, port.comName,port.pnpId,port.manufacturer);
	});
});
setTimeout(function() {
	co(function *() {
		var port = yield prompt('Выбор COM порта на котором находится устройство: ');
		console.log('Выбран порт: %s', ports_array[port]);
		nrc.run('node app.js -p ' + ports_array[port]).then(function(exit) {
			console.log(exit);
		}, function(err) {
			console.log('Ошибка: ', err);
		});
   });
}, 1300);

