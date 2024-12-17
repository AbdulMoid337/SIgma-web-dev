import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

const handler = NextAuth({
  providers: [
    GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
  ],
})

// Ensure the handler is set up correctly for API routes
export { handler as GET, handler as POST }

// Add a check for req.query.nextauth in your handler if neede