import backend from "./backend";
import { useQuery } from "@tanstack/react-query";

export const PRIVILEGES_KEY = "privileges";

export type Privilege = {
  id: string;
  name: string;
  short_description: string;
  long_description: string;
  image: string;
  points: number;
  start_date: string;
  end_date: string;
};

// get list of privileges
export const getPrivileges = async () => {
  try {
    const data = await backend
      .collection<Privilege>(PRIVILEGES_KEY)
      .getFullList();

    return data;
  } catch (error) {
    console.log("Error getting privileges", error);
    throw error;
  }
};

export const useGetPrivileges = () => {
  return useQuery({
    queryKey: [PRIVILEGES_KEY, "list"],
    queryFn: getPrivileges,
  });
};
