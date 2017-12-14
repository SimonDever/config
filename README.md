# Configuration and scripts repository

## Visual Studio Code

`get-vscode-extensions`

Runs vs code to get extension list and generates a batch file `install-vscode-extensions.bat` with commands to install each extension.

`install-vscode-extensions.bat` example:
```
call code --install-extension adamvoss.yaml 
call code --install-extension CoenraadS.bracket-pair-colorizer 
```

## Firefox scripts

### List extensions

`npm run firefox:list-extensions`

Reads Firefox's `addons.js` file and generates a list of extensions, `extensions-list.txt`. Each line is a separate extension and has each extension's `id` and `sourceURI` properties comma separated.

`extensions-list.txt` example:
```
https-everywhere@eff.org,https://addons.mozilla.org/firefox/downloads/file/803415/https_everywhere-2017.12.6-an+fx.xpi?src=api
uMatrix@raymondhill.net,https://addons.mozilla.org/firefox/downloads/file/811014/umatrix-1.1.20-an+fx.xpi?src=api
```

### Download extensions

`npm run firefox:download-extensions`

Reads `extensions-list.txt` and downloads each listed extension into a temporary folder `downloaded-extensions` for use by the `firefox:install-extensions` script.

### Install extensions

`npm run firefox:install-extensions`

Iterates through each extension in the `downloaded-extensions` folder and copies it into Firefox's extensions directory.

## CSS Overrides

- GitHub - [GitHub Dark v2.6.0](https://github.com/cquanu/github-dark/)
- ProtonMail - [Custom Theme for ProtonMail v3.11.7](https://github.com/amdelamar/pm-theme)
- Stack Overflow - [Stack Overflow Dark v2.10.25](https://github.com/StylishThemes/StackOverflow-Dark)
- Wikipedia [Wikipedia Dark Material Design](https://github.com/n0x-styles/wikipedia-dark)