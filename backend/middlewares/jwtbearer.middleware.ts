import { auth } from "express-oauth2-jwt-bearer";

const jwtCheck = auth({
	audience:  Bun.env.AUTH0_CLUBERO_AUDIENCE ,
	issuerBaseURL: Bun.env.AUTH0_CLUBERO_BASEURL,
	tokenSigningAlg: 'RS256'
});

export default jwtCheck;

 