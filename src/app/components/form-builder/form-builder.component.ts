import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../services/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit {

  constructor(private router: Router, private token: TokenStorageService) { }

  ngOnInit(): void {
    if(!this.token.getToken()){
      this.router.navigate(['login'])
    }
  }

}
