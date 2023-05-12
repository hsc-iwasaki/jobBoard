import data from "../../../dummy.json";
const Page = ({ params }: { params: { id: string } }) => {
  const p = params.id;
  const result = data.find((post) => p == post.id);

  return (
    <div className="m-4 font-bold">
      Company ID:{params.id}
      <h1>{result && result.company}</h1>
      <h1>{result && result.address}</h1>
    </div>
  );
};
export default Page;
