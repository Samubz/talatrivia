export interface JWTPayload {
  sub: string;
  name: string;
  email: string;
  permissions: string[];
}

export interface ISession extends JWTPayload {}