import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageCircle, Users, Heart, Sparkles } from "lucide-react";
import { useRegisterMutation } from "../redux/features/auth/authApi";

const Register = () => {
  const [registerUser] = useRegisterMutation();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const toastId = toast.loading("Creating your account...");
    try {
      const userInfo = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      const res = await registerUser(userInfo);
      console.log(res);

      if (res?.error) {
        toast.error("Email already exists", {
          id: toastId,
          duration: 2000,
        });
      } else {
        toast.success("Registration successful!", {
          id: toastId,
          duration: 2000,
        });
        navigate("/login");
      }
    } catch (error) {
      let message = "Something went wrong!";
      if (error instanceof Error && error.message) {
        message = error.message;
      }
      console.error(error);
      toast.error(message, { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="w-full max-w-6xl flex gap-8 items-center relative z-10">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex flex-1 flex-col space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                CommentsHub
              </h1>
            </div>
            <p className="text-xl text-gray-600 font-light">
              Join millions in sharing thoughts, connecting minds, and building communities
            </p>
          </div>

          <div className="space-y-5">
            <div className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Share Your Voice</h3>
                <p className="text-sm text-gray-600">Express yourself authentically</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Engage & React</h3>
                <p className="text-sm text-gray-600">Like, comment, and interact</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Build Connections</h3>
                <p className="text-sm text-gray-600">Meet amazing people worldwide</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 max-w-md w-full">
          <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
            <CardHeader className="space-y-1 text-center pb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg lg:hidden">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Create Account
              </CardTitle>
              <CardDescription className="text-base">
                Join our vibrant community today
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700 font-medium">
                    Full Name
                  </Label>
                  <Input
                    {...register("name", { required: true })}
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    required
                    className="h-11 border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    Email
                  </Label>
                  <Input
                    {...register("email", { required: true })}
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    className="h-11 border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 font-medium">
                    Password
                  </Label>
                  <Input
                    {...register("password", { required: true })}
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    className="h-11 border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4 pt-2">
                <Button
                  type="submit"
                  className="w-full mt-3 h-11 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Sign Up
                </Button>
                <p className="text-sm text-center text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-semibold text-purple-600 hover:text-purple-700 hover:underline"
                  >
                    Sign In
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Register;