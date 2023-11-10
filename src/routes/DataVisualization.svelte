<script>
    import Map from '../components/Map.svelte';
    import Filters from '../components/Filters.svelte';
    import { fetchData } from '../services/dataService';
  
    let data = [];
    let filteredData = [];
  
    async function loadData() {
      data = await fetchData();
      filteredData = data; // Begin met alle data
    }
  
    function handleFilterChange(filter) {
      // Pas hier je filtering toe op basis van de ontvangen filterparameter
      // Update de filteredData op basis van de filter
    }
  
    // Roep loadData aan bij het starten van de component
    loadData();
  </script>
  
  <Filters onFilterChange={handleFilterChange} />
  <Map {filteredData} />
  