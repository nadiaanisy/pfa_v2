import bcrypt from 'bcryptjs';
import {
  changePassword,
  getUserByIdentifier,
  insertLoginHistory,
  registerNewUser,
  updateLastLogin
} from './dbHelper';
import { ForgotPasswordPayload } from '../components/Interface';

export const LoginFunction = async (
  identifier: string,
  password: string
) => {
  const user = await getUserByIdentifier(identifier);
  if (!user) throw new Error('No account found with this email/username');

  const isValid = bcrypt.compareSync(password, user.password_hash);
  if (!isValid) throw new Error('Incorrect password');

  // localStorage.setItem('currentUser', JSON.stringify(user));
  // sessionStorage.setItem('currentUser', JSON.stringify(user));

  // Update last login & insert login history asynchronously
  updateLastLogin(user.id);
  insertLoginHistory(user.id);

  return user;
};

export const RegisterUserFunction = async (
  newUserData: any
) => {
  const newUser = await registerNewUser(newUserData);
  if (!newUser) throw new Error('Registration failed');

  return newUser;
}

export const FindAccountFunction = async (
  payload: ForgotPasswordPayload
) => {
  const data = await getUserByIdentifier(payload.identifier);
  if (!data) {
    throw new Error('No account found with this email/username');
  }

  return data;
};

export const ChangePasswordFunction = async (
  payload: any
) => {
  const result = await changePassword(payload);
  if (!result) {
    throw new Error('Change password failed');
  }

  return result;
};