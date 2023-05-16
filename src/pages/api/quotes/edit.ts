import { axiosInstance } from "common/axios";

import { API_URL } from "common/constants/env";
import type { NextApiHandler } from "next";
import {
  FailedReqMsg,
  RequestEditQuote,
  SuccessfulReqMsg,
} from "types/api.types";

const editQuoteHandler: NextApiHandler = async (request, response) => {
  try {
    const { token, id, ...values } = request.body as RequestEditQuote & {
      token: string;
      id: number;
    };

    console.log({
      token,
      values,
      WHERE: "editQuoteHandler",
      url_to_api: `${API_URL}/quote/post`,
    });

    const res = await axiosInstance.patch(
      `/quote/update/${id}`,
      values as RequestEditQuote,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log({ editQuoteHandler_res: res });

    response.json({
      message: "Pomyślnie zaktualizowano cytat",
    } as SuccessfulReqMsg);
  } catch (err) {
    console.log({ editQuoteHandler_err: err });
    response.status(400).json({
      message: "Wystąpił błąd. Sprawdź połączenie i poprawność danych",
    } as FailedReqMsg);
  }
};

export default editQuoteHandler;
