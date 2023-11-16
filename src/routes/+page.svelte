<script>
    import Map from '../components/Map.svelte';
    import Filters from '../components/Filters.svelte';
    import '../app.css';

    let geojsonUrl = 'static/geojson/gemeente_gegeneraliseerd.geojson'; // Standaard GeoJSON URL

    function handleFilterChange(filter) {
      if (filter.type === 'region') {
        geojsonUrl = `/geojson/${filter.value}_gegeneraliseerd.geojson`;
      }
    }
</script>

<Filters onFilterChange={handleFilterChange} />
<Map {geojsonUrl} />
