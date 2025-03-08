
import { useCreateGroupMutation } from "@/redux/api/groupApi";
import Image from "next/image";
import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { RiCloseLargeFill } from "react-icons/ri";
import { toast } from "sonner";

interface CreateGroupProps {
  setCreateGroupModel: (value: boolean) => void;
}

const CreateGroup: React.FC<CreateGroupProps> = ({
  setCreateGroupModel,
}) => {
 
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null); 
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");

  // Mutation hook
  const [createGroup, { isLoading }] = useCreateGroupMutation();

  // Input handlers
  const handleGroupName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setGroupName(e.target.value);
  const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setDescription(e.target.value);

  // File change handler
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl); // Set the image preview URL
    }
  };

  // Form submit handler
  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault(); 

    if (!groupName.trim() || !description.trim()) {
      alert("Please enter a group name and description.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", groupName);
      formData.append("description", description);
      if (selectedFile) formData.append("image", selectedFile);

      const newGroup = await createGroup(formData).unwrap();
      toast.success(newGroup?.message || "Group created successfully!");
      setCreateGroupModel(false);
    } catch (err) {
      console.error("Failed to create group:", err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
      <div className="bg-white text-gray-700 rounded-3xl shadow-lg p-6 md:p-8 w-[90%] max-w-lg relative">
        {/* Close Button */}
        <button
          className="absolute right-6 top-6 text-gray-500 hover:text-gray-800"
          onClick={() => setCreateGroupModel(false)}
        >
          <RiCloseLargeFill className="text-xl" />
        </button>

        {/* Title */}
        <h2 className="text-xl md:text-2xl font-bold text-center mb-6 ">
          Create Group
        </h2>

        {/* Form */}
        <form className="flex flex-col gap-4 " onSubmit={handleCreateGroup}>
          {/* Inputs */}
          <input
            type="text"
            placeholder="Group Name"
            className="border border-gray-300 rounded-lg py-2 px-4 outline-none focus:ring-2 focus:ring-blue-500 shadow-sm w-full"
            value={groupName}
            onChange={handleGroupName}
          />

          <textarea
            placeholder="Description"
            className="border border-gray-300 rounded-lg py-2 px-4 outline-none focus:ring-2 focus:ring-blue-500 shadow-sm w-full h-24 resize-none"
            value={description}
            onChange={handleDescription}
          ></textarea>

          {/* Image Upload */}
          <div className="flex flex-row gap-4 w-full">
            <label
              htmlFor="fileInput"
              className="cursor-pointer flex justify-center items-center bg-gray-500 text-white px-5 py-3 rounded-lg font-bold shadow-md hover:bg-gray-800 transition w-full"
            >
              <FaUpload className="text-white mr-2" /> Upload Group Picture
            </label>
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              className="hidden"
              onChange={handleFileChange}
            />
            {imagePreview && (
              <div className="w-full h-24 bg-gray-200 rounded-xl overflow-hidden flex justify-center items-center">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  width={200}
                  height={200}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 bg-red-500 hover:bg-red-600 py-2 bg-red px-8 rounded-lg text-white w-full font-bold transition"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Group"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGroup;
