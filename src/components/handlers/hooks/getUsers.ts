import { UserType } from "../../interfaces/interface";

export const getUsers = async (url: string): Promise<UserType[]> => {
	const usersResult = await fetch(url);
	const users: UserType[] = await usersResult.json();
	return users;
};
