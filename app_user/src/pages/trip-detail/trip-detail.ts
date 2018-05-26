import {Component} from "@angular/core";
import {LoadingController, NavController, NavParams, ToastController} from "ionic-angular";
import {TripService} from "../../services/trip-service";
import {CheckoutTripPage} from "../checkout-trip/checkout-trip";
import {HomePage} from "../home/home";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'page-trip-detail',
  templateUrl: 'trip-detail.html'
})
export class TripDetailPage {
  // trip info
  public trip: any;
  // number of adult
  public adults = 2;
  // number of children
  public children = 0;

  public service: any;
  public newService: any = {};

  constructor(public httpClient: HttpClient, public nav: NavController, public tripService: TripService, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
    // set sample data
    this.trip = tripService.getItem(1);
    this.service = this.navParams.get('service');
    console.log(this.service)
  }

  // minus adult when click minus button
  minusAdult() {
    this.adults--;
  }

  // plus adult when click plus button
  plusAdult() {
    this.adults++;
  }

  // minus children when click minus button
  minusChildren() {
    this.children--;
  }

  // plus children when click plus button
  plusChildren() {
    this.children++;
  }

  // go to checkout page
  checkout() {
    this.nav.push(CheckoutTripPage);
  }

  send(service) {
    let headers = {headers: new HttpHeaders({'Content-Type': 'application/json'})}

    this.httpClient
      .post('http://localhost:3000/services/add', JSON.stringify({
        "price": this.service.price,
        "time": this.service.time,
        "is_booked": true,
        "_id": "",
        "name": this.service.name,
        "description": this.service.description,
        "category": this.service.category,
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
