const UserServices = require('../services/user.services');

class UserController{

    async create(req,res){
        try {
            const user = await UserServices.create(req.body)
            res.status(201).json({
                message:"User was successfully created.",
                user
            })
        } catch (error) {
            res.json({
                message:"User was not created. Something went wrong.",
                error
            })
        }
    }

    async getAllUsers(req, res){
         try {
             const users = await UserServices.get()
             res.json({
                 message:"Successfully fetched all users",
                 users
             })
         } catch (error) {
             res.json({
                 message:"Failed to fetch all users.",
                 error
             })
         }
    }

    async getUser(req, res){
        try {
            const user = await UserServices.get(req.params.userID)
            res.json({
                message:"Successfully fetched user",
                user
            })
        } catch (error) {
            res.json({
                message:"Failed to fetch  user.",
                error
            })
        }
    }

    async update(req, res){
        try {
            const user = await UserServices.update(req.params.userID, req.body)
            console.log('user :', user);
            res.json({
                message:"Successfully updated user",
                user
            })
        } catch (error) {
            res.json({
                message:"Failed to update  user.",
                error
            })
        }
    }

    async passwordReset(req, res){
        try {
            const user = await UserServices.passwordReset(req.params.userID, req.body)
            res.json({
                message:"Successfully updated user password",
                user
            })
        } catch (error) {
            res.json({
                message:"Failed to update  user password.",
                error
            })
        }
    }

    async delete(req, res){
        try {
            const user = await UserServices.delete(req.params.userID)
            res.json({
                message:"Successfully deleted user",
                user
            })
        } catch (error) {
            res.json({
                message:"Failed to delete  user.",
                error
            })
        }
    }

    async login(req, res) {
        try {
            let {user, token }= await UserServices.authenticate(req.body)
            res.token = token
            res.status(200).json({
                message: `Successfully logged in as  ${user.name.first} ${user.name.last}`,
                user,
                token
            })
        } catch (error) {
            res.json({
                message: "Failed to login user.",
                error,
            })
        }
    }

}


module.exports = new UserController()