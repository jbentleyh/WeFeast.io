import { Component } from '@angular/core';
import { Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizeService } from '../../api-authorization/authorize.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  public isAuthenticated: Observable<boolean>;

  constructor(private router: Router, private authorizeService: AuthorizeService) {
  }

  ngOnInit() {
    this.isAuthenticated = this.authorizeService.isAuthenticated();
  }

  goToRegister() {
    this.authorizeService.isAuthenticated().subscribe(data => {
      if (data) {
        this.router.navigate(['/recipe-list']);
        location.reload();
      } else {
        this.router.navigate(['/authentication/register']);
      }
    });

    //if (this.isAuthenticated) {
    //  this.router.navigate(['/recipe-list']);
    //} else {
    //  this.router.navigate(['/authentication/register']);
    //}

  }

}
