import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Category } from "../../Models/Category/category";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  link = "http://localhost:8080/api/categorys/";
  constructor(private http: HttpClient) {}

  getCategoryById(productId: number): Observable<Category> {
    return this.http.get<Category>(`${this.link}ByIdWithProduct/${productId}`);
  }

  getListCategory() {
    return this.http.get("http://localhost:8080/api/categorys/all");

    // return this.http.get(this.url + 'categories');
  }

  addCategoryAPI(p) {
    // const headers = { Authorization: '' }
    // console.log(JSON.stringify(p))
    return this.http.post(this.link + "products", p);
  }

  EditCategory(p, id): Observable<any> {
    return this.http.put("http://localhost:8080/api/categorys/update/" + id, p);
  }

  deleteCategoryAPI(Id: number): Observable<void> {
    return this.http.delete<void>(`${this.link}delete/${Id}`);
  }
}
