import axios from "axios";

import { API_URL } from "common/constants/env";
import type { NextApiHandler } from "next";
import { FailedReqMsg } from "types/api.types";

const loggedIn: NextApiHandler = async (_, response) => {
  try {
    const res = await axios.get(`${API_URL}/user/loggedIn`);

    response.json({ data: res.data });
  } catch (err) {
    response.status(400).json({
      message: "Wystąpił błąd. Sprawdź połączenie i poprawność danych",
    } as FailedReqMsg);
  }
};

export default loggedIn;
