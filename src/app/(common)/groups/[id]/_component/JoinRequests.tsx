"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  useGetGroupMemberByGroupIdQuery,
  useGetJoinRequestsByGroupIdQuery,
  useUpdateJoinStatusMutation,
} from "@/redux/api/groupApi";
import { RootState } from "@/redux/store";
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
  user: TUser;
  group: TGroup;
};

const JoinRequests = () => {
  const user = useSelector((state: RootState) => state?.user?.user);
  const { id: groupId } = useParams();
  const { data } = useGetJoinRequestsByGroupIdQuery(groupId);
  const [acceptJoinRequest] = useUpdateJoinStatusMutation();

  const handleAcceptRequest = async (memberId: string, status: string) => {
    // console.log(memberId, status);
    try {
      const res = await acceptJoinRequest({groupId, memberId, status}).unwrap();
      // console.log(res)
      toast.success(res?.message || "Request accepted successfully!");
    } catch (error:any) {
      toast.error(error?.data?.message);
      console.error("Error accepting join request:", error);
    }
  };

  const members = data?.data?.data || [];

  return (
    <div
      className="shadow-md bg-red rounded-lg"
      // className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      {members?.map((member: TGroupMember) => (
        <div
          key={member.id}
          className="hover:rounded-sm p-4 text-white  hover:bg-green transition duration-300 ease-in-out"
        >
          <div className="flex flex-row space-y-2 items-center gap-2">
            <Avatar>
              <AvatarImage
                src={
                  member.user.profilePicture || "https://github.com/shadcn.png"
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
                    <div className="flex flex-row gap-2">
                      <Button
                        onClick={() => handleAcceptRequest(member.id, "APPROVED")}
                        className="text-sm text-white font-semibold bg-yellow hover:bg-red"
                      >
                        Accept
                      </Button>
                      <Button
                        onClick={() => handleAcceptRequest(member.id, "REJECTED")} className="text-sm font-semibold bg-[#5f160f]  hover:bg-[#290c09] text-white"
                      >
                        Reject
                      </Button>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JoinRequests;
