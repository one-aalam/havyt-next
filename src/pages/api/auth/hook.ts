
import type { NextApiRequest, NextApiResponse } from 'next'
import type{ UserProfile} from '@auth0/nextjs-auth0'
import { prisma } from '~/lib/prisma';

interface Auth0CustomActionOnRegRequest extends NextApiRequest {
    body: {
        user: UserProfile,
        secret: string
    }
}

const auth0ActionHandler = async (req: Auth0CustomActionOnRegRequest, res: NextApiResponse) => {
  const { user , secret } = req.body
  if (req.method !== 'POST') {
    return res.status(403).json({ message: `${req.method} not allowed` });
  }
  if (secret !== process.env.AUTH0_HOOK_SECRET) {
    return res.status(403).json({ message: `A secret 🤫 key is neccessary to invoke this hook!` });
  }
  if (user) {
    await prisma.user.create({
      data: { id: user.sub, username: user.nickname || user.email.split('@')[0] , email: user.email, avatar: user.picture },
    });
    return res.status(200).json({
      message: `User with email: ${user.email} has been created successfully!`,
    })
  }
}

export default auth0ActionHandler
