<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  export let geojsonUrl; // URL van het te laden GeoJSON-bestand

  onMount(async () => {
    const geojsonData = await d3.json(geojsonUrl);

    const svg = d3.select('#choropleth-map');
    const projection = d3.geoMercator().fitSize([500, 400], geojsonData);
    const pathGenerator = d3.geoPath().projection(projection);

    svg.selectAll('path')
      .data(geojsonData.features)
      .enter()
      .append('path')
      .attr('d', pathGenerator)
      .attr('fill', 'steelblue');
  });
</script>

<svg id="choropleth-map" width="500" height="400"></svg>
