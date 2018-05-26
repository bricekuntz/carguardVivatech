import {Component} from "@angular/core";
import {LoadingController, NavController, NavParams, ToastController} from "ionic-angular";
import {TripService} from "../../services/trip-service";

import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HomePage} from "../home/home";

@Component({
  selector: 'page-trip-detail',
  templateUrl: 'trip-detail.html'
})
export class TripDetailPage {

  public services: any;

  constructor(public httpClient: HttpClient, public nav: NavController, public tripService: TripService, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
    // set sample data
    this.getData();
  }

  getData() {
    this.httpClient.get('http://localhost:3000/services/getAll').subscribe(res => {
      this.services = res;
      console.log();
    });
  }


  send(service) {
    let headers = {headers: new HttpHeaders({'Content-Type': 'application/json'})}

    this.httpClient
      .post('http://localhost:3000/services/add', JSON.stringify({
        "price": service.price,
        "time": service.time,
        "is_booked": true,
        "is_accepted": true,
        "_id": "",
        "name": service.name,
        "description": service.description,
        "category": service.category,
        "__v": 0
      }), headers).subscribe(res => {
      res
      console.log(res, "ceci est le resultat");
    });

// send booking info
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
// show message
    let toast = this.toastCtrl.create({
      showCloseButton: true,
      cssClass: 'profile-bg',
      message: 'Service booked with success!',
      duration: 3000,
      position: 'bottom'
    });

    loader.present();

    setTimeout(() => {
      loader.dismiss();
      toast.present();
      // back to home page
      this.nav.setRoot(HomePage);
    }, 3000)
  }
}
