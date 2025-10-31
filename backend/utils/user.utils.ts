import { decodeJwt} from 'jose';
import type { Request } from 'express';

const getUserId = (request: Request) =>{
	const authHeader = request.headers.authorization || '';
	const accessToken = authHeader.split(' ')[1] || ''; 
	return decodeJwt(accessToken).sub || '';
}

export default {
	getUserId
}