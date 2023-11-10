<script>
  import { onMount } from 'svelte';
  import { fetchData } from '$lib/fetchData';

  let data = [];

  onMount(async () => {
    const url = "https://opendata.cbs.nl/ODataApi/odata/37230ned/TypedDataSet";
    data = await fetchData(url);
    // Verwerk en toon de data hier...
  });
</script>

<main>
  <!-- Hier komt je kaart en andere UI-elementen -->
</main>
