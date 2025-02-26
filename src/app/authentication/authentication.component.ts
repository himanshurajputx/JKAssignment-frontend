import { Component } from '@angular/core';
import {ApiService} from '../../shared/service/api.service';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { GoogleLoginProvider } from "@abacritt/angularx-social-login";
import {AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import Validation from './validation';
import {NgClass, NgIf} from '@angular/common';
import {LoadingComponent} from '../../shared/loader';
import {LowercaseInputDirective} from '../../shared/directive/lowercase-input.directive';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {Constant} from '../../shared/constant';

@Component({
  selector: 'app-authentication',
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgIf,
    LoadingComponent,
    LowercaseInputDirective,
  ],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent {

  singup: boolean= false
  login: boolean= true
  constructor(
   private http: ApiService,
   private authService: SocialAuthService,
   private formBuilder: FormBuilder,
   private tostr: ToastrService,
   private router: Router,

  ) {
      // This is only needed for the In-Memory Web API, not required for a real backend.
      // If you are use localstorage for authentication use encryption.
      // This is only assignment for demo purposes
      // localStorage.clear();

  }
  private accessToken = '';

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => {
      console.log('User Info:', user);
      this.http.googleLogin().subscribe(response => {
        console.log("response===>", response)
              // localStorage.setItem('access_token', response['access_token']);
            });
    }).catch(error => {
      console.error('Google Sign-In Error:', error);
    });
  }


  form: FormGroup = new FormGroup({
    fullname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  submitted = false;
  loginSubmitted= false;


  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        fullname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
          ],
        ],
      },
    );

    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['',[Validators.required]],
      },
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  get l(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    console.log(JSON.stringify(this.form.value, null, 2));
  }
  onLogin(): void {
    this.loginSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    let loginData =JSON.stringify(this.loginForm.value, null, 2)
    // console.log(JSON.stringify(this.loginForm.value, null, 2));

    this.http.userLogin(loginData).subscribe(
      res =>{
        let status = res.body;
        const authToken = res.headers.get('Authorization');
        if (status.statusCode == 201 || status.success) {
          this.tostr.success(status.message, status.statusCode)
          localStorage.setItem(Constant.SET_USER, JSON.stringify(status.data));
          localStorage.setItem(Constant.SET_TOKEN, JSON.stringify(authToken.split(' ')[1]));
          this.router.navigate(['/blogs'])
        }
    })
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

}
