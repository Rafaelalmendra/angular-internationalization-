import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { lastValueFrom } from 'rxjs';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'angular-internationalization';

  currentLanguage: string = 'en';
  constructor(
    private translate: TranslateService,
    private apiService: ApiService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.setLanguage();
  }

  async setLanguage(): Promise<void> {
    const ipInfo$ = this.apiService.getIPInfo();
    const ipInfo = await lastValueFrom(ipInfo$);

    this.translate.setDefaultLang('en');
    if (ipInfo?.country_code?.toUpperCase() == 'BR') {
      this.translate.setDefaultLang('pt');
      this.currentLanguage = 'pt';
    }
  }

  changeLanguage(): void {
    if (this.currentLanguage == 'en') {
      this.translate.use('pt');
      this.currentLanguage = 'pt';
    } else {
      this.translate.use('en');
      this.currentLanguage = 'en';
    }
  }
}
