import * as z from "zod";

export const SignUpSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address",
    }),
    name: z.string().min(1, {
        message: "Name is required",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long",
    }),
    confirmPassword: z.string().min(6, {
        message: "Password must be at least 6 characters long",
    }),
});

export const SignInSchema = z.object({
    email: z.string(),
    password: z.string()
});