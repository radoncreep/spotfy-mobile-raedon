import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { AppRootState, AppDispatch } from './store';


export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;