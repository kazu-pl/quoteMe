import { StyledCorePageWrapper, StyledContentWrapper } from "./CoreView.styled";

import { Typography } from "antd";

const { Title, Paragraph } = Typography;

export interface CoreViewProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

const CoreView = ({ children, title, description }: CoreViewProps) => {
  return (
    <StyledCorePageWrapper>
      <StyledContentWrapper>
        <Title level={1}>{title}</Title>

        {description && <Paragraph>{description}</Paragraph>}

        {children}
      </StyledContentWrapper>
    </StyledCorePageWrapper>
  );
};

export default CoreView;
