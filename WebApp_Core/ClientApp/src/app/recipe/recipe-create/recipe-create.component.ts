import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import RecipeService from '../../shared/api/RecipeService';
import Recipe from '../../shared/model/Recipe';
import { HttpClient } from '@angular/common/http';
import { AuthorizeService } from '../../../api-authorization/authorize.service';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
})
export default class RecipeCreateComponent implements OnInit {
  recipe: Recipe = new Recipe();
  author: string;

  sub: Subscription;

  userName: Observable<string>;
  isAuthenticated: Observable<boolean>;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private authorizeService: AuthorizeService) {
  }

  ngOnInit() {
    this.isAuthenticated = this.authorizeService.isAuthenticated();
    this.userName = this.authorizeService.getUser().pipe(map(u => u && u.name));
    this.userName.subscribe(item => {
      this.author = item.valueOf();
    });
  }

  //ngOnDestroy() {
  //  this.sub.unsubscribe();
  //}

  goToList() {
    this.router.navigate(['/recipe-list']);
  }

  redirectToLogin() {
    this.router.navigate(['/authentication/login']);
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