import { User, users } from "../models/user";

describe('Checking User Class', () => {
    it('should create a new user successfully', async () => {
        const user = new User('Usha', '1234', 500, 500);
        const result = await user.create();
        expect(result).toBe('User Created Succesfully');
        expect(users).toHaveLength(1);
        expect(users[0].name).toBe('Usha');
    });

    it('should not create a user if the name already exists', async () => {
        const user1 = new User('Usha', '1234', 500, 500);
        const result = await user1.create();
        expect(result).toBe('user with this name already exists');
        expect(users).toHaveLength(1);
    });
});
