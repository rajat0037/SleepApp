const mongoose = require('mongoose');

// Define the possible fields for mental health as enum directly in the schema
const fieldSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: [
            'Stress Management',
            'Emotional Resilience',
            'Self-Esteem',
            'Mindfulness',
            'Cognitive Flexibility',
            'Social Support',
            'Work-Life Balance',
            'Sleep Hygiene',
            'Healthy Nutrition',
            'Physical Exercise',
            'Time Management',
            'Relaxation Techniques',
            'Positive Thinking',
            'Self-Care',
            'Goal Setting',
            'Assertiveness',
            'Conflict Resolution',
            'Gratitude Practice',
            'Creativity',
            'Hobbies and Interests',
            'Personal Growth'
        ],
        required: true,
        unique: true,
    },
});


module.exports = mongoose.model('FieldsOfImproveMentalHealth', fieldSchema);
