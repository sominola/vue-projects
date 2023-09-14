import {AxiosError, type AxiosResponse} from "axios";
import {type Error} from "@/types/types";

export const checkIfHttpError = (response: AxiosResponse): [boolean, Error | null] => {
    const isError = response instanceof AxiosError;
    const serializeHttpError = (error: AxiosError): Error => {
        const errorMessage = (error.response?.data as any)?.message || error.message;
        return { message: errorMessage as string, errorCode: error.code as string };
    };

    const error = isError ? serializeHttpError(response as AxiosError) : null;

    return [isError, error]
}