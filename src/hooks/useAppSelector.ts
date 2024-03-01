import { RootState } from "@/redux/store/store";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector