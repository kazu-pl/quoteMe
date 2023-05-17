import type { NextPage } from "next";
import Button from "antd/lib/button";
import CoreView from "layouts/CoreView";
import { useForm } from "react-hook-form";
import InputReactHookForm from "components/reactHookForm/InputReactHookForm";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import yup from "common/yup";
import Box from "components/Box";
import { PATHS_CORE } from "common/constants/paths";
import { RequestRegisterCredentials } from "types/api.types";
import { notification } from "antd";
import HeadDecorator from "components/HeadDecorator";
import { useAppDispatch } from "common/store/hooks";
import { register } from "core/store/userSlice";
import { useRouter } from "next/router";
import Link from "next/link";

const validationSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
  repeatedPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Rózne hasła")
    .required(),
});

interface LoginCredentials extends RequestRegisterCredentials {
  repeatedPassword: string;
}

const IndexPage: NextPage = () => {
  const dispatch = useAppDispatch();

  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>({
    mode: "all",
    defaultValues: {
      username: "",
      password: "",
      repeatedPassword: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async ({ repeatedPassword, ...rest }: LoginCredentials) => {
    try {
      const response = await dispatch(register(rest));
      notification.success({
        message: null,
        description: response.payload,
      });
      router.push(PATHS_CORE.LOGIN);
    } catch (err) {
      notification.error({
        message: null,
        description: err as string,
      });
    }
  };

  return (
    <>
      <HeadDecorator title="Rejestracja" description="Strona rejestracji" />

      <CoreView title="Rejestracja">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box marginBottom={15}>
            <InputReactHookForm
              name="username"
              control={control}
              placeholder="Login"
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

          <Box marginBottom={15}>
            <InputReactHookForm
              name="repeatedPassword"
              control={control}
              placeholder="password"
              error={errors.repeatedPassword}
              type="password"
              label="Wprowadź ponownie hasło"
            />
          </Box>

          <Box display="flex" justifyContent="flex-end">
            <Button htmlType="submit" type="primary" loading={isSubmitting}>
              Załóż konto
            </Button>
          </Box>

          <Box display="flex" justifyContent="flex-start" marginTop={8}>
            <Link href={PATHS_CORE.LOGIN}>
              <a>Zaloguj się</a>
            </Link>
          </Box>
        </form>
      </CoreView>
    </>
  );
};

export default IndexPage;
