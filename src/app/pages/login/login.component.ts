import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataserviceService } from '../../core/dataservice.service';
import { Router } from '@angular/router';
import { emailRegexValidator, nameLengthValidator, passwordComplexityValidator } from '../../core/custom-validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  loginformshow:boolean=true;
  registerformshow:boolean=false;
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder,private dataService: DataserviceService,private router:Router) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required,nameLengthValidator],
      username: ['', Validators.required],
      password: ['', [Validators.required, passwordComplexityValidator]],
    });
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required,passwordComplexityValidator]]
    });
  }


  ngOnInit(): void {}

  onLoginSubmit(): void {
    
    if (this.loginForm.valid) {
      this.dataService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log(response); 
          localStorage.setItem('token', response.token)
          localStorage.setItem('id', response.message.id);
          this.router.navigate(["adminpanel"])
          this.loginformshow=false;
        },
        error: (error) => {
          console.log(error);   
        },
      });
    }else{
      this.loginForm.markAllAsTouched();
    }
  }

  onRegisterSubmit(): void {
    this.registrationForm.value.role='user';
    if (this.registrationForm.valid) {
      this.dataService.registration(this.registrationForm.value).subscribe({
        next: (response) => {
          console.log(response);   
        },
        error: (error) => {
          console.log(error);   
        },
      });
    }else{
      this.registrationForm.markAllAsTouched();
    }
  }

  showloginform():void{
    this.loginformshow=true;
    this.registerformshow=false;
  }
  showregisterform():void{
    this.registerformshow=true;
    this.loginformshow=false;
  }
}
