export interface DataStructure {
    [key: string]: {
      [key: string]: string[];
    };
  }
  
export const data: DataStructure = {
    "Addis Ababa": {
      Kirkos: ["woreda 1", "woreda 2"],
      Bole: ["woreda 11", "woreda 12"],
      Yeka: ["woreda 21", "woreda 22"],
      Lideta: ["woreda 31", "woreda 32"],
      Arada: ["woreda 33", "woreda 34"],
      Gullele: ["woreda 1", "woreda 2","woreda 3","woreda 4","woreda 5","woreda 6","woreda 7","woreda 8","woreda 9"],
      
      "Kolfe-Keranio": ["woreda 51", "woreda 52"],
      "Nifas Silk-Lafto": ["woreda 61", "woreda 62"],
      "Addis Ketema": ["woreda 71", "woreda 72"],
      "Akaky Kaliti": ["woreda 81", "woreda 82"],
    },
    Afar: {
      Semera: ["dokira", "Chifra"],
      Awash: ["Awash", "Dubti"],
    },
    Amhara: {
      Bahirdar: ["Bahirdar", "Gondar"],
      "Debre Markos": ["Debre Markos", "Finote Selam"],
    },
    "Benishangul-Gumuz": {
      Assosa: ["Assosa", "Kamashi"],
    },
    "Dire Dawa": {
      "Dire Dawa": ["Dire Dawa", "Goro"],
    },
    Gambela: {
      Gambela: ["Gambela", "Abobo"],
    },
    Harari: {
      Harar: ["Harar", "Jugol"],
    },
    Oromia: {
      "Addis Alem": ["Addis Alem", "Bako"],
      Jimma: ["Jimma", "Agaro"],
      Nekemte: ["Nekemte", "Gida Ayana"],
    },
    Sidama: {
      Hawassa: ["Hawassa", "Yirgalem"],
    },
    Somali: {
      Jijiga: ["Jijiga", "Degahabur"],
    },
    "Southern Nations, Nationalities, and Peoples'": {
      Hossana: ["Hossana", "Durame"],
      "Arba Minch": ["Arba Minch", "Chencha"],
    },
    Tigray: {
      Mekelle: ["Mekelle", "Adwa"],
    },
  };

  export {};
