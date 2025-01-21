'use client'
import Homepage from "@/components/Homepage";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Home() {

  const { isLoaded, userId } = useAuth();
  const [isloading, setIsLoading] = useState(false);


  const router = useRouter();

  useEffect(() => {
    if (isLoaded && userId) {
      setIsLoading(true);
      setIsLoading(true);
      router.push("/dashboard");
    }
  }, [isLoaded, userId, router]);


  if (!isLoaded || isloading) {
    return (
      <div className="flex justify-center items-center h-screen pb-10">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-purple-500"></div>
      </div>
    )
  }
  return (
    <>
   <Homepage />
   </>
  );
}
