import Image from "next/image";
import NextLink from "next/link";
interface Props {
  id: number;
  logo: string;
  name: string;
  updatedAt: string;
}

interface Props {
  companies: [];
}

const CardCompany = ({ companies }: Props) => {
  return (
    <div className="container flex flex-col items-center justify-center w-full mx-auto bg-white rounded-lg shadow dark:bg-gray-800">
      <div className="flex justify-between w-full px-4 py-5 border-b sm:px-6">
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
            会社情報
          </h3>
          <p className="max-w-2xl mt-1 text-sm text-gray-500 dark:text-gray-200">
            求人を募集する会社を登録してください
          </p>
        </div>
        <div>
          <NextLink
            className="inline-block my-3 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            href="/company/form"
          >
            会社情報を追加
          </NextLink>
        </div>
      </div>

      <ul className="flex flex-col divide-y divide w-full">
        {companies.map(
          (item: {
            id: number;
            logo: string;
            name: string;
            updatedAt: string;
          }) => {
            let imgSrc: string =
              item.logo ?? "https://flowbite.com/docs/images/logo.svg";

            // データベースから取得した日付
            const dateFromDatabase = item.updatedAt;

            // Dateオブジェクトを作成
            const dateObj = new Date(dateFromDatabase);

            // 年、月、日を取得
            const year = dateObj.getFullYear();
            const month = dateObj.getMonth() + 1; // JavaScriptの月は0から始まるので、+1する
            const day = dateObj.getDate();

            // "1991年10月28日"のようにフォーマット
            const formattedDate = `${year}年${month}月${day}日`;

            return (
              <li className="flex flex-row" key={item.name}>
                <div className="flex items-center flex-1 p-4 cursor-pointer select-none">
                  <div className="flex flex-col items-center justify-center w-10 h-10 mr-4">
                    <NextLink href="/company">
                      <img
                        src={imgSrc}
                        className=" h-6 sm:h-9"
                        alt="companyLogo"
                      />
                    </NextLink>
                  </div>
                  <div className="flex-1 pl-1 mr-16">
                    <div className="font-medium dark:text-white">
                      {item.name}
                    </div>
                  </div>
                  <NextLink
                    className="mx-5 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                    href={`/postJob/${item.id}`}
                  >
                    求人情報を追加
                  </NextLink>
                </div>
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
};

export default CardCompany;
