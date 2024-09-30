import { UserManager,User } from './UserManager';
import { BudgetManager } from './budget';
import { SavingsManager } from './SavingGoals';
import { ReportGenerator } from './Report';
import { AlertSystem } from './Alerts';
import { data } from '../static_data/data';
import { TransactionManager } from './Transaction';

const userManager = new UserManager();
const user: User = data[0];
userManager.addUser(user);


const transactionManager = new TransactionManager();
transactionManager.addTransaction('Salary', 5000, 'income');
transactionManager.addTransaction('Rent', 1200, 'expense');
transactionManager.addTransaction('Groceries', 300, 'expense');
transactionManager.addTransaction('Investment', 1000, 'income');

const budgetManager = new BudgetManager(user);
budgetManager.setBudget('Food', 9000);


const savingsManager = new SavingsManager(user);
savingsManager.addSavings('New Savings', 20000);


const reportGenerator = new ReportGenerator(user);
console.log(reportGenerator.generateReport());


const alertSystem = new AlertSystem(user);
console.log(alertSystem.checkForAlerts());


