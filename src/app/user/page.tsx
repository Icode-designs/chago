"use client";
import { RootState } from "@/store/store";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

const UserPage = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);

  if (user) {
    redirect(`/user/${user.role}`);
  } else {
    redirect("/auth-error");
  }
  return;
};

export default UserPage;
