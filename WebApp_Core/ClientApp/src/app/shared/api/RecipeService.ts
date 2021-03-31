import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import Recipe from '../model/Recipe';
import { getBaseUrl } from '../../../main';
import { error } from 'protractor';



@Injectable()
export default class RecipeService {
  public API = 'https://localhost:5001/api';
  public RECIPES_API = `${this.API}/recipe`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.RECIPES_API}/${'getrecipes'}`);
  }

  get(id: string) {
    return this.http.get(`${this.RECIPES_API}/${'getrecipe'}/${id}`);
  }

  save(recipe: Recipe): Observable<any> {
    let result: Observable<Object>;
    if (recipe.id) {
      result = this.http.put(`${this.RECIPES_API}/${'updaterecipe'}/${recipe.id}`, recipe);
    } else {
      result = this.http.post(`${this.RECIPES_API}/${'postrecipe'}`, recipe);
    }
    return result;
  }

  remove(id: number) {
    return this.http.delete(`${this.RECIPES_API}/${'deleterecipe'}/${id.toString()}`);
  }

  search(query: any): Observable<Recipe[]> {
    const params = new HttpParams().set('searchstring', query.search);
    return this.http.get<Recipe[]>(`${this.RECIPES_API}/getrecipes`, { params });
  }

}
