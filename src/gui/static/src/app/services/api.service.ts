import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApiService {
  constructor(private http: Http) { }

  getConns() {
    return this.http.get('/network/connections')
      .map((res:Response) => res.json())
      .catch(err => this.handleError(err));
  }

  handleError(error: Response) {
    console.error('Error:', error.json() || 'Server error', 'danger');
    return Observable.throw(error.json() || 'Server error');
  }
}