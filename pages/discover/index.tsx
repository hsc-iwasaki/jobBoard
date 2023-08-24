import { SimpleGrid } from "@chakra-ui/react";
import CardCompornent from "../../components/card";
import { useState, useEffect } from "react";
export async function getServerSideProps() {
  const response = await fetch(`http://localhost:3000/api/getData`);
  const data = await response.json();
  return { props: { data } };
}

const List = (data) => {
  return (
    <main>
      <h2>Job List</h2>
      <SimpleGrid w="80%" m={"auto"} columns={4} spacing="40px">
        {data.data.map((item) => (
          <CardCompornent
            key={item.id}
            name={item.company_name}
            subtitle={item.work_place}
          ></CardCompornent>
        ))}
      </SimpleGrid>
    </main>
  );
};

export default List;
