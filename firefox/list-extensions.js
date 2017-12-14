const os = require('os'),
	fs = require('fs'),
	mkdirp = require('mkdirp'),
	glob = require('glob'),
	ProgressBar = require('progress');

const {
	EXTENSION_LIST_SAVE_FILE,
	EXTENSION_SAVE_FOLDER,
	WINDOWS_FIREFOX_ADDON_JSON_FILE
} = require('./constants');

let progressBar = null;

function setupProgressBar(size) {
	progressBar = new ProgressBar(':bar', {
		total: size
	});
}

function progressBarTick() {
	if (progressBar !== null) {
		progressBar.tick();
	}
}

function saveBatchInstallScript(json) {
	setupProgressBar(json.addons.length);
	let output = '';
	for (const addon of json.addons) {
		console.log('Saving ' + addon.name + ' to batch installation script.');
		progressBarTick();
		output += addon.id + ',' + addon.sourceURI + '\n';
	}

	fs.writeFile(EXTENSION_LIST_SAVE_FILE, output, (err) => {
		if (err) throw err;
		console.log('Finished writing batch install script: ' + EXTENSION_LIST_SAVE_FILE);
	});
}

function prepareDirectories(callback, json) {
	mkdirp(EXTENSION_SAVE_FOLDER, (err) => {
		if (err) throw err;
		callback(json);
	});
}

function parseAddonsFile(addonsFsError, data) {
	const json = JSON.parse(data);
	if (addonsFsError) throw addonsFsError;
	prepareDirectories(saveBatchInstallScript, json);
}

if (os.type() === 'Windows_NT') {
	console.log(WINDOWS_FIREFOX_ADDON_JSON_FILE);
	glob(WINDOWS_FIREFOX_ADDON_JSON_FILE, (addonsGlobError, filePaths) => {
		if (addonsGlobError) throw addonsGlobError;
		for (const filePath of filePaths) {
			fs.readFile(filePath, parseAddonsFile);
		};
	});
} else if (os.type() === 'Darwin') {
	console.log('MacOS version yet to be implemented.');
}