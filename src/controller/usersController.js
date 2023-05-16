import { usersModel } from "../model/usersModel"

const getListUser = (req, res) => {
    try {
        console.log("contrroller");
        return usersModel.getListUser(res);
    } catch {

    }
}

export const usersController = { getListUser };