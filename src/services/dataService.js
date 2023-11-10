export async function fetchData() {
    try {
      const response = await fetch('https://opendata.cbs.nl/ODataApi/odata/37230ned/TypedDataSet');
      if (!response.ok) throw new Error('Netwerk response was niet ok');
      
      const dataset = await response.json();
      return dataset.value; // Of verdere verwerking afhankelijk van je behoeften
    } catch (error) {
      console.error('Fout bij het ophalen van de data:', error);
      return [];
    }
  }
  