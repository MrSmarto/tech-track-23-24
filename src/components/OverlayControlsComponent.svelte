<!-- OverlayControlsComponent.svelte -->
<script>
  export let toggleMode, adjustSliderValue, handleSliderChange;
  export let isYearMode, selectedYear, selectedMonth, monthNames;
</script>

<div class="overlay-controls">
  <div class="slider-controls">
    <button on:click={toggleMode} class={isYearMode ? "active" : "inactive"}
      >Jaar</button
    >
    <button on:click={toggleMode} class={isYearMode ? "inactive" : "active"}
      >Maand</button
    >
    <div class="slider-buttons">
      <button on:click={() => adjustSliderValue(false)}>&lt;</button>
      <input
        type="range"
        min={isYearMode ? "2002" : "1"}
        max={isYearMode ? "2022" : selectedYear === 2022 ? "12" : "12"}
        step="1"
        value={isYearMode ? selectedYear : selectedMonth}
        on:change={handleSliderChange}
        class="year-slider"
      />
      <button on:click={() => adjustSliderValue(true)}>&gt;</button>
    </div>
    <div class="year-month-display">
      {isYearMode
        ? `Jaar: ${selectedYear}`
        : `Jaar: ${selectedYear} - ${monthNames[selectedMonth - 1]}`}
    </div>
  </div>
</div>
