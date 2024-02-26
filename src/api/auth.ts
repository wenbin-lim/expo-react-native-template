import { z } from "zod";

// login user
export const LoginSchema = z.object({
  email: z.string().email("Invalid email"),
  verificationCode: z.string().min(1, "Please enter a valid verification code"),
});

export type LoginProps = z.infer<typeof LoginSchema>;

export const login = async ({ email, verificationCode }: LoginProps) => {
  try {
    console.log("email", email);
    console.log("verificationCode", verificationCode);
  } catch (error) {
    throw "Invalid lei";
  }
};
