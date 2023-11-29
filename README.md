# Projectnaam: Nederlandse Bevolkingsontwikkeling Kaart

![Interactieve kaart (1500 x 750 px)](https://github.com/MrSmarto/tech-track-23-24/assets/118122875/710a4adc-ee29-4a8e-9e6e-d0fed0b33ce4)

## Beschrijving
Dit project visualiseert de bevolkingsontwikkeling in Nederland via een interactieve kaart. Het gebruikt moderne webtechnologieën zoals Svelte en Leaflet om gebruikers een intuïtieve en gedetailleerde blik te bieden op demografische veranderingen.

## Belangrijkste Functionaliteiten
- Interactieve kaart met zoom- en panmogelijkheden
- Dynamische weergave van demografische data per gemeente/provincie
- Tijdlijnslider voor het selecteren van specifieke jaren en maanden
- Informatieve overlays met details over project en data

## Technologieën Gebruikt
- Svelte
- Leaflet
- JavaScript, HTML, CSS

## Installatie en Gebruik

Om dit project te installeren en te gebruiken, volg je de onderstaande stappen:

1. **Clone het Repository:**
   Open je terminal en voer het volgende commando uit om het project te klonen:
```javascript
git clone https://github.com/MrSmarto/tech-track-23-24.git
```

2. **Installatie van Afhankelijkheden:**
Navigeer naar de hoofdmap van het project en installeer de benodigde afhankelijkheden:
```javascript
cd tech-track-23-24
```
```javascript
npm install
```

Dit zal alle benodigde node modules installeren die in `package.json` zijn opgesomd.

3. **Start de Ontwikkelingsserver:**
Start de lokale ontwikkelingsserver met:
```javascript
npm run dev
```

Dit zal de applicatie beschikbaar maken op `http://localhost:3000` (of een andere poort als 3000 bezet is).

4. **Open de Applicatie:**
Open je webbrowser en ga naar `http://localhost:3000` om de applicatie te bekijken.

5. **Gebruik van de Applicatie:**
- Interacteer met de kaart om in te zoomen op specifieke gebieden.
- Gebruik de slider om de bevolkingsdata van verschillende jaren of maanden te bekijken.
- Schakel tussen de weergave van gemeenten en provincies.
- Klik op de informatieknop om meer over het project te weten te komen.

6. **Bouw voor Productie:**
Wanneer je klaar bent voor productie, gebruik dan:
```javascript
npm run build
```

Dit genereert een geoptimaliseerde versie van de applicatie in de `build`-map.

## Live Demo

Dit project is live gehost en kan bekeken en gebruikt worden via de volgende link:

- **Live Demo URL:** [Nederlandse Bevolkingsontwikkeling Kaart](https://tech-track-23-24-choroplethmap-ochre.vercel.app/)

De applicatie is gehost op [Vercel](https://vercel.com), een cloudplatform voor statische sites en Serverless Functions die het makkelijk maakt om moderne webprojecten te deployen. Vercel integreert naadloos met je GitHub-repository, waardoor elke git-push automatisch een nieuwe deploy kan triggeren, wat de workflow voor het uitrollen van nieuwe updates sterk vereenvoudigt.


## Bijdragen
Bijdragen aan dit project zijn welkom. Neem contact op via [MrSmarto](https://github.com/MrSmarto)

## Licentie
Dit project is gelicenseerd onder de MIT License - zie het LICENSE-bestand voor details.

## Auteur

- **Naam:** Thijmen Smart
- **Studie:** 3e jaars CMD student aan de Hogeschool van Amsterdam (HvA)
- **GitHub-handle:** [MrSmarto](https://github.com/MrSmarto)

## Dankbetuigingen
- OpenStreetMap Contributors
- Centraal Bureau voor de Statistiek (CBS)
- Leaflet Community
- Svelte Community
