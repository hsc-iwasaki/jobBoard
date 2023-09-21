import NextLink from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import gsap from "gsap";
import Status from "./status";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
gsap.config({
  nullTargetWarn: false,
});
export default function Header() {
  const router = useRouter();
  useEffect(() => {
    const targets = document.querySelectorAll(".fade-group");
    targets.forEach((target) => {
      gsap.from(target, {
        opacity: 0,
        duration: 2,
        scrollTrigger: {
          trigger: target,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    });
  }, []);
  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <NextLink href="/" className="flex items-center">
            <span className="font-bold">いちワク</span>
          </NextLink>
          <div className="flex items-center lg:order-2">
            <Status />
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NextLink
                  href="/"
                  className="block py-2 pr-4 pl-3 lg:p-0 lg:hover:text-green-500"
                >
                  トップページ
                </NextLink>
              </li>
              <li>
                <NextLink
                  href="/about"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-500 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  いちワクとは
                </NextLink>
              </li>
              <li>
                <NextLink
                  href="/discover"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-500 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  仕事を探す
                </NextLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
