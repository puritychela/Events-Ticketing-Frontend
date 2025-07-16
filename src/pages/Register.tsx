import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../features/api/userApi'; // ✅ Make sure this is correct
import Footer from '../components/Footer';
// import Navbar from '../components/Navbar';
import loginImg from '../../src/assets/register.jpg';

type RegisterFormData = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  contactPhone?: string;
  address?: string;
  role: 'user' | 'admin'; // You can adjust roles if needed
};

export const Register = () => {
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const [formData, setFormData] = useState<RegisterFormData>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    contactPhone: '',
    address: '',
    role: 'user',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(formData).unwrap();
      alert('Registration successful!');
      navigate('/login');
    } catch (error: any) {
      console.error(error);
      alert(error?.data?.error || 'Registration failed. Please try again.');
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-white to-pink-100 flex items-center justify-center py-10">
        <div className="grid sm:grid-cols-2 gap-10 bg-white rounded-3xl overflow-hidden w-full max-w-5xl">
          {/* Form Section */}
          <div className="flex items-center justify-center p-8">
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 bg-white rounded-2xl p-8">
              <div className="text-center mb-6">
                <h2 className="text-4xl font-bold text-blue-600 mb-2">Register</h2>
                <p className="text-gray-500">Create your account</p>
              </div>

              <div className="grid w-full gap-y-4 md:gap-x-4 lg:grid-cols-2">
                <div className="grid gap-1.5">
                  <label htmlFor="firstname" className="text-sm font-medium text-gray-700">First Name</label>
                  <input
                    id="firstname"
                    type="text"
                    value={formData.firstname}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    placeholder="First Name"
                    required
                  />
                </div>
                <div className="grid gap-1.5">
                  <label htmlFor="lastname" className="text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    id="lastname"
                    type="text"
                    value={formData.lastname}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    placeholder="Last Name"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                <input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Password"
                  required
                />
              </div>

              <div>
                <label htmlFor="contactPhone" className="text-sm font-medium text-gray-700">Contact Phone</label>
                <input
                  id="contactPhone"
                  type="text"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="0712345678"
                />
              </div>

              <div>
                <label htmlFor="address" className="text-sm font-medium text-gray-700">Address</label>
                <input
                  id="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Your address"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary btn-block mt-4 shadow-md hover:scale-105 transition-transform"
              >
                {isLoading ? 'Registering...' : 'Register'}
              </button>

              <div className="flex flex-col text-center mt-4 gap-2">
                <Link to="/" className="text-blue-500 hover:underline">🏡 Go to HomePage</Link>
                <Link to="/login" className="text-green-500 hover:underline">Already have an account? Login</Link>
              </div>
            </form>
          </div>

          {/* Image Section */}
          <div className="hidden sm:flex items-center justify-center bg-gradient-to-tr from-blue-200 via-pink-100 to-white">
            <img src={loginImg} alt="Register" width={400} className="rounded-2xl" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

