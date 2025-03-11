// "use client";

// import { useSelector } from 'react-redux';
// import { useParams } from 'next/navigation';
// import { useGetIsGroupMemberGroupIdQuery } from '@/redux/api/groupApi';
// import { RootState } from '@/redux/store';

// const useGroupMembership = () => {
//   const user = useSelector((state: RootState) => state?.user?.user);
//   const { id: groupId } = useParams();
//   const { data } = useGetIsGroupMemberGroupIdQuery(groupId);

//   const isGroupMember = data?.data;
//   const isOwner = isGroupMember?.group?.ownerId === user?.id;

//   return {
//     isGroupMember,
//     isOwner,
//     isLoading: !data, // Indicates if the query is still loading
//   };
// };

// export default useGroupMembership;