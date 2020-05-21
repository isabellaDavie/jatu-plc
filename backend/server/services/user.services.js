const bcrypt = require('bcrypt')

const User = require('../models/user.model')

class UserServices {

    async create(data) {
        console.log('data :', data);
        const users = await User.find({
            email: data.email
        })
        if (users.length > 0) {
            throw 'User already exists.'
        } else {
            data.password = await bcrypt.hash(data.password, 10)
            const user = await User.create(data)
            console.log("await User.create(data)");
            if (!user) console.log('no user created')
            return user
        }
    }

    async authenticate(credentials) {
        console.log('credentials :', credentials);
        const user = await User.findOne({
            email: credentials.email
        })
        console.log('user :', user);
        if (!user) throw 'User not found. Please use the correct email and password.'
        if (!await bcrypt.compare(credentials.password, user.password)) {
            throw 'Please provide the correct credentials. Username or password is invalid.'
        }
        let token = await user.createToken();
        console.log('token :', token);
        return {user, token}
    }

    async passwordReset(userID, data) {
        console.log('data :', data);
        const user = await User.findById(userID)
        if (!user) throw `User does not exist.`
        user.password = await bcrypt.hash(data.password, 10)
        await user.save()
        return user
    }

    async get(userID) {
        if (userID) {
            const user = await User.findById(userID)
            return user
        } else {
            const users = await User.find()
            return users
        }
    }

    async update(id, data) {

        const user = await User.findByIdAndUpdate({
            _id: id
        }, data, {
            new: true
        })
        if (!user) throw 'User not found.'
        return user
    }

    async delete(id) {
        /*
    This function simply deletes a user from the database
    */
        // Delete the user
        const deleted = await User.findByIdAndDelete(id);
        if (!deleted) throw 'User not found';
        // Return the deleted user
        return deleted
    }


    async getAllEmployees() {
        const employees = await User.find({
            role: 'staff'
        })
        return employees
    }
}


module.exports = new UserServices();