import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;

  constructor(private http: HttpClient) { }

  values: any;

  ngOnInit() {
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  getValues() {
    this.http.get('http://127.0.0.1:5000/api/values').subscribe(response => {
      this.values = response;
    }, error => {
      console.log(error);
    });
  }
}
