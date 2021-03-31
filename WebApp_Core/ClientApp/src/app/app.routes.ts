import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';

import { RecipeListComponent } from './recipe/recipe-list/recipe-list.component';
import RecipeEditComponent from './recipe/recipe-edit/recipe-edit.component';
import RecipeDetailComponent from './recipe/recipe-detail/recipe-detail.component';
import RecipeCreateComponent from './recipe/recipe-create/recipe-create.component';


export const AppRoutes: Routes = [

  // Home Paths
  { path: '', component: HomeComponent, pathMatch: 'full' },


  // Recipe Paths
  { path: 'recipe-list', component: RecipeListComponent },
  { path: 'recipe-detail/:id', component: RecipeDetailComponent },
  { path: 'recipe-edit/:id', component: RecipeEditComponent },
  { path: 'recipe-create', component: RecipeCreateComponent },
];