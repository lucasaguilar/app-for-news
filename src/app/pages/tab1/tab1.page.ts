import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Article, News, Parameters } from 'src/app/models';
import { NewsService } from 'src/app/services/news.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit, OnDestroy {
  public articles: Article[] = [];
  private categoryDefault = 'business';
  private suscription: Subscription;

  constructor(private newsService: NewsService) {}

  ngOnDestroy(): void {
    if (this.suscription) {
      this.suscription.unsubscribe();
    }
  }

  ngOnInit(): void {


    console.log('ngOnInit for tab1');

    const params: Parameters = {
      loadMore: false,
      category: this.categoryDefault,
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

  getNews(params: Parameters = null, event: any = null) {
    this.suscription = this.newsService
      .getTopsHeadLinesByCategory(
        environment.baseUrl,
        environment.urlTopHeadLines,
        environment.apiKeyForNotice,
        params
      )
      .subscribe((articles: Article[]) => {
        console.log(articles);
        this.articles = articles;
        if (event) {
          setTimeout(() => {
            event.target.complete();
          }, 1000);
        }
      });
  }

  loadData(event: any) {
    console.log(event);

    const params: Parameters = {
      category: this.categoryDefault,
      loadMore: true,
    };

    this.getNews(params, event);
  }
}
