<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  onMount(async () => {
    try {
      const geojsonData = await d3.json('/geojson/gemeente_gegeneraliseerd.geojson');
      console.log('GeoJSON Data:', geojsonData); // Debugging

      let projection = d3.geoMercator()
        .fitSize([800, 400], geojsonData);

      let geoGenerator = d3.geoPath()
        .projection(projection);

      const paths = geojsonData.features.map(feature => geoGenerator(feature));
      console.log('Generated SVG Paths:', paths); // Debugging - Check if any paths contain 'NaN'

      d3.select('#content g.map')
        .selectAll('path')
        .data(geojsonData.features)
        .enter()
        .append('path')
        .attr('d', geoGenerator)
        .attr('fill', 'steelblue');
    } catch (error) {
      console.error('Error fetching geoJSON data:', error);
    }
  });
</script>

<style>
  path {
    stroke: white;
    stroke-width: 1;
  }
</style>

<div id="content">
  <svg width="800" height="400">
    <g class="map"></g>
  </svg>
</div>
