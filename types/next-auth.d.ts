declare module "next-auth" {
  interface Session {
    user: {
      id: string | null;
      name: string | null;
    };
  }
}
