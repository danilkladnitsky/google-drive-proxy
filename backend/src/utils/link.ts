import { v4 as uuidv4 } from 'uuid';

export const generateLink = (payload: { fileId: string }): string => {
  return uuidv4().substring(0, 6);
};
