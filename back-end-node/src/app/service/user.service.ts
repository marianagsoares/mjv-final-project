import User from "../models/user.model";

class UserService {
    getAll() {
        const allUsers = User.find();
        return allUsers;
    }
}

export default new UserService;