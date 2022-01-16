import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  Article,
  ArticlesByCategoryAndPage,
  News,
  Parameters,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private articlesByCategoryAndPage: ArticlesByCategoryAndPage = {};

  constructor(private http: HttpClient) {}

  getTopHeadLines(
    baseUrl: string,
    url: string,
    apiKey: string,
    params: Parameters
  ): Observable<Article[]> {
    return this.getTopsHeadLinesByCategory(baseUrl, url, apiKey, params);
  }

  getTopsHeadLinesByCategory(
    baseUrl: string,
    url: string,
    apiKey: string,
    params: Parameters
  ): Observable<Article[]> {
    if (params.loadMore) {
      // tengo que ir a buscar mas articulos si o si y anexarlos a los que ya tengo
      this.checkFlagSessionByCategory(params);
      return this.getArticlesRemote(baseUrl, url, apiKey, params);
    } else {
      // trae articulos de cache si existen o los busca de manera remota
      if (this.checkFlagSessionByCategory(params)) {
        return of(this.getArticlesFromStorageByCategory(params));
      } else {
        return this.getArticlesRemote(baseUrl, url, apiKey, params);
      }
    }
  }

  private getArticlesRemote(
    baseUrl: string,
    url: string,
    apiKey: string,
    params: Parameters
  ): Observable<Article[]> {
    return this.http
      .get<News>(baseUrl + url + 'country=us', {
        params: {
          apiKey,
          category: params.category,
          loadMore: params.loadMore,
          page: params.page,
        },
      })
      .pipe(
        map((resp) => {
          if (resp.articles.length === 0) {
            return [];
          }

          // para setear la pagina
          this.setFlagSessionByCategory(params);

          localStorage.setItem(
            'remotosNewsByCategory' + params.category,
            JSON.stringify([
              ...this.getArticlesFromStorageByCategory(params),
              ...resp.articles,
            ])
          );

          return [
            ...this.getArticlesFromStorageByCategory(params),
            ...resp.articles,
          ];
        }),
        tap((articles: Article[]) => {
          console.log(articles);
        })
      );
  }

  private checkFlagSessionByCategory(params: Parameters) {
    const flagRemotosNewsByCategory = sessionStorage.getItem(
      'flagRemotosNewsByCategory' + params.category
    );

    if (
      flagRemotosNewsByCategory !== null &&
      localStorage.getItem('remotosNewsByCategory' + params.category)
    ) {
      // category exists
      return true;
    } else {
      // add new category
      params.page = 0;
      this.setFlagSessionByCategory(params);
      params.page++;

      return false;
    }
  }

  private setFlagSessionByCategory(params: Parameters) {
    sessionStorage.setItem(
      'flagRemotosNewsByCategory' + params.category,
      params.page.toString()
    );
  }

  private getFlagSessionByCategory(params: Parameters) {
    return JSON.parse(
      sessionStorage.getItem('flagRemotosNewsByCategory' + params.category)
    );
  }

  private getFlagSessionByCategoryPage(params: Parameters) {
    return JSON.parse(
      sessionStorage.getItem('flagRemotosNewsByCategory' + params.category)
    );
  }

  private getArticlesFromStorageByCategory(params: Parameters) {
    const articles = JSON.parse(
      localStorage.getItem('remotosNewsByCategory' + params.category)
    );

    if (articles === null) {
      return [];
    } else {
      return articles;
    }
  }
}
