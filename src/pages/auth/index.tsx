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

import { isAxiosError } from "axios";

import { useContext, useEffect } from "react";

import { Navigate, useLocation } from "react-router-dom";

import { AuthContext } from "context";

import { useSubmitData } from "./queries";

interface FormValues {
  email: string;
  password: string;
}

interface LocationState {
  from: { pathname: string };
}

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

export function Login() {
  const { toggleColorScheme } = useMantineColorScheme();

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  const location = useLocation();

  const pathname = (location.state as LocationState)?.from?.pathname ?? "/";

  const { token, setAuthData } = useContext(AuthContext);

  const form = useForm<FormValues>({
    initialValues: { email: "", password: "" },

    validate: {
      email: (value) => (EMAIL_REGEX.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 8 ? "Name must have at least 8 letters" : null,
    },
  });

  const {
    data,
    isSuccess,
    mutate,
    error: loginError,
    isPending,
  } = useSubmitData();

  const handleSubmit = (payload: FormValues) => {
    mutate(payload);
  };

  useEffect(() => {
    if (isSuccess) {
      setAuthData(data.data);
    }
  }, [data, isSuccess, setAuthData]);

  useEffect(() => {
    if (loginError) {
      if (isAxiosError(loginError)) {
        notifications.show({
          title: "Error",
          message:
            (loginError.status ?? 400) < 500
              ? "Sorry, we can't find an account with this email address and password"
              : "Server Error, please try again later.",
          color: "red",
        });
      } else {
        notifications.show({
          title: "Error",
          message: "Unknown error occurred",
          color: "red",
        });
      }
    }
  }, [loginError]);

  if (token?.accessToken)
    return <Navigate to={pathname} state={{ from: location }} replace />;

  return (
    <Container size={420} py={40}>
      <LoadingOverlay visible={isPending} />
      <form
        style={{ position: "relative" }}
        onSubmit={form.onSubmit(handleSubmit)}
      >
        <TextInput
          label="Email"
          placeholder="Email"
          mb="lg"
          {...form.getInputProps("email")}
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
              EMAIL_REGEX.test(form.values.email)
            )
          }
        >
          Sign in
        </Button>
      </form>
    </Container>
  );
}
