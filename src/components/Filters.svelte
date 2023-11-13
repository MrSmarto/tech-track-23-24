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
  <option value="">Kies een regio</option>
  <option value="gemeente">Gemeente</option>
  <option value="provincie">Provincie</option>
  <option value="landsdeel">Landsdeel</option>
</select>

<select on:change={handleTimeChange}>
  <option value="">Kies een periode</option>
  <!-- Voeg hier opties toe voor tijdperiodes -->
</select>
