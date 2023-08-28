import { useForm } from "react-hook-form";
import { useState } from "react";
import { getSession } from "next-auth/react";
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
  recruiterId: number;
  name: string;
  contactEmail: string;
  description: string;
  logo: string;
  website: string;
};

export default function RegisterForm({ user }: { user: User }) {
  const [Message, setMessage] = useState(null);

  const formFields = [
    {
      label: "企業名",
      name: "name",
      requiredMessage: "必須項目です",
      component: "Input",
    },
    {
      label: "連絡先メール",
      name: "contactEmail",
      requiredMessage: "必須項目です",
      component: "Input",
    },
    {
      label: "企業PR",
      name: "description",
      requiredMessage: "必須項目です",
      component: "Textarea",
    },
    {
      label: "企業ロゴ",
      name: "logo",
      requiredMessage: "必須項目です",
      component: "Input",
    },
    {
      label: "ウェブサイト",
      name: "website",
      requiredMessage: "必須項目です",
      component: "Input",
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
      const response = await fetch("/api/postCompany", {
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
            id="recruiterId"
            value={user.id}
            type="hidden"
            {...register("recruiterId", {
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
            <>
              <FormControl
                key={field.name}
                mb={5}
                isInvalid={Boolean(errors[field.name])}
              >
                <FormLabel htmlFor={field.name}>{field.label}</FormLabel>
                <FormErrorMessage>
                  {errors[field.name] && errors[field.name].message}
                </FormErrorMessage>
                {field.component !== "Select" ? (
                  <Component
                    id={field.name}
                    {...register(field.name, {
                      required: field.requiredMessage,
                    })}
                  />
                ) : (
                  <Component
                    id={field.name}
                    {...register(field.name, {
                      required: field.requiredMessage,
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
            </>
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