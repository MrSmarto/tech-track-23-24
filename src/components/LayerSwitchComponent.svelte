<!-- LayerSwitchComponent.svelte -->
<script>
    export let layerTypes, switchLayer, currentLayerType;
</script>

<div class="layer-switch-buttons">
    {#each layerTypes as type}
        <button
            on:click={() => switchLayer(type)}
            class:selected={currentLayerType === type}
        >
            {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
    {/each}
</div>
