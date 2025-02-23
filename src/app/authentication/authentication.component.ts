import { Component } from '@angular/core';
import {HttpService} from '../../shared/service/http.service';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { GoogleLoginProvider } from "@abacritt/angularx-social-login";
import {AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import Validation from './validation';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-authentication',
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgIf
  ],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent {
  singup: boolean= false
  login: boolean= true
  constructor(
   private http: HttpService,
   private authService: SocialAuthService,
   private formBuilder: FormBuilder
  ) {
  }
  private accessToken = '';

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => {
      console.log('User Info:', user);
      this.http.post('http://localhost:3000/auth/google/callback', { token: user.idToken }).subscribe(response => {
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
    console.log(JSON.stringify(this.loginForm.value, null, 2));

    this.http.post('authentication/login', loginData).subscribe(
      res =>{
      console.log("Res=>>>>>>", res)
    },
      err => {
        console.log("Error======>", err)
      })
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

}
