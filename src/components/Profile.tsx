"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/slice/userSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaEdit } from "react-icons/fa";
import {
  useGetUserByIdQuery,
  useUpdateUserProfileMutation,
} from "@/redux/api/baseApi";
import { toast } from "sonner";

const ProfilePage = () => {
  const user = useSelector(selectUser);
  const [editMode, setEditMode] = useState(false);
  const { data: userData, refetch } = useGetUserByIdQuery(user?.user?.id);
  const [updateUserProfile] = useUpdateUserProfileMutation();
  console.log(userData, 'userData');

  const userFirstName = userData?.data?.firstName || "";
  const userLastName = userData?.data?.lastName || "";
  const userProfilePicture = userData?.data?.profilePicture || "";
  const about = userData?.data?.about || "";

  const [formData, setFormData] = useState({
    firstName: userFirstName,
    lastName: userLastName,
    about: userData?.data?.about || "",
    profileImage: null as File | null,
    previewImage: userProfilePicture,
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        firstName: userFirstName,
        lastName: userLastName,
        about: about,
        profileImage: null,
        previewImage: userProfilePicture,
      });
    }
  }, [userData]);

  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle profile image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setFormData((prev) => ({
        ...prev,
        profileImage: file,
        previewImage: URL.createObjectURL(file),
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedData = new FormData();
    updatedData.append("firstName", formData.firstName);
    updatedData.append("lastName", formData.lastName);
    updatedData.append("about", formData.about);

    if (formData.profileImage) {
      updatedData.append("profilePicture", formData.profileImage);
    }

    try {
      const res = await updateUserProfile(updatedData).unwrap();
      toast.success(res?.message || "Profile updated successfully!");
      refetch();
      setEditMode(false);
    } catch (error: any) {
      toast.error(error.data.message || "Profile update failed. Please try again.");
    }
  };

  return (
    <div className="text-white min-h-[calc(100vh-82px)] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-customGreen shadow-lg rounded-xl p-4 md:p-8 lg:p-16">
        <div className="flex justify-between">
          <div className="flex flex-col md:flex-row items-center space-y-2  mb-10 ">
            {/* Profile Image Section */}
            <div className="relative">
              <Avatar className="h-20 w-20 rounded-full border-2 border-black shadow-md">
                <AvatarImage src={formData.previewImage} />
                <AvatarFallback>
                  {user?.user?.firstName?.charAt(0)}
                  {user?.user?.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {editMode && (
                <label className="absolute bottom-0 right-0 bg-black bg-opacity-60 text-white p-2 rounded-full cursor-pointer hover:bg-opacity-80 transition-all">
                  <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                  📷
                </label>
              )}
            </div>
            <div className="ml-0 md:ml-4 ">
              <h1 className="md:text-3xl text-lg font-bold text-center md:text-left">{userFirstName} {userLastName}</h1>
              <p className="md:text-xl text-sm text-gray-200 text-center md:text-left">{user?.user?.email}</p>
            </div>
          </div>
          <div
            onClick={() => setEditMode(true)}
            className="px-2 md:px-4 py-1 md:py-2 text-gray-800 bg-yellow h-fit rounded-lg cursor-pointer flex items-center justify-center hover:bg-darkBlue transition-all"
          >
            <FaEdit className="md:text-xl text-sm" />
          </div>
        </div>

        {/* About Section */}
        {!editMode ? (
          <div className="mt-0 md:mt-4 space-y-2 ">
            <h2 className="text-xl md:text-3xl font-semibold">About Me</h2>
            <p className="text-sm md:text-lg text-gray-200">{userData?.data?.about}</p>
          </div>
        ) : (
          // Edit Form
          <form onSubmit={handleSubmit} className="mt-6 space-y-6 text-gray-100">
            <h2 className="text-lg md:text-2xl font-semibold">Edit Profile</h2>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full p-3 rounded-md bg-darkBlue border border-gray-600 text-white placeholder-gray-200 focus:border-yellow focus:ring-2 focus:ring-yellow transition-all text-sm md:text-base"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full p-3 rounded-md bg-darkBlue border border-gray-600 text-white placeholder-gray-200 focus:border-yellow focus:ring-2 focus:ring-yellow transition-all text-sm md:text-base"
            />
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              placeholder="About Me"
              className="w-full p-3 rounded-md bg-darkBlue border border-gray-600 text-white placeholder-gray-200 focus:border-yellow focus:ring-2 focus:ring-yellow transition-all text-sm md:text-base"
            />
            <div className="flex space-x-4">
              <button
                type="submit"
                className="w-full p-3 bg-yellow text-gray-900 hover:bg-darkBlue rounded-md font-semibold transition-all text-sm md:text-base"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditMode(false);
                  setFormData((prev) => ({
                    ...prev,
                    profileImage: null,
                    previewImage: userProfilePicture,
                  }));
                }}
                className="w-full p-3 bg-gray-700 text-white hover:bg-gray-800 rounded-md transition-all text-sm md:text-base"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
