using System;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

using WebApp_Core.Data;

namespace UnitTests_RecipeController
{
    public class TestSetup
    {
        public TestSetup()
        {
        }

        public static DbContextOptions<RecipesContext> TestRecipesContextOptions()
        {
            // Create a new service provider to create a new in-memory database.
            var serviceProvider = new ServiceCollection()
                .AddEntityFrameworkInMemoryDatabase()
                .BuildServiceProvider();

            // Create a new options instance using an in-memory database and 
            // IServiceProvider that the context should resolve all of its 
            // services from.
            var builder = new DbContextOptionsBuilder<RecipesContext>()
                .UseInMemoryDatabase("RecipesInMemoryDb")
                .UseInternalServiceProvider(serviceProvider);

            return builder.Options;
        }
    }
}
