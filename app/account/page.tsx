import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { DBFunctions } from "@/functions/DBFunctions";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import AccountDetails from "@/components/account/accountDetails";

interface Profile {
  avatar_url: string | null;
  bio: string | null;
  full_name: string;
  id: string;
  role: string;
  user_id: string;
}

export async function AccountPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const db = new DBFunctions();
  const profileData = await db.getProfile(user.id);

  if (!profileData) {
    redirect("/onboarding");
  }

  // Type assertion and transformation
  const profile: Profile = {
    avatar_url: profileData.avatar_url as string | null,
    bio: profileData.bio as string | null,
    full_name: profileData.full_name as string,
    id: profileData.id as string,
    role: profileData.role as string,
    user_id: profileData.user_id as string,
  };

  return (
    <div className="flex w-full min-h-screen bg-gradient-to-br from-black via-gray-900 via-violet-950 via-violet-800 to-indigo-600">
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-white/20 bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-2xl">
          <CardHeader className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-white">Account Details</h2>
            <UserButton afterSignOutUrl="/" />
          </CardHeader>
          <CardBody>
            <AccountDetails profile={profile} user={user} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}