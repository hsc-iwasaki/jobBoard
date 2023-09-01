import { useForm } from "react-hook-form";
import { useState } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
  FormLabel,
  FormControl,
  Input,
  Select,
  Button,
  Box,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";
interface User {
  id: number;
  name: string;
  email: string;
}

// フォームで使用する変数の型を定義
type formInputs = {
  companyId: number;
  name: string;
  contactEmail: string;
  title: string;
  description: string;
  location: string;
  salary: string;
  type: string;
};

export default function RegisterForm({ user }: { user: User }) {
  const [Message, setMessage] = useState(null);
  const router = useRouter();
  const formFields = [
    {
      label: "求人名",
      name: "title",
      required: true,
      requiredMessage: "必須項目です",
      component: "Input",
      type: "text",
    },
    {
      label: "アイキャッチ画像",
      name: "imageUrl",
      required: false,
      requiredMessage: "",
      component: "Input",
      type: "file",
    },
    {
      label: "詳細",
      name: "description",
      required: true,
      requiredMessage: "必須項目です",
      component: "Textarea",
      type: "text",
    },
    {
      label: "勤務地",
      name: "location",
      required: true,
      requiredMessage: "必須項目です",
      component: "Input",
      type: "text",
    },
    {
      label: "給与",
      name: "salary",
      required: true,
      requiredMessage: "必須項目です",
      component: "Input",
      type: "text",
    },
    {
      label: "雇用形態",
      name: "type",
      required: true,
      requiredMessage: "必須項目です",
      component: "Select",
      options: [
        { value: "FullTime", label: "正社員" },
        { value: "Contract", label: "契約社員" },
        { value: "PartTime", label: "アルバイト" },
      ],
      type: "select",
    },
  ];

  const {
    handleSubmit,
    register,
    // getValuesを追加
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<formInputs>();

  // フォームが送信されたときの処理
  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await fetch("/api/postJob", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      setMessage(result.message);
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  });

  return (
    <Box maxW="800px" w="80%" m="100px auto">
      <form onSubmit={onSubmit}>
        {Message && (
          <div
            className="fixed top-5 left-0 right-0 w-1/2 mx-auto rounded z-50 items-center bg-blue-500 text-white text-sm font-bold px-4 py-3"
            role="alert"
          >
            <p className="text-sm">{Message}</p>
          </div>
        )}
        <FormControl>
          <Input
            id="companyId"
            value={router.query.id}
            type="hidden"
            {...register("companyId", {
              required: "必須項目です",
            })}
          />
        </FormControl>
        {formFields.map((field) => {
          let Component;
          if (field.component === "Textarea") {
            Component = Textarea;
          } else if (field.component === "Select") {
            Component = Select;
          } else {
            Component = Input;
          }
          return (
            <FormControl
              key={field.name}
              mb={5}
              isRequired={field.required}
              isInvalid={Boolean(errors[field.name])}
            >
              <FormLabel htmlFor={field.name}>{field.label}</FormLabel>
              <FormErrorMessage>
                {errors[field.name] && errors[field.name].message}
              </FormErrorMessage>
              {field.component !== "Select" ? (
                <Component
                  id={field.name}
                  type={field.type} // 追加された部分
                  {...register(field.name, {
                    required: field.required ? field.requiredMessage : false,
                  })}
                />
              ) : (
                <Component
                  id={field.name}
                  {...register(field.name, {
                    required: field.required ? field.requiredMessage : false,
                  })}
                >
                  {field.options.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Component>
              )}
            </FormControl>
          );
        })}
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
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { user: session.user },
  };
}
