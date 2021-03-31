using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace WebApp_Core.Models
{
    public class Recipe
    {
        public int Id { get; set; }
        public string Author { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Type { get; set; }

        [Required]
        public string body { get; set; }

        public int UpvoteCount { get; set; }

        public int CommentCount { get; set; }

        public int Time { get; set; }

        [Required]
        public string Ingredients { get; set; }

        public string Description { get; set; }

        public string AdditionalInfo { get; set; }
    }
}