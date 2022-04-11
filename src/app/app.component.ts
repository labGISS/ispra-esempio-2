import {Component, OnInit} from '@angular/core';
import LeafletInfoBox from './Common/LeafletInfoBox';
import * as L from 'leaflet';
import {PygeoapiService} from './providers/pygeoapi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  infoLayer: LeafletInfoBox;
  clcLayer: L.Layer;
  incendiLayer: L.Layer;
  bboxLayer: L.Layer;

  constructor(private pyservice: PygeoapiService) {}


  leafletOptions = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }),
    ],
    zoom: 5,
    center: L.latLng(42.08, 13.62)
  };


  onMapReady(map: L.Map): void {
    console.log('Map is ready!');
    this.infoLayer = new LeafletInfoBox();
    this.infoLayer.setMap(map);
    this.infoLayer.setPosition('bottomleft');
  }

  ngOnInit(): void {
    this.pyservice.getIncendiMetadata().subscribe(data => {
      const bbox = data['extent']['spatial']['bbox'][0];
      console.log(bbox);
      // this.bboxLayer = L.rectangle(L.latLngBounds([[bbox[1], bbox[0]], [bbox[3], bbox[2]]]));
      console.log(bbox);

      this.pyservice.getCLCLayer(bbox).subscribe(clc => {
        this.clcLayer = L.geoJSON(clc, {
           style: {
             fillColor: '#0099ff',
             weight: 2,
             dashArray: '3',
             fillOpacity: 0.1,
           },
          onEachFeature: (feature, layer) => {
            layer.bindPopup(this.createHtmlStringFromJson(feature.properties));
          }
        });
      });
    });

    this.pyservice.getIncendi().subscribe(incendi => {
      this.incendiLayer = L.geoJSON(incendi, {
        style: {
          fillColor: '#ff0000',
          weight: 2,
          opacity: 1,
          color: '#ff0000',
          fillOpacity: 1,
        },
        onEachFeature: (feature, layer) => {
          layer.bindPopup(this.createHtmlStringFromJson(feature.properties));
        }
      });
    });
  }

  createHtmlStringFromJson(json: object): string {
    let ret = '';
    const keys = Object.keys(json);

    for (const key of keys) {
      if (json[key]) {
        const s = `<b>${key}</b>: ${json[key]}</br>`;
        ret = ret + s;
      }
    }

    return ret;
  }
}
