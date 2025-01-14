import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ArticleService {
  api_url = environment.API_URL;

  constructor(private http: HttpClient) {}

  getArticles(limit: number) {
    return this.http.get(`${this.api_url}/posts/${limit}`);
  }
}
