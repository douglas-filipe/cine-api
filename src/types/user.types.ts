export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IDecoded {
  id: string;
  admin: boolean;
}

export interface IDataUpdateUser {
  admin?: boolean;
  email?: string;
  name?: string;
  passwordw: string;
}

export interface IDataCreateUser {
  email: string;
  password: string;
  admin?: boolean;
  name: string;
}
