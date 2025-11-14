import { decodeJwt} from 'jose';
import type { Request } from 'express';

const getUserId = (request: Request) =>{
	const authHeader = request.headers.authorization || '';
	const accessToken = authHeader.split(' ')[1] || ''; 
	return decodeJwt(accessToken).sub as string || '';
}

const getUserClientId = (request: Request) =>{
	const authHeader = request.headers.authorization || '';
	const accessToken = authHeader.split(' ')[1] || ''; 
	return decodeJwt(accessToken).azp as string || '';
}

const getUserPermissions = (request: Request) =>{
	const authHeader = request.headers.authorization || '';
	const accessToken = authHeader.split(' ')[1] || '';
	return decodeJwt(accessToken).permissions || [];
}

export default {
	getUserId,
	getUserClientId,
	getUserPermissions
}