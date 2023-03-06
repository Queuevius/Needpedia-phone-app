import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { GlobelItemsService } from 'src/app/services/globel-items.service';
import { Device } from '@ionic-native/device/ngx';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: any;
  password: any;

  constructor(private globelItems: GlobelItemsService,
    private apiService: ApiService,
    private navCntrl: NavController,
    private device: Device,
    private router: Router,
    private toastCtrl: ToastController,
    private http: HttpClient,
    ) { }

  ngOnInit() {
  }

  login() {
    const data: any = {
        email: this.email,
        password: this.password
    };

    this.globelItems.showloading();
    this.apiService.postData(data, 'sign_in').subscribe((res: any) => {
      console.log('login reponse:-', res);
      console.log('header:--', res.headers.get('access-token'))
      localStorage.setItem('params_id', this.password);
      if (res == null) {
        this.globelItems.dismissLoading();
        this.globelItems.showToast(res.data.errors);
      } else {
        this.globelItems.dismissLoading();
        this.globelItems.showToast(res.body.data.first_name+ res.body.data.last_name + ' You are successfully logged in!');
        // this.getUser(res.headers.get('access-token'));

        const authToken = res.headers.get('access-token');
        console.log("token", authToken);
        if (authToken) {
          const accessToken = authToken.split(' ')[1];
          localStorage.setItem('auth_token', accessToken);
        }
        this.router.navigate(['/home']);
      }
    },
     (error: { error: { message: any; }; }) => {
      console.log('Error:-', error);
      this.globelItems.showToast('Invalid login details.');
      this.globelItems.dismissLoading();
    }
    );
    
  }

  getUser(token: any) {
    this.apiService.getData('validate_token?' +token).subscribe((res: any) => {
      console.log('User:-', res);
      this.apiService.publish({
        name: res.name,
        email: res.email
      })
    })
  }

// device will be registered in later stages
  registerDevice(userId: any) {
    const DeviceData = {
      device: {
        token: localStorage.getItem('device_token'),
        platform: this.device.platform,
        model: this.device.model,
        uuid: this.device.uuid,
        user_id: userId
      }
    };
    this.apiService.postData(DeviceData, 'devices').subscribe (async ( response: any ) => {
      console.log('Device response:-', response);
      console.log('Device id:-', response.response.id);
      localStorage.setItem('device_id', response.response.id);
    }, (err: any) => {
      console.log('Device Error:-', err);
    });
  }

}
