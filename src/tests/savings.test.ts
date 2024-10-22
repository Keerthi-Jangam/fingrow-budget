import { Savings } from "../models/saving";
import { Transaction } from "../models/transaction";
import { User, users } from "../models/user";
import { savings } from "../models/saving";

describe("Savings Class", () => {
    const dummySaving = new Savings("Keerthi");
    beforeAll(async () => {
        const dummyUser = new User("Keerthi", "1234", 1000, 1000);
        await dummyUser.create();
    });

    describe("createGoal()", () => {
        it("should create a new savings goal for a user", () => {
            const saving = new Savings("Keer");
            const result = saving.createGoal("Vacation", 1000);
            expect(result).toBe(
                "Savings Goal 'Vacation' created successfully in the savings for user Keer."
            );
            expect(saving.goals[0]).toEqual({
                title: "Vacation",
                target: 1000,
                current: 0,
                transactions: [],
            });
        });

        it("should not allow duplicate savings goal creation for a user", () => {
            const johnSavings = new Savings("john");
            johnSavings.createGoal("Vacation", 1000);

            const result = johnSavings.createGoal("Vacation", 2000);
            expect(result).toBe(
                "saving 'Vacation' already exists for user john."
            );
        });
    });

    describe("makeTransaction()", () => {
        const dummySaving = new Savings("Keerthi");
        beforeAll(async () => {
            const dummyUser = new User("Keerthi", "1234", 1000, 1000);
            await dummyUser.create();
        });

        it("should record a transaction in the savings goal", () => {
            const ushaSavings = new Savings("Keerthi");
            ushaSavings.createGoal("Vacation", 1000);

            const transaction = new Transaction(
                "Vacation Fund",
                "Vacation",
                300,
                "saving",
                "Keerthi"
            );
            const result = ushaSavings.makeTransaction(transaction);

            expect(result).toBe("Transaction recorded in savings.");
        });

        it("should not allow transaction if user doesn't exist", () => {
            const mammu = new Savings("Mammu");
            const transaction = new Transaction(
                "Vacation Fund",
                "Vacation",
                300,
                "saving",
                "john"
            );
            const result = mammu.makeTransaction(transaction);

            expect(result).toBe("No user present");
        });

        it("should not allow transaction if there is no matching savings", () => {
            const user = new User("niki","1234",100,100);
            user.create();
            const transaction = new Transaction(
                "Vacation Fund",
                "Vacation",
                300,
                "saving",
                "niki"
            );
            const result = new Savings("niki").makeTransaction(transaction);
            expect(result).toBe("Goal not found. Can't make transaction");
        })

        it("should not allow transaction if it exceeds user's balance", () => {
          const user= new User("niki2","1234",100,100);
          user.create();
            const nikiSavings  = new Savings("niki2");
            nikiSavings.createGoal("Vacation", 1000);
            const transaction = new Transaction(
                "Vacation Fund",
                "Vacation",
                300,
                "saving",
                "niki2"
            );
            const result = nikiSavings.makeTransaction(transaction);
            expect(result).toBe("Amount insufficient");
        });

        it("should not allow transaction if it exceeds the savings target", () => {
          const user= new User("Varun","1234",1800,1800);
          user.create();
            const varunSavings = new Savings("Varun");
            varunSavings.createGoal("Vacation", 1000);
            savings.push(varunSavings);

            const transaction = new Transaction(
                "Vacation Fund",
                "Vacation",
                1500,
                "saving",
                "Varun"
            );
            const result = varunSavings.makeTransaction(transaction);

            expect(result).toBe("Transaction exceeds savings target.");
        });
    });
});
