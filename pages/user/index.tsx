/* eslint-disable react-hooks/rules-of-hooks */
import { getSession, signOut } from "next-auth/react";
import NextLink from "next/link";
import { useSession, signIn } from "next-auth/react";
import CompanyCard from "@/components/companyCard";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";
import { prisma } from "../../lib/prisma";
import {
  FormLabel,
  FormControl,
  Input,
  Select,
  Button,
  Box,
  FormErrorMessage,
  Textarea,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";

interface User {
  birthday: any;
  ruby: any;
  tel: any;
  graduation: any;
  spouse: any;
  address: any;
  gender: string;
  role: string;
  email: string;
  image: string;
  name: string;
  companies: object;
}

export default function User({ user }: { user: User | null }) {
  if (!user) {
    return <button onClick={() => signOut()}>Sign out</button>; // or you can return null or some other placeholder
  }
  if (user.role == "Recruiter" || user.role == "Admin") {
    return (
      <>
        <h1>{user.name}</h1>
        <h1>{user.email}</h1>
        <div>
          <div>
            <CompanyCard companies={user.companies}></CompanyCard>
          </div>
          <div></div>
        </div>
        <div>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      </>
    );
  } else {
    const [Message, setMessage] = useState(null);
    const [Gender, setGender] = useState(null);
    const [Spouse, setSpouse] = useState(null);
    const { data: session, status, update } = useSession();
    const formFields = [
      {
        label: "氏名",
        name: "name",
        required: true,
        requiredMessage: "必須項目です",
        component: "Input",
        type: "text",
        defaultValue: user ? user.name : "",
      },
      {
        label: "フリガナ",
        name: "ruby",
        required: true,
        requiredMessage: "必須項目です",
        component: "Input",
        type: "text",
        defaultValue: user ? user.ruby : "",
      },
      {
        label: "生年月日",
        name: "birthday",
        required: true,
        requiredMessage: "必須項目です",
        component: "Input",
        type: "text",
        defaultValue: user ? user.birthday : "",
      },
      {
        label: "性別",
        name: "gender",
        type: "radio",
        component: "Radio",
        required: false,
        requiredMessage: "性別の選択は必須です",
        options: [
          { value: "male", label: "男性" },
          { value: "female", label: "女性" },
        ],
        defaultValue: user.gender ? user.gender : "",
      },
      {
        label: "住所",
        name: "address",
        required: true,
        requiredMessage: "必須項目です",
        component: "Input",
        type: "text",
        defaultValue: user ? user.address : "",
      },
      {
        label: "電話番号",
        name: "tel",
        required: true,
        requiredMessage: "必須項目です",
        component: "Input",
        type: "text",
        defaultValue: user ? user.tel : "",
      },
      {
        label: "最終学歴",
        name: "graduation",
        required: true,
        requiredMessage: "必須項目です",
        component: "Input",
        type: "text",
        defaultValue: user ? user.graduation : "",
      },
      {
        label: "配偶者",
        name: "spouse",
        required: false,
        requiredMessage: "必須項目です",
        component: "Radio",
        type: "text",
        defaultValue: user.spouse ? (user.spouse === true ? "1" : "0") : "",
        options: [
          { value: "1", label: "あり" },
          { value: "0", label: "なし" },
        ],
      },
    ];

    const {
      handleSubmit,
      register,
      getValues,
      control,
      watch,
      formState: { errors, isSubmitting },
    } = useForm<formInputs>();

    // フォームが送信されたときの処理
    const onSubmit = handleSubmit(async (data) => {
      try {
        const response = await fetch(
          `/api/updateUser?name=${data.name}&email=${user.email}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        const result = await response.json();
        session.user.name = result.user.name || null;
        session.user.role = result.user.role || null;
        session.user.companies = result.user.companies || null;
        session.user.ruby = result.user.ruby || null;
        session.user.birthday = result.user.birthday || null;
        session.user.gender = result.user.gender || null;
        session.user.address = result.user.address || null;
        session.user.ted = result.user.tel || null;
        session.user.graduation = result.user.graduation || null;
        session.user.spouse = result.user.spouse || null;

        setMessage(result.message);
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    });
    return (
      <>
        <div className="w-1/2 mx-auto">
          <h2>プロフィール編集</h2>
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
              {formFields.length > 0 ? (
                formFields.map((field, index) => {
                  let Component;
                  if (field.component === "Textarea") {
                    Component = Textarea;
                  } else if (field.component === "Select") {
                    Component = Select;
                  } else if (field.component === "Radio") {
                    Component = RadioGroup;
                  } else {
                    Component = Input;
                  }

                  return (
                    <FormControl
                      key={index}
                      mb={5}
                      isRequired={field.required}
                      isInvalid={Boolean(errors[field.name])}
                    >
                      <FormLabel htmlFor={field.name}>{field.label}</FormLabel>
                      {field.component === "Radio" ? (
                        field.name === "gender" ? (
                          <Controller
                            name={field.name}
                            control={control}
                            defaultValue={field.defaultValue}
                            render={({ field }) => (
                              <RadioGroup {...field}>
                                <Radio value="male">男性</Radio>
                                <Radio value="female">女性</Radio>
                              </RadioGroup>
                            )}
                          />
                        ) : (
                          <Controller
                            name={field.name}
                            control={control}
                            defaultValue={field.defaultValue}
                            render={({ field }) => (
                              <RadioGroup {...field}>
                                <Radio value="1">あり</Radio>
                                <Radio value="0">なし</Radio>
                              </RadioGroup>
                            )}
                          />
                        )
                      ) : (
                        <Component
                          id={field.name}
                          type={field.type}
                          defaultValue={field.defaultValue}
                          {...register(field.name, {
                            required: field.required
                              ? field.requiredMessage
                              : false,
                          })}
                        >
                          {field.options &&
                            field.options.map((option, i) => (
                              <option key={i} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                        </Component>
                      )}
                      <FormErrorMessage>
                        {errors[field.name] && errors[field.name].message}
                      </FormErrorMessage>
                    </FormControl>
                  );
                })
              ) : (
                <p>Loading...</p>
              )}

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
        </div>
        <div>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      </>
    );
  }
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

  let user = null;

  try {
    user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
      include: {
        companies: true,
      },
    });

    if (user) {
      // UserのDateフィールドを文字列に変換
      user.createdAt = user.createdAt.toISOString();
      user.updatedAt = user.updatedAt.toISOString();
      user.emailVerified = user.emailVerified.toISOString();

      user.emailVerified.map((company) => {
        return {
          ...company,
          createdAt: company.createdAt.toISOString(),
          updatedAt: company.updatedAt.toISOString(),
        };
      });
    }
  } catch (error) {
    console.error(error);
  }

  return {
    props: { user },
  };
}
