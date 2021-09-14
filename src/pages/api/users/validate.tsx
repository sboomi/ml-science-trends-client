import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodbConnect';
import User from '../../../models/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await clientPromise();

  switch (method) {
    case 'POST':
      try {
        const { email, password } = req.body;
        // Search by username
        const user = await User.find({ email: email });
        if (password === user.password) {
          res.status(201).json({ success: true, data: user });
        }
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
