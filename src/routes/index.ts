import { Request, Response, Router } from 'express';
import { ParsedQs } from 'qs';
import apiV0 from './api.v0';
import { response200 } from '../helpers/response';

const router = Router();

router.use('/api', apiV0);
router.get('/', async (req, res) => {
	response200(res, { message: 'testing the root route' });
});

export default router;

export type ApiRequest = Request<{}, any, any, ParsedQs, Record<string, any>>;
export type ApiResponse = Response<any, Record<string, any>>;
