"use client";
import { useGetPostByIdQuery } from "@/redux/api/baseApi";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import Image from "next/image";
import Loading from "@/components/Loading";

const Page = () => {
  const { id } = useParams();
  const { data: post, isLoading } = useGetPostByIdQuery(id);
  const [currentImage, setCurrentImage] = React.useState(post?.data?.images[0]);

  useEffect(() => {
    if (post?.data?.images?.length > 0) {
      setCurrentImage(post.data.images[0]);
    }
  }, [post]); 

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container min-h-screen flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-4xl bg-customGreen rounded-xl flex flex-col md:flex-row items-center justify-center gap-6 p-6 md:p-10 shadow-lg">
        
        {/* Image Gallery */}
        <div className="w-full md:w-[500px] h-auto rounded-xl overflow-hidden">
          <Image
            src={currentImage}
            alt="product image"
            width={500}
            height={500}
            className="w-full h-[300px] md:h-[400px] object-cover rounded-lg"
          />
          <div className="flex justify-center items-center gap-3 mt-4">
            {post?.data?.images?.map((image: string, index: number) => (
              <button
                key={index}
                onClick={() => setCurrentImage(image)}
                className="rounded-md overflow-hidden border-2 hover:scale-110 transition-all w-16 h-16"
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index}`}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 text-center md:text-left px-5 md:px-10">
          <h1 className="font-bold uppercase text-xl md:text-3xl mb-3">
            {post?.data?.title}
          </h1>
          <p className="text-sm md:text-base mb-5">{post?.data?.description}</p>
          
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-start space-y-4 md:space-y-0 md:space-x-4">
            <span className="text-2xl font-bold">£{post?.data?.price}</span>
            <Link href={`/shop/payment?postId=${post?.data?.id}`} passHref>
              <button className="bg-yellow hover:opacity-75 opacity-100 text-gray-700 hover:bg-darkBlue rounded-full px-6 py-2 font-semibold duration-300 transition-all">
                BUY NOW
              </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Page;
