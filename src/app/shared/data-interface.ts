export interface RegisterResponse {
    success: boolean;
    message: string;
  }
  
  export interface LoginResponse {
    token: string;
    userId: string;
  }
  
  
  export interface MyRequest {
    property1: string;
    property2: number;
  }
  
  
  
  export interface MyResponse {
    property1: string;
    property2: number;
  } 
  
  export class RegisterModel {
    id: number;
    name: string;
    lastName: string;
    email: string;
    role: string;
    privatenumber:string;
  
    constructor(
    id: number=0,
    name: string='',
    lastName: string='',
    email: string='',
    role: string='',
    privatenumber:string=''
    ) {
      this.id = id;
      this.email = email;
      this.privatenumber=privatenumber;
      this.name = name;
      this.lastName = lastName;
      this.role = role;
    }
  }
  
  export interface Question {
    id: number; 
    question: string;
    required: boolean;
  }