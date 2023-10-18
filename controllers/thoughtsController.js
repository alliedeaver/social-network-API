const Thoughts = require('../models/thoughts');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thought = await Thoughts.find()
                .populate('thought');
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleThought(req, res) {
        try {
            const thought = await Thoughts.findOne({ _id: req.params.userId })
                //what do we populate??
                .populate('thought');
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
            const dbUserData = await Thoughts.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createNewThought(req, res) {
        try {
            const newThought = await Thought.create(req.body)(
                { _id: req.body.userId },
                { $addToSet: { Thoughts: newThought._id } },
                { new: true }
            );

            if (!newThought) {
                return res.status(404).json({
                    message: 'A new thought was created, but found no thought with that ID',
                });
            }
            res.json('Created a new Thought! 🎉');
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        try {
            const updatedThought = await Thoughts.findOneAndUpdate(
                { _id: req.params.thoughtId },
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
            const deleteThought = await Thoughts.findOneAndRemove({ _id: req.params.thoughtId });

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
            const newReaction = await reaction.create(req.body)(
                { _id: req.body.thoughtId },
                { $addToSet: { reactions: req.body } },
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
            const deleteReaction = await reaction.findOneAndRemove({ _id: req.params.thoughtId/reactions });

            if (!deleteReaction) {
                return res.status(404).json({ message: 'No reaction was found with this id!' });
            }
            res.json({ message: 'Reaction successfully deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
};