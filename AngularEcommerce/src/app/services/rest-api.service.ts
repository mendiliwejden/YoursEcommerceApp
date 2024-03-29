import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class RestApiService {
  constructor(private http: HttpClient) {}

  getHeaders() {
    const tokenStr = localStorage.getItem("token");
    let token = "Bearer " + tokenStr;
    return token ? new HttpHeaders().set("authorization", token) : null;
  }

  get(link: string) {
    return this.http.get(link, { headers: this.getHeaders() }).toPromise();
  }

  post(link: string, body: any) {
    return this.http
      .post(link, body, { headers: this.getHeaders() })
      .toPromise();
  }

  put(link: string, body: any) {
    return this.http
      .put(link, body, { headers: this.getHeaders() })
      .toPromise();
  }
  delete(link: string) {
    return this.http.delete(link, { headers: this.getHeaders() }).toPromise();
  }
}
