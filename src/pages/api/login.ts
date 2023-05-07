import axios from "axios";

import type { NextApiHandler } from "next";

const countHandler: NextApiHandler = async (request, response) => {
  const values: any = request.body;
  try {
    const res = await axios.post(
      "https://quote-app-mog8.onrender.com/user/register",
      {
        username: "ktosfajny",
        password: "qwerty123",
      }
    );

    console.log({ res });

    response.json({ data: res.data });
  } catch (err) {
    response.status(400).json({ message: "błąd jakiś" });
  }
};

export default countHandler;
