import { StyledBox } from "./Box.styled";

export interface BoxProps extends Omit<React.CSSProperties, "translate"> {
  children?: React.ReactNode;
  className?: string;
}

const Box = ({ children, className, ...rest }: BoxProps) => {
  return (
    <StyledBox className={className} styles={rest}>
      {children}
    </StyledBox>
  );
};

export default Box;
