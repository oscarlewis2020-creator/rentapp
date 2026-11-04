import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/index";

// 1. Use throughout your app instead of plain useDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

// 2. Use throughout your app instead of plain useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
