import { prisma } from "@/lib/prisma";
import NextLink from "next/link";
import Modal from "@/components/modal";
import { Image } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
export default function Job({ job }) {
  const router = useRouter();
  let imgSrc: string = job.imageUrl ?? "/images/AdobeStock_101676859.jpeg";

  return (
    <>
      <div className="max-w-7xl w-2/3 mx-auto my-36">
        <div>
          <h1 className="text-4xl font-bold pb-12 text-center">{job.title}</h1>
        </div>
        <div>
          <Image
            className="max-w-lg w-full m-auto"
            src={imgSrc}
            alt="main image"
          />
        </div>
        <div className="bg-white border border-gray-200 my-12">
          <table className="divide-y divide-gray-200 w-full">
            <tbody>
              <tr className="py-2 border-b">
                <td className="shrink-0 font-semibold whitespace-nowrap px-4 mb-2 md:mb-0 w-52 border-b md:border-r">
                  求人の詳細
                </td>
                <td className="py-5 px-10 text-gray-700 flex-grow whitespace-pre-line leading-7">
                  {job.description}
                </td>
              </tr>
              <tr className="py-2 border-b">
                <td className="shrink-0 font-semibold whitespace-nowrap px-4 mb-2 md:mb-0 w-52 border-b md:border-r">
                  雇用形態
                </td>
                <td className="py-5 px-10 text-gray-700 flex-grow leading-7">
                  {job.type}
                </td>
              </tr>
              <tr className="py-2 border-b">
                <td className="shrink-0 font-semibold whitespace-nowrap px-4 mb-2 md:mb-0 w-52 border-b md:border-r">
                  勤務地
                </td>
                <td className="py-5 px-10 text-gray-700 flex-grow whitespace-pre-line leading-7">
                  {job.location_detail}
                </td>
              </tr>
              <tr className="py-2 border-b">
                <td className="shrink-0 font-semibold whitespace-nowrap px-4 mb-2 md:mb-0 w-52 border-b md:border-r">
                  勤務時間
                </td>
                <td className="py-5 px-10 text-gray-700 flex-grow leading-7">
                  <p>
                    {job.start_time}-{job.finish_time}
                  </p>
                  <p className="whitespace-pre-line">
                    {job.working_hours_detail}
                  </p>
                </td>
              </tr>
              <tr className="py-2 border-b">
                <td className="shrink-0 font-semibold whitespace-nowrap px-4 mb-2 md:mb-0 w-52 border-b md:border-r">
                  給与
                </td>
                <td className="py-5 px-10 text-gray-700 flex-grow whitespace-pre-line leading-7">
                  {job.salary_detail}
                </td>
              </tr>
              <tr className="py-2 border-b">
                <td className="shrink-0 font-semibold whitespace-nowrap px-4 mb-2 md:mb-0 w-52 border-b md:border-r">
                  福利厚生
                </td>
                <td className="py-5 px-10 text-gray-700 flex-grow whitespace-pre-line leading-7">
                  {job.welfare}
                </td>
              </tr>
              <tr className="py-2 border-b">
                <td className="shrink-0 font-semibold whitespace-nowrap px-4 mb-2 md:mb-0 w-52 border-b md:border-r">
                  休日・休暇
                </td>
                <td className="py-5 px-10 text-gray-700 flex-grow whitespace-pre-line leading-7">
                  {job.vacation}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-center">
          <Modal data={job} />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const { company } = context.query;
  const job = await prisma.job.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      company: true,
    },
  });

  try {
    const job = await prisma.job.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        company: true,
      },
    });
    if (!job) {
      return {
        notFound: true, // 404ページを表示
      };
    }
    const serializedJob = {
      ...job,
      createdAt: job.createdAt.toISOString(),
      updatedAt: job.updatedAt.toISOString(),
      company: {
        ...job.company,
        createdAt: job.company.createdAt.toISOString(),
        updatedAt: job.company.updatedAt.toISOString(),
      },
    };
    return {
      props: { job: serializedJob },
    };
  } catch (error) {
    console.error("Error fetching job:", error);
    return {
      notFound: true,
    };
  }
}
