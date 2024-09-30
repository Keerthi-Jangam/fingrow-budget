import { UserManager,User } from './UserManager';
import { BudgetManager } from './budget';
import { SavingsManager } from './SavingGoals';
import { ReportGenerator } from './Report';
import { AlertSystem } from './Alerts';
import { data } from '../static_data/data';

const userManager = new UserManager();
const user: User = data[0];
userManager.addUser(user);


const budgetManager = new BudgetManager(user);
budgetManager.setBudget('Food', 9000);


const savingsManager = new SavingsManager(user);
savingsManager.addSavings('New Savings', 20000);


const reportGenerator = new ReportGenerator(user);
console.log(reportGenerator.generateReport());


const alertSystem = new AlertSystem(user);
console.log(alertSystem.checkForAlerts());
