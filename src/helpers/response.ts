import moment from 'moment';
import { ApiRequest, ApiResponse } from '../routes';
import { appendToFile } from './common';

export const response200 = (
	res: ApiResponse,
	data: Record<string, any>[] | Record<string, any>
) => {
	res.setHeader('Content-Type', 'application/json');
	if (Array.isArray(data)) {
		return res.send({ object: 'list', data });
	} else if (typeof data === 'object') {
		return res.send({ ...data });
	}
};

export const response401 = (res: ApiResponse) => {
	return res.status(401).send({
		error: {
			message: 'No valid API key provided.',
			type: 'Invalid_Request'
		}
	});
};
export const response400 = (
	res: ApiResponse,
	failReason: Record<string, any>,
	userMessage?: string
) => {
	res.setHeader('Content-Type', 'application/json');
	return res.status(400).send({
		message:
			userMessage || 'The request was unacceptable, often due to missing a required parameter.',
		failReason,
		type: 'Invalid_Request'
	});
};

export const response403 = (res: ApiResponse, userMessage?: string | Record<string, any>) => {
	res.setHeader('Content-Type', 'application/json');
	return res.status(403).send({
		error: {
			message: userMessage || "The API key doesn't have permissions to perform the request.",
			type: 'Invalid_Request'
		}
	});
};
export const response404 = (
	res: ApiResponse,
	type: 'route' | 'data' = 'data',
	userMessage?: string | Record<string, any>
) => {
	res.setHeader('Content-Type', 'application/json');
	return res.status(404).send({
		error: {
			message:
				type === 'route'
					? 'Route not found'
					: userMessage || "The requested resource doesn't exist.",
			type: 'Invalid_Request'
		}
	});
};
export const response500 = (res: ApiResponse, req: ApiRequest, developerMessage?: any) => {
	appendToFile('.', 'error_logs', `[${moment().format()}] ${JSON.stringify(developerMessage.message)} ***${req.originalUrl}*** body:${JSON.stringify(req.body)} (userId:${JSON.stringify((req as any).user?.id)})\n`,);
	res.setHeader('Content-Type', 'application/json');
	return res.status(500).send({
		error: {
			message: 'Something went wrong on our end.',
			type: 'Internal_Error',
			dmsg: developerMessage && developerMessage.message
		}
	});
};
