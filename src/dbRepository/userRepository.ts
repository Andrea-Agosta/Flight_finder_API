import { connectionDB } from "@src/database/dbConnections";
import { IUser } from "@src/type/user";

export const getUserByEmail = async (email: string): Promise<IUser[]> => {
  const query: string = `SELECT * FROM UserData WHERE email = '${email}'`;
  return await connectionDB(query);
};

export const createUser = async (email: string, password: string, role: string): Promise<string> => {
  const query: string = `INSERT INTO UserData (email, password, role) VALUES ('${email}','${password}','${role}')`;
  await connectionDB(query);
  return await 'user registrated;'
};

export const updateUser = async (query: string): Promise<string> => {
  await connectionDB(query);
  return await 'user update correctly;'
}

export const deleteUser = async (id: number): Promise<string> => {
  const query: string = `DELETE FROM UserData WHERE id = '${id}'`;
  await connectionDB(query);
  return await 'user deleted;'
};