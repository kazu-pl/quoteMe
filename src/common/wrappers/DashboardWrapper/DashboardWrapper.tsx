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
  FilePdfTwoTone,
} from "@ant-design/icons";
import { Fragment } from "react";
import Link from "next/link";

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
          renderBottomLine: true,
        },
        {
          variant: "no-dropdown",
          icon: <FilePdfTwoTone />,
          label: "LOSUJ CYTAT",
          to: PATHS_QUOTES.GET_QUOTE_PDF,
        },
      ]}
      extra={
        <Fragment key={"extra_items"}>
          <StyledDesktopBtnWrapper>
            <Button onClick={handleLogout}>Wyloguj</Button>
          </StyledDesktopBtnWrapper>

          <Link href={PATHS_QUOTES.GET_QUOTE_PDF}>
            <a className="ant-btn ant-btn-primary" target="_blank">
              <FilePdfTwoTone /> LOSUJ CYTAT
            </a>
          </Link>

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
