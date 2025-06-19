import { setPage } from '../pages/garage/garageSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export function usePagination(perPage: number = 7) {
  const dispatch = useAppDispatch();
  const { page, totalCount } = useAppSelector((state) => state.garage);
  const canGoPrev = page > 1;
  const canGoNext = page * perPage < totalCount;
  const disabled = page * 7 >= totalCount;
  const goToPrevPage = () => {
    if (canGoPrev) {
      dispatch(setPage(page - 1));
    }
  };
  const goToNextPage = () => {
    if (canGoNext) {
      dispatch(setPage(page + 1));
    }
  };

  return {
    page,
    canGoNext,
    canGoPrev,
    disabled,
    goToNextPage,
    goToPrevPage,
  };
}
