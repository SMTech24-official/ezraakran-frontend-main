import GroupPost from "@/components/groupDetails/GroupPost";
import AllMembers from "./AllMembers";
import MyPosts from "./MyPosts";
import JoinRequests from "./JoinRequests";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TabsSection = () => {
  return (
    <div>
      <Tabs defaultValue="posts" className="mt-6">
        <TabsList className="gap-4 pb-3 grid w-full grid-cols-4 bg-red">
          <TabsTrigger
            value="posts"
            className="data-[state=active]:bg-green data-[state=inactive]:bg-default hover:bg-green text-white font-bold md:text-nowrap text-center transition duration-300 hover:text-gray-600"
          >
            Posts
          </TabsTrigger>

          <TabsTrigger
            value="my-posts"
            className="data-[state=active]:bg-green data-[state=inactive]:bg-default hover:bg-green text-white font-bold md:text-nowrap text-center transition duration-300 hover:text-gray-600"
          >
            My Posts
          </TabsTrigger>
          <TabsTrigger
            value="members"
            className="data-[state=active]:bg-green data-[state=inactive]:bg-default hover:bg-green text-white font-bold md:text-nowrap text-center transition duration-300 hover:text-gray-600"
          >
            Members
          </TabsTrigger>
          <TabsTrigger
            value="requests"
            className="data-[state=active]:bg-green data-[state=inactive]:bg-default hover:bg-green text-white font-bold md:text-nowrap text-center transition duration-300 hover:text-gray-600"
          >
            Join Requests
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts">
          <GroupPost />
        </TabsContent>
        <TabsContent value="members">
          <AllMembers />
        </TabsContent>
        <TabsContent value="requests">
          <JoinRequests />
        </TabsContent>
        <TabsContent value="my-posts">
          <MyPosts />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TabsSection;
