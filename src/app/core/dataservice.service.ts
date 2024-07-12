import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';





@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  constructor(private http:HttpClient) { }
  private url="https://localhost:7038/api"



  registration(data: any): Observable<any> { 
    return this.http.post(`${this.url}/CreateAdmin`, data);
  }
  login(data: any): Observable<any> {
    return this.http.post(`${this.url}/LoginAdmin`, data);
  }

  getuser(id:number):Observable<any>{
    return this.http.get(`${this.url}/GetUser/${id}`);
  }
  addQuestions(data: any): Observable<any> {
    return this.http.post(`${this.url}/AddQuestion`, data);
  }
  getAllQuestions():Observable<any>{
    return this.http.get(`${this.url}/GetAllquestions`);
  }
}
