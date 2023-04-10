import { User } from '../app/models/user.model';

class UserRepository {
    getAll() {
        return User.find();
    }

    getById(id: string) {
        return User.findOne({ _id: id });
    }

    getByEmail(email: string) {
        return User.findOne({ email: email });
    }

    create(user: User) {
        return User.create(user);
    }

    update(id: string, user: Partial<User>) {
        return User.updateOne({ _id: id }, { $set: user });
    }

    delete(id: string) {
        return User.deleteOne({ _id: id });
    }
};

export default new UserRepository;