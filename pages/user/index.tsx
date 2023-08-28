import { getSession, signOut } from "next-auth/react";
import NextLink from "next/link";
import CompanyCard from "@/components/companyCard";
interface User {
  role: string;
  email: string;
  image: string;
  name: string;
  companies: object;
}

export default function User({ user }: { user: User }) {
  if (user.role == "Recruiter" || user.role == "Admin") {
    return (
      <>
        <h1>{user.name}</h1>
        <h1>{user.email}</h1>
        <div>
          <div>
            <CompanyCard companies={user.companies}></CompanyCard>
          </div>
          <div></div>
        </div>
        <div>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      </>
    );
  } else {
    return (
      <>
        <h1>{user.name}</h1>
        <h1>{user.email}</h1>

        <div>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      </>
    );
  }
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
