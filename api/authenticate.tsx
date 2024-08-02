import { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '../lib/mongodb.js';
import Admin from '../models/Admin';
import jwt from 'jsonwebtoken';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	await connectDb();
	const decoded = await jwt.verify(req.body.token, process.env.NEXT_PUBLIC_SECRET_KEY as string) as { id: string; };
	const authenticated = await Admin.findById(decoded?.id);
	if (authenticated) {
		res.status(200).json({ authenticated: true });
	} else {
		res.status(200).json({ authenticated: false });
	}
};
