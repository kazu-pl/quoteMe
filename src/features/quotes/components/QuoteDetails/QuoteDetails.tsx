import {
  FailedReqMsg,
  RequestAddQuote,
  ResponseSingleQuote,
  SuccessfulReqMsg,
} from "types/api.types";
import { Button, Modal, Typography, notification } from "antd";
import { Dispatch, SetStateAction, useState } from "react";
import Box from "components/Box/Box";
import { EditOutlined, DeleteTwoTone } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "common/store/hooks";
import {
  editQuote,
  removeQuote,
  selectQuotesList,
  setQuotesList,
} from "features/quotes/quotesSlice";
import QuoteForm, { FormValues } from "features/quotes/components/QuoteForm";

import { UseFormReset } from "react-hook-form";
const { Title, Paragraph } = Typography;

export interface QuoteDetailsProps {
  data: ResponseSingleQuote;
  setSelectdQuote: Dispatch<SetStateAction<ResponseSingleQuote | null>>;
  fetchItems: () => void;
}

const QuoteDetails = ({
  data,
  setSelectdQuote,
  fetchItems,
}: QuoteDetailsProps) => {
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const { data: quotesList } = useAppSelector(selectQuotesList);

  const dispatch = useAppDispatch();

  const handleRemoveQuote = async () => {
    try {
      setIsRemoveModalOpen(false);
      const response = await dispatch(removeQuote(data.id));

      setSelectdQuote(null);

      if (quotesList?.length === 1) {
        dispatch(setQuotesList([]));
      } else {
        fetchItems();
      }

      notification.info({
        message: null,
        description:
          typeof response.payload === "string"
            ? response.payload
            : (response.payload as SuccessfulReqMsg).message,
      });
    } catch (err) {
      notification.error({
        message: null,
        description:
          typeof err === "string" ? err : (err as FailedReqMsg).message,
      });
    }
  };

  const handleEdit =
    (reset: UseFormReset<RequestAddQuote>) => async (values: FormValues) => {
      try {
        const response = await dispatch(editQuote({ ...values, id: data.id }));

        const { message } = response.payload as SuccessfulReqMsg;

        notification.info({
          message: null,
          description: message,
        });
        setIsEditMode(false);
        fetchItems();
        setSelectdQuote(null);
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
      {!isEditMode ? (
        <>
          <Title level={5}>Autor: </Title>
          <Paragraph>{data.author}</Paragraph>
          <Title level={5}>Cytat: </Title>
          <Paragraph>{data.quote}</Paragraph>
          <Box display="flex" justifyContent="flex-end">
            <Box marginRight={8}>
              <Button
                onClick={() => setIsEditMode(true)}
                shape="circle"
                icon={<EditOutlined />}
              />
            </Box>
            <Button
              shape="circle"
              icon={<DeleteTwoTone twoToneColor="#eb2f96" />}
              onClick={() => setIsRemoveModalOpen(true)}
            />
          </Box>
        </>
      ) : (
        <>
          <QuoteForm
            onSubmitFn={handleEdit}
            okText="Aktualizuj"
            additionalBtn={
              <Button onClick={() => setIsEditMode(false)}>Anuluj</Button>
            }
            defaultValues={{ author: data.author, quote: data.quote }}
          />
        </>
      )}

      {
        <Modal
          visible={isRemoveModalOpen}
          title="Usuwanie"
          cancelText="Nie"
          onCancel={() => setIsRemoveModalOpen(false)}
          okText="Tak"
          onOk={() => handleRemoveQuote()}
        >
          <Paragraph>Czy na pewno chcesz usunąć ten cytat?</Paragraph>
        </Modal>
      }
    </>
  );
};

export default QuoteDetails;
