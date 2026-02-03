import bcrypt from 'bcryptjs';
import {
  ChangePasswordPayload,
  ForgotPasswordPayload,
  RegistrationPayload,
  User
} from '../components/Interface';
import { supabase } from '../miscellaneous/supabaseClient';

/**
 * Get user by email or username
 */
export const getUserByIdentifier = async (
  identifier: string
): Promise<User | null> => {
  const field = identifier.includes('@') ? 'email' : 'username';

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq(field, identifier)
    .single();

  if (error || !data) return null;
  return data;
};

/**
 * Update last login timestamp for user
 */
export const updateLastLogin = async (
  userId: string
): Promise<void> => {
  const { error } = await supabase
    .from('users')
    .update({ last_login: new Date().toISOString() })
    .eq('id', userId);

  if (error) console.error('Failed to update last login:', error);
};

/**
 * Insert a login history record
 */
export const insertLoginHistory = async (
  userId: string
): Promise<void> => {
  const { error } = await supabase
    .from('login_history')
    .insert({ user_id: userId, login_time: new Date().toISOString() });

  if (error) console.error('Failed to insert login history:', error);
};

/**
 * Register a new user
 */
export const registerNewUser = async (
  payload: RegistrationPayload
): Promise<any> => {
  // Hash the password
  const hashedPassword = bcrypt.hashSync(payload.password, 10);
  // Insert new user into Supabase
  const { data, error } = await supabase
    .from('users')
    .insert({
      full_name: payload.full_name,
      username: payload.username,
      email: payload.email,
      password_hash: hashedPassword,
    })
    .select()
    .single();

  if (error || !data) {
    throw new Error(error?.message || 'Failed to create user');
  }

  return data;
};

/**
 * Change Password for user
 */
export const changePassword = async (
  payload: ChangePasswordPayload
): Promise<any> => {
  const hashedPassword = bcrypt.hashSync(payload.newPassword, 10);

  const { error } = await supabase
    .from("users")
    .update({ password_hash: hashedPassword })
    .eq("email", payload.email);

  if (error) throw error;

  return true;
};