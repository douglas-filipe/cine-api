export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IDecoded {
  id: string;
  admin: boolean;
}
