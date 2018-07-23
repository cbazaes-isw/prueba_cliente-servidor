
const { exec } = require('child_process');
exec('dir', { encoding : "utf8"} , (err, stdout, stderr) => {

	if (err) {
		console.error(err);
		return;
	}
	if (stdout) console.log(stdout);

	if (stderr) console.error(stderr);

});
