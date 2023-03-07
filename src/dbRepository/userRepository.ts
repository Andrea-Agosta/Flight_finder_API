import { connectionDB } from "../database/dbConnections";
import { IUser } from "../type/user";

export const getUserByEmail = async (email: string): Promise<IUser[]> => {
  const query: string = `SELECT * FROM user_data WHERE email = '${email}'`;
  return await connectionDB(query);
};

export const createUser = async (email: string, password: string, role: string): Promise<string> => {
  const query: string = `INSERT INTO user_data (email, password, role) VALUES ('${email}','${password}','${role}')`;
  await connectionDB(query);
  return await 'user registrated;'
};

export const updateUser = async (query: string): Promise<string> => {
  await connectionDB(query);
  return await 'user update correctly;'
}

export const deleteUser = async (id: number): Promise<string> => {
  const query: string = `DELETE FROM user_data WHERE id = '${id}'`;
  await connectionDB(query);
  return await 'user deleted;'
};