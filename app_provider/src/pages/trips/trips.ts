import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {TripService} from "../../services/trip-service";
import {TripDetailPage} from "../trip-detail/trip-detail";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'page-trips',
  templateUrl: 'trips.html'
})
export class TripsPage {
  // list of trips
  public trips: any;
  public services: any;

  constructor(public nav: NavController, public tripService: TripService, private httpClient:HttpClient) {
    // set sample data
    this.trips = tripService.getAll();

    this.getData();
  }

  doSearch() {
    this.nav.push(TripDetailPage);
    console.log("ok")
  }
  // view trip detail
  viewDetail(service) {
    this.nav.push(TripDetailPage, {service: service});
  }
  getData() {
    this.httpClient.get('http://localhost:3000/services/getAll').subscribe(res => {
      this.services = res;
    });
  }
}
