import { Context } from 'hono';
import { UsersService } from '../../../services/users';
import { HonoVariables } from '../../../shared/types';

export const getUsersHandler = async (c: Context<{ Variables: HonoVariables }>) => {
  const users = await UsersService(c).getUsers();
  
  return c.json(users, 200);
};
