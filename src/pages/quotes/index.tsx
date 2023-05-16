import type { NextPage } from "next";
import HeadDecorator from "components/HeadDecorator";
import PrivateRoute from "common/router/PrivateRoute";
import DashboardWrapper from "common/wrappers/DashboardWrapper";
import { Button, Space, Typography } from "antd";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "common/store/hooks";
import {
  getSingleUserAllQuotes,
  selectQuotesList,
} from "features/quotes/quotesSlice";
import Box from "components/Box/Box";
import { Card, Spin } from "antd";
import renderMaxLengthText from "utils/renderMaxLengthText";
import Link from "next/link";
import { PATHS_QUOTES } from "common/constants/paths";
import { DeleteOutlined } from "@ant-design/icons";

const DashboardPage: NextPage = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, error } = useAppSelector(selectQuotesList);

  useEffect(() => {
    dispatch(getSingleUserAllQuotes());
  }, [dispatch]);

  return (
    <>
      <HeadDecorator title="dashbaord" description="Strona dashboardu" />

      <PrivateRoute>
        <DashboardWrapper title="Dashboard">
          <Box marginBottom={16}>
            <Typography.Title level={5} style={{ fontWeight: "normal" }}>
              Lista cytatów
            </Typography.Title>
          </Box>

          {isLoading && <Spin />}

          {error && (
            <Typography.Title
              level={5}
              style={{ fontWeight: "normal", color: "red" }}
            >
              Nie udało się pobrać lisy cytatów
            </Typography.Title>
          )}

          <Space size={[16, 16]} wrap>
            {data &&
              data.map((quote) => (
                <Card
                  key={quote.id}
                  title={renderMaxLengthText(quote.author)}
                  style={{ width: 300 }}
                  extra={
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Box marginRight={8}>
                        <Link href={PATHS_QUOTES.SINGLE_QUOTE(quote.id)}>
                          <a>więcej...</a>
                        </Link>
                      </Box>

                      <Button
                        icon={<DeleteOutlined />}
                        onClick={() => alert("remove")}
                        shape="circle"
                      />
                    </Box>
                  }
                >
                  <p>{renderMaxLengthText(quote.quote)}</p>
                </Card>
              ))}
          </Space>
        </DashboardWrapper>
      </PrivateRoute>
    </>
  );
};

export default DashboardPage;
