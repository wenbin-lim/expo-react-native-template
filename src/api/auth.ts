import { z } from "zod";
import backend from "./backend";

export const USER_KEY = "users";

// login user
export const LoginSchema = z.object({
  username: z.string().min(1, "Please enter a valid username"),
  password: z.string().min(1, "Please enter a valid password"),
});

export type LoginProps = z.infer<typeof LoginSchema>;

export const login = async ({ username, password }: LoginProps) => {
  try {
    const data = await backend
      .collection(USER_KEY)
      .authWithPassword(username, password);

    return data;
  } catch (error) {
    console.log("Error logging in", error);
    throw error;
  }
};
