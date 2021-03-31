import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizeService } from '../../../api-authorization/authorize.service';
import { map, tap } from 'rxjs/operators';

import RecipeService from '../../shared/api/RecipeService';
import Recipe from '../../shared/model/Recipe';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
})
export default class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe: Recipe;
  sub: Subscription;

  public isAuthenticated: Observable<boolean>;
  public userName: Observable<string>;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private authorizeService: AuthorizeService) {
  }

  ngOnInit() {
    this.isAuthenticated = this.authorizeService.isAuthenticated();
    this.userName = this.authorizeService.getUser().pipe(map(u => u && u.name));

    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.recipeService.get(id).subscribe((recipe: any) => {
          if (recipe) {
            this.recipe = recipe;
          } else {
            console.log(`Recipe with id '${id}' not found, returning to list`);
            this.goToList();
          }
        });
      }
    });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  goToRecipeEdit(id: number) {
    this.router.navigate(['/recipe-edit', id]);
  }

  goToList() {
    this.router.navigate(['/recipe-list']);
  }

  save(form: any) {
    this.recipeService.save(form).subscribe(result => {
      this.goToList();
    }, error => console.error(error));
  }

  remove(id: number) {
    this.recipeService.remove(id).subscribe(result => {
      this.goToList();
    }, error => console.error(error));
  }

}