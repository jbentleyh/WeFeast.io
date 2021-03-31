import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthorizeService } from '../../../api-authorization/authorize.service';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import RecipeService from '../../shared/api/RecipeService';
import Recipe from '../../shared/model/Recipe';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
})
export default class RecipeEditComponent implements OnInit, OnDestroy {
  recipe: Recipe;

  userName: Observable<string>;
  isAuthenticated: Observable<boolean>;

  sub: Subscription;

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

  goToList() {
    this.router.navigate(['/recipe-list']);
  }

  save(form: any) {
    this.recipeService.save(form).subscribe(result => {
      this.router.navigate(['/recipe-detail', form.id]);
    }, error => console.error(error));
  }

  remove(id: number) {
    this.recipeService.remove(id).subscribe(result => {
      this.goToList();
    }, error => console.error(error));
  }
}