import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { randomUUID } from 'crypto';

import { connectToDb } from '@/utils/database';
import User from '@/models/user';

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    CredentialsProvider({
      name: 'Guest Login',
      credentials: {},
      async authorize(credentials, req) {
        const guestId = randomUUID();

        await User.create({
          guestId,
          accountType: 'guest',
        });

        const user = await User.findOne({ guestId });

        if (user) return user;
        else return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, id: user.id };
      }
      return token;
    },

    async session({ session, token }: any) {
      if (session?.user.email) {
        const sessionUser = await User.findOne({ email: session.user?.email });

        session.user.id = sessionUser._id.toString();

        return session;
      } else {
        return {
          ...session,
          user: {
            id: token.id,
          },
        };
      }
    },

    async signIn({ profile }) {
      try {
        await connectToDb();

        if (profile) {
          const userExists = await User.findOne({
            email: profile.email,
          });

          if (!userExists) {
            await User.create({
              email: profile.email,
              accountType: 'google',
            });
          }
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
