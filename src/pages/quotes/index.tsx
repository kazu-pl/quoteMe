import type { NextPage } from "next";
import HeadDecorator from "components/HeadDecorator";
import PrivateRoute from "common/router/PrivateRoute";
import DashboardWrapper from "common/wrappers/DashboardWrapper";
import { Button, Modal, Space, Typography } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "common/store/hooks";
import {
  getSingleUserAllQuotes,
  selectQuotesList,
} from "features/quotes/quotesSlice";
import Box from "components/Box/Box";
import { Card, Spin } from "antd";
import renderMaxLengthText from "utils/renderMaxLengthText";

import { MoreOutlined } from "@ant-design/icons";
import { ResponseSingleQuote } from "types/api.types";
import QuoteDetails from "features/quotes/components/QuoteDetails";

const DashboardPage: NextPage = () => {
  const [selectedQuote, setSelectdQuote] = useState<null | ResponseSingleQuote>(
    null
  );

  const dispatch = useAppDispatch();
  const { data, isLoading, error } = useAppSelector(selectQuotesList);

  const fetchItems = useCallback(() => {
    dispatch(getSingleUserAllQuotes());
  }, [dispatch]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

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
                        <Button
                          shape="circle"
                          icon={<MoreOutlined />}
                          onClick={() => setSelectdQuote(quote)}
                        ></Button>
                      </Box>
                    </Box>
                  }
                >
                  <p style={{ fontStyle: "italic" }}>
                    {`"${renderMaxLengthText(quote.quote)}"`}
                  </p>
                </Card>
              ))}
          </Space>

          <Modal
            visible={!!selectedQuote}
            title="Cytat"
            footer={
              <Button onClick={() => setSelectdQuote(null)}>Zamknij</Button>
            }
            onCancel={() => setSelectdQuote(null)}
          >
            <QuoteDetails
              data={selectedQuote!}
              setSelectdQuote={setSelectdQuote}
              fetchItems={fetchItems}
            />
          </Modal>
        </DashboardWrapper>
      </PrivateRoute>
    </>
  );
};

export default DashboardPage;
