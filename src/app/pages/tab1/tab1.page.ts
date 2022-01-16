import { Component, OnInit } from '@angular/core';
import { Article, News, Parameters } from 'src/app/models';
import { NewsService } from 'src/app/services/news.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  public articles: Article[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {

    const params: Parameters = {
      loadMore: false,
      category: 'business'
    };

    this.newsService
      .getTopHeadLines(
        environment.baseUrl,
        environment.urlTopHeadLines,
        environment.apiKeyForNotice,
        params
      )
      .subscribe((articles) => {
        // console.log(articles);
        // overwriting
        // this.articles = articles;
        // or with destructuring
        //this.articles = [ ...this.articles, ...articles ];
        // or pushing
        this.articles = articles;
      });
  }
}
