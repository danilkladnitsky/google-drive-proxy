import { MimeType } from '../types/storage';
import { UserAuthDTO } from '../types/user';

export interface IStorageAuthProvider<U extends UserAuthDTO> {
  generateLoginLink(redirectUri?: string): Promise<string>;
  generateToken(code: string): Promise<string>;
  getUserByToken(token: string): Promise<U>;
  readFiles(
    token: string,
    folderId: string,
    mimeType: MimeType,
  ): Promise<unknown[]>;
  createFolder(token: string, folder: string): Promise<string>;
  shareFile(token: string, fileId: string): Promise<string>;
  copyFile(token: string, fileId: string): Promise<string>;
}
