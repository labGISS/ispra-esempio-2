import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {parallel} from '@angular/cdk/testing';
import {GeoJsonObject} from 'geojson';

@Injectable({
  providedIn: 'root'
})
export class PygeoapiService {

  constructor(private http: HttpClient) { }

  getCLCLayer(bbox: number[]): Observable<GeoJsonObject> {
    const uri = "http://localhost:5000/collections/clc/items";

    let params = new HttpParams();
    params = params.set("f", "json");
    params = params.set("limit", "2000");

    if (bbox) {
      params = params.set("bbox", bbox.join(","));
    }

    console.log(params.toString());

    return this.http.get<GeoJsonObject>(uri, {params});
  }

  getIncendiMetadata(): Observable<object> {
    const uri = "http://localhost:5000/collections/incendi";

    let params = new HttpParams();
    params = params.set("f", "json");

    return this.http.get(uri, {params});
  }


  getIncendi(): Observable<GeoJsonObject> {
    const uri = "http://localhost:5000/collections/incendi/items";

    let params = new HttpParams();
    params = params.set("f", "json");
    params = params.set("limit", "2000");

    return this.http.get<GeoJsonObject>(uri, {params});
  }
}
