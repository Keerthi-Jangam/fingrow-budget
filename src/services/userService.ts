import User from "../models/User";

export const createUser = async (username: string, password: string) => {
  const user = new User({ username, password });
  await user.save();
  return user;
};

export const getUser = async (userId: string) => {
  return await User.findById(userId);
};

export const updateUser = async (
  userId: string,
  updates: Partial<{ username: string; password: string }>
) => {
  return await User.findByIdAndUpdate(userId, updates, { new: true });
};

export const deleteUser = async (userId: string) => {
  return await User.findByIdAndDelete(userId);
};
