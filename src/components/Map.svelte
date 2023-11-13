<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
  
    export let data; // Je data
  
    onMount(async () => {
      // Laden van GeoJSON-data (vervang met de URL naar je GeoJSON-bestand)
      const geojsonData = await d3.json('../static/JSON/');
  
      const svg = d3.select('#choropleth-map');
      const projection = d3.geoMercator().fitSize([500, 400], geojsonData);
      const pathGenerator = d3.geoPath().projection(projection);
  
      // Teken de kaart
      svg.selectAll('path')
        .data(geojsonData.features)
        .enter()
        .append('path')
        .attr('d', pathGenerator)
        .attr('fill', 'steelblue'); // Basisvulling, pas dit aan op basis van je data
    });
  </script>
  
  <svg id="choropleth-map" width="500" height="400"></svg>
  