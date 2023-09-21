import { Image } from "@chakra-ui/react";
import NextLink from "next/link";
interface Props {
  map(
    arg0: (item: {
      id: number;
      title: string;
      name: string;
      imageUrl: string;
      company: object;
      salary: string;
      location: string;
    }) => import("react").JSX.Element
  ): import("react").ReactNode;
  name: string;
}

const CardComponent = ({ job }: { job: Props }) => {
  return (
    <div className="w-4/5 mx-auto flex justify-center flex-wrap gap-10">
      {job.map(
        (item: {
          id: number;
          title: string;
          name: string;
          imageUrl: string;
          company: object;
          salary: string;
          location: string;
        }) => {
          let imgSrc: string =
            item.imageUrl ?? "/images/AdobeStock_101676859.jpeg";
          return (
            <div
              key={item.id}
              className="w-80 bg-white shadow-lg rounded-lg overflow-hidden fade-group"
            >
              <div className="flex justify-center items-center p-4">
                <Image
                  src={imgSrc}
                  alt="メイン写真"
                  className="h-48 object-cover rounded"
                />
              </div>
              <div className="p-4 space-y-3">
                <h2 className="text-lg font-semibold">{item.company.name}</h2>
                <p>
                  {item.title.length > 30
                    ? item.title.slice(0, 30) + "..."
                    : item.title}
                </p>
                <p>給与 : {item.salary}万円~</p>
                <p>勤務地 : {item.location}</p>
              </div>
              <div className="p-4 flex justify-center">
                <NextLink
                  className="bg-green-500 hover:bg-green-600 text-white rounded px-4 py-2 w-full text-center"
                  href={`/jobs/${item.id}?company=${item.company.name}&title=${item.title}`}
                >
                  求人詳細
                </NextLink>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};

export default CardComponent;
