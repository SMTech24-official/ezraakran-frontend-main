import React, { useState } from "react";
import GroupPost from "@/components/groupDetails/GroupPost";
import GroupBanner from "@/components/groupDetails/GroupBanner";
import TabsSection from "./_component/TabsSection";


const GroupPage = () => {


  return (
    <div className="container px-4 md:px-0">
      <GroupBanner />
      
      <TabsSection/>
      
    </div>
  );
};

export default GroupPage;
