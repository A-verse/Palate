const mongoose = require('mongoose');

const mealPlanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
    required: true
  },
  day: {
    type: String,
    enum: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    required: true
  },
  slot: {
    type: String,
    enum: ['Breakfast', 'Lunch', 'Dinner'],
    required: true
  }
}, {
  timestamps: true
});

// Compound index to ensure unique meal plans per user per day/slot
mealPlanSchema.index({ user: 1, day: 1, slot: 1 }, { unique: true });

module.exports = mongoose.model('MealPlan', mealPlanSchema);