import {Injectable} from "@angular/core";
import {TRIPS} from "./mock-trips";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class TripService {
  private trips: any;
  private posts:any;

  constructor(private httpClient: HttpClient) {
    this.trips = TRIPS;
  }

  getAll() {
    return this.trips;

  }

  getData() {
    this.httpClient.get('localhost:3000/services/getAll').subscribe(res => {
      this.posts = res;
      console.log(res)
    });
  }
  getAllServices():Observable<any>{
    return this.httpClient.get('localhost:3000/services/getAll');
  }

  getItem(id) {
    for (var i = 0; i < this.trips.length; i++) {
      if (this.trips[i].id === parseInt(id)) {
        return this.trips[i];
      }
    }
    return null;
  }

  remove(item) {
    this.trips.splice(this.trips.indexOf(item), 1);
  }
}
