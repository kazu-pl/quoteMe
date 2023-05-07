import { PATHS_CORE } from "common/constants/paths";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { LOCALSTORAGE_AUTH_TOKEN } from "common/constants/auth";

const useTokenListener = () => {
  const router = useRouter();

  const handleStorageChange = useCallback(
    (e: StorageEvent) => {
      if (e.key === LOCALSTORAGE_AUTH_TOKEN && e.newValue === null) {
        router.push(PATHS_CORE.LOGOUT);
      }
    },
    [router]
  );

  useEffect(() => {
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [handleStorageChange]);
};

export default useTokenListener;
