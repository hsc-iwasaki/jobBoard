import { useForm } from "react-hook-form";
import {
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";

// フォームで使用する変数の型を定義
type formInputs = {
  feature: string;
  place: string;
  name: string;
};

const RegisterForm = () => {
  // React Hook Formでバリデーションやフォームが送信されたときの処理などを書くために必要な記述
  const {
    handleSubmit,
    register,
    // getValuesを追加
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<formInputs>();

  // フォームが送信されたときの処理
  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    try {
      const response = await fetch("/api/postData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  });

  return (
    <Box maxW="800px" w="80%" m="100px auto">
      <form onSubmit={onSubmit}>
        {/* 名前 */}
        <FormControl mb={5} isInvalid={Boolean(errors.name)}>
          <FormLabel htmlFor="name">企業名</FormLabel>
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
          <Input
            id="feature"
            {...register("name", {
              required: "必須項目です",
            })}
          />
        </FormControl>
        {/* 勤務地 */}
        <FormControl mb={5} isInvalid={Boolean(errors.feature)}>
          <FormLabel htmlFor="feature">勤務地</FormLabel>
          <FormErrorMessage>
            {errors.feature && errors.feature.message}
          </FormErrorMessage>
          <Textarea
            id="feature"
            {...register("feature", {
              required: "必須項目です",
            })}
          />
        </FormControl>
        {/* 企業の特徴 */}
        <FormControl mb={5} isInvalid={Boolean(errors.place)}>
          <FormLabel htmlFor="place">企業の特徴</FormLabel>
          <FormErrorMessage>
            {errors.place && errors.place.message}
          </FormErrorMessage>
          <Textarea
            id="place"
            {...register("place", {
              required: "必須項目です",
            })}
          />
        </FormControl>

        <Button
          m="50px auto"
          display="block"
          w="150px"
          colorScheme="blue"
          isLoading={isSubmitting}
          type="submit"
        >
          送信
        </Button>
      </form>
    </Box>
  );
};

export default RegisterForm;
