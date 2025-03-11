"use client";
import Loading from "@/components/Loading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  useGetGroupMemberByGroupIdQuery,
  useUpdateBlockStatusMutation,
} from "@/redux/api/groupApi";
import { RootState } from "@/redux/store";
import { m } from "framer-motion";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from "sonner";

type TUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string | null;
};
type TGroup = {
  ownerId: string;
};

type TGroupMember = {
  id: string;
  groupId: string;
  userId: string;
  status: string;
  isModerator: boolean;
  isBlock: boolean;
  createdAt: string;
  //   updateAt: string;
  user: TUser;
  group: TGroup;
};

const AllMembers = () => {
  const user = useSelector((state: RootState) => state?.user?.user);
  console.log(user, "user");
  const { id: groupId } = useParams();
  const { data, isLoading } = useGetGroupMemberByGroupIdQuery(groupId);
  const [updateBlockStatus] = useUpdateBlockStatusMutation();
  const members = data?.data?.data;

  const handleBlock = async (memberId: string) => {
    try {
      const data = await updateBlockStatus({ groupId, memberId }).unwrap();
      toast.success(data?.message || "Blocked Status Updated!");
      console.log(data);
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.message || "Error updating block status!");
    }
  };
  if (isLoading) {
    <Loading />;
  }

  return (
    <div
      className="shadow-md bg-red rounded-lg"
      // className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      {members &&
        members?.map((member: TGroupMember) => (
          <div
            key={member.id}
            className="hover:rounded-sm border-b-slate-300 border-b p-4  text-white  hover:bg-green transition duration-300 ease-in-out"
          >
            <div className="flex flex-row space-y-2 items-center gap-2">
              <Avatar>
                <AvatarImage
                  src={
                    member.user.profilePicture ||
                    "https://github.com/shadcn.png"
                  }
                  alt="Avatar"
                  className="border border-gray-200 rounded-full"
                />
              </Avatar>
              <div className="flex flex-row  w-full justify-between">
                <div className="space-y-1 ">
                  <h2 className="text-lg font-semibold">
                    {member.user.firstName} {member.user.lastName}
                  </h2>

                  <p className="text-sm text-gray-200">
                    <span className="font-semibold">Joined At:</span>{" "}
                    {new Date(member.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="justify-end ">
                  <p className="text-sm text-gray-200 font-semibold">
                    {member.userId === member.group?.ownerId
                      ? "Owner"
                      : member.isModerator
                      ? "Moderator"
                      : ""}
                  </p>
                  {member.userId !== user?.id &&
                    member.userId !== member.group?.ownerId && (
                      <Button
                        onClick={() => handleBlock(member.id)}
                        className={`text-sm text-white font-semibold ${
                          member.isBlock ? "bg-[#5f160f] hover:bg-[#290c09]" : "bg-yellow hover:bg-red"}`}
                      >
                        {member.isBlock ? "Unblock" : "Block"}
                      </Button>
                    )}
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AllMembers;
