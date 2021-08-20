<template>
  <section class="mapbox">
    <div id="map-box" ref="map-box"></div>
  </section>
</template>

<script>
import Mapbox from "mapbox-gl";
// import { MglMap } from "vue-mapbox";

export default {
  data() {
    return {
      mapbox: null,
      accessToken: 'pk.eyJ1IjoibW9uZ3RlIiwiYSI6ImNrcnQweTlyYTltdXMzMWwza3NwZ3g4bTQifQ.xqpdKOK6bUwFasPP3JkqHA', // your access token. Needed if you using Mapbox maps
      mapStyle: 'mapbox://styles/mapbox/light-v10',
    };
  },

  created() {
    this.mapbox = Mapbox;
    // We need to set mapbox-gl library here in order to use it in template
  },
  mounted() {

    this.mapbox.accessToken = 'pk.eyJ1IjoibW9uZ3RlIiwiYSI6ImNrcnQweTlyYTltdXMzMWwza3NwZ3g4bTQifQ.xqpdKOK6bUwFasPP3JkqHA'
    const map = new this.mapbox.Map({
      container: this.$refs['map-box'],
      style: 'mapbox://styles/mapbox/light-v10',
      center: [-74.0066, 40.7135],
      zoom: 15.5,
      pitch: 45,
      bearing: -17.6,
      antialias: true
    })

    map.on('load', () => {
      // Insert the layer beneath any symbol layer.
      var layers = map.getStyle().layers;
      var labelLayerId;
      for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
          labelLayerId = layers[i].id;
          break;
        }
      }

      const options = {
        'id': 'add-3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
          'fill-extrusion-color': '#aaa',

          // Use an 'interpolate' expression to
          // add a smooth transition effect to
          // the buildings as the user zooms in.
          'fill-extrusion-height': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            15.05,
            ['get', 'height']
          ],
          'fill-extrusion-base': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            15.05,
            ['get', 'min_height']
          ],
          'fill-extrusion-opacity': 0.6
        }
      }

      console.log('1111')

      map.addLayer(options, labelLayerId)
    });
  },
  methods: {
    onMapLoaded() {
      // Insert the layer beneath any symbol layer.
      // const asyncActions = event.component.actions

      // const newParams = await asyncActions.flyTo({
      //   center: [-74.0066, 40.7135],
      //   zoom: 15.5,
      //   pitch: 45,
      //   bearing: -17.6,
      //   antialias: true
      // })

      // console.log('???', event.map)

      // this.map = event.map;
      // var layers = this.map.getStyle().layers;
      // var labelLayerId;
      // for (var i = 0; i < layers.length; i++) {
      //   if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
      //     labelLayerId = layers[i].id;
      //     break;
      //   }
      // }

      // const options = {
      //   'id': 'add-3d-buildings',
      //   'source': 'composite',
      //   'source-layer': 'building',
      //   'filter': ['==', 'extrude', 'true'],
      //   'type': 'fill-extrusion',
      //   'minzoom': 15,
      //   'paint': {
      //     'fill-extrusion-color': '#aaa',

      //     // Use an 'interpolate' expression to
      //     // add a smooth transition effect to
      //     // the buildings as the user zooms in.
      //     'fill-extrusion-height': [
      //       'interpolate',
      //       ['linear'],
      //       ['zoom'],
      //       15,
      //       0,
      //       15.05,
      //       ['get', 'height']
      //     ],
      //     'fill-extrusion-base': [
      //       'interpolate',
      //       ['linear'],
      //       ['zoom'],
      //       15,
      //       0,
      //       15.05,
      //       ['get', 'min_height']
      //     ],
      //     'fill-extrusion-opacity': 0.6
      //   }
      // }

      // console.log('1111')

      // this.map.addLayer(options, labelLayerId)
    }
  }
};
</script>