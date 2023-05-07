import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "common/store/hooks";
import { fetchUserData, selectUserProfile } from "core/store/userSlice";

export interface UserProfileWrapperProps {
  children: React.ReactNode;
}

const UserProfileWrapper = ({ children }: UserProfileWrapperProps) => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(selectUserProfile);

  useEffect(() => {
    if (!userData) {
      dispatch(fetchUserData());
    }
  }, [dispatch, userData]);

  return <>{children}</>;
};

export default UserProfileWrapper;
