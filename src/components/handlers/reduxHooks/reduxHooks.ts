import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/index';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
