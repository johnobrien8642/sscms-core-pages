import bcrypt from 'bcrypt';
import dbConnect from '@core/lib/mongodb.js';
import Admin from '@core/models/Admin';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
export const config = {
	api: {
		bodyParser: {
			sizeLimit: '50mb',
		},
	},
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
	await dbConnect();

	const admin = await Admin.findOne({
		username: req.body.username
	});

	let authenticated;

	if (admin) {
		authenticated = await bcrypt.compare(
			req?.body?.password,
			admin?.password
		);
	}

	if (admin && authenticated) {
		const token = jwt.sign({ id: admin._id }, process.env.NEXT_PUBLIC_SECRET_KEY as string);
		res.status(200).json({ data: { token } });
	} else {
		res.status(401).json({ error: 'Username or password incorrect' });
	}
};
