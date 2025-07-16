import { useEffect, useState } from 'react';
import { FaCamera, FaEdit, FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { SaveIcon } from 'lucide-react';
import {
  useGetUserByIdQuery,
  useUpdateUserProfileMutation,
} from '../../features/api/userApi';
import type { RootState } from '../../app/store';

interface FormValues {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

const AdminUserProfile = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, userType } = useSelector((state: RootState) => state.auth);
  const userId = user?.userId;

  const { data, isLoading, isError } = useGetUserByIdQuery(userId!, { skip: !userId });
  const [updateUserProfile, { isLoading: isUpdating }] = useUpdateUserProfileMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const profilePicture =
    user?.profile_picture ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.firstName || '')}&background=4ade80&color=fff&size=128`;

  const handleModalToggle = () => setIsModalOpen((prev) => !prev);

  useEffect(() => {
    if (!isAuthenticated || userType !== 'admin') navigate('/login');
  }, [isAuthenticated, userType, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  useEffect(() => {
    if (data) {
      reset({
        firstname: data.firstName,
        lastname: data.lastName,
        email: data.email,
        password: '', // empty initially
      });
    }
  }, [data, reset]);

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    if (!userId) return;
    try {
      await updateUserProfile({ userId, data: formData }).unwrap();
      setIsModalOpen(false);
    } catch (err) {
      console.error('Update failed', err);
    }
  };

  if (isLoading) return <div className="text-center py-10 text-white">Loading profile...</div>;
  if (isError || !data) return <div className="text-center py-10 text-red-500">Failed to load profile.</div>;

  return (
    <div className="min-h-screen text-white py-10 px-5">
      <div className="max-w-4xl mx-auto rounded-lg shadow-lg p-5">
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-gray-700 pb-5 mb-5">
          <div className="relative flex items-center gap-4 mb-4 md:mb-0">
            <img
              src={data.profile_picture || profilePicture}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-orange-500"
            />
            <label className="absolute bottom-0 bg-orange-500 p-2 rounded-full cursor-pointer">
              <FaCamera />
              <input type="file" className="hidden" />
            </label>
            <div>
              <h2 className="text-3xl font-bold">{data.firstName} {data.lastName}</h2>
              <p className="text-gray-400">{data.email}</p>
            </div>
          </div>
          <button className="btn btn-warning flex items-center gap-2" onClick={handleModalToggle}>
            <FaEdit /> Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-lg p-4">
            <h3 className="text-2xl font-bold mb-3">Personal Information</h3>
            <p className="mb-2"><span className="font-bold">First Name:</span> {data.firstName}</p>
            <p className="mb-2"><span className="font-bold">Last Name:</span> {data.lastName}</p>
          </div>
          <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-lg p-4">
            <h3 className="text-2xl font-bold mb-3">Security Settings</h3>
            <p className="mb-2"><span className="font-bold">Password:</span> ********</p>
            <button className="btn btn-secondary">Change Password</button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-2xl font-bold text-orange-500 mb-4">Edit Profile</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label htmlFor="firstname" className="block text-sm font-medium text-orange-500">First Name</label>
                <input
                  id="firstname"
                  className="input w-full text-blue-500 text-sm"
                  {...register('firstname', { required: 'First name is required' })}
                />
                {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname.message}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="lastname" className="block text-sm font-medium text-orange-500">Last Name</label>
                <input
                  id="lastname"
                  className="input w-full text-blue-500 text-sm"
                  {...register('lastname', { required: 'Last name is required' })}
                />
                {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname.message}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-orange-500">Email</label>
                <input
                  id="email"
                  className="input input-bordered w-full bg-gray-900 border-gray-600 text-white"
                  disabled
                  {...register('email')}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-orange-500">Password</label>
                <input
                  id="password"
                  type="password"
                  className="input w-full text-blue-500 text-sm"
                  {...register('password', { required: 'Password is required' })}
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={handleModalToggle} className="btn mr-2 btn-error">
                  <FaTimes /> Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={isUpdating}>
                  <SaveIcon /> {isUpdating ? 'Saving...' : 'Save Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserProfile;
