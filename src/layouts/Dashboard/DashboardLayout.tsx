import {
  StyledDashboardWrapper,
  StyledSidebarWrapper,
  StyledDrawerWrapper,
  StyledMenuIconWrapper,
  StyledSubtitleWrapper,
} from "./Dashboard.styled";
import { PageHeaderProps, Affix, Button } from "antd";
import Box from "components/Box";
import { PageHeader, Drawer } from "antd";
import Sidebar, { SidebarProps } from "./Sidebar";
import { useState } from "react";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import ColoredIconWrapper from "components/ColoredIconWrapper";

export interface DashboardLayoutProps {
  children?: React.ReactNode;
  title: string;
  subTitle?: string;
  extra?: PageHeaderProps["extra"];
  sidebarItems: SidebarProps["items"];
  avatarUrl?: string;
}

const DashboardLayout = ({
  title,
  subTitle,
  children,
  extra,
  sidebarItems,
  avatarUrl,
}: DashboardLayoutProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleCloseDrawer = () => setIsDrawerOpen(false);
  const handleOpenDrawer = () => setIsDrawerOpen(true);

  return (
    <StyledDashboardWrapper>
      <Affix offsetTop={0}>
        <PageHeader
          title={title}
          subTitle={<StyledSubtitleWrapper>{subTitle}</StyledSubtitleWrapper>}
          avatar={{
            src: avatarUrl,
          }}
          extra={[
            extra,
            <StyledMenuIconWrapper key="hamburgerMenu">
              <Button onClick={handleOpenDrawer} shape="circle">
                <MenuOutlined />
              </Button>
            </StyledMenuIconWrapper>,
          ]}
          className="pageHeader"
        />
      </Affix>
      <Box display="flex" flexGrow={1}>
        <StyledSidebarWrapper width={256}>
          <Sidebar width={256} items={sidebarItems} />
        </StyledSidebarWrapper>

        <StyledDrawerWrapper>
          <Drawer
            placement="left"
            onClose={handleCloseDrawer}
            visible={isDrawerOpen}
            width="auto"
            bodyStyle={{
              padding: 0,
            }}
            headerStyle={{
              backgroundColor: "#001529",
              borderBottom: `1px solid rgba(255,255,255,0.5)`,
              paddingBottom: 16,
            }}
            closeIcon={
              <ColoredIconWrapper color="white">
                <CloseOutlined />
              </ColoredIconWrapper>
            }
          >
            <Sidebar width={256} items={sidebarItems} />
          </Drawer>
        </StyledDrawerWrapper>
        <Box flexGrow={1}>
          <Box margin="24px">{children}</Box>
        </Box>
      </Box>
    </StyledDashboardWrapper>
  );
};

export default DashboardLayout;
