import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private uuid: string | null = null;
  private accessToken: string | null = null;

  constructor(
    private apiService: ApiService
  ) {}

  registerDevice(token: string) {
    const DeviceData = {  
      uuid: localStorage.getItem('userUuid'),
      registration_id: token
    };
    this.apiService.postData(DeviceData, 'register_device').subscribe (async ( response: any ) => {
      console.log('Device response:-', response);
    }, (err: any) => {
      console.log('Device Error:-', err);
    });
  }
}
