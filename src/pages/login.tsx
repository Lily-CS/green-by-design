
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    // Login logic would go here
    console.log("Login attempted with:", { username, password });
    // For now, just log the attempt
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        {/* Navigation tabs */}
        <div className="flex mb-8">
          <button className="text-green-500 border-b-2 border-green-500 pb-2 px-4 font-medium">
            Login
          </button>
          <button
            onClick={handleRegister}
            className="text-gray-400 pb-2 px-4 font-medium ml-4 hover:text-white transition-colors"
          >
            Register
          </button>
        </div>

        {/* Welcome heading */}
        <h1 className="text-2xl font-bold text-white mb-8">Welcome Back!</h1>

        {/* Login form */}
        <div className="space-y-6">
          {/* Username field */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
              Username
            </label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full h-12 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500"
            />
          </div>

          {/* Password field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Login button */}
          <Button
            onClick={handleLogin}
            className="w-full h-12 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg text-lg mt-8"
            size="lg"
          >
            Login
          </Button>

          {/* Register link */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-400">
              Don't have an account?{" "}
              <button
                onClick={handleRegister}
                className="text-green-500 hover:text-green-400 underline transition-colors"
              >
                Register
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;