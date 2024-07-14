import { useCallback } from "react";
import { useAppDispatch } from "../_redux/store";
import { toggleShowNewAppointmentModal } from "../_redux/ui.slice";

export default function useToggleShowNewAppointmentModal() {
  const dispatch = useAppDispatch()
  return useCallback((show?: boolean) => dispatch(toggleShowNewAppointmentModal(show)), [dispatch])
}
