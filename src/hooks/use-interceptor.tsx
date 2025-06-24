import { api } from "@/service/api";
import { AppError } from "@/shared/utils/app-error";
import { useEffect } from "react";
import { useToast } from "./use-toast";

export function useApiInterceptor() {
  const toast = useToast();

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => {
        if (response.data.message) {
          toast({
            title: response.data.message,
            type: "success",
          });
        }

        return response;
      },
      async (error) => {
        const errorData = {
          status: error.response.status,
          message: error.response?.data?.message || "generic_error_title",
          error: error.response?.data.error,
          errors: error.response?.data.errors,
        } as AppError;

        console.log("ERRO ===>", errorData);

        const title = errorData.message || "generic_error_title";

        toast({
          title,
          type: "error",
        });

        return Promise.reject(new AppError(errorData));
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, [toast]);
}
