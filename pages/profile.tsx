import UserProfile from "../components/profile/user-profile";
import { getSession } from "next-auth/react";
// import { authOptions } from "./api/auth/[...nextauth]";
// import { getServerSession } from "next-auth/next";
import { GetServerSideProps } from "next";
import React from "react";

type UserProps = {
  name: string;
  email: string;
};

type Props = {
  user: UserProps;
};
function ProfilePage({ user }: Props) {
  return <UserProfile />;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const session = await getSession({ req: context.req });
  // const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: {
        name: session.user.name,
        email: session.user.email,
      },
    },
  };
};

export default ProfilePage;
