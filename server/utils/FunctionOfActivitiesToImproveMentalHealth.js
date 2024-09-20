const mongoose = require('mongoose');
const FieldsOfImproveMentalHealth = require("../models/feildsToImproveMentalHealth"); // Fixed spelling
const Activity = require('../models/feildsToImproveMentalHealth'); // Ensure the path is correct

const activitiesData = {
    'Stress Management': [
        { title: 'Deep Breathing', description: 'Practice deep breathing exercises for 10 minutes.' },
        { title: 'Meditation', description: 'Engage in a 15-minute guided meditation.' },
        { title: 'Nature Walk', description: 'Take a walk in nature to clear your mind.' },
        { title: 'Talk to a Friend', description: 'Reach out to a friend for support.' },
        { title: 'Limit Screen Time', description: 'Set boundaries for your screen time.' },
        { title: 'Yoga', description: 'Join a yoga class or follow a video.' },
        { title: 'Mindfulness Exercises', description: 'Practice mindfulness throughout your day.' },
        { title: 'Music Therapy', description: 'Listen to calming music for relaxation.' },
        { title: 'Journaling', description: 'Write down your thoughts for 10 minutes.' },
        { title: 'Positive Affirmations', description: 'Write and repeat positive affirmations.' },
    ],
    'Creativity': [
        { title: 'Brainstorm Ideas', description: 'Spend 30 minutes brainstorming creative ideas.' },
        { title: 'Visit an Art Gallery', description: 'Explore an art gallery and reflect on your feelings.' },
        { title: 'Try a New Hobby', description: 'Start a new hobby like painting or writing.' },
        { title: 'Daily Creative Journaling', description: 'Write or draw in a journal daily.' },
        { title: 'Mind Mapping', description: 'Create a mind map for a project or idea.' },
        { title: 'Collage Making', description: 'Make a collage of things that inspire you.' },
        { title: 'Photography Walk', description: 'Take a walk and capture interesting moments with your camera.' },
        { title: 'Listen to Inspiring Music', description: 'Listen to music that sparks your creativity.' },
        { title: 'Join a Creative Group', description: 'Find a group of like-minded individuals to share ideas.' },
        { title: 'Attend a Creative Workshop', description: 'Join a workshop that interests you.' },
    ],
};

// Function to insert activities
const insertActivities = async () => {
    for (const fieldName in activitiesData) {
        const field = await FieldsOfImproveMentalHealth.findOne({ name: fieldName });
        if (field) {
            const existingActivities = await Activity.find({ field: field._id });
            const existingActivityTitles = existingActivities.map(activity => activity.title);

            const activitiesToInsert = activitiesData[fieldName].filter(activity => !existingActivityTitles.includes(activity.title)).map(activity => ({
                title: activity.title,
                description: activity.description,
                field: field._id,
            }));

            if (activitiesToInsert.length > 0) {
                await Activity.insertMany(activitiesToInsert);
                console.log(`Inserted activities for ${fieldName}`);
            } else {
                console.log(`Activities for ${fieldName} already exist.`);
            }
        }
    }
};

// Database connection and execution
const runSeed = async () => {
    try {
        await mongoose.connect('mongodb+srv://rajjatsharma13:Rajat7340939692@cluster0.p6yzg.mongodb.net/SleepDB', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await insertActivities();
        console.log('Activities inserted successfully');
    } catch (error) {
        console.error("Error inserting activities", error);
    } finally {
        await mongoose.disconnect();
    }
};

// Execute the seed script
module.exports = {
    insertActivities,
    runSeed,
}