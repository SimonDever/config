const os = require('os'),
	fs = require('fs'),
	path = require('path'),
	wget = require('wget-improved'),
	glob = require('glob'),
	ProgressBar = require('progress');

const {
	EXTENSION_LIST_SAVE_FILE,
	EXTENSION_SAVE_FOLDER,
	WINDOWS_FIREFOX_EXTENSIONS_FOLDER
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

function handleDownloadError(err) {
	console.log('Error downloading: ' + err.message);
}

function downloadExtensionsFromSavedList() {
	fs.readFile(EXTENSION_LIST_SAVE_FILE, (err, data) => {
		if (err) throw err;
		const extensionList = data.toString().split('\n');
		setupProgressBar(extensionList.length);
		for (const extension of extensionList) {
			if (extension.indexOf(',') > -1) {
				const extensionParts = extension.split(',');
				const id = extensionParts[0];
				const uri = extensionParts[1];
				const saveFile = EXTENSION_SAVE_FOLDER + path.sep + id + '.xpi';
				const downloadEventHandler = wget.download(uri.toString(), saveFile);
				downloadEventHandler.on('error', handleDownloadError);
				downloadEventHandler.on('end', progressBarTick);
			}
		}
	});
}

function loadScript(exists) {
	if (exists) {
		downloadExtensionsFromSavedList();
	} else {
		console.log('Firefox extension saved file not found. Try running generator first.');
	}
}

function checkGeneratedList(exists) {
	if (exists) {
		fs.exists(EXTENSION_LIST_SAVE_FILE, loadScript);
	} else {
		console.log('Windows Firefox profile extentions folder not found at ' + WINDOWS_FIREFOX_EXTENSIONS_FOLDER);
	}
}

if (os.type() === 'Windows_NT') {
	glob(WINDOWS_FIREFOX_EXTENSIONS_FOLDER, (addonsGlobError, filePaths) => {
		if (addonsGlobError) throw addonsGlobError;
		for (const filePath of filePaths) {
			fs.exists(filePath, checkGeneratedList);
		}
	});
} else if (os.type() === 'Darwin') {
	console.log('MacOS version yet to be implemented.');
}