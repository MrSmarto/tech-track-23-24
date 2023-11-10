<script>
    export let onFilterChange;
  
    function handleRegionChange(event) {
      onFilterChange({ type: 'region', value: event.target.value });
    }
  
    function handleTimeChange(event) {
      onFilterChange({ type: 'time', value: event.target.value });
    }
  </script>
  
  <select on:change={handleRegionChange}>
    <!-- Opties voor regio's -->
  </select>
  
  <select on:change={handleTimeChange}>
    <!-- Opties voor tijd -->
  </select>
  