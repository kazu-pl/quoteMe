import { InputNumber, InputNumberProps, Typography } from "antd";
import {
  StyledTextWrapper,
  StyledLabel,
} from "./NumberInputReactHookForm.styled";
import {
  Controller,
  Control,
  FieldValues,
  Path,
  UnpackNestedValue,
  PathValue,
  FieldError,
} from "react-hook-form";

const { Text } = Typography;

export interface NumberInputReactHookFormProps<T>
  extends Omit<
    InputNumberProps,
    "name" | "onChange" | "onBlur" | "value" | "defaultValue"
  > {
  name: Path<T>;
  control: Control<T>;
  label: string;
  defaultValue?: UnpackNestedValue<PathValue<T, Path<T>>> | undefined;
  error?: FieldError;
  helperText?: string;
}

const NumberInputReactHookForm = <T extends FieldValues>({
  name,
  control,
  defaultValue,
  error,
  helperText,
  id,
  label,
  ...rest
}: NumberInputReactHookFormProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <div>
          <StyledTextWrapper>
            <StyledLabel htmlFor={id}>{label}</StyledLabel>
          </StyledTextWrapper>

          <InputNumber id={id} {...field} {...rest} />

          {(!!error?.message || helperText) && (
            <StyledTextWrapper>
              <Text type={error ? "danger" : undefined}>
                {error?.message || helperText}
              </Text>
            </StyledTextWrapper>
          )}
        </div>
      )}
    />
  );
};

export default NumberInputReactHookForm;
