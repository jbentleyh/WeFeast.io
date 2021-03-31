using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApp_Core.Migrations.Recipes
{
    public partial class RecipeAddInfo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AdditionalInfo",
                table: "Recipe",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AdditionalInfo",
                table: "Recipe");
        }
    }
}
