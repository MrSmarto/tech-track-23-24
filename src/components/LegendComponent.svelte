<!-- LegendComponent.svelte -->
<script>
    export let rangeValues;
</script>

<div class="legend">
    <div class="subtitle">Populatie</div>
    {#each rangeValues as range}
        <div class="item" data-value={range.value}>
            <i class="legend-icon" style="background: {range.color}; border-radius: 50%;" />
            <span class="label">{range.label}</span>
        </div>
    {/each}
</div>
