import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axiosInstance from "@/api/axiosInstance";
import { useAuth } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "../hooks/use-toast";
import { Loader2 } from "lucide-react";

interface LoginFormData {
  email: string;
  password: string;
}

export const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/login", data);
      login(response.data.token, response.data.user);
      toast({
        title: "Login successful",
        description: `Welcome back, ${response.data.user.username}!`,
        variant: "success",
      });
      navigate("/dash-board");
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 w-[100%]">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your email and password to login.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button
            type="submit"
            className="w-full"
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Login"
            )}
          </Button>
          <p className="mt-2 text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Create one
            </Link>
          </p>
        </CardFooter>
      </Card>
      <Toaster />
    </div>
  );
};
