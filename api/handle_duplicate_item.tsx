import connectDb from '@core/lib/mongodb.js';
import models from '@core/lib/index'
import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
export const config = {
	api: {
		bodyParser: {
			sizeLimit: '50mb',
		},
	},
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
	await connectDb();

	if (req.method === 'POST') {
		const {
			item,
			schema,
			chosen
		} = req.body

		try {
			const newItem = new models[schema]({ ...item, isDuplicate: true });
			newItem._id = new mongoose.Types.ObjectId();
			const savedNewItem = await newItem.save();
			return res.status(200).json({ success: true, savedNewItem: savedNewItem });
		} catch (err: any) {
			return res.status(500).json({ success: false, errorMessage: err.message });
		}
	}
};
