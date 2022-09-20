import * as model from './model.js'
import recipeView from './views/recipeView.js'

import 'core-js/stable' // Polyfilling
import 'regenerator-runtime/runtime' // Polyfilling Async
import recipeView from './views/recipeView.js'

const recipeContainer = document.querySelector('.recipe')

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

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
    alert(err)
  }
}

const init = function () {
  recipeView.addHandlerRender(controlRecipes)
}
init()
