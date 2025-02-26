import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../shared/service/api.service';
import {Router} from '@angular/router';
import {LoadingComponent} from '../../shared/loader';
import {DatePipe, TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-blog-details',
  imports: [
    LoadingComponent,
    TitleCasePipe,
    DatePipe
  ],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css'
})
export class BlogDetailsComponent {
  blogId: string | null = null;
  blogDetails: any;

  constructor(
    private activeRouter: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {
    this.getBlogDetails()
  }

  getBlogDetails(){
    this.blogId = this.activeRouter.snapshot.paramMap.get('id');
    if (this.blogId == null) {
      this.router.navigate([''])
    } else {
      this.apiService.getBlogsDetails(this.blogId).subscribe(res=>{
        let status = res.body;
        if (status.statusCode == 201 || status.success) {
          this.blogDetails = status.data
        }
      })
    }
  }
}
