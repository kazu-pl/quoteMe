import { Provider } from "react-redux";
import type { AppProps } from "next/app";

import CreateGlobalStyle from "common/styles/globalStyles.styled";
import "antd/dist/antd.css";

import store from "../common/store/store";
import theme from "common/styles/theme";
import { ThemeProvider, StyleSheetManager } from "styled-components";
import { notification } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import React from "react";

// below code prevents warning of not using useLayoutEffect in SSR. Solution was found here: https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85#gistcomment-3886909
if (!process.browser) React.useLayoutEffect = React.useEffect;

notification.config({
  closeIcon: <CloseCircleOutlined />,
  placement: "bottomLeft",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <CreateGlobalStyle />
      <StyleSheetManager disableVendorPrefixes>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </StyleSheetManager>
    </Provider>
  );
}

export default MyApp;
