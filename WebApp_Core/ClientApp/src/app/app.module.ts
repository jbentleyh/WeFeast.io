import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';

import { AppRoutes } from './app.routes';

import { RecipeListComponent } from './recipe/recipe-list/recipe-list.component';
import RecipeEditComponent from './recipe/recipe-edit/recipe-edit.component';
import RecipeDetailComponent from './recipe/recipe-detail/recipe-detail.component';
import RecipeCreateComponent from './recipe/recipe-create/recipe-create.component';
import { FooterComponent } from './footer/footer.component';
import RecipeService from './shared/api/RecipeService';

import ngInfiniteScroll from 'ng-infinite-scroll';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    FooterComponent,

    RecipeListComponent,
    RecipeEditComponent,
    RecipeDetailComponent,
    RecipeCreateComponent,

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ApiAuthorizationModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true },

    RecipeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
