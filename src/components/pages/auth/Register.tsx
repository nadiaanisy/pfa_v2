import {
  Loader2,
  Mail,
  Lock,
  User,
  ArrowRight,
  AtSign
} from 'lucide-react';
import {
  Link,
  useNavigate
} from 'react-router-dom';
import {
  RegistrationFormData,
  registrationSchema
} from '../../../validation/auth';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { useForm } from 'react-hook-form';
import { useCustomHook } from '../../CustomHook';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod';

export default function Register() {
  const {
    registerUser,
    isLoading
  } = useCustomHook();
  
  const navigate = useNavigate();

  const { register, handleSubmit, reset, formState: { errors }, watch } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  const password = watch("password");

  const onSubmit = async (data: RegistrationFormData) => {
    const result = await registerUser(data);
    if (!result) {
      return;
    } else {
      setTimeout(() => {
        reset();
        navigate('/');
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-1 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Create an account
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Enter your details below to create your account
        </p>
      </div>

      <div className="grid gap-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="sr-only">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <Input
                  id="full_name"
                  placeholder="Full Name"
                  type="text"
                  autoCapitalize="words"
                  autoComplete="full-name"
                  autoCorrect="off"
                  disabled={isLoading}
                  className="h-11 rounded-xl border-slate-200 bg-white/50 pl-10 backdrop-blur-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-white/10 dark:bg-black/20 dark:text-white"
                  {...register("full_name", { required: "Full Name is required" })}
                />
              </div>
              {errors.full_name && (
                <p className="text-xs text-red-500">{errors.full_name.message as string}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="username" className="sr-only">Username</Label>
              <div className="relative">
                <AtSign className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <Input
                  id="username"
                  placeholder="Username"
                  type="text"
                  autoCapitalize="none"
                  autoComplete="username"
                  autoCorrect="off"
                  disabled={isLoading}
                  className="h-11 rounded-xl border-slate-200 bg-white/50 pl-10 backdrop-blur-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-white/10 dark:bg-black/20 dark:text-white"
                  {...register("username", { 
                    required: "Username is required",
                    minLength: {
                      value: 3,
                      message: "Username must be at least 3 characters",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9_]+$/,
                      message: "Username can only contain letters, numbers, and underscores"
                    }
                  })}
                />
              </div>
              {errors.username && (
                <p className="text-xs text-red-500">{errors.username.message as string}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email" className="sr-only">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                  className="h-11 rounded-xl border-slate-200 bg-white/50 pl-10 backdrop-blur-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-white/10 dark:bg-black/20 dark:text-white"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Please enter a valid email address",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message as string}</p>
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
                  autoComplete="new-password"
                  disabled={isLoading}
                  className="h-11 rounded-xl border-slate-200 bg-white/50 pl-10 backdrop-blur-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-white/10 dark:bg-black/20 dark:text-white"
                  {...register("password", { 
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />
              </div>
              {errors.password && (
                <p className="text-xs text-red-500">{errors.password.message as string}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirmPassword" className="sr-only">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <Input
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  type="password"
                  autoCapitalize="none"
                  autoComplete="new-password"
                  disabled={isLoading}
                  className="h-11 rounded-xl border-slate-200 bg-white/50 pl-10 backdrop-blur-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-white/10 dark:bg-black/20 dark:text-white"
                  {...register("confirmPassword", { 
                    required: "Please confirm your password",
                    validate: (value) => value === password || "Passwords do not match",
                  })}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-500">{errors.confirmPassword.message as string}</p>
              )}
            </div>

            <Button disabled={isLoading} className="h-11 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transition-all hover:from-indigo-700 hover:to-purple-700 hover:shadow-indigo-500/25 dark:shadow-indigo-900/20">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Account
              {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </form>

        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
          Already have an account?{" "}
          <Link
            to="/"
            className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
