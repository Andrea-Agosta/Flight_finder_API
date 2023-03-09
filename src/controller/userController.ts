import { deleteUser, getUserByEmail, updateUser } from '../dbRepository/userRepository';
import { Request } from 'express';
import { IBodyUser, IUser } from '../type/user';

const emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

export const getUserByMail = async (email: string | undefined): Promise<IUser[]> => {
  if (email) return await getUserByEmail(email);
  throw new Error(`User ${email} does not exist`);
}

export const updateUserById = async (req: Request<{ id: number }, {}, IBodyUser>): Promise<string> => {
  if (Number(req.params.id)) {
    let query: string = 'UPDATE users SET';
    req.body.email && emailRegex.test(req.body.email) && (query += `email = '${req.body.email}', `);
    req.body.password && (query += `password = '${req.body.password}', `);
    req.body.role && (query += `role = '${req.body.role}', `);
    query += `WHERE id = '${req.params.id}'`;
    return await updateUser(query);
  }
  throw new Error(`User ${req.params.id} does not exist`);
};

export const deleteUserById = async (id: number): Promise<string> => {
  return await deleteUser(id);
};