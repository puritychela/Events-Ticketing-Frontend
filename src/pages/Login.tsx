import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../features/api/userApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import Footer from "../components/Footer";
import loginImg from "../../src/assets/login.jpg";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await loginUser(formData).unwrap();

      dispatch(
        setCredentials({
          user: {
            email: response.email,
            firstname: response.firstname,
            lastname: response.lastname,
            userId: response.userId,
          },
          token: response.token,
          userType: response.role,
        })
      );

      // ✅ Redirect based on role
      const destination =
        response.role === "admin"
          ? "/AdminDashboard/analytics"
          : "/Dashboard";

      navigate(destination);
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <>
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-white to-pink-100 flex items-center justify-center py-10 px-4 overflow-x-hidden">
        <div className="grid sm:grid-cols-2 w-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-lg">
          {/* Image Section */}
          <div className="hidden sm:block">
            <img
              src={loginImg}
              alt="Login Illustration"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Form Section */}
          <div className="flex items-center justify-center p-8">
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-md space-y-6 bg-white rounded-2xl"
            >
              <div className="text-center mb-6">
                <h2 className="text-4xl font-bold text-blue-600 mb-2">Login</h2>
                <p className="text-gray-500">Welcome Back</p>
              </div>

              <div>
                <label className="block mb-2 text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input input-bordered w-full border-2"
                  placeholder="Email"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input input-bordered w-full border-2"
                  placeholder="Password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-info btn-block mt-4 shadow-md hover:scale-105 transition-transform"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>

              <Link
                to="/forgotpassword"
                className="text-green-500 hover:underline block text-center mt-2"
              >
                Forgot password?
              </Link>

              <div className="flex flex-col sm:flex-row justify-between items-center text-sm mt-4 gap-2">
                <Link
                  to="/"
                  className="text-blue-500 hover:underline flex items-center gap-1"
                >
                  🏡 Go to HomePage
                </Link>
                <Link
                  to="/register"
                  className="text-green-500 hover:underline flex items-center gap-1"
                >
                  Need An Account?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
