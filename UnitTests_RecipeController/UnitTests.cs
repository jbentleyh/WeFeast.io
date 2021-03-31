using System;
using System.Threading.Tasks;
using System.Linq;

using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.AspNetCore.Mvc;
//using System.Web.Http.Results;


using WebApp_Core.Data;
using WebApp_Core.Controllers;
using WebApp_Core.Models;

namespace UnitTests_RecipeController
{
    [TestClass]
    public class UnitTests
    {
        private RecipesContext _recipes_context;
        private RecipeController _recipeController;

        [TestInitialize]
        public void SetUp()
        {
            _recipes_context = new RecipesContext(TestSetup.TestRecipesContextOptions());
            _recipeController = new RecipeController(_recipes_context);
        }

        // GET: api/recipe/getrecipes
        [TestMethod]
        public async Task TestGetRecipes()
        {
            // Arrange
            Recipe recipe1 = new Recipe
            {
                Author = "user1",
                Title = "newtitle",
                Type = "type1",
                body = "body1",
                Ingredients = "Ing1"
            };

            Recipe recipe2 = new Recipe
            {
                Author = "user2",
                Title = "oldtitle",
                Type = "type2",
                body = "body2",
                Ingredients = "Ing2"
            };
            _recipes_context.Add(recipe1);
            _recipes_context.Add(recipe2);
            _recipes_context.SaveChanges();



            // Act
            var result = await _recipeController.GetRecipes("old");
            var Ok_result = result as OkObjectResult;


            // Assert
            Assert.IsNotNull(Ok_result);
            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
        }


        // GET: api/recipe/getrecipe/[id]
        [TestMethod]
        public async Task TestGetRecipeById()
        {
            // Arrange
            Recipe recipe1 = new Recipe
            {
                Author = "user1",
                Title = "newtitle",
                Type = "type1",
                body = "body1",
                Ingredients = "Ing1"
            };
            _recipes_context.Add(recipe1);
            _recipes_context.SaveChanges();


            // Act
            var result = await _recipeController.GetRecipe(1);
            var Ok_result = result as OkObjectResult;
            var Ok_result_value = Ok_result.Value as Recipe;


            // Assert
            Assert.AreEqual("newtitle", Ok_result_value.Title);
            Assert.IsNotNull(Ok_result);
            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
        }


        // POST: api/recipe/postrecipe
        [TestMethod]
        public async Task TestPostRecipes()
        {
            // Arrange
            Recipe recipe = new Recipe
            {
                Author = "author",
                Title = "title",
                Type = "type",
                body = "body",
                Time = 5,
                UpvoteCount = 0,
                Ingredients = "ingredients",
                Description = "desc",
                AdditionalInfo = "addinfo"
            };

            // Act
            var result = await _recipeController.PostRecipe(recipe);
            var Ok_result_post_recipe = result as OkObjectResult;
            var result_post_recipe_value = Ok_result_post_recipe.Value as Recipe;

            // Assert
            Assert.AreEqual("title", result_post_recipe_value.Title);
            Assert.IsNotNull(Ok_result_post_recipe);
            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
        }


        // PUT: api/recipe/updaterecipe/[id]
        [TestMethod]
        public async Task TestUpdateRecipeById()
        {
            // Arrange
            Recipe recipe = new Recipe
            {
                Author = "author",
                Title = "title",
                Type = "type",
                body = "body",
                Time = 5,
                UpvoteCount = 0,
                Ingredients = "ingredients",
                Description = "desc",
                AdditionalInfo = "addinfo"
            };
            await _recipes_context.SaveChangesAsync();

            // Act
            recipe.body = "newbody";
            var result = await _recipeController.UpdateRecipe(recipe.Id, recipe);
            var result_value = await _recipes_context.Recipe.FindAsync(recipe.Id);

            // Assert
            Assert.AreEqual("newbody", result_value.body);
            Assert.IsNotNull(result);
        }


        // DELETE: api/recipe/deleterecipe/[id]
        [TestMethod]
        public async Task TestDeleteRecipeById()
        {
            // Arrange
            Recipe recipe = new Recipe
            {
                Author = "author",
                Title = "title",
                Type = "type",
                body = "body",
                Time = 5,
                UpvoteCount = 0,
                Ingredients = "ingredients",
                Description = "desc",
                AdditionalInfo = "addinfo"
            };
            await _recipes_context.AddAsync(recipe);
            await _recipes_context.SaveChangesAsync();

            // Act
            var get_recipe = await _recipes_context.Recipe.FindAsync(recipe.Id);
            var result = await _recipeController.DeleteRecipe(recipe.Id);
            var Ok_result = result as OkObjectResult;
            var Ok_result_value = Ok_result.Value as Recipe;
            var result_value = await _recipes_context.Recipe.FindAsync(Ok_result_value.Id);

            // Assert
            Assert.IsInstanceOfType(Ok_result, typeof(OkObjectResult));
            Assert.IsNotNull(get_recipe);
            Assert.IsNull(result_value);
        }
    }
}
