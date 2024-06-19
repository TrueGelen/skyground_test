class UserService {
  async signUp() {
    return new Promise((resolve) => resolve("test"));
  }

  async signIn() {}

  async signOut() {}

  async getUsers() {
    return new Promise((resolve) =>
      resolve([
        {
          id: "0",
          email: "some@ya.ru",
          firstName: "Ivan",
          lastName: "Ivanov",
        },
      ])
    );
  }
}

export const userService = new UserService();
