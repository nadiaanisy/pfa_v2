import {
  Loader2,
  User,
  Lock
} from 'lucide-react';
import {
  Link,
  useNavigate
} from 'react-router-dom';
import {
  LoginFormData,
  loginSchema
} from '../../../validation/auth';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { useForm } from 'react-hook-form';
import { useCustomHook } from '../../CustomHook';
import { zodResolver } from '@hookform/resolvers/zod';

export default function Login() {
  const {
    login,
    isLoading,
  } = useCustomHook();

  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    const userData = await login(data);
    if (!userData) return;

    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-1 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Welcome back
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Please enter your details to sign in
        </p>
      </div>

      <div className="grid gap-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="identifier" className="sr-only">Email / Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <Input
                  id="identifier"
                  placeholder="Email / Username"
                  type="text"
                  autoCapitalize="none"
                  autoComplete="username"
                  autoCorrect="off"
                  disabled={isLoading}
                  className="h-11 rounded-xl border-slate-200 bg-white/50 pl-10 backdrop-blur-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-white/10 dark:bg-black/20 dark:text-white"
                  {...register("identifier", { required: "Email / Username is required" })}
                />
              </div>
              {errors.identifier && (
                <p className="text-xs text-red-500">{errors.identifier.message as string}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password" className="sr-only">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <Input
                  id="password"
                  placeholder="Password"
                  type="password"
                  autoCapitalize="none"
                  autoComplete="current-password"
                  disabled={isLoading}
                  className="h-11 rounded-xl border-slate-200 bg-white/50 pl-10 backdrop-blur-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-white/10 dark:bg-black/20 dark:text-white"
                  {...register("password", { required: "Password is required" })}
                />
              </div>
              {errors.password && (
                <p className="text-xs text-red-500">{errors.password.message as string}</p>
              )}
            </div>

            <div className="flex items-center justify-end">
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
              >
                Forgot password?
              </Link>
            </div>

            <Button 
              disabled={isLoading} 
              className="h-11 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transition-all hover:from-indigo-700 hover:to-purple-700 hover:shadow-indigo-500/25 dark:shadow-indigo-900/20"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign In
            </Button>
          </div>
        </form>

        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
          >
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
}
