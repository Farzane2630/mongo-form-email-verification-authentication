import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Article } from "../Types";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ArticleService {
  api_url = environment.API_URL;

  constructor(private http: HttpClient) {}

  getArticles(limit: number) {
    return this.http.get(`${this.api_url}/posts/${limit}`);
  }

  postArticle(post: Article): Observable<any> {
    return this.http.post(`${this.api_url}/posts/new-post`, post, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  }
}
