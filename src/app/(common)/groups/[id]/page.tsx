import React, { useState } from "react";
import GroupPost from "@/components/groupDetails/GroupPost";
import GroupBanner from "@/components/groupDetails/GroupBanner";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import Members from "@/components/groupDetails/Members";
// import JoinRequests from "@/components/groupDetails/JoinRequests";
// import MyPosts from "@/components/groupDetails/MyPosts";

const GroupPage = () => {
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <div className="container px-4 md:px-0">
      <GroupBanner />
      
      {/* <Tabs defaultValue="posts" onValueChange={setActiveTab} className="mt-6">
      
        <TabsList className="flex gap-4 border-b pb-2">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="requests">Join Requests</TabsTrigger>
          <TabsTrigger value="my-posts">My Posts</TabsTrigger>
        </TabsList>

        <TabsContent value="posts">
          <GroupPost groupPostId="someId" />
        </TabsContent>
        <TabsContent value="members">
          <Members />
        </TabsContent>
        <TabsContent value="requests">
          <JoinRequests />
        </TabsContent>
        <TabsContent value="my-posts">
          <MyPosts />
        </TabsContent>
      </Tabs> */}
    </div>
  );
};

export default GroupPage;
