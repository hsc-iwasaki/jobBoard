import { useSession } from "next-auth/react";
import { Image } from "@chakra-ui/react";
import NextLink from "next/link";
export default function Header() {
  const { data: session } = useSession();
  let imgSrc: string =
    session?.user?.image ?? "https://flowbite.com/docs/images/logo.svg";
  if (session) {
    return (
      <>
        <NextLink href="/user">
          <img src={imgSrc} className=" h-6 sm:h-9" alt="userLogo" />
        </NextLink>
      </>
    );
  }
  return (
    <>
      <NextLink
        href="/login"
        className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
      >
        Log in
      </NextLink>
      <NextLink
        href="/register"
        className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
      >
        Get started
      </NextLink>
    </>
  );
}