//**************************************************************************************//
//*****************SUIVRE LA DOCUMENTATION MAPBOX**************************************//
//************************************************************************************//

mapboxgl.accessToken = 'pk.eyJ1Ijoic2FtYWt1bmNoYW4iLCJhIjoiY2ptMXZscHN1MDg5MDNwbzgxemN4eXVlNSJ9.-s0FJ-cfnjqG3edmK70TGA';

let geojson = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "message": "Foo",
        "iconSize": [60, 60]
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          3.8733574000000317,
          43.625877
        ]
      }
    }
  ]
};
let mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
mapboxClient.geocoding.forwardGeocode({
  query: 'Montpellier, France',
  autocomplete: false,
  limit: 1
})
  .send()
  .then(function (response) {
    if (response && response.body && response.body.features && response.body.features.length) {
      let feature = response.body.features[0];
      feature.center = [3.8733574000000317, 43.625877];

      let map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',
        center: feature.center,
        zoom: 15
      });
      map.addControl(new mapboxgl.FullscreenControl());
      geojson.features.forEach(function(marker) {
        // create a DOM element for the marker
        let bgIcon = document.createElement('div');
        bgIcon.className = 'bg-icon';
        bgIcon.style.padding = '5px';
        bgIcon.style.borderRadius = '5px';
        bgIcon.style.backgroundColor = 'rgba(106,106,106,0.5)';
        let icon = document.createElement('div');
        icon.className = 'marker';
        icon.style.backgroundImage = 'url(/images/icon-logo.png)';
        icon.style.width = marker.properties.iconSize[0] + 'px';
        icon.style.height = marker.properties.iconSize[1] + 'px';
        bgIcon.appendChild(icon);
        // add marker to map
        new mapboxgl.Marker(bgIcon)
          .setLngLat(marker.geometry.coordinates)
          .addTo(map);
      });
    }
  });