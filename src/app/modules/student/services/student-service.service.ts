import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';
import {environment} from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {

  constructor(
      private http:HttpClient,
  ) { }

  getAllStudents()
  {
      const header = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
      return this.http.get(environment.url+'teacher/students/',{ headers : header})
  }
}
