import axios from "axios";

import { API_URL } from "common/constants/env";
import type { NextApiHandler } from "next";
import {
  FailedReqMsg,
  RequestRegisterCredentials,
  SuccessfulReqMsg,
} from "types/api.types";

const countHandler: NextApiHandler = async (request, response) => {
  const body = request.body as RequestRegisterCredentials;

  try {
    await axios.post(`${API_URL}/user/register`, body);

    response.json({ message: "Pomyślnie utworzono konto" } as SuccessfulReqMsg);
  } catch (err) {
    response.status(400).json({
      message: "Wystąpił błąd. Sprawdź połączenie i poprawność danych",
    } as FailedReqMsg);
  }
};

export default countHandler;
