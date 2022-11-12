export type OperationStatus = 'ok | error';

export enum MimeType {
  FOLDER = 'application/vnd.google-apps.folder',
  FILE = 'application/vnd.google-apps.file',
}
export type File<T extends MimeType> = {
  name: string;
  mimeType: T;
  id: string;
};
