const { User } = require('../models');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
                // .populate('user');
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                //what do we populate??
                // .populate('user');
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // create a new user
    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createNewUser(req, res) {
        try {
            const newUser = await User.create(req.body)(
                { _id: req.body.userId },
                { $addToSet: { users: newUser._id } },
                { new: true }
            );

            if (!newUser) {
                return res.status(404).json({
                    message: 'User was created, but found no user with that ID',
                });
            }
            res.json('Created a new User 🎉');
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!updatedUser) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }

            res.json(updatedUser);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try {
            const deleteUser = await User.findOneAndRemove({ _id: req.params.userId });

            if (!deleteUser) {
                return res.status(404).json({ message: 'No user was found with this id!' });
            }

            //to delete the thoughts :)
            // const user = await User.findOneAndUpdate(
            //     { users: req.params.userId },
            //     { $pull: { videos: req.params.videoId } },
            //     { new: true }
            // );

            // if (!user) {
            //     return res
            //         .status(404)
            //         .json({ message: 'Video created but no user with this id!' });
            // }

            res.json({ message: 'User successfully deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }},

        async addFriend(req, res) {
            try {
              const friend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                //need to find the req params to get the friend 
                { $addToSet: { friends: req.params.friendId } },
                { runValidators: true, new: true }
              );
        
              if (!friend) {
                return res.status(404).json({ message: 'No friend found with this ID!' });
              }
        
              res.json(friend);
            } catch (err) {
              res.status(500).json(err);
            }
          },
          async removeFriend(req, res) {
            try {
              const friend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: { responseId: req.params.friendId } } },
                { runValidators: true, new: true }
              )
        
              if (!friend) {
                return res.status(404).json({ message: 'No friend found with this id!' });
              }
        
              res.json(video);
            } catch (err) {
              res.status(500).json(err);
            }
          },

    };

    