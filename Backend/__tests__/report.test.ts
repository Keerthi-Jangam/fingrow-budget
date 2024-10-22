import axios from "axios";
const API_URL = `http://localhost:3000/api`;
jest.mock("axios");

describe("Checking reports", () => {
    it("Should check total income and excepses", async () => {
        const res = {
            status: 200,
            data: {
                totalIncome: 2000,
                totalExpenses: 3000,
            },
        };
        (axios.post as jest.Mock).mockResolvedValue(res);

        const response = await axios.post(`${API_URL}/income-expenses/usha`);
        expect(response.status).toBe(200);
        expect(response.data).toEqual({
            totalIncome: 2000,
            totalExpenses: 3000,
        });
    });
    it("Should check total budget summary", async () => {
        const res = {
            status: 200,
            data: [
                {
                    title: "Food",
                    target: 8000,
                    spent: 8000,
                },
            ],
        };
        (axios.post as jest.Mock).mockResolvedValue(res);

        const response = await axios.post(`${API_URL}/budget-summary/usha`);
        expect(response.status).toBe(200);
        expect(response.data).toEqual([
            {
                title: "Food",
                target: 8000,
                spent: 8000,
            },
        ]);
    });
});
