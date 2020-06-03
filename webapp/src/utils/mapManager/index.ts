import { Map, View } from 'ol';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { XYZ, Cluster, Vector as VectorSource } from 'ol/source';
import { defaults as defaultControls, Attribution } from 'ol/control';
import { fromLonLat } from 'ol/proj';

import Feature from 'ol/Feature.js';
import Geolocation from 'ol/Geolocation.js';
import Point from 'ol/geom/Point.js';
import {
  Circle as CircleStyle,
  Fill,
  Stroke,
  Style,
  Icon,
  Text,
} from 'ol/style.js';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';

import { defaults as defaultInteractions, DragZoom } from 'ol/interaction.js';

import Draw from 'ol/interaction/Draw.js';
import GeometryType from 'ol/geom/GeometryType';

import covidIcon from './covid-icon.png';

const attribution = new Attribution({
  collapsible: false,
});

let initialized = false;
let view: View;
let geolocation: Geolocation;
let layer: TileLayer;
let map: Map;

// Main User Position
const positionFeature = new Feature();
positionFeature.setStyle(
  new Style({
    image: new CircleStyle({
      radius: 8,
      fill: new Fill({
        color: '#3399CC',
      }),
      stroke: new Stroke({
        color: '#fff',
        width: 2,
      }),
    }),
  }),
);

// Accuracy
const accuracyFeature = new Feature();

// Draw (add a point on the map) - INIT
var source = new VectorSource({ wrapX: false });

// Corona Points Layer
var vector = new VectorLayer({
  zIndex: 2,
  source: source,
  style: new Style({
    fill: new Fill({
      color: 'rgba(255, 255, 255, 0.2)',
    }),
    stroke: new Stroke({
      color: '#ffcc33',
      width: 2,
    }),
    image: new Icon({
      anchor: [0.5, 48],
      anchorXUnits: IconAnchorUnits.FRACTION,
      anchorYUnits: IconAnchorUnits.PIXELS,
      opacity: 0.95,
      src: covidIcon,
    }),
  }),
});

// Draw module
export type MapPosition = {
  longitude: number;
  latitude: number;
};

type EnableDrawCovidMarkerCallback = (markerPosition: MapPosition) => void;
let drawConvidMarkerEnabled = false;
/**
 * Enable the Draw Marker function. It will audio desable after click over the map
 * @param onDrawMarker Callback method containing the position from the created marker
 */
export const enableDrawCovidMarker = (
  onDrawMarker: EnableDrawCovidMarkerCallback,
) => {
  const draw = new Draw({
    source: source,
    type: GeometryType.POINT,
  });

  map.addInteraction(draw);
  drawConvidMarkerEnabled = true;

  map.on('click', (event) => {
    if (drawConvidMarkerEnabled) {
      map.removeInteraction(draw);
      drawConvidMarkerEnabled = false;
      const [longitude, latitude] = event.coordinate;
      const markerPosition: MapPosition = {
        longitude,
        latitude,
      };
      onDrawMarker(markerPosition);
    }
  });
};
// Draw (add a point on the map) - FINAL

// enableCovidMarkerInsertion - INIT
let covidMarkerInsertionEnabled = false;

/**
 * Register new Covid Marker. Better performance than drawCovidMarker. It'll be desabled automatically after click
 * @param onDrawMarker Callback method containing the position from the created marker
 */
export const enableCovidMarkerInsertion = (
  onDrawMarker: EnableDrawCovidMarkerCallback,
) => {
  covidMarkerInsertionEnabled = true;
  map.on('click', (event) => {
    if (covidMarkerInsertionEnabled) {
      const [longitude, latitude] = event.coordinate;
      const markerPosition: MapPosition = {
        longitude,
        latitude,
      };
      onDrawMarker(markerPosition);
      covidMarkerInsertionEnabled = false;

      const newMarkerData: MarkerData = { position: markerPosition };
      const newMarkerDataList: MarkerData[] = [
        ...markerDataListCopy,
        newMarkerData,
      ];
      addCovidMarkers(newMarkerDataList);
    }
  });
};
// enableCovidMarkerInsertion - FINAL

// Callback after init map
let onInitMapCallback = () => {};
/**
 * On init map
 * @param callback
 */
export const onInitMap = (callback: () => void) =>
  (onInitMapCallback = callback);

/**
 * Init Map
 * @param mapTargetElementId element id
 */
export const initMap = (
  mapTargetElementId: string,
  latitude: number = 0,
  longitude: number = 0,
) => {
  initialized = true;

  view = new View({
    center: fromLonLat([longitude, latitude]),
    zoom: 6,
  });

  geolocation = new Geolocation({
    trackingOptions: {
      enableHighAccuracy: true,
    },
    projection: view.getProjection(),
  });

  geolocation.on('change:accuracyGeometry', function () {
    accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
  });

  geolocation.setTracking(true);

  layer = new TileLayer({
    zIndex: 1,
    // source: new OSM(),
    source: new XYZ({
      url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    }),
  });

  map = new Map({
    controls: defaultControls({ attribution: false }).extend([attribution]),
    interactions: defaultInteractions().extend([new DragZoom()]),
    target: mapTargetElementId,
    layers: [layer, vector],
    view,
  });

  new VectorLayer({
    map,
    source: new VectorSource({
      features: [accuracyFeature, positionFeature],
    }),
  });

  // Initial animation
  // view.animate({
  //   zoom: 10,
  //   duration: 5000,
  // });

  onInitMapCallback();
};

export const updateMapPosition = (
  latitue: number,
  longitude: number,
  zoom: number = 18,
) => {
  if (initialized) {
    const view = map.getView();
    const lonLat = fromLonLat([longitude - 0.0038, latitue + 0.0007]); // Some position fix

    // Accuracy
    accuracyFeature.setGeometry(new Point(lonLat));

    // Update position circle
    positionFeature.setGeometry(new Point(lonLat));

    // Go to desired position on map (will not work if user interact with map)
    view.animate({
      center: lonLat,
      zoom,
      duration: 2000,
    });
  }
};

// Covid Markers module
let previousClusters: VectorLayer;

export type MarkerData = {
  position: MapPosition;
};

let markerDataListCopy: Array<MarkerData>;

/**
 * Add Covid Markers to the Map.
 * @param markerDataList
 */
export const addCovidMarkers = (markerDataList: Array<MarkerData>) => {
  // Copy content. This copy can be used to improve performance (actually being used by enableCovidMarkerInsertion())
  markerDataListCopy = [...markerDataList];

  const features = markerDataList.map((marker) => {
    if (previousClusters != null) {
      map.removeLayer(previousClusters);
    }

    const {
      position: { longitude, latitude },
    } = marker;
    return new Feature(new Point([longitude, latitude]));
  });

  const markers = new VectorSource({
    features: features,
  });

  const clusterSource = new Cluster({
    distance: 40,
    source: markers,
  });

  let styleCache = {};
  const clusters = new VectorLayer({
    zIndex: 3,
    source: clusterSource,
    style: function (feature) {
      const size = feature.get('features').length;
      let style = null;
      if (!style) {
        style = new Style({
          fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)',
          }),
          stroke: new Stroke({
            color: '#ffcc33',
            width: 2,
          }),
          image: new Icon({
            anchor: [0.5, 48],
            anchorXUnits: IconAnchorUnits.FRACTION,
            anchorYUnits: IconAnchorUnits.PIXELS,
            opacity: 0.95,
            src: covidIcon,
          }),
          text: new Text({
            offsetY: -12,
            stroke: new Stroke({
              color: '#000',
              width: 2,
            }),
            text: size.toString(),
            scale: 1.1,
            fill: new Fill({
              color: '#fff',
            }),
          }),
        });

        // styleCache[size] = style;
        styleCache = {
          ...styleCache,
          [size]: style,
        };
      }

      return style;
    },
  });

  previousClusters = clusters;
  map.addLayer(clusters);
};
