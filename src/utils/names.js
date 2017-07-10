const names = {
  'Luke Skywalker': {
     emblem: 'rebel'
   },
  'C-3PO': {
     emblem: 'rebel'
   },
  'R2-D2': {
     emblem: 'rebel'
   },
  'Darth Vader': {
     emblem: 'empire'
   },
  'Leia Organa': {
     emblem: 'rebel'
   },
  'Owen Lars': {
     emblem: 'normal'
   },
  'Beru Whitesun lars': {
     emblem: 'normal'
   },
  'R5-D4': {
     emblem: 'rebel'
   },
  'Biggs Darklighter': {
     emblem: 'rebel'
   },
  'Obi-Wan Kenobi': {
     emblem: 'jedi'
   },
  'Anakin Skywalker': {
     emblem: 'jedi'
   },
  'Wilhuff Tarkin': {
     emblem: 'empire'
   },
  'Chewbacca': {
     emblem: 'rebel'
   },
  'Han Solo': {
     emblem: 'rebel'
   },
  'Greedo': {
     emblem: 'bounty'
   },
  'Jabba Desilijic Tiure': {
     emblem: 'bounty'
   },
  'Wedge Antilles': {
     emblem: 'rebel'
   },
  'Jek Tono Porkins': {
     emblem: 'rebel'
   },
  'Yoda': {
     emblem: 'jedi'
   },
  'Palpatine': {
     emblem: 'empire'
   },
  'Boba Fett': {
     emblem: 'bounty'
   },
  'IG-88': {
     emblem: 'bounty'
   },
  'Bossk': {
     emblem: 'bounty'
   },
  'Lando Calrissian': {
     emblem: 'rebel'
   },
  'Lobot': {
     emblem: 'rebel'
   },
  'Ackbar': {
     emblem: 'rebel'
   },
  'Mon Mothma': {
     emblem: 'rebel'
   },
  'Arvel Crynyd': {
     emblem: 'rebel'
   },
  'Wicket Systri Warrick': {
     emblem: 'rebel'
   },
  'Nien Nunb': {
     emblem: 'rebel'
   },
  'Qui-Gon Jinn': {
     emblem: 'jedi'
   },
  'Nute Gunray': {
     emblem: 'trade'
   },
  'Finis Valorum': {
     emblem: 'republic'
   },
  'Jar Jar Binks': {
     emblem: 'republic'
   },
  'Roos Tarpals': {
     emblem: 'republic'
   },
  'Rugor Nass': {
     emblem: 'republic'
   },
  'Ric Olié': {
     emblem: 'republic'
   },
  'Watto': {
     emblem: 'normal'
   },
  'Sebulba': {
     emblem: 'normal'
   },
  'Quarsh Panaka': {
     emblem: 'republic'
   },
  'Shmi Skywalker': {
     emblem: 'normal'
   },
  'Darth Maul': {
     emblem: 'sith'
   },
  'Bib Fortuna': {
     emblem: 'bounty'
   },
  'Ayla Secura': {
     emblem: 'jedi'
   },
  'Dud Bolt': {
     emblem: 'normal'
   },
  'Gasgano': {
     emblem: 'normal'
   },
  'Ben Quadinaros': {
     emblem: 'normal'
   },
  'Mace Windu': {
     emblem: 'jedi'
   },
  'Ki-Adi-Mundi': {
     emblem: 'jedi'
   },
  'Kit Fisto': {
     emblem: 'jedi'
   },
  'Eeth Koth': {
     emblem: 'jedi'
   },
  'Adi Gallia': {
     emblem: 'jedi'
   },
  'Saesee Tiin': {
     emblem: 'jedi'
   },
  'Yarael Poof': {
     emblem: 'jedi'
   },
  'Plo Koon': {
     emblem: 'jedi'
   },
  'Mas Amedda': {
     emblem: 'empire'
   },
  'Gregar Typho': {
     emblem: 'republic'
   },
  'Cordé': {
     emblem: 'republic'
   },
  'Cliegg Lars': {
     emblem: 'normal'
   },
  'Poggle the Lesser': {
     emblem: 'trade'
   },
  'Luminara Unduli': {
     emblem: 'jedi'
   },
  'Barriss Offee': {
     emblem: 'jedi'
   },
  'Dormé': {
     emblem: 'republic'
   },
  'Dooku': {
     emblem: 'sith'
   },
  'Bail Prestor Organa': {
     emblem: 'republic'
   },
  'Jango Fett': {
     emblem: 'bounty'
   },
  'Zam Wesell': {
     emblem: 'bounty'
   },
  'Dexter Jettster': {
     emblem: 'normal'
   },
  'Lama Su': {
     emblem: 'normal'
   },
  'Taun We': {
     emblem: 'normal'
   },
  'Jocasta Nu': {
     emblem: 'jedi'
   },
  'Ratts Tyerell': {
     emblem: 'normal'
   },
  'R4-P17': {
     emblem: 'republic'
   },
  'Wat Tambor': {
     emblem: 'trade'
   },
  'San Hill': {
     emblem: 'trade'
   },
  'Shaak Ti': {
     emblem: 'jedi'
   },
  'Grievous': {
     emblem: 'trade'
   },
  'Tarfful': {
     emblem: 'republic'
   },
  'Raymus Antilles': {
     emblem: 'rebel'
   },
  'Sly Moore': {
     emblem: 'empire'
   },
  'Tion Medon': {
     emblem: 'normal'
   },
  'Finn': {
     emblem: 'new'
   },
  'Rey': {
     emblem: 'new'
   },
  'Poe Dameron': {
     emblem: 'new'
   },
  'BB8': {
     emblem: 'new'
   },
  'Captain Phasma': {
     emblem: 'first'
   },
  'Padmé Amidala': {
     emblem: 'republic'
   },
  'Sand Crawler': {
    emblem: 'blueprint3'
    },
  'T-16 skyhopper': {
    emblem: 'blueprint3'
    },
  'X-34 landspeeder': {
    emblem: 'blueprint3'
    },
  'TIE/LN starfighter': {
    emblem: 'blueprint'
    },
  'Snowspeeder': {
    emblem: 'blueprint3'
    },
  'TIE bomber': {
    emblem: 'blueprint'
    },
  'AT-AT': {
    emblem: 'blueprint'
    },
  'AT-ST': {
    emblem: 'blueprint'
    },
  'Storm IV Twin-Pod cloud car': {
    emblem: 'blueprint'
    },
  'Sail barge': {
    emblem: 'blueprint'
    },
  'Bantha-II cargo skiff': {
    emblem: 'blueprint'
    },
  'TIE/IN interceptor': {
    emblem: 'blueprint'
    },
  'Imperial Speeder Bike': {
    emblem: 'blueprint'
    },
  'Vulture Droid': {
    emblem: 'blueprint'
    },
  'Multi-Troop Transport': {
    emblem: 'blueprint'
    },
  'Armored Assault Tank': {
    emblem: 'blueprint3'
    },
  'Single Trooper Aerial Platform': {
    emblem: 'blueprint'
    },
  'C-9979 landing craft': {
    emblem: 'blueprint'
    },
  'Tribubble bongo': {
    emblem: 'blueprint3'
    },
  'Sith speeder': {
    emblem: 'blueprint'
    },
  'Zephyr-G swoop bike': {
    emblem: 'blueprint3'
    },
  'Koro-2 Exodrive airspeeder': {
    emblem: 'blueprint'
    },
  'XJ-6 airspeeder': {
    emblem: 'blueprint3'
    },
  'LAAT/i': {
    emblem: 'blueprint3'
    },
  'LAAT/c': {
    emblem: 'blueprint3'
    },
  'Tsmeu-6 personal wheel bike': {
    emblem: 'blueprint3'
    },
  'Emergency Firespeeder': {
    emblem: 'blueprint3'
    },
  'Droid tri-fighter' : {
    emblem: 'blueprint3'
  },
  'Oevvaor jet catamaran' : {
    emblem: 'blueprint3'
  },
  'Raddaugh Gnasp fluttercraft' : {
    emblem: 'blueprint3'
  },
  'Clone turbo tank': {
    emblem: 'newRepublic'
    },
  'Corporate Alliance tank droid': {
    emblem: 'newRepublic'
    },
  'Droid gunship': {
    emblem: 'blueprint3'
    },
  'AT-RT': {
    emblem: 'blueprint'
    },
  'AT-TE': {
    emblem: 'blueprint'
    },
  'SPHA': {
    emblem: 'blueprint'
    },
  'Flitknot speeder' : {
    emblem: 'blueprint3'
  },
  'Neimoidian shuttle' : {
    emblem: 'blueprint3'
  },
  'Geonosian starfighter' : {
    emblem: 'blueprint3'
  },
};

export default names;
