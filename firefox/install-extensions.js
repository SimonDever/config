const glob = require('glob'),
	path = require('path'),
	fse = require('fs-extra'),
	os = require('os');

const {
	EXTENSION_SAVE_FOLDER,
	WINDOWS_FIREFOX_EXTENSIONS_FOLDER
} = require('./constants');

if (os.type() === 'Windows_NT') {
	glob(EXTENSION_SAVE_FOLDER + path.sep + '*.xpi', (sourceError, sourcePaths) => {
		if (sourceError) throw sourceError;
		for (const source of sourcePaths) {
			const filename = source.substring(source.lastIndexOf('/') + 1, source.length);
			glob(WINDOWS_FIREFOX_EXTENSIONS_FOLDER, (destinationError, destinationPaths) => {
				if (destinationError) throw destinationError;
				for (const destination of destinationPaths) {
					fse.copy(source, destination + filename)
						.then(() => {
							console.log(filename + ' installed.');
						})
						.catch(err => {
							console.log(err);
						});
				}
			});
		}
	});
} else if (os.type() === 'Darwin') {
	console.log('MacOS version yet to be implemented.');
}