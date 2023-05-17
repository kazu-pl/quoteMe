import { axiosInstance } from "common/axios";
import type { NextApiHandler } from "next";
import { FailedReqMsg } from "types/api.types";

const getSingleUserAllQuotesHandler: NextApiHandler = async (
  request,
  response
) => {
  try {
    const { token } = request.query;

    console.log({ token, WHERE: "getSingleUserAllQuotesHandler" });

    const res = await axiosInstance.get(`/quote/getAll`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log({ getSingleUserAllQuotesHandler_data: res });

    response.json({ data: res.data });
  } catch (err) {
    console.log({
      getSingleUserAllQuotesHandler_err: err,
    });
    response.status(400).json({
      message: "Wystąpił błąd. Sprawdź połączenie i poprawność danych",
    } as FailedReqMsg);
  }
};

export default getSingleUserAllQuotesHandler;
