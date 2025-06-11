"use client";

import {
  LoginSchemaFormData,
  loginSchema,
} from "@/lib/validations/auth.schema";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBackdrop } from "@/context/backdrop_context";
import { useAuth } from "@/context/auth-context";

export function useLogin() {
  const [typePassword, setTypePassword] = useState<boolean>(false);

  const {
    register,
    watch,
    setError,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginSchemaFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { showBackdrop, hideBackdrop } = useBackdrop();
  const { signIn } = useAuth();
  const onSubmit = async (request: LoginSchemaFormData) => {
    try {
      showBackdrop();
      await signIn(request.email, request.password);
    } catch (err) {
      setError("email", {
        message: "Xin vui lòng kiểm tra lại email hoặc mật khẩu",
      });
    } finally {
      hideBackdrop();
    }
  };
  const valuePassword = watch("password");

  const handleToggleTypePassword = () => {
    setTypePassword((prev) => !prev);
  };

  return {
    register,
    errors,
    handleSubmit,
    onSubmit,
    valuePassword,
    typePassword,
    handleToggleTypePassword,
  };
}
