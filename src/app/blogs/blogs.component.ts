import {Component, ElementRef, ViewChild} from '@angular/core';
import {ApiService} from '../../shared/service/api.service';
import {DatePipe, NgForOf, TitleCasePipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-blogs',
  imports: [
    NgForOf,
    RouterLink,
    TitleCasePipe,
    DatePipe,
    ReactiveFormsModule
  ],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css'
})
export class BlogsComponent {
  @ViewChild('scrollTrigger', { static: false }) scrollTrigger!: ElementRef;

  limit: number = 10;
  page: number = 1;
  totalCount: any;
  itemsPerPage: any;
  blogsList: any[] = [];
  loading: boolean = false;
  totalPages: number = 1;
  constructor(
    private readonly api: ApiService,
    private readonly tostr: ToastrService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
  ) {
    this.getList()

  }


  addBlogFrom: FormGroup = new FormGroup({
    blogTitle: new FormControl(''),
    blogDescription: new FormControl(''),
  });

  ngOnInit(): void{
  this.addBlogFrom = this.formBuilder.group(
    {
      blogTitle: ['', [Validators.required, Validators.email]],
      blogDescription: ['',[Validators.required]],
    },
  );
  }

  getList() {
    if (this.loading || this.page > this.totalPages) return;
    this.loading = true;
    this.api.getBlogsList(this.limit, this.page).subscribe(res => {
      let status = res.body;
      if (status.statusCode == 201 || status.success) {
        this.blogsList = [...this.blogsList, ...status.data.items]; // Append new blogs
        this.totalPages = status.data.meta.totalPages;
        this.totalCount = status.data.meta.itemCount;
        this.itemsPerPage = status.data.meta.itemsPerPage
        this.page++;
      } else {
        console.warn("No more blogs available!");
      }
      this.loading = false;
    });
  }


  get initForm(): { [key: string]: AbstractControl } {
    return this.addBlogFrom.controls;
  }


  deleteBlog(id: string) {
    this.api.deleteBlog(id).subscribe(res=> {
      let status = res.body;
      if (status.statusCode == 201 || status.success) {
        this.tostr.success(status.message, status.statusCode)
        this.getList()
      }
    })
  }

  openModalFunction(content:any){
    this.modalService.open(content);
  }

//function to close modal
  closeModalFunction(){
    this.modalService.dismissAll();
  }


  createBlog() {

  }
}
