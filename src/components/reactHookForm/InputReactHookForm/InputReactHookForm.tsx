import { Input, InputProps, Typography } from "antd";
import { StyledTextWrapper, StyledLabel } from "./InputReactHookForm.styled";
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

export interface InputReactHookFormProps<T>
  extends Omit<
    InputProps,
    "name" | "onChange" | "onBlur" | "value" | "defaultValue"
  > {
  name: Path<T>;
  control: Control<T>;
  label: string;
  defaultValue?: UnpackNestedValue<PathValue<T, Path<T>>> | undefined;
  error?: FieldError;
  helperText?: string;
}

const InputReactHookForm = <T extends FieldValues>({
  name,
  control,
  defaultValue,
  error,
  helperText,
  id,
  label,
  ...rest
}: InputReactHookFormProps<T>) => {
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

          <Input id={id} {...field} {...rest} />

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

export default InputReactHookForm;
