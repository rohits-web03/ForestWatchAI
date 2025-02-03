"use server";
import * as z from "zod";
import { prisma } from "@/prisma/prisma";
import bcrypt from "bcryptjs";
import { SignUpSchema } from "@/schemas/index";

export const signup = async (data: z.infer<typeof SignUpSchema>) => {
    try {
        const validatedData = SignUpSchema.parse(data);

        if (!validatedData) {
            return { error: "Invalid input data" };
        }

        const { email, name, password, confirmPassword } = validatedData;

        if (password !== confirmPassword) {
            return { error: "Passwords do not match" };
        }

        const userExists = await prisma.user.findFirst({
            where: {
                email,
            },
        });

        if (userExists) {
            return { error: "Email already is in use. Please try another one." };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const lowerCaseEmail = email.toLowerCase();

        // Create the user
        await prisma.user.create({
            data: {
                email: lowerCaseEmail,
                name,
                password: hashedPassword,
            },
        });

        return { success: "User Registered Successfully" };
    } catch (error) {
        // Handle the error, specifically check for a 503 error
        console.error("Database error:", error);

        if ((error as { code: string }).code === "ETIMEDOUT") {
            return {
                error: "Unable to connect to the database. Please try again later.",
            };
        } else if ((error as { code: string }).code === "503") {
            return {
                error: "Service temporarily unavailable. Please try again later.",
            };
        } else {
            return { error: "An unexpected error occurred. Please try again later." };
        }
    }
};