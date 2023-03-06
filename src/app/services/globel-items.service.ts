import { Injectable } from '@angular/core';
import { LoadingController, ActionSheetController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GlobelItemsService {

  loading: any;
  isLoading = false;

  constructor(public loadingCtrl: LoadingController,
              public actionSheetCtrl: ActionSheetController,
              public toastController: ToastController) { }

  async showloading() {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      spinner: 'bubbles',
    }).then(a => {
      a.present().then(() => {
        console.log('loader presenting');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('loader Presented'));
        }
      });
    });
  }

  async dismissLoading() {
    // setTimeout(async () => {
      this.isLoading = false;
      return await this.loadingCtrl.dismiss('result').then(() => console.log('Loader dismissed'));
    // }, 300)
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    await toast.present();
  }
}

