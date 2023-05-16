import {
  FailedReqMsg,
  ResponseSingleQuote,
  SuccessfulReqMsg,
} from "types/api.types";
import { Button, Modal, Typography, notification } from "antd";
import { Dispatch, SetStateAction, useState } from "react";
import Box from "components/Box/Box";
import { EditOutlined, DeleteTwoTone } from "@ant-design/icons";
import { useAppDispatch } from "common/store/hooks";
import { removeQuote } from "features/quotes/quotesSlice";
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

  const dispatch = useAppDispatch();

  const handleRemoveQuote = async () => {
    try {
      setIsRemoveModalOpen(false);
      const response = await dispatch(removeQuote(data.id));

      setSelectdQuote(null);
      fetchItems();
      notification.success({
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
        <Button onClick={() => setIsEditMode(false)}>Anuluj</Button>
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
