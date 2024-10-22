import axios from 'axios'
const API_URL = `http://localhost:3000/api`;
jest.mock("axios");

describe("Checking transaction functionality",()=>{
    it('Should not do transaction as user is not present',async()=>{
        const res = {
            status: 404,
            msg: "No user found",
        };
        (axios.post as jest.Mock).mockResolvedValue(res);

        const transaction = {
            title:"Food",
            amount:500,
            on:"others",
            date:new Date("2024-10-02"),
            type:"credit",
        };
        const response = await axios.post(`${API_URL}/transaction/usha`, transaction);
        expect(response.status).toBe(404);
        expect(response.data).toEqual(undefined);
        expect(res.msg).toMatch('No user found')
    })

    it('Should  do transaction',async()=>{
        const res = {
            status: 200,
            msg: "Succesfully transaction made",
        };
        (axios.post as jest.Mock).mockResolvedValue(res);

        const transaction = {
            title:"Food",
            amount:500,
            on:"others",
            date:new Date("2024-10-02"),
            type:"credit",
        };
        const response = await axios.post(`${API_URL}/transaction/usha`, transaction);
        expect(response.status).toBe(200);
        expect(response.data).toEqual(undefined);
        expect(res.msg).toMatch("Succesfully transaction made")
    })
})
