import { useState } from "react";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { prisma } from "../lib/prisma";

export default function Job({ job }) {
  return (
    <>
      <h1>{job.title}</h1>
      <div>{job.description}</div>
      <div>{job.location}</div>
      <div>{job.salary}</div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const job = await prisma.job.findUnique({
    where: {
      id: Number(id),
    },
  });

  const serializedJob = {
    ...job,
    createdAt: job.createdAt.toISOString(), // DateオブジェクトをISO形式の文字列に変換
    updatedAt: job.updatedAt.toISOString(), // 同様に
  };

  return {
    props: { job: serializedJob },
  };
}
