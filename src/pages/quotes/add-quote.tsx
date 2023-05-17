import type { NextPage } from "next";
import HeadDecorator from "components/HeadDecorator";
import PrivateRoute from "common/router/PrivateRoute";
import DashboardWrapper from "common/wrappers/DashboardWrapper";
import { Typography, notification } from "antd";
import { UseFormReset } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "common/store/hooks";
import { addQuote } from "features/quotes/quotesSlice";
import {
  FailedReqMsg,
  RequestAddQuote,
  SuccessfulReqMsg,
} from "types/api.types";
import Box from "components/Box/Box";
import { selectUserData } from "core/store/userSlice";
import QuoteForm, {
  FormValues,
} from "features/quotes/components/QuoteForm/QuoteForm";

const AddQuotePage: NextPage = () => {
  const dispatch = useAppDispatch();

  const userId = useAppSelector(selectUserData);

  const onSubmitFn =
    (reset: UseFormReset<RequestAddQuote>) => async (values: FormValues) => {
      try {
        const response = await dispatch(
          addQuote({ ...values, posted: userId.userId! })
        );

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
            <QuoteForm onSubmitFn={onSubmitFn} />
          </Box>
        </DashboardWrapper>
      </PrivateRoute>
    </>
  );
};

export default AddQuotePage;
