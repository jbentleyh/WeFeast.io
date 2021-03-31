import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import Recipe from '../../shared/model/Recipe';
import RecipeService from '../../shared/api/RecipeService';
import { AuthorizeService } from '../../../api-authorization/authorize.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
})
export class RecipeListComponent implements OnInit {
  public recipes: Recipe[];
  public isAuthenticated: Observable<boolean>;

  public limit: number;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private recipeService: RecipeService, private route: ActivatedRoute, private router: Router, private authorizeService: AuthorizeService) {
  }

  ngOnInit() {
    this.isAuthenticated = this.authorizeService.isAuthenticated();
    this.recipeService.getAll().subscribe(data => {
      this.recipes = data;
      this.recipes = this.shuffleRecipes(this.recipes);
    });
    this.limit = 4;
  }

  shuffleRecipes(recipes: Recipe[]) {
    for (var i = recipes.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = recipes[i];
      recipes[i] = recipes[j];
      recipes[j] = temp;
    }
    return recipes;
  }


  goToRecipeDetail(id: number) {
    this.router.navigate(['/recipe-detail', id]);
  }

  goToCreateRecipe() {
    this.router.navigate(['/recipe-create']);
  }

  searchRecipes(form: any) {
    this.recipeService.search(form).subscribe(result => {
      this.recipes = result;
    });
  }

  hasIngredients(recipe: Recipe): boolean {
    if (recipe.Ingredients === undefined || recipe.Ingredients === null) {
      return false;
    }
    return true;
  }

  hasDesc(item: string): boolean {
    if (item === undefined || item === null || item === "") {
      return false;
    }
    return true;

  }

  onScroll = $(window).on('scroll', () => {
    var threshold = 100;
    if (window.pageYOffset > 0 && window.pageYOffset + $(window).outerHeight(false) >= $(document).outerHeight(false) - threshold) {
      this.loadMore();
    }
  }).scroll();

  getLimit(): number {
    return this.limit;
  }

  public loadMore() {
    this.limit += 2;
  }

}
