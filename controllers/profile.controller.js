const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Recipe = require('../models/Recipe.model');
const User = require('../models/User.model');

const getProfile = (req, res, next) => {
  const user = req.session.currentUser
  if (user && user.username === "superuser") {
    user.isSuperuser = true
  }
  Recipe.find({"author": user.username})
  .then(recipes => {
    res.render('users/profile', {user: user, myRecipes: recipes});
  })
  .catch(err => console.log(`Error when getting profile: ${err}`))
}

const getMyRecipes = (req, res, next) => {
  const user = req.session.currentUser
  if (user && user.username === "superuser") {
    user.isSuperuser = true
  }
  Recipe.find({"author": user.username})
  .then(recipes => {
    res.render('users/my-recipes', {user: user, myRecipes: recipes});
  })
  .catch(err => console.log(`Error when getting user's recipes: ${err}`))
}

const getMyFavoriteRecipes = (req, res, next) => {
  const user = req.session.currentUser
  if (user && user.username === "superuser") {
    user.isSuperuser = true
  }
  User.findOne({username: user.username})
  .populate('favorites')
  .then(thisUser => {
    res.render('users/my-favorite-recipes', {user: user, favoriteRecipes: thisUser.favorites});
  })
  .catch(err => console.log(`Error when getting favorite recipes: ${err}`))
}

module.exports = {
  getProfile,
  getMyRecipes,
  getMyFavoriteRecipes
};