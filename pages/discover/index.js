import CardCompornent from "@/components/card";

export const getServerSideProps = async () => {
  try {
    const responce = await fetch(`${process.env.DOMAIN}/api/getJobList`);
    const data = await responce.json();
    // // ルートディレクトリのパスを取得
    // const rootDirectory = process.cwd();

    // const filePath = path.join(rootDirectory, "json", "job.json");

    // // JSONファイルを読み込む
    // const rawData = await fs.readFile(filePath, "utf-8");

    // // JSONデータを解析
    // const data = JSON.parse(rawData);

    return { props: { data } };
  } catch (error) {
    return { notFound: true };
  }
};

const List = ({ data }) => {
  return (
    <div className="my-56">
      <CardCompornent job={data}></CardCompornent>
    </div>
  );
};

export default List;
