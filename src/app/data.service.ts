import { Injectable } from '@angular/core';
import { Form } from './form';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  form = new Form()

  constructor(private http:HttpClient) { }

  getData() {
    return this.http.get('http://localhost:3000/data')
  }

  saveData(form: Form) {
    return this.http.post('http://localhost:3000/data', form)
  }

  getSingleData(form: Form) {
    // return this.http.get('http://localhost:3000/data/',{params: {id: form.id.toString()}})
    let url = 'http://localhost:3000/data/' + form.id
    return this.http.get(url)
  }

  editData(form: Form){
    //return this.http.put('http://localhost:3000/data/', form, {params: {id: form.id.toString()} })
    let url = 'http://localhost:3000/data/' + form.id
    return this.http.put(url, form)
  }

  deleteData(id: number){
    let url = 'http://localhost:3000/data/' + id
    return this.http.delete(url)
  }



}
