import type { NextPage } from "next";
import HeadDecorator from "components/HeadDecorator";
import PrivateRoute from "common/router/PrivateRoute";
import DashboardWrapper from "common/wrappers/DashboardWrapper";
import { Typography } from "antd";

const DashboardPage: NextPage = () => {
  return (
    <>
      <HeadDecorator title="dashbaord" description="Strona dashboardu" />

      <PrivateRoute>
        <DashboardWrapper title="Dashboard">
          <Typography.Title level={5} style={{ fontWeight: "normal" }}>
            Witaj
          </Typography.Title>
        </DashboardWrapper>
      </PrivateRoute>
    </>
  );
};

export default DashboardPage;
