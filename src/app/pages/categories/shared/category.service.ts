import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from "rxjs/operators"
import { Category } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiPath: string = "api/categories"

  constructor(private Http: HttpClient) { }

  getAll(): Observable<Category[]> {
    return this.Http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategories)
    )
  }

  getById(id: number): Observable<Category> {
    const url = `${this.apiPath}/${id}`;

    return this.Http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataCategory)
    )
  }

  create(category: Category): Observable<Category>{
    return this.Http.post(this.apiPath, category).pipe(
      catchError(this.handleError),
      map(this.jsonDataCategory)
    )
  }

  update(category: Category): Observable<Category>{
    const url = `${this.apiPath}/${category.id}`;
    return this.Http.put(url, category).pipe(
      catchError(this.handleError),
      map(() => category)
    )
  }

  delete(id: number): Observable<any>{
    const url = `${this.apiPath}/${id}`;
    return this.Http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    )
  }
  // PRIVATE METHODS

  private jsonDataToCategories(jsonData: any[]): Category[] {
    const categories: Category[] = [];
    jsonData.forEach(element => categories.push(element as Category))
    return categories
  }

  private handleError(error: any): Observable<any> {
    console.log("Requesition Error =>", error);
    return throwError(error)

  }

  private jsonDataCategory(jsonData: any) {
    return jsonData as Category;
  }
}
