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
  getArticle(postId: string) {
    return this.http.get(`${this.api_url}/posts/post/${postId}`);
  }

  postArticle(post: Article): Observable<any> {
    return this.http.post(`${this.api_url}/posts/new-post`, post, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  saveArticle(postId: string | undefined) {
    return this.http.post(`${this.api_url}/posts/save-post/${postId}`, null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  deleteArticle(postId: string | undefined) {
    return this.http.delete(`${this.api_url}/posts/delete-post/${postId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }
}
