export type ContactRequestBody = {
  email: string;
  name: string;
  message: string;
};

export type ChangeUsernameRequestBody = {
  newUsername: string;
};

export type ChangePasswordRequestBody = {
  oldPassword: string;
  newPassword: string;
};
