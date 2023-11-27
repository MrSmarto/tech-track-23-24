<script>
  // 1. Externe imports
  import { onMount } from "svelte";

  // 2. Component imports
  import OverlayControlsComponent from "../components/OverlayControlsComponent.svelte";
  import TitleComponent from "../components/TitleComponent.svelte";
  import LayerSwitchComponent from "../components/LayerSwitchComponent.svelte";
  import LegendComponent from "../components/LegendComponent.svelte";
  import OverlayComponent from "../components/OverlayComponent.svelte";
  import MapComponent from "../components/MapComponent.svelte";

  // 3. Toestandsvariabelen
  let map;
  let currentLayer;
  let currentLayerType = "gemeente";
  let selectedYear = 2002;
  let selectedMonth = 1;
  let isYearMode = true;
  let showOverlay = false;
  let populationData = {};
  let lastLayerType = null;
  let lastMode = null;
  const layerTypes = ["gemeente", "provincie"];
  const monthNames = [
    "Jan",
    "Feb",
    "Maart",
    "Apr",
    "Mei",
    "Juni",
    "Juli",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Dec",
  ];

  // Definities voor de bereiken van de legenda voor gemeenten en provincies
  let rangeValuesGemeente = [
    { value: 750000, label: "750,000 - 999,999+", color: "#800026" },
    { value: 600000, label: "600,000 - 749,999", color: "#BD0026" },
    { value: 350000, label: "350,000 - 599,999", color: "#E31A1C" },
    { value: 150000, label: "150,000 - 349,999", color: "#FC4E2A" },
    { value: 75000, label: "75,000 - 149,999", color: "#FD8D3C" },
    { value: 30000, label: "30,000 - 74,999", color: "#FEB24C" },
    { value: 20000, label: "20,000 - 29,999", color: "#FED976" },
    { value: 10000, label: "10,000 - 19,999", color: "#FFEDA0" },
    { value: 4000, label: "4,000 - 9,999", color: "#C7E9B4" },
    { value: 0, label: "0 - 3,999", color: "#E5F5E0" },
  ];

  // Definities voor de bereiken van de legenda voor gemeenten en provincies
  let rangeValuesProvincie = [
    { value: 3500000, label: "3,500,000+", color: "#800026" },
    { value: 3000000, label: "3,000,000 - 3,499,999", color: "#BD0026" },
    { value: 2500000, label: "2,500,000 - 2,999,999", color: "#E31A1C" },
    { value: 2000000, label: "2,000,000 - 2,499,999", color: "#FC4E2A" },
    { value: 1500000, label: "1,500,000 - 1,999,999", color: "#FD8D3C" },
    { value: 1000000, label: "1,000,000 - 1,499,999", color: "#FEB24C" },
    { value: 750000, label: "750,000 - 999,999", color: "#FED976" },
    { value: 500000, label: "500,000 - 749,999", color: "#FFEDA0" },
    { value: 250000, label: "250,000 - 499,999", color: "#C7E9B4" },
    { value: 0, label: "0 - 249,999", color: "#E5F5E0" },
  ];

  // 4. Reactieve statements en dynamische klassenbindingen
  $: monthButtonClass = isYearMode ? "inactive" : "active";
  $: yearButtonClass = isYearMode ? "active" : "inactive-with-year";
  $: rangeValues =
    currentLayerType === "gemeente"
      ? rangeValuesGemeente
      : rangeValuesProvincie;

  // 5. Lifecycle hooks en functies
  // Functie die uitgevoerd wordt zodra de component is gemount in de DOM
  // !!! BELANGRIJK DAT DE LEAFLET WORDT GEIMPOTEERD IN DE onMount IVM NIET COMPATABEL MET DE SERVER-SIDE RENDERING !!!
  onMount(async () => {
    if (typeof window !== "undefined") {
      // Dynamisch importeren van Leaflet en de bijbehorende CSS
      const leaflet = await import("leaflet");
      const L = leaflet.default;
      await import("leaflet/dist/leaflet.css");

      // Initialisatie van de Leaflet-kaart
      initMap(L);
      loadData(true); // Eerste keer data laden
    }
  });

  // Functie om de kaart te initialiseren met Leaflet
  function initMap(L) {
    console.log("initMap: MapComponent");

    // Initialiseren van de Leaflet-kaart
    map = L.map("map", {}).setView([52.1326, 5.2913], 7); // Coördinaten en zoomniveau voor de initiële kaartweergave

    // Voeg een standaard tileLayer toe
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);
  }

  // Functie om de bevolkingsdata te laden op basis van het geselecteerde jaar of maand
  async function loadData(forceReload = false) {
    // Controleer of er een verandering in laagtype of modus is
    if (
      !forceReload &&
      lastLayerType === currentLayerType &&
      lastMode === isYearMode
    ) {
      return; // Geen nieuwe data nodig, vroeg terugkeren
    }

    // Bepaal welk data bestand te laden
    const fileYear = `Bevolkingsontwikkeling_${currentLayerType}_per_jaar.json`;
    const fileMonth = `Bevolkingsontwikkeling_${currentLayerType}_per_maand.json`;
    const basePath = "dataset-data/";
    const dataFile = isYearMode
      ? `${basePath}${fileYear}`
      : `${basePath}${fileMonth}`;

    // Fetch de data en update de staat
    const response = await fetch(dataFile);
    const jsonData = await response.json();
    populationData = jsonData.value;
    loadGeoJsonLayer(); // Laad de nieuwe laag met de nieuwe data

    // Update de laatst gebruikte laagtype en modus
    lastLayerType = currentLayerType;
    lastMode = isYearMode;
  }

  // Functie om de bevolking te halen voor een gegeven regio, jaar en maand
  function getPopulation(regionCode, year, month) {
    // Bepaal de periode string op basis van jaar of maand modus
    const period = isYearMode
      ? `${year}JJ00`
      : `${year}MM${String(month).padStart(2, "0")}`;
    let population = "Onbekend"; // Standaard waarde indien geen data gevonden

    // Loop door de bevolkingsdata om de juiste waarde te vinden
    for (let key in populationData) {
      let jsonRegionCode = populationData[key].RegioS.trim();

      // Vergelijk regiocode en periode om de bevolkingswaarde te vinden
      if (
        jsonRegionCode === regionCode &&
        populationData[key].Perioden === period
      ) {
        population = populationData[key].BevolkingAanHetBeginVanDePeriode_1;
        break; // Stop de loop zodra de waarde gevonden is
      }
    }

    // Log een bericht indien geen data gevonden
    if (population === "Onbekend") {
      console.log(`Geen data gevonden voor: ${regionCode}, Periode: ${period}`);
    }

    return population; // Geef de gevonden bevolkingswaarde terug
  }

  // Functie om de GeoJSON laag te laden met de bijbehorende stijl en interacties
  function loadGeoJsonLayer() {
    // Verwijder de huidige laag als deze bestaat om de nieuwe laag te kunnen laden
    if (currentLayer) {
      map.removeLayer(currentLayer);
      console.log("Huidige laag verwijderd");
    }

    // Bepaal het pad naar de GeoJSON data op basis van het geselecteerde jaar en laagtype
    const geojsonPath = `geojson/${currentLayerType}/${currentLayerType}_${selectedYear}.geojson`;
    console.log(`GeoJSON laden van ${geojsonPath}`);

    // Haal de GeoJSON data op en voeg deze toe aan de kaart
    fetch(geojsonPath)
      .then((response) => response.json())
      .then((geojsonData) => {
        console.log("GeoJSON data geladen");
        // Creëer een nieuwe GeoJSON laag en voeg deze toe aan de kaart
        currentLayer = L.geoJSON(geojsonData, {
          style: (feature) => {
            // Bepaal de stijl voor elk geojson feature
            let regionCode = feature.properties.statcode;
            const population = getPopulation(
              regionCode.trim(),
              selectedYear,
              selectedMonth
            );
            return {
              fillColor: getColor(population, currentLayerType),
              weight: 1,
              opacity: 1,
              color: "black",
              dashArray: "1",
              fillOpacity: 1,
            };
          },
          onEachFeature: (feature, layer) => {
            // Voeg interactie toe aan elk feature
            let regionCode = feature.properties.statcode;
            const population = getPopulation(
              regionCode.trim(),
              selectedYear,
              selectedMonth
            );
            const popupContent = `<strong>${
              currentLayerType === "gemeente" ? "Gemeente" : "Provincie"
            }:</strong> ${
              feature.properties.statnaam
            }<br><strong>Populatie:</strong> ${population}`;

            // Voeg mouseover en mouseout events toe om de highlight en popup functionaliteit te regelen
            layer.on("mouseover", function (e) {
              this.openPopup();
              this.setStyle({
                fillColor: "#007bff",
                weight: 2,
                color: "black",
                fillOpacity: 1,
              });
              highlightLegend(population);
            });

            layer.on("mouseout", function (e) {
              this.closePopup();
              this.setStyle({
                fillColor: getColor(population, currentLayerType),
                weight: 1,
                opacity: 1,
                color: "black",
                dashArray: "1",
                fillOpacity: 1,
              });
              highlightLegend(null);
            });

            // Bind een popup met informatie over de regio en de bevolking
            layer.bindPopup(popupContent);
          },
        }).addTo(map);
      });
  }

  // Functie om de kleur te bepalen op basis van de bevolkingsgrootte en laagtype
  function getColor(population, layerType) {
    // Return de kleur afhankelijk van de populatie grootte en of het een gemeente of provincie is
    // Kleurenschaal voor provincies
    if (layerType === "provincie") {
      return population > 3500000
        ? "#800026"
        : population > 3000000
          ? "#BD0026"
          : population > 2500000
            ? "#E31A1C"
            : population > 2000000
              ? "#FC4E2A"
              : population > 1500000
                ? "#FD8D3C"
                : population > 1000000
                  ? "#FEB24C"
                  : population > 750000
                    ? "#FED976"
                    : population > 500000
                      ? "#FFEDA0"
                      : population > 250000
                        ? "#C7E9B4"
                        : "#E5F5E0";
    } else {
      return population > 750000
        ? "#800026"
        : population > 600000
          ? "#BD0026"
          : population > 350000
            ? "#E31A1C"
            : population > 150000
              ? "#FC4E2A"
              : population > 75000
                ? "#FD8D3C"
                : population > 30000
                  ? "#FEB24C"
                  : population > 20000
                    ? "#FED976"
                    : population > 10000
                      ? "#FFEDA0"
                      : population > 4000
                        ? "#C7E9B4"
                        : "#E5F5E0";
    }
  }

  // Functie om de legenda te highlighten gebaseerd op de huidige bevolking die wordt gehoverd
  function highlightLegend(population) {
    // Controleer of we de populatie als een getal hebben.
    population = Number(population);

    // Selecteer alle items in de legenda
    const legendItems = document.querySelectorAll(".legend .item");
    legendItems.forEach((item) => {
      // Verkrijg de waarde van de populatie voor dit legenda-item.
      const rangeValue = Number(item.dataset.value);
      const colorBox = item.querySelector(".legend-icon");

      // Controleer of de populatie binnen het bereik valt van dit item.
      if (population >= rangeValue) {
        colorBox.style.border = "2px solid black"; // Vervangt de transparante rand
        colorBox.style.borderRadius = "50%"; // Maakt de border cirkelvormig
      } else {
        colorBox.style.border = "2px solid transparent"; // Behoudt de transparante rand
      }
    });
  }

  // Functie om de kaartlaag te wisselen tussen gemeente en provincie
  function switchLayer(layerType) {
    console.log("switchLayer: LayerSwitchComponent");
    // Stel het nieuwe laagtype in en laad de data opnieuw
    // ...wisselen tussen gemeente en provincie en herladen van de laag...
    currentLayerType = layerType;
    loadData(true); // Forceer het herladen van data
    loadGeoJsonLayer();
  }

  // Functie om de waarde van de slider te hanteren en de kaart opnieuw te laden
  function handleSliderChange(event) {
    // Logica voor het veranderen van de slider waarde
    if (isYearMode) {
      selectedYear = Math.min(Number(event.target.value), 2022); // Aangepast naar 2022
    } else {
      // Voor maanden, controleer of het geselecteerde jaar 2022 is
      if (selectedYear === 2022) {
        selectedMonth = Math.min(Number(event.target.value), 12); // Beperk tot december in 2022
      } else {
        selectedMonth = Number(event.target.value);
      }
    }
    loadGeoJsonLayer(); // Herlaad de laag met de nieuwe waarden
  }

  // Functie om de waarde van de slider te verhogen of te verlagen
  function adjustSliderValue(isIncrement) {
    // Logica voor jaar aanpassen
    if (isYearMode) {
      selectedYear = isIncrement
        ? Math.min(selectedYear + 1, 2022) // Aangepast naar 2022
        : Math.max(selectedYear - 1, 2002);
    }
    // Logica voor maand aanpassen
    else {
      // Aangepast voor de maand, alleen beperken tot 12 als het jaar 2022 is
      selectedMonth = isIncrement
        ? selectedYear === 2022
          ? Math.min(selectedMonth + 1, 12)
          : Math.min(selectedMonth + 1, 12)
        : Math.max(selectedMonth - 1, 1);
    }
    loadGeoJsonLayer(); // Herlaad de laag met de nieuwe waarden
  }

  // Functie om te schakelen tussen jaar en maand modus
  function toggleMode() {
    // Schakel tussen jaar en maand modus en laad de data opnieuw
    // ...schakelen tussen modi en herladen van data...
    isYearMode = !isYearMode;
    loadData(true); // Forceer het herladen van data
    loadGeoJsonLayer();
  }

  function toggleOverlay() {
    showOverlay = !showOverlay;
    console.log("Toggle overlay: ", showOverlay);
  }
</script>

<!-- Alle HTML componenten -->
<div class="your-main-container">
  <!-- Bevat de slider-controls voor jaar en maand, inclusief de logica voor het aanpassen van de slider-waarde. -->
  <OverlayControlsComponent
    {toggleMode}
    {adjustSliderValue}
    {handleSliderChange}
    {isYearMode}
    {selectedYear}
    {selectedMonth}
    {monthNames}
  />

  <!-- Bevat de titel van de pagina. -->
  <TitleComponent />

  <!-- Bevat de knoppen om te schakelen tussen de gemeente- en provincielagen. -->
  <LayerSwitchComponent {layerTypes} {switchLayer} {currentLayerType} />

  <!-- Bevat de legenda voor de kaart. -->
  <LegendComponent {rangeValues} />

  <!-- Bevat de overlay-inhoud die wordt getoond/verborgen. -->
  <OverlayComponent {showOverlay} {toggleOverlay} />

  <!-- Bevat de Leaflet-kaart. -->
  <MapComponent />

  <button class="info-button" on:click={toggleOverlay}>i</button>
</div>

<!-- De styling van alle componenten -->
<style>
  @import "../styles/Global.css";
</style>
