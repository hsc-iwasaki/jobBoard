"use client";
import { SimpleGrid } from "@chakra-ui/react";
import CardCompornent from "../../components/card";
import data from "../../dummy.json";
const List = () => {
  return (
    <main>
      <h2>Job List</h2>
      <SimpleGrid w="80%" m={"auto"} columns={4} spacing="40px">
        {data.map((post) => {
          return (
            <CardCompornent
              key={post.id}
              name={post.company}
              subtitle={post.subtitle}
              pass={post.id}
            ></CardCompornent>
          );
        })}
      </SimpleGrid>
    </main>
  );
};

// export const getStaticProps = async () => {
//   return {
//     props: {
//       postLists: data,
//     },
//   };
// };

export default List;
