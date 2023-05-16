import type { NextPage } from "next";
import Button from "antd/lib/button";
import { message, notification, Spin } from "antd";
import CoreView from "layouts/CoreView";
import { useForm } from "react-hook-form";
import InputReactHookForm from "components/reactHookForm/InputReactHookForm";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import yup from "common/yup";
import Box from "components/Box";
import Link from "next/link";
import { PATHS_CORE, PATHS_QUOTES } from "common/constants/paths";
import { RequestLoginCredentials } from "types/api.types";
import HeadDecorator from "components/HeadDecorator";
import { useAppDispatch } from "common/store/hooks";
import { login } from "core/store/userSlice";
import { useRouter } from "next/router";
import { getAccessToken, isTokenExpired } from "common/auth/tokens";
import { useEffect, useState } from "react";

const validationSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

export const logoutQueryKey = "reason";
export const logoutQueryValue = "sessionEnded";

const IndexPage: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isCheckingTokens, setIsCheckingTokens] = useState(true);

  const token = getAccessToken();

  //// previously it was useLayoutEffect
  useEffect(() => {
    if (token && !isTokenExpired(token)) {
      router.push(PATHS_QUOTES.QUOTES_LIST);
    } else {
      setIsCheckingTokens(false);
    }
  }, [setIsCheckingTokens, token, router]);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      router.query.hasOwnProperty(logoutQueryKey) &&
      router.query[logoutQueryKey] === logoutQueryValue
    ) {
      message.info("Twoja sesja wygasła. Zaloguj się ponownie.");
    }
  }, [router.query]);

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RequestLoginCredentials>({
    mode: "all",
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (values: RequestLoginCredentials) => {
    try {
      await dispatch(login(values));

      router.push(PATHS_QUOTES.QUOTES_LIST);
    } catch (error) {
      notification.error({
        message: null,
        description: error as string,
      });
    }
  };

  if (isCheckingTokens) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Spin size="large" />
      </Box>
    );
  }

  return (
    <>
      <HeadDecorator title="Logowanie" description="Strona logowania" />

      <CoreView title="Logowanie">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box marginBottom={15}>
            <InputReactHookForm
              name="username"
              control={control}
              placeholder="e-mail"
              error={errors.username}
              label="Wprowadź login"
            />
          </Box>

          <Box marginBottom={15}>
            <InputReactHookForm
              name="password"
              control={control}
              placeholder="password"
              error={errors.password}
              type="password"
              label="Wprowadź hasło"
            />
          </Box>

          <Box display="flex" justifyContent="flex-end">
            <Button htmlType="submit" type="primary" loading={isSubmitting}>
              Zaloguj się
            </Button>
          </Box>

          <Box display="flex" justifyContent="space-between" marginTop={8}>
            <Link href={PATHS_CORE.REGISTER}>
              <a>Załóż konto</a>
            </Link>
          </Box>
        </form>
      </CoreView>
    </>
  );
};

export default IndexPage;
