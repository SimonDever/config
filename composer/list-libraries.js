const fs = require('fs'),
	childProcess = require('child_process');

const INSTALL_SCRIPT = 'composer/install-global-libraries.sh';

childProcess.exec('composer global show --format=json', (execError, stdout) => {
	if (execError) throw execError;
	let output = "";
	for (const library of JSON.parse(stdout).installed) {
		output += 'composer global require ' + library.name + ':' + library.version + '\n';
	}
	fs.writeFile(INSTALL_SCRIPT, output, function (writeFileError) {
		if (writeFileError) throw writeFileError;
		console.log('Finished saving global Composer library entries in batch installer script: ' + INSTALL_SCRIPT);
	});
});