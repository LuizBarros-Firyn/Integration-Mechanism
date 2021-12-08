// Jwt Signature ==============================================

export interface JwtClaims {
  id: number;
  name: string;
  email: string;
}

export interface JwtSignature {
  claims: JwtClaims;
}
