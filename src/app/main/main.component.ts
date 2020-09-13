import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Form } from '../form';
import { DataService } from '../data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})

export class MainComponent implements OnInit {
  constructor(private data: DataService) {}

  crud = new FormGroup({
    fname: new FormControl('', Validators.required),
    lname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
  });

  datas: Form[];
  current_form = new Form();

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.data.getData().subscribe((data: Form[]) => {
      this.datas = data;
    });
  }

  onSave() {
    if (this.current_form.id) {
      this.data.editData(this.current_form).subscribe((test: any) => {
        console.log(test);
      });
    } else {
      this.data.saveData(this.current_form).subscribe((test: any) => {
        console.log(test);
      });
    }
    this.getData();
    this.crud.reset();
    this.ngOnInit();
  }

  onEdit(form: Form) {
    this.data.getSingleData(form).subscribe((data: Form) => {
      this.current_form.id = data[0].id;
      this.current_form.fname = data[0].fname;
      this.current_form.lname = data[0].lname;
      this.current_form.email = data[0].email;
      this.current_form.phone = data[0].phone;
    });
  }

  onDelete(id: number) {
    this.data.deleteData(id).subscribe((test: any) => {
      console.log(test);
    });
    this.ngOnInit();
  }

  onReset() {
    this.crud.reset();
    this.current_form = new Form();
  }

}
