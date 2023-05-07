import { Button } from "antd";
import DashboardLayout, { DashboardLayoutProps } from "layouts/Dashboard";
import { useAppDispatch } from "common/store/hooks";
import { logout } from "core/store/userSlice";
import { useRouter } from "next/router";
import { PATHS_CORE, PATHS_QUOTES } from "common/constants/paths";
import {
  StyledDesktopBtnWrapper,
  StyledMobileBtnWrapper,
} from "./DashboardWrapper.styled";
import {
  AppstoreOutlined,
  PieChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
// import Link from "next/link";
import { Fragment } from "react";

export interface DashboardWrapperProps
  extends Pick<DashboardLayoutProps, "title" | "children"> {}

const DashboardWrapper = ({ title, children }: DashboardWrapperProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await dispatch(logout());

      router.push(PATHS_CORE.LOGIN);
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <DashboardLayout
      title={title}
      avatarUrl={""}
      sidebarItems={[
        {
          variant: "no-dropdown",
          label: "Dashboard",
          icon: <AppstoreOutlined />,
          to: PATHS_QUOTES.QUOTES_LIST,
          renderBottomLine: true,
        },
        {
          variant: "no-dropdown",
          icon: <PieChartOutlined />,
          label: "Dodaj cytat",
          to: PATHS_QUOTES.QUOTES_ADD,
        },
      ]}
      extra={
        <Fragment key={"extra_items"}>
          <StyledDesktopBtnWrapper>
            <Button onClick={handleLogout}>Wyloguj</Button>
          </StyledDesktopBtnWrapper>

          {/* <StyledDesktopBtnWrapper>
            <Link href={PATHS_GAME.GAME}>
              <a className="ant-btn ant-btn-primary">Graj</a>
            </Link>
          </StyledDesktopBtnWrapper> */}

          <StyledMobileBtnWrapper>
            <Button onClick={handleLogout} shape="circle" danger>
              <LogoutOutlined />
            </Button>
          </StyledMobileBtnWrapper>
        </Fragment>
      }
    >
      {children}
    </DashboardLayout>
  );
};

export default DashboardWrapper;
