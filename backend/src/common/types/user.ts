export type GoogleDriveUserDTO = {
  id: string;
  name: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  locale?: string;
};

export type UserWithTokenDTO = {
  token: string;
  googleId: string;
  name: string;
  picture?: string;
};

export type UserAuthDTO = {
  id: string;
  name: string;
} & { [key: string]: string };
