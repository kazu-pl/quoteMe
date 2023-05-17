import {
  getAccessToken,
  isTokenExpired,
  removeAccessToken,
} from "common/auth/tokens";
import { PATHS_CORE } from "common/constants/paths";
import { useRouter } from "next/router";
import { logoutQueryKey, logoutQueryValue } from "pages";

export interface PrivateRouteProps {
  children?: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const router = useRouter();
  const token = getAccessToken();

  if (typeof window !== "undefined" && !token) {
    router.push(PATHS_CORE.LOGIN);
  }

  if (typeof window !== "undefined" && token && isTokenExpired(token)) {
    removeAccessToken();
    router.push(`${PATHS_CORE.LOGIN}?${logoutQueryKey}=${logoutQueryValue}`);
  }

  return <>{children}</>;
};

export default PrivateRoute;
