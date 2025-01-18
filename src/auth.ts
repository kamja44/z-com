import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";
export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  pages: {
    signIn: "/i/flow/login",
    newUser: "/i/flow/signup",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials: Partial<Record<string, any>>): Promise<any> {
        const authResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: credentials?.username,
              password: credentials?.password,
            }),
          }
        );
        if (!authResponse.ok) {
          return null;
        }
        const user = await authResponse.json(); // 로그인 한 사람의 유저정보
        console.log("user", user);
        return {
          email: user.id,
          name: user.name,
          image: user.image,
          ...user,
        };
      },
    }),
  ],
});
