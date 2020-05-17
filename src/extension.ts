import * as vscode from 'vscode';
import { ZipArchiveType } from './ZipArchiveType';

var zipArchiveType : ZipArchiveType = new ZipArchiveType();
const EXT_ID = 'pdamianik.zip-archive-type';

export function activate(context: vscode.ExtensionContext) {
	vscode.extensions.getExtension('pdamianik.folder-archiver')?.exports.registerArchiveType(EXT_ID, zipArchiveType);
	var activeExtensionIdsArray : string[] = [];

	for (let extension of vscode.extensions.all) {
		activeExtensionIdsArray.push(extension.id);
	}
	
	vscode.extensions.onDidChange(() => {
		if (activeExtensionIdsArray.length > vscode.extensions.all.length) {
			for (let activeExtensionId of activeExtensionIdsArray) {
				let extension = vscode.extensions.getExtension(activeExtensionId);
				if (extension === undefined || !extension.isActive) {
					vscode.extensions.getExtension('pdamianik.folder-archiver')?.exports.registerArchiveType(EXT_ID, zipArchiveType);
				}
			}
		}

		activeExtensionIdsArray = [];
	
		for (let extension of vscode.extensions.all) {
			activeExtensionIdsArray.push(extension.id);
		}
	});
}

export function deactivate() {
}
