import {
  Loader2,
  Mail,
  ArrowLeft,
  ArrowRight,
  Lock
} from 'lucide-react';
import {
  Link,
  useNavigate
} from 'react-router-dom';
import { toast } from 'sonner';
import { useState } from 'react'
import {
  ChangePasswordFormData,
  changePasswordSchema,
  ForgotPasswordFormData,
  forgotPasswordSchema
} from '../../../validation/auth';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Button } from '../../ui/button';
import { useForm } from 'react-hook-form';
import { useCustomHook } from "../../CustomHook";
import { zodResolver } from '@hookform/resolvers/zod';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const {
    isLoading,
    isSubmitted,
    setIsSubmitted,
    findAccount,
    changePassword
  } = useCustomHook();

  const [email, setEmail] = useState("");
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const { register: registerNewPassword, handleSubmit: handleSubmitNewPassword, reset: resetNewPassword, formState: { errors: errorsNewPassword } } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: any) => {
    const result = await findAccount(data);
    if (!result) return;
    setIsSubmitted(true);
    setEmail(result.email);
    reset();
  };

  const onSubmitNewPassword = async (data: any) => {
    const payload = {
      ...data,
      email
    }
    const result = await changePassword(payload);
    if (!result) return;
    toast.success("Password changed successfully!");
    setTimeout(() => {
      navigate('/');
      setIsSubmitted(false);
      resetNewPassword();
    }, 2000);
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-1 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Forgot Password
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {isSubmitted 
            ? "Account exists!" 
            : "Enter your email address / username we'll check if it exists"}
        </p>
      </div>

      {isSubmitted ? (
        <div className="grid gap-6">
          <form onSubmit={handleSubmitNewPassword(onSubmitNewPassword)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="newPassword" className="sr-only">New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                  <Input
                    id="newPassword"
                    placeholder="New Password"
                    type="password"
                    autoCapitalize="none"
                    autoComplete="new-password"
                    autoCorrect="off"
                    disabled={isLoading}
                    className="h-11 rounded-xl border-slate-200 bg-white/50 pl-10 backdrop-blur-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-white/10 dark:bg-black/20 dark:text-white"
                    {...registerNewPassword("password", { required: "New Password is required" })}
                  />
                </div>
                {errorsNewPassword.password && (
                  <p className="text-xs text-red-500">{errorsNewPassword.password.message as string}</p>
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
                    autoComplete="confirm-password"
                    autoCorrect="off"
                    disabled={isLoading}
                    className="h-11 rounded-xl border-slate-200 bg-white/50 pl-10 backdrop-blur-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-white/10 dark:bg-black/20 dark:text-white"
                    {...registerNewPassword("confirmPassword", { required: "Confirm Password is required" })}
                  />
                </div>
                {errorsNewPassword.confirmPassword && (
                  <p className="text-xs text-red-500">{errorsNewPassword.confirmPassword.message as string}</p>
                )}
              </div>

              <Button disabled={isLoading} className="h-11 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transition-all hover:from-indigo-700 hover:to-purple-700 hover:shadow-indigo-500/25 dark:shadow-indigo-900/20">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Change Password
                {!isLoading}
              </Button>
            </div>
          </form>
          <Button
            variant="ghost"
            asChild
            className="h-11 w-full rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
            onClick={() => setIsSubmitted(false)}
          >
            <Link to="/">
              Back to login
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="identifier" className="sr-only">Email / Username</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                  <Input
                    id="identifier"
                    placeholder="Email / Username"
                    type="identifier"
                    autoCapitalize="none"
                    autoComplete="identifier"
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

              <Button disabled={isLoading} className="h-11 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transition-all hover:from-indigo-700 hover:to-purple-700 hover:shadow-indigo-500/25 dark:shadow-indigo-900/20">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Check Account
                {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </form>

          <div className="relative">
             <div className="absolute inset-0 flex items-center">
               <span className="w-full border-t border-slate-200 dark:border-slate-700/50" />
             </div>
           </div>

          <Button variant="ghost" asChild className="h-11 w-full rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to login
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
