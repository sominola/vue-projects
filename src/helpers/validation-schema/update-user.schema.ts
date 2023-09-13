import type { UserUpdateDto } from "@/types/types";
import { ObjectSchema, object, string } from "yup";

export const userUpdateSchema: ObjectSchema<UserUpdateDto> = object({
    firstName: string().required('First name is required'),
    lastName: string().required('Last name is required'),
});