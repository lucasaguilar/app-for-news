import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Article, Parameters } from 'src/app/models';
import { NewsService } from 'src/app/services/news.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit, OnDestroy {
  //@ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  public category: string[] = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology',
  ];

  public selectedCategory: string = this.category[0];
  public articles: Article[] = [];

  private suscription: Subscription;

  constructor(private newsService: NewsService) {}
  ngOnDestroy(): void {
    if (this.suscription) {
      this.suscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getNews({ category: this.selectedCategory });
  }

  segmentChanged(event: any) {
    console.log(event.detail.value);
    this.selectedCategory = event.detail.value;

    const params: Parameters = {
      category: this.selectedCategory,
      loadMore: false,
    };

    this.getNews(params);
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
        // this.articles = [...this.articles, ...articles];
        this.articles = articles;
        if (event) {
          setTimeout(() => {
            event.target.complete();
            //this.infiniteScroll.complete();
          }, 1000);
        }
      });
  }

  loadData(event: any) {
    console.log(event);

    const params: Parameters = {
      category: this.selectedCategory,
      loadMore: true,
    };

    this.getNews(params, event);
  }
}
