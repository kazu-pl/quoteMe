import { Button } from "antd";
import DashboardLayout, { DashboardLayoutProps } from "layouts/Dashboard";
import { useAppDispatch, useAppSelector } from "common/store/hooks";
import { logout, selectUserProfile } from "core/store/userSlice";
import { useRouter } from "next/router";
import { PATHS_CORE, PATHS_DASHBOARD } from "common/constants/paths";
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
import { API_URL } from "common/constants/env";

export interface DashboardWrapperProps
  extends Pick<DashboardLayoutProps, "title" | "children"> {}

const DashboardWrapper = ({ title, children }: DashboardWrapperProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const userProfileData = useAppSelector(selectUserProfile);

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
      subTitle={
        userProfileData
          ? `Witaj, ${userProfileData.name} ${userProfileData.surname}`
          : ""
      }
      avatarUrl={
        userProfileData?.avatar ? API_URL + userProfileData?.avatar : ""
      }
      sidebarItems={[
        {
          variant: "no-dropdown",
          label: "Dashboard",
          icon: <AppstoreOutlined />,
          to: PATHS_DASHBOARD.DASHBOARD,
        },
        {
          variant: "no-dropdown",
          icon: <PieChartOutlined />,
          label: "accout",
          to: PATHS_CORE.ACCOUNT,
          renderBottomLine: true,
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
