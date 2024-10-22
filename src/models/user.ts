export const users : User[]=[] 

export class User {
    name:string;
    password:string;
    totalIncome:number;
    balance:number;

    constructor(name:string, password:string, totalIncome:number, balance:number){
        this.name = name;
        this.password = password;
        this.totalIncome = totalIncome;
        this.balance = balance;
    }

    async create(){
        const user = users.find(user=>user.name===this.name)
        if(user){
            return "user with this name already exists";
        }
        users.push(this);
        return "User Created Succesfully"
    }

}