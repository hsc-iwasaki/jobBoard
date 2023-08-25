import { getSession, signOut } from "next-auth/react";

interface User {
  email: string;
  image: string;
  name: string;
}

export default function User({ user }: { user: User }) {
  return (
    <>
      <h1>{user.name}</h1>
      <h1>{user.email}</h1>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { user: session.user },
  };
}
