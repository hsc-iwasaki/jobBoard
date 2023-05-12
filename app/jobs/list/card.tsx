"use client";
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
import NextLink from "next/link";

const CardCompornent = <
  T extends { name: string; subtitle: string; pass: string }
>(
  props: T
) => {
  const companyName = props.name;
  const subTitle = props.subtitle;
  const passId = props.pass;

  return (
    <Card maxW="sm">
      <CardBody>
        <Image
          src="/images/AdobeStock_101676859.jpeg"
          alt="メイン写真"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{companyName}</Heading>
          <Text>{subTitle}</Text>
        </Stack>
      </CardBody>
      <CardFooter>
        <ButtonGroup spacing="2">
          <NextLink
            className="bg-blue-600 hover:bg-blue-500 text-white rounded px-4 py-2"
            href={`/jobs/${passId}`}
            passHref
          >
            求人詳細
          </NextLink>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default CardCompornent;
