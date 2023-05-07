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
    const { token, posted, ...values } = request.body as RequestAddQuote & {
      token: string;
    };

    await axiosInstance.post(
      `${API_URL}/quote/post`,
      values as RequestAddQuote,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    response.json({ message: "Pomyślnie utworzono cytat" } as SuccessfulReqMsg);
  } catch (err) {
    response.status(400).json({
      message: "Wystąpił błąd. Sprawdź połączenie i poprawność danych",
    } as FailedReqMsg);
  }
};

export default addQuoteHandler;
