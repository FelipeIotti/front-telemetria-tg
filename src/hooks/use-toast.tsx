import { ToastContext } from "@/contexts/toast-context";
import { useContext } from "react";

export function useToast() {
  const context = useContext(ToastContext);
  return context.showToast;
}
