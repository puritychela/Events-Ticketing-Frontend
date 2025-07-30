// import { useState } from 'react';
// import { useForm, type SubmitHandler } from 'react-hook-form';
// import { useSelector } from 'react-redux';
// import type { RootState } from '../../app/store';
// import { useUpdateUserProfileMutation } from '../../features/api/userApi';
// import Swal from 'sweetalert2';
// import { FaEdit, FaTimes } from 'react-icons/fa';
// import { SaveIcon } from 'lucide-react';

// interface FormValues {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   address: string;
//   password?: string;
// }

// const ProfileSettings = () => {
//   const { user } = useSelector((state: RootState) => state.auth);
//   const [updateUserProfile] = useUpdateUserProfileMutation();
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormValues>({
//     defaultValues: {
//       firstName: user?.firstName || '',
//       lastName: user?.lastName || '',
//       email: user?.email || '',
//       phone: user?.phone || '',
//       address: user?.address || '',
//     },
//   });

//   const profilePicture =
//     user?.profileUrl ||
//     `https://ui-avatars.com/api/?name=${encodeURIComponent(
//       user?.firstName || 'User'
//     )}&background=4ade80&color=fff&size=128`;

//   const handleModalToggle = () => {
//     setIsModalOpen(!isModalOpen);
//   };

//   const onSubmit: SubmitHandler<FormValues> = async (data) => {
//     if (!user?.userId) {
//       Swal.fire('Error', 'User ID is missing', 'error');
//       return;
//     }

//     try {
//       const payload = {
//         firstname: data.firstName,
//         lastname: data.lastName,
//         email: data.email,
//         phone: data.phone,
//         address: data.address,
//         ...(data.password && { password: data.password }),
//       };

//       await updateUserProfile({
//         userId: user.userId,
//         data: payload,
//       }).unwrap();

//       Swal.fire('Success', 'Profile updated successfully', 'success');
//       handleModalToggle();
//     } catch (error) {
//       console.error('Profile update error:', error);
//       Swal.fire('Error', 'Update failed. Please try again.', 'error');
//     }
//   };

//   return (
//     <div className="min-h-screen py-10 px-5 text-white">
//       <div className="max-w-4xl mx-auto p-5 rounded-lg shadow-lg bg-gray-800">
//         <div className="flex flex-col md:flex-row items-center justify-between border-b border-gray-700 pb-5 mb-5">
//           <div className="relative flex items-center gap-4 mb-4 md:mb-0">
//             <img
//               src={profilePicture}
//               alt="Profile"
//               className="w-24 h-24 rounded-full border-4 border-blue-500 object-cover"
//             />
//             <div>
//               <h2 className="text-3xl font-bold text-blue-400">{user?.firstName}</h2>
//               <p className="text-green-500">{user?.email}</p>
//             </div>
//           </div>
//           <button
//             className="btn btn-primary flex items-center gap-2"
//             onClick={handleModalToggle}
//           >
//             <FaEdit /> Edit Profile
//           </button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="bg-blue-700 rounded-lg p-4">
//             <h3 className="text-xl font-bold mb-2">Personal Information</h3>
//             <p><strong>First Name:</strong> {user?.firstName}</p>
//             <p><strong>Last Name:</strong> {user?.lastName}</p>
//             <p><strong>Email:</strong> {user?.email}</p>
//             <p><strong>Phone:</strong> {user?.phone || 'N/A'}</p>
//             <p><strong>Address:</strong> {user?.address || 'N/A'}</p>
//           </div>
//           <div className="bg-blue-700 rounded-lg p-4">
//             <h3 className="text-xl font-bold mb-2">Security</h3>
//             <p><strong>Password:</strong> ********</p>
//             <button className="btn btn-secondary mt-2">Change Password</button>
//           </div>
//         </div>
//       </div>

//       {isModalOpen && (
//         <div className="modal modal-open">
//           <div className="modal-box bg-gray-900">
//             <h2 className="text-2xl font-bold text-blue-400 mb-4">Edit Profile</h2>
//             <form onSubmit={handleSubmit(onSubmit)}>
//               <div className="mb-4">
//                 <label className="block text-sm text-white mb-1">First Name</label>
//                 <input
//                   {...register('firstName', { required: 'First name is required' })}
//                   className="input w-full text-black"
//                 />
//                 {errors.firstName && (
//                   <p className="text-red-500 text-sm">{errors.firstName.message}</p>
//                 )}
//               </div>

//               <div className="mb-4">
//                 <label className="block text-sm text-white mb-1">Last Name</label>
//                 <input
//                   {...register('lastName', { required: 'Last name is required' })}
//                   className="input w-full text-black"
//                 />
//                 {errors.lastName && (
//                   <p className="text-red-500 text-sm">{errors.lastName.message}</p>
//                 )}
//               </div>

//               <div className="mb-4">
//                 <label className="block text-sm text-white mb-1">Email</label>
//                 <input
//                   {...register('email')}
//                   readOnly
//                   className="input w-full text-black bg-gray-200 cursor-not-allowed"
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-sm text-white mb-1">Phone</label>
//                 <input {...register('phone')} className="input w-full text-black" />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-sm text-white mb-1">Address</label>
//                 <input {...register('address')} className="input w-full text-black" />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-sm text-white mb-1">New Password (optional)</label>
//                 <input
//                   type="password"
//                   {...register('password')}
//                   className="input w-full text-black"
//                 />
//               </div>

//               <div className="flex justify-end gap-2">
//                 <button type="button" onClick={handleModalToggle} className="btn btn-error">
//                   <FaTimes /> Cancel
//                 </button>
//                 <button type="submit" className="btn btn-primary">
//                   <SaveIcon /> Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfileSettings;





import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { useUpdateUserProfileMutation } from '../../features/api/userApi';
import Swal from 'sweetalert2';
import { FaEdit, FaTimes, FaCamera } from 'react-icons/fa';
import { SaveIcon } from 'lucide-react';
import axios from 'axios';

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  password?: string;
  profileUrl?: string;
}

const ProfileSettings = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [updateUserProfile] = useUpdateUserProfileMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageProfile, setImageProfile] = useState<string | null>(null);

  const cloud_name = 'dyjfzwfdr';
  const preset_key = 'userAdmin_Images';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
    },
  });

  const profilePicture =
    imageProfile ||
    user?.profileUrl ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user?.firstName || 'User'
    )}&background=4ade80&color=fff&size=128`;

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleFileImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', preset_key);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData
      );
      const imageUrl = res.data.secure_url;
      setImageProfile(imageUrl);
    } catch (error) {
      console.error('Image upload failed:', error);
      Swal.fire('Error', 'Image upload failed', 'error');
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!user?.userId) {
      Swal.fire('Error', 'User ID is missing', 'error');
      return;
    }

    const payload = {
      firstname: data.firstName,
      lastname: data.lastName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      ...(data.password && { password: data.password }),
      ...(imageProfile && { profileUrl: imageProfile }),
    };

    try {
      await updateUserProfile({
        userId: user.userId,
        data: payload,
      }).unwrap();

      Swal.fire('Success', 'Profile updated successfully', 'success');
      handleModalToggle();
    } catch (error) {
      console.error('Profile update error:', error);
      Swal.fire('Error', 'Update failed. Please try again.', 'error');
    }
  };

  return (
    <div className="min-h-screen py-10 px-5 text-white">
      <div className="max-w-4xl mx-auto p-5 rounded-lg shadow-lg bg-gray-800">
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-gray-700 pb-5 mb-5">
          <div className="relative flex items-center gap-4 mb-4 md:mb-0">
            <img
              src={profilePicture}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-blue-500 object-cover"
            />
            <label className="absolute bottom-0 bg-blue-500 p-2 rounded-full cursor-pointer">
              <FaCamera />
              <input type="file" className="hidden" onChange={handleFileImage} />
            </label>
            <div>
              <h2 className="text-3xl font-bold text-blue-400">{user?.firstName}</h2>
              <p className="text-green-500">{user?.email}</p>
            </div>
          </div>
          <button
            className="btn btn-primary flex items-center gap-2"
            onClick={handleModalToggle}
          >
            <FaEdit /> Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-700 rounded-lg p-4">
            <h3 className="text-xl font-bold mb-2">Personal Information</h3>
            <p><strong>First Name:</strong> {user?.firstName}</p>
            <p><strong>Last Name:</strong> {user?.lastName}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Phone:</strong> {user?.phone || 'N/A'}</p>
            <p><strong>Address:</strong> {user?.address || 'N/A'}</p>
          </div>
          <div className="bg-blue-700 rounded-lg p-4">
            <h3 className="text-xl font-bold mb-2">Security</h3>
            <p><strong>Password:</strong> ********</p>
            <button className="btn btn-secondary mt-2">Change Password</button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box bg-gray-900">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">Edit Profile</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-sm text-white mb-1">First Name</label>
                <input
                  {...register('firstName', { required: 'First name is required' })}
                  className="input w-full text-black"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">{errors.firstName.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm text-white mb-1">Last Name</label>
                <input
                  {...register('lastName', { required: 'Last name is required' })}
                  className="input w-full text-black"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">{errors.lastName.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm text-white mb-1">Email</label>
                <input
                  {...register('email')}
                  readOnly
                  className="input w-full text-black bg-gray-200 cursor-not-allowed"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm text-white mb-1">Phone</label>
                <input {...register('phone')} className="input w-full text-black" />
              </div>

              <div className="mb-4">
                <label className="block text-sm text-white mb-1">Address</label>
                <input {...register('address')} className="input w-full text-black" />
              </div>

              <div className="mb-4">
                <label className="block text-sm text-white mb-1">New Password (optional)</label>
                <input
                  type="password"
                  {...register('password')}
                  className="input w-full text-black"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm text-white mb-1">Upload Profile Picture</label>
                <input type="file" onChange={handleFileImage} className="file-input w-full text-white" />
              </div>

              <div className="flex justify-end gap-2">
                <button type="button" onClick={handleModalToggle} className="btn btn-error">
                  <FaTimes /> Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <SaveIcon /> Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSettings;

