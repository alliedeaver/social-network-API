const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createNewThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/userController.js');

router.route('/')
    .get(getThoughts)
    .get(createNewThought);
    

router.route('/:id')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

router.route('/:thoughtId/reactions')
    .post(createReaction)
    .delete(deleteReaction);


    module.exports = router;