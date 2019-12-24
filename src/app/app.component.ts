import { Component } from '@angular/core';
import { NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NgbTabsetConfig]
})
export class AppComponent {
  title = 'GraphqlDemo';
  constructor(config: NgbTabsetConfig) {
    // customize default values of tabsets used by this component tree
    config.justify = 'center';
    config.type = 'pills';
  }
}
