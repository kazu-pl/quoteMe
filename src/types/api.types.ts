export interface RequestLoginCredentials {
  username: string;
  password: string;
}

export type ResponseLoginAccessToken = string;

export interface RequestRegisterCredentials {
  username: string;
  password: string;
}

export interface SinglePost {
  id: number;
  author: string;
  quote: string;
  posted: number;
}
/**
 * this type is the type of error you can catch in catch() in redux-toolkit createAsyncThunk
 * @example {"message":"An error occured when trying to register new resource","error":"error object."}
 */
export interface FailedReqMsg {
  /** response message */
  message: string;

  /** response error */
  error?: any;
}

export interface SuccessfulReqMsg {
  /** message you can dispaly on front application */
  message: string;
}

export interface RequestAddQuote {
  author: string;
  quote: string;
  posted: number;
}

export interface ResponseSingleQuote {
  id: number;
  author: string;
  quote: string;
  posted: number;
}

export interface DecodedToken {
  exp: number;
  iat: number;
  /**
   * User email
   */
  sub: string;
  userLoggedId: number;
}

export interface RequestEditQuote {
  author: string;
  quote: string;
}
