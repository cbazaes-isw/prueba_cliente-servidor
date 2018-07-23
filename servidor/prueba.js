
var spawn		= require('child_process').spawn,
	launcherErp	= spawn('launcherERP.exe', ['ALL']);

launcherErp.stdout.on('data', (data) => {
	console.log(data.toString());
});

launcherErp.stderr.on('data', (data) => {
	console.error(data.toString());
});

launcherErp.on('exit', function (code) {
	console.log('child process exited with code ' + code.toString());
});

launcherErp.on('error', (err) => {
	console.error(err);
});
