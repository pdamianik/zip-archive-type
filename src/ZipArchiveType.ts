import { ArchiveType, ArchiveTypeLocales } from 'folder-archiver-types';
import * as JSZip from 'jszip';

export class ZipArchiveType implements ArchiveType {
    archive_extension_types: string[] = ['zip'];
    archive_locales: ArchiveTypeLocales = {
        name:           'ZIP',
        inProgressVerb: 'zipping',
        fileTypeTitle:  'ZIP folder'
    };

    private zipFile: JSZip;

    constructor() {
        this.zipFile = new JSZip();
    }

    newInstance(): ArchiveType {
        return new ZipArchiveType();
    }

    async addFolder(path: string): Promise<void> {
        this.zipFile.folder(path);
    }

    async addFile(path: string, fileData: Uint8Array): Promise<void> {
        this.zipFile.file(path, fileData);
    }

    async getArchive(): Promise<Uint8Array> {
        return this.zipFile.generateAsync({type: "uint8array"});
    }
}