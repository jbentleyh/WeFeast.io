using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApp_Core.Migrations.Recipes
{
    public partial class RecipeAddTime : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Time",
                table: "Recipe",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Time",
                table: "Recipe");
        }
    }
}
