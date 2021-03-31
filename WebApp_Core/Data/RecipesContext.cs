using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

using WebApp_Core.Models;

namespace WebApp_Core.Data
{
    public class RecipesContext : IdentityDbContext
    {
        public RecipesContext(DbContextOptions<RecipesContext> options)
            : base(options)
        {
        }

        public DbSet<Recipe> Recipe { get; set; }
    }
}