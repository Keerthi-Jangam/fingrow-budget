import axios from "axios";
const API_URL = `http://localhost:3000/api`;
jest.mock("axios");

describe("Checking post request of user", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Should succesfully create a user and returm success message", async () => {
        const res = {
            status: 200,
            data: {
                name: "Keerthi",
                password: "1234",
                totalIncome: 10000,
                balance: 10000,
            },
            msg: "User Created Succesfully",
        };
        (axios.post as jest.Mock).mockResolvedValue(res);

        const user = {
            name: "",
            password: "",
            totalIncome: 10000,
            balance: 10000,
        };
        const response = await axios.post(`${API_URL}/users`, user);
        expect(response.status).toBe(200);
        expect(response.data).toEqual({
            name: "Keerthi",
            password: "1234",
            totalIncome: 10000,
            balance: 10000,
        });
        expect(res.msg).toMatch("User Created Succesfully");
    });

    it("Should not create user as information is not provided", async () => {
        const res = {
            status: 400,
            msg: "Error creating user",
        };
        (axios.post as jest.Mock).mockRejectedValue(res);
        const user = {
            name: "",
            password: "",
            totalIncome: 10000,
            balance: 10000,
        };
        try {
            await axios.post(`${API_URL}/users`, user);
        } catch (error: any) {
            expect(error.status).toBe(400);
            expect(error.data).toEqual(undefined);
            expect(res.msg).toMatch("Error creating user");
        }
    });
});
