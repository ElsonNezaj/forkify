import * as model from './model.js'
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js'
import resultsView from './views/resultsView.js'
import paginationView from './views/paginationView.js'

import 'core-js/stable' // Polyfilling
import 'regenerator-runtime/runtime' // Polyfilling Async
import recipeView from './views/recipeView.js'
import { async } from 'regenerator-runtime'

// if (module.hot) {
//   module.hot.accept()
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1)

    if (!id) return
    recipeView.renderSpinner()

    // LOADING THE RECIPE
    await model.loadRecipe(id)

    // RENDERING THE RECIPE
    recipeView.render(model.state.recipe)
  } catch (err) {
    recipeView.renderError()
  }
}

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner()

    // 1. Get Search Query
    const query = searchView.getQuery()
    if (!query) return

    // 2. Load Search Query
    await model.loadSearchResults(query)

    // 3. Render Results

    // PAGINATION IMPLEMENTATION
    resultsView.render(model.getSearchResultsPage())

    // 4. Render the initial pagination buttons
    paginationView.render(model.state.search)
  } catch (err) {
    console.log(err)
  }
}

const controlPagination = function (goTo) {
  // 1. Render New Results

  // PAGINATION IMPLEMENTATION
  resultsView.render(model.getSearchResultsPage(goTo))

  // 2. Render new pagination buttons
  paginationView.render(model.state.search)

  console.log(goTo)
}

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings)

  // Update the recipe view
  recipeView.render(model.state.recipe)
}

const init = function () {
  recipeView.addHandlerRender(controlRecipes)
  recipeView.addHandlerUpdateServings(controlServings)
  searchView.addHandlerSearch(controlSearchResults)
  paginationView.addHandlerClick(controlPagination)
}
init()
