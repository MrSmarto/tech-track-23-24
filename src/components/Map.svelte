<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
  
    export let data;
  
    onMount(() => {
      // Hier komt de logica voor het tekenen van je kaart
      // Je moet een SVG-element in je markup hebben
      // Gebruik D3 om de kaart te tekenen en data te binden
    });
  </script>
  
  <svg id="choropleth-map"></svg>
  