import {
  Button,
  Container,
  LoadingOverlay,
  PasswordInput,
  TextInput,
  useMantineColorScheme,
} from "@mantine/core";

import { useForm } from "@mantine/form";

import { useHotkeys } from "@mantine/hooks";

import { notifications } from "@mantine/notifications";

import { AxiosError } from "axios";

import { useContext, useEffect } from "react";

import { Navigate, useLocation } from "react-router-dom";

import { AuthContext } from "../../context";

import { useSubmitData } from "./queries";

interface FormValues {
  email: string;
  password: string;
}

export function Login() {
  const { toggleColorScheme } = useMantineColorScheme();

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  const location = useLocation();

  const { token, setAuthData } = useContext(AuthContext);

  const form = useForm<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 8 ? "Name must have at least 8 letters" : null,
    },
  });

  const emailRegex = /^\S+@\S+\.\S+$/;

  const {
    data,
    isSuccess,
    mutate,
    error: loginError,
    isPending,
  } = useSubmitData();

  const error: AxiosError = loginError as AxiosError;

  const handleSubmit = ({ email, password }: FormValues) => {
    mutate({ email, password });
  };

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      setAuthData(data.data);
    }
  }, [data, isSuccess, setAuthData]);

  useEffect(() => {
    if (error) {
      notifications.show({
        title: "Error",
        message:
          (error.response?.status ?? 400) < 500
            ? "Sorry, we can't find an account with this email address and password"
            : "Server Error, please try again later.",
        color: "red",
      });
    }
  }, [error]);

  if (token?.accessToken)
    return <Navigate to={"/"} state={{ from: location }} replace />;

  return (
    <Container size={420} my={40}>
      <LoadingOverlay visible={isPending} />
      <form
        style={{ position: "relative" }}
        onSubmit={form.onSubmit(handleSubmit)}
      >
        <TextInput
          label="Email"
          placeholder="Email"
          {...form.getInputProps("email")}
          mb={"lg"}
        />
        <PasswordInput
          label="Password"
          placeholder="password"
          mb="xl"
          {...form.getInputProps("password")}
        />

        <Button
          type="submit"
          size="md"
          fullWidth
          disabled={
            !(
              form.values.password.length >= 8 &&
              emailRegex.test(form.values.email)
            )
          }
        >
          Sign in{" "}
        </Button>
      </form>
    </Container>
  );
}
