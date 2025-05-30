import {ZodError} from "zod";

export const getZodErrors = (error: unknown) => {
    const isZodError = error instanceof ZodError;
    if (!isZodError) return null;

    const errors = error.flatten().fieldErrors;
    return Object.keys(errors).reduce((acc, key) => {
        const message = errors[key]?.at(0);
        return {...acc, [key]: message};
    }, {});
};