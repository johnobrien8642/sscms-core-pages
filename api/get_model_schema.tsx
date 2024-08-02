import { NextApiRequest, NextApiResponse } from 'next';
import models from '../lib/index';
import connectDb from '../lib/mongodb.js';
export const config = {
	api: {
		bodyParser: {
			sizeLimit: '50mb',
		},
	},
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
	await connectDb();
	const { formTitle } = req.query;
	
	if (models[formTitle as string]) {
		return res.status(200).json({ schemaPaths: models[formTitle as string].schema.paths });
	} else {
		return res.status(401).json({ error: 'That wasnt a valid model' });
	}
};