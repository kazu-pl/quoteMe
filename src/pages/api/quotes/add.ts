import { axiosInstance } from "common/axios";

import { API_URL } from "common/constants/env";
import type { NextApiHandler } from "next";
import {
  FailedReqMsg,
  RequestAddQuote,
  SuccessfulReqMsg,
} from "types/api.types";

const addQuoteHandler: NextApiHandler = async (request, response) => {
  try {
    const { token, ...values } = request.body as RequestAddQuote & {
      token: string;
    };

    console.log({
      token,
      values,
      WHERE: "addQuoteHandler",
      url_to_api: `${API_URL}/quote/post`,
    });

    const res = await axiosInstance.post(
      `/quote/post`,
      values as RequestAddQuote,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log({ addQuoteHandler_res: res });

    response.json({ message: "Pomyślnie utworzono cytat" } as SuccessfulReqMsg);
  } catch (err) {
    console.log({ addQuoteHandler_err: err });
    response.status(400).json({
      message: "Wystąpił błąd. Sprawdź połączenie i poprawność danych",
    } as FailedReqMsg);
  }
};

export default addQuoteHandler;
