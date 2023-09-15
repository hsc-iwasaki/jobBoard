/* eslint-disable react-hooks/rules-of-hooks */
import { getSession, signOut } from "next-auth/react";
import NextLink from "next/link";
import { useSession, signIn } from "next-auth/react";
import CompanyCard from "@/components/companyCard";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";
import { prisma } from "../../lib/prisma";
import { Userform } from "@/components/userform";
interface User {
  birthday: any;
  ruby: any;
  tel: any;
  graduation: any;
  spouse: any;
  address: any;
  gender: string;
  role: string;
  email: string;
  image: string;
  name: string;
  companies: object;
}

export default function User({ user }: { user: User | null }) {
  if (!user) {
    return <button onClick={() => signOut()}>Sign out</button>; // or you can return null or some other placeholder
  }
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
        <Userform user={user} />
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

  let user = null;

  try {
    user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
      include: {
        companies: true, // ここを想定しています
      },
    });

    if (user) {
      // UserのDateフィールドを文字列に変換
      user.createdAt = user.createdAt.toISOString();
      user.updatedAt = user.updatedAt.toISOString();
      user.emailVerified = user.emailVerified.toISOString();

      // companiesのDateフィールドを文字列に変換
      user.companies = user.companies.map((company) => {
        return {
          ...company,
          createdAt: company.createdAt.toISOString(),
          updatedAt: company.updatedAt.toISOString(),
        };
      });
    }
  } catch (error) {
    console.error(error);
  }

  return {
    props: { user },
  };
}
