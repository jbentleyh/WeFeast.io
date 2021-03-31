using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Web.Http.Description;
using http = System.Web.Http; // no ambiguity
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;


using WebApp_Core.Models;
using WebApp_Core.Data;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApp_Core.Controllers
{

    [Authorize]
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class RecipeController : ControllerBase
    {

        private readonly RecipesContext _recipes_context;

        public RecipeController(RecipesContext recipes_context)
        {
            _recipes_context = recipes_context;
        }

        // GET: api/recipe/getrecipes
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetRecipes(string searchString)
        {
            List<Recipe> recipes = await _recipes_context.Recipe.ToListAsync();

            if (!string.IsNullOrEmpty(searchString) && !searchString.Equals("undefined"))
            {
                searchString = searchString.ToLower();
                var search_results = from rp in _recipes_context.Recipe
                                     where rp.Title.ToLower().Contains(searchString) || rp.Type.ToLower().Contains(searchString) || rp.body.ToLower().Contains(searchString) || rp.Ingredients.ToLower().Contains(searchString) || rp.Description.ToLower().Contains(searchString)
                                     select rp;

                return Ok(search_results);
            }

            return Ok(recipes);
        }

        // GET: api/recipe/getrecipe/id
        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRecipe(int id)
        {
            Recipe recipe = await _recipes_context.Recipe.FindAsync(id);
            if (recipe == null)
            {
                return NotFound();
            }
            return Ok(recipe);
        }

        // POST: api/recipe/postrecipe
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> PostRecipe(Recipe recipe)
        {
            Recipe new_recipe = new Recipe
            {
                Author = recipe.Author,
                Title = recipe.Title,
                Type = recipe.Type,
                body = recipe.body,
                Time = recipe.Time,
                UpvoteCount = recipe.UpvoteCount,
                Ingredients = recipe.Ingredients,
                Description = recipe.Description,
                AdditionalInfo = recipe.AdditionalInfo
            };

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _recipes_context.Recipe.Add(new_recipe);
            await _recipes_context.SaveChangesAsync();

            return Ok(new_recipe);
        }

        // PUT: api/recipe/updaterecipe/id
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRecipe(int id, Recipe recipe)
        {
            if (!ModelState.IsValid)
            {
                BadRequest(ModelState);
            }

            if (id != recipe.Id)
            {
                return BadRequest();
            }

            _recipes_context.Entry(recipe).State = EntityState.Modified;

            try
            {
                await _recipes_context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (RecipeExists(id))
                {
                    throw;
                }
                return NotFound();
            }

            return StatusCode(Convert.ToInt32(HttpStatusCode.NoContent));
        }

        // DELETE: api/recipe/deleterecipe/id
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecipe(int id)
        {
            Recipe recipe = await _recipes_context.Recipe.FindAsync(id);
            if (recipe == null)
            {
                return NotFound();
            }
            _recipes_context.Remove(recipe);
            await _recipes_context.SaveChangesAsync();

            return Ok(recipe);
        }

        private bool RecipeExists(int id)
        {
            return _recipes_context.Recipe.Count(e => e.Id == id) > 0;
        }

    }
}
