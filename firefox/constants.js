const os = require('os');

const EXTENSION_LIST_SAVE_FILE = 'firefox/extension-list.txt';
const EXTENSION_SAVE_FOLDER = 'firefox/downloaded-extensions/';
const WINDOWS_FIREFOX_PROFILE = os.homedir() + '/AppData/Roaming/Mozilla/Firefox/Profiles/*.default/';
const WINDOWS_FIREFOX_ADDON_JSON_FILE = WINDOWS_FIREFOX_PROFILE + 'addons.json';
const WINDOWS_FIREFOX_EXTENSIONS_FOLDER = WINDOWS_FIREFOX_PROFILE + 'extensions/';

module.exports = {
	EXTENSION_LIST_SAVE_FILE,
	EXTENSION_SAVE_FOLDER,
	WINDOWS_FIREFOX_PROFILE,
	WINDOWS_FIREFOX_ADDON_JSON_FILE,
	WINDOWS_FIREFOX_EXTENSIONS_FOLDER
};