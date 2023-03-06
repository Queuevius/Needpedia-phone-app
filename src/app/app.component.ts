import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
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
    private push: Push,
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
      this.getpushToken();

    });
  }

  getUser() {
    this.apiService.getData('sign_in' +localStorage.getItem('staff_id')).subscribe((res: any) => {
      this.user = res;
      console.log('user in component:-', res)
    })
  }

  getpushToken() {
    const options: PushOptions = {
      android: {
        senderID: '751118514639'
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'true'
      }
    };
    const pushObject: PushObject = this.push.init(options);
    console.log('initPushNotification pushObject:-', pushObject);

    pushObject.on('registration').subscribe((registration: any) => {
      localStorage.setItem('device_token', registration.registrationId);
      // this.storage.set('Device registered', registration);
      console.log('Device registered: ->', registration);
      console.log('Device registered ID: ->', registration.registrationId);
    });

    pushObject.on('notification').subscribe((notification: any) => {
      console.log('Received a notification', notification);
      console.log('Recieved Message: ->' + notification.message);
    });

    pushObject.on('error').subscribe((error) => {
      console.error('Error with Push plugin', error);
    });
  }

  logout() {
    localStorage.clear();
    this.navCntrl.navigateRoot('login');
  }
}
