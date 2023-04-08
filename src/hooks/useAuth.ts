import { useAppSelector } from './useAppSelector';

export const useAuth = () => {
  const { currentUser, error, isAuth, isLoading } = useAppSelector((state) => state.user);

  return { currentUser, error, isAuth, isLoading };
};
