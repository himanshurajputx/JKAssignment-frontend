import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from '../../../app/dashboard/dashboard.component';
import {BlogsComponent} from '../../../app/blogs/blogs.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path:'blogs',
        component: BlogsComponent
      }

    ]
  },
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    DashboardComponent,
    BlogsComponent
  ],
  providers: []
})
export class DashboardModule { }
