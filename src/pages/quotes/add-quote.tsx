import type { NextPage } from "next";
import HeadDecorator from "components/HeadDecorator";
import PrivateRoute from "common/router/PrivateRoute";
import DashboardWrapper from "common/wrappers/DashboardWrapper";
import { Typography, notification } from "antd";
import yup from "common/yup";
import { useForm } from "react-hook-form";
import InputReactHookForm from "components/reactHookForm/InputReactHookForm";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useAppDispatch } from "common/store/hooks";
import { addQuote } from "features/quotes/quotesSlice";
import {
  FailedReqMsg,
  RequestAddQuote,
  SuccessfulReqMsg,
} from "types/api.types";
import Box from "components/Box/Box";
import Button from "antd/lib/button";
import NumberInputReactHookForm from "components/reactHookForm/NumberInputReactHookForm/InputReactHookForm";

const validationSchema = yup.object({
  author: yup.string().required(),
  quote: yup.string().required(),
  posted: yup.number().required(),
});

const AddQuotePage: NextPage = () => {
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RequestAddQuote>({
    mode: "all",
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (values: RequestAddQuote) => {
    try {
      const response = await dispatch(addQuote(values));

      const { message } = response.payload as SuccessfulReqMsg;

      notification.success({
        message: null,
        description: message,
      });
      reset();
    } catch (error) {
      const messageToDispaly =
        typeof error === "string" ? error : (error as FailedReqMsg).message;

      notification.error({
        message: null,
        description: messageToDispaly,
      });
    }
  };

  return (
    <>
      <HeadDecorator
        title="Dodaj cytat"
        description="Strona dodawania cytatu"
      />

      <PrivateRoute>
        <DashboardWrapper title="Dashboard">
          <Box marginBottom={16}>
            <Typography.Title level={5} style={{ fontWeight: "normal" }}>
              Dodaj Cytat
            </Typography.Title>
          </Box>
          <Box maxWidth={800}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box marginBottom={15}>
                <InputReactHookForm
                  name="author"
                  control={control}
                  placeholder="Autor"
                  error={errors.author}
                  label="Wprowadź autora"
                  disabled={isSubmitting}
                />
              </Box>

              <Box marginBottom={15}>
                <InputReactHookForm
                  name="quote"
                  control={control}
                  placeholder="quote"
                  error={errors.quote}
                  label="Wprowadź cytat"
                  disabled={isSubmitting}
                />
              </Box>

              <Box marginBottom={15}>
                <NumberInputReactHookForm
                  name="posted"
                  control={control}
                  placeholder="Rok"
                  error={errors.posted}
                  label="Wprowadź rok"
                  disabled={isSubmitting}
                />
              </Box>

              <Box display="flex" justifyContent="flex-end">
                <Button htmlType="submit" type="primary" loading={isSubmitting}>
                  Dodaj
                </Button>
              </Box>
            </form>
          </Box>
        </DashboardWrapper>
      </PrivateRoute>
    </>
  );
};

export default AddQuotePage;
