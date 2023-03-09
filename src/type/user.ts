export interface IBodyUser {
  email: string;
  password: string;
  role: string;
}
export interface IUser extends IBodyUser {
  user_id: number;
}
