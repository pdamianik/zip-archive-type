import * as vscode from 'vscode';
import { ZipArchiveType } from './ZipArchiveType';

var zipArchiveType : ZipArchiveType = new ZipArchiveType();
const EXT_ID = 'pdamianik.zip-archive-type';

export function activate(context: vscode.ExtensionContext) {
	vscode.extensions.getExtension('pdamianik.folder-archiver')?.exports.registerArchiveType(EXT_ID, zipArchiveType);
}

export function deactivate() {
}
