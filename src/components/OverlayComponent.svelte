<!-- OverlayComponent.svelte -->
<script>
  export let showOverlay, toggleOverlay;

  $: console.log("Overlay status: ", showOverlay);
</script>

{#if showOverlay}
  <div class={`overlay ${showOverlay ? "overlay-visible" : ""}`}>
    <button class="close-button" on:click={toggleOverlay}>&times;</button>
    <div class="overlay-content">
      <h2 class="h2-overlay">Project Informatie</h2>
      <p>
        Welkom bij dit interactieve project dat de bevolkingsontwikkeling in
        Nederland visualiseert. Deze choropleth-kaart is ontworpen om gebruikers
        een intuïtieve en gedetailleerde kijk te bieden op demografische
        veranderingen per gemeente en provincie door de jaren heen.
      </p>
      <p>
        <strong>De kaart biedt verschillende interactieve functies:</strong>
      </p>
      <h3>1</h3>
      <p class="italic">
        Zoom in op specifieke regio's voor gedetailleerde demografische
        gegevens.
      </p>
      <br />
      <h3>2</h3>
      <p class="italic">
        Wissel tussen 'Gemeente' en 'Provincie' modus om verschillende
        geografische niveaus te verkennen.
      </p>
      <br />
      <h3>3</h3>
      <p class="italic">
        Gebruik de tijdschuifregelaar om veranderingen door de jaren heen te
        bekijken, beschikbaar in zowel jaar- als maandmodus.
      </p>
      <br />
      <h3>4</h3>
      <p class="italic">
        Bekijk de legenda voor een kleurenschaal die de bevolkingsdichtheid per
        gebied aangeeft.
      </p>
      <br />

      <h3>Kleurenschaal</h3>
      <p>
        De kleuren op de kaart variëren van lichtgroen (lage
        bevolkingsdichtheid) tot dieprood (hoge bevolkingsdichtheid), waardoor
        in één oogopslag duidelijk wordt welke gebieden de meeste inwoners
        hebben.
      </p>

      <h3>Technologie</h3>
      <p>
        Deze kaart is gebouwd met moderne webtechnologieën, waaronder Svelte
        voor de front-end en Leaflet voor de kaartfunctionaliteiten. De data is
        zorgvuldig verzameld en samengesteld uit betrouwbare bronnen,
        voornamelijk het Centraal Bureau voor de Statistiek (CBS).
      </p>

      <h3>Het doel</h3>
      <p>
        Het doel van dit project is om een gebruiksvriendelijk en visueel
        aantrekkelijk platform te bieden voor iedereen die geïnteresseerd is in
        de bevolkingsdynamiek van Nederland. Of je nu een student, onderzoeker,
        beleidsmaker of gewoon nieuwsgierig bent, deze kaart biedt waardevolle
        inzichten in de demografische ontwikkelingen van ons land.
      </p>

      <h3>Contact</h3>
      <p>
        Ik hoop dat je dit hulpmiddel nuttig vindt en ik nodig je uit om de
        verschillende functies te verkennen. Voor vragen of feedback kun je
        contact met mij opnemen via <span class="italic"
          >[https://github.com/MrSmarto]</span
        >.
      </p>
    </div>
  </div>
{/if}
