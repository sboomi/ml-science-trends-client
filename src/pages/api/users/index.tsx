import bcrypt from 'bcrypt';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email, password } = req.body;

  const session = await getSession({ req });
  const result = await prisma.user.create({
    data: {
      email: email,
      name: name,
      password: bcrypt.hashSync(password, salt),
    },
  });
  res.json(result);
}
