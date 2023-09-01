import CardCompornent from "@/components/card";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch(`${process.env.DOMAIN}/api/getJobList`);
  const data = await response.json();
  return { props: { data } };
};

type Company = {
  name: string;
};

type JobItem = {
  id: number;
  name: string;
  title: string;
  location: string;
  company: Company;
};

type DataObject = {
  data: JobItem[];
};

const List: React.FC<DataObject> = ({ data }) => {
  return (
    <main>
      <h2>Job List</h2>
      <CardCompornent job={data}></CardCompornent>
    </main>
  );
};

export default List;
