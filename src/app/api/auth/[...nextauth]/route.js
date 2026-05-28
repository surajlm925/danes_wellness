import NextAuth from "next-auth";

const handler = NextAuth({
  providers: [
    {
      id: "shopify",
      name: "Shopify",
      type: "oauth",
      clientId: process.env.SHOPIFY_CUSTOMER_CLIENT_ID,
      clientSecret: process.env.SHOPIFY_CUSTOMER_CLIENT_SECRET,
      authorization: {
        url: `https://${process.env.SHOPIFY_STORE_DOMAIN}/auth/oauth/authorize`,
        params: { scope: "openid email profile customer-account-api:full" },
      },
      token: `https://${process.env.SHOPIFY_STORE_DOMAIN}/auth/oauth/token`,
      userinfo: `https://${process.env.SHOPIFY_STORE_DOMAIN}/auth/oauth/userinfo`,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
        };
      },
    },
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
