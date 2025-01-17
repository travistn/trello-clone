import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { connectToDb } from '@/utils/database';
import User from '@/models/user';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session }: any) {
      const sessionUser = await User.findOne({ email: session.user?.email });

      session.user.id = sessionUser._id.toString();

      return session;
    },

    async signIn({ profile }: any) {
      try {
        await connectToDb();

        const userExists = await User.findOne({
          email: profile.email,
        });

        if (!userExists) {
          await User.create({
            email: profile.email,
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
