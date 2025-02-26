import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Router, RouterLink, Routes} from '@angular/router';
import {ApiService} from '../../shared/service/api.service';
import {HttpServices} from '../../shared/service/http';
import {HttpClient} from '@angular/common/http';
import {Constant} from '../../shared/constant';
import {DatePipe, NgForOf, NgIf, TitleCasePipe} from '@angular/common';
import {LoadingComponent} from '../../shared/loader';
import {InfiniteScrollDirective} from 'ngx-infinite-scroll';

@Component({
  selector: 'app-landing-page',
  imports: [
    RouterLink,
    NgForOf,
    DatePipe,
    TitleCasePipe,
    NgIf,
    LoadingComponent,
    InfiniteScrollDirective
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent  {
  @ViewChild('scrollTrigger', { static: false }) scrollTrigger!: ElementRef;

  limit: number = 10;
  page: number = 1;
  blogs: any[] = [];
  loading: boolean = false;
  totalPages: number = 1;
  isLoggedIn : boolean = false

  constructor(
    private  readonly  api:ApiService,
    private readonly router: Router
  ) {
    this.loadBlogs();

    if (localStorage.getItem(Constant.SET_TOKEN)) {
      this.isLoggedIn = true
    } else {
      this.isLoggedIn = false
    }
  }

  loadBlogs() {
    if (this.loading || this.page > this.totalPages) return;
    this.loading = true;
    this.api.getBlogs(this.limit, this.page).subscribe(res => {
      let status = res.body;
      if (status.statusCode == 201 || status.success) {
        // console.log(`Page ${this.page} Loaded: ${status.data.items.length} blogs`);
        this.blogs = [...this.blogs, ...status.data.items]; // Append new blogs
        this.totalPages = status.data.meta.totalPages; // Update total pages
        this.page++; // Increase page for next load
      } else {
        console.warn("No more blogs available!");
      }
      this.loading = false;
    });
  }

  logout(){
    localStorage.clear()
  }

}
