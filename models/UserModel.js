const users = [];

export const UserModel = {
  getAll: () => users,

  add: (user) => users.push(user),

  findByEmail: (email) => users.find((u) => u.email === email),
};
