import { prisma } from "@/lib/prisma";
import NextLink from "next/link";
import Modal from "@/components/modal";
import { useState } from "react";
import { useRouter } from "next/router";
export default function Job({ job }) {
  const router = useRouter();
  job.company = router.query.company;
  return (
    <>
      <h1>{job.title}</h1>
      <div>{job.description}</div>
      <div>{job.location}</div>
      <div>{job.salary}</div>

      <div>
        <Modal data={job} />
      </div>
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
