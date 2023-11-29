import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private transalateService: TranslateService) {
    this.transalateService.setDefaultLang('en');
    this.transalateService.use(localStorage.getItem('lang') || 'en');
  }
}
