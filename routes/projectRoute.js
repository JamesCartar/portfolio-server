const express = require('express');

const { getAllProjects, addProject, rating } = require('../controllers/projectsController.js');

const router = express.Router();

router.get('/', getAllProjects);
router.post('/', addProject);
router.post('/rating/:no', rating);

module.exports = router;