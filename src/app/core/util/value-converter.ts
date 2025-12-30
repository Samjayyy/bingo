export interface BingoValue {
  word: string;
  imgName?: string;
  description?: string;
}

export interface ValueConverter {
  getValue(valueIx: number): BingoValue;
  getFixedValueCount(): number | undefined;
}

export function getValueOutputter(factoryString: string): ValueConverter {
  switch (factoryString.toLocaleLowerCase()) {
    case "nye26":
    case "puursbende":
      return new DictValueOutputter(puursBendeWords);
    default:
      return new NumberValueOutputter();
  }
}

class NumberValueOutputter implements ValueConverter {
  getValue(valueIx: number): BingoValue {
    return {
      word: "" + (valueIx + 1),
    };
  }
  getFixedValueCount(): number | undefined {
    return undefined;
  }
}

class DictValueOutputter implements ValueConverter {
  constructor(private readonly dict: BingoValue[]) {}

  getValue(index: number): BingoValue {
    if (index >= 0 && index < this.dict.length) {
      return this.dict[index];
    }
    return {
      word: "Bal " + (1 + index),
    };
  }

  getFixedValueCount(): number | undefined {
    return this.dict.length;
  }
}

const puursBendeWords: BingoValue[] = [
  {
    word: "1989",
    description: "For one second during 1989, the time was 01:23:45, 6-7-89",
    imgName: "1989.png",
  },
  {
    word: "1990",
    description: "Since this year we are watching home alone.",
    imgName: "homealone.jpeg",
  },
  {
    word: "4We A",
    description: "The Kathy on the picture is not our favorite Kathy!",
    imgName: "4wea.jpg",
  },
  {
    word: "Ann VG",
    description: "For some it is family, for others it could have been family but for most a classmate.",
    imgName: "erikannvg.jpg",
  },
  {
    word: "Antoon Van Dyck",
    description: "Some people lived there, others first met.",
    imgName: "lise-sam.jpg",
  },
  {
    word: "Aperol",
    description:
      "Losing money never felt more fun. But next year will be better!",
    imgName: "aperol.jpg",
  },
  {
    word: "Barcelona",
    description:
      "Origin of the story where Latina girl and Beejbs started mingling into a Latina Baby Girl",
    imgName: "barcelona.jpg",
  },
  {
    word: "Bella Grotta",
    description:
      "Meaning may differ from a nice cave to an apres-ski craving place.",
    imgName: "bellagrotta.jpg",
  },
  {
    word: "Biechtstoel",
    description:
      "One of the most memorable nights for the team followed by one of the most memorable for another.",
    imgName: "eviwoeter.jpg",
  },
  {
    word: "Camping",
    description: "Picture originates from a time where Vinny was not aware of wild boars yet. And Kathy drank 2 at a time.",
    imgName: "camping.jpg",
  },
  {
    word: "Chiro",
    description: ".. cacao, afgelekte frisco.",
    imgName: "chiro.jpg",
  },
  {
    word: "Contacts",
    description: "Over 50% of adults need vision correction (also in our group). Since ancient times, poor vision often didn't stop people from finding mates and having children.",
    imgName: "lenses.jpg",
  },
  {
    word: "Cooking",
    description: "Diner parties know no borders!",
    imgName: "komeneten.jpg",
  },
  {
    word: "Dancing",
    description: "Either as a hobby, a diva or the druncle.",
    imgName: "dancing.jpg",
  },
  {
    word: "Diegem Cross",
    description: "Place where we exposed a Peruvian girl to Belgian heritage.",
    imgName: "cycling2.jpg",
  },
  {
    word: "Eeuwfeest",
    description:
      "Cafe Marina, Cafe Excelsior, but more importantly the first home to the early birds that moved out first.",
    imgName: "bolivia.jpg",
  },
  {
    word: "Excelsioor",
    imgName: "excelsioor.jpg",
  },
  {
    word: "Family of 6",
    description:
      "The most recent birth number for Belgium dropped to 1.4. Huge contrast with this group where the majority comes from a family of 6.",
    imgName: "familyof6.jpg",
  },
  {
    word: "Fararmer",
    description:
      "When you write exactly how you speak. Je suis un pillampe. (No people were intentionally hurt in this picture)",
    imgName: "fararmer.jpg",
  },
  {
    word: "Frankreis",
    description:
      "Lacanau, Vendee, Entraiges sur la sorgue, ..., Sauveterre-De-Guyenne, TBC",
    imgName: "frankreis25.jpg",
  },
  {
    word: "Gamers",
    description:
      ".. on the board. Azul, Carcasonne, 7 Wonders, Quix, Catan, .. And even played Monopoly before Vinny started at Waterland.",
    imgName: "gamers2.jpg",
  },
  {
    word: "Girlsnight",
    description:
      "Looks fine, but I only know it as a boysnight enabler.",
    imgName: "girlsnight.jpg",
  },
  {
    word: "Groentenboer",
    description: "Zij is de dochter van de groentenboer..",
    imgName: "groentenboeren.jpg",
  },
  {
    word: "Heilige Familie",
    description: "Just a random school name.",
    imgName: "heiligefamilie.jpg",
  },
  {
    word: "ID Card",
    description: "Collectors item, Gotta catch'em all",
    imgName: "idbeejbspart.jpg",
  },
  {
    word: "Jazaki",
    description: "Youth bar for all ages.",
    imgName: "jazaki03.jpg",
  },
  {
    word: "JOC",
    description: "If you stayed long enough you started seeing double",
    imgName: "joc.jpg",
  },
  {
    word: "Jommekes",
    description: "Not to be mistaken by Tommeke.",
    imgName: "samsibjom.jpg",
  },
  {
    word: "Kadee",
    description: "Party place, but often the start of a good story.",
    imgName: "kadee-anvers.jpg",
  },
  {
    word: "Keeper",
    description:
      "In a team of 11 there is only 1 keeper. Here 3 out of 6 being ex-goal keepers is one of many anomalies in this group.",
    imgName: "keeper.PNG",
  },
  {
    word: "Klein Mechelen",
    description:
      "The boys of the group that never lived in the theo andriesstraat can be found here.",
    imgName: "kleinmechelen.jpg",
  },
  {
    word: "Kom af",
    description: "KOM AF JONGERS!",
    imgName: "komaf.jpg",
  },
  {
    word: "Lacanau",
    description: "Your music is too strong!",
    imgName: "lacanau2.jpg",
  },
  {
    word: "Madrid",
    description:"Supporting Madrid decades before Beejbs and Priscilla",
    imgName:"joleisamold.JPG",
  },
  {
    word: "MVDP",
    description:
      '1 person has a very big impact on the average fan-percentage, who is also known for shouting "Aourt Wout, Aourt!"',
    imgName: "mvdp.jpg",
  },
  {
    word: "Meureg",
    description:
      '"Amai ik zen nog nooit zo meureg geweest.". Theorethically it is possible to every time be the most drunk in your life (so far). This might be your first example of a limit -> infinity since integral maths at school.',
    imgName: "nooitzomeureg.jpg",
  },
  {
    word: "Nosmoke",
    description: "The only thing that is being smoked in the group is meat.",
    imgName: "ofyr.jpg",
  },
  {
    word: "Pablo",
    description:
      "The god, the myth, the legend. When Pablo would visit the Virgin Islands, they will have to be renamed.",
    imgName: "pablo.PNG",
  },
  {
    word: "Padel",
    description:"Rumors say we brought the sport from Spain to Belgium.",
    imgName: "padel.jpg",
  },
  {
    word: "Papitos",
    description: "Si, si, muchos papitos.",
    imgName: "randombeejbs.jpg",
  },
  {
    word: "Sportnamiddag",
    description: "Passieve Sportnamiddag. Since 1 feb 2015, but still peaking.",
    imgName: "passievesport.JPG",
  },
  {
    word: "Peru",
    description: "País de nacimiento, pero también visitado varias veces.",
    imgName: "peru.jpg",
  },
  {
    word: "Ploegfeestje",
    description:
      "A group of people being smart enough to gather at the place with the least rules and constraints.",
    imgName: "ploegfeestje.jpg",
  },
  {
    word: "Pokemon",
    description: "For people who wanted to be the very best.",
    imgName: "pokemon.jpg",
  },
  {
    word: "Red Devils",
    description: "The golden generation of red devils fans",
    imgName: "reddevils.jpg",
  },
  {
    word: "Rik",
    description: "Arguably the only capable trainer, leaving in a soap-worthy fashion.",
    imgName: "derik.jpg",
  },
  {
    word: "Running",
    description:
      "The eldest man to ever run a marathon was 101. So plenty of years left for some running.",
    imgName: "running.jpg",
  },
  {
    word: "Schwank",
    description: "Connecting people since kindergarten",
    imgName: "ja-mp.jpg",
  },
  {
    word: "Science",
    description:
      "Aside a lot of science related studies, some wonders were also created with a bump of science.",
    imgName: "fertility2.jpg",
  },
  {
    word: "Scouts",
    description: "To my knowledge mainly known for 'Balken Sjorren'",
    imgName: "scouts.jpg",
  },
  {
    word: "Siberus",
    description: "MVP in arranging group activities/festivities since ever.",
    imgName: "siberus.jpg",
  },
  {
    word: "Sint Antonius",
    description: "Longest privately held road within the group.",
    imgName: "sintantonius.jpg",
  },
  {
    word: "Gent",
    description:'This hipster town was also the first home for some.',    
    imgName:"lisebeejbs.jpg",
  },
  {
    word: "Sjabi",
    description:
      "Also learned that if the classroom smells like shit, it can be because there is shit in the classroom.",
    imgName: "3wea.jpg",
  },
  {
    word: "Ski",
    description: "Extra fun with a friend who always delivers.",
    imgName: "ovale-samenvatting.png",
  },
  {
    word: "Studio 100",
    description: "Er zit meer in een liedje dan je denkt!",
    imgName: "samsonsib.jpg",
  },
  {
    word: "Swim",
    description: "Though it's refreshing, the target should remain to replace the water with money.",
    imgName: "swimming.png",
  },
  {
    word: "Tank",
    description:
      "Facilitating transportation during night out for the boys, others may rather relate to the picture.",
    imgName: "detank.jpg",
  },
  {
    word: "Teachers",
    description: "Somewhere between having too many holidays and having to spend more time explaining why not.",
    imgName: "teachers.jpg",
  },
  {
    word: "Theo Andries",
    description: "Most famous street to live within the group by margin",
    imgName: "theoandries.jpg",
  },
  {
    word: "Van Barel",
    description: "The music was my first love",
    imgName: "vanbarel.png",
  },
  {
    word: "Veige",
    description: "Note that meanwhile the outfits are a lidl better.",
    imgName: "smeirigsteentje.jpg",
  },
  {
    word: "Velo",
    description:
      "Always fun to share an estimate price of your bike per driven km.",
    imgName: "cycling.jpg",
  },
  {
    word: "Zuiver",
    description: "For some the part with the ball was too much",
    imgName: "zuiver.jpg",
  },
];
