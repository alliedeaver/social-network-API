const { Thought } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thought = await Thought.find();
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.id })
                //what do we populate??
                // .populate('thought');
            if (!thought) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // create a new user
    async createNewThought(req, res) {
        try {
            const dbUserData = await Thought.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            res.status(500).json(err);
        }
    },


    async updateThought(req, res) {
        try {
            const updatedThought = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!updatedThought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }

            res.json(updatedThought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {
        try {
            const deleteThought = await Thought.findOneAndRemove({ _id: req.params.id });

            if (!deleteThought) {
                return res.status(404).json({ message: 'No thought was found with this id!' });
            }

            // const thought = await Thoughts.findOneAndUpdate(
            //     { Thoughts: req.params.userId },
            //     { $pull: { thought: req.params.videoId } },
            //     { new: true }
            // );

            // if (!thought) {
            //     return res
            //         .status(404)
            //         .json({ message: 'Thought created but no user with this id!' });
            // }

            res.json({ message: 'Thought successfully deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createReaction(req, res) {
        try {
            const newReaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $push: { reactions: {
                    reactionBody: req.body.reactionBody, 
                    username: req.body.username
                }}  },
                { new: true }
            );

            if (!newReaction) {
                return res.status(404).json({
                    message: 'A new reaction was created, but found no thought with that ID',
                });
            }
            res.json('Created a new Reaction! 🎉');
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
   

    async deleteReaction(req, res) {
        try {
            const deleteReaction = await Thought.findOneAndUpdate(
                
                {_id: req.params.thoughtId},
                {$pull:{
                    reactions: {
                        reactionId: req.params.reactionId
                    }
                }},
                { new: true }
                );

            if (!deleteReaction) {
                return res.status(404).json({ message: 'No reaction was found with this id!' });
            }
            res.json({ message: 'Reaction successfully deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
};