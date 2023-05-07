import axios from "axios";

import { API_URL } from "common/constants/env";
import type { NextApiHandler } from "next";
import { FailedReqMsg, RequestLoginCredentials } from "types/api.types";

const loginHandler: NextApiHandler = async (request, response) => {
  const body = request.body as RequestLoginCredentials;

  try {
    const res = await axios.post(`${API_URL}/user/login`, body);

    response.json({ data: res.data });
  } catch (err) {
    response.status(400).json({
      message: "Wystąpił błąd. Sprawdź połączenie i poprawność danych",
    } as FailedReqMsg);
  }
};

export default loginHandler;
