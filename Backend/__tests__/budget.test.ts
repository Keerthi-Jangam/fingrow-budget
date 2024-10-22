import axios from 'axios'
const API_URL = `http://localhost:3000/api`;
jest.mock("axios");

describe("Checking Budget creation functionality",()=>{
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('Should not create budget if user is not present',async()=>{
        const res = {
            status: 400,
            msg: "User with the given username is not present",
        };
        (axios.post as jest.Mock).mockResolvedValue(res);

        const budget = {
            title:"Food",
            target:2000
        };
        const response = await axios.post(`${API_URL}/budget/mammu`, budget);
        expect(response.status).toBe(400);
        expect(response.data).toEqual(undefined);
        expect(res.msg).toMatch("User with the given username is not present");
    });

    it('Should not add category as it exists',async()=>{
        const res = {
            status: 500,
            msg: "Category Food already exists. Can't add.",
        };
        (axios.post as jest.Mock).mockResolvedValue(res);

        const budget = {
            title:"Food",
            target:2000
        };
        const response = await axios.post(`${API_URL}/budget/usha`, budget);
        expect(response.status).toBe(500);
        expect(response.data).toEqual(undefined);
        expect(res.msg).toMatch("Category Food already exists. Can't add.");
    });

    it('Should not add category as it exceeds total left balance',async()=>{
        const res = {
            status: 500,
            msg: "Total amount in account is not sufficient to add budget",
        };
        (axios.post as jest.Mock).mockResolvedValue(res);

        const budget = {
            title:"Food",
            target:2000
        };
        const response = await axios.post(`${API_URL}/budget/usha`, budget);
        expect(response.status).toBe(500);
        expect(response.data).toEqual(undefined);
        expect(res.msg).toMatch("Total amount in account is not sufficient to add budget");
    });

    it('Should add category successfully',async()=>{
        const res = {
            status: 200,
            data:{
                "title":"Groceries",
                "target":2000,
                "spent":0,
                "transactions":[]
            },
            msg: "Added Groceries successfully",
        };
        (axios.post as jest.Mock).mockResolvedValue(res);

        const budget = {
            title:"Groceries",
            target:2000
        };
        const response = await axios.post(`${API_URL}/budget/usha`, budget);
        expect(response.status).toBe(200);
        expect(response.data).toEqual({
            "title":"Groceries",
            "target":2000,
            "spent":0,
            "transactions":[]
        });
        expect(res.msg).toMatch("Added Groceries successfully");
    });
})


describe('Checking budget transaction functionality',()=>{
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Should not make transaction as user is not present',async()=>{
        const res = {
            status: 404,
            msg: "User with the given username is not present",
        };
        (axios.post as jest.Mock).mockResolvedValue(res);

        const transaction = {
            title:"Food",
            amount:500,
            on:"budget",
            date:new Date("2024-10-02")
        };
        const response = await axios.post(`${API_URL}/transaction/usha`, transaction);
        expect(response.status).toBe(404);
        expect(response.data).toEqual(undefined);
        expect(res.msg).toMatch("User with the given username is not present");
    });

    it('Should not make transaction as category is not present',async()=>{
        const res = {
            status: 500,
            msg: "Category Dairy does not  exists. Can't make transactions.",
        };
        (axios.post as jest.Mock).mockResolvedValue(res);

        const transaction = {
            title:"Dairy",
            amount:2000,
            on:"budget",
            date:new Date("2024-10-02")
        };
        const response = await axios.post(`${API_URL}/transaction/usha`, transaction);
        expect(response.status).toBe(500);
        expect(response.data).toEqual(undefined);
        expect(res.msg).toMatch("Category Dairy does not  exists. Can't make transactions.");
    });

    it('Should not make transaction as insufficient funds',async()=>{
        const res = {
            status: 500,
            msg: "Can't make a transaction as insufficient funds",
        };
        (axios.post as jest.Mock).mockResolvedValue(res);

        const transaction = {
            title:"Dairy",
            amount:10000,
            on:"budget",
            date:new Date("2024-10-02")
        };
        const response = await axios.post(`${API_URL}/transaction/usha`, transaction);
        expect(response.status).toBe(500);
        expect(response.data).toEqual(undefined);
        expect(res.msg).toMatch("Can't make a transaction as insufficient funds");
    });

    it('Should not make transaction as exceeding target',async()=>{
        const res = {
            status: 500,
            msg: "Can't do transaction as it is exceeding target amount",
        };
        (axios.post as jest.Mock).mockResolvedValue(res);

        const transaction = {
            title:"Dairy",
            amount:3000,
            on:"budget",
            date:new Date("2024-10-02")
        };
        const response = await axios.post(`${API_URL}/transaction/usha`, transaction);
        expect(response.status).toBe(500);
        expect(response.data).toEqual(undefined);
        expect(res.msg).toMatch("Can't do transaction as it is exceeding target amount");
    });

    it('Should make transaction  succesfully',async()=>{
        const res = {
            status: 500,
            msg: "Transaction made succesfully on Food for an amount 200",
        };
        (axios.post as jest.Mock).mockResolvedValue(res);

        const transaction = {
            title:"Food",
            amount:200,
            on:"budget",
            date:new Date("2024-10-02")
        };
        const response = await axios.post(`${API_URL}/transaction/usha`, transaction);
        expect(response.status).toBe(500);
        expect(response.data).toEqual(undefined);
        expect(res.msg).toMatch("Transaction made succesfully on Food for an amount 200");
    });
    
})