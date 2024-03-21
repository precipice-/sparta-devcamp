export type TokenPayload = {
  sub: string;
  iat: number;
  jti: string;
};

export type RequestInfo = {
  ip: string;
  ua: string;
  endpoint: string;
};

export type CreateTokenPayloadInput = {
  sub: string;
  iat: number;
  jti: string;
};

export type CreateUserInput = {
  name: string;
  email: string;
};
