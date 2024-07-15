import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: 'home', icon: 'desktop' },
    // { title: 'Timesheets', url: '/folder/Timesheets', icon: 'timer' },
    // { title: 'Patrol', url: '/folder/Patrol', icon: 'walk' },
    // { title: 'History', url: '/folder/History', icon: 'time' }
  ];

  user: any;

  constructor(private navCntrl: NavController,
    private platform: Platform,
    private apiService: ApiService) {
      this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (localStorage.getItem('auth_token')) {
        this.navCntrl.navigateRoot('home');
        // this.getUser();
      } else {
        this.navCntrl.navigateRoot('login');
      }

      this.apiService.currentEvent.subscribe((res: any) => {
        this.user = res;
      })

    });
  }

  getUser() {
    this.apiService.getData('sign_in' +localStorage.getItem('staff_id')).subscribe((res: any) => {
      this.user = res;
      console.log('user in component:-', res)
    })
  }


  logout() {
    localStorage.clear();
    this.navCntrl.navigateRoot('login');
  }
}
