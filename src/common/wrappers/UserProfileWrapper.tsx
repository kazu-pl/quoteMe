import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "common/store/hooks";
import { fetchUserData, selectUserId } from "core/store/userSlice";
import { getUserId } from "common/auth/tokens";

export interface UserProfileWrapperProps {
  children: React.ReactNode;
}

const UserProfileWrapper = ({ children }: UserProfileWrapperProps) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);
  const userIdFromLS = getUserId();

  useEffect(() => {
    if (!userId || !userIdFromLS) {
      dispatch(fetchUserData());
    }
  }, [dispatch, userId, userIdFromLS]);

  return <>{children}</>;
};

export default UserProfileWrapper;
