import { UserModel } from "../Collections/User";
import { user } from "../Types/User";


export const insertUser = async (userDetails: user) => {
    try{
        const insertedUser = await UserModel.create(userDetails);
        return insertedUser;
    }
    catch(e){
        return 'Error adding User';
    }
}
