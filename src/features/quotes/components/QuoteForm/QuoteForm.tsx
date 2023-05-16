import yup from "common/yup/yup";
import Box from "components/Box/Box";
import InputReactHookForm from "components/reactHookForm/InputReactHookForm/InputReactHookForm";
import { RequestAddQuote } from "types/api.types";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useForm, UseFormReset } from "react-hook-form";

import Button from "antd/lib/button";

const validationSchema = yup.object({
  author: yup.string().required().max(300),
  quote: yup.string().required().max(300),
});

export interface FormValues extends Omit<RequestAddQuote, "posted"> {}

interface QuoteFormProps {
  onSubmitFn: (
    reset: UseFormReset<RequestAddQuote>
  ) => (values: FormValues) => Promise<void>;
  okText?: string;
  additionalBtn?: React.ReactNode;
  defaultValues?: FormValues;
}
const QuoteForm = ({
  onSubmitFn,
  okText = "Dodaj",
  additionalBtn,
  defaultValues,
}: QuoteFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RequestAddQuote>({
    mode: "all",
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmitFn(reset))}>
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
          placeholder="Cytat"
          error={errors.quote}
          label="Wprowadź cytat"
          disabled={isSubmitting}
          maxLength={10}
        />
      </Box>

      <Box display="flex" justifyContent="flex-end">
        {additionalBtn}
        <Box marginLeft={8}>
          <Button htmlType="submit" type="primary" loading={isSubmitting}>
            {okText}
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default QuoteForm;
