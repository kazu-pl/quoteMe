import { axiosInstance } from "common/axios";

import type { NextApiHandler } from "next";
import { FailedReqMsg, SuccessfulReqMsg } from "types/api.types";

const removeQuoteHandler: NextApiHandler = async (request, response) => {
  try {
    const { token, id } = request.body as {
      token: string;
      id: number;
    };

    console.log({
      token,
      id,
      WHERE: "removeQuoteHandler",
    });

    const res = await axiosInstance.delete(`/quote/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log({ removeQuoteHandler_res: res });

    response.json({ message: "Pomyślnie usunięto cytat" } as SuccessfulReqMsg);
  } catch (err) {
    console.log({ removeQuoteHandler_err: err });
    response.status(400).json({
      message: "Wystąpił błąd. Sprawdź połączenie i poprawność danych",
    } as FailedReqMsg);
  }
};

export default removeQuoteHandler;
