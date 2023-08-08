const projectModel = require('../models/project.js');
const ipa = require('ip');

const addProject = async (req, res, next) => {
    try {
        const newProject = await projectModel.create(req.body);
        
        return res
        .status(201)
        .json({
            success: true,
            msg: `Project with the no of ${newProject.no} has been added successfully !`,
        });
        
    } catch (error) {
        console.log(error);
    }

};

const getAllProjects = async(req, res, next) => {
    const projects = await projectModel.find({});

    res.status(200).json({success: true, projects: projects});
}

const rating = async (req, res, next) => {
    try {
        const ip = ipa.address();
        const projectToRate = await projectModel.findOne({ no: req.params.no });
        if (projectToRate.raters.includes(ip)) {
            const indexToDelete = projectToRate.raters.indexOf(ip);
            projectToRate.raters.splice(indexToDelete, 1);
            projectToRate.ratings.splice(indexToDelete, 1);
            let ratingTotal = projectToRate.ratings.reduce((sum, rating) => {
                return sum + rating;
            }, 0);
            let average = ratingTotal / projectToRate.raters.length;
            average = Math.round(average * 10) / 10;
            if (isNaN(average)) {
                average = 0;
            }
            projectToRate.rate = average;
            await projectToRate.save();
            if (req.body.rating > 0) {
                // rating project
                await ratingproject(projectToRate, req.body.rating, ip);
                return res.status(200).json({ success: true, msg: "Successfully rated the project !" });
            }
            // unrating project
            return res.status(200).json({ success: true, msg: "Successfully unrated the project !" });
        } else {
            // rating project
            await ratingproject(projectToRate, req.body.rating, ip);
            return res.status(200).json({ success: true, msg: "Successfully rated the project !" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "Something went wrong !"});
    }
    
};   
  
async function ratingproject(projectToRate, rating, userId) {
    try {
        projectToRate.raters.push(userId);
        projectToRate.ratings = [...projectToRate.ratings, rating];
        let ratingTotal = projectToRate.ratings.reduce((sum, rating) => {
            return sum + rating;
        }, 0);
        let average = ratingTotal / projectToRate.raters.length;
        // console.log(isNan(average));
        // if (isNan(average)) {
        //     average = rating;
        // }
        projectToRate.rate = Math.round(average * 10) / 10;
        await projectToRate.save();
    } catch (e) {
        console.log('error when rating project', e)
    }

};


module.exports = { getAllProjects, addProject, rating };