import { UserManager, User } from "../models/user";
import { data } from "../static_data/data";

describe("User Management", () => {
  let userManager: UserManager;

  beforeEach(() => {
    userManager = new UserManager();
  });

  it("should add a new user", () => {
    const user: User = data[0];

    userManager.addUser(user);
    expect(userManager.getUser("keerthi")).toEqual(user);
  });
});
