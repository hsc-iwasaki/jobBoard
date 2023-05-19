"use client";
import { getSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  return (
    <>
      register <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
