import {
  Card,
  CardBody,
  CardFooter,
  Text,
  Button,
  ButtonGroup,
  Image,
  Heading,
  Stack,
} from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
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
    }) => import("react").JSX.Element
  ): import("react").ReactNode;
  name: string;
}

const CardCompornent = ({ job }: { job: Props }) => {
  return (
    <>
      <SimpleGrid w="80%" m={"auto"} columns={4} spacing="40px">
        {job.map(
          (item: {
            id: number;
            title: string;
            name: string;
            imageUrl: string;
            company: object;
            salary: string;
          }) => {
            let imgSrc: string =
              item.imageUrl ?? "/images/AdobeStock_101676859.jpeg";
            return (
              <Card maxW="sm" key={item.id}>
                <CardBody>
                  <Image src={imgSrc} alt="メイン写真" borderRadius="lg" />
                  <Stack mt="6" spacing="3">
                    <Heading size="md">{item.company.name}</Heading>
                    <Text>{item.title}</Text>
                    <Text>給与 : {item.salary}</Text>
                  </Stack>
                </CardBody>
                <CardFooter>
                  <ButtonGroup spacing="2">
                    <NextLink
                      className="bg-blue-600 hover:bg-blue-500 text-white rounded px-4 py-2"
                      href={`/jobs/${item.id}?company=${item.company.name}&title=${item.title}`}
                      passHref
                    >
                      求人詳細
                    </NextLink>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            );
          }
        )}
      </SimpleGrid>
    </>
  );
};

export default CardCompornent;
