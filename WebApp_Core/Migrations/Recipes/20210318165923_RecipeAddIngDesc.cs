using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApp_Core.Migrations.Recipes
{
    public partial class RecipeAddIngDesc : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Recipe",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Ingredients",
                table: "Recipe",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "Ingredients",
                table: "Recipe");
        }
    }
}
