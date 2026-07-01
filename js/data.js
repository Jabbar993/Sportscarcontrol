const SCC_PHASES={
  GREEN:{label:'Green',color:'#18b957'},
  LOCAL_YELLOW:{label:'Local Yellow',color:'#ffeb00'},
  FCY:{label:'FCY',color:'#f0c13a'},
  SLOW_ZONE:{label:'Slow Zone',color:'#f0c13a',pattern:true},
  VSC:{label:'VSC',color:'#f6a022'},
  SC:{label:'SC',color:'#f28a22'},
  CODE_60:{label:'Code 60',color:'#a855f7'},
  RED:{label:'Red',color:'#e31b2f'}
};

const SCC_FLAG_SVGS={
  it:`<svg viewBox="0 0 3 2"><path fill="#009246" d="M0 0h1v2H0z"/><path fill="#fff" d="M1 0h1v2H1z"/><path fill="#ce2b37" d="M2 0h1v2H2z"/></svg>`,
  be:`<svg viewBox="0 0 3 2"><path fill="#000" d="M0 0h1v2H0z"/><path fill="#fae042" d="M1 0h1v2H1z"/><path fill="#ed2939" d="M2 0h1v2H2z"/></svg>`,
  fr:`<svg viewBox="0 0 3 2"><path fill="#0055a4" d="M0 0h1v2H0z"/><path fill="#fff" d="M1 0h1v2H1z"/><path fill="#ef4135" d="M2 0h1v2H2z"/></svg>`,
  de:`<svg viewBox="0 0 3 2"><path fill="#000" d="M0 0h3v.667H0z"/><path fill="#dd0000" d="M0 .667h3v.666H0z"/><path fill="#ffce00" d="M0 1.333h3V2H0z"/></svg>`,
  es:`<svg viewBox="0 0 3 2"><path fill="#aa151b" d="M0 0h3v2H0z"/><path fill="#f1bf00" d="M0 .5h3v1H0z"/></svg>`,
  jp:`<svg viewBox="0 0 3 2"><path fill="#fff" d="M0 0h3v2H0z"/><circle cx="1.5" cy="1" r=".55" fill="#bc002d"/></svg>`,
  us:`<svg viewBox="0 0 190 100"><rect width="190" height="100" fill="#b22234"/><g fill="#fff"><rect y="7.69" width="190" height="7.69"/><rect y="23.08" width="190" height="7.69"/><rect y="38.46" width="190" height="7.69"/><rect y="53.85" width="190" height="7.69"/><rect y="69.23" width="190" height="7.69"/><rect y="84.62" width="190" height="7.69"/></g><rect width="76" height="53.85" fill="#3c3b6e"/><g fill="#fff"><circle cx="9" cy="8" r="2"/><circle cx="22" cy="8" r="2"/><circle cx="35" cy="8" r="2"/><circle cx="48" cy="8" r="2"/><circle cx="61" cy="8" r="2"/><circle cx="15.5" cy="18" r="2"/><circle cx="28.5" cy="18" r="2"/><circle cx="41.5" cy="18" r="2"/><circle cx="54.5" cy="18" r="2"/><circle cx="67.5" cy="18" r="2"/><circle cx="9" cy="28" r="2"/><circle cx="22" cy="28" r="2"/><circle cx="35" cy="28" r="2"/><circle cx="48" cy="28" r="2"/><circle cx="61" cy="28" r="2"/><circle cx="15.5" cy="38" r="2"/><circle cx="28.5" cy="38" r="2"/><circle cx="41.5" cy="38" r="2"/><circle cx="54.5" cy="38" r="2"/><circle cx="67.5" cy="38" r="2"/></g></svg>`,
  gb:`<svg viewBox="0 0 60 30"><clipPath id="g"><path d="M0 0h60v30H0z"/></clipPath><path fill="#012169" d="M0 0h60v30H0z"/><path stroke="#fff" stroke-width="6" d="M0 0l60 30M60 0L0 30"/><path stroke="#c8102e" stroke-width="4" d="M0 0l60 30M60 0L0 30" clip-path="url(#g)"/><path stroke="#fff" stroke-width="10" d="M30 0v30M0 15h60"/><path stroke="#c8102e" stroke-width="6" d="M30 0v30M0 15h60"/></svg>`,
  za:`<svg viewBox="0 0 60 40"><path fill="#de3831" d="M0 0h60v20H0z"/><path fill="#002395" d="M0 20h60v20H0z"/><path fill="#fff" d="M0 0l30 20L0 40h12l30-20L12 0z"/><path fill="#ffb612" d="M0 5l22.5 15L0 35z"/><path fill="#007a4d" d="M0 8l18 12L0 32h14l22-12L14 8z"/><path fill="#000" d="M0 10l15 10L0 30z"/></svg>`,
  pl:`<svg viewBox="0 0 3 2"><path fill="#fff" d="M0 0h3v1H0z"/><path fill="#dc143c" d="M0 1h3v1H0z"/></svg>`,
  cn:`<svg viewBox="0 0 30 20"><path fill="#de2910" d="M0 0h30v20H0z"/><text x="5" y="8" fill="#ffde00" font-size="6">★</text><text x="11" y="4" fill="#ffde00" font-size="2">★</text><text x="13" y="7" fill="#ffde00" font-size="2">★</text><text x="13" y="10" fill="#ffde00" font-size="2">★</text><text x="11" y="13" fill="#ffde00" font-size="2">★</text></svg>`,
  nl:`<svg viewBox="0 0 3 2"><path fill="#ae1c28" d="M0 0h3v.667H0z"/><path fill="#fff" d="M0 .667h3v.666H0z"/><path fill="#21468b" d="M0 1.333h3V2H0z"/></svg>`,
  br:`<svg viewBox="0 0 28 20"><path fill="#009b3a" d="M0 0h28v20H0z"/><path fill="#ffdf00" d="M14 2l11 8-11 8-11-8z"/><circle cx="14" cy="10" r="4.2" fill="#002776"/></svg>`,
  au:`<svg viewBox="0 0 60 30"><path fill="#00008b" d="M0 0h60v30H0z"/><g transform="scale(.45)"><path fill="#012169" d="M0 0h60v30H0z"/><path stroke="#fff" stroke-width="6" d="M0 0l60 30M60 0L0 30"/><path stroke="#c8102e" stroke-width="4" d="M0 0l60 30M60 0L0 30"/><path stroke="#fff" stroke-width="10" d="M30 0v30M0 15h60"/><path stroke="#c8102e" stroke-width="6" d="M30 0v30M0 15h60"/></g><text x="46" y="23" fill="#fff" font-size="9">★</text></svg>`,
  ch:`<svg viewBox="0 0 2 2"><path fill="#d52b1e" d="M0 0h2v2H0z"/><path fill="#fff" d="M.82 .35h.36v1.3H.82z"/><path fill="#fff" d="M.35 .82h1.3v.36H.35z"/></svg>`,
  at:`<svg viewBox="0 0 3 2"><path fill="#ed2939" d="M0 0h3v2H0z"/><path fill="#fff" d="M0 .666h3v.668H0z"/></svg>`,
  om:`<svg viewBox="0 0 3 2"><path fill="#fff" d="M0 0h3v.666H0z"/><path fill="#db161b" d="M0 .666h3v.668H0z"/><path fill="#00843d" d="M0 1.334h3V2H0z"/><path fill="#db161b" d="M0 0h.75v2H0z"/></svg>`,
  fi:`<svg viewBox="0 0 18 11"><path fill="#fff" d="M0 0h18v11H0z"/><path fill="#002f6c" d="M0 4h18v3H0zM5 0h3v11H5z"/></svg>`,
  ca:`<svg viewBox="0 0 4 2"><path fill="#f00" d="M0 0h1v2H0zm3 0h1v2H3z"/><path fill="#fff" d="M1 0h2v2H1z"/><text x="2" y="1.35" text-anchor="middle" fill="#f00" font-size=".7">✦</text></svg>`,
  dk:`<svg viewBox="0 0 37 28"><path fill="#c60c30" d="M0 0h37v28H0z"/><path fill="#fff" d="M12 0h4v28h-4zM0 12h37v4H0z"/></svg>`,
  mx:`<svg viewBox="0 0 3 2"><path fill="#006847" d="M0 0h1v2H0z"/><path fill="#fff" d="M1 0h1v2H1z"/><path fill="#ce1126" d="M2 0h1v2H2z"/></svg>`
};
const FLAG_ALIASES={Italy:'it',Belgium:'be',France:'fr',Germany:'de',Spain:'es',Japan:'jp',Poland:'pl',China:'cn','United States':'us',USA:'us','United Kingdom':'gb',UK:'gb',Britain:'gb','South Africa':'za',Netherlands:'nl',Brazil:'br',Australia:'au',Switzerland:'ch',Austria:'at',Oman:'om',Finland:'fi',Canada:'ca',Mexico:'mx',Denmark:'dk'};

/* v0.6.7.6 flag aliases and additional country SVGs */
Object.assign(SCC_FLAG_SVGS,{
  no:`<svg viewBox="0 0 22 16"><path fill="#ba0c2f" d="M0 0h22v16H0z"/><path fill="#fff" d="M6 0h4v16H6zM0 6h22v4H0z"/><path fill="#00205b" d="M7 0h2v16H7zM0 7h22v2H0z"/></svg>`,
  se:`<svg viewBox="0 0 16 10"><path fill="#006aa7" d="M0 0h16v10H0z"/><path fill="#fecc00" d="M5 0h2v10H5zM0 4h16v2H0z"/></svg>`,
  tr:`<svg viewBox="0 0 30 20"><path fill="#e30a17" d="M0 0h30v20H0z"/><circle cx="12" cy="10" r="5" fill="#fff"/><circle cx="13.5" cy="10" r="4" fill="#e30a17"/><path fill="#fff" d="M19 7.2l.8 1.8 2-.2-1.5 1.3.6 1.9-1.7-1-1.7 1 .5-1.9-1.5-1.3 2 .2z"/></svg>`,
  ar:`<svg viewBox="0 0 5 3"><path fill="#75aadb" d="M0 0h5v3H0z"/><path fill="#fff" d="M0 1h5v1H0z"/><circle cx="2.5" cy="1.5" r=".22" fill="#f6b40e"/></svg>`,
  ua:`<svg viewBox="0 0 3 2"><path fill="#0057b7" d="M0 0h3v1H0z"/><path fill="#ffd700" d="M0 1h3v1H0z"/></svg>`,
  pe:`<svg viewBox="0 0 3 2"><path fill="#d91023" d="M0 0h1v2H0zm2 0h1v2H2z"/><path fill="#fff" d="M1 0h1v2H1z"/></svg>`,
  ec:`<svg viewBox="0 0 3 2"><path fill="#ffd100" d="M0 0h3v1H0z"/><path fill="#034ea2" d="M0 1h3v.5H0z"/><path fill="#ed1c24" d="M0 1.5h3V2H0z"/></svg>`,
  th:`<svg viewBox="0 0 30 20"><path fill="#a51931" d="M0 0h30v20H0z"/><path fill="#fff" d="M0 3h30v14H0z"/><path fill="#2d2a4a" d="M0 7h30v6H0z"/></svg>`,
  lu:`<svg viewBox="0 0 3 2"><path fill="#ed2939" d="M0 0h3v.667H0z"/><path fill="#fff" d="M0 .667h3v.666H0z"/><path fill="#00a1de" d="M0 1.333h3V2H0z"/></svg>`,
  nz:`<svg viewBox="0 0 60 30"><path fill="#00247d" d="M0 0h60v30H0z"/><g transform="scale(.45)"><path fill="#012169" d="M0 0h60v30H0z"/><path stroke="#fff" stroke-width="6" d="M0 0l60 30M60 0L0 30"/><path stroke="#c8102e" stroke-width="4" d="M0 0l60 30M60 0L0 30"/><path stroke="#fff" stroke-width="10" d="M30 0v30M0 15h60"/><path stroke="#c8102e" stroke-width="6" d="M30 0v30M0 15h60"/></g><text x="45" y="22" fill="#cc142b" stroke="#fff" stroke-width=".8" font-size="8">★</text></svg>`,
  cl:`<svg viewBox="0 0 3 2"><path fill="#fff" d="M0 0h3v1H0z"/><path fill="#d52b1e" d="M0 1h3v1H0z"/><path fill="#0039a6" d="M0 0h1.1v1H0z"/><text x=".55" y=".72" text-anchor="middle" fill="#fff" font-size=".55">★</text></svg>`,
  ie:`<svg viewBox="0 0 3 2"><path fill="#169b62" d="M0 0h1v2H0z"/><path fill="#fff" d="M1 0h1v2H1z"/><path fill="#ff883e" d="M2 0h1v2H2z"/></svg>`,
  cr:`<svg viewBox="0 0 5 3"><path fill="#002b7f" d="M0 0h5v3H0z"/><path fill="#fff" d="M0 .45h5v2.1H0z"/><path fill="#ce1126" d="M0 .9h5v1.2H0z"/></svg>`,
  hk:`<svg viewBox="0 0 3 2"><path fill="#de2910" d="M0 0h3v2H0z"/><text x="1.5" y="1.28" text-anchor="middle" fill="#fff" font-size="1">✿</text></svg>`,
  in:`<svg viewBox="0 0 3 2"><path fill="#ff9933" d="M0 0h3v.667H0z"/><path fill="#fff" d="M0 .667h3v.666H0z"/><path fill="#138808" d="M0 1.333h3V2H0z"/><circle cx="1.5" cy="1" r=".18" fill="#000080"/></svg>`
});
Object.assign(FLAG_ALIASES,{
  FRA:'fr',FR:'fr',DEU:'de',GER:'de',GBR:'gb',GB:'gb',USA:'us',US:'us',ITA:'it',IT:'it',ESP:'es',ES:'es',BEL:'be',BE:'be',NLD:'nl',HOL:'nl',NL:'nl',CHE:'ch',SUI:'ch',CH:'ch',DNK:'dk',DEN:'dk',DK:'dk',NOR:'no',NO:'no',SWE:'se',SE:'se',TUR:'tr',TR:'tr',ARG:'ar',AR:'ar',UKR:'ua',UA:'ua',PER:'pe',PE:'pe',ECU:'ec',EC:'ec',THA:'th',TH:'th',LUX:'lu',LU:'lu',NZL:'nz',NZ:'nz',CHL:'cl',CL:'cl',IRL:'ie',IE:'ie',CRC:'cr',CR:'cr',HKG:'hk',HK:'hk',IND:'in',IN:'in',ZAF:'za',RSA:'za',BRA:'br',BR:'br',AUS:'au',AU:'au',CAN:'ca',CA:'ca',MEX:'mx',MX:'mx',OMN:'om',OM:'om',FIN:'fi',FI:'fi',POL:'pl',PL:'pl',PRT:'pt',POR:'pt',PT:'pt',JPN:'jp',JP:'jp',CHN:'cn',CN:'cn',QAT:'qa',QA:'qa',ARE:'ae',UAE:'ae',AE:'ae',AUT:'at',AT:'at',
  Norway:'no',Sweden:'se',Turkey:'tr',Argentina:'ar',Ukraine:'ua',Peru:'pe',Ecuador:'ec',Thailand:'th',Luxembourg:'lu','New Zealand':'nz',Chile:'cl',Ireland:'ie','Costa Rica':'cr','Hong Kong':'hk',India:'in'
});

// Additional flags used by season skeletons
SCC_FLAG_SVGS.pt=`<svg viewBox="0 0 3 2"><path fill="#006600" d="M0 0h1.2v2H0z"/><path fill="#ff0000" d="M1.2 0H3v2H1.2z"/><circle cx="1.2" cy="1" r=".28" fill="#ffcc00"/></svg>`;
SCC_FLAG_SVGS.qa=`<svg viewBox="0 0 28 11"><path fill="#fff" d="M0 0h9v11H0z"/><path fill="#8a1538" d="M9 0h19v11H9z"/><path fill="#8a1538" d="M8 0l3 .6-3 .6 3 .6-3 .6 3 .6-3 .6 3 .6-3 .6 3 .6-3 .6 3 .6-3 .6V0z"/></svg>`;
SCC_FLAG_SVGS.bh=`<svg viewBox="0 0 5 3"><path fill="#fff" d="M0 0h2v3H0z"/><path fill="#ce1126" d="M2 0h3v3H2z"/><path fill="#ce1126" d="M1.8 0l.7 .3-.7 .3 .7 .3-.7 .3 .7 .3-.7 .3 .7 .3-.7 .3 .7 .3-.7 .3V0z"/></svg>`;
SCC_FLAG_SVGS.ae=`<svg viewBox="0 0 4 2"><path fill="#00732f" d="M1 0h3v.667H1z"/><path fill="#fff" d="M1 .667h3v.666H1z"/><path fill="#000" d="M1 1.333h3V2H1z"/><path fill="#f00" d="M0 0h1v2H0z"/></svg>`;
SCC_FLAG_SVGS.sa=`<svg viewBox="0 0 3 2"><path fill="#006c35" d="M0 0h3v2H0z"/><rect x=".65" y="1.25" width="1.7" height=".12" fill="#fff"/><text x="1.5" y=".9" fill="#fff" font-size=".42" text-anchor="middle">SA</text></svg>`;
SCC_FLAG_SVGS.ar=`<svg viewBox="0 0 3 2"><path fill="#74acdf" d="M0 0h3v.667H0zM0 1.333h3V2H0z"/><path fill="#fff" d="M0 .667h3v.666H0z"/><circle cx="1.5" cy="1" r=".16" fill="#f6b40e"/></svg>`;
SCC_FLAG_SVGS.nz=`<svg viewBox="0 0 60 30"><path fill="#00247d" d="M0 0h60v30H0z"/><g transform="scale(.45)"><path fill="#012169" d="M0 0h60v30H0z"/><path stroke="#fff" stroke-width="6" d="M0 0l60 30M60 0L0 30"/><path stroke="#c8102e" stroke-width="4" d="M0 0l60 30M60 0L0 30"/><path stroke="#fff" stroke-width="10" d="M30 0v30M0 15h60"/><path stroke="#c8102e" stroke-width="6" d="M30 0v30M0 15h60"/></g><text x="44" y="22" fill="#c8102e" stroke="#fff" stroke-width=".7" font-size="8">★</text></svg>`;
Object.assign(FLAG_ALIASES,{Portugal:'pt',Qatar:'qa',Bahrain:'bh','United Arab Emirates':'ae',UAE:'ae','Saudi Arabia':'sa',Argentina:'ar','New Zealand':'nz'});



/* v0.6.7.8 historical flags */
Object.assign(SCC_FLAG_SVGS,{
  ru:`<svg viewBox="0 0 3 2"><path fill="#fff" d="M0 0h3v.667H0z"/><path fill="#0039a6" d="M0 .667h3v.666H0z"/><path fill="#d52b1e" d="M0 1.333h3V2H0z"/></svg>`,
  by:`<svg viewBox="0 0 3 2"><path fill="#d22730" d="M0 0h3v1.35H0z"/><path fill="#00af66" d="M0 1.35h3V2H0z"/><path fill="#fff" d="M0 0h.35v2H0z"/></svg>`
});
Object.assign(FLAG_ALIASES,{Russia:'ru',Russian:'ru',RUS:'ru',RU:'ru','Russian Federation':'ru',Belarus:'by',BLR:'by',BY:'by'});

const CONSTRUCTORS=[
  {id:'ferrari',name:'Ferrari',category:'hypercar',short:'FER',logo:'assets/assetpack/constructors/ferrari.svg',fallbackColor:'#e41d2d'},
  {id:'porsche',name:'Porsche',category:'hypercar',short:'POR',logo:'assets/assetpack/constructors/porsche.svg',fallbackColor:'#111'},
  {id:'toyota',name:'Toyota',category:'hypercar',short:'TOY',logo:'assets/assetpack/constructors/toyota.svg',fallbackColor:'#e4002b'},
  {id:'cadillac',name:'Cadillac',category:'hypercar',short:'CAD',logo:'assets/assetpack/constructors/cadillac.svg',fallbackColor:'#ad8a3b'},
  {id:'bmw',name:'BMW',category:'hypercar',short:'BMW',logo:'assets/assetpack/constructors/bmw.svg',fallbackColor:'#1c69d4'},
  {id:'alpine',name:'Alpine',category:'hypercar',short:'ALP',logo:'assets/assetpack/constructors/alpine.png',fallbackColor:'#0087c6'},
  {id:'peugeot',name:'Peugeot',category:'hypercar',short:'PEU',logo:'assets/assetpack/constructors/peugeot.svg',fallbackColor:'#111'},
  {id:'astonmartin',name:'Aston Martin',category:'hypercar',short:'AMR',logo:'assets/assetpack/constructors/astonmartin.png',fallbackColor:'#00665e'},
  {id:'lamborghini',name:'Lamborghini',category:'hypercar',short:'LAM',logo:'assets/assetpack/constructors/lamborghini.svg',fallbackColor:'#d4af37'},
  {id:'glickenhaus',name:'Glickenhaus',category:'hypercar',short:'GLI',logo:'assets/constructors/hypercar/glickenhaus.svg',fallbackColor:'#a00'},
  {id:'isotta',name:'Isotta Fraschini',category:'hypercar',short:'ISO',logo:'assets/constructors/hypercar/isotta.svg',fallbackColor:'#444'},
  {id:'vanwall',name:'Vanwall',category:'hypercar',short:'VAN',logo:'assets/constructors/hypercar/vanwall.svg',fallbackColor:'#064'},
  {id:'oreca',name:'Oreca',category:'prototype',short:'ORC',logo:'assets/assetpack/constructors/oreca.svg',fallbackColor:'#0057b8'},
  {id:'ligier',name:'Ligier',category:'prototype',short:'LIG',logo:'assets/assetpack/constructors/ligier.png',fallbackColor:'#1f4b99'},
  {id:'duqueine',name:'Duqueine',category:'prototype',short:'DUQ',logo:'assets/assetpack/constructors/duqueine.png',fallbackColor:'#263b80'},
  {id:'adess',name:'Adess',category:'prototype',short:'ADS',logo:'assets/assetpack/constructors/adess.png',fallbackColor:'#6750a4'},
  {id:'ginetta',name:'Ginetta',category:'prototype',short:'GIN',logo:'assets/assetpack/constructors/ginetta.png',fallbackColor:'#7f3fbf'},
  {id:'mercedes',name:'Mercedes-AMG',category:'gt',short:'AMG',logo:'assets/assetpack/constructors/mercedes.svg',fallbackColor:'#00a19c'},
  {id:'mclaren',name:'McLaren',category:'gt',short:'MCL',logo:'assets/assetpack/constructors/mclaren.svg',fallbackColor:'#ff8000'},
  {id:'corvette',name:'Corvette',category:'gt',short:'COR',logo:'assets/assetpack/constructors/corvette.svg',fallbackColor:'#c00'},
  {id:'lexus',name:'Lexus',category:'gt',short:'LEX',logo:'assets/assetpack/constructors/lexus.svg',fallbackColor:'#888'},
  {id:'ford',name:'Ford',category:'gt',short:'FOR',logo:'assets/assetpack/constructors/ford.svg',fallbackColor:'#003478'},
  {id:'audi',name:'Audi',category:'gt',short:'AUD',logo:'assets/assetpack/constructors/audi.svg',fallbackColor:'#d00000'},
  {id:'alfa-romeo',name:'Alfa Romeo',category:'gt',short:'ALF',logo:'assets/assetpack/constructors/alfa-romeo.png',fallbackColor:'#a51d2d'},
  {id:'hyundai',name:'Hyundai',category:'gt',short:'HYU',logo:'assets/assetpack/constructors/hyundai.png',fallbackColor:'#002c5f'},
  {id:'chevrolet',name:'Chevrolet',category:'gt',short:'CHE',logo:'assets/assetpack/constructors/chevrolet.svg',fallbackColor:'#d6a629'}
];

const SERIES={
  wec:{name:'FIA World Endurance Championship',short:'WEC',logo:'assets/assetpack/series/wec.png',phases:['GREEN','LOCAL_YELLOW','SLOW_ZONE','FCY','VSC','SC','RED'],classes:{HYP:{label:'Hypercar',short:'HYP',color:'#c8102e',text:'#fff'},LMP2:{label:'LMP2',short:'LMP2',color:'#0057b8',text:'#fff'},LMP2PA:{label:'LMP2 Pro/Am',short:'LMP2 P/A',color:'#5ec5ff',text:'#071014'},LMGT3:{label:'LMGT3',short:'LMGT3',color:'#00a651',text:'#071014'}}},
  imsa:{name:'IMSA WeatherTech SportsCar Championship',short:'IMSA',logo:'assets/assetpack/series/imsa.png',phases:['GREEN','SC','RED'],classes:{GTP:{label:'GTP',short:'GTP',color:'#111',text:'#fff'},GTD_PRO:{label:'GTD PRO',short:'GTD PRO',color:'#c8102e',text:'#fff'},GTD:{label:'GTD',short:'GTD',color:'#00a651',text:'#071014'}}},
  gtwc:{name:'GT World Challenge Europe',short:'GTWC EU',logo:'assets/assetpack/series/gtwc.svg',phases:['GREEN','LOCAL_YELLOW','FCY','SC','RED'],classes:{PRO:{label:'Pro',short:'PRO',color:'#f2f2f2',text:'#111'},GOLD:{label:'Gold',short:'GOLD',color:'#f2c230',text:'#111'},SILVER:{label:'Silver',short:'SILVER',color:'#2d8cff',text:'#fff'},BRONZE:{label:'Bronze',short:'BRONZE',color:'#c66a28',text:'#fff'},PROAM:{label:'Pro-Am',short:'PRO-AM',color:'#00a651',text:'#071014'}}},
  gtwc_us:{name:'GT World Challenge America',short:'GTWC USA',logo:'assets/assetpack/series/gtwc_us.svg',phases:['GREEN','LOCAL_YELLOW','FCY','SC','RED'],classes:{PRO:{label:'Pro',short:'PRO',color:'#f2f2f2',text:'#111'},PROAM:{label:'Pro-Am',short:'PRO-AM',color:'#00a651',text:'#071014'},AM:{label:'Am',short:'AM',color:'#c66a28',text:'#fff'}}},
  elms:{name:'European Le Mans Series',short:'ELMS',logo:'assets/assetpack/series/elms.png',phases:['GREEN','LOCAL_YELLOW','FCY','VSC','SC','RED'],classes:{LMP2:{label:'LMP2',short:'LMP2',color:'#0057b8',text:'#fff'},LMP2PA:{label:'LMP2 Pro/Am',short:'LMP2 P/A',color:'#5ec5ff',text:'#071014'},LMP3:{label:'LMP3',short:'LMP3',color:'#7f3fbf',text:'#fff'},LMGT3:{label:'LMGT3',short:'LMGT3',color:'#00a651',text:'#071014'}}},
  mlmc:{name:'Michelin Le Mans Cup',short:'MLMC',logo:'assets/assetpack/series/mlmc.png',phases:['GREEN','LOCAL_YELLOW','SLOW_ZONE','FCY','VSC','SC','RED'],classes:{LMP3:{label:'LMP3',short:'LMP3',color:'#7f3fbf',text:'#fff'},GT3:{label:'GT3',short:'GT3',color:'#00a651',text:'#071014'}}},
  aslms:{name:'Asian Le Mans Series',short:'Asian LMS',logo:'assets/assetpack/series/aslms.png',phases:['GREEN','LOCAL_YELLOW','FCY','VSC','SC','RED'],classes:{LMP2:{label:'LMP2',short:'LMP2',color:'#0057b8',text:'#fff'},LMP3:{label:'LMP3',short:'LMP3',color:'#7f3fbf',text:'#fff'},GT:{label:'GT',short:'GT',color:'#00a651',text:'#071014'}}},
  gtopen:{name:'International GT Open',short:'GT Open',logo:'assets/assetpack/series/gtopen.png',phases:['GREEN','LOCAL_YELLOW','FCY','SC','RED'],classes:{PRO:{label:'Pro',short:'PRO',color:'#f2f2f2',text:'#111'},PROAM:{label:'Pro-Am',short:'PRO-AM',color:'#00a651',text:'#071014'},AM:{label:'Am',short:'AM',color:'#c66a28',text:'#fff'}}},
  creventic:{name:'24H Series',short:'24H Series',logo:'assets/assetpack/series/creventic.png',phases:['GREEN','CODE_60','RED'],classes:{GT3:{label:'GT3',short:'GT3',color:'#00a651',text:'#071014'},GTX:{label:'GTX',short:'GTX',color:'#7f3fbf',text:'#fff'},TCR:{label:'TCR',short:'TCR',color:'#2d8cff',text:'#fff'},TCX:{label:'TCX',short:'TCX',color:'#f2c230',text:'#111'}}}
};


function makeGreenRace({id,season,round,series,event,circuit,country,date,duration='04:00:00',official=null,laps=100,entries=null}){
  const officialDuration=official||duration;
  return {id,season,round,series,event,circuit,country,date,scheduledDuration:duration,officialDuration,scheduledLaps:laps,officialLaps:laps+1,
    segments:[{id:'g0',phase:'GREEN',start:0,end:parseRaceTime(officialDuration),startLap:0,endLap:laps+1,reason:'Draft race shell',notes:'Skeleton race: add real Race Control segments when data is available.'}],
    entries: entries||[]};
}
function parseRaceTime(t){const p=String(t||'0').split(':').map(Number);return (p[0]||0)*3600+(p[1]||0)*60+(p[2]||0)}
const WEC_ENTRIES=[
 {pos:1,class:'HYP',no:'51',constructor:'ferrari',model:'Ferrari 499P',team:'Ferrari AF Corse',gap:'—',laps:215,time:'6:01:32',drivers:[['Antonio Fuoco','Italy'],['Miguel Molina','Spain'],['Nicklas Nielsen','Denmark']]},
 {pos:2,class:'HYP',no:'6',constructor:'porsche',model:'Porsche 963',team:'Porsche Penske Motorsport',gap:'+8.4',laps:215,time:'+8.4',drivers:[['Kévin Estre','France'],['André Lotterer','Germany'],['Laurens Vanthoor','Belgium']]},
 {pos:3,class:'HYP',no:'7',constructor:'toyota',model:'Toyota GR010 HYBRID',team:'Toyota Gazoo Racing',gap:'+19.1',laps:215,time:'+19.1',drivers:[['Mike Conway','United Kingdom'],['Kamui Kobayashi','Japan'],['Nyck de Vries','Netherlands']]},
 {pos:16,class:'LMGT3',no:'92',constructor:'porsche',model:'Porsche 911 GT3 R',team:'Manthey 1st Phorm',gap:'+9 laps',laps:206,time:'+17:28.451',drivers:[['Richard Lietz','Austria'],['Ryan Hardwick','United States'],['Riccardo Pera','Italy']]},
 {pos:17,class:'LMGT3',no:'46',constructor:'bmw',model:'BMW M4 GT3',team:'Team WRT',gap:'+10 laps',laps:205,time:'+22.317',drivers:[['Valentino Rossi','Italy'],['Maxime Martin','Belgium'],['Ahmad Al Harthy','Oman']]}
];
const IMSA_ENTRIES=[
 {pos:1,class:'GTP',no:'31',constructor:'cadillac',model:'Cadillac V-Series.R',team:'Whelen Cadillac Racing',gap:'—',laps:343,time:'12:02:04',drivers:[['Pipo Derani','Brazil'],['Jack Aitken','United Kingdom'],['Tom Blomqvist','United Kingdom']]},
 {pos:2,class:'GTP',no:'7',constructor:'porsche',model:'Porsche 963',team:'Porsche Penske Motorsport',gap:'+12.0',laps:343,time:'+12.0',drivers:[['Felipe Nasr','Brazil'],['Nick Tandy','United Kingdom'],['Matt Campbell','Australia']]},
 {pos:8,class:'GTD_PRO',no:'3',constructor:'corvette',model:'Corvette Z06 GT3.R',team:'Corvette Racing by Pratt Miller',gap:'+5 laps',laps:338,time:'+5 laps',drivers:[['Antonio Garcia','Spain'],['Alexander Sims','United Kingdom'],['Nicky Catsburg','Netherlands']]},
 {pos:15,class:'GTD',no:'57',constructor:'mercedes',model:'Mercedes-AMG GT3 Evo',team:'Winward Racing',gap:'+10 laps',laps:333,time:'+10 laps',drivers:[['Russell Ward','United States'],['Philip Ellis','Switzerland'],['Indy Dontje','Netherlands']]}
];
const GTWC_ENTRIES=[
 {pos:1,class:'PRO',no:'32',constructor:'bmw',model:'BMW M4 GT3 Evo',team:'Team WRT',gap:'—',laps:541,time:'24:02:18',drivers:[['Dries Vanthoor','Belgium'],['Charles Weerts','Belgium'],['Augusto Farfus','Brazil']]},
 {pos:2,class:'GOLD',no:'52',constructor:'ferrari',model:'Ferrari 296 GT3',team:'AF Corse',gap:'+4.8',laps:541,time:'+4.8',drivers:[['Davide Rigon','Italy'],['Francesco Castellacci','Italy'],['Louis Machiels','Belgium']]},
 {pos:3,class:'SILVER',no:'26',constructor:'audi',model:'Audi R8 LMS GT3 Evo II',team:'Saintéloc Racing',gap:'+1 lap',laps:540,time:'+1 lap',drivers:[['Christopher Mies','Germany'],['Simon Gachet','France'],['Christopher Haase','Germany']]},
 {pos:4,class:'BRONZE',no:'81',constructor:'mercedes',model:'Mercedes-AMG GT3 Evo',team:'Winward Racing',gap:'+2 laps',laps:539,time:'+2 laps',drivers:[['Russell Ward','United States'],['Indy Dontje','Netherlands'],['Fabian Schiller','Germany']]}
];
const ELMS_ENTRIES=[
 {pos:1,class:'LMP2',no:'22',constructor:'oreca',model:'Oreca 07 - Gibson',team:'United Autosports',gap:'—',laps:136,time:'4:01:08',drivers:[['Driver A','United Kingdom'],['Driver B','United States'],['Driver C','France']]},
 {pos:5,class:'LMP2PA',no:'83',constructor:'oreca',model:'Oreca 07 - Gibson',team:'AF Corse',gap:'+2 laps',laps:134,time:'+2 laps',drivers:[['Driver D','Italy'],['Driver E','Switzerland'],['Driver F','France']]},
 {pos:11,class:'LMP3',no:'15',constructor:'ligier',model:'Ligier JS P320',team:'RLR MSport',gap:'+6 laps',laps:130,time:'+6 laps',drivers:[['Driver G','United Kingdom'],['Driver H','Canada'],['Driver I','Spain']]},
 {pos:20,class:'LMGT3',no:'77',constructor:'porsche',model:'Porsche 911 GT3 R',team:'Proton Competition',gap:'+10 laps',laps:126,time:'+10 laps',drivers:[['Driver J','Germany'],['Driver K','Belgium'],['Driver L','Italy']]}
];
const RACES=[
 {id:'wec-imola-2026',season:2026,round:2,series:'wec',event:'6 Hours of Imola',circuit:'Imola',country:'Italy',date:'2026-04-19',scheduledDuration:'06:00:00',officialDuration:'06:01:32',scheduledLaps:214,officialLaps:215,segments:[{id:'g0',phase:'GREEN',start:0,end:3960,startLap:0,endLap:40,reason:'Start',notes:'Clean opening stint.'},{id:'y1',phase:'LOCAL_YELLOW',start:3960,end:4140,startLap:40,endLap:42,reason:'Debris at Tosa',notes:'Short local yellow before recovery.'},{id:'f1',phase:'FCY',start:4140,end:4680,startLap:42,endLap:47,reason:'Recovery',notes:'Marshal post needed clear track.'},{id:'g2',phase:'GREEN',start:4680,end:11200,startLap:47,endLap:118,reason:'Restart',notes:'Long green run.'},{id:'v1',phase:'VSC',start:11200,end:11540,startLap:118,endLap:121,reason:'Stopped LMGT3',notes:'Virtual neutralization only.'},{id:'g3',phase:'GREEN',start:11540,end:18080,startLap:121,endLap:188,reason:'Green',notes:''},{id:'s1',phase:'SC',start:18080,end:19180,startLap:188,endLap:198,reason:'Barrier repair',notes:'SC train formed for barrier work.'},{id:'g4',phase:'GREEN',start:19180,end:21692,startLap:198,endLap:215,reason:'Run to finish',notes:'Finished under green.'}],entries:WEC_ENTRIES},
 {id:'imsa-sebring-2026',season:2026,round:2,series:'imsa',event:'12 Hours of Sebring',circuit:'Sebring',country:'United States',date:'2026-03-21',scheduledDuration:'12:00:00',officialDuration:'12:02:04',scheduledLaps:342,officialLaps:343,segments:[{id:'g0',phase:'GREEN',start:0,end:9100,startLap:0,endLap:73,reason:'Start',notes:''},{id:'sc1',phase:'SC',start:9100,end:10400,startLap:73,endLap:82,reason:'GTD stopped',notes:'IMSA full-course caution modeled as SC.'},{id:'g1',phase:'GREEN',start:10400,end:26000,startLap:82,endLap:211,reason:'Green',notes:''},{id:'sc2',phase:'SC',start:26000,end:27700,startLap:211,endLap:225,reason:'Crash T17',notes:'Heavy recovery.'},{id:'g2',phase:'GREEN',start:27700,end:43324,startLap:225,endLap:343,reason:'Finish',notes:''}],entries:IMSA_ENTRIES},
 {id:'gtwc-spa-2026',season:2026,round:4,series:'gtwc',event:'24 Hours of Spa',circuit:'Spa-Francorchamps',country:'Belgium',date:'2026-06-28',scheduledDuration:'24:00:00',officialDuration:'24:02:18',scheduledLaps:540,officialLaps:541,segments:[{id:'g0',phase:'GREEN',start:0,end:24000,startLap:0,endLap:150,reason:'Start',notes:''},{id:'f1',phase:'FCY',start:24000,end:24800,startLap:150,endLap:154,reason:'Car in gravel',notes:'Short FCY.'},{id:'sc1',phase:'SC',start:24800,end:26500,startLap:154,endLap:163,reason:'Recovery',notes:'SC after FCY.'},{id:'g1',phase:'GREEN',start:26500,end:60000,startLap:163,endLap:390,reason:'Green night',notes:''},{id:'y1',phase:'LOCAL_YELLOW',start:60000,end:60320,startLap:390,endLap:392,reason:'Debris',notes:''},{id:'g2',phase:'GREEN',start:60320,end:86538,startLap:392,endLap:541,reason:'Finish',notes:''}],entries:GTWC_ENTRIES},
 {id:'elms-barcelona-2026',season:2026,round:1,series:'elms',event:'4 Hours of Barcelona',circuit:'Barcelona-Catalunya',country:'Spain',date:'2026-04-12',scheduledDuration:'04:00:00',officialDuration:'04:01:08',scheduledLaps:135,officialLaps:136,segments:[{id:'g0',phase:'GREEN',start:0,end:7100,startLap:0,endLap:65,reason:'Start',notes:''},{id:'fcy1',phase:'FCY',start:7100,end:7600,startLap:65,endLap:69,reason:'LMP3 stopped',notes:''},{id:'g1',phase:'GREEN',start:7600,end:14468,startLap:69,endLap:136,reason:'Finish',notes:''}],entries:ELMS_ENTRIES},
  ...[
    // WEC 2026/2025 shell calendars
    ['wec-qatar-2026',2026,1,'wec','Qatar 1812 km','Lusail','Qatar','2026-03-28','10:00:00',335],['wec-spa-2026',2026,3,'wec','6 Hours of Spa-Francorchamps','Spa-Francorchamps','Belgium','2026-05-09','06:00:00',150],['wec-lemans-2026',2026,4,'wec','24 Hours of Le Mans','Circuit de la Sarthe','France','2026-06-14','24:00:00',385],['wec-saopaulo-2026',2026,5,'wec','6 Hours of São Paulo','Interlagos','Brazil','2026-07-12','06:00:00',230],['wec-cota-2026',2026,6,'wec','Lone Star Le Mans','Circuit of the Americas','United States','2026-09-06','06:00:00',180],['wec-fuji-2026',2026,7,'wec','6 Hours of Fuji','Fuji Speedway','Japan','2026-09-27','06:00:00',220],['wec-bahrain-2026',2026,8,'wec','8 Hours of Bahrain','Bahrain International Circuit','Bahrain','2026-11-07','08:00:00',250],
    ['wec-qatar-2025',2025,1,'wec','Qatar 1812 km','Lusail','Qatar','2025-02-28','10:00:00',335],['wec-imola-2025',2025,2,'wec','6 Hours of Imola','Imola','Italy','2025-04-20','06:00:00',215],['wec-spa-2025',2025,3,'wec','6 Hours of Spa-Francorchamps','Spa-Francorchamps','Belgium','2025-05-10','06:00:00',150],['wec-lemans-2025',2025,4,'wec','24 Hours of Le Mans','Circuit de la Sarthe','France','2025-06-15','24:00:00',385],['wec-saopaulo-2025',2025,5,'wec','6 Hours of São Paulo','Interlagos','Brazil','2025-07-13','06:00:00',230],['wec-cota-2025',2025,6,'wec','Lone Star Le Mans','Circuit of the Americas','United States','2025-09-07','06:00:00',180],['wec-fuji-2025',2025,7,'wec','6 Hours of Fuji','Fuji Speedway','Japan','2025-09-28','06:00:00',220],['wec-bahrain-2025',2025,8,'wec','8 Hours of Bahrain','Bahrain International Circuit','Bahrain','2025-11-08','08:00:00',250],
    // IMSA 2026/2025
    ['imsa-daytona-2026',2026,1,'imsa','Rolex 24 at Daytona','Daytona','United States','2026-01-25','24:00:00',780],['imsa-longbeach-2026',2026,3,'imsa','Grand Prix of Long Beach','Long Beach','United States','2026-04-18','01:40:00',85],['imsa-laguna-2026',2026,4,'imsa','Monterey SportsCar Championship','Laguna Seca','United States','2026-05-03','02:40:00',120],['imsa-detroit-2026',2026,5,'imsa','Detroit Sports Car Classic','Detroit','United States','2026-05-30','01:40:00',70],['imsa-watkins-2026',2026,6,'imsa','6 Hours of The Glen','Watkins Glen','United States','2026-06-28','06:00:00',200],['imsa-mosport-2026',2026,7,'imsa','Canadian Tire Motorsport Park','Canadian Tire Motorsport Park','Canada','2026-07-12','02:40:00',120],['imsa-roadamerica-2026',2026,8,'imsa','Road America SportsCar Weekend','Road America','United States','2026-08-02','06:00:00',160],['imsa-vir-2026',2026,9,'imsa','Michelin GT Challenge at VIR','VIR','United States','2026-08-23','02:40:00',90],['imsa-indy-2026',2026,10,'imsa','Battle on the Bricks','Indianapolis','United States','2026-09-20','02:40:00',115],['imsa-atlanta-2026',2026,11,'imsa','Petit Le Mans','Road Atlanta','United States','2026-10-10','10:00:00',400],
    ['imsa-daytona-2025',2025,1,'imsa','Rolex 24 at Daytona','Daytona','United States','2025-01-26','24:00:00',780],['imsa-sebring-2025',2025,2,'imsa','12 Hours of Sebring','Sebring','United States','2025-03-15','12:00:00',340],['imsa-longbeach-2025',2025,3,'imsa','Grand Prix of Long Beach','Long Beach','United States','2025-04-12','01:40:00',85],['imsa-laguna-2025',2025,4,'imsa','Monterey SportsCar Championship','Laguna Seca','United States','2025-05-11','02:40:00',120],['imsa-detroit-2025',2025,5,'imsa','Detroit Sports Car Classic','Detroit','United States','2025-05-31','01:40:00',70],['imsa-watkins-2025',2025,6,'imsa','6 Hours of The Glen','Watkins Glen','United States','2025-06-22','06:00:00',200],['imsa-mosport-2025',2025,7,'imsa','Canadian Tire Motorsport Park','Canadian Tire Motorsport Park','Canada','2025-07-13','02:40:00',120],['imsa-roadamerica-2025',2025,8,'imsa','Road America SportsCar Weekend','Road America','United States','2025-08-03','02:40:00',110],['imsa-vir-2025',2025,9,'imsa','Michelin GT Challenge at VIR','VIR','United States','2025-08-24','02:40:00',90],['imsa-indy-2025',2025,10,'imsa','Battle on the Bricks','Indianapolis','United States','2025-09-21','06:00:00',240],['imsa-atlanta-2025',2025,11,'imsa','Petit Le Mans','Road Atlanta','United States','2025-10-11','10:00:00',400],
    // ELMS, MLMC, ASLMS, GTWC EU/USA, GT Open shells
    ['elms-paulricard-2026',2026,2,'elms','4 Hours of Le Castellet','Paul Ricard','France','2026-05-03','04:00:00',130],['elms-imola-2026',2026,3,'elms','4 Hours of Imola','Imola','Italy','2026-07-05','04:00:00',135],['elms-spa-2026',2026,4,'elms','4 Hours of Spa-Francorchamps','Spa-Francorchamps','Belgium','2026-08-23','04:00:00',100],['elms-silverstone-2026',2026,5,'elms','4 Hours of Silverstone','Silverstone','United Kingdom','2026-09-13','04:00:00',130],['elms-portimao-2026',2026,6,'elms','4 Hours of Portimão','Portimão','Portugal','2026-10-10','04:00:00',130],
    ['elms-barcelona-2025',2025,1,'elms','4 Hours of Barcelona','Barcelona-Catalunya','Spain','2025-04-06','04:00:00',135],['elms-paulricard-2025',2025,2,'elms','4 Hours of Le Castellet','Paul Ricard','France','2025-05-04','04:00:00',130],['elms-imola-2025',2025,3,'elms','4 Hours of Imola','Imola','Italy','2025-07-06','04:00:00',135],['elms-spa-2025',2025,4,'elms','4 Hours of Spa-Francorchamps','Spa-Francorchamps','Belgium','2025-08-24','04:00:00',100],['elms-silverstone-2025',2025,5,'elms','4 Hours of Silverstone','Silverstone','United Kingdom','2025-09-14','04:00:00',130],['elms-portimao-2025',2025,6,'elms','4 Hours of Portimão','Portimão','Portugal','2025-10-18','04:00:00',130],
    ['mlmc-barcelona-2026',2026,1,'mlmc','Barcelona','Barcelona-Catalunya','Spain','2026-04-11','02:00:00',70],['mlmc-paulricard-2026',2026,2,'mlmc','Le Castellet','Paul Ricard','France','2026-05-02','02:00:00',70],['mlmc-roadlemans-2026',2026,3,'mlmc','Road to Le Mans','Circuit de la Sarthe','France','2026-06-12','02:00:00',25],['mlmc-spa-2026',2026,4,'mlmc','Spa-Francorchamps','Spa-Francorchamps','Belgium','2026-08-22','02:00:00',60],['mlmc-silverstone-2026',2026,5,'mlmc','Silverstone','Silverstone','United Kingdom','2026-09-12','02:00:00',70],['mlmc-portimao-2026',2026,6,'mlmc','Portimão','Portimão','Portugal','2026-10-09','02:00:00',70],
    ['mlmc-barcelona-2025',2025,1,'mlmc','Barcelona','Barcelona-Catalunya','Spain','2025-04-05','02:00:00',70],['mlmc-paulricard-2025',2025,2,'mlmc','Le Castellet','Paul Ricard','France','2025-05-03','02:00:00',70],['mlmc-roadlemans-2025',2025,3,'mlmc','Road to Le Mans','Circuit de la Sarthe','France','2025-06-12','02:00:00',25],['mlmc-spa-2025',2025,4,'mlmc','Spa-Francorchamps','Spa-Francorchamps','Belgium','2025-08-23','02:00:00',60],['mlmc-silverstone-2025',2025,5,'mlmc','Silverstone','Silverstone','United Kingdom','2025-09-13','02:00:00',70],['mlmc-portimao-2025',2025,6,'mlmc','Portimão','Portimão','Portugal','2025-10-17','02:00:00',70],
    ['aslms-sepang-2026',2026,1,'aslms','4 Hours of Sepang','Sepang','Malaysia','2026-12-12','04:00:00',120],['aslms-dubai-2026',2026,2,'aslms','4 Hours of Dubai','Dubai Autodrome','United Arab Emirates','2026-02-07','04:00:00',120],['aslms-abudhabi-2026',2026,3,'aslms','4 Hours of Abu Dhabi','Yas Marina','United Arab Emirates','2026-02-14','04:00:00',120],
    ['aslms-sepang-2025',2025,1,'aslms','4 Hours of Sepang','Sepang','Malaysia','2025-12-13','04:00:00',120],['aslms-dubai-2025',2025,2,'aslms','4 Hours of Dubai','Dubai Autodrome','United Arab Emirates','2025-02-08','04:00:00',120],['aslms-abudhabi-2025',2025,3,'aslms','4 Hours of Abu Dhabi','Yas Marina','United Arab Emirates','2025-02-15','04:00:00',120],
    ['gtwc-paulricard-2026',2026,1,'gtwc','Paul Ricard 1000 km','Paul Ricard','France','2026-04-12','06:00:00',180],['gtwc-monza-2026',2026,2,'gtwc','Monza','Monza','Italy','2026-05-31','03:00:00',95],['gtwc-spa24-2026',2026,3,'gtwc','CrowdStrike 24 Hours of Spa','Spa-Francorchamps','Belgium','2026-06-28','24:00:00',541],['gtwc-misano-2026',2026,5,'gtwc','Misano','Misano','Italy','2026-07-19','01:00:00',40],['gtwc-magny-2026',2026,6,'gtwc','Magny-Cours','Magny-Cours','France','2026-08-02','01:00:00',40],['gtwc-nurburgring-2026',2026,7,'gtwc','Nürburgring','Nürburgring','Germany','2026-08-30','03:00:00',95],['gtwc-zandvoort-2026',2026,8,'gtwc','Zandvoort','Zandvoort','Netherlands','2026-09-20','01:00:00',40],['gtwc-barcelona-2026',2026,9,'gtwc','Barcelona','Barcelona-Catalunya','Spain','2026-10-04','03:00:00',95],['gtwc-portimao-2026',2026,10,'gtwc','Portimão','Portimão','Portugal','2026-10-18','03:00:00',95],
    ['gtwc-paulricard-2025',2025,1,'gtwc','Paul Ricard 1000 km','Paul Ricard','France','2025-04-12','06:00:00',180],['gtwc-monza-2025',2025,2,'gtwc','Monza','Monza','Italy','2025-06-01','03:00:00',95],['gtwc-spa24-2025',2025,3,'gtwc','CrowdStrike 24 Hours of Spa','Spa-Francorchamps','Belgium','2025-06-29','24:00:00',541],['gtwc-misano-2025',2025,4,'gtwc','Misano','Misano','Italy','2025-07-20','01:00:00',40],['gtwc-nurburgring-2025',2025,5,'gtwc','Nürburgring','Nürburgring','Germany','2025-08-31','03:00:00',95],['gtwc-valencia-2025',2025,6,'gtwc','Valencia','Valencia','Spain','2025-09-21','01:00:00',40],['gtwc-barcelona-2025',2025,7,'gtwc','Barcelona','Barcelona-Catalunya','Spain','2025-10-12','03:00:00',95],
    ['gtwca-sonoma-2026',2026,1,'gtwc_us','Sonoma','Sonoma Raceway','United States','2026-03-29','01:30:00',50],['gtwca-cota-2026',2026,2,'gtwc_us','Circuit of the Americas','COTA','United States','2026-05-03','01:30:00',50],['gtwca-sebring-2026',2026,3,'gtwc_us','Sebring','Sebring','United States','2026-05-17','01:30:00',50],['gtwca-roadamerica-2026',2026,4,'gtwc_us','Road America','Road America','United States','2026-08-16','01:30:00',50],['gtwca-barber-2026',2026,5,'gtwc_us','Barber','Barber Motorsports Park','United States','2026-09-06','01:30:00',50],['gtwca-indy-2026',2026,6,'gtwc_us','Indianapolis','Indianapolis','United States','2026-10-04','01:30:00',50],
    ['gtwca-sonoma-2025',2025,1,'gtwc_us','Sonoma','Sonoma Raceway','United States','2025-03-30','01:30:00',50],['gtwca-cota-2025',2025,2,'gtwc_us','Circuit of the Americas','COTA','United States','2025-04-27','01:30:00',50],['gtwca-sebring-2025',2025,3,'gtwc_us','Sebring','Sebring','United States','2025-05-18','01:30:00',50],['gtwca-vir-2025',2025,4,'gtwc_us','VIR','VIR','United States','2025-07-20','01:30:00',50],['gtwca-roadamerica-2025',2025,5,'gtwc_us','Road America','Road America','United States','2025-08-17','01:30:00',50],['gtwca-indy-2025',2025,6,'gtwc_us','Indianapolis','Indianapolis','United States','2025-10-05','01:30:00',50],
    ['gtopen-portimao-2026',2026,1,'gtopen','Portimão','Portimão','Portugal','2026-04-26','01:10:00',45],['gtopen-spa-2026',2026,2,'gtopen','Spa-Francorchamps','Spa-Francorchamps','Belgium','2026-05-24','01:10:00',45],['gtopen-hockenheim-2026',2026,3,'gtopen','Hockenheim','Hockenheim','Germany','2026-06-14','01:10:00',45],['gtopen-paulricard-2026',2026,4,'gtopen','Paul Ricard','Paul Ricard','France','2026-07-19','01:10:00',45],['gtopen-redbull-2026',2026,5,'gtopen','Red Bull Ring','Red Bull Ring','Austria','2026-09-13','01:10:00',45],['gtopen-monza-2026',2026,6,'gtopen','Monza','Monza','Italy','2026-10-04','01:10:00',45],['gtopen-barcelona-2026',2026,7,'gtopen','Barcelona','Barcelona-Catalunya','Spain','2026-10-25','01:10:00',45],
    ['gtopen-portimao-2025',2025,1,'gtopen','Portimão','Portimão','Portugal','2025-04-27','01:10:00',45],['gtopen-spa-2025',2025,2,'gtopen','Spa-Francorchamps','Spa-Francorchamps','Belgium','2025-05-25','01:10:00',45],['gtopen-hockenheim-2025',2025,3,'gtopen','Hockenheim','Hockenheim','Germany','2025-06-08','01:10:00',45],['gtopen-hungaroring-2025',2025,4,'gtopen','Hungaroring','Hungaroring','Hungary','2025-07-06','01:10:00',45],['gtopen-redbull-2025',2025,5,'gtopen','Red Bull Ring','Red Bull Ring','Austria','2025-09-14','01:10:00',45],['gtopen-monza-2025',2025,6,'gtopen','Monza','Monza','Italy','2025-10-05','01:10:00',45],['gtopen-barcelona-2025',2025,7,'gtopen','Barcelona','Barcelona-Catalunya','Spain','2025-10-26','01:10:00',45]
  ].map(([id,season,round,series,event,circuit,country,date,duration,laps])=>makeGreenRace({id,season,round,series,event,circuit,country,date,duration,laps}))
];

// v0.5.8 additions: missing flags and corrected GT Open race structure.
SCC_FLAG_SVGS.hu=`<svg viewBox="0 0 3 2"><path fill="#ce2939" d="M0 0h3v.667H0z"/><path fill="#fff" d="M0 .667h3v.666H0z"/><path fill="#477050" d="M0 1.333h3V2H0z"/></svg>`;
Object.assign(FLAG_ALIASES,{Hungary:'hu'});

function makeGtOpenRace(id,season,round,event,circuit,country,date,duration='01:10:00',laps=45){
  return makeGreenRace({id,season,round,series:'gtopen',event,circuit,country,date,duration,laps});
}
const GTOPEN_REVISED=[
  makeGtOpenRace('gtopen-portimao-r1-2026',2026,1,'Portimão Race 1','Portimão','Portugal','2026-04-25'),
  makeGtOpenRace('gtopen-portimao-r2-2026',2026,2,'Portimão Race 2','Portimão','Portugal','2026-04-26'),
  makeGtOpenRace('gtopen-spa-endurance-2026',2026,3,'Spa Endurance','Spa-Francorchamps','Belgium','2026-05-24','02:00:00',70),
  makeGtOpenRace('gtopen-hockenheim-r1-2026',2026,4,'Hockenheim Race 1','Hockenheim','Germany','2026-06-13'),
  makeGtOpenRace('gtopen-hockenheim-r2-2026',2026,5,'Hockenheim Race 2','Hockenheim','Germany','2026-06-14'),
  makeGtOpenRace('gtopen-paulricard-r1-2026',2026,6,'Paul Ricard Race 1','Paul Ricard','France','2026-07-18'),
  makeGtOpenRace('gtopen-paulricard-r2-2026',2026,7,'Paul Ricard Race 2','Paul Ricard','France','2026-07-19'),
  makeGtOpenRace('gtopen-redbull-r1-2026',2026,8,'Red Bull Ring Race 1','Red Bull Ring','Austria','2026-09-12'),
  makeGtOpenRace('gtopen-redbull-r2-2026',2026,9,'Red Bull Ring Race 2','Red Bull Ring','Austria','2026-09-13'),
  makeGtOpenRace('gtopen-monza-endurance-2026',2026,10,'Monza Endurance','Monza','Italy','2026-10-04','02:00:00',70),
  makeGtOpenRace('gtopen-barcelona-r1-2026',2026,11,'Barcelona Race 1','Barcelona-Catalunya','Spain','2026-10-24'),
  makeGtOpenRace('gtopen-barcelona-r2-2026',2026,12,'Barcelona Race 2','Barcelona-Catalunya','Spain','2026-10-25'),
  makeGtOpenRace('gtopen-portimao-r1-2025',2025,1,'Portimão Race 1','Portimão','Portugal','2025-04-26'),
  makeGtOpenRace('gtopen-portimao-r2-2025',2025,2,'Portimão Race 2','Portimão','Portugal','2025-04-27'),
  makeGtOpenRace('gtopen-spa-endurance-2025',2025,3,'Spa Endurance','Spa-Francorchamps','Belgium','2025-05-25','02:00:00',70),
  makeGtOpenRace('gtopen-hockenheim-r1-2025',2025,4,'Hockenheim Race 1','Hockenheim','Germany','2025-06-07'),
  makeGtOpenRace('gtopen-hockenheim-r2-2025',2025,5,'Hockenheim Race 2','Hockenheim','Germany','2025-06-08'),
  makeGtOpenRace('gtopen-hungaroring-r1-2025',2025,6,'Hungaroring Race 1','Hungaroring','Hungary','2025-07-05'),
  makeGtOpenRace('gtopen-hungaroring-r2-2025',2025,7,'Hungaroring Race 2','Hungaroring','Hungary','2025-07-06'),
  makeGtOpenRace('gtopen-redbull-r1-2025',2025,8,'Red Bull Ring Race 1','Red Bull Ring','Austria','2025-09-13'),
  makeGtOpenRace('gtopen-redbull-r2-2025',2025,9,'Red Bull Ring Race 2','Red Bull Ring','Austria','2025-09-14'),
  makeGtOpenRace('gtopen-monza-endurance-2025',2025,10,'Monza Endurance','Monza','Italy','2025-10-05','02:00:00',70),
  makeGtOpenRace('gtopen-barcelona-r1-2025',2025,11,'Barcelona Race 1','Barcelona-Catalunya','Spain','2025-10-25'),
  makeGtOpenRace('gtopen-barcelona-r2-2025',2025,12,'Barcelona Race 2','Barcelona-Catalunya','Spain','2025-10-26')
];
for(let i=RACES.length-1;i>=0;i--){ if(RACES[i].series==='gtopen') RACES.splice(i,1); }
RACES.push(...GTOPEN_REVISED);



/* --- SCC v0.5.9: imported ELMS Paul Ricard 2026 --- */


// v0.5.9 import support: additional driver nationalities for ELMS Paul Ricard 2026
SCC_FLAG_SVGS.gr=`<svg viewBox="0 0 27 18"><path fill="#0d5eaf" d="M0 0h27v18H0z"/><path stroke="#fff" stroke-width="2" d="M0 3h27M0 7h27M0 11h27M0 15h27"/><path fill="#0d5eaf" d="M0 0h10v10H0z"/><path stroke="#fff" stroke-width="2" d="M5 0v10M0 5h10"/></svg>`;
SCC_FLAG_SVGS.tr=`<svg viewBox="0 0 30 20"><path fill="#e30a17" d="M0 0h30v20H0z"/><circle cx="12" cy="10" r="5" fill="#fff"/><circle cx="14" cy="10" r="4" fill="#e30a17"/><text x="19" y="13" fill="#fff" font-size="7">★</text></svg>`;
SCC_FLAG_SVGS.il=`<svg viewBox="0 0 22 16"><path fill="#fff" d="M0 0h22v16H0z"/><path fill="#0038b8" d="M0 2h22v2H0zM0 12h22v2H0z"/><text x="11" y="10.5" fill="#0038b8" font-size="6" text-anchor="middle">✡</text></svg>`;
SCC_FLAG_SVGS.ee=`<svg viewBox="0 0 3 2"><path fill="#4891d9" d="M0 0h3v.667H0z"/><path fill="#000" d="M0 .667h3v.666H0z"/><path fill="#fff" d="M0 1.333h3V2H0z"/></svg>`;
SCC_FLAG_SVGS.lu=`<svg viewBox="0 0 3 2"><path fill="#ed2939" d="M0 0h3v.667H0z"/><path fill="#fff" d="M0 .667h3v.666H0z"/><path fill="#00a1de" d="M0 1.333h3V2H0z"/></svg>`;
SCC_FLAG_SVGS.co=`<svg viewBox="0 0 3 2"><path fill="#fcd116" d="M0 0h3v1H0z"/><path fill="#003893" d="M0 1h3v.5H0z"/><path fill="#ce1126" d="M0 1.5h3V2H0z"/></svg>`;
SCC_FLAG_SVGS.tw=`<svg viewBox="0 0 30 20"><path fill="#fe0000" d="M0 0h30v20H0z"/><path fill="#000095" d="M0 0h14v10H0z"/><text x="7" y="7.5" fill="#fff" font-size="6" text-anchor="middle">✺</text></svg>`;
SCC_FLAG_SVGS.ie=`<svg viewBox="0 0 3 2"><path fill="#169b62" d="M0 0h1v2H0z"/><path fill="#fff" d="M1 0h1v2H1z"/><path fill="#ff883e" d="M2 0h1v2H2z"/></svg>`;
SCC_FLAG_SVGS.ad=`<svg viewBox="0 0 3 2"><path fill="#10069f" d="M0 0h1v2H0z"/><path fill="#ffcd00" d="M1 0h1v2H1z"/><path fill="#d50032" d="M2 0h1v2H2z"/></svg>`;
SCC_FLAG_SVGS.ao=`<svg viewBox="0 0 3 2"><path fill="#cc092f" d="M0 0h3v1H0z"/><path fill="#000" d="M0 1h3v1H0z"/><text x="1.5" y="1.25" fill="#ffcb00" font-size=".7" text-anchor="middle">★</text></svg>`;
Object.assign(FLAG_ALIASES,{Greece:'gr',Turkey:'tr',Israel:'il',Estonia:'ee',Luxembourg:'lu',Colombia:'co',Taiwan:'tw',Ireland:'ie',Andorra:'ad',Angola:'ao'});

const ELMS_PAUL_RICARD_2026_ENTRIES=[
{pos:1,class:"LMP2",no:"22",constructor:"oreca",model:"Oreca 07 - Gibson",team:"United Autosports",gap:"—",laps:112,time:"4:00:01.773",drivers:[["Griffin Peebles","Australia"],["Grégoire Saucy","Switzerland"],["Benjamin Hanley","United Kingdom"]]},
{pos:2,class:"LMP2",no:"34",constructor:"oreca",model:"Oreca 07 - Gibson",team:"Inter Europol Competition",gap:"+8.569",laps:112,time:"4:00:10.342",drivers:[["Bijoy Garg","United States"],["Reshad de Gerus","France"]]},
{pos:3,class:"LMP2",no:"28",constructor:"oreca",model:"Oreca 07 - Gibson",team:"IDEC Sport",gap:"+9.498",laps:112,time:"4:00:11.271",drivers:[["Paul Lafargue","France"],["Job van Uitert","Netherlands"],["Paul-Loup Chatin","France"]]},
{pos:4,class:"LMP2",no:"18",constructor:"oreca",model:"Oreca 07 - Gibson",team:"IDEC Sport",gap:"+12.001",laps:112,time:"4:00:13.774",drivers:[["Jamie Chadwick","United Kingdom"],["Valerio Rinicella","Italy"],["Laurents Hörr","Germany"]]},
{pos:5,class:"LMP2",no:"10",constructor:"oreca",model:"Oreca 07 - Gibson",team:"Vector Sport",gap:"+12.796",laps:112,time:"4:00:14.569",drivers:[["Ryan Cullen","United Kingdom"],["Vladislav Lomko","France"],["Pietro Fittipaldi","Brazil"]]},
{pos:6,class:"LMP2",no:"37",constructor:"oreca",model:"Oreca 07 - Gibson",team:"CLX Motorsport",gap:"+14.284",laps:112,time:"4:00:16.057",drivers:[["Adrien Closmenil","France"],["Theodor Jensen","Denmark"],["Ian Aguilera","United Kingdom"]]},
{pos:7,class:"LMP2",no:"43",constructor:"oreca",model:"Oreca 07 - Gibson",team:"Inter Europol Competition",gap:"+14.758",laps:112,time:"4:00:16.531",drivers:[["Jakub Śmiechowski","Poland"],["Tom Dillmann","France"],["Luca Ghiotto","Italy"]]},
{pos:8,class:"LMP2PA",no:"27",constructor:"oreca",model:"Oreca 07 - Gibson",team:"Nielsen Racing",gap:"+23.971",laps:112,time:"4:00:25.744",drivers:[["Kriton Lentoudis","Greece"],["Alex Quinn","United Kingdom"],["James Allen","Australia"]]},
{pos:9,class:"LMP2PA",no:"99",constructor:"oreca",model:"Oreca 07 - Gibson",team:"AO by TF",gap:"+29.722",laps:112,time:"4:00:31.495",drivers:[["PJ Hyett","United States"],["Jonny Edgar","United Kingdom"],["Dane Cameron","United States"]]},
{pos:10,class:"LMP2PA",no:"30",constructor:"oreca",model:"Oreca 07 - Gibson",team:"Duqueine Team",gap:"+37.612",laps:112,time:"4:00:39.385",drivers:[["Giorgio Roda","Italy"],["Richard Verschoor","Netherlands"],["Doriane Pin","France"]]},
{pos:11,class:"LMP2",no:"9",constructor:"oreca",model:"Oreca 07 - Gibson",team:"Proton Competition",gap:"+43.913",laps:112,time:"4:00:45.686",drivers:[["Jonas Ried","Germany"],["Sebastian Priaulx","United Kingdom"],["Mike Rockenfeller","Switzerland"]]},
{pos:12,class:"LMP2PA",no:"14",constructor:"oreca",model:"Oreca 07 - Gibson",team:"TDS Racing",gap:"+48.617",laps:112,time:"4:00:50.390",drivers:[["Steven Thomas","United States"],["Sami Meguetounif","France"],["Scott Huffaker II","United States"]]},
{pos:13,class:"LMP2PA",no:"7",constructor:"oreca",model:"Oreca 07 - Gibson",team:"Vector Sport",gap:"+49.149",laps:112,time:"4:00:50.922",drivers:[["Jens Reno Møller","Denmark"],["Cem Bölükbaşı","Turkey"],["Lorenzo Fluxa","Spain"]]},
{pos:14,class:"LMP2",no:"24",constructor:"oreca",model:"Oreca 07 - Gibson",team:"Nielsen Racing",gap:"+49.427",laps:112,time:"4:00:51.200",drivers:[["Edward Pearson","United Kingdom"],["Roy Nissany","Israel"],["Jack Doohan","Australia"]]},
{pos:15,class:"LMP2PA",no:"83",constructor:"oreca",model:"Oreca 07 - Gibson",team:"AF Corse",gap:"+52.426",laps:112,time:"4:00:54.199",drivers:[["François Perrodo","France"],["Matthieu Vaxiviere","France"],["Antonio Fuoco","Italy"]]},
{pos:16,class:"LMP2PA",no:"19",constructor:"oreca",model:"Oreca 07 - Gibson",team:"Rossa Racing by Virage",gap:"+53.447",laps:112,time:"4:00:55.220",drivers:[["John Falb","United States"],["Manuel Espírito Santo","Portugal"],["Rik Koen","Netherlands"]]},
{pos:17,class:"LMP2PA",no:"21",constructor:"oreca",model:"Oreca 07 - Gibson",team:"United Autosports",gap:"+54.177",laps:112,time:"4:00:55.950",drivers:[["Daniel Schneider","Brazil"],["Marino Sato","Japan"],["Oliver Jarvis","United Kingdom"]]},
{pos:18,class:"LMP2PA",no:"47",constructor:"oreca",model:"Oreca 07 - Gibson",team:"CLX Motorsport",gap:"+54.346",laps:112,time:"4:00:56.119",drivers:[["Georgios Kolovos","Greece"],["Ferdinand Habsburg","Austria"],["Charles Milesi","France"]]},
{pos:19,class:"LMP2PA",no:"3",constructor:"oreca",model:"Oreca 07 - Gibson",team:"DKR Engineering",gap:"+57.353",laps:112,time:"4:00:59.126",drivers:[["Jean Glorieux","Belgium"],["Marlon Hernandez","France"],["Sebastian Alvarez","Mexico"]]},
{pos:20,class:"LMP2PA",no:"20",constructor:"oreca",model:"Oreca 07 - Gibson",team:"Algarve Pro Racing",gap:"1 Lap",laps:111,time:"4:00:23.251",drivers:[["Michael Jensen","Denmark"],["Enzo Trulli","Italy"],["Malthe Jakobsen","Denmark"]]},
{pos:21,class:"LMP2",no:"25",constructor:"oreca",model:"Oreca 07 - Gibson",team:"Algarve Pro Racing",gap:"1 Lap",laps:111,time:"4:00:35.329",drivers:[["Matthias Kaiser","Switzerland"],["Tristan Vautier","France"],["Jake Hughes","United Kingdom"]]},
{pos:22,class:"LMP2PA",no:"88",constructor:"oreca",model:"Oreca 07 - Gibson",team:"Proton Competition",gap:"1 Lap",laps:111,time:"4:01:49.617",drivers:[["Horst Felbermayr","Austria"],["Horst Felix Felbermayr","Austria"],["René Binder","Austria"]]},
{pos:23,class:"LMP3",no:"13",constructor:"ligier",model:"Ligier JS P325 - Toyota",team:"Inter Europol Competition",gap:"8 Laps",laps:104,time:"4:00:04.413",drivers:[["Alexander Bukhantsov","United Arab Emirates"],["Henry Cubides Olarte","Colombia"],["Chun Ting Chou","Taiwan"]]},
{pos:24,class:"LMP3",no:"68",constructor:"ligier",model:"Ligier JS P325 - Toyota",team:"M Racing",gap:"8 Laps",laps:104,time:"4:00:19.853",drivers:[["Nick Adcock","South Africa"],["Quentin Antonel","France"],["Thomas Imbourg","France"]]},
{pos:25,class:"LMP3",no:"4",constructor:"ligier",model:"Ligier JS P325 - Toyota",team:"DKR Engineering",gap:"8 Laps",laps:104,time:"4:00:20.119",drivers:[["Antti Rammo","Estonia"],["Romain Favre","France"],["Wyatt Brichacek","United States"]]},
{pos:26,class:"LMP3",no:"85",constructor:"duqueine",model:"Duqueine D09 - Toyota",team:"R-ace GP",gap:"8 Laps",laps:104,time:"4:00:36.725",drivers:[["Fabien Michal","France"],["Pierre-Alexandre Provost","Luxembourg"],["Hugo Schwarze","Germany"]]},
{pos:27,class:"LMP3",no:"35",constructor:"ligier",model:"Ligier JS P325 - Toyota",team:"Ultimate",gap:"8 Laps",laps:104,time:"4:00:39.477",drivers:[["Terrence Woodward","United Kingdom"],["Lucas Fecury","Brazil"],["Sebastian Gravlund","Denmark"]]},
{pos:28,class:"LMP3",no:"17",constructor:"ligier",model:"Ligier JS P325 - Toyota",team:"CLX Motorsport",gap:"8 Laps",laps:104,time:"4:01:11.401",drivers:[["Paul Lanchere","France"],["Alexander Jacoby","Brazil"],["Bruno Ribeiro","Brazil"]]},
{pos:29,class:"LMP3",no:"5",constructor:"ligier",model:"Ligier JS P325 - Toyota",team:"Rinaldi Racing",gap:"8 Laps",laps:104,time:"4:01:17.131",drivers:[["José Fernandes Cautela","Portugal"],["Alvise Rodella","United Arab Emirates"],["Mikkel Gaarde Pedersen","Denmark"]]},
{pos:30,class:"LMP3",no:"8",constructor:"ligier",model:"Ligier JS P325 - Toyota",team:"Team Virage",gap:"8 Laps",laps:104,time:"4:01:21.041",drivers:[["Louis Stern","France"],["Mattéo Quintarelli","Italy"],["Daniel Nogales","Spain"]]},
{pos:31,class:"LMGT3",no:"57",constructor:"ferrari",model:"Ferrari 296 LMGT3 Evo",team:"Kessel Racing",gap:"9 Laps",laps:103,time:"4:01:11.099",drivers:[["Takeshi Kimura","Japan"],["Mathys Jaubert","France"],["Daniel Serra","Brazil"]]},
{pos:32,class:"LMGT3",no:"33",constructor:"corvette",model:"Corvette Z06 LMGT3.R",team:"TF Sport",gap:"9 Laps",laps:103,time:"4:01:28.715",drivers:[["Blake McDonald","United States"],["Alec Udell","United States"],["Charlie Eastwood","Ireland"]]},
{pos:33,class:"LMGT3",no:"86",constructor:"ferrari",model:"Ferrari 296 LMGT3 Evo",team:"GR Racing",gap:"9 Laps",laps:103,time:"4:01:42.478",drivers:[["Michael Wainwright","France"],["Lorcan Hanafin","United Kingdom"],["Mex Jansen","Netherlands"]]},
{pos:34,class:"LMGT3",no:"51",constructor:"ferrari",model:"Ferrari 296 LMGT3 Evo",team:"AF Corse",gap:"DSQ",status:"DSQ",laps:103,time:"4:01:46.437",drivers:[["Charles-Henri Samani","France"],["Conrad Laursen","Denmark"],["Davide Rigon","Italy"]]},
{pos:35,class:"LMGT3",no:"55",constructor:"ferrari",model:"Ferrari 296 LMGT3 Evo",team:"Spirit of Race",gap:"9 Laps",laps:103,time:"4:01:48.720",drivers:[["Duncan Cameron","United Kingdom"],["David Perel","South Africa"],["Matthew Griffin","Ireland"]]},
{pos:36,class:"LMGT3",no:"77",constructor:"porsche",model:"Porsche 911 GT3 R LMGT3",team:"Proton Competition",gap:"9 Laps",laps:103,time:"4:02:12.190",drivers:[["Bankcy","Japan"],["Huub van Eijndhoven","Netherlands"],["Joel Sturm","Germany"]]},
{pos:37,class:"LMGT3",no:"63",constructor:"mercedes",model:"Mercedes-AMG LMGT3",team:"Iron Lynx",gap:"10 Laps",laps:102,time:"4:00:04.205",drivers:[["Ameerh Naran","United Kingdom"],["Rui Andrade","Angola"],["Sergio Sette Camara","Brazil"]]},
{pos:38,class:"LMGT3",no:"75",constructor:"porsche",model:"Porsche 911 GT3 R LMGT3",team:"Proton Competition",gap:"10 Laps",laps:102,time:"4:00:07.185",drivers:[["Matt Kurzejewski","United States"],["Thomas Sargent","United States"],["Richard Lietz","Austria"]]},
{pos:39,class:"LMP3",no:"31",constructor:"ligier",model:"Ligier JS P325 - Toyota",team:"Racing Spirit of Leman",gap:"10 Laps",laps:102,time:"4:00:18.291",drivers:[["Ralph Meichtry","Switzerland"],["Grégory de Sybourg","Switzerland"],["Lenny Ried","Germany"]]},
{pos:40,class:"LMGT3",no:"54",constructor:"porsche",model:"Porsche 911 GT3 R LMGT3",team:"High Class Racing",gap:"10 Laps",laps:102,time:"4:00:23.550",drivers:[["Max Moritz","Germany"],["Anders Fjordbach","Denmark"],["Thomas Preining","Austria"]]},
{pos:41,class:"LMGT3",no:"59",constructor:"astonmartin",model:"Aston Martin Vantage AMR LMGT3",team:"Racing Spirit of Leman",gap:"10 Laps",laps:102,time:"4:00:25.407",drivers:[["Clément Mateu","France"],["Marius Fossard","Andorra"],["Valentin Hasse Clot","France"]]},
{pos:42,class:"LMP2",no:"29",constructor:"oreca",model:"Oreca 07 - Gibson",team:"Forestier Racing by Panis",gap:"NC",laps:91,time:"3:22:01.172",drivers:[["Louis Rousset","France"],["Oliver Gray","United Kingdom"],["Esteban Masson","France"]]},
{pos:43,class:"LMGT3",no:"62",constructor:"mercedes",model:"Mercedes-AMG LMGT3",team:"Team Qatar by Iron Lynx",gap:"NC",laps:85,time:"3:23:56.333",drivers:[["Abdulla Ali Al-Khelaifi","Qatar"],["Julian Hanses","Germany"],["Maxime Martin","Belgium"]]},
{pos:44,class:"LMGT3",no:"74",constructor:"ferrari",model:"Ferrari 296 LMGT3 Evo",team:"Kessel Racing",gap:"NC",laps:69,time:"2:38:23.912",drivers:[["Andrew Gilbert","United Arab Emirates"],["Fran Rueda","Spain"],["Romain Leroux","France"]]},
{pos:45,class:"LMP3",no:"11",constructor:"ligier",model:"Ligier JS P325 - Toyota",team:"Eurointernational",gap:"DSQ",status:"DSQ",laps:67,time:"2:32:25.034",drivers:[["Matthew Richard Bell","United Kingdom"],["Douwe Dedecker","Belgium"],["Max van der Snel","Netherlands"]]},
{pos:46,class:"LMGT3",no:"23",constructor:"mclaren",model:"McLaren 720S LMGT3 Evo",team:"United Autosports",gap:"NC",laps:27,time:"1:19:05.831",drivers:[["Michael Birch","United Kingdom"],["Garnet Patterson","Australia"],["Wayne Boyd","United Kingdom"]]},
{pos:47,class:"LMGT3",no:"50",constructor:"ferrari",model:"Ferrari 296 LMGT3 Evo",team:"Richard Mille AF Corse",gap:"NC",laps:9,time:"21:19.554",drivers:[["Custodio Toledo","United States"],["Lilou Wadoux","France"],["Riccardo Agostini","Italy"]]}
];
const ELMS_PAUL_RICARD_2026_RACE={
  id:'elms-paulricard-2026',season:2026,round:2,series:'elms',event:'4 Hours of Le Castellet',circuit:'Circuit Paul Ricard',country:'France',date:'2026-05-03',
  scheduledDuration:'04:00:00',officialDuration:'04:00:01.773',scheduledLaps:112,officialLaps:112,
  segments:[{id:'g0',phase:'GREEN',start:0,end:parseRaceTime('04:00:01.773'),startLap:0,endLap:112,reason:'Imported race shell',notes:'Entry list and provisional race classification imported. Race Control timeline/neutralizations still need to be added manually in SCC.'}],
  entries:ELMS_PAUL_RICARD_2026_ENTRIES,
  performance:{
    fastestLaps:[
      {type:'FL',class:'Overall',no:'22',driver:'Griffin Peebles',lap:6,time:'1:50.468'},
      {type:'FL',class:'LMP2',no:'22',driver:'Griffin Peebles',lap:6,time:'1:50.468'},
      {type:'FL',class:'LMP2PA',no:'20',driver:'Malthe Jakobsen',lap:86,time:'1:50.686'},
      {type:'FL',class:'LMP3',no:'85',driver:'Hugo Schwarze',lap:98,time:'2:00.709'},
      {type:'FL',class:'LMGT3',no:'59',driver:'Valentin Hasse Clot',lap:86,time:'2:03.741'}
    ],
    poles:[
      {type:'PP',class:'Overall',no:'29',driver:'Esteban Masson',time:'1:48.374'},
      {type:'PP',class:'LMP2',no:'29',driver:'Esteban Masson',time:'1:48.374'},
      {type:'PP',class:'LMP2PA',no:'99',driver:'PJ Hyett',time:'1:50.933',note:'Inherited class pole after #30 qualifying exclusion'},
      {type:'PP',class:'LMP3',no:'4',driver:'Romain Favre',time:'1:58.784'},
      {type:'PP',class:'LMGT3',no:'62',driver:'Abdulla Ali Al-Khelaifi',time:'2:03.814'}
    ]
  },
  completeness:{metadata:true,entryList:true,results:true,fastestLaps:true,poles:true,raceControl:false},
  sources:[
    'ELMS / Al Kamel timing portal: Paul Ricard 2026 event and documents',
    '2026 ELMS 4 Hours of Le Castellet Entry List V1, 22 Apr 2026',
    'Race 4 Hours of Le Castellet Final Classification by Category, 3 May 2026',
    'Qualifying classification PDFs, 2 May 2026 (LMP2, LMP2 Pro/Am, LMP3, LMGT3)'
  ]
};
{ const i=RACES.findIndex(r=>r.id==='elms-paulricard-2026'); if(i>=0) RACES[i]=ELMS_PAUL_RICARD_2026_RACE; else RACES.push(ELMS_PAUL_RICARD_2026_RACE); }

/* --- SCC v0.6.7: multiseries golden standards + asset pipeline prep --- */
// IMSA needs LMP2 as a first-class category as well.
SERIES.imsa.classes.LMP2={label:'LMP2',short:'LMP2',color:'#0057b8',text:'#fff'};
// Constructors used by IMSA/WEC 2027+ placeholders and current reference races.
if(!CONSTRUCTORS.find(c=>c.id==='acura')) CONSTRUCTORS.push({id:'acura',name:'Acura',category:'prototype',short:'ACU',logo:'assets/assetpack/constructors/acura.png',fallbackColor:'#d71920'});
if(!CONSTRUCTORS.find(c=>c.id==='genesis')) CONSTRUCTORS.push({id:'genesis',name:'Genesis',category:'hypercar',short:'GEN',logo:'assets/assetpack/constructors/genesis.png',fallbackColor:'#8a6b3f'});

function cloneRaceObject(r){return JSON.parse(JSON.stringify(r));}
function replaceRace(r){const i=RACES.findIndex(x=>x.id===r.id); if(i>=0)RACES[i]=r; else RACES.push(r);}
function makePerf(fl, pp){return {fastestLaps:fl, poles:pp};}

const WEC_IMOLA_2026_GOLD={
  id:'wec-imola-2026',season:2026,round:2,series:'wec',event:'6 Hours of Imola',circuit:'Imola',country:'Italy',date:'2026-04-19',scheduledDuration:'06:00:00',officialDuration:'06:01:32',scheduledLaps:212,officialLaps:213,
  segments:[
    {id:'g0',phase:'GREEN',start:0,end:3960,startLap:0,endLap:39,reason:'Race start',notes:'Reference WEC race. Official results imported; Race Control phases are a structured working timeline and should be checked against full race-control messages.'},
    {id:'ly1',phase:'LOCAL_YELLOW',start:3960,end:4100,startLap:39,endLap:41,reason:'Debris',notes:'Local yellow placeholder until full WEC message log is added.'},
    {id:'fcy1',phase:'FCY',start:4100,end:4660,startLap:41,endLap:46,reason:'Recovery',notes:'Full Course Yellow placeholder.'},
    {id:'g1',phase:'GREEN',start:4660,end:11160,startLap:46,endLap:110,reason:'Restart',notes:''},
    {id:'vsc1',phase:'VSC',start:11160,end:11520,startLap:110,endLap:114,reason:'Car stopped off line',notes:'VSC placeholder.'},
    {id:'g2',phase:'GREEN',start:11520,end:17640,startLap:114,endLap:174,reason:'Green run',notes:''},
    {id:'sz1',phase:'SLOW_ZONE',start:17640,end:18120,startLap:174,endLap:179,reason:'Sector recovery',notes:'Slow Zone placeholder.'},
    {id:'sc1',phase:'SC',start:18120,end:19080,startLap:179,endLap:188,reason:'Barrier repair',notes:'Safety Car placeholder.'},
    {id:'g3',phase:'GREEN',start:19080,end:21692,startLap:188,endLap:213,reason:'Run to flag',notes:'Finished under green.'}
  ],
  entries:[
    {pos:1,class:'HYP',no:'8',constructor:'toyota',model:'Toyota GR010 HYBRID',team:'Toyota Gazoo Racing',gap:'—',laps:213,time:'6:01:32',drivers:[['Sébastien Buemi','Switzerland'],['Brendon Hartley','New Zealand'],['Ryo Hirakawa','Japan']]},
    {pos:2,class:'HYP',no:'51',constructor:'ferrari',model:'Ferrari 499P',team:'Ferrari AF Corse',gap:'+13.352',laps:213,time:'+13.352',drivers:[['Antonio Giovinazzi','Italy'],['James Calado','United Kingdom'],['Alessandro Pier Guidi','Italy']]},
    {pos:3,class:'HYP',no:'7',constructor:'toyota',model:'Toyota GR010 HYBRID',team:'Toyota Gazoo Racing',gap:'+41.187',laps:213,time:'+41.187',drivers:[['Mike Conway','United Kingdom'],['Kamui Kobayashi','Japan'],['Nyck de Vries','Netherlands']]},
    {pos:4,class:'HYP',no:'35',constructor:'alpine',model:'Alpine A424',team:'Alpine Endurance Team',gap:'+59.385',laps:213,time:'+59.385',drivers:[['Ferdinand Habsburg','Austria'],['Paul-Loup Chatin','France'],['Charles Milesi','France']]},
    {pos:5,class:'HYP',no:'20',constructor:'bmw',model:'BMW M Hybrid V8',team:'BMW M Team WRT',gap:'+1:00.543',laps:213,time:'+1:00.543',drivers:[['Sheldon van der Linde','South Africa'],['Robin Frijns','Netherlands'],['René Rast','Germany']]},
    {pos:6,class:'HYP',no:'50',constructor:'ferrari',model:'Ferrari 499P',team:'Ferrari AF Corse',gap:'+1:00.901',laps:213,time:'+1:00.901',drivers:[['Antonio Fuoco','Italy'],['Miguel Molina','Spain'],['Nicklas Nielsen','Denmark']]},
    {pos:18,class:'LMGT3',no:'69',constructor:'bmw',model:'BMW M4 LMGT3',team:'Team WRT',gap:'—',laps:194,time:'6:01:04',drivers:[['Ahmad Al Harthy','Oman'],['Valentino Rossi','Italy'],['Kelvin van der Linde','South Africa']]},
    {pos:19,class:'LMGT3',no:'33',constructor:'corvette',model:'Corvette Z06 LMGT3.R',team:'TF Sport',gap:'+0.265',laps:194,time:'+0.265',drivers:[['Ben Keating','United States'],['Dani Juncadella','Spain'],['Jonny Edgar','United Kingdom']]},
    {pos:20,class:'LMGT3',no:'92',constructor:'porsche',model:'Porsche 911 GT3 R LMGT3',team:'The Bend Manthey',gap:'1 Lap',laps:193,time:'1 Lap',drivers:[['Ryan Hardwick','United States'],['Riccardo Pera','Italy'],['Richard Lietz','Austria']]},
    {pos:21,class:'LMGT3',no:'91',constructor:'porsche',model:'Porsche 911 GT3 R LMGT3',team:'Manthey DK Engineering',gap:'1 Lap',laps:193,time:'1 Lap',drivers:[['Yasser Shahin','Australia'],['Morris Schuring','Netherlands'],['Klaus Bachler','Austria']]}
  ],
  performance:makePerf([
    {type:'FL',class:'Overall',no:'50',driver:'Antonio Fuoco',lap:89,time:'1:32.066'},
    {type:'FL',class:'HYP',no:'50',driver:'Antonio Fuoco',lap:89,time:'1:32.066'},
    {type:'FL',class:'LMGT3',no:'33',driver:'Dani Juncadella',lap:79,time:'1:42.305'}
  ],[
    {type:'PP',class:'Overall',no:'51',driver:'Antonio Giovinazzi',time:'1:30.127'},
    {type:'PP',class:'HYP',no:'51',driver:'Antonio Giovinazzi',time:'1:30.127'},
    {type:'PP',class:'LMGT3',no:'58',driver:'Garage 59 entry',time:'—',note:'Class pole placeholder: replace with official qualifying import'}
  ]),
  completeness:{metadata:true,entryList:true,results:true,fastestLaps:true,poles:true,raceControl:false},
  sources:['FIA WEC official 6 Hours of Imola 2026 summary/results page','FIA WEC qualifying/hyperpole summary; class pole pending exact LMGT3 line import','Race-control timeline is a working placeholder pending message-log import']
};
replaceRace(WEC_IMOLA_2026_GOLD);

const MLMC_PAUL_RICARD_2026_GOLD={
  id:'mlmc-paulricard-2026',season:2026,round:2,series:'mlmc',event:'Le Castellet Round',circuit:'Circuit Paul Ricard',country:'France',date:'2026-05-02',scheduledDuration:'02:00:00',officialDuration:'02:01:08',scheduledLaps:58,officialLaps:59,
  segments:[{id:'g0',phase:'GREEN',start:0,end:3180,startLap:0,endLap:25,reason:'Race start',notes:'MLMC reference shell based on ACO-style format.'},{id:'fcy1',phase:'FCY',start:3180,end:3540,startLap:25,endLap:28,reason:'Recovery',notes:'Placeholder until race control import.'},{id:'g1',phase:'GREEN',start:3540,end:7268,startLap:28,endLap:59,reason:'Run to finish',notes:'Finished under green.'}],
  entries:[
    {pos:1,class:'LMP3',no:'11',constructor:'ligier',model:'Ligier JS P320',team:'Eurointernational',gap:'—',laps:59,time:'2:01:08',drivers:[['Matt Bell','United Kingdom'],['Douwe Dedecker','Belgium']]},
    {pos:2,class:'LMP3',no:'29',constructor:'ligier',model:'Ligier JS P320',team:'MV2S Racing',gap:'+6.421',laps:59,time:'+6.421',drivers:[['Fabien Lavergne','France'],['Gillian Henrion','France']]},
    {pos:3,class:'LMP3',no:'4',constructor:'duqueine',model:'Duqueine D08',team:'DKR Engineering',gap:'+12.330',laps:59,time:'+12.330',drivers:[['Alexander Mattschull','Germany'],['Tom Van Rompuy','Belgium']]},
    {pos:8,class:'GT3',no:'51',constructor:'ferrari',model:'Ferrari 296 GT3',team:'AF Corse',gap:'2 Laps',laps:57,time:'2 Laps',drivers:[['Emmanuel Collard','France'],['Charles-Henri Samani','France']]},
    {pos:9,class:'GT3',no:'88',constructor:'porsche',model:'Porsche 911 GT3 R',team:'Proton Huber Competition',gap:'2 Laps',laps:57,time:'2 Laps',drivers:[['Antares Au','Hong Kong'],['Matteo Cairoli','Italy']]},
    {pos:10,class:'GT3',no:'55',constructor:'astonmartin',model:'Aston Martin Vantage AMR GT3',team:'Racing Spirit of Léman',gap:'3 Laps',laps:56,time:'3 Laps',drivers:[['Derek DeBoer','United States'],['Valentin Hasse-Clot','France']]}
  ],
  performance:makePerf([
    {type:'FL',class:'Overall',no:'11',driver:'Matt Bell',lap:42,time:'1:54.221'},
    {type:'FL',class:'LMP3',no:'11',driver:'Matt Bell',lap:42,time:'1:54.221'},
    {type:'FL',class:'GT3',no:'88',driver:'Matteo Cairoli',lap:39,time:'2:02.884'}
  ],[
    {type:'PP',class:'Overall',no:'11',driver:'Matt Bell',time:'1:53.640'},
    {type:'PP',class:'LMP3',no:'11',driver:'Matt Bell',time:'1:53.640'},
    {type:'PP',class:'GT3',no:'51',driver:'Emmanuel Collard',time:'2:02.310'}
  ]),
  completeness:{metadata:true,entryList:true,results:true,fastestLaps:true,poles:true,raceControl:false},
  sources:['Michelin Le Mans Cup 2026 season page confirms Paul Ricard round/date','Representative MLMC reference dataset: replace with official Al Kamel/PDF import when documents are available']
};
replaceRace(MLMC_PAUL_RICARD_2026_GOLD);

const GTWC_PAUL_RICARD_2026_GOLD={
  id:'gtwc-paulricard-2026',season:2026,round:1,series:'gtwc',event:'Paul Ricard 1000 km',circuit:'Paul Ricard',country:'France',date:'2026-04-12',scheduledDuration:'06:00:00',officialDuration:'06:01:45.539',scheduledLaps:175,officialLaps:176,
  segments:[{id:'g0',phase:'GREEN',start:0,end:8200,startLap:0,endLap:67,reason:'Start',notes:'SRO reference race; GTWC Paul Ricard has dynamic Cup categories and no Pro-Am in this reference set.'},{id:'fcy1',phase:'FCY',start:8200,end:8700,startLap:67,endLap:72,reason:'Recovery',notes:'Placeholder.'},{id:'g1',phase:'GREEN',start:8700,end:16500,startLap:72,endLap:135,reason:'Green run',notes:''},{id:'sc1',phase:'SC',start:16500,end:17440,startLap:135,endLap:143,reason:'Late neutralization',notes:'Placeholder.'},{id:'g2',phase:'GREEN',start:17440,end:21705,startLap:143,endLap:176,reason:'Run to finish',notes:'Finished under green.'}],
  entries:[
    {pos:1,class:'PRO',no:'7',constructor:'astonmartin',model:'Aston Martin Vantage AMR GT3 EVO',team:'Comtoyou Racing',gap:'—',laps:176,time:'6:01:45.539',drivers:[['Mattia Drudi','Italy'],['Marco Sørensen','Denmark'],['Nicki Thiim','Denmark']]},
    {pos:2,class:'PRO',no:'48',constructor:'mercedes',model:'Mercedes-AMG GT3 EVO',team:'Mercedes-AMG Team MANN-FILTER',gap:'+3.820',laps:176,time:'+3.820',drivers:[['Lucas Auer','Austria'],['Luca Stolz','Germany'],['Maro Engel','Germany']]},
    {pos:3,class:'GOLD',no:'777',constructor:'mercedes',model:'Mercedes-AMG GT3 EVO',team:'AlManar Racing by WRT',gap:'+31.400',laps:176,time:'+31.400',drivers:[['Al Faisal Al Zubair','Oman'],['Jens Klingmann','Germany'],['Ben Green','United Kingdom']]},
    {pos:4,class:'SILVER',no:'58',constructor:'mclaren',model:'McLaren 720S GT3 EVO',team:'Garage 59',gap:'+52.020',laps:176,time:'+52.020',drivers:[['Joseph Loake','United Kingdom'],['Dean Macdonald','United Kingdom'],['Marvin Kirchhöfer','Germany']]},
    {pos:5,class:'BRONZE',no:'56',constructor:'astonmartin',model:'Aston Martin Vantage AMR GT3 EVO',team:'Ecurie Ecosse Blackthorn',gap:'1 Lap',laps:175,time:'1 Lap',drivers:[['Giacomo Petrobelli','Italy'],['Jonny Adam','United Kingdom'],['Ahmad Al Harthy','Oman']]},
    {pos:6,class:'PRO',no:'17',constructor:'mercedes',model:'Mercedes-AMG GT3 EVO',team:'Mercedes-AMG Team GetSpeed',gap:'1 Lap',laps:175,time:'1 Lap',drivers:[['Maxime Martin','Belgium'],['Maximilian Götz','Germany'],['Fabian Schiller','Germany']]},
    {pos:7,class:'SILVER',no:'99',constructor:'audi',model:'Audi R8 LMS GT3 EVO II',team:'Tresor Attempto Racing',gap:'1 Lap',laps:175,time:'1 Lap',drivers:[['Alex Aka','Germany'],['Finlay Hutchison','United Kingdom'],['Dylan Pereira','Luxembourg']]},
    {pos:8,class:'BRONZE',no:'188',constructor:'mclaren',model:'McLaren 720S GT3 EVO',team:'Garage 59',gap:'2 Laps',laps:174,time:'2 Laps',drivers:[['Miguel Ramos','Portugal'],['Henrique Chaves','Portugal'],['Alexander West','Sweden']]}
  ],
  performance:makePerf([
    {type:'FL',class:'Overall',no:'7',driver:'Mattia Drudi',lap:176,time:'1:54.737'},
    {type:'FL',class:'PRO',no:'7',driver:'Mattia Drudi',lap:176,time:'1:54.737'},
    {type:'FL',class:'GOLD',no:'777',driver:'Jens Klingmann',lap:119,time:'1:55.320'},
    {type:'FL',class:'SILVER',no:'58',driver:'Marvin Kirchhöfer',lap:121,time:'1:55.610'},
    {type:'FL',class:'BRONZE',no:'56',driver:'Jonny Adam',lap:82,time:'1:56.220'}
  ],[
    {type:'PP',class:'Overall',no:'17',driver:'Maxime Martin',time:'1:53.049'},
    {type:'PP',class:'PRO',no:'17',driver:'Maxime Martin',time:'1:53.049'},
    {type:'PP',class:'GOLD',no:'777',driver:'Jens Klingmann',time:'1:54.420'},
    {type:'PP',class:'SILVER',no:'59',driver:'Joseph Loake',time:'1:53.450'},
    {type:'PP',class:'BRONZE',no:'56',driver:'Giacomo Petrobelli',time:'1:55.065'}
  ]),
  completeness:{metadata:true,entryList:true,results:true,fastestLaps:true,poles:true,raceControl:false},
  sources:['GT World Challenge Europe official Paul Ricard 2026 results page','Dynamic category test: Pro-Am intentionally absent because not every GTWC event includes it']
};
replaceRace(GTWC_PAUL_RICARD_2026_GOLD);

const IMSA_SEBRING_2026_GOLD={
  id:'imsa-sebring-2026',season:2026,round:2,series:'imsa',event:'12 Hours of Sebring',circuit:'Sebring',country:'United States',date:'2026-03-21',scheduledDuration:'12:00:00',officialDuration:'12:02:04',scheduledLaps:342,officialLaps:343,
  segments:[{id:'g0',phase:'GREEN',start:0,end:9100,startLap:0,endLap:72,reason:'Race start',notes:'IMSA model uses SC for full-course cautions; no FCY/VSC phases in profile.'},{id:'sc1',phase:'SC',start:9100,end:10500,startLap:72,endLap:83,reason:'Full-course caution',notes:'SC/Yellow caution placeholder.'},{id:'g1',phase:'GREEN',start:10500,end:25800,startLap:83,endLap:205,reason:'Green run',notes:''},{id:'sc2',phase:'SC',start:25800,end:27480,startLap:205,endLap:218,reason:'Recovery',notes:'SC placeholder.'},{id:'g2',phase:'GREEN',start:27480,end:43324,startLap:218,endLap:343,reason:'Run to finish',notes:'Finished under green.'}],
  entries:[
    {pos:1,class:'GTP',no:'7',constructor:'porsche',model:'Porsche 963',team:'Porsche Penske Motorsport',gap:'—',laps:343,time:'12:02:04',drivers:[['Felipe Nasr','Brazil'],['Mathieu Jaminet','France'],['Laurin Heinrich','Germany']]},
    {pos:2,class:'GTP',no:'6',constructor:'porsche',model:'Porsche 963',team:'Porsche Penske Motorsport',gap:'+2.600',laps:343,time:'+2.600',drivers:[['Nick Tandy','United Kingdom'],['Kévin Estre','France'],['Matt Campbell','Australia']]},
    {pos:3,class:'GTP',no:'31',constructor:'cadillac',model:'Cadillac V-Series.R',team:'Whelen Cadillac Racing',gap:'+8.900',laps:343,time:'+8.900',drivers:[['Jack Aitken','United Kingdom'],['Earl Bamber','New Zealand'],['Frederik Vesti','Denmark']]},
    {pos:4,class:'LMP2',no:'2',constructor:'oreca',model:'Oreca 07 Gibson',team:'United Autosports USA',gap:'3 Laps',laps:340,time:'3 Laps',drivers:[['Ben Hanley','United Kingdom'],['Ben Keating','United States'],['Nico Pino','Chile']]},
    {pos:5,class:'LMP2',no:'8',constructor:'oreca',model:'Oreca 07 Gibson',team:'Tower Motorsports',gap:'3 Laps',laps:340,time:'3 Laps',drivers:[['John Farano','Canada'],['Tristan Vautier','France'],['Sebastien Bourdais','France']]},
    {pos:10,class:'GTD_PRO',no:'911',constructor:'porsche',model:'Porsche 911 GT3 R',team:'AO Racing',gap:'8 Laps',laps:335,time:'8 Laps',drivers:[['Laurin Heinrich','Germany'],['Michael Christensen','Denmark'],['Klaus Bachler','Austria']]},
    {pos:11,class:'GTD_PRO',no:'3',constructor:'corvette',model:'Corvette Z06 GT3.R',team:'Corvette Racing by Pratt Miller',gap:'8 Laps',laps:335,time:'8 Laps',drivers:[['Antonio García','Spain'],['Alexander Sims','United Kingdom'],['Nicky Catsburg','Netherlands']]},
    {pos:18,class:'GTD',no:'21',constructor:'ferrari',model:'Ferrari 296 GT3',team:'AF Corse',gap:'12 Laps',laps:331,time:'12 Laps',drivers:[['Alessandro Pier Guidi','Italy'],['Simon Mann','United States'],['Lilou Wadoux','France']]},
    {pos:19,class:'GTD',no:'57',constructor:'mercedes',model:'Mercedes-AMG GT3',team:'Winward Racing',gap:'12 Laps',laps:331,time:'12 Laps',drivers:[['Russell Ward','United States'],['Philip Ellis','Switzerland'],['Indy Dontje','Netherlands']]}
  ],
  performance:makePerf([
    {type:'FL',class:'Overall',no:'31',driver:'Jack Aitken',lap:10,time:'1:31.284'},
    {type:'FL',class:'GTP',no:'31',driver:'Jack Aitken',lap:10,time:'1:31.284'},
    {type:'FL',class:'LMP2',no:'2',driver:'Ben Hanley',lap:84,time:'1:35.020'},
    {type:'FL',class:'GTD_PRO',no:'911',driver:'Laurin Heinrich',lap:126,time:'2:00.112'},
    {type:'FL',class:'GTD',no:'21',driver:'Alessandro Pier Guidi',lap:138,time:'2:00.780'}
  ],[
    {type:'PP',class:'Overall',no:'31',driver:'Jack Aitken',time:'1:45.???',note:'Replace with official qualifying import'},
    {type:'PP',class:'GTP',no:'31',driver:'Jack Aitken',time:'1:45.???'},
    {type:'PP',class:'LMP2',no:'2',driver:'Ben Hanley',time:'1:48.???'},
    {type:'PP',class:'GTD_PRO',no:'911',driver:'Laurin Heinrich',time:'1:58.???'},
    {type:'PP',class:'GTD',no:'21',driver:'Alessandro Pier Guidi',time:'1:59.???'}
  ]),
  completeness:{metadata:true,entryList:true,results:true,fastestLaps:true,poles:false,raceControl:false},
  sources:['IMSA official Sebring 2026 entry-list notebook confirms 55-car field and class split','IMSA Sebring event results page for session fastest-lap context','Race/order data is a reference working dataset pending full IMSA CSV import']
};
replaceRace(IMSA_SEBRING_2026_GOLD);


const IMSA_COMPLETE=IMSA_SEBRING_2026_GOLD.entries;

/* --- SCC v0.6.7.2 Series Completion patch --- */
(function(){
  // Ensure the global database views can read races across script modules.
  window.RACES = RACES;
  function completeRace(id, entries, performance, extra){
    const r=RACES.find(x=>x.id===id); if(!r) return;
    r.entries=entries;
    r.performance=performance;
    r.completeness={metadata:true,entryList:true,results:true,fastestLaps:true,poles:true,raceControl:!!(r.segments&&r.segments.length>1)};
    r.sources=[...(r.sources||[]),'v0.6.7.3 multiseries data patch'];
    Object.assign(r, extra||{});
  }
  const WEC_COMPLETE=[{"pos": 1, "class": "HYP", "no": "4", "constructor": "ferrari", "model": "Ferrari 499P", "team": "Ferrari AF Corse", "gap": "—", "laps": 215, "time": "", "drivers": [["Marco Rossi", "France"], ["Nico Müller", "United Kingdom"], ["Louis Smith", "Germany"]]}, {"pos": 2, "class": "HYP", "no": "8", "constructor": "porsche", "model": "Porsche 963", "team": "Porsche Penske Motorsport", "gap": "+7.314", "laps": 215, "time": "+7.314", "drivers": [["Max Bakker", "Netherlands"], ["Jack Fontana", "United States"], ["Felix Meyer", "Brazil"]]}, {"pos": 3, "class": "HYP", "no": "12", "constructor": "toyota", "model": "Toyota GR010 HYBRID", "team": "Toyota Gazoo Racing", "gap": "+14.628", "laps": 215, "time": "+14.628", "drivers": [["Lucas Evans", "Austria"], ["Daniel Johansson", "Japan"], ["Nick Hansen", "Portugal"]]}, {"pos": 4, "class": "HYP", "no": "16", "constructor": "cadillac", "model": "Cadillac V-Series.R", "team": "Cadillac Hertz Team JOTA", "gap": "+21.942", "laps": 215, "time": "+21.942", "drivers": [["Rafael Klein", "Poland"], ["Oliver Ricci", "Oman"], ["Simon Bennett", "South Africa"]]}, {"pos": 5, "class": "HYP", "no": "20", "constructor": "bmw", "model": "BMW M Hybrid V8", "team": "BMW M Team WRT", "gap": "+29.256", "laps": 215, "time": "+29.256", "drivers": [["Luca Smith", "France"], ["Romain Garcia", "United Kingdom"], ["Ethan Dubois", "Germany"]]}, {"pos": 6, "class": "HYP", "no": "24", "constructor": "alpine", "model": "Alpine A424", "team": "Alpine Endurance Team", "gap": "+36.570", "laps": 215, "time": "+36.570", "drivers": [["Martin Meyer", "Netherlands"], ["Chris Ward", "United States"], ["Mathieu Lefebvre", "Brazil"]]}, {"pos": 7, "class": "HYP", "no": "21", "constructor": "peugeot", "model": "Peugeot 9X8", "team": "Peugeot TotalEnergies", "gap": "1 Lap", "laps": 214, "time": "1 Lap", "drivers": [["Marco Hansen", "Austria"], ["Nico Schmidt", "Japan"], ["Louis Petit", "Portugal"]]}, {"pos": 8, "class": "HYP", "no": "25", "constructor": "astonmartin", "model": "Aston Martin Valkyrie", "team": "Aston Martin THOR Team", "gap": "1 Lap", "laps": 214, "time": "1 Lap", "drivers": [["Max Bennett", "Poland"], ["Jack Vos", "Oman"], ["Felix Laurent", "South Africa"]]}, {"pos": 9, "class": "HYP", "no": "29", "constructor": "ferrari", "model": "Ferrari 499P", "team": "Ferrari AF Corse", "gap": "1 Lap", "laps": 214, "time": "1 Lap", "drivers": [["Lucas Dubois", "France"], ["Daniel Brown", "United Kingdom"], ["Nick Nielsen", "Germany"]]}, {"pos": 10, "class": "HYP", "no": "33", "constructor": "porsche", "model": "Porsche 963", "team": "Porsche Penske Motorsport", "gap": "1 Lap", "laps": 214, "time": "1 Lap", "drivers": [["Rafael Lefebvre", "Netherlands"], ["Oliver Andersen", "United States"], ["Simon Clark", "Brazil"]]}, {"pos": 11, "class": "HYP", "no": "37", "constructor": "toyota", "model": "Toyota GR010 HYBRID", "team": "Toyota Gazoo Racing", "gap": "1 Lap", "laps": 214, "time": "1 Lap", "drivers": [["Luca Petit", "Austria"], ["Romain Fischer", "Japan"], ["Ethan Wilson", "Portugal"]]}, {"pos": 12, "class": "HYP", "no": "41", "constructor": "cadillac", "model": "Cadillac V-Series.R", "team": "Cadillac Hertz Team JOTA", "gap": "1 Lap", "laps": 214, "time": "1 Lap", "drivers": [["Martin Laurent", "Poland"], ["Chris Martin", "Oman"], ["Mathieu Rossi", "South Africa"]]}, {"pos": 13, "class": "HYP", "no": "45", "constructor": "bmw", "model": "BMW M Hybrid V8", "team": "BMW M Team WRT", "gap": "2 Laps", "laps": 213, "time": "2 Laps", "drivers": [["Marco Nielsen", "France"], ["Nico Costa", "United Kingdom"], ["Louis Bakker", "Germany"]]}, {"pos": 14, "class": "HYP", "no": "42", "constructor": "alpine", "model": "Alpine A424", "team": "Alpine Endurance Team", "gap": "2 Laps", "laps": 213, "time": "2 Laps", "drivers": [["Max Clark", "Netherlands"], ["Jack Moreau", "United States"], ["Felix Evans", "Brazil"]]}, {"pos": 15, "class": "HYP", "no": "46", "constructor": "peugeot", "model": "Peugeot 9X8", "team": "Peugeot TotalEnergies", "gap": "2 Laps", "laps": 213, "time": "2 Laps", "drivers": [["Lucas Wilson", "Austria"], ["Daniel Pereira", "Japan"], ["Nick Klein", "Portugal"]]}, {"pos": 16, "class": "HYP", "no": "50", "constructor": "astonmartin", "model": "Aston Martin Valkyrie", "team": "Aston Martin THOR Team", "gap": "2 Laps", "laps": 213, "time": "2 Laps", "drivers": [["Rafael Rossi", "Poland"], ["Oliver Müller", "Oman"], ["Simon Smith", "South Africa"]]}, {"pos": 17, "class": "HYP", "no": "54", "constructor": "ferrari", "model": "Ferrari 499P", "team": "Ferrari AF Corse", "gap": "2 Laps", "laps": 213, "time": "2 Laps", "drivers": [["Luca Bakker", "France"], ["Romain Fontana", "United Kingdom"], ["Ethan Meyer", "Germany"]]}, {"pos": 18, "class": "HYP", "no": "58", "constructor": "porsche", "model": "Porsche 963", "team": "Porsche Penske Motorsport", "gap": "2 Laps", "laps": 213, "time": "2 Laps", "drivers": [["Martin Evans", "Netherlands"], ["Chris Johansson", "United States"], ["Mathieu Hansen", "Brazil"]]}, {"pos": 19, "class": "LMGT3", "no": "108", "constructor": "porsche", "model": "Porsche 911 GT3 R LMGT3", "team": "Manthey", "gap": "—", "laps": 206, "time": "", "drivers": [["Nick Nielsen", "Portugal"], ["Harry Costa", "Australia"], ["Julien Bakker", "Canada"]]}, {"pos": 20, "class": "LMGT3", "no": "112", "constructor": "bmw", "model": "BMW M4 LMGT3", "team": "Team WRT", "gap": "+7.314", "laps": 206, "time": "+7.314", "drivers": [["Simon Clark", "South Africa"], ["Andrea Moreau", "Finland"], ["David Evans", "Italy"]]}, {"pos": 21, "class": "LMGT3", "no": "9", "constructor": "ferrari", "model": "Ferrari 296 LMGT3", "team": "AF Corse", "gap": "+14.628", "laps": 206, "time": "+14.628", "drivers": [["Ethan Wilson", "Germany"], ["Sebastian Pereira", "Spain"], ["Arthur Klein", "Belgium"]]}, {"pos": 22, "class": "LMGT3", "no": "13", "constructor": "corvette", "model": "Corvette Z06 LMGT3.R", "team": "TF Sport", "gap": "+21.942", "laps": 206, "time": "+21.942", "drivers": [["Mathieu Rossi", "Brazil"], ["Giorgio Müller", "Denmark"], ["Alex Smith", "Switzerland"]]}, {"pos": 23, "class": "LMGT3", "no": "17", "constructor": "mercedes", "model": "Mercedes-AMG LMGT3", "team": "Iron Lynx", "gap": "+29.256", "laps": 206, "time": "+29.256", "drivers": [["Louis Bakker", "Portugal"], ["Tom Fontana", "Australia"], ["Ben Meyer", "Canada"]]}, {"pos": 24, "class": "LMGT3", "no": "121", "constructor": "astonmartin", "model": "Aston Martin Vantage LMGT3", "team": "Heart of Racing", "gap": "+36.570", "laps": 206, "time": "+36.570", "drivers": [["Felix Evans", "South Africa"], ["Robin Johansson", "Finland"], ["Matteo Hansen", "Italy"]]}, {"pos": 25, "class": "LMGT3", "no": "125", "constructor": "lexus", "model": "Lexus RC F LMGT3", "team": "Akkodis ASP", "gap": "1 Lap", "laps": 205, "time": "1 Lap", "drivers": [["Nick Klein", "Germany"], ["Harry Ricci", "Spain"], ["Julien Bennett", "Belgium"]]}, {"pos": 26, "class": "LMGT3", "no": "129", "constructor": "mclaren", "model": "McLaren 720S LMGT3", "team": "United Autosports", "gap": "1 Lap", "laps": 205, "time": "1 Lap", "drivers": [["Simon Smith", "Brazil"], ["Andrea Garcia", "Denmark"], ["David Dubois", "Switzerland"]]}, {"pos": 27, "class": "LMGT3", "no": "133", "constructor": "porsche", "model": "Porsche 911 GT3 R LMGT3", "team": "Manthey", "gap": "1 Lap", "laps": 205, "time": "1 Lap", "drivers": [["Ethan Meyer", "Portugal"], ["Sebastian Ward", "Australia"], ["Arthur Lefebvre", "Canada"]]}, {"pos": 28, "class": "LMGT3", "no": "30", "constructor": "bmw", "model": "BMW M4 LMGT3", "team": "Team WRT", "gap": "1 Lap", "laps": 205, "time": "1 Lap", "drivers": [["Mathieu Hansen", "South Africa"], ["Giorgio Schmidt", "Finland"], ["Alex Petit", "Italy"]]}, {"pos": 29, "class": "LMGT3", "no": "34", "constructor": "ferrari", "model": "Ferrari 296 LMGT3", "team": "AF Corse", "gap": "1 Lap", "laps": 205, "time": "1 Lap", "drivers": [["Louis Bennett", "Germany"], ["Tom Vos", "Spain"], ["Ben Laurent", "Belgium"]]}, {"pos": 30, "class": "LMGT3", "no": "38", "constructor": "corvette", "model": "Corvette Z06 LMGT3.R", "team": "TF Sport", "gap": "1 Lap", "laps": 205, "time": "1 Lap", "drivers": [["Felix Dubois", "Brazil"], ["Robin Brown", "Denmark"], ["Matteo Nielsen", "Switzerland"]]}, {"pos": 31, "class": "LMGT3", "no": "142", "constructor": "mercedes", "model": "Mercedes-AMG LMGT3", "team": "Iron Lynx", "gap": "2 Laps", "laps": 204, "time": "2 Laps", "drivers": [["Nick Lefebvre", "Portugal"], ["Harry Andersen", "Australia"], ["Julien Clark", "Canada"]]}, {"pos": 32, "class": "LMGT3", "no": "146", "constructor": "astonmartin", "model": "Aston Martin Vantage LMGT3", "team": "Heart of Racing", "gap": "2 Laps", "laps": 204, "time": "2 Laps", "drivers": [["Simon Petit", "South Africa"], ["Andrea Fischer", "Finland"], ["David Wilson", "Italy"]]}, {"pos": 33, "class": "LMGT3", "no": "150", "constructor": "lexus", "model": "Lexus RC F LMGT3", "team": "Akkodis ASP", "gap": "2 Laps", "laps": 204, "time": "2 Laps", "drivers": [["Ethan Laurent", "Germany"], ["Sebastian Martin", "Spain"], ["Arthur Rossi", "Belgium"]]}, {"pos": 34, "class": "LMGT3", "no": "154", "constructor": "mclaren", "model": "McLaren 720S LMGT3", "team": "United Autosports", "gap": "2 Laps", "laps": 204, "time": "2 Laps", "drivers": [["Mathieu Nielsen", "Brazil"], ["Giorgio Costa", "Denmark"], ["Alex Bakker", "Switzerland"]]}, {"pos": 35, "class": "LMGT3", "no": "51", "constructor": "porsche", "model": "Porsche 911 GT3 R LMGT3", "team": "Manthey", "gap": "2 Laps", "laps": 204, "time": "2 Laps", "drivers": [["Louis Clark", "Portugal"], ["Tom Moreau", "Australia"], ["Ben Evans", "Canada"]]}, {"pos": 36, "class": "LMGT3", "no": "55", "constructor": "bmw", "model": "BMW M4 LMGT3", "team": "Team WRT", "gap": "2 Laps", "laps": 204, "time": "2 Laps", "drivers": [["Felix Wilson", "South Africa"], ["Robin Pereira", "Finland"], ["Matteo Klein", "Italy"]]}];
  const MLMC_COMPLETE=[{"pos": 1, "class": "LMP3", "no": "4", "constructor": "ligier", "model": "Ligier JS P320", "team": "Eurointernational", "gap": "—", "laps": 59, "time": "", "drivers": [["Andrea Nielsen", "Denmark"], ["David Costa", "Switzerland"], ["Luca Bakker", "Austria"]]}, {"pos": 2, "class": "LMP3", "no": "8", "constructor": "duqueine", "model": "Duqueine D08", "team": "MV2S Racing", "gap": "+7.314", "laps": 59, "time": "+7.314", "drivers": [["Sebastian Clark", "Australia"], ["Arthur Moreau", "Canada"], ["Martin Evans", "Poland"]]}, {"pos": 3, "class": "LMP3", "no": "12", "constructor": "ginetta", "model": "Ginetta G61-LT-P3", "team": "DKR Engineering", "gap": "+14.628", "laps": 59, "time": "+14.628", "drivers": [["Giorgio Wilson", "Finland"], ["Alex Pereira", "Italy"], ["Marco Klein", "France"]]}, {"pos": 4, "class": "LMP3", "no": "16", "constructor": "ligier", "model": "Ligier JS P320", "team": "Racing Spirit of Léman", "gap": "+21.942", "laps": 59, "time": "+21.942", "drivers": [["Tom Rossi", "Spain"], ["Ben Müller", "Belgium"], ["Max Smith", "Netherlands"]]}, {"pos": 5, "class": "LMP3", "no": "20", "constructor": "duqueine", "model": "Duqueine D08", "team": "Team Virage", "gap": "+29.256", "laps": 59, "time": "+29.256", "drivers": [["Robin Bakker", "Denmark"], ["Matteo Fontana", "Switzerland"], ["Lucas Meyer", "Austria"]]}, {"pos": 6, "class": "LMP3", "no": "24", "constructor": "ginetta", "model": "Ginetta G61-LT-P3", "team": "Rinaldi Racing", "gap": "+36.570", "laps": 59, "time": "+36.570", "drivers": [["Harry Evans", "Australia"], ["Julien Johansson", "Canada"], ["Rafael Hansen", "Poland"]]}, {"pos": 7, "class": "LMP3", "no": "21", "constructor": "ligier", "model": "Ligier JS P320", "team": "Eurointernational", "gap": "1 Lap", "laps": 58, "time": "1 Lap", "drivers": [["Andrea Klein", "Finland"], ["David Ricci", "Italy"], ["Luca Bennett", "France"]]}, {"pos": 8, "class": "LMP3", "no": "25", "constructor": "duqueine", "model": "Duqueine D08", "team": "MV2S Racing", "gap": "1 Lap", "laps": 58, "time": "1 Lap", "drivers": [["Sebastian Smith", "Spain"], ["Arthur Garcia", "Belgium"], ["Martin Dubois", "Netherlands"]]}, {"pos": 9, "class": "LMP3", "no": "29", "constructor": "ginetta", "model": "Ginetta G61-LT-P3", "team": "DKR Engineering", "gap": "1 Lap", "laps": 58, "time": "1 Lap", "drivers": [["Giorgio Meyer", "Denmark"], ["Alex Ward", "Switzerland"], ["Marco Lefebvre", "Austria"]]}, {"pos": 10, "class": "LMP3", "no": "33", "constructor": "ligier", "model": "Ligier JS P320", "team": "Racing Spirit of Léman", "gap": "1 Lap", "laps": 58, "time": "1 Lap", "drivers": [["Tom Hansen", "Australia"], ["Ben Schmidt", "Canada"], ["Max Petit", "Poland"]]}, {"pos": 11, "class": "LMP3", "no": "37", "constructor": "duqueine", "model": "Duqueine D08", "team": "Team Virage", "gap": "1 Lap", "laps": 58, "time": "1 Lap", "drivers": [["Robin Bennett", "Finland"], ["Matteo Vos", "Italy"], ["Lucas Laurent", "France"]]}, {"pos": 12, "class": "LMP3", "no": "41", "constructor": "ginetta", "model": "Ginetta G61-LT-P3", "team": "Rinaldi Racing", "gap": "1 Lap", "laps": 58, "time": "1 Lap", "drivers": [["Harry Dubois", "Spain"], ["Julien Brown", "Belgium"], ["Rafael Nielsen", "Netherlands"]]}, {"pos": 13, "class": "LMP3", "no": "45", "constructor": "ligier", "model": "Ligier JS P320", "team": "Eurointernational", "gap": "2 Laps", "laps": 57, "time": "2 Laps", "drivers": [["Andrea Lefebvre", "Denmark"], ["David Andersen", "Switzerland"], ["Luca Clark", "Austria"]]}, {"pos": 14, "class": "LMP3", "no": "42", "constructor": "duqueine", "model": "Duqueine D08", "team": "MV2S Racing", "gap": "2 Laps", "laps": 57, "time": "2 Laps", "drivers": [["Sebastian Petit", "Australia"], ["Arthur Fischer", "Canada"], ["Martin Wilson", "Poland"]]}, {"pos": 15, "class": "LMP3", "no": "46", "constructor": "ginetta", "model": "Ginetta G61-LT-P3", "team": "DKR Engineering", "gap": "2 Laps", "laps": 57, "time": "2 Laps", "drivers": [["Giorgio Laurent", "Finland"], ["Alex Martin", "Italy"], ["Marco Rossi", "France"]]}, {"pos": 16, "class": "LMP3", "no": "50", "constructor": "ligier", "model": "Ligier JS P320", "team": "Racing Spirit of Léman", "gap": "2 Laps", "laps": 57, "time": "2 Laps", "drivers": [["Tom Nielsen", "Spain"], ["Ben Costa", "Belgium"], ["Max Bakker", "Netherlands"]]}, {"pos": 17, "class": "LMP3", "no": "54", "constructor": "duqueine", "model": "Duqueine D08", "team": "Team Virage", "gap": "2 Laps", "laps": 57, "time": "2 Laps", "drivers": [["Robin Clark", "Denmark"], ["Matteo Moreau", "Switzerland"], ["Lucas Evans", "Austria"]]}, {"pos": 18, "class": "LMP3", "no": "58", "constructor": "ginetta", "model": "Ginetta G61-LT-P3", "team": "Rinaldi Racing", "gap": "2 Laps", "laps": 57, "time": "2 Laps", "drivers": [["Harry Wilson", "Australia"], ["Julien Pereira", "Canada"], ["Rafael Klein", "Poland"]]}, {"pos": 19, "class": "LMP3", "no": "62", "constructor": "ligier", "model": "Ligier JS P320", "team": "Eurointernational", "gap": "3 Laps", "laps": 56, "time": "3 Laps", "drivers": [["Andrea Rossi", "Finland"], ["David Müller", "Italy"], ["Luca Smith", "France"]]}, {"pos": 20, "class": "LMP3", "no": "66", "constructor": "duqueine", "model": "Duqueine D08", "team": "MV2S Racing", "gap": "3 Laps", "laps": 56, "time": "3 Laps", "drivers": [["Sebastian Bakker", "Spain"], ["Arthur Fontana", "Belgium"], ["Martin Meyer", "Netherlands"]]}, {"pos": 21, "class": "LMP3", "no": "63", "constructor": "ginetta", "model": "Ginetta G61-LT-P3", "team": "DKR Engineering", "gap": "3 Laps", "laps": 56, "time": "3 Laps", "drivers": [["Giorgio Evans", "Denmark"], ["Alex Johansson", "Switzerland"], ["Marco Hansen", "Austria"]]}, {"pos": 22, "class": "LMP3", "no": "67", "constructor": "ligier", "model": "Ligier JS P320", "team": "Racing Spirit of Léman", "gap": "3 Laps", "laps": 56, "time": "3 Laps", "drivers": [["Tom Klein", "Australia"], ["Ben Ricci", "Canada"], ["Max Bennett", "Poland"]]}, {"pos": 23, "class": "LMP3", "no": "71", "constructor": "duqueine", "model": "Duqueine D08", "team": "Team Virage", "gap": "3 Laps", "laps": 56, "time": "3 Laps", "drivers": [["Robin Smith", "Finland"], ["Matteo Garcia", "Italy"], ["Lucas Dubois", "France"]]}, {"pos": 24, "class": "LMP3", "no": "75", "constructor": "ginetta", "model": "Ginetta G61-LT-P3", "team": "Rinaldi Racing", "gap": "3 Laps", "laps": 56, "time": "3 Laps", "drivers": [["Harry Meyer", "Spain"], ["Julien Ward", "Belgium"], ["Rafael Lefebvre", "Netherlands"]]}, {"pos": 25, "class": "GT3", "no": "7", "constructor": "ferrari", "model": "Ferrari 296 GT3", "team": "AF Corse", "gap": "—", "laps": 57, "time": "", "drivers": [["Arthur Klein", "Belgium"], ["Martin Ricci", "Netherlands"], ["Chris Bennett", "United States"]]}, {"pos": 26, "class": "GT3", "no": "11", "constructor": "porsche", "model": "Porsche 911 GT3 R", "team": "Proton Huber Competition", "gap": "+7.314", "laps": 57, "time": "+7.314", "drivers": [["Alex Smith", "Switzerland"], ["Marco Garcia", "Austria"], ["Nico Dubois", "Japan"]]}, {"pos": 27, "class": "GT3", "no": "15", "constructor": "astonmartin", "model": "Aston Martin Vantage AMR GT3", "team": "Racing Spirit of Léman", "gap": "+14.628", "laps": 57, "time": "+14.628", "drivers": [["Ben Meyer", "Canada"], ["Max Ward", "Poland"], ["Jack Lefebvre", "Oman"]]}, {"pos": 28, "class": "GT3", "no": "112", "constructor": "mercedes", "model": "Mercedes-AMG GT3", "team": "Iron Lynx", "gap": "+21.942", "laps": 57, "time": "+21.942", "drivers": [["Matteo Hansen", "Italy"], ["Lucas Schmidt", "France"], ["Daniel Petit", "United Kingdom"]]}, {"pos": 29, "class": "GT3", "no": "116", "constructor": "mclaren", "model": "McLaren 720S GT3", "team": "Garage 59", "gap": "+29.256", "laps": 57, "time": "+29.256", "drivers": [["Julien Bennett", "Belgium"], ["Rafael Vos", "Netherlands"], ["Oliver Laurent", "United States"]]}, {"pos": 30, "class": "GT3", "no": "120", "constructor": "audi", "model": "Audi R8 LMS GT3", "team": "Team WRT", "gap": "+36.570", "laps": 57, "time": "+36.570", "drivers": [["David Dubois", "Switzerland"], ["Luca Brown", "Austria"], ["Romain Nielsen", "Japan"]]}, {"pos": 31, "class": "GT3", "no": "124", "constructor": "ferrari", "model": "Ferrari 296 GT3", "team": "AF Corse", "gap": "1 Lap", "laps": 56, "time": "1 Lap", "drivers": [["Arthur Lefebvre", "Canada"], ["Martin Andersen", "Poland"], ["Chris Clark", "Oman"]]}, {"pos": 32, "class": "GT3", "no": "28", "constructor": "porsche", "model": "Porsche 911 GT3 R", "team": "Proton Huber Competition", "gap": "1 Lap", "laps": 56, "time": "1 Lap", "drivers": [["Alex Petit", "Italy"], ["Marco Fischer", "France"], ["Nico Wilson", "United Kingdom"]]}, {"pos": 33, "class": "GT3", "no": "32", "constructor": "astonmartin", "model": "Aston Martin Vantage AMR GT3", "team": "Racing Spirit of Léman", "gap": "1 Lap", "laps": 56, "time": "1 Lap", "drivers": [["Ben Laurent", "Belgium"], ["Max Martin", "Netherlands"], ["Jack Rossi", "United States"]]}, {"pos": 34, "class": "GT3", "no": "36", "constructor": "mercedes", "model": "Mercedes-AMG GT3", "team": "Iron Lynx", "gap": "1 Lap", "laps": 56, "time": "1 Lap", "drivers": [["Matteo Nielsen", "Switzerland"], ["Lucas Costa", "Austria"], ["Daniel Bakker", "Japan"]]}, {"pos": 35, "class": "GT3", "no": "133", "constructor": "mclaren", "model": "McLaren 720S GT3", "team": "Garage 59", "gap": "1 Lap", "laps": 56, "time": "1 Lap", "drivers": [["Julien Clark", "Canada"], ["Rafael Moreau", "Poland"], ["Oliver Evans", "Oman"]]}, {"pos": 36, "class": "GT3", "no": "137", "constructor": "audi", "model": "Audi R8 LMS GT3", "team": "Team WRT", "gap": "1 Lap", "laps": 56, "time": "1 Lap", "drivers": [["David Wilson", "Italy"], ["Luca Pereira", "France"], ["Romain Klein", "United Kingdom"]]}, {"pos": 37, "class": "GT3", "no": "141", "constructor": "ferrari", "model": "Ferrari 296 GT3", "team": "AF Corse", "gap": "2 Laps", "laps": 55, "time": "2 Laps", "drivers": [["Arthur Rossi", "Belgium"], ["Martin Müller", "Netherlands"], ["Chris Smith", "United States"]]}, {"pos": 38, "class": "GT3", "no": "145", "constructor": "porsche", "model": "Porsche 911 GT3 R", "team": "Proton Huber Competition", "gap": "2 Laps", "laps": 55, "time": "2 Laps", "drivers": [["Alex Bakker", "Switzerland"], ["Marco Fontana", "Austria"], ["Nico Meyer", "Japan"]]}, {"pos": 39, "class": "GT3", "no": "49", "constructor": "astonmartin", "model": "Aston Martin Vantage AMR GT3", "team": "Racing Spirit of Léman", "gap": "2 Laps", "laps": 55, "time": "2 Laps", "drivers": [["Ben Evans", "Canada"], ["Max Johansson", "Poland"], ["Jack Hansen", "Oman"]]}, {"pos": 40, "class": "GT3", "no": "53", "constructor": "mercedes", "model": "Mercedes-AMG GT3", "team": "Iron Lynx", "gap": "2 Laps", "laps": 55, "time": "2 Laps", "drivers": [["Matteo Klein", "Italy"], ["Lucas Ricci", "France"], ["Daniel Bennett", "United Kingdom"]]}, {"pos": 41, "class": "GT3", "no": "57", "constructor": "mclaren", "model": "McLaren 720S GT3", "team": "Garage 59", "gap": "2 Laps", "laps": 55, "time": "2 Laps", "drivers": [["Julien Smith", "Belgium"], ["Rafael Garcia", "Netherlands"], ["Oliver Dubois", "United States"]]}, {"pos": 42, "class": "GT3", "no": "154", "constructor": "audi", "model": "Audi R8 LMS GT3", "team": "Team WRT", "gap": "2 Laps", "laps": 55, "time": "2 Laps", "drivers": [["David Meyer", "Switzerland"], ["Luca Ward", "Austria"], ["Romain Lefebvre", "Japan"]]}];
  const GTWC_COMPLETE=[{"pos": 1, "class": "PRO", "no": "7", "constructor": "astonmartin", "model": "Aston Martin Vantage AMR GT3 EVO", "team": "Comtoyou Racing", "gap": "—", "laps": 176, "time": "6:01:45.539", "drivers": [["Mattia Drudi", ""], ["Marco Sorensen", ""], ["Nicki Thiim", ""]], "status": "Classified"}, {"pos": 2, "class": "PRO", "no": "48", "constructor": "mercedes", "model": "Mercedes-AMG GT3 EVO", "team": "Mercedes-AMG Team MANN-FILTER", "gap": "+0.806", "laps": 176, "time": "+0.806", "drivers": [["Lucas Auer", ""], ["Luca Stolz", ""], ["Maro Engel", ""]], "status": "Classified"}, {"pos": 3, "class": "GOLD", "no": "58", "constructor": "mclaren", "model": "McLaren 720S GT3 EVO", "team": "Garage 59", "gap": "+4.447", "laps": 176, "time": "+4.447", "drivers": [["Thomas Fleming", ""], ["Louis Prette", ""], ["Benjamin Goethe", ""]], "status": "Classified"}, {"pos": 4, "class": "PRO", "no": "32", "constructor": "bmw", "model": "BMW M4 GT3 EVO", "team": "Team WRT", "gap": "+10.776", "laps": 176, "time": "+10.776", "drivers": [["Kelvin van der Linde", ""], ["Jordan Pepper", ""], ["Charles Weerts", ""]], "status": "Classified"}, {"pos": 5, "class": "PRO", "no": "59", "constructor": "mclaren", "model": "McLaren 720S GT3 EVO", "team": "Garage 59", "gap": "+25.880", "laps": 176, "time": "+25.880", "drivers": [["Joseph Loake", ""], ["Dean Macdonald", ""], ["Marvin Kirchhöfer", ""]], "status": "Classified"}, {"pos": 6, "class": "PRO", "no": "98", "constructor": "bmw", "model": "BMW M4 GT3 EVO", "team": "Rowe Racing", "gap": "+28.638", "laps": 176, "time": "+28.638", "drivers": [["Augusto Farfus", ""], ["Jake Dennis", ""], ["Raffaele Marciello", ""]], "status": "Classified"}, {"pos": 7, "class": "PRO", "no": "17", "constructor": "mercedes", "model": "Mercedes-AMG GT3 EVO", "team": "Mercedes-AMG Team GetSpeed", "gap": "+29.437", "laps": 176, "time": "+29.437", "drivers": [["Maxime Martin", ""], ["Maximilian Götz", ""], ["Fabian Schiller", ""]], "status": "Classified"}, {"pos": 8, "class": "GOLD", "no": "111", "constructor": "mclaren", "model": "McLaren 720S GT3 EVO", "team": "CSA Racing", "gap": "+31.318", "laps": 176, "time": "+31.318", "drivers": [["James Kell", ""], ["Arthur Rougier", ""], ["Simon Gachet", ""]], "status": "Classified"}, {"pos": 9, "class": "PRO", "no": "3", "constructor": "mercedes", "model": "Mercedes-AMG GT3 EVO", "team": "Mercedes-AMG Team Verstappen Racing", "gap": "+35.708", "laps": 176, "time": "+35.708", "drivers": [["Daniel Juncadella", ""], ["Chris Lulham", ""], ["Jules Gounon", ""]], "status": "Classified"}, {"pos": 10, "class": "GOLD", "no": "998", "constructor": "bmw", "model": "BMW M4 GT3 EVO", "team": "Rowe Racing", "gap": "+38.569", "laps": 176, "time": "+38.569", "drivers": [["Ugo De Wilde", ""], ["Tim Tramnitz", ""], ["Jens Klingmann", ""]], "status": "Classified"}, {"pos": 11, "class": "PRO", "no": "2", "constructor": "porsche", "model": "Porsche 911 GT3 R EVO", "team": "Boutsen VDS", "gap": "+2:15.209", "laps": 176, "time": "+2:15.209", "drivers": [["Morris Schuring", ""], ["Dorian Boccolacci", ""], ["Alessio Picariello", ""]], "status": "Classified"}, {"pos": 12, "class": "PRO", "no": "46", "constructor": "bmw", "model": "BMW M4 GT3 EVO", "team": "Team WRT", "gap": "+1.427", "laps": 175, "time": "+1.427", "drivers": [["Daniel Harper", ""], ["Max Hesse", ""], ["Valentino Rossi", ""]], "status": "Classified"}, {"pos": 13, "class": "BRONZE", "no": "97", "constructor": "porsche", "model": "Porsche 911 GT3 R EVO", "team": "Rutronik Racing", "gap": "+11.324", "laps": 175, "time": "+11.324", "drivers": [["Riccardo Pera", ""], ["Antares Au", ""], ["Loek Hartog", ""]], "status": "Classified"}, {"pos": 14, "class": "PRO", "no": "51", "constructor": "ferrari", "model": "Ferrari 296 GT3 EVO", "team": "AF Corse", "gap": "+13.901", "laps": 175, "time": "+13.901", "drivers": [["Alessio Rovera", ""], ["Nicklas Nielsen", ""], ["Tommaso Mosca", ""]], "status": "Classified"}, {"pos": 15, "class": "PRO", "no": "84", "constructor": "audi", "model": "Audi R8 LMS GT3 EVO II", "team": "Eastalent Racing", "gap": "+32.419", "laps": 175, "time": "+32.419", "drivers": [["Christopher Haase", ""], ["Simon Reicher", ""], ["Markus Winkelhock", ""]], "status": "Classified"}, {"pos": 16, "class": "GOLD", "no": "71", "constructor": "ferrari", "model": "Ferrari 296 GT3 EVO", "team": "Selected Car Racing", "gap": "+32.752", "laps": 175, "time": "+32.752", "drivers": [["Frederik Schandorff", ""], ["Malte Ebdrup", ""], ["Simon Birch", ""]], "status": "Classified"}, {"pos": 17, "class": "SILVER", "no": "9", "constructor": "porsche", "model": "Porsche 911 GT3 R EVO", "team": "Pure Rxcing", "gap": "+33.847", "laps": 175, "time": "+33.847", "drivers": [["Aleksei Nesov", ""], ["Aliaksandr Malykhin", ""], ["Max Hofer", ""]], "status": "Classified"}, {"pos": 18, "class": "SILVER", "no": "30", "constructor": "bmw", "model": "BMW M4 GT3 EVO", "team": "Team WRT", "gap": "+34.629", "laps": 175, "time": "+34.629", "drivers": [["Ignacio Montenegro", ""], ["Matisse Lismont", ""], ["Amaury Cordeel", ""]], "status": "Classified"}, {"pos": 19, "class": "PRO", "no": "50", "constructor": "ferrari", "model": "Ferrari 296 GT3 EVO", "team": "AF Corse", "gap": "+42.247", "laps": 175, "time": "+42.247", "drivers": [["Lilou Wadoux", ""], ["Arthur Leclerc", ""], ["Sean Gelael", ""]], "status": "Classified"}, {"pos": 20, "class": "SILVER", "no": "21", "constructor": "astonmartin", "model": "Aston Martin Vantage AMR GT3 EVO", "team": "Comtoyou Racing", "gap": "+42.737", "laps": 175, "time": "+42.737", "drivers": [["Oliver Söderström", ""], ["Sebastien Baud", ""], ["Kobe Pauwels", ""]], "status": "Classified"}, {"pos": 21, "class": "SILVER", "no": "66", "constructor": "audi", "model": "Audi R8 LMS GT3 EVO II", "team": "Tresor Attempto Racing", "gap": "+44.612", "laps": 175, "time": "+44.612", "drivers": [["Rocco Mazzola", ""], ["Sebastian Øgaard", ""], ["Ariel Levi", ""]], "status": "Classified"}, {"pos": 22, "class": "BRONZE", "no": "87", "constructor": "mercedes", "model": "Mercedes-AMG GT3 EVO", "team": "Winward Racing", "gap": "+50.766", "laps": 175, "time": "+50.766", "drivers": [["Marvin Dienst", ""], ["Gabriele Piana", ""], ["Rinat Salikhov", ""]], "status": "Classified"}, {"pos": 23, "class": "BRONZE", "no": "991", "constructor": "bmw", "model": "BMW M4 GT3 EVO", "team": "Paradine Competition", "gap": "+17.994", "laps": 174, "time": "+17.994", "drivers": [["Dries Vanthoor", ""], ["James Kellett", ""], ["Darren Leung", ""]], "status": "Classified"}, {"pos": 24, "class": "GOLD", "no": "992", "constructor": "bmw", "model": "BMW M4 GT3 EVO", "team": "Paradine Competition", "gap": "+18.610", "laps": 174, "time": "+18.610", "drivers": [["Christian Hahn", ""], ["Ashley Sutton", ""], ["Robert De Haan", ""]], "status": "Classified"}, {"pos": 25, "class": "PRO", "no": "64", "constructor": "ford", "model": "Ford Mustang GT3 EVO", "team": "HRT Ford Racing", "gap": "+22.135", "laps": 174, "time": "+22.135", "drivers": [["Arjun Maini", ""], ["Fabio Scherer", ""], ["Thomas Drouet", ""]], "status": "Classified"}, {"pos": 26, "class": "SILVER", "no": "65", "constructor": "ford", "model": "Ford Mustang GT3 EVO", "team": "HRT Ford Racing", "gap": "+24.799", "laps": 174, "time": "+24.799", "drivers": [["Finn Wiebelhaus", ""], ["Eduardo Coseteng", ""], ["Maxime Oosten", ""]], "status": "Classified"}, {"pos": 27, "class": "BRONZE", "no": "222", "constructor": "mercedes", "model": "Mercedes-AMG GT3 EVO", "team": "2 Seas Motorsport", "gap": "+25.257", "laps": 174, "time": "+25.257", "drivers": [["Reece Barr", ""], ["Charles Dawson", ""], ["Kiern Jewiss", ""]], "status": "Classified"}, {"pos": 28, "class": "BRONZE", "no": "74", "constructor": "ferrari", "model": "Ferrari 296 GT3 EVO", "team": "Kessel Racing", "gap": "+46.558", "laps": 174, "time": "+46.558", "drivers": [["Dustin Blattner", ""], ["Lorenzo Patrese", ""], ["Dennis Marschall", ""]], "status": "Classified"}, {"pos": 29, "class": "BRONZE", "no": "42", "constructor": "bmw", "model": "BMW M4 GT3 EVO", "team": "Oman Racing by Century Motorsport", "gap": "+47.888", "laps": 174, "time": "+47.888", "drivers": [["Ahmad Al Harthy", ""], ["Javier Sagrera", ""], ["Calan Williams", ""]], "status": "Classified"}, {"pos": 30, "class": "SILVER", "no": "25", "constructor": "audi", "model": "Audi R8 LMS GT3 EVO II", "team": "Sainteloc Racing", "gap": "+52.390", "laps": 174, "time": "+52.390", "drivers": [["Ezequiel Perez Companc", ""], ["Etienne Cheli", ""], ["Ivan Klymenko", ""]], "status": "Classified"}, {"pos": 31, "class": "SILVER", "no": "52", "constructor": "ferrari", "model": "Ferrari 296 GT3 EVO", "team": "AF Corse", "gap": "+52.977", "laps": 174, "time": "+52.977", "drivers": [["Matias Zagazeta", ""], ["Jeff Machiels", ""], ["Gilles Stadsbader", ""]], "status": "Classified"}, {"pos": 32, "class": "SILVER", "no": "23", "constructor": "mclaren", "model": "McLaren 720S GT3 EVO", "team": "Team RJN", "gap": "+1:08.855", "laps": 174, "time": "+1:08.855", "drivers": [["Horatio Fitz-Simon", ""], ["Maxwell Lynn", ""], ["Ben Dörr", ""]], "status": "Classified"}, {"pos": 33, "class": "SILVER", "no": "6", "constructor": "mercedes", "model": "Mercedes-AMG GT3 EVO", "team": "GetSpeed Team BartoneBros", "gap": "+1:21.875", "laps": 174, "time": "+1:21.875", "drivers": [["Aurelien Panis", ""], ["Anthony Bartone", ""], ["Cesar Gazeau", ""]], "status": "Classified"}, {"pos": 34, "class": "SILVER", "no": "35", "constructor": "astonmartin", "model": "Aston Martin Vantage AMR GT3 EVO", "team": "Walkenhorst Motorsport", "gap": "+1:27.490", "laps": 174, "time": "+1:27.490", "drivers": [["Gaspard Simon", ""], ["Ethan Ischer", ""], ["Mateo Villagomez", ""]], "status": "Classified"}, {"pos": 35, "class": "BRONZE", "no": "91", "constructor": "porsche", "model": "Porsche 911 GT3 R EVO", "team": "Herberth Motorsport", "gap": "+30.576", "laps": 173, "time": "+30.576", "drivers": [["Ralf Bohn", ""], ["Huub van Eijndhoven", ""], ["Robert Renauer", ""]], "status": "Classified"}, {"pos": 36, "class": "BRONZE", "no": "12", "constructor": "mercedes", "model": "Mercedes-AMG GT3 EVO", "team": "GetSpeed Team Dubai", "gap": "+41.327", "laps": 173, "time": "+41.327", "drivers": [["Gabriel Rindone", ""], ["Tom Kalender", ""], ["Mikael Grenier", ""]], "status": "Classified"}, {"pos": 37, "class": "SILVER", "no": "54", "constructor": "porsche", "model": "Porsche 911 GT3 R EVO", "team": "Dinamic GT", "gap": "+53.340", "laps": 173, "time": "+53.340", "drivers": [["Tanart Sathienthirakul", ""], ["Francesco Simonazzi", ""], ["Angus Whiteside", ""]], "status": "Classified"}, {"pos": 38, "class": "GOLD", "no": "24", "constructor": "corvette", "model": "Chevrolet Corvette Z06 GT3 R", "team": "Steller Motorsport", "gap": "+54.015", "laps": 173, "time": "+54.015", "drivers": [["Antoine Doquin", ""], ["Lorenzo Fluxa Cross", ""], ["Dennis Lind", ""]], "status": "Classified"}, {"pos": 39, "class": "PRO", "no": "63", "constructor": "lamborghini", "model": "Lamborghini Temerario GT3", "team": "TGI Team by GRT", "gap": "+1:29.300", "laps": 173, "time": "+1:29.300", "drivers": [["Franck Perera", ""], ["Maximilian Paul", ""], ["Mirko Bortolotti", ""]], "status": "Classified"}, {"pos": 40, "class": "BRONZE", "no": "914", "constructor": "porsche", "model": "Porsche 911 GT3 R EVO", "team": "Razoon - more than racing", "gap": "+1:46.762", "laps": 173, "time": "+1:46.762", "drivers": [["Gerhard Tweraser", ""], ["Dominik Olbert", ""], ["Benjamin Paque", ""]], "status": "Classified"}, {"pos": 41, "class": "BRONZE", "no": "56", "constructor": "astonmartin", "model": "Aston Martin Vantage AMR GT3 EVO", "team": "Ecurie Ecosse Blackthorn", "gap": "+57.657", "laps": 172, "time": "+57.657", "drivers": [["Jonathan Adam", ""], ["Tom Wood", ""], ["Giacomo Petrobelli", ""]], "status": "Classified"}, {"pos": 42, "class": "SILVER", "no": "45", "constructor": "ferrari", "model": "Ferrari 296 GT3 EVO", "team": "Rinaldi Racing", "gap": "+1:54.511", "laps": 172, "time": "+1:54.511", "drivers": [["Rafael Duran", ""], ["Dylan Medler", ""], ["David Perel", ""]], "status": "Classified"}, {"pos": 43, "class": "BRONZE", "no": "88", "constructor": "audi", "model": "Audi R8 LMS GT3 EVO II", "team": "Tresor Attempto Racing", "gap": "+2:14.325", "laps": 172, "time": "+2:14.325", "drivers": [["Carrie Schreiner", ""], ["Daniele Di Amato", ""], ["Alberto Di Folco", ""]], "status": "Classified"}, {"pos": 44, "class": "BRONZE", "no": "11", "constructor": "astonmartin", "model": "Aston Martin Vantage AMR GT3 EVO", "team": "Comtoyou Racing", "gap": "+2:19.793", "laps": 170, "time": "+2:19.793", "drivers": [["Marcelo Tomasoni", ""], ["Aaron Muss", ""], ["Kyle Marcelli", ""]], "status": "Classified"}, {"pos": 45, "class": "GOLD", "no": "4", "constructor": "mclaren", "model": "McLaren 720S GT3 EVO", "team": "Optimum Motorsport", "gap": "+57.821", "laps": 169, "time": "+57.821", "drivers": [["Adam Smalley", ""], ["Freddie Tomlinson", ""], ["Harry George", ""]], "status": "Classified"}, {"pos": 46, "class": "BRONZE", "no": "67", "constructor": "mercedes", "model": "Mercedes-AMG GT3 EVO", "team": "GetSpeed Team Noble Racing", "gap": "+1:25.310", "laps": 169, "time": "+1:25.310", "drivers": [["Scott Noble", ""], ["Jason Hart", ""], ["Philip Ellis", ""]], "status": "Classified"}, {"pos": 47, "class": "BRONZE", "no": "177", "constructor": "mercedes", "model": "Mercedes-AMG GT3 EVO", "team": "Grupo Prom Racing Team", "gap": "+1:45.122", "laps": 168, "time": "+1:45.122", "drivers": [["Alfredo Hernandez Ortega", ""], ["Stephane Tribaudini", ""], ["Colin Caresani", ""]], "status": "Classified"}, {"pos": 48, "class": "PRO", "no": "18", "constructor": "astonmartin", "model": "Aston Martin Vantage AMR GT3 EVO", "team": "Comtoyou Racing", "gap": "-12:36.716", "laps": 163, "time": "-12:36.716", "drivers": [["Roberto Merhi", ""], ["Lance Stroll", ""], ["Mari Boya", ""]], "status": "Classified"}, {"pos": 49, "class": "BRONZE", "no": "93", "constructor": "porsche", "model": "Porsche 911 GT3 R EVO", "team": "Ziggo Sport Tempesta Racing", "gap": "-51:07.336", "laps": 151, "time": "-51:07.336", "drivers": [["Stefano Costantini", ""], ["Chris Froggatt", ""], ["Eddie Cheever", ""]], "status": "Classified"}, {"pos": 50, "class": "PRO", "no": "96", "constructor": "lamborghini", "model": "Lamborghini Temerario GT3", "team": "Rutronik Racing", "gap": "-2:12:17.645", "laps": 110, "time": "-2:12:17.645", "drivers": [["Luca Engstler", ""], ["Marco Mapelli", ""], ["Patric Niederhauser", ""]], "status": "NC"}, {"pos": 51, "class": "GOLD", "no": "99", "constructor": "audi", "model": "Audi R8 LMS GT3 EVO II", "team": "Tresor Attempto Racing", "gap": "-2:07:03.266", "laps": 116, "time": "-2:07:03.266", "drivers": [["Dylan Pereira", ""], ["Andrea Frassineti", ""], ["Alex Aka", ""]], "status": "NC"}, {"pos": 52, "class": "BRONZE", "no": "60", "constructor": "ferrari", "model": "Ferrari 296 GT3 EVO", "team": "JMW Motorsport", "gap": "-1:32:46.643", "laps": 118, "time": "-1:32:46.643", "drivers": [["Chandler Hull", ""], ["Rolf Ineichen", ""], ["Tim Heinemann", ""]], "status": "NC"}, {"pos": 53, "class": "SILVER", "no": "5", "constructor": "mclaren", "model": "McLaren 720S GT3 EVO", "team": "Optimum Motorsport", "gap": "-1:53:39.316", "laps": 120, "time": "-1:53:39.316", "drivers": [["Michael Porter", ""], ["Dante Rappange", ""], ["Guilherme Oliveira", ""]], "status": "NC"}, {"pos": 54, "class": "PRO", "no": "80", "constructor": "porsche", "model": "Porsche 911 GT3 R EVO", "team": "Lionspeed GP", "gap": "-2:48:55.496", "laps": 95, "time": "-2:48:55.496", "drivers": [["Bastian Buus", ""], ["Thomas Preining", ""], ["Ricardo Feller", ""]], "status": "NC"}, {"pos": 55, "class": "SILVER", "no": "44", "constructor": "mclaren", "model": "McLaren 720S GT3 EVO", "team": "Greystone GT", "gap": "", "laps": 0, "time": "", "drivers": [["Tomas Pintos", ""], ["Jayden Kelly", ""], ["Joshua Rattican", ""]], "status": "NC"}, {"pos": 56, "class": "BRONZE", "no": "89", "constructor": "porsche", "model": "Porsche 911 GT3 R EVO", "team": "Lionspeed GP", "gap": "", "laps": 0, "time": "", "drivers": [["Alex Fontana", ""], ["Bashar Mardini", ""], ["Patrick Kolb", ""]], "status": "NC"}, {"pos": 57, "class": "SILVER", "no": "555", "constructor": "mclaren", "model": "McLaren 720S GT3 EVO", "team": "CSA Racing", "gap": "", "laps": 0, "time": "", "drivers": [["Baptiste Moulin", ""], ["Romain Andriolo", ""], ["Lorens Lecertua", ""]], "status": "NC"}, {"pos": 58, "class": "GOLD", "no": "10", "constructor": "porsche", "model": "Porsche 911 GT3 R EVO", "team": "Boutsen VDS", "gap": "", "laps": 0, "time": "", "drivers": [["Gilles Magnus", ""], ["Robin Knutsson", ""], ["Alessandro Ghiretti", ""]], "status": "NC"}];
  const GTWC_PERF={fastestLaps:[{"type": "FL", "class": "Overall", "no": "7", "driver": "Mattia Drudi", "lap": "", "time": "1:54.737"}, {"type": "FL", "class": "PRO", "no": "7", "driver": "Mattia Drudi", "lap": "", "time": "1:54.737"}, {"type": "FL", "class": "GOLD", "no": "58", "driver": "Thomas Fleming", "lap": "", "time": "1:54.817"}, {"type": "FL", "class": "SILVER", "no": "21", "driver": "Oliver Söderström", "lap": "", "time": "1:55.584"}, {"type": "FL", "class": "BRONZE", "no": "97", "driver": "Riccardo Pera", "lap": "", "time": "1:55.142"}], poles:[{"type": "PP", "class": "Overall", "no": "17", "driver": "Maxime Martin", "time": "1:53.049"}, {"type": "PP", "class": "PRO", "no": "17", "driver": "Maxime Martin", "time": "1:53.049"}]};
  completeRace('wec-imola-2026', WEC_COMPLETE, {"fastestLaps": [{"type": "FL", "class": "Overall", "no": "4", "driver": "Marco Rossi", "lap": 87, "time": "1:48.271"}, {"type": "FL", "class": "HYP", "no": "4", "driver": "Marco Rossi", "lap": 83, "time": "1:32.066"}, {"type": "FL", "class": "LMGT3", "no": "108", "driver": "Nick Nielsen", "lap": 86, "time": "1:42.305"}], "poles": [{"type": "PP", "class": "Overall", "no": "4", "driver": "Marco Rossi", "time": "1:47.883"}, {"type": "PP", "class": "HYP", "no": "4", "driver": "Nico Müller", "time": "1:30.127"}, {"type": "PP", "class": "LMGT3", "no": "108", "driver": "Harry Costa", "time": "1:41.900"}]});
  completeRace('mlmc-paulricard-2026', MLMC_COMPLETE, {"fastestLaps": [{"type": "FL", "class": "Overall", "no": "4", "driver": "Andrea Nielsen", "lap": 87, "time": "1:48.271"}, {"type": "FL", "class": "LMP3", "no": "4", "driver": "Andrea Nielsen", "lap": 83, "time": "1:54.221"}, {"type": "FL", "class": "GT3", "no": "7", "driver": "Arthur Klein", "lap": 86, "time": "2:02.884"}], "poles": [{"type": "PP", "class": "Overall", "no": "4", "driver": "Andrea Nielsen", "time": "1:47.883"}, {"type": "PP", "class": "LMP3", "no": "4", "driver": "David Costa", "time": "1:53.640"}, {"type": "PP", "class": "GT3", "no": "7", "driver": "Martin Ricci", "time": "2:02.310"}]});
  completeRace('gtwc-paulricard-2026', GTWC_COMPLETE, GTWC_PERF, {sources:['GT World Challenge Europe official Paul Ricard 2026 Main Race results page','Official SRO session leaders used for qualifying/FL context; class poles pending combined qualifying import']});
  completeRace('imsa-sebring-2026', IMSA_COMPLETE, {"fastestLaps": [{"type": "FL", "class": "Overall", "no": "4", "driver": "Andrea Nielsen", "lap": 87, "time": "1:48.271"}, {"type": "FL", "class": "GTP", "no": "4", "driver": "Andrea Nielsen", "lap": 83, "time": "1:31.284"}, {"type": "FL", "class": "LMP2", "no": "9", "driver": "Jack Rossi", "lap": 86, "time": "1:35.020"}, {"type": "FL", "class": "GTD_PRO", "no": "7", "driver": "Arthur Klein", "lap": 89, "time": "2:00.112"}, {"type": "FL", "class": "GTD", "no": "5", "driver": "Nick Hansen", "lap": 92, "time": "2:00.780"}], "poles": [{"type": "PP", "class": "Overall", "no": "4", "driver": "Andrea Nielsen", "time": "1:47.883"}, {"type": "PP", "class": "GTP", "no": "4", "driver": "David Costa", "time": "1:45.312"}, {"type": "PP", "class": "LMP2", "no": "9", "driver": "Felix Müller", "time": "1:48.010"}, {"type": "PP", "class": "GTD_PRO", "no": "7", "driver": "Martin Ricci", "time": "1:58.650"}, {"type": "PP", "class": "GTD", "no": "5", "driver": "Harry Schmidt", "time": "1:59.210"}]});
})();


/* --- SCC v0.6.7.6 final order/asset polish patch --- */
(function(){
  function rep(r){const i=RACES.findIndex(x=>x.id===r.id); if(i>=0) RACES[i]=r; else RACES.push(r);}
  function perf(fl,pp){return {fastestLaps:fl,poles:pp};}
  function E(pos,cls,no,con,model,team,laps,gap,intv,drivers,status){return {pos,class:cls,no:String(no),constructor:con,model,team,laps,gap:gap||'—',int:intv||'',time:gap||'',drivers,status:status||'Classified'}}
  const WEC_REAL={id:'wec-imola-2026',season:2026,round:2,series:'wec',event:'6 Hours of Imola',circuit:'Imola',country:'Italy',date:'2026-04-19',scheduledDuration:'06:00:00',officialDuration:'06:00:34.717',scheduledLaps:212,officialLaps:213,
    segments:(RACES.find(r=>r.id==='wec-imola-2026')||{}).segments||[{id:'g0',phase:'GREEN',start:0,end:21635,startLap:0,endLap:213,reason:'Race',notes:'Race Control timeline pending import.'}],
    entries:[
      E(1,'HYP','8','toyota','Toyota GR010 HYBRID','Toyota Racing',213,'—','—',[["Sébastien Buemi","Switzerland"],["Brendon Hartley","New Zealand"],["Ryo Hirakawa","Japan"]]),
      E(2,'HYP','51','ferrari','Ferrari 499P','Ferrari AF Corse',213,'+13.352','+13.352',[["James Calado","United Kingdom"],["Antonio Giovinazzi","Italy"],["Alessandro Pier Guidi","Italy"]]),
      E(3,'HYP','7','toyota','Toyota GR010 HYBRID','Toyota Racing',213,'+41.187','+27.835',[["Mike Conway","United Kingdom"],["Kamui Kobayashi","Japan"],["Nyck de Vries","Netherlands"]]),
      E(4,'HYP','35','alpine','Alpine A424','Alpine Endurance Team',213,'+59.385','+18.198',[["António Félix da Costa","Portugal"],["Ferdinand Habsburg","Austria"],["Charles Milesi","France"]]),
      E(5,'HYP','20','bmw','BMW M Hybrid V8','BMW M Team WRT',213,'+1:00.543','+1.158',[["Robin Frijns","Netherlands"],["René Rast","Germany"]]),
      E(6,'HYP','50','ferrari','Ferrari 499P','Ferrari AF Corse',213,'+1:00.901','+0.358',[["Antonio Fuoco","Italy"],["Miguel Molina","Spain"],["Nicklas Nielsen","Denmark"]]),
      E(7,'HYP','15','bmw','BMW M Hybrid V8','BMW M Team WRT',213,'+1:01.506','+0.605',[["Kevin Magnussen","Denmark"],["Raffaele Marciello","Switzerland"]]),
      E(8,'HYP','38','cadillac','Cadillac V-Series.R','Cadillac Hertz Team JOTA',213,'+1:01.995','+0.489',[["Earl Bamber","New Zealand"],["Sébastien Bourdais","France"]]),
      E(9,'HYP','007','astonmartin','Aston Martin Valkyrie','Aston Martin THOR Team',212,'+1 lap','+1 lap',[["Tom Gamble","United Kingdom"],["Harry Tincknell","United Kingdom"]]),
      E(10,'HYP','83','ferrari','Ferrari 499P','AF Corse',212,'+1 lap','+0.438',[["Philip Hanson","United Kingdom"],["Robert Kubica","Poland"],["Yifei Ye","China"]]),
      E(11,'HYP','36','alpine','Alpine A424','Alpine Endurance Team',212,'+1 lap','+26.710',[["Jules Gounon","France"],["Frédéric Makowiecki","France"],["Victor Martins","France"]]),
      E(12,'HYP','94','peugeot','Peugeot 9X8','Peugeot TotalEnergies',212,'+1 lap','+42.834',[["Loïc Duval","France"],["Malthe Jakobsen","Denmark"],["Théo Pourchaire","France"]]),
      E(13,'HYP','12','cadillac','Cadillac V-Series.R','Cadillac Hertz Team JOTA',212,'+1 lap','+0.278',[["Norman Nato","France"],["Will Stevens","United Kingdom"]]),
      E(14,'HYP','009','astonmartin','Aston Martin Valkyrie','Aston Martin THOR Team',212,'+1 lap','+0.991',[["Alex Riberas","Spain"],["Marco Sørensen","Denmark"]]),
      E(15,'HYP','17','genesis','Genesis GMR-001','Genesis Magma Racing',211,'+2 laps','+1 lap',[["Pipo Derani","Brazil"],["Mathys Jaubert","France"],["André Lotterer","Germany"]]),
      E(16,'HYP','93','peugeot','Peugeot 9X8','Peugeot TotalEnergies',210,'+3 laps','+1 lap',[["Nick Cassidy","New Zealand"],["Paul di Resta","United Kingdom"],["Stoffel Vandoorne","Belgium"]]),
      E(17,'LMGT3','69','bmw','BMW M4 GT3 Evo','Team WRT',194,'+19 laps','+19 laps',[["Dan Harper","United Kingdom"],["Anthony McIntosh","United States"],["Parker Thompson","Canada"]]),
      E(18,'LMGT3','33','corvette','Chevrolet Corvette Z06 GT3.R','TF Sport',194,'+19 laps','',[["Nicky Catsburg","Netherlands"],["Jonny Edgar","United Kingdom"],["Blake McDonald","United States"]]),
      E(19,'LMGT3','92','porsche','Porsche 911 GT3 R (992.2)','The Bend Manthey',193,'+20 laps','+1 lap',[["Richard Lietz","Austria"],["Riccardo Pera","Italy"],["Yasser Shahin","Australia"]]),
      E(20,'LMGT3','91','porsche','Porsche 911 GT3 R (992.2)','Manthey DK Engineering',193,'+20 laps','',[["Timur Boguslavskiy","Taiwan"],["James Cottingham","United Kingdom"],["Ayhancan Güven","Turkey"]]),
      E(21,'LMGT3','32','bmw','BMW M4 GT3 Evo','Team WRT',193,'+20 laps','',[["Augusto Farfus","Brazil"],["Sean Gelael","Indonesia"],["Darren Leung","United Kingdom"]]),
      E(22,'LMGT3','21','ferrari','Ferrari 296 GT3 Evo','Vista AF Corse',193,'+20 laps','',[["François Hériau","France"],["Simon Mann","United States"],["Alessio Rovera","Italy"]]),
      E(23,'LMGT3','58','mclaren','McLaren 720S GT3 Evo','Garage 59',193,'+20 laps','',[["Finn Gehrsitz","Germany"],["Benjamin Goethe","Germany"],["Alexander West","Sweden"]]),
      E(24,'LMGT3','88','ford','Ford Mustang GT3 Evo','Proton Competition',193,'+20 laps','',[["Stefano Gattuso","Italy"],["Giammarco Levorato","Italy"],["Logan Sargeant","United States"]]),
      E(25,'LMGT3','23','astonmartin','Aston Martin Vantage AMR GT3 Evo','Heart of Racing Team',193,'+20 laps','',[["Jonny Adam","United Kingdom"],["Gray Newell","United States"],["Kobe Pauwels","Belgium"]]),
      E(26,'LMGT3','77','ford','Ford Mustang GT3 Evo','Proton Competition',193,'+20 laps','',[["Eric Powell","United States"],["Sebastian Priaulx","United Kingdom"],["Ben Tuck","United Kingdom"]]),
      E(27,'LMGT3','54','ferrari','Ferrari 296 GT3 Evo','Vista AF Corse',192,'+21 laps','+1 lap',[["Francesco Castellacci","Italy"],["Thomas Flohr","Switzerland"],["Davide Rigon","Italy"]]),
      E(28,'LMGT3','79','mercedes','Mercedes-AMG GT3 Evo','Iron Lynx',192,'+21 laps','',[["Matteo Cressoni","Italy"],["Lin Hodenius","Netherlands"],["Johannes Zelger","Italy"]]),
      E(29,'HYP','19','genesis','Genesis GMR-001','Genesis Magma Racing',189,'+24 laps','+3 laps',[["Paul-Loup Chatin","France"],["Mathieu Jaminet","France"],["Daniel Juncadella","Spain"]]),
      E(30,'LMGT3','10','mclaren','McLaren 720S GT3 Evo','Garage 59',179,'+34 laps','+13 laps',[["Antares Au","Hong Kong"],["Tom Fleming","United Kingdom"],["Marvin Kirchhöfer","Germany"]]),
      E(31,'LMGT3','78','lexus','Lexus RC F GT3','Akkodis ASP Team',171,'+42 laps','+8 laps',[["Hadrien David","France"],["Esteban Masson","France"],["Tom Van Rompuy","Belgium"]]),
      E(32,'LMGT3','61','mercedes','Mercedes-AMG GT3 Evo','Iron Lynx',166,'Power loss','',[["Rui Andrade","Angola"],["Martin Berry","Australia"],["Maxime Martin","Belgium"]],'RET'),
      E(33,'LMGT3','34','corvette','Chevrolet Corvette Z06 GT3.R','Racing Team Turkey by TF',162,'Electrical','',[["Peter Dempsey","Ireland"],["Charlie Eastwood","Ireland"],["Salih Yoluç","Turkey"]],'RET'),
      E(34,'LMGT3','27','astonmartin','Aston Martin Vantage AMR GT3 Evo','Heart of Racing Team',146,'Suspension','',[["Mattia Drudi","Italy"],["Ian James","United Kingdom"],["Zacharie Robichon","Canada"]],'RET'),
      E(35,'LMGT3','87','lexus','Lexus RC F GT3','Akkodis ASP Team',32,'Transmission','',[["José María López","Argentina"],["Clemens Schmid","Austria"],["Răzvan Umbrărescu","Romania"]],'RET')
    ],
    performance:perf([{type:'FL',class:'Overall',no:'50',driver:'Antonio Fuoco',lap:89,time:'1:32.066'},{type:'FL',class:'HYP',no:'50',driver:'Antonio Fuoco',lap:89,time:'1:32.066'},{type:'FL',class:'LMGT3',no:'33',driver:'Nicky Catsburg',lap:79,time:'1:42.305'}],[{type:'PP',class:'Overall',no:'51',driver:'Antonio Giovinazzi',time:'1:30.127'},{type:'PP',class:'HYP',no:'51',driver:'Antonio Giovinazzi',time:'1:30.127'},{type:'PP',class:'LMGT3',no:'58',driver:'Garage 59',time:'—'}]),
    completeness:{metadata:true,entryList:true,results:true,fastestLaps:true,poles:true,raceControl:false},sources:['FIA WEC official results page']};
  rep(WEC_REAL);
  const MLMC_REAL={id:'mlmc-paulricard-2026',season:2026,round:2,series:'mlmc',event:'Le Castellet Round',circuit:'Circuit Paul Ricard',country:'France',date:'2026-05-02',scheduledDuration:'02:00:00',officialDuration:'02:00:43.697',scheduledLaps:54,officialLaps:54,segments:(RACES.find(r=>r.id==='mlmc-paulricard-2026')||{}).segments||[{id:'g0',phase:'GREEN',start:0,end:7244,startLap:0,endLap:54,reason:'Race',notes:'Race Control pending import.'}],entries:[
    E(1,'LMP3',50,'ligier','Ligier JS P325 - Toyota','23Events Racing',54,'—','—',[['Giovanni Maschio','Italy'],['Colin Queen','United States']]),E(2,'LMP3',85,'duqueine','Duqueine D09 - Toyota','R-ace GP',54,'+3.421','+3.421',[['Danial Frost','Singapore'],['Enzo Peugeot','France']]),E(3,'LMP3',19,'ligier','Ligier JS P325 - Toyota','Brutal Fish by Campos',54,'+3.849','+0.428',[['Matej Ryba','Slovakia'],['Lorenzo Fluxá Cross','Spain']]),E(4,'LMP3',9,'ligier','Ligier JS P325 - Toyota','ANS Motorsport',54,'+8.591','+4.742',[['Louis Iglesias','France'],['Mackenzie Dodds','United Kingdom']]),E(5,'LMP3',92,'ligier','Ligier JS P325 - Toyota','Forestier Racing by VPS',54,'+17.851','+9.260',[['Sebastian Bach','Denmark'],['Lorenzo Fecury','Brazil']]),E(6,'LMP3',99,'ligier','Ligier JS P325 - Toyota','More Motorsport',54,'+18.682','+0.831',[['Maik van der Snel','Netherlands'],['Tijmen Gerhards','Netherlands']]),E(7,'LMP3',15,'ligier','Ligier JS P325 - Toyota','Vector Sport RLR',54,'+38.552','+19.870',[['Gonzalo Gómez Azza','Spain'],['Colin Noble','United Kingdom']]),E(8,'LMP3',29,'ligier','Ligier JS P325 - Toyota','Forestier Racing by VPS',54,'+38.609','+0.057',[['Lorenzo Morano','Italy'],['Rafael Meyuhas','Israel']]),E(9,'LMP3',4,'duqueine','Duqueine D09 - Toyota','Nielsen Racing',54,'+42.374','+3.765',[['Jules Caranta','France'],['Michael Pitamber','South Africa']]),E(10,'LMP3',5,'ligier','Ligier JS P325 - Toyota','23Events Racing',54,'+44.988','+2.614',[['Ido Barashi','Israel'],['Michael Segre','Italy']]),E(11,'LMP3',68,'ligier','Ligier JS P325 - Toyota','M Racing',54,'+54.523','+9.535',[['Harrison Chance','United Kingdom'],['Nicolas Lopez Cesaratto','France']]),E(12,'LMP3',70,'ligier','Ligier JS P325 - Toyota','Team Virage',54,'+1:20.587','+26.064',[['Victor Stevens','United Kingdom'],['Jens Peters','Luxembourg']]),E(13,'LMP3',98,'ligier','Ligier JS P325 - Toyota','Motorsport98',54,'+1:21.999','+1.412',[['Eric De Doncker','Belgium'],['Gillian Henrion','France']]),E(14,'LMP3',6,'ligier','Ligier JS P325 - Toyota','ANS Motorsport',54,'+1:22.402','+0.403',[['Mikkel Kristensen Illan','Denmark'],['Antoine Pavie','France']]),E(15,'LMP3',62,'ligier','Ligier JS P325 - Toyota','Bretton Racing',54,'+1:30.459','+8.057',[['Jacek Zielonka','Poland'],['Leo Robinson','United Kingdom']]),E(16,'LMP3',36,'ligier','Ligier JS P325 - Toyota','Ajith Redant Racing',54,'+1:40.190','+9.731',[['Akshay Patel','United Kingdom'],['Narain Karthikeyan','India']]),E(17,'LMP3',66,'ligier','Ligier JS P325 - Toyota','Rinaldi Racing',54,'+1:40.517','+0.327',[['Steve Parrow','Germany'],['Mikkel Pedersen','Denmark']]),E(18,'LMP3',34,'ligier','Ligier JS P325 - Toyota','Inter Europol Competition',54,'+1:43.035','+2.518',[['Alexander Bukhantsov','United Kingdom'],['Saif Rashid','United Arab Emirates']]),E(19,'LMP3',20,'ligier','Ligier JS P325 - Toyota','High Class Racing',53,'+1 lap','+1 lap',[['Peder Lindberg','Denmark'],['Louis Ried','Germany']]),E(20,'LMP3',97,'ligier','Ligier JS P325 - Toyota','CLX Motorsport',53,'+1 lap','+6.059',[['Charles Oltramare','Switzerland'],['Dorian Droux','Switzerland']]),E(21,'LMP3',58,'ligier','Ligier JS P325 - Toyota','GG Classics',53,'+1 lap','+9.876',[['James Sweetnam','Ireland'],['Finn Ross','United Kingdom']]),E(22,'LMP3',22,'ligier','Ligier JS P325 - Toyota','Trajectus Motorsport',53,'+1 lap','+2.021',[['Antonio Vieira','Portugal'],['Maxime Poulet','France']]),E(23,'LMP3',24,'ligier','Ligier JS P325 - Toyota','Racing Spirit of Léman',53,'+1 lap','+36.553',[['Christoph Gisy','Switzerland'],['Oliver Kristensen','Denmark']]),E(24,'LMP3',49,'ligier','Ligier JS P325 - Toyota','High Class Racing',53,'+1 lap','+30.662',[['Martin Hove','Denmark'],['Alex Rackstraw','United Kingdom']]),E(25,'GT3',17,'ferrari','Ferrari 296 GT3 Evo','Kessel Racing',53,'+1 lap','+4.017',[['Lorenzo Innocenti','Italy'],['David Fumanelli','Italy']]),E(26,'GT3',51,'ferrari','Ferrari 296 GT3 Evo','AF Corse',53,'+1 lap','+18.874',[['Alessandro Cozzi','Italy'],['Eliseo Donno','Italy']]),E(27,'GT3',10,'astonmartin','Aston Martin Vantage AMR GT3 Evo','Racing Spirit of Léman',53,'+1 lap','+0.700',[['Philipp Sager','Austria'],['Valentin Hasse-Clot','France']]),E(28,'LMP3',27,'ligier','Ligier JS P325 - Toyota','P4 Racing',53,'+1 lap','+16.038',[['Andrew Ferguson','United Kingdom'],['L. Hamilton-Smith','United Kingdom']]),E(29,'LMP3',16,'ligier','Ligier JS P325 - Toyota','Ajith Redant by Virage',52,'+2 laps','+1 lap',[['Akhil Kumar','India'],['Roman Vozniak','Ukraine']]),E(30,'GT3',21,'ferrari','Ferrari 296 GT3 Evo','Kessel Racing',52,'+2 laps','+4.525',[['Oscar Ryndziewicz','Poland'],['Lorenzo Ferrari','Italy']]),E(31,'GT3',77,'mclaren','McLaren 720S GT3 Evo','SMC Motorsport',52,'+2 laps','+1.191',[['Guillem de Andres Martin','Spain'],['Jean-Baptiste Simmenauer','France']]),E(32,'GT3',91,'astonmartin','Aston Martin Vantage AMR GT3 Evo','Ecurie Ecosse Blackthorn',52,'+2 laps','+9.338',[['C. Bovet','Switzerland'],['Tom Canning','United Kingdom']]),E(33,'GT3',54,'porsche','Porsche 911 GT3 (992) EVO','Dinamic GT',52,'+2 laps','+24.505',[['Rene Krahn','Germany'],['Matteo Cressoni','Italy']]),E(34,'GT3',88,'ferrari','Ferrari 296 GT3 Evo','AF Corse',52,'+2 laps','+0.626',[['Ricardo Acosta III','United States'],['Marco Bonanomi','Italy']]),E(35,'GT3',23,'ferrari','Ferrari 296 GT3','Biogas Motorsport',51,'+3 laps','+1 lap',[['Josep Mayola Comadira','Spain'],['Marc Carol Ybarra','Spain']]),E(36,'LMP3',86,'duqueine','Duqueine D09 - Toyota','R-ace GP',44,'NC','', [['Zack Scoular','United Kingdom'],['Laura Bühler','Switzerland']],'NC'),E(37,'LMP3',12,'ligier','Ligier JS P325 - Toyota','Brutal Fish by Campos',36,'NC','',[['Antoine Rogeon','France'],['Alexis Raber','France']],'NC'),E(38,'LMP3',43,'ligier','Ligier JS P325 - Toyota','Inter Europol Competition',34,'NC','',[['Christian Dannemand Jørgensen','Denmark'],['William Karlsson','Sweden']],'NC'),E(39,'GT3',11,'astonmartin','Aston Martin Vantage AMR GT3 Evo','Code Racing Development',29,'NC','',[['Sebastián Moreno','Mexico'],['Ethan Ischer','Switzerland']],'NC'),E(40,'LMP3',71,'ligier','Ligier JS P325 - Toyota','Rinaldi Racing',8,'NC','',[['Sebastian Aust','Germany'],['Frédéric Fernandez-Laser','Germany']],'NC'),E(41,'LMP3',8,'duqueine','Duqueine D09 - Toyota','BWT Muecke Motorsport',0,'NC','',[['Max Pluschkell','Germany'],['Mathis Angelard','France']],'NC'),E(42,'LMP3',87,'ligier','Ligier JS P325 - Toyota','CLX Motorsport',0,'NC','',[['Alex Jacoby','Luxembourg'],['Kevin Rabin','France']],'NC')],performance:perf([{type:'FL',class:'Overall',no:'9',driver:'Louis Iglesias',lap:51,time:'1:58.726'},{type:'FL',class:'LMP3',no:'9',driver:'Louis Iglesias',lap:51,time:'1:58.726'},{type:'FL',class:'GT3',no:'10',driver:'Valentin Hasse-Clot',lap:25,time:'2:03.207'}],[{type:'PP',class:'Overall',no:'50',driver:'Giovanni Maschio',time:'—'},{type:'PP',class:'LMP3',no:'50',driver:'Giovanni Maschio',time:'—'},{type:'PP',class:'GT3',no:'17',driver:'David Fumanelli',time:'—'}]),completeness:{metadata:true,entryList:true,results:true,fastestLaps:true,poles:false,raceControl:false},sources:['Michelin Le Mans Cup / Al Kamel Paul Ricard 2026 final classification PDF']};
  rep(MLMC_REAL);
  const IMSA_REAL=(function(){const entries=[
    E(1,'GTP',7,'porsche','Porsche 963','Porsche Penske Motorsport',343,'—','—',[['Felipe Nasr','Brazil'],['Julien Andlauer','France'],['Laurin Heinrich','Germany']]),E(2,'GTP',6,'porsche','Porsche 963','Porsche Penske Motorsport',343,'+1.515','+1.515',[['Laurens Vanthoor','Belgium'],['Kevin Estre','France'],['Matthew Campbell','Australia']]),E(3,'GTP',31,'cadillac','Cadillac V-Series.R','Whelen Cadillac Racing',343,'+10.377','+0.975',[['Jack Aitken','United Kingdom'],['Earl Bamber','New Zealand'],['Frederik Vesti','Denmark']]),E(4,'GTP',60,'acura','Acura ARX-06','Meyer Shank Racing',343,'+11.104','+0.727',[['Tom Blomqvist','United Kingdom'],['Colin Braun','United States'],['Scott Dixon','New Zealand']]),E(5,'GTP',24,'bmw','BMW M Hybrid V8','BMW M Team RLL',343,'+13.723','+2.619',[['Dries Vanthoor','Belgium'],['Sheldon van der Linde','South Africa'],['Robin Frijns','Netherlands']]),E(6,'GTP',93,'acura','Acura ARX-06','Meyer Shank Racing',343,'+14.819','+1.096',[['Renger van der Zande','Netherlands'],['Nick Yelloly','United Kingdom'],['Alex Palou','Spain']]),E(7,'GTP',40,'cadillac','Cadillac V-Series.R','Wayne Taylor Racing',343,'+16.642','+1.823',[['Jordan Taylor','United States'],['Louis Deletraz','Switzerland'],['Colton Herta','United States']]),E(8,'GTP',5,'porsche','Porsche 963','Proton Competition',343,'+24.739','+8.097',[['Tijmen van der Helm','Netherlands'],['Nicolás Pino','Chile'],['Kaylen Frederick','United States']]),E(9,'LMP2',2,'oreca','Oreca 07 Gibson','United Autosports USA',338,'+5 laps','+5 laps',[['Philip Fayer','Canada'],['Hunter McElrea','Australia'],['Mikkel Jensen','Denmark']]),E(10,'LMP2',22,'oreca','Oreca 07 Gibson','United Autosports USA',338,'+5 laps','+0.510',[['Dan Goldburg','United States'],['Paul di Resta','United Kingdom'],['Rasmus Lindh','Sweden']]),E(11,'LMP2',8,'oreca','Oreca 07 Gibson','Tower Motorsports',338,'+5 laps','+11.368',[['John Farano','Canada'],['Tristan Vautier','France'],['Sebastian Alvarez','Spain']]),E(12,'LMP2',18,'oreca','Oreca 07 Gibson','Era Motorsport',338,'+5 laps','+0.538',[['Naveen Rao','United States'],['Ferdinand Habsburg','Austria'],['Jacob Abel','United States']]),E(13,'LMP2','04','oreca','Oreca 07 Gibson','CrowdStrike Racing by APR',338,'+5 laps','+0.023',[['George Kurtz','United States'],['Alex Quinn','United Kingdom'],['Toby Sowery','United Kingdom']]),E(14,'LMP2',99,'oreca','Oreca 07 Gibson','AO Racing',338,'+5 laps','+0.852',[['PJ Hyett','United States'],['Dane Cameron','United States'],['Jonny Edgar','United Kingdom']]),E(15,'LMP2',11,'oreca','Oreca 07 Gibson','TDS Racing',338,'+5 laps','+1.550',[['Tobi Lutke','Canada'],['Charles Milesi','France'],['David Heinemeier Hansson','Denmark']]),E(16,'LMP2',52,'oreca','Oreca 07 Gibson','PR1 Mathiasen Motorsports',336,'+7 laps','+2 laps',[['Mikhail Goikhberg','Canada'],['Parker Thompson','Canada'],['Harry Tincknell','United Kingdom']]),E(17,'LMP2',73,'oreca','Oreca 07 Gibson','Inter Europol Competition',336,'+7 laps','+7.172',[['Pietro Fittipaldi','Brazil'],['Manuel Espírito Santo','Portugal'],['Christopher Cumming','Canada']]),E(18,'LMP2',37,'oreca','Oreca 07 Gibson','TDS Racing',334,'+9 laps','+2 laps',[['Oliver Jarvis','United Kingdom'],['Seth Lucas','United States'],['Jon Field','United States']]),E(19,'GTP',23,'astonmartin','Aston Martin Valkyrie','Heart of Racing Team',331,'+12 laps','+3 laps',[['Ross Gunn','United Kingdom'],['Roman De Angelis','Canada'],['Alex Riberas','Spain']]),E(20,'GTP',25,'bmw','BMW M Hybrid V8','BMW M Team RLL',329,'+14 laps','+2 laps',[['Philipp Eng','Austria'],['Marco Wittmann','Germany'],['Kevin Magnussen','Denmark']]),E(21,'GTP',10,'cadillac','Cadillac V-Series.R','Wayne Taylor Racing',343,'DSQ','', [['Ricky Taylor','United States'],['Filipe Albuquerque','Portugal'],['Will Stevens','United Kingdom']],'DSQ'),E(22,'GTD_PRO',911,'porsche','Porsche 911 GT3 R','Manthey',321,'+22 laps','+8 laps',[['Thomas Preining','Austria'],['Klaus Bachler','Austria'],['Ricardo Feller','Switzerland']]),E(23,'GTD_PRO',77,'porsche','Porsche 911 GT3 R','AO Racing',321,'+22 laps','+1.430',[['Nick Tandy','United Kingdom'],['Harry King','United Kingdom'],['Alessio Picariello','Belgium']]),E(24,'GTD_PRO',4,'corvette','Corvette Z06 GT3.R','Corvette Racing by Pratt Miller',321,'+22 laps','+3.810',[['Tommy Milner','United States'],['Nicky Catsburg','Netherlands'],['Nicolás Varrone','Argentina']]),E(25,'GTD_PRO',3,'corvette','Corvette Z06 GT3.R','Corvette Racing by Pratt Miller',321,'+22 laps','+7.187',[['Antonio García','Spain'],['Alexander Sims','United Kingdom'],['Marvin Kirchhöfer','Germany']]),E(26,'GTD_PRO',1,'bmw','BMW M4 GT3 EVO','Paul Miller Racing',321,'+22 laps','+1.100',[['Neil Verhagen','United States'],['Connor De Phillippi','United States'],['Max Hesse','Germany']]),E(27,'GTD_PRO',64,'ford','Ford Mustang GT3','Ford Multimatic Motorsports',321,'+22 laps','+0.524',[['Ben Barker','United Kingdom'],['Dennis Olsen','Norway'],['Mike Rockenfeller','Germany']]),E(28,'GTD_PRO','033','ferrari','Ferrari 296 GT3','Risi Competizione',321,'+22 laps','+20.553',[['James Calado','United Kingdom'],['Riccardo Agostini','Italy'],['Miguel Molina','Spain']]),E(29,'GTD_PRO',65,'ford','Ford Mustang GT3','Ford Multimatic Motorsports',321,'+22 laps','+50.464',[['Christopher Mies','Germany'],['Frédéric Vervisch','Belgium'],['Sebastian Priaulx','France']]),E(30,'GTD_PRO',59,'mclaren','McLaren 720S GT3 EVO','United Autosports',320,'+23 laps','+1 lap',[['Max Esterson','United States'],['Nikita Johnson','United States'],['Dean MacDonald','United Kingdom']]),E(31,'GTD_PRO',9,'lamborghini','Lamborghini Temerario GT3','Pfaff Motorsports',320,'+23 laps','+1:05.005',[['Andrea Caldarelli','Italy'],['Sandy Mitchell','United Kingdom'],['Franck Perera','France']]),E(32,'GTD',21,'ferrari','Ferrari 296 GT3','AF Corse',318,'+25 laps','+2 laps',[['Simon Mann','United States'],['Lilou Wadoux','France'],['Antonio Fuoco','Italy']]),E(33,'GTD',27,'astonmartin','Aston Martin Vantage GT3 Evo','Heart of Racing Team',318,'+25 laps','+0.746',[['Tom Gamble','United Kingdom'],['Dudu Barrichello','Brazil'],['Zacharie Robichon','Canada']]),E(34,'GTD',120,'porsche','Porsche 911 GT3 R','Wright Motorsports',318,'+25 laps','+6.338',[['Adam Adelson','United States'],['Tom Sargent','Australia'],['Callum Ilott','United Kingdom']]),E(35,'GTD',80,'mercedes','Mercedes-AMG GT3','Lone Star Racing',318,'+25 laps','+1.141',[['Scott Andrews','Australia'],['Lin Hodenius','Netherlands'],['James Roe','Ireland']]),E(36,'GTD',96,'bmw','BMW M4 GT3 EVO','Turner Motorsport',318,'+25 laps','+0.417',[['Patrick Gallagher','United States'],['Robby Foley','United States'],['Francis Selldorff','United States']]),E(37,'GTD',13,'corvette','Corvette Z06 GT3.R','AWA',318,'+25 laps','+2.906',[['Orey Fidani','Canada'],['Matt Bell','United States'],['Lars Kern','Germany']]),E(38,'GTD',34,'ferrari','Ferrari 296 GT3','Conquest Racing',318,'+25 laps','+24.904',[['Manny Franco','United States'],['Albert Costa Balboa','Spain'],['Lorenzo Patrese','Italy']]),E(39,'GTD',66,'ford','Ford Mustang GT3','Gradient Racing',318,'+25 laps','+33.110',[['Jake Walker','United States'],['Till Bechtolsheimer','United States'],['Joey Hand','United States']]),E(40,'GTD',36,'corvette','Corvette Z06 GT3.R','DXDT Racing',317,'+26 laps','+1 lap',[['Mason Filippi','United States'],['Charlie Eastwood','Ireland'],['Salih Yoluç','Turkey']]),E(41,'GTD_PRO',14,'lexus','Lexus RC F GT3','Vasser Sullivan',316,'+27 laps','+1 lap',[['Jack Hawksworth','United Kingdom'],['Ben Barnicoat','United Kingdom'],['Kyle Kirkwood','United States']]),E(42,'GTD',28,'porsche','Porsche 911 GT3 R','RS1',312,'+31 laps','+4 laps',[['Jan Heylen','Belgium'],['Dillon Machavern','United States'],['Spencer Pumpelly','United States']]),E(43,'LMP2',43,'oreca','Oreca 07 Gibson','Inter Europol Competition',303,'+40 laps','+9 laps',[['Tom Dillmann','France'],['Bijoy Garg','United States'],['Jeremy Clarke','United States']]),E(44,'GTD',16,'ford','Ford Mustang GT3','Gradient Racing',279,'RET','+23 laps',[['Sheena Monk','United States'],['Felipe Fraga','Brazil'],['Jenson Altzman','United States']],'RET'),E(45,'GTD',12,'lexus','Lexus RC F GT3','Vasser Sullivan',268,'+75 laps','+11 laps',[['Aaron Telitz','United States'],['Benjamin Pedersen','Denmark'],['Frankie Montecalvo','United States']]),E(46,'GTD',19,'astonmartin','Aston Martin Vantage GT3 Evo','Van der Steur Racing',239,'RET','+29 laps',[['Valentin Hasse-Clot','France'],['Rory van der Steur','United States'],['Sébastien Baud','France']],'RET'),E(47,'GTD_PRO',48,'mercedes','Mercedes-AMG GT3','Winward Racing',223,'RET','+16 laps',[['Scott Noble','United States'],['Jason Hart','United States'],['Luca Stolz','Germany']],'RET'),E(48,'GTD','023','ferrari','Ferrari 296 GT3','Triarsi Competizione',208,'RET','+15 laps',[['Onofrio Triarsi','United States'],['Kenton Koch','United States'],['Robert Megennis','United States']],'RET'),E(49,'GTD',81,'corvette','Corvette Z06 GT3.R','Dragonspeed',155,'RET','+53 laps',[['Henrik Hedman','Sweden'],['Giacomo Altoè','Italy'],['Casper Stevenson','United Kingdom']],'RET'),E(50,'GTD',45,'lamborghini','Lamborghini Huracan GT3 EVO2','Wayne Taylor Racing',150,'RET','+5 laps',[['Danny Formal','Costa Rica'],['Trent Hindman','United States'],['Graham Doyle','United States']],'RET'),E(51,'GTD',70,'ferrari','Ferrari 296 GT3','Inception Racing',111,'RET','+39 laps',[['Brendan Iribe','United States'],['Frederik Schandorff','Denmark'],['Ollie Millroy','United Kingdom']],'RET'),E(52,'GTD_PRO',62,'ferrari','Ferrari 296 GT3','Risi Competizione',76,'RET','+35 laps',[['Daniel Serra','Brazil'],['Davide Rigon','Italy'],['Alessandro Pier Guidi','Italy']],'RET'),E(53,'GTD',57,'mercedes','Mercedes-AMG GT3','Winward Racing',76,'RET','+2.032',[['Russell Ward','United States'],['Philip Ellis','Switzerland'],['Indy Dontje','Netherlands']],'RET'),E(54,'GTD',912,'porsche','Porsche 911 GT3 R','Manthey',302,'RET','', [['Riccardo Pera','Italy'],['Morris Schuring','Netherlands'],['Ryan Hardwick','United States']],'RET')];return {id:'imsa-sebring-2026',season:2026,round:2,series:'imsa',event:'12 Hours of Sebring',circuit:'Sebring',country:'United States',date:'2026-03-21',scheduledDuration:'12:00:00',officialDuration:'12:01:48.652',scheduledLaps:342,officialLaps:343,segments:(RACES.find(r=>r.id==='imsa-sebring-2026')||{}).segments||[{id:'g0',phase:'GREEN',start:0,end:43309,startLap:0,endLap:343,reason:'Race',notes:'Race Control pending import.'}],entries,performance:perf([{type:'FL',class:'Overall',no:'31',driver:'Jack Aitken',time:'1:31.284'},{type:'FL',class:'GTP',no:'31',driver:'Jack Aitken',time:'1:31.284'},{type:'FL',class:'LMP2',no:'2',driver:'Ben Hanley',time:'1:35.020'},{type:'FL',class:'GTD_PRO',no:'911',driver:'Laurin Heinrich',time:'2:00.112'},{type:'FL',class:'GTD',no:'21',driver:'Antonio Fuoco',time:'2:00.780'}],[{type:'PP',class:'Overall',no:'31',driver:'Jack Aitken',time:'—'}]),completeness:{metadata:true,entryList:true,results:true,fastestLaps:true,poles:false,raceControl:false},sources:['Motorsport.com full IMSA Sebring 2026 results table']}})();
  rep(IMSA_REAL);
  window.RACES=RACES;
})();

/* --- SCC v0.7.3: import/database fixes and WEC Spa PDF reference race --- */
Object.assign(SCC_FLAG_SVGS,{
  ro:`<svg viewBox="0 0 3 2"><path fill="#002b7f" d="M0 0h1v2H0z"/><path fill="#fcd116" d="M1 0h1v2H1z"/><path fill="#ce1126" d="M2 0h1v2H2z"/></svg>`,
  id:`<svg viewBox="0 0 3 2"><path fill="#ce1126" d="M0 0h3v1H0z"/><path fill="#fff" d="M0 1h3v1H0z"/></svg>`,
  li:`<svg viewBox="0 0 5 3"><path fill="#002b7f" d="M0 0h5v1.5H0z"/><path fill="#ce1126" d="M0 1.5h5V3H0z"/><text x="1" y="1" fill="#ffd83d" font-size=".8">♛</text></svg>`,
  sg:`<svg viewBox="0 0 3 2"><path fill="#ef3340" d="M0 0h3v1H0z"/><path fill="#fff" d="M0 1h3v1H0z"/><text x=".55" y=".72" fill="#fff" font-size=".55">☾</text></svg>`,
  sk:`<svg viewBox="0 0 3 2"><path fill="#fff" d="M0 0h3v.667H0z"/><path fill="#0b4ea2" d="M0 .667h3v.666H0z"/><path fill="#ee1c25" d="M0 1.333h3V2H0z"/></svg>`,
  si:`<svg viewBox="0 0 3 2"><path fill="#fff" d="M0 0h3v.667H0z"/><path fill="#005da4" d="M0 .667h3v.666H0z"/><path fill="#ed1c24" d="M0 1.333h3V2H0z"/></svg>`
});
Object.assign(FLAG_ALIASES,{Romania:'ro',ROU:'ro',RO:'ro',Indonesia:'id',IDN:'id',ID:'id',Liechtenstein:'li',LIE:'li',LI:'li',Singapore:'sg',SGP:'sg',SG:'sg',Slovakia:'sk',SVK:'sk',SK:'sk',Slovenia:'si',SVN:'si',SI:'si'});


/* --- SCC v0.8.6.20.1 clean baseline: WEC 2026 calendar + Imola data --- */
(function(){
  const D=(n,c)=>[n,c||''];
  function entry(pos, cls, no, cons, model, team, gap, laps, drivers, status='FIN'){
    return {pos,class:cls,no:String(no),constructor:cons,model,team,gap,time:gap,laps,drivers:drivers.map(x=>D(x[0],x[1])),status};
  }
  function imolaEntries(){
    return [
      entry(1,'HYP','8','toyota','Toyota GR010 Hybrid','Toyota Racing','6:00:34.717',213,[['Sébastien Buemi','Switzerland'],['Brendon Hartley','New Zealand'],['Ryo Hirakawa','Japan']]),
      entry(2,'HYP','51','ferrari','Ferrari 499P','Ferrari AF Corse','+13.352',213,[['James Calado','United Kingdom'],['Antonio Giovinazzi','Italy'],['Alessandro Pier Guidi','Italy']]),
      entry(3,'HYP','7','toyota','Toyota GR010 Hybrid','Toyota Racing','+41.187',213,[['Mike Conway','United Kingdom'],['Kamui Kobayashi','Japan'],['Nyck de Vries','Netherlands']]),
      entry(4,'HYP','35','alpine','Alpine A424','Alpine Endurance Team','+59.385',213,[['António Félix da Costa','Portugal'],['Ferdinand Habsburg','Austria'],['Charles Milesi','France']]),
      entry(5,'HYP','20','bmw','BMW M Hybrid V8','BMW M Team WRT','+1:00.543',213,[['Robin Frijns','Netherlands'],['René Rast','Germany']]),
      entry(6,'HYP','50','ferrari','Ferrari 499P','Ferrari AF Corse','+1:00.901',213,[['Antonio Fuoco','Italy'],['Miguel Molina','Spain'],['Nicklas Nielsen','Denmark']]),
      entry(7,'HYP','15','bmw','BMW M Hybrid V8','BMW M Team WRT','+1:01.506',213,[['Kevin Magnussen','Denmark'],['Raffaele Marciello','Switzerland']]),
      entry(8,'HYP','38','cadillac','Cadillac V-Series.R','Cadillac Hertz Team JOTA','+1:01.995',213,[['Earl Bamber','New Zealand'],['Sébastien Bourdais','France']]),
      entry(9,'HYP','007','astonmartin','Aston Martin Valkyrie','Aston Martin THOR Team','+1 lap',212,[['Tom Gamble','United Kingdom'],['Harry Tincknell','United Kingdom']]),
      entry(10,'HYP','83','ferrari','Ferrari 499P','AF Corse','+1 lap',212,[['Phil Hanson','United Kingdom'],['Robert Kubica','Poland'],['Yifei Ye','China']]),
      entry(11,'HYP','36','alpine','Alpine A424','Alpine Endurance Team','+1 lap',212,[['Jules Gounon','France'],['Frédéric Makowiecki','France'],['Victor Martins','France']]),
      entry(12,'HYP','94','peugeot','Peugeot 9X8','Peugeot TotalEnergies','+1 lap',212,[['Loïc Duval','France'],['Malthe Jakobsen','Denmark'],['Théo Pourchaire','France']]),
      entry(13,'HYP','12','cadillac','Cadillac V-Series.R','Cadillac Hertz Team JOTA','+1 lap',212,[['Norman Nato','France'],['Will Stevens','United Kingdom']]),
      entry(14,'HYP','009','astonmartin','Aston Martin Valkyrie','Aston Martin THOR Team','+1 lap',212,[['Alex Riberas','Spain'],['Marco Sørensen','Denmark']]),
      entry(15,'HYP','17','genesis','Genesis GMR-001','Genesis Magma Racing','+2 laps',211,[['Pipo Derani','Brazil'],['Mathys Jaubert','France'],['André Lotterer','Germany']]),
      entry(16,'HYP','93','peugeot','Peugeot 9X8','Peugeot TotalEnergies','+3 laps',210,[['Nick Cassidy','New Zealand'],['Paul di Resta','United Kingdom'],['Stoffel Vandoorne','Belgium']]),
      entry(17,'LMGT3','69','bmw','BMW M4 GT3 Evo','Team WRT','+19 laps',194,[['Dan Harper','United Kingdom'],['Anthony McIntosh','United States'],['Parker Thompson','Canada']]),
      entry(18,'LMGT3','33','corvette','Chevrolet Corvette Z06 GT3.R','TF Sport','+19 laps',194,[['Nicky Catsburg','Netherlands'],['Jonny Edgar','United Kingdom'],['Blake McDonald','United States']]),
      entry(19,'LMGT3','92','porsche','Porsche 911 GT3 R','The Bend Manthey','+20 laps',193,[['Richard Lietz','Austria'],['Riccardo Pera','Italy'],['Yasser Shahin','Australia']]),
      entry(20,'LMGT3','91','porsche','Porsche 911 GT3 R','Manthey DK Engineering','+20 laps',193,[['Timur Boguslavskiy','Kyrgyzstan'],['James Cottingham','United Kingdom'],['Ayhancan Güven','Turkey']]),
      entry(21,'LMGT3','32','bmw','BMW M4 GT3 Evo','Team WRT','+20 laps',193,[['Augusto Farfus','Brazil'],['Sean Gelael','Indonesia'],['Darren Leung','United Kingdom']]),
      entry(22,'LMGT3','21','ferrari','Ferrari 296 GT3 Evo','Vista AF Corse','+20 laps',193,[['François Hériau','France'],['Simon Mann','United States'],['Alessio Rovera','Italy']]),
      entry(23,'LMGT3','58','mclaren','McLaren 720S GT3 Evo','Garage 59','+20 laps',193,[['Finn Gehrsitz','Germany'],['Benjamin Goethe','Germany'],['Alexander West','Sweden']]),
      entry(24,'LMGT3','88','ford','Ford Mustang GT3 Evo','Proton Competition','+20 laps',193,[['Stefano Gattuso','Italy'],['Giammarco Levorato','Italy'],['Logan Sargeant','United States']]),
      entry(25,'LMGT3','23','astonmartin','Aston Martin Vantage AMR GT3 Evo','Heart of Racing Team','+20 laps',193,[['Jonny Adam','United Kingdom'],['Gray Newell','United States'],['Kobe Pauwels','Belgium']]),
      entry(26,'LMGT3','77','ford','Ford Mustang GT3 Evo','Proton Competition','+20 laps',193,[['Eric Powell','United States'],['Sebastian Priaulx','United Kingdom'],['Ben Tuck','United Kingdom']]),
      entry(27,'LMGT3','54','ferrari','Ferrari 296 GT3 Evo','Vista AF Corse','+21 laps',192,[['Francesco Castellacci','Italy'],['Thomas Flohr','Switzerland'],['Davide Rigon','Italy']]),
      entry(28,'LMGT3','79','mercedes','Mercedes-AMG GT3 Evo','Iron Lynx','+21 laps',192,[['Matteo Cressoni','Italy'],['Lin Hodenius','Netherlands'],['Johannes Zelger','Italy']]),
      entry(29,'HYP','19','genesis','Genesis GMR-001','Genesis Magma Racing','+24 laps',189,[['Paul-Loup Chatin','France'],['Mathieu Jaminet','France'],['Daniel Juncadella','Spain']]),
      entry(30,'LMGT3','10','mclaren','McLaren 720S GT3 Evo','Garage 59','+34 laps',179,[['Antares Au','Hong Kong'],['Tom Fleming','United Kingdom'],['Marvin Kirchhöfer','Germany']]),
      entry(31,'LMGT3','78','lexus','Lexus RC F GT3','Akkodis ASP Team','+42 laps',171,[['Hadrien David','France'],['Esteban Masson','France'],['Tom Van Rompuy','Belgium']]),
      entry(32,'LMGT3','61','mercedes','Mercedes-AMG GT3 Evo','Iron Lynx','Power loss',166,[['Rui Andrade','Angola'],['Martin Berry','Australia'],['Maxime Martin','Belgium']],'RET'),
      entry(33,'LMGT3','34','corvette','Chevrolet Corvette Z06 GT3.R','Racing Team Turkey by TF','Electrical',162,[['Peter Dempsey','Ireland'],['Charlie Eastwood','Ireland'],['Salih Yoluç','Turkey']],'RET'),
      entry(34,'LMGT3','27','astonmartin','Aston Martin Vantage AMR GT3 Evo','Heart of Racing Team','Suspension',146,[['Mattia Drudi','Italy'],['Ian James','United Kingdom'],['Zacharie Robichon','Canada']],'RET'),
      entry(35,'LMGT3','87','lexus','Lexus RC F GT3','Akkodis ASP Team','Transmission',32,[['José María López','Argentina'],['Clemens Schmid','Austria'],['Răzvan Umbrărescu','Romania']],'RET')
    ];
  }
  
  function setCleanCalendar(){
    const updates={
      'wec-imola-2026':{round:1,date:'2026-04-19'},
      'wec-spa-2026':{round:2,date:'2026-05-09'},
      'wec-lemans-2026':{round:3,date:'2026-06-14'},
      'wec-saopaulo-2026':{round:4,date:'2026-07-12'},
      'wec-cota-2026':{round:5,date:'2026-09-06'},
      'wec-fuji-2026':{round:6,date:'2026-09-27'},
      'wec-qatar-2026':{round:7,date:'2026-10-24'},
      'wec-bahrain-2026':{round:8,date:'2026-11-07'}
    };
    (RACES||[]).forEach(r=>{ if(updates[r.id]) Object.assign(r,updates[r.id]); });
  }
  function setCleanImola(){
    const old=(RACES||[]).find(r=>r.id==='wec-imola-2026')||{};
    const entries=imolaEntries();
    const e33=entries.find(e=>String(e.no)==='33'&&e.class==='LMGT3');
    if(e33){ e33.int='+0.265'; e33.interval='+0.265'; }
    const race={
      id:'wec-imola-2026',season:2026,round:1,series:'wec',event:'6 Hours of Imola',circuit:'Imola',country:'Italy',date:'2026-04-19',
      scheduledDuration:'06:00:00',officialDuration:'06:00:34.717',scheduledLaps:212,officialLaps:213,
      segments:old.segments||[{id:'g0',phase:'GREEN',start:0,end:21635,startLap:0,endLap:213,reason:'Race',notes:'Race Control timeline pending import.'}],
      entries,
      performance:{
        fastestLaps:[
          {type:'FL',class:'Overall',no:'50',team:'Ferrari AF Corse',driver:'Antonio Fuoco',lap:89,time:'1:32.066'},
          {type:'FL',class:'HYP',no:'50',team:'Ferrari AF Corse',driver:'Antonio Fuoco',lap:89,time:'1:32.066'},
          {type:'FL',class:'LMGT3',no:'33',team:'TF Sport',driver:'Jonny Edgar',lap:79,time:'1:42.305'}
        ],
        poles:[
          {type:'PP',class:'Overall',no:'51',team:'Ferrari AF Corse',driver:'Antonio Giovinazzi',time:'1:30.127'},
          {type:'PP',class:'HYP',no:'51',team:'Ferrari AF Corse',driver:'Antonio Giovinazzi',time:'1:30.127'},
          {type:'PP',class:'LMGT3',no:'10',team:'Garage 59',driver:'Marvin Kirchhöfer',time:'1:41.181'}
        ]
      },
      completeness:{metadata:true,results:true,fastestLaps:true,poles:true,raceControl:false},
      sources:['Clean in-data Imola 2026 reference baseline']
    };
    const idx=RACES.findIndex(r=>r.id==='wec-imola-2026');
    if(idx>=0) RACES[idx]=race; else RACES.push(race);
  }
  setCleanCalendar();
  setCleanImola();
  if(typeof window!=='undefined') window.RACES=RACES;
})();

Object.assign((typeof window!=='undefined' ? (window.SCC_PRE_DRIVER_COUNTRY_DB||(window.SCC_PRE_DRIVER_COUNTRY_DB={})) : {}), {
  'Petru Umbrarescu':'Romania','Petru Umbrarescu':'Romania','P. Umbrarescu':'Romania','J. Zelger':'Liechtenstein','Jonathan Adam':'United Kingdom','Tom Gamble':'United Kingdom','Alec Udell':'United States','Charlie Eastwood':'Ireland','Daniil Kvyat':'Russia','Tomasso Mosca':'Italy','Tommaso Mosca':'Italy'
});

(function fixImolaDuplicateDrivers(){
  const r=RACES.find(x=>x.id==='wec-imola-2026');
  if(!r||!r.entries)return;
  const gen=r.entries.find(e=>String(e.no)==='19' && /Genesis/i.test(e.team||''));
  if(gen){ gen.drivers=[['Mathieu Jaminet','France'],['Paul-Loup Chatin','France'],['Daniil Kvyat','Russia']]; }
})();

const WEC_SPA_2026_ENTRIES=[
{pos:1,class:'HYP',no:'20',constructor:'bmw',model:'BMW M Hybrid V8',team:'BMW M Team WRT',laps:151,time:'6:01:17.036',gap:'—',int:'—',drivers:[['Robin Frijns','Netherlands'],['René Rast','Germany'],['Sheldon Van Der Linde','South Africa']]},
{pos:2,class:'HYP',no:'15',constructor:'bmw',model:'BMW M Hybrid V8',team:'BMW M Team WRT',laps:151,time:'6:01:19.005',gap:'+1.969',int:'+1.969',drivers:[['Kevin Magnussen','Denmark'],['Raffaele Marciello','Switzerland'],['Dries Vanthoor','Belgium']]},
{pos:3,class:'HYP',no:'50',constructor:'ferrari',model:'Ferrari 499P',team:'Ferrari AF Corse',laps:151,time:'6:01:19.658',gap:'+2.622',int:'+0.653',drivers:[['Antonio Fuoco','Italy'],['Miguel Molina','Spain'],['Nicklas Nielsen','Denmark']]},
{pos:4,class:'HYP',no:'007',constructor:'astonmartin',model:'Aston Martin Valkyrie',team:'Aston Martin Thor Team',laps:151,time:'6:01:22.040',gap:'+5.004',int:'+2.382',drivers:[['Harry Tincknell','United Kingdom'],['Tom Gamble','United Kingdom']]},
{pos:5,class:'HYP',no:'7',constructor:'toyota',model:'Toyota TR010 Hybrid',team:'Toyota Racing',laps:151,time:'6:01:23.051',gap:'+6.015',int:'+1.011',drivers:[['Mike Conway','United Kingdom'],['Kamui Kobayashi','Japan'],['Nyck de Vries','Netherlands']]},
{pos:6,class:'HYP',no:'83',constructor:'ferrari',model:'Ferrari 499P',team:'AF Corse',laps:151,time:'6:01:28.588',gap:'+11.552',int:'+5.537',drivers:[['Yifei Ye','China'],['Robert Kubica','Poland'],['Philip Hanson','United Kingdom']]},
{pos:7,class:'HYP',no:'93',constructor:'peugeot',model:'Peugeot 9X8',team:'Peugeot Totalenergies',laps:151,time:'6:01:29.897',gap:'+12.861',int:'+1.309',drivers:[['Paul Di Resta','United Kingdom'],['Stoffel Vandoorne','Belgium'],['Nick Cassidy','New Zealand']]},
{pos:8,class:'HYP',no:'17',constructor:'genesis',model:'Genesis GMR-001-Hypercar',team:'Genesis Magma Racing',laps:151,time:'6:01:46.918',gap:'+29.882',int:'+17.021',drivers:[['André Lotterer','Germany'],['Luis Felipe Derani','Brazil'],['Mathys Jaubert','France']]},
{pos:9,class:'HYP',no:'12',constructor:'cadillac',model:'Cadillac V-Series.R',team:'Cadillac Hertz Team Jota',laps:151,time:'6:01:48.873',gap:'+31.837',int:'+1.955',drivers:[['Will Stevens','United Kingdom'],['Norman Nato','France'],['Louis Delétraz','Switzerland']]},
{pos:10,class:'HYP',no:'8',constructor:'toyota',model:'Toyota TR010 Hybrid',team:'Toyota Racing',laps:151,time:'6:01:49.201',gap:'+32.165',int:'+0.328',drivers:[['Sébastien Buemi','Switzerland'],['Brendon Hartley','New Zealand'],['Ryo Hirakawa','Japan']]},
{pos:11,class:'HYP',no:'36',constructor:'alpine',model:'Alpine A424',team:'Alpine Endurance Team',laps:151,time:'6:01:49.412',gap:'+32.376',int:'+0.211',drivers:[['Frédéric Makowiecki','France'],['Jules Gounon','France'],['Victor Martins','France']]},
{pos:12,class:'HYP',no:'35',constructor:'alpine',model:'Alpine A424',team:'Alpine Endurance Team',laps:149,time:'6:02:46.639',gap:'+2 laps',int:'+2 laps',drivers:[['António Félix da Costa','Portugal'],['Charles Milesi','France'],['Ferdinand Habsburg','Austria']]},
{pos:13,class:'HYP',no:'19',constructor:'genesis',model:'Genesis GMR-001-Hypercar',team:'Genesis Magma Racing',laps:143,time:'6:01:51.636',gap:'+8 laps',int:'+6 laps',drivers:[['Mathieu Jaminet','France'],['Paul-Loup Chatin','France'],['Daniil Kvyat','Russia']]},
{pos:14,class:'LMGT3',no:'10',constructor:'mclaren',model:'McLaren 720S LMGT3 Evo',team:'Garage 59',laps:139,time:'6:01:45.434',gap:'—',int:'—',drivers:[['Alexander Au','Hong Kong'],['Tom Fleming','United Kingdom'],['Marvin Kirchhöfer','Germany']]},
{pos:15,class:'LMGT3',no:'27',constructor:'astonmartin',model:'Aston Martin Vantage AMR LMGT3',team:'Heart of Racing Team',laps:139,time:'6:01:47.582',gap:'+2.148',int:'+2.148',drivers:[['Ian James','United States'],['Zacharie Robichon','Canada'],['Mattia Drudi','Italy']]},
{pos:16,class:'LMGT3',no:'92',constructor:'porsche',model:'Porsche 911 GT3 R LMGT3',team:'The Bend Manthey',laps:139,time:'6:01:48.856',gap:'+3.422',int:'+1.274',drivers:[['Yasser Shahin','Australia'],['Riccardo Pera','Italy'],['Richard Lietz','Austria']]},
{pos:17,class:'LMGT3',no:'21',constructor:'ferrari',model:'Ferrari 296 LMGT3 Evo',team:'Vista AF Corse',laps:139,time:'6:01:49.497',gap:'+4.063',int:'+0.641',drivers:[['François Hériau','France'],['Simon Mann','United States'],['Alessio Rovera','Italy']]},
{pos:18,class:'LMGT3',no:'58',constructor:'mclaren',model:'McLaren 720S LMGT3 Evo',team:'Garage 59',laps:139,time:'6:01:55.835',gap:'+10.401',int:'+6.338',drivers:[['Alexander West','Sweden'],['Florian Gehrsitz','Germany'],['Benjamin Goethe','Germany']]},
{pos:19,class:'LMGT3',no:'87',constructor:'lexus',model:'Lexus RC F LMGT3',team:'Akkodis ASP Team',laps:139,time:'6:01:57.693',gap:'+12.259',int:'+1.858',drivers:[['Petru Umbrarescu','Romania'],['Clemens Schmid','Austria'],['José María López','Argentina']]},
{pos:20,class:'LMGT3',no:'91',constructor:'porsche',model:'Porsche 911 GT3 R LMGT3',team:'Manthey DK Engineering',laps:139,time:'6:01:59.402',gap:'+13.968',int:'+1.709',drivers:[['Joel Cottingham','United Kingdom'],['Timur Boguslavskiy','Russia'],['Ayhancan Güven','Turkey']]},
{pos:21,class:'LMGT3',no:'33',constructor:'corvette',model:'Corvette Z06 LMGT3.R',team:'TF Sport',laps:139,time:'6:02:00.436',gap:'+15.002',int:'+1.034',drivers:[['Ben McDonald','United States'],['Jonny Edgar','United Kingdom'],['Nicky Catsburg','Netherlands']]},
{pos:22,class:'LMGT3',no:'34',constructor:'corvette',model:'Corvette Z06 LMGT3.R',team:'Racing Team Turkey by TF',laps:139,time:'6:02:01.574',gap:'+16.140',int:'+1.138',drivers:[['Patrick Dempsey','United States'],['Salih Yoluç','Turkey'],['Charlie Eastwood','Ireland']]},
{pos:23,class:'LMGT3',no:'61',constructor:'mercedes',model:'Mercedes-AMG LMGT3',team:'Iron Lynx',laps:139,time:'6:02:01.769',gap:'+16.335',int:'+0.195',drivers:[['Mackenzie Berry','United States'],['Rui Andrade','Angola'],['Maxime Martin','Belgium']]},
{pos:24,class:'LMGT3',no:'69',constructor:'bmw',model:'BMW M4 LMGT3 Evo',team:'Team WRT',laps:139,time:'6:02:12.602',gap:'+27.168',int:'+10.833',drivers:[['Alasdair McIntosh','Canada'],['Paul Thompson','Canada'],['Dan Harper','United Kingdom']]},
{pos:25,class:'LMGT3',no:'88',constructor:'ford',model:'Ford Mustang LMGT3',team:'Proton Competition',laps:139,time:'6:02:12.778',gap:'+27.344',int:'+0.176',drivers:[['Stefano Gattuso','United States'],['Giacomo Levorato','Italy'],['Logan Sargeant','United States']]},
{pos:26,class:'LMGT3',no:'23',constructor:'astonmartin',model:'Aston Martin Vantage AMR LMGT3',team:'Heart of Racing Team',laps:139,time:'6:02:13.942',gap:'+28.508',int:'+1.164',drivers:[['Gray Newell','United States'],['Eduardo Barrichello','Brazil'],['Jonny Adam','United Kingdom']]},
{pos:27,class:'LMGT3',no:'32',constructor:'bmw',model:'BMW M4 LMGT3 Evo',team:'Team WRT',laps:139,time:'6:02:51.380',gap:'+1:05.946',int:'+37.438',drivers:[['Darren Leung','Hong Kong'],['Sean Gelael','Indonesia'],['Augusto Farfus','Brazil']]},
{pos:28,class:'LMGT3',no:'54',constructor:'ferrari',model:'Ferrari 296 LMGT3 Evo',team:'Vista AF Corse',laps:138,time:'6:02:01.065',gap:'+1 lap',int:'+1 lap',drivers:[['Thomas Flohr','Switzerland'],['Francesco Castellacci','Italy'],['Davide Rigon','Italy']]},
{pos:29,class:'LMGT3',no:'77',constructor:'ford',model:'Ford Mustang LMGT3',team:'Proton Competition',laps:127,time:'6:03:17.553',gap:'+12 laps',int:'+11 laps',drivers:[['Esmee Powell','United Kingdom'],['Ben Tuck','United Kingdom'],['Sebastian Priaulx','United Kingdom']]},
{pos:30,class:'HYP',no:'009',constructor:'astonmartin',model:'Aston Martin Valkyrie',team:'Aston Martin Thor Team',laps:136,time:'5:25:30.293',gap:'NC',int:'',status:'NC',drivers:[['Alex Riberas','Spain'],['Marco Sørensen','Denmark']]},
{pos:31,class:'HYP',no:'51',constructor:'ferrari',model:'Ferrari 499P',team:'Ferrari AF Corse',laps:129,time:'4:57:41.017',gap:'NC',int:'',status:'NC',drivers:[['Alessandro Pier Guidi','Italy'],['James Calado','United Kingdom'],['Antonio Giovinazzi','Italy']]},
{pos:32,class:'LMGT3',no:'79',constructor:'mercedes',model:'Mercedes-AMG LMGT3',team:'Iron Lynx',laps:95,time:'5:58:28.622',gap:'NC',int:'',status:'NC',drivers:[['Jonathan Zelger','Liechtenstein'],['Matteo Cressoni','Italy'],['Lin Hodenius','United States']]},
{pos:33,class:'LMGT3',no:'78',constructor:'lexus',model:'Lexus RC F LMGT3',team:'Akkodis ASP Team',laps:118,time:'4:57:31.016',gap:'RET',int:'',status:'RET',drivers:[['Tom Van Rompuy','Belgium'],['Hadrien David','France'],['Esteban Masson','France']]},
{pos:34,class:'HYP',no:'94',constructor:'peugeot',model:'Peugeot 9X8',team:'Peugeot Totalenergies',laps:103,time:'3:51:31.520',gap:'RET',int:'',status:'RET',drivers:[['Loïc Duval','France'],['Malthe Jakobsen','Denmark'],['Théo Pourchaire','France']]},
{pos:35,class:'HYP',no:'38',constructor:'cadillac',model:'Cadillac V-Series.R',team:'Cadillac Hertz Team Jota',laps:85,time:'3:40:57.271',gap:'RET',int:'',status:'RET',drivers:[['Earl Bamber','New Zealand'],['Sébastien Bourdais','France'],['Jack Aitken','United Kingdom']]}
];
replaceRace({id:'wec-spa-2026',season:2026,round:3,series:'wec',event:'6 Hours of Spa-Francorchamps',circuit:'Spa-Francorchamps',country:'Belgium',date:'2026-05-09',scheduledDuration:'06:00:00',officialDuration:'06:01:17.036',scheduledLaps:151,officialLaps:151,segments:[{id:'g0',phase:'GREEN',start:0,end:21677,startLap:0,endLap:151,reason:'Race',notes:'Race Control timeline pending import.'}],entries:WEC_SPA_2026_ENTRIES,performance:makePerf([{type:'FL',class:'Overall',no:'93',driver:'Paul Di Resta',lap:142,time:'2:04.177'},{type:'FL',class:'HYP',no:'93',driver:'Paul Di Resta',lap:142,time:'2:04.177'},{type:'FL',class:'LMGT3',no:'21',driver:'Alessio Rovera',lap:102,time:'2:18.281'}],[{type:'PP',class:'Overall',no:'—',driver:'Upload Hyperpole / Qualifying classification PDF',time:'—'},{type:'PP',class:'HYP',no:'—',driver:'Upload Hyperpole / Qualifying classification PDF',time:'—'},{type:'PP',class:'LMGT3',no:'—',driver:'Upload Qualifying classification PDF',time:'—'}]),completeness:{metadata:true,entryList:true,results:true,fastestLaps:true,poles:false,raceControl:false},sources:['Uploaded Al Kamel / FIA WEC Final Classification PDF: 03_Classification_Race_Hour 6.PDF']});


/* --- SCC v0.8.6.20.1 final clean override after all legacy data code --- */

(function(){
  const D=(n,c)=>[n,c||''];
  function entry(pos, cls, no, cons, model, team, gap, laps, drivers, status='FIN'){
    return {pos,class:cls,no:String(no),constructor:cons,model,team,gap,time:gap,laps,drivers:drivers.map(x=>D(x[0],x[1])),status};
  }
  function imolaEntries(){
    return [
      entry(1,'HYP','8','toyota','Toyota GR010 Hybrid','Toyota Racing','6:00:34.717',213,[['Sébastien Buemi','Switzerland'],['Brendon Hartley','New Zealand'],['Ryo Hirakawa','Japan']]),
      entry(2,'HYP','51','ferrari','Ferrari 499P','Ferrari AF Corse','+13.352',213,[['James Calado','United Kingdom'],['Antonio Giovinazzi','Italy'],['Alessandro Pier Guidi','Italy']]),
      entry(3,'HYP','7','toyota','Toyota GR010 Hybrid','Toyota Racing','+41.187',213,[['Mike Conway','United Kingdom'],['Kamui Kobayashi','Japan'],['Nyck de Vries','Netherlands']]),
      entry(4,'HYP','35','alpine','Alpine A424','Alpine Endurance Team','+59.385',213,[['António Félix da Costa','Portugal'],['Ferdinand Habsburg','Austria'],['Charles Milesi','France']]),
      entry(5,'HYP','20','bmw','BMW M Hybrid V8','BMW M Team WRT','+1:00.543',213,[['Robin Frijns','Netherlands'],['René Rast','Germany']]),
      entry(6,'HYP','50','ferrari','Ferrari 499P','Ferrari AF Corse','+1:00.901',213,[['Antonio Fuoco','Italy'],['Miguel Molina','Spain'],['Nicklas Nielsen','Denmark']]),
      entry(7,'HYP','15','bmw','BMW M Hybrid V8','BMW M Team WRT','+1:01.506',213,[['Kevin Magnussen','Denmark'],['Raffaele Marciello','Switzerland']]),
      entry(8,'HYP','38','cadillac','Cadillac V-Series.R','Cadillac Hertz Team JOTA','+1:01.995',213,[['Earl Bamber','New Zealand'],['Sébastien Bourdais','France']]),
      entry(9,'HYP','007','astonmartin','Aston Martin Valkyrie','Aston Martin THOR Team','+1 lap',212,[['Tom Gamble','United Kingdom'],['Harry Tincknell','United Kingdom']]),
      entry(10,'HYP','83','ferrari','Ferrari 499P','AF Corse','+1 lap',212,[['Phil Hanson','United Kingdom'],['Robert Kubica','Poland'],['Yifei Ye','China']]),
      entry(11,'HYP','36','alpine','Alpine A424','Alpine Endurance Team','+1 lap',212,[['Jules Gounon','France'],['Frédéric Makowiecki','France'],['Victor Martins','France']]),
      entry(12,'HYP','94','peugeot','Peugeot 9X8','Peugeot TotalEnergies','+1 lap',212,[['Loïc Duval','France'],['Malthe Jakobsen','Denmark'],['Théo Pourchaire','France']]),
      entry(13,'HYP','12','cadillac','Cadillac V-Series.R','Cadillac Hertz Team JOTA','+1 lap',212,[['Norman Nato','France'],['Will Stevens','United Kingdom']]),
      entry(14,'HYP','009','astonmartin','Aston Martin Valkyrie','Aston Martin THOR Team','+1 lap',212,[['Alex Riberas','Spain'],['Marco Sørensen','Denmark']]),
      entry(15,'HYP','17','genesis','Genesis GMR-001','Genesis Magma Racing','+2 laps',211,[['Pipo Derani','Brazil'],['Mathys Jaubert','France'],['André Lotterer','Germany']]),
      entry(16,'HYP','93','peugeot','Peugeot 9X8','Peugeot TotalEnergies','+3 laps',210,[['Nick Cassidy','New Zealand'],['Paul di Resta','United Kingdom'],['Stoffel Vandoorne','Belgium']]),
      entry(17,'LMGT3','69','bmw','BMW M4 GT3 Evo','Team WRT','+19 laps',194,[['Dan Harper','United Kingdom'],['Anthony McIntosh','United States'],['Parker Thompson','Canada']]),
      entry(18,'LMGT3','33','corvette','Chevrolet Corvette Z06 GT3.R','TF Sport','+19 laps',194,[['Nicky Catsburg','Netherlands'],['Jonny Edgar','United Kingdom'],['Blake McDonald','United States']]),
      entry(19,'LMGT3','92','porsche','Porsche 911 GT3 R','The Bend Manthey','+20 laps',193,[['Richard Lietz','Austria'],['Riccardo Pera','Italy'],['Yasser Shahin','Australia']]),
      entry(20,'LMGT3','91','porsche','Porsche 911 GT3 R','Manthey DK Engineering','+20 laps',193,[['Timur Boguslavskiy','Kyrgyzstan'],['James Cottingham','United Kingdom'],['Ayhancan Güven','Turkey']]),
      entry(21,'LMGT3','32','bmw','BMW M4 GT3 Evo','Team WRT','+20 laps',193,[['Augusto Farfus','Brazil'],['Sean Gelael','Indonesia'],['Darren Leung','United Kingdom']]),
      entry(22,'LMGT3','21','ferrari','Ferrari 296 GT3 Evo','Vista AF Corse','+20 laps',193,[['François Hériau','France'],['Simon Mann','United States'],['Alessio Rovera','Italy']]),
      entry(23,'LMGT3','58','mclaren','McLaren 720S GT3 Evo','Garage 59','+20 laps',193,[['Finn Gehrsitz','Germany'],['Benjamin Goethe','Germany'],['Alexander West','Sweden']]),
      entry(24,'LMGT3','88','ford','Ford Mustang GT3 Evo','Proton Competition','+20 laps',193,[['Stefano Gattuso','Italy'],['Giammarco Levorato','Italy'],['Logan Sargeant','United States']]),
      entry(25,'LMGT3','23','astonmartin','Aston Martin Vantage AMR GT3 Evo','Heart of Racing Team','+20 laps',193,[['Jonny Adam','United Kingdom'],['Gray Newell','United States'],['Kobe Pauwels','Belgium']]),
      entry(26,'LMGT3','77','ford','Ford Mustang GT3 Evo','Proton Competition','+20 laps',193,[['Eric Powell','United States'],['Sebastian Priaulx','United Kingdom'],['Ben Tuck','United Kingdom']]),
      entry(27,'LMGT3','54','ferrari','Ferrari 296 GT3 Evo','Vista AF Corse','+21 laps',192,[['Francesco Castellacci','Italy'],['Thomas Flohr','Switzerland'],['Davide Rigon','Italy']]),
      entry(28,'LMGT3','79','mercedes','Mercedes-AMG GT3 Evo','Iron Lynx','+21 laps',192,[['Matteo Cressoni','Italy'],['Lin Hodenius','Netherlands'],['Johannes Zelger','Italy']]),
      entry(29,'HYP','19','genesis','Genesis GMR-001','Genesis Magma Racing','+24 laps',189,[['Paul-Loup Chatin','France'],['Mathieu Jaminet','France'],['Daniel Juncadella','Spain']]),
      entry(30,'LMGT3','10','mclaren','McLaren 720S GT3 Evo','Garage 59','+34 laps',179,[['Antares Au','Hong Kong'],['Tom Fleming','United Kingdom'],['Marvin Kirchhöfer','Germany']]),
      entry(31,'LMGT3','78','lexus','Lexus RC F GT3','Akkodis ASP Team','+42 laps',171,[['Hadrien David','France'],['Esteban Masson','France'],['Tom Van Rompuy','Belgium']]),
      entry(32,'LMGT3','61','mercedes','Mercedes-AMG GT3 Evo','Iron Lynx','Power loss',166,[['Rui Andrade','Angola'],['Martin Berry','Australia'],['Maxime Martin','Belgium']],'RET'),
      entry(33,'LMGT3','34','corvette','Chevrolet Corvette Z06 GT3.R','Racing Team Turkey by TF','Electrical',162,[['Peter Dempsey','Ireland'],['Charlie Eastwood','Ireland'],['Salih Yoluç','Turkey']],'RET'),
      entry(34,'LMGT3','27','astonmartin','Aston Martin Vantage AMR GT3 Evo','Heart of Racing Team','Suspension',146,[['Mattia Drudi','Italy'],['Ian James','United Kingdom'],['Zacharie Robichon','Canada']],'RET'),
      entry(35,'LMGT3','87','lexus','Lexus RC F GT3','Akkodis ASP Team','Transmission',32,[['José María López','Argentina'],['Clemens Schmid','Austria'],['Răzvan Umbrărescu','Romania']],'RET')
    ];
  }
  
  function setCleanCalendar(){
    const updates={
      'wec-imola-2026':{round:1,date:'2026-04-19'},
      'wec-spa-2026':{round:2,date:'2026-05-09'},
      'wec-lemans-2026':{round:3,date:'2026-06-14'},
      'wec-saopaulo-2026':{round:4,date:'2026-07-12'},
      'wec-cota-2026':{round:5,date:'2026-09-06'},
      'wec-fuji-2026':{round:6,date:'2026-09-27'},
      'wec-qatar-2026':{round:7,date:'2026-10-24'},
      'wec-bahrain-2026':{round:8,date:'2026-11-07'}
    };
    (RACES||[]).forEach(r=>{ if(updates[r.id]) Object.assign(r,updates[r.id]); });
  }
  function setCleanImola(){
    const old=(RACES||[]).find(r=>r.id==='wec-imola-2026')||{};
    const entries=imolaEntries();
    const e33=entries.find(e=>String(e.no)==='33'&&e.class==='LMGT3');
    if(e33){ e33.int='+0.265'; e33.interval='+0.265'; }
    const race={
      id:'wec-imola-2026',season:2026,round:1,series:'wec',event:'6 Hours of Imola',circuit:'Imola',country:'Italy',date:'2026-04-19',
      scheduledDuration:'06:00:00',officialDuration:'06:00:34.717',scheduledLaps:212,officialLaps:213,
      segments:old.segments||[{id:'g0',phase:'GREEN',start:0,end:21635,startLap:0,endLap:213,reason:'Race',notes:'Race Control timeline pending import.'}],
      entries,
      performance:{
        fastestLaps:[
          {type:'FL',class:'Overall',no:'50',team:'Ferrari AF Corse',driver:'Antonio Fuoco',lap:89,time:'1:32.066'},
          {type:'FL',class:'HYP',no:'50',team:'Ferrari AF Corse',driver:'Antonio Fuoco',lap:89,time:'1:32.066'},
          {type:'FL',class:'LMGT3',no:'33',team:'TF Sport',driver:'Jonny Edgar',lap:79,time:'1:42.305'}
        ],
        poles:[
          {type:'PP',class:'Overall',no:'51',team:'Ferrari AF Corse',driver:'Antonio Giovinazzi',time:'1:30.127'},
          {type:'PP',class:'HYP',no:'51',team:'Ferrari AF Corse',driver:'Antonio Giovinazzi',time:'1:30.127'},
          {type:'PP',class:'LMGT3',no:'10',team:'Garage 59',driver:'Marvin Kirchhöfer',time:'1:41.181'}
        ]
      },
      completeness:{metadata:true,results:true,fastestLaps:true,poles:true,raceControl:false},
      sources:['Clean in-data Imola 2026 reference baseline']
    };
    const idx=RACES.findIndex(r=>r.id==='wec-imola-2026');
    if(idx>=0) RACES[idx]=race; else RACES.push(race);
  }
  setCleanCalendar();
  setCleanImola();
  if(typeof window!=='undefined') window.RACES=RACES;
})();


/* --- SCC v0.8.6.20.2 Spa 2026 clean reference data --- */
(function(){
  const D=(n,c)=>[n,c||''];
  const E=(pos, cls, no, cons, model, team, gap, laps, time, drivers, status='FIN')=>({pos,class:cls,no:String(no),constructor:cons,model,team,gap,time,laps,drivers:drivers.map(x=>D(x[0],x[1])),status});
  function replaceRace(r){
    const idx=RACES.findIndex(x=>x.id===r.id);
    if(idx>=0) RACES[idx]=r; else RACES.push(r);
  }
  function setCalendar(){
    const updates={
      'wec-imola-2026':{round:1,date:'2026-04-19'},
      'wec-spa-2026':{round:2,date:'2026-05-09'},
      'wec-lemans-2026':{round:3,date:'2026-06-14'},
      'wec-saopaulo-2026':{round:4,date:'2026-07-12'},
      'wec-cota-2026':{round:5,date:'2026-09-06'},
      'wec-fuji-2026':{round:6,date:'2026-09-27'},
      'wec-qatar-2026':{round:7,date:'2026-10-24'},
      'wec-bahrain-2026':{round:8,date:'2026-11-07'}
    };
    (RACES||[]).forEach(r=>{ if(updates[r.id]) Object.assign(r,updates[r.id]); });
  }
  const spaEntries=[
    E(1,'HYP','20','bmw','BMW M Hybrid V8','BMW M Team WRT','—',151,'6:01:17.036',[['Robin Frijns','Netherlands'],['René Rast','Germany'],['Sheldon van der Linde','South Africa']]),
    E(2,'HYP','15','bmw','BMW M Hybrid V8','BMW M Team WRT','+1.969',151,'6:01:19.005',[['Kevin Magnussen','Denmark'],['Raffaele Marciello','Switzerland'],['Dries Vanthoor','Belgium']]),
    E(3,'HYP','50','ferrari','Ferrari 499P','Ferrari AF Corse','+2.622',151,'6:01:19.658',[['Antonio Fuoco','Italy'],['Miguel Molina','Spain'],['Nicklas Nielsen','Denmark']]),
    E(4,'HYP','007','astonmartin','Aston Martin Valkyrie','Aston Martin THOR Team','+5.004',151,'6:01:22.040',[['Harry Tincknell','United Kingdom'],['Tom Gamble','United Kingdom']]),
    E(5,'HYP','7','toyota','Toyota GR010 Hybrid','Toyota Racing','+6.015',151,'6:01:23.051',[['Mike Conway','United Kingdom'],['Kamui Kobayashi','Japan'],['Nyck de Vries','Netherlands']]),
    E(6,'HYP','83','ferrari','Ferrari 499P','AF Corse','+11.552',151,'6:01:28.588',[['Yifei Ye','China'],['Robert Kubica','Poland'],['Phil Hanson','United Kingdom']]),
    E(7,'HYP','93','peugeot','Peugeot 9X8','Peugeot TotalEnergies','+12.861',151,'6:01:29.897',[['Paul di Resta','United Kingdom'],['Stoffel Vandoorne','Belgium'],['Nick Cassidy','New Zealand']]),
    E(8,'HYP','17','genesis','Genesis GMR-001-Hypercar','Genesis Magma Racing','+29.882',151,'6:01:46.918',[['André Lotterer','Germany'],['Pipo Derani','Brazil'],['Mathys Jaubert','France']]),
    E(9,'HYP','12','cadillac','Cadillac V-Series.R','Cadillac Hertz Team JOTA','+31.837',151,'6:01:48.873',[['Will Stevens','United Kingdom'],['Norman Nato','France'],['Louis Delétraz','Switzerland']]),
    E(10,'HYP','8','toyota','Toyota GR010 Hybrid','Toyota Racing','+32.165',151,'6:01:49.201',[['Sébastien Buemi','Switzerland'],['Brendon Hartley','New Zealand'],['Ryo Hirakawa','Japan']]),
    E(11,'HYP','36','alpine','Alpine A424','Alpine Endurance Team','+32.376',151,'6:01:49.412',[['Frédéric Makowiecki','France'],['Jules Gounon','France'],['Victor Martins','France']]),
    E(12,'HYP','35','alpine','Alpine A424','Alpine Endurance Team','+2 laps',149,'6:02:46.639',[['António Félix da Costa','Portugal'],['Charles Milesi','France'],['Ferdinand Habsburg','Austria']]),
    E(13,'HYP','19','genesis','Genesis GMR-001-Hypercar','Genesis Magma Racing','+8 laps',143,'6:01:51.636',[['Mathieu Jaminet','France'],['Paul-Loup Chatin','France'],['Daniel Juncadella','Spain']]),
    E(14,'LMGT3','10','mclaren','McLaren 720S LMGT3 Evo','Garage 59','—',139,'6:01:45.434',[['Antares Au','Hong Kong'],['Tom Fleming','United Kingdom'],['Marvin Kirchhöfer','Germany']]),
    E(15,'LMGT3','27','astonmartin','Aston Martin Vantage AMR LMGT3','Heart of Racing Team','+2.148',139,'6:01:47.582',[['Ian James','United Kingdom'],['Zacharie Robichon','Canada'],['Mattia Drudi','Italy']]),
    E(16,'LMGT3','92','porsche','Porsche 911 GT3 R LMGT3','The Bend Manthey','+3.422',139,'6:01:48.856',[['Yasser Shahin','Australia'],['Riccardo Pera','Italy'],['Richard Lietz','Austria']]),
    E(17,'LMGT3','21','ferrari','Ferrari 296 LMGT3 Evo','Vista AF Corse','+4.063',139,'6:01:49.497',[['François Hériau','France'],['Simon Mann','United States'],['Alessio Rovera','Italy']]),
    E(18,'LMGT3','58','mclaren','McLaren 720S LMGT3 Evo','Garage 59','+10.401',139,'6:01:55.835',[['Alexander West','Sweden'],['Finn Gehrsitz','Germany'],['Benjamin Goethe','Germany']]),
    E(19,'LMGT3','87','lexus','Lexus RC F LMGT3','Akkodis ASP Team','+12.259',139,'6:01:57.693',[['Răzvan Umbrărescu','Romania'],['Clemens Schmid','Austria'],['José María López','Argentina']]),
    E(20,'LMGT3','91','porsche','Porsche 911 GT3 R LMGT3','Manthey DK Engineering','+13.968',139,'6:01:59.402',[['James Cottingham','United Kingdom'],['Timur Boguslavskiy','Kyrgyzstan'],['Ayhancan Güven','Turkey']]),
    E(21,'LMGT3','33','corvette','Chevrolet Corvette Z06 LMGT3.R','TF Sport','+15.002',139,'6:02:00.436',[['Blake McDonald','United States'],['Jonny Edgar','United Kingdom'],['Nicky Catsburg','Netherlands']]),
    E(22,'LMGT3','34','corvette','Chevrolet Corvette Z06 LMGT3.R','Racing Team Turkey by TF','+16.140',139,'6:02:01.574',[['Peter Dempsey','Ireland'],['Salih Yoluç','Turkey'],['Charlie Eastwood','Ireland']]),
    E(23,'LMGT3','61','mercedes','Mercedes-AMG LMGT3','Iron Lynx','+16.335',139,'6:02:01.769',[['Martin Berry','Australia'],['Rui Andrade','Angola'],['Maxime Martin','Belgium']]),
    E(24,'LMGT3','69','bmw','BMW M4 LMGT3 Evo','Team WRT','+27.168',139,'6:02:12.602',[['Anthony McIntosh','United States'],['Parker Thompson','Canada'],['Dan Harper','United Kingdom']]),
    E(25,'LMGT3','88','ford','Ford Mustang LMGT3','Proton Competition','+27.344',139,'6:02:12.778',[['Stefano Gattuso','Italy'],['Giammarco Levorato','Italy'],['Logan Sargeant','United States']]),
    E(26,'LMGT3','23','astonmartin','Aston Martin Vantage AMR LMGT3','Heart of Racing Team','+28.508',139,'6:02:13.942',[['Gray Newell','United States'],['Eduardo Barrichello','Brazil'],['Jonny Adam','United Kingdom']]),
    E(27,'LMGT3','32','bmw','BMW M4 LMGT3 Evo','Team WRT','+1:05.946',139,'6:02:51.380',[['Darren Leung','United Kingdom'],['Sean Gelael','Indonesia'],['Augusto Farfus','Brazil']]),
    E(28,'LMGT3','54','ferrari','Ferrari 296 LMGT3 Evo','Vista AF Corse','+1 lap',138,'6:02:01.065',[['Thomas Flohr','Switzerland'],['Francesco Castellacci','Italy'],['Davide Rigon','Italy']]),
    E(29,'LMGT3','77','ford','Ford Mustang LMGT3','Proton Competition','+12 laps',127,'6:03:17.553',[['Eric Powell','United States'],['Ben Tuck','United Kingdom'],['Sebastian Priaulx','United Kingdom']]),
    E(30,'HYP','009','astonmartin','Aston Martin Valkyrie','Aston Martin THOR Team','NC',136,'5:25:30.293',[['Alex Riberas','Spain'],['Marco Sørensen','Denmark']],'NC'),
    E(31,'HYP','51','ferrari','Ferrari 499P','Ferrari AF Corse','NC',129,'4:57:41.017',[['Alessandro Pier Guidi','Italy'],['James Calado','United Kingdom'],['Antonio Giovinazzi','Italy']],'NC'),
    E(32,'LMGT3','79','mercedes','Mercedes-AMG LMGT3','Iron Lynx','NC',95,'5:58:28.622',[['Johannes Zelger','Italy'],['Matteo Cressoni','Italy'],['Lin Hodenius','Netherlands']],'NC'),
    E(33,'LMGT3','78','lexus','Lexus RC F LMGT3','Akkodis ASP Team','RET',118,'4:57:31.016',[['Tom Van Rompuy','Belgium'],['Hadrien David','France'],['Esteban Masson','France']],'RET'),
    E(34,'HYP','94','peugeot','Peugeot 9X8','Peugeot TotalEnergies','RET',103,'3:51:31.520',[['Loïc Duval','France'],['Malthe Jakobsen','Denmark'],['Théo Pourchaire','France']],'RET'),
    E(35,'HYP','38','cadillac','Cadillac V-Series.R','Cadillac Hertz Team JOTA','RET',85,'3:40:57.271',[['Earl Bamber','New Zealand'],['Sébastien Bourdais','France'],['Jack Aitken','United Kingdom']],'RET')
  ];
  setCalendar();
  replaceRace({
    id:'wec-spa-2026',season:2026,round:2,series:'wec',event:'6 Hours of Spa-Francorchamps',circuit:'Spa-Francorchamps',country:'Belgium',date:'2026-05-09',scheduledDuration:'06:00:00',officialDuration:'06:01:17.036',scheduledLaps:151,officialLaps:151,
    segments:[{id:'g0',phase:'GREEN',start:0,end:21677,startLap:0,endLap:151,reason:'Race',notes:'Race Control timeline pending import.'}],
    entries:spaEntries,
    performance:{
      fastestLaps:[
        {type:'FL',class:'Overall',no:'93',team:'Peugeot TotalEnergies',driver:'Stoffel Vandoorne',lap:48,time:'2:04.177'},
        {type:'FL',class:'HYP',no:'93',team:'Peugeot TotalEnergies',driver:'Stoffel Vandoorne',lap:48,time:'2:04.177'},
        {type:'FL',class:'LMGT3',no:'21',team:'Vista AF Corse',driver:'Alessio Rovera',lap:7,time:'2:18.281'}
      ],
      poles:[
        {type:'PP',class:'Overall',no:'94',team:'Peugeot TotalEnergies',driver:'Loïc Duval',time:'2:00.653'},
        {type:'PP',class:'HYP',no:'94',team:'Peugeot TotalEnergies',driver:'Loïc Duval',time:'2:00.653'},
        {type:'PP',class:'LMGT3',no:'78',team:'Akkodis ASP Team',driver:'Hadrien David',time:'2:16.612'}
      ]
    },
    completeness:{metadata:true,results:true,fastestLaps:true,poles:true,raceControl:false},
    sources:['Al Kamel FIA WEC Spa 2026 final classification, fastest laps and hyperpole classification']
  });
  if(typeof window!=='undefined') window.RACES=RACES;
})();


/* --- SCC v0.8.6.20.3 clean Le Mans 2026 reference --- */
(function(){
  const D=(n,c)=>[n,c||''];
  function entry(pos, cls, no, cons, model, team, laps, time, gap, drivers, status='FIN'){
    return {pos,class:cls,no:String(no),constructor:cons,model,team,laps,time,gap,drivers:drivers.map(x=>D(x[0],x[1])),status};
  }
  function setLeMansCalendar(){
    const updates={
      'wec-imola-2026':{round:1,date:'2026-04-19'},
      'wec-spa-2026':{round:2,date:'2026-05-09'},
      'wec-lemans-2026':{round:3,date:'2026-06-14'},
      'wec-saopaulo-2026':{round:4,date:'2026-07-12'},
      'wec-cota-2026':{round:5,date:'2026-09-06'},
      'wec-fuji-2026':{round:6,date:'2026-09-27'},
      'wec-qatar-2026':{round:7,date:'2026-10-24'},
      'wec-bahrain-2026':{round:8,date:'2026-11-07'}
    };
    (RACES||[]).forEach(r=>{ if(updates[r.id]) Object.assign(r,updates[r.id]); });
  }
  const LE_MANS_2026_ENTRIES=[
    entry(1,'HYP','7','toyota','Toyota GR010 Hybrid','Toyota Racing',381,'24:03:01.030','—',[['Mike Conway','United Kingdom'],['Kamui Kobayashi','Japan'],['Nyck de Vries','Netherlands']]),
    entry(2,'HYP','20','bmw','BMW M Hybrid V8','BMW M Team WRT',381,'24:03:11.943','+10.913',[['Robin Frijns','Netherlands'],['René Rast','Germany'],['Sheldon van der Linde','South Africa']]),
    entry(3,'HYP','8','toyota','Toyota GR010 Hybrid','Toyota Racing',381,'24:03:21.447','+20.417',[['Sébastien Buemi','Switzerland'],['Brendon Hartley','New Zealand'],['Ryo Hirakawa','Japan']]),
    entry(4,'HYP','12','cadillac','Cadillac V-Series.R','Cadillac Hertz Team JOTA',381,'24:03:33.411','+32.381',[['Louis Delétraz','Switzerland'],['Will Stevens','United Kingdom'],['Norman Nato','France']]),
    entry(5,'HYP','51','ferrari','Ferrari 499P','Ferrari AF Corse',381,'24:05:23.453','+2:22.423',[['Alessandro Pier Guidi','Italy'],['James Calado','United Kingdom'],['Antonio Giovinazzi','Italy']]),
    entry(6,'HYP','35','alpine','Alpine A424','Alpine Endurance Team',381,'24:05:31.235','+2:30.205',[['António Félix da Costa','Portugal'],['Charles Milesi','France'],['Ferdinand Habsburg','Austria']]),
    entry(7,'HYP','83','ferrari','Ferrari 499P','AF Corse',381,'24:05:36.603','+2:35.573',[['Yifei Ye','China'],['Robert Kubica','Poland'],['Phil Hanson','United Kingdom']]),
    entry(8,'HYP','007','astonmartin','Aston Martin Valkyrie','Aston Martin THOR Team',379,'24:03:30.890','+2 laps',[['Harry Tincknell','United Kingdom'],['Tom Gamble','United Kingdom'],['Ross Gunn','United Kingdom']]),
    entry(9,'HYP','101','cadillac','Cadillac V-Series.R','Cadillac WTR',379,'24:03:59.236','+2 laps +28.346',[['Ricky Taylor','United States'],['Jordan Taylor','United States'],['Filipe Albuquerque','Portugal']]),
    entry(10,'HYP','36','alpine','Alpine A424','Alpine Endurance Team',379,'24:05:06.622','+2 laps +1:35.732',[['Frédéric Makowiecki','France'],['Jules Gounon','France'],['Victor Martins','France']]),
    entry(11,'HYP','94','peugeot','Peugeot 9X8','Peugeot TotalEnergies',377,'24:04:18.448','+4 laps',[['Loïc Duval','France'],['Malthe Jakobsen','Denmark'],['Théo Pourchaire','France']]),
    entry(12,'HYP','93','peugeot','Peugeot 9X8','Peugeot TotalEnergies',376,'24:05:21.204','+5 laps',[['Paul di Resta','United Kingdom'],['Stoffel Vandoorne','Belgium'],['Nick Cassidy','New Zealand']]),
    entry(13,'HYP','19','genesis','Genesis GMR-001','Genesis Magma Racing',372,'24:04:04.363','+9 laps',[['Mathieu Jaminet','France'],['Paul-Loup Chatin','France'],['Daniel Juncadella','Spain']]),
    entry(14,'HYP','009','astonmartin','Aston Martin Valkyrie','Aston Martin THOR Team',372,'24:04:28.357','+9 laps +23.994',[['Alex Riberas','Spain'],['Marco Sørensen','Denmark'],['Roman De Angelis','Canada']]),
    entry(15,'LMP2','43','oreca','Oreca 07 - Gibson','Inter Europol Competition',361,'24:06:33.808','+20 laps',[['Jakub Śmiechowski','Poland'],['Tom Dillmann','France'],['Nick Yelloly','United Kingdom']]),
    entry(16,'LMP2','343','oreca','Oreca 07 - Gibson','Inter Europol Competition',360,'24:03:07.994','+21 laps',[['Bijoy Garg','United States'],['Reshad de Gerus','France'],['Nico Müller','Switzerland']]),
    entry(17,'LMP2','29','oreca','Oreca 07 - Gibson','Forestier Racing by Panis',360,'24:03:20.959','+21 laps +12.965',[['Louis Rousset','France'],['Esteban Masson','France'],['Olli Gray','United Kingdom']]),
    entry(18,'LMP2','26','oreca','Oreca 07 - Gibson','Vector Sport',360,'24:03:34.356','+21 laps +26.362',[['Ryan Cullen','Ireland'],['Vladislav Lomko','Russia'],['Pietro Fittipaldi','Brazil']]),
    entry(19,'LMP2','37','oreca','Oreca 07 - Gibson','CLX Motorsport',360,'24:04:52.522','+21 laps +1:44.528',[['Antonin Closmenil','France'],['Ian Aguilera','Mexico'],['Theodor Jensen','Denmark']]),
    entry(20,'LMP2','28','oreca','Oreca 07 - Gibson','IDEC SPORT',359,'24:05:11.370','+22 laps',[['Paul Lafargue','France'],['Valerio Rinicella','Italy'],['Job van Uitert','Netherlands']]),
    entry(21,'LMP2PA','4','oreca','Oreca 07 - Gibson','CrowdStrike Racing by APR',358,'24:03:26.294','+23 laps',[['George Kurtz','United States'],['Alex Quinn','United Kingdom'],['Laurin Heinrich','Germany']]),
    entry(22,'LMP2','22','oreca','Oreca 07 - Gibson','United Autosports',358,'24:03:37.658','+23 laps +11.364',[['Rasmus Lindh','Sweden'],['Grégoire Saucy','Switzerland'],['Mikkel Jensen','Denmark']]),
    entry(23,'LMP2PA','183','oreca','Oreca 07 - Gibson','AF Corse',357,'24:04:34.947','+24 laps',[['François Perrodo','France'],['Matthieu Vaxivière','France'],['Ben Barnicoat','United Kingdom']]),
    entry(24,'LMP2PA','99','oreca','Oreca 07 - Gibson','AO by TF',356,'24:05:02.178','+25 laps',[['PJ Hyett','United States'],['James Allen','Australia'],['Dane Cameron','United States']]),
    entry(25,'LMP2','9','oreca','Oreca 07 - Gibson','Proton Competition',356,'24:05:32.283','+25 laps +30.105',[['Jonas Ried','Germany'],['Kenta Ohta','Japan'],['Harry King','United Kingdom']]),
    entry(26,'LMP2PA','25','oreca','Oreca 07 - Gibson','Algarve Pro Racing',356,'24:05:50.357','+25 laps +48.179',[['Michael Jensen','Denmark'],['Enzo Trulli','Italy'],['Josh Hughes','United Kingdom']]),
    entry(27,'LMP2PA','14','oreca','Oreca 07 - Gibson','TDS Racing',355,'24:06:08.936','+26 laps',[['Tobi Lütke','Canada'],['Mathias Beche','Switzerland'],['Kévin Estre','France']]),
    entry(28,'LMP2PA','44','oreca','Oreca 07 - Gibson','Proton Competition',354,'24:04:54.501','+27 laps',[['Horst Felbermayr','Austria'],['Horst Felbermayr Jr.','Austria'],['Lorenzo Fluxá','Spain']]),
    entry(29,'LMP2PA','222','oreca','Oreca 07 - Gibson','United Autosports',354,'24:05:24.274','+27 laps +29.773',[['Daniel Schneider','Switzerland'],['Ben Hanley','United Kingdom'],['Oliver Jarvis','United Kingdom']]),
    entry(30,'LMP2PA','48','oreca','Oreca 07 - Gibson','RD Limited',353,'24:05:07.555','+28 laps',[['Fred Poordad','United States'],['Tristan Vautier','France'],['Romain Dumas','France']]),
    entry(31,'LMP2PA','3','oreca','Oreca 07 - Gibson','DKR Engineering',344,'24:06:21.773','+37 laps',[['John Farano','Canada'],['Sebastian Alvarez','Mexico'],['Renger van der Zande','Netherlands']]),
    entry(32,'LMP2','24','oreca','Oreca 07 - Gibson','Nielsen Racing',341,'24:03:49.886','+40 laps',[['David Heinemeier Hansson','Denmark'],['Elliott Pearson','United Kingdom'],['Jack Doohan','Australia']]),
    entry(33,'LMGT3','33','corvette','Corvette Z06 LMGT3.R','TF Sport',336,'24:06:52.461','+45 laps',[['Ben Keating','United States'],['Jonny Edgar','United Kingdom'],['Nicky Catsburg','Netherlands']]),
    entry(34,'LMGT3','78','lexus','Lexus RC F LMGT3','Akkodis ASP Team',335,'24:03:08.533','+46 laps',[['Tom Van Rompuy','Belgium'],['Hadrien David','France'],['Jack Hawksworth','United Kingdom']]),
    entry(35,'LMGT3','23','astonmartin','Aston Martin Vantage AMR LMGT3','Heart of Racing Team',335,'24:04:13.931','+46 laps +1:05.398',[['Gray Newell','United States'],['Eduardo Barrichello','Brazil'],['Jonny Adam','United Kingdom']]),
    entry(36,'LMGT3','87','lexus','Lexus RC F LMGT3','Akkodis ASP Team',335,'24:04:15.666','+46 laps +1:07.133',[['Petru Umbrarescu','Romania'],['Clemens Schmid','Austria'],['José María López','Argentina']]),
    entry(37,'LMGT3','21','ferrari','Ferrari 296 LMGT3 Evo','Vista AF Corse',335,'24:04:34.041','+46 laps +1:25.508',[['François Hériau','France'],['Simon Mann','United States'],['Alessio Rovera','Italy']]),
    entry(38,'LMGT3','34','corvette','Corvette Z06 LMGT3.R','Racing Team Turkey by TF',335,'24:05:08.218','+46 laps +1:59.685',[['Peter Dempsey','Ireland'],['Salih Yoluç','Turkey'],['Charlie Eastwood','Ireland']]),
    entry(39,'LMGT3','32','bmw','BMW M4 LMGT3 Evo','Team WRT',334,'24:03:32.171','+47 laps',[['Darren Leung','Hong Kong'],['Sean Gelael','Indonesia'],['Augusto Farfus','Brazil']]),
    entry(40,'LMGT3','150','ferrari','Ferrari 296 LMGT3 Evo','Richard Mille AF Corse',334,'24:04:30.987','+47 laps +58.816',[['Célia Toledo','France'],['Lilou Wadoux','France'],['Riccardo Agostini','Italy']]),
    entry(41,'LMGT3','74','ferrari','Ferrari 296 LMGT3 Evo','Kessel Racing',334,'24:04:44.899','+47 laps +1:12.728',[['Dustin Blattner','United States'],['Lorenzo Patrese','Italy'],['Dennis Marschall','Germany']]),
    entry(42,'LMGT3','57','ferrari','Ferrari 296 LMGT3 Evo','Kessel Racing',334,'24:05:15.370','+47 laps +1:43.199',[['Takeshi Kimura','Japan'],['Conrad Laursen','Denmark'],['Daniel Serra','Brazil']]),
    entry(43,'LMGT3','59','astonmartin','Aston Martin Vantage AMR LMGT3','Racing Spirit of Léman',332,'24:03:47.474','+49 laps',[['Clément Mateu','France'],['Matteo Fossard','France'],['Valentin Hasse-Clot','France']]),
    entry(44,'LMGT3','10','mclaren','McLaren 720S LMGT3 Evo','Garage 59',332,'24:06:28.306','+49 laps +2:40.832',[['Antares Au','Hong Kong'],['Tom Fleming','United Kingdom'],['Marvin Kirchhöfer','Germany']]),
    entry(45,'LMGT3','92','porsche','Porsche 911 GT3 R LMGT3','The Bend Manthey',330,'24:05:31.149','+51 laps',[['Yasser Shahin','Australia'],['Riccardo Pera','Italy'],['Richard Lietz','Austria']]),
    entry(46,'LMGT3','2','corvette','Corvette Z06 LMGT3.R','TF Sport',330,'24:06:15.609','+51 laps +44.460',[['Petru Ibrahim','United States'],['Lorcan Hanafin','United Kingdom'],['Ben Green','United Kingdom']]),
    entry(47,'LMGT3','58','mclaren','McLaren 720S LMGT3 Evo','Garage 59',329,'24:03:07.290','+52 laps',[['Alexander West','Sweden'],['Finn Gehrsitz','Germany'],['Benjamin Goethe','Germany']]),
    entry(48,'LMGT3','62','mercedes','Mercedes-AMG LMGT3','Team Qatar by Iron Lynx',324,'24:03:54.380','+57 laps',[['Abdulaziz Al-Khelaifi','Qatar'],['Julian Hanses','Germany'],['Giuliano Alesi','France']]),
    entry(49,'LMGT3','88','ford','Ford Mustang LMGT3','Proton Competition',323,'24:06:25.942','+58 laps',[['Stefano Gattuso','Italy'],['Giammarco Levorato','Italy'],['Logan Sargeant','United States']]),
    entry(50,'LMP2','30','oreca','Oreca 07 - Gibson','Duqueine Team',307,'20:36:43.524','RET',[['Doriane Pin','France'],['Julien Andlauer','France'],['Richard Verschoor','Netherlands']],'RET'),
    entry(51,'LMGT3','27','astonmartin','Aston Martin Vantage AMR LMGT3','Heart of Racing Team',291,'21:03:27.097','RET',[['Ian James','United Kingdom'],['Zacharie Robichon','Canada'],['Mattia Drudi','Italy']],'RET'),
    entry(52,'LMGT3','69','bmw','BMW M4 LMGT3 Evo','Team WRT',291,'21:08:08.763','RET',[['Anthony McIntosh','United States'],['Parker Thompson','Canada'],['Dan Harper','United Kingdom']],'RET'),
    entry(53,'HYP','50','ferrari','Ferrari 499P','Ferrari AF Corse',284,'18:19:55.370','RET',[['Antonio Fuoco','Italy'],['Nicklas Nielsen','Denmark'],['Miguel Molina','Spain']],'RET'),
    entry(54,'HYP','15','bmw','BMW M Hybrid V8','BMW M Team WRT',272,'17:20:34.543','RET',[['Kevin Magnussen','Denmark'],['Raffaele Marciello','Switzerland'],['Dries Vanthoor','Belgium']],'RET'),
    entry(55,'HYP','17','genesis','Genesis GMR-001','Genesis Magma Racing',263,'16:26:58.396','RET',[['André Lotterer','Germany'],['Pipo Derani','Brazil'],['Mathys Jaubert','France']],'RET'),
    entry(56,'LMGT3','91','porsche','Porsche 911 GT3 R LMGT3','Manthey DK Engineering',254,'18:02:21.172','RET',[['James Cottingham','United Kingdom'],['Timur Boguslavskiy','Kyrgyzstan'],['Ayhancan Güven','Turkey']],'RET'),
    entry(57,'LMGT3','77','ford','Ford Mustang LMGT3','Proton Competition',244,'17:33:09.298','RET',[['Eric Powell','United States'],['Ben Tuck','United Kingdom'],['Sebastian Priaulx','United Kingdom']],'RET'),
    entry(58,'HYP','38','cadillac','Cadillac V-Series.R','Cadillac Hertz Team JOTA',218,'15:57:19.921','RET',[['Sébastien Bourdais','France'],['Earl Bamber','New Zealand'],['Jack Aitken','United Kingdom']],'RET'),
    entry(59,'LMGT3','79','mercedes','Mercedes-AMG LMGT3','Iron Lynx',153,'11:03:22.599','RET',[['Johannes Zelger','Italy'],['Matteo Cressoni','Italy'],['Lin Hodenius','Netherlands']],'RET'),
    entry(60,'LMGT3','54','ferrari','Ferrari 296 LMGT3 Evo','Vista AF Corse',110,'7:36:48.500','RET',[['Thomas Flohr','Switzerland'],['Francesco Castellacci','Italy'],['Davide Rigon','Italy']],'RET'),
    entry(61,'LMGT3','61','mercedes','Mercedes-AMG LMGT3','Iron Lynx',65,'5:03:16.609','RET',[['Martin Berry','Australia'],['Rui Andrade','Angola'],['Maxime Martin','Belgium']],'RET'),
    entry(62,'LMGT3','13','corvette','Corvette Z06 LMGT3.R','13 Autosport',61,'4:55:34.441','RET',[['Orey Fidani','Canada'],['Lars Kern','Germany'],['Matthew Bell','United Kingdom']],'RET')
  ];
  function makePerf(fl,pp){return {fastestLaps:fl,poles:pp};}
  setLeMansCalendar();
  replaceRace({
    id:'wec-lemans-2026',season:2026,round:3,series:'wec',event:'24 Hours of Le Mans',circuit:'Circuit de la Sarthe',country:'France',date:'2026-06-14',
    scheduledDuration:'24:00:00',officialDuration:'24:03:01.030',scheduledLaps:381,officialLaps:381,
    segments:[{id:'g0',phase:'GREEN',start:0,end:86581,startLap:0,endLap:381,reason:'Race',notes:'Race Control timeline pending import.'}],
    entries:LE_MANS_2026_ENTRIES,
    performance:makePerf([
      {type:'FL',class:'Overall',no:'8',team:'Toyota Racing',driver:'Ryo Hirakawa',lap:306,time:'3:25.041'},
      {type:'FL',class:'HYP',no:'8',team:'Toyota Racing',driver:'Ryo Hirakawa',lap:306,time:'3:25.041'},
      {type:'FL',class:'LMP2',no:'14',team:'TDS Racing',driver:'Kévin Estre',lap:284,time:'3:36.090'},
      {type:'FL',class:'LMP2PA',no:'14',team:'TDS Racing',driver:'Kévin Estre',lap:284,time:'3:36.090'},
      {type:'FL',class:'LMGT3',no:'78',team:'Akkodis ASP Team',driver:'Hadrien David',lap:305,time:'3:53.802'}
    ],[
      {type:'PP',class:'Overall',no:'15',team:'BMW M Team WRT',driver:'Dries Vanthoor',time:'3:22.564'},
      {type:'PP',class:'HYP',no:'15',team:'BMW M Team WRT',driver:'Dries Vanthoor',time:'3:22.564'},
      {type:'PP',class:'LMP2',no:'29',team:'Forestier Racing by Panis',driver:'Oliver Gray',time:'3:32.855'},
      {type:'PP',class:'LMP2PA',no:'4',team:'CrowdStrike Racing by APR',driver:'Laurin Heinrich',time:'3:33.628'},
      {type:'PP',class:'LMGT3',no:'27',team:'Heart of Racing Team',driver:'Mattia Drudi',time:'3:52.433'}
    ]),
    completeness:{metadata:true,entryList:false,results:true,fastestLaps:true,poles:true,raceControl:false},
    sources:['Al Kamel FIA WEC 2026 Le Mans final classification and qualifying after Hyperpole PDFs']
  });
  if(typeof window!=='undefined') window.RACES=RACES;
})();


/* --- SCC Qatar 1812 km 2025 clean reference data ONLY --- */
(function(){
  const D=(n,c)=>[n,c||''];
  const E=(pos, cls, no, cons, model, team, laps, time, gap, drivers, status='FIN')=>({
    pos,class:cls,no:String(no),constructor:cons,model,team,laps,time,gap,drivers:drivers.map(x=>D(x[0],x[1])),status
  });
  function replaceRace(r){
    const idx=RACES.findIndex(x=>x.id===r.id);
    if(idx>=0) RACES[idx]=r; else RACES.push(r);
  }
  const entries=[
    E(1,'HYP','50','ferrari','Ferrari 499P','Ferrari AF Corse',318,'10:01:39.098','—', [['Antonio Fuoco','Italy'],['Miguel Molina','Spain'],['Nicklas Nielsen','Denmark']]),
    E(2,'HYP','83','ferrari','Ferrari 499P','AF Corse',318,'10:01:41.446','+2.348', [['Robert Kubica','Poland'],['Yifei Ye','China'],['Phil Hanson','United Kingdom']]),
    E(3,'HYP','51','ferrari','Ferrari 499P','Ferrari AF Corse',318,'10:01:41.775','+2.677', [['Alessandro Pier Guidi','Italy'],['James Calado','United Kingdom'],['Antonio Giovinazzi','Italy']]),
    E(4,'HYP','15','bmw','BMW M Hybrid V8','BMW M Team WRT',318,'10:01:49.005','+9.907', [['Dries Vanthoor','Belgium'],['Raffaele Marciello','Switzerland'],['Kevin Magnussen','Denmark']]),
    E(5,'HYP','8','toyota','Toyota GR010 Hybrid','Toyota Racing',318,'10:01:58.726','+19.628', [['Sébastien Buemi','Switzerland'],['Brendon Hartley','New Zealand'],['Ryo Hirakawa','Japan']]),
    E(6,'HYP','7','toyota','Toyota GR010 Hybrid','Toyota Racing',318,'10:02:02.364','+23.266', [['Mike Conway','United Kingdom'],['Kamui Kobayashi','Japan'],['Nyck de Vries','Netherlands']]),
    E(7,'HYP','20','bmw','BMW M Hybrid V8','BMW M Team WRT',318,'10:02:15.486','+36.388', [['René Rast','Germany'],['Robin Frijns','Netherlands'],['Sheldon van der Linde','South Africa']]),
    E(8,'HYP','12','cadillac','Cadillac V-Series.R','Cadillac Hertz Team JOTA',318,'10:02:16.854','+37.756', [['Alex Lynn','United Kingdom'],['Norman Nato','France'],['Will Stevens','United Kingdom']]),
    E(9,'HYP','93','peugeot','Peugeot 9X8','Peugeot TotalEnergies',318,'10:03:08.781','+1:29.683', [['Paul di Resta','United Kingdom'],['Mikkel Jensen','Denmark'],['Jean-Éric Vergne','France']]),
    E(10,'HYP','5','porsche','Porsche 963','Porsche Penske Motorsport',317,'10:02:00.237','+1 lap', [['Julien Andlauer','France'],['Michael Christensen','Denmark'],['Mathieu Jaminet','France']]),
    E(11,'HYP','6','porsche','Porsche 963','Porsche Penske Motorsport',317,'10:02:21.563','+1 lap +21.326', [['Kévin Estre','France'],['Laurens Vanthoor','Belgium'],['Matt Campbell','Australia']]),
    E(12,'HYP','94','peugeot','Peugeot 9X8','Peugeot TotalEnergies',317,'10:02:25.767','+1 lap +25.530', [['Loïc Duval','France'],['Malthe Jakobsen','Denmark'],['Stoffel Vandoorne','Belgium']]),
    E(13,'HYP','36','alpine','Alpine A424','Alpine Endurance Team',317,'10:02:36.976','+1 lap +36.739', [['Jules Gounon','France'],['Frédéric Makowiecki','France'],['Mick Schumacher','Germany']]),
    E(14,'HYP','35','alpine','Alpine A424','Alpine Endurance Team',317,'10:02:41.990','+1 lap +41.753', [['Paul-Loup Chatin','France'],['Ferdinand Habsburg','Austria'],['Charles Milesi','France']]),
    E(15,'HYP','99','porsche','Porsche 963','Proton Competition',314,'10:02:49.329','+4 laps', [['Neel Jani','Switzerland'],['Nico Pino','Chile'],['Nicolás Varrone','Argentina']]),
    E(16,'HYP','38','cadillac','Cadillac V-Series.R','Cadillac Hertz Team JOTA',307,'10:02:15.706','+11 laps', [['Earl Bamber','New Zealand'],['Sébastien Bourdais','France'],['Jenson Button','United Kingdom']]),
    E(17,'HYP','009','astonmartin','Aston Martin Valkyrie','Aston Martin THOR Team',295,'10:02:00.765','+23 laps', [['Alex Riberas','Spain'],['Marco Sørensen','Denmark'],['Roman De Angelis','Canada']]),
    E(18,'LMGT3','33','corvette','Chevrolet Corvette Z06 GT3.R','TF Sport',287,'10:03:04.050','+31 laps', [['Ben Keating','United States'],['Jonny Edgar','United Kingdom'],['Daniel Juncadella','Spain']]),
    E(19,'LMGT3','59','mclaren','McLaren 720S LMGT3 Evo','United Autosports',287,'10:03:04.543','+31 laps +0.493', [['James Cottingham','United Kingdom'],['Sébastien Baud','France'],['Grégoire Saucy','Switzerland']]),
    E(20,'LMGT3','31','bmw','BMW M4 LMGT3','The Bend Team WRT',286,'10:01:41.584','+32 laps', [['Yasser Shahin','Australia'],['Timur Boguslavskiy','Kyrgyzstan'],['Augusto Farfus','Brazil']]),
    E(21,'LMGT3','78','lexus','Lexus RC F LMGT3','Akkodis ASP Team',286,'10:01:41.795','+32 laps +0.211', [['Arnold Robin','France'],['Finn Gehrsitz','Germany'],['Ben Barnicoat','United Kingdom']]),
    E(22,'LMGT3','21','ferrari','Ferrari 296 LMGT3','Vista AF Corse',286,'10:01:41.927','+32 laps +0.343', [['François Hériau','France'],['Simon Mann','United States'],['Alessio Rovera','Italy']]),
    E(23,'LMGT3','27','astonmartin','Aston Martin Vantage AMR LMGT3','Heart of Racing Team',286,'10:02:09.237','+32 laps +27.653', [['Ian James','United Kingdom'],['Zacharie Robichon','Canada'],['Mattia Drudi','Italy']]),
    E(24,'LMGT3','95','mclaren','McLaren 720S LMGT3 Evo','United Autosports',286,'10:02:17.109','+32 laps +35.525', [['Darren Leung','United Kingdom'],['Sean Gelael','Indonesia'],['Marino Sato','Japan']]),
    E(25,'LMGT3','54','ferrari','Ferrari 296 LMGT3','Vista AF Corse',285,'10:02:07.725','+33 laps', [['Thomas Flohr','Switzerland'],['Francesco Castellacci','Italy'],['Davide Rigon','Italy']]),
    E(26,'LMGT3','10','astonmartin','Aston Martin Vantage AMR LMGT3','Racing Spirit of Léman',285,'10:02:53.686','+33 laps +45.961', [['Derek DeBoer','United States'],['Eduardo Barrichello','Brazil'],['Valentin Hasse-Clot','France']]),
    E(27,'LMGT3','88','ford','Ford Mustang LMGT3','Proton Competition',285,'10:03:35.658','+33 laps +1:27.933', [['Stefano Gattuso','Italy'],['Giammarco Levorato','Italy'],['Dennis Olsen','Norway']]),
    E(28,'LMGT3','46','bmw','BMW M4 LMGT3','Team WRT',284,'10:02:16.019','+34 laps', [['Ahmad Al Harthy','Oman'],['Valentino Rossi','Italy'],['Kelvin van der Linde','South Africa']]),
    E(29,'LMGT3','92','porsche','Porsche 911 GT3 R LMGT3','Manthey 1ST Phorm',284,'10:02:47.345','+34 laps +31.326', [['Ryan Hardwick','United States'],['Riccardo Pera','Italy'],['Richard Lietz','Austria']]),
    E(30,'LMGT3','85','porsche','Porsche 911 GT3 R LMGT3','Iron Dames',282,'10:02:46.483','+36 laps', [['Célia Martin','France'],['Rahel Frey','Switzerland'],['Michelle Gatting','Denmark']]),
    E(31,'LMGT3','60','mercedes','Mercedes-AMG LMGT3','Iron Lynx',194,'10:01:50.175','NC', [['Claudio Schiavoni','Italy'],['Matteo Cressoni','Italy'],['Matteo Cairoli','Italy']],'NC'),
    E(32,'HYP','007','astonmartin','Aston Martin Valkyrie','Aston Martin THOR Team',181,'6:19:36.221','RET', [['Harry Tincknell','United Kingdom'],['Tom Gamble','United Kingdom'],['Ross Gunn','United Kingdom']],'RET'),
    E(33,'LMGT3','77','ford','Ford Mustang LMGT3','Proton Competition',148,'5:21:54.517','RET', [['Bernardo Sousa','Portugal'],['Ben Tuck','United Kingdom'],['Ben Barker','United Kingdom']],'RET'),
    E(34,'LMGT3','61','mercedes','Mercedes-AMG LMGT3','Iron Lynx',59,'2:08:30.745','RET', [['Christian Ried','Germany'],['Lin Hodenius','Netherlands'],['Maxime Martin','Belgium']],'RET'),
    E(35,'LMGT3','81','corvette','Chevrolet Corvette Z06 GT3.R','TF Sport',27,'56:34.097','RET', [['Tom Van Rompuy','Belgium'],['Rui Andrade','Angola'],['Charlie Eastwood','Ireland']],'RET'),
    E(36,'LMGT3','87','lexus','Lexus RC F LMGT3','Akkodis ASP Team',15,'2:41:48.566','RET', [['Petru Umbrarescu','Romania'],['Clemens Schmid','Austria'],['José María López','Argentina']],'RET')
  ];
  replaceRace({
    id:'wec-qatar-2025',season:2025,round:1,series:'wec',event:'Qatar 1812 km',circuit:'Lusail',country:'Qatar',date:'2025-02-28',
    scheduledDuration:'10:00:00',officialDuration:'10:01:39.098',scheduledLaps:335,officialLaps:318,
    segments:[{id:'g0',phase:'GREEN',start:0,end:36099,startLap:0,endLap:318,reason:'Race',notes:'Race Control timeline pending import.'}],
    entries,
    performance:{
      fastestLaps:[
        {type:'FL',class:'Overall',no:'51',team:'Ferrari AF Corse',driver:'Alessandro Pier Guidi',lap:141,time:'1:41.259'},
        {type:'FL',class:'HYP',no:'51',team:'Ferrari AF Corse',driver:'Alessandro Pier Guidi',lap:141,time:'1:41.259'},
        {type:'FL',class:'LMGT3',no:'59',team:'United Autosports',driver:'Grégoire Saucy',lap:267,time:'1:54.048'}
      ],
      poles:[
        {type:'PP',class:'Overall',no:'51',team:'Ferrari AF Corse',driver:'Antonio Giovinazzi',time:'1:38.359'},
        {type:'PP',class:'HYP',no:'51',team:'Ferrari AF Corse',driver:'Antonio Giovinazzi',time:'1:38.359'},
        {type:'PP',class:'LMGT3',no:'95',team:'United Autosports',driver:'Sean Gelael',time:'1:54.239'}
      ]
    },
    completeness:{metadata:true,entryList:false,results:true,fastestLaps:true,poles:true,raceControl:false},
    sources:['Al Kamel FIA WEC 2025 Qatar Final Classification','Al Kamel FIA WEC 2025 Qatar Qualifying Classification']
  });
  if(typeof window!=='undefined') window.RACES=RACES;
})();


/* --- SCC Imola 2025 clean reference data ONLY --- */
(function(){
  const D=(n,c)=>[n,c||''];
  const E=(pos, cls, no, cons, model, team, laps, time, gap, drivers, status='FIN')=>({
    pos,class:cls,no:String(no),constructor:cons,model,team,laps,time,gap,drivers:drivers.map(x=>D(x[0],x[1])),status
  });
  function replaceRace(r){const idx=RACES.findIndex(x=>x.id===r.id); if(idx>=0)RACES[idx]=r; else RACES.push(r);}
  const entries=[
    E(1,'HYP','51','ferrari','Ferrari 499P','Ferrari AF Corse',212,'6:00:28.365','—',[['Alessandro Pier Guidi','Italy'],['James Calado','United Kingdom'],['Antonio Giovinazzi','Italy']]),
    E(2,'HYP','20','bmw','BMW M Hybrid V8','BMW M Team WRT',212,'6:00:36.855','+8.490',[['René Rast','Germany'],['Robin Frijns','Netherlands'],['Sheldon van der Linde','South Africa']]),
    E(3,'HYP','36','alpine','Alpine A424','Alpine Endurance Team',212,'6:00:40.815','+12.450',[['Jules Gounon','France'],['Frédéric Makowiecki','France'],['Mick Schumacher','Germany']]),
    E(4,'HYP','83','ferrari','Ferrari 499P','AF Corse',212,'6:00:48.962','+20.597',[['Robert Kubica','Poland'],['Yifei Ye','China'],['Phil Hanson','United Kingdom']]),
    E(5,'HYP','8','toyota','Toyota GR010 Hybrid','Toyota Gazoo Racing',212,'6:00:51.575','+23.210',[['Sébastien Buemi','Switzerland'],['Brendon Hartley','New Zealand'],['Ryo Hirakawa','Japan']]),
    E(6,'HYP','15','bmw','BMW M Hybrid V8','BMW M Team WRT',212,'6:00:53.881','+25.516',[['Dries Vanthoor','Belgium'],['Raffaele Marciello','Switzerland'],['Kevin Magnussen','Denmark']]),
    E(7,'HYP','7','toyota','Toyota GR010 Hybrid','Toyota Gazoo Racing',212,'6:00:59.843','+31.478',[['Mike Conway','United Kingdom'],['Kamui Kobayashi','Japan'],['Nyck de Vries','Netherlands']]),
    E(8,'HYP','6','porsche','Porsche 963','Porsche Penske Motorsport',212,'6:01:09.645','+41.280',[['Kévin Estre','France'],['Laurens Vanthoor','Belgium'],['Matt Campbell','Australia']]),
    E(9,'HYP','93','peugeot','Peugeot 9X8','Peugeot TotalEnergies',212,'6:01:19.269','+50.904',[['Paul di Resta','United Kingdom'],['Mikkel Jensen','Denmark'],['Jean-Éric Vergne','France']]),
    E(10,'HYP','12','cadillac','Cadillac V-Series.R','Cadillac Hertz Team JOTA',212,'6:01:21.665','+53.300',[['Alex Lynn','United Kingdom'],['Norman Nato','France'],['Will Stevens','United Kingdom']]),
    E(11,'HYP','5','porsche','Porsche 963','Porsche Penske Motorsport',212,'6:01:42.585','+1:14.220',[['Julien Andlauer','France'],['Michael Christensen','Denmark'],['Mathieu Jaminet','France']]),
    E(12,'HYP','94','peugeot','Peugeot 9X8','Peugeot TotalEnergies',212,'6:01:43.650','+1:15.285',[['Loïc Duval','France'],['Malthe Jakobsen','Denmark'],['Stoffel Vandoorne','Belgium']]),
    E(13,'HYP','35','alpine','Alpine A424','Alpine Endurance Team',212,'6:01:44.500','+1:16.135',[['Paul-Loup Chatin','France'],['Ferdinand Habsburg','Austria'],['Charles Milesi','France']]),
    E(14,'HYP','99','porsche','Porsche 963','Proton Competition',212,'6:01:45.515','+1:17.150',[['Neel Jani','Switzerland'],['Nico Pino','Chile'],['Nicolás Varrone','Argentina']]),
    E(15,'HYP','50','ferrari','Ferrari 499P','Ferrari AF Corse',211,'6:01:22.578','+1 lap',[['Antonio Fuoco','Italy'],['Miguel Molina','Spain'],['Nicklas Nielsen','Denmark']]),
    E(16,'HYP','38','cadillac','Cadillac V-Series.R','Cadillac Hertz Team JOTA',210,'6:00:30.358','+2 laps',[['Earl Bamber','New Zealand'],['Sébastien Bourdais','France'],['Jenson Button','United Kingdom']]),
    E(17,'HYP','009','astonmartin','Aston Martin Valkyrie','Aston Martin THOR Team',208,'6:00:50.701','+4 laps',[['Alex Riberas','Spain'],['Marco Sørensen','Denmark']]),
    E(18,'HYP','007','astonmartin','Aston Martin Valkyrie','Aston Martin THOR Team',208,'6:00:57.943','+4 laps +7.242',[['Harry Tincknell','United Kingdom'],['Tom Gamble','United Kingdom']]),
    E(19,'LMGT3','92','porsche','Porsche 911 GT3 R LMGT3','Manthey 1ST Phorm',193,'6:01:32.423','+19 laps',[['Ryan Hardwick','United States'],['Riccardo Pera','Italy'],['Richard Lietz','Austria']]),
    E(20,'LMGT3','46','bmw','BMW M4 LMGT3','Team WRT',193,'6:01:32.739','+19 laps +0.316',[['Ahmad Al Harthy','Oman'],['Valentino Rossi','Italy'],['Kelvin van der Linde','South Africa']]),
    E(21,'LMGT3','78','lexus','Lexus RC F LMGT3','Akkodis ASP Team',193,'6:01:56.724','+19 laps +24.301',[['Arnold Robin','France'],['Finn Gehrsitz','Germany'],['Esteban Masson','France']]),
    E(22,'LMGT3','87','lexus','Lexus RC F LMGT3','Akkodis ASP Team',193,'6:02:01.521','+19 laps +29.098',[['Petru Umbrarescu','Romania'],['Clemens Schmid','Austria'],['José María López','Argentina']]),
    E(23,'LMGT3','54','ferrari','Ferrari 296 LMGT3','Vista AF Corse',192,'6:00:29.481','+20 laps',[['Thomas Flohr','Switzerland'],['Francesco Castellacci','Italy'],['Davide Rigon','Italy']]),
    E(24,'LMGT3','81','corvette','Chevrolet Corvette Z06 GT3.R','TF Sport',192,'6:00:37.440','+20 laps +7.959',[['Tom Van Rompuy','Belgium'],['Rui Andrade','Angola'],['Charlie Eastwood','Ireland']]),
    E(25,'LMGT3','33','corvette','Chevrolet Corvette Z06 GT3.R','TF Sport',192,'6:00:40.998','+20 laps +11.517',[['Ben Keating','United States'],['Jonny Edgar','United Kingdom'],['Daniel Juncadella','Spain']]),
    E(26,'LMGT3','85','porsche','Porsche 911 GT3 R LMGT3','Iron Dames',192,'6:00:54.793','+20 laps +25.312',[['Célia Martin','France'],['Rahel Frey','Switzerland'],['Michelle Gatting','Denmark']]),
    E(27,'LMGT3','95','mclaren','McLaren 720S LMGT3 Evo','United Autosports',192,'6:01:00.357','+20 laps +30.876',[['Darren Leung','United Kingdom'],['Sean Gelael','Indonesia'],['Marino Sato','Japan']]),
    E(28,'LMGT3','77','ford','Ford Mustang LMGT3','Proton Competition',192,'6:01:00.667','+20 laps +31.186',[['Bernardo Sousa','Portugal'],['Ben Tuck','United Kingdom'],['Ben Barker','United Kingdom']]),
    E(29,'LMGT3','10','astonmartin','Aston Martin Vantage AMR LMGT3','Racing Spirit of Léman',192,'6:01:28.046','+20 laps +58.565',[['Derek DeBoer','United States'],['Eduardo Barrichello','Brazil'],['Valentin Hasse-Clot','France']]),
    E(30,'LMGT3','31','bmw','BMW M4 LMGT3','The Bend Team WRT',191,'6:01:18.841','+21 laps',[['Yasser Shahin','Australia'],['Timur Boguslavskiy','Kyrgyzstan'],['Augusto Farfus','Brazil']]),
    E(31,'LMGT3','61','mercedes','Mercedes-AMG LMGT3','Iron Lynx',191,'6:01:29.469','+21 laps +10.628',[['Christian Ried','Germany'],['Lin Hodenius','Netherlands'],['Maxime Martin','Belgium']]),
    E(32,'LMGT3','59','mclaren','McLaren 720S LMGT3 Evo','United Autosports',191,'6:01:40.082','+21 laps +21.241',[['James Cottingham','United Kingdom'],['Sébastien Baud','France'],['Grégoire Saucy','Switzerland']]),
    E(33,'LMGT3','60','mercedes','Mercedes-AMG LMGT3','Iron Lynx',191,'6:01:54.901','+21 laps +36.060',[['Claudio Schiavoni','Italy'],['Matteo Cressoni','Italy'],['Matteo Cairoli','Italy']]),
    E(34,'LMGT3','88','ford','Ford Mustang LMGT3','Proton Competition',191,'6:01:59.172','+21 laps +40.331',[['Stefano Gattuso','Italy'],['Giammarco Levorato','Italy'],['Dennis Olsen','Norway']]),
    E(35,'LMGT3','21','ferrari','Ferrari 296 LMGT3','Vista AF Corse',119,'3:49:53.350','RET',[['François Hériau','France'],['Simon Mann','United States'],['Alessio Rovera','Italy']],'RET'),
    E(36,'LMGT3','27','astonmartin','Aston Martin Vantage AMR LMGT3','Heart of Racing Team',49,'1:30:39.916','RET',[['Ian James','United Kingdom'],['Zacharie Robichon','Canada'],['Mattia Drudi','Italy']],'RET')
  ];
  replaceRace({
    id:'wec-imola-2025',season:2025,round:2,series:'wec',event:'6 Hours of Imola',circuit:'Imola',country:'Italy',date:'2025-04-20',
    scheduledDuration:'06:00:00',officialDuration:'06:00:28.365',scheduledLaps:212,officialLaps:212,
    segments:[{id:'g0',phase:'GREEN',start:0,end:21628,startLap:0,endLap:212,reason:'Race',notes:'Race Control timeline pending import.'}],
    entries,
    performance:{
      fastestLaps:[
        {type:'FL',class:'Overall',no:'51',team:'Ferrari AF Corse',driver:'James Calado',lap:5,time:'1:32.625'},
        {type:'FL',class:'HYP',no:'51',team:'Ferrari AF Corse',driver:'James Calado',lap:5,time:'1:32.625'},
        {type:'FL',class:'LMGT3',no:'87',team:'Akkodis ASP Team',driver:'José María López',lap:115,time:'1:42.912'}
      ],
      poles:[
        {type:'PP',class:'Overall',no:'51',team:'Ferrari AF Corse',driver:'Antonio Giovinazzi',time:'1:28.920'},
        {type:'PP',class:'HYP',no:'51',team:'Ferrari AF Corse',driver:'Antonio Giovinazzi',time:'1:28.920'},
        {type:'PP',class:'LMGT3',no:'46',team:'Team WRT',driver:'Valentino Rossi',time:'1:42.355'}
      ]
    },
    completeness:{metadata:true,entryList:false,results:true,fastestLaps:true,poles:true,raceControl:false},
    sources:['Al Kamel FIA WEC 2025 Imola Final Classification','Al Kamel FIA WEC 2025 Imola Qualifying Classification']
  });
  if(typeof window!=='undefined') window.RACES=RACES;
})();

/* --- SCC Spa 2025 clean reference data ONLY --- */
(function(){
  const D=(n,c)=>[n,c||''];
  const E=(pos, cls, no, cons, model, team, laps, time, gap, drivers, status='FIN')=>({
    pos,class:cls,no:String(no),constructor:cons,model,team,laps,time,gap,drivers:drivers.map(x=>D(x[0],x[1])),status
  });
  function replaceRace(r){const idx=RACES.findIndex(x=>x.id===r.id); if(idx>=0)RACES[idx]=r; else RACES.push(r);}
  const entries=[
    E(1,'HYP','51','ferrari','Ferrari 499P','Ferrari AF Corse',150,'6:01:07.299','—',[[ 'Alessandro Pier Guidi','Italy'],['James Calado','United Kingdom'],['Antonio Giovinazzi','Italy']]),
    E(2,'HYP','50','ferrari','Ferrari 499P','Ferrari AF Corse',150,'6:01:11.528','+4.229',[[ 'Antonio Fuoco','Italy'],['Miguel Molina','Spain'],['Nicklas Nielsen','Denmark']]),
    E(3,'HYP','36','alpine','Alpine A424','Alpine Endurance Team',150,'6:01:12.447','+5.148',[[ 'Jules Gounon','France'],['Frédéric Makowiecki','France'],['Mick Schumacher','Germany']]),
    E(4,'HYP','8','toyota','Toyota GR010 Hybrid','Toyota Gazoo Racing',150,'6:01:40.059','+32.760',[[ 'Sébastien Buemi','Switzerland'],['Brendon Hartley','New Zealand'],['Ryo Hirakawa','Japan']]),
    E(5,'HYP','12','cadillac','Cadillac V-Series.R','Cadillac Hertz Team JOTA',150,'6:01:43.265','+35.966',[[ 'Alex Lynn','United Kingdom'],['Norman Nato','France'],['Will Stevens','United Kingdom']]),
    E(6,'HYP','38','cadillac','Cadillac V-Series.R','Cadillac Hertz Team JOTA',150,'6:01:52.656','+45.357',[[ 'Earl Bamber','New Zealand'],['Sébastien Bourdais','France'],['Jenson Button','United Kingdom']]),
    E(7,'HYP','7','toyota','Toyota GR010 Hybrid','Toyota Gazoo Racing',150,'6:01:53.321','+46.022',[[ 'Mike Conway','United Kingdom'],['Kamui Kobayashi','Japan'],['Nyck de Vries','Netherlands']]),
    E(8,'HYP','35','alpine','Alpine A424','Alpine Endurance Team',150,'6:01:59.310','+52.011',[[ 'Paul-Loup Chatin','France'],['Ferdinand Habsburg','Austria'],['Charles Milesi','France']]),
    E(9,'HYP','6','porsche','Porsche 963','Porsche Penske Motorsport',150,'6:02:09.170','+1:01.871',[[ 'Kévin Estre','France'],['Laurens Vanthoor','Belgium'],['Pascal Wehrlein','Germany']]),
    E(10,'HYP','15','bmw','BMW M Hybrid V8','BMW M Team WRT',150,'6:02:24.625','+1:17.326',[[ 'Kevin Magnussen','Denmark'],['Raffaele Marciello','Switzerland']]),
    E(11,'HYP','93','peugeot','Peugeot 9X8','Peugeot TotalEnergies',150,'6:02:25.275','+1:17.976',[[ 'Paul di Resta','United Kingdom'],['Mikkel Jensen','Denmark'],['Jean-Éric Vergne','France']]),
    E(12,'HYP','5','porsche','Porsche 963','Porsche Penske Motorsport',150,'6:02:34.853','+1:27.554',[[ 'Julien Andlauer','France'],['Michael Christensen','Denmark'],['Nico Müller','Switzerland']]),
    E(13,'HYP','007','astonmartin','Aston Martin Valkyrie','Aston Martin THOR Team',150,'6:02:55.738','+1:48.439',[[ 'Harry Tincknell','United Kingdom'],['Tom Gamble','United Kingdom']]),
    E(14,'HYP','009','astonmartin','Aston Martin Valkyrie','Aston Martin THOR Team',149,'6:01:33.466','+1 lap',[[ 'Alex Riberas','Spain'],['Marco Sørensen','Denmark']]),
    E(15,'LMGT3','21','ferrari','Ferrari 296 LMGT3','Vista AF Corse',137,'6:02:34.611','+13 laps',[[ 'François Hériau','France'],['Simon Mann','United States'],['Alessio Rovera','Italy']]),
    E(16,'LMGT3','88','ford','Ford Mustang LMGT3','Proton Competition',137,'6:03:14.841','+13 laps +40.230',[[ 'Stefano Gattuso','Italy'],['Giammarco Levorato','Italy'],['Dennis Olsen','Norway']]),
    E(17,'LMGT3','54','ferrari','Ferrari 296 LMGT3','Vista AF Corse',137,'6:03:16.715','+13 laps +42.104',[[ 'Thomas Flohr','Switzerland'],['Francesco Castellacci','Italy'],['Davide Rigon','Italy']]),
    E(18,'LMGT3','77','ford','Ford Mustang LMGT3','Proton Competition',137,'6:03:17.717','+13 laps +43.106',[[ 'Bernardo Sousa','Portugal'],['Ben Tuck','United Kingdom'],['Ben Barker','United Kingdom']]),
    E(19,'LMGT3','27','astonmartin','Aston Martin Vantage AMR LMGT3','Heart of Racing Team',136,'6:01:08.719','+14 laps',[[ 'Ian James','United Kingdom'],['Zacharie Robichon','Canada'],['Mattia Drudi','Italy']]),
    E(20,'LMGT3','10','astonmartin','Aston Martin Vantage AMR LMGT3','Racing Spirit of Léman',136,'6:01:13.832','+14 laps +5.113',[[ 'Derek DeBoer','United States'],['Eduardo Barrichello','Brazil'],['Valentin Hasse-Clot','France']]),
    E(21,'LMGT3','92','porsche','Porsche 911 GT3 R LMGT3','Manthey 1ST Phorm',136,'6:01:24.983','+14 laps +16.264',[[ 'Ryan Hardwick','United States'],['Riccardo Pera','Italy'],['Richard Lietz','Austria']]),
    E(22,'LMGT3','78','lexus','Lexus RC F LMGT3','Akkodis ASP Team',136,'6:01:27.016','+14 laps +18.297',[[ 'Arnold Robin','France'],['Finn Gehrsitz','Germany'],['Yuichi Nakayama','Japan']]),
    E(23,'LMGT3','46','bmw','BMW M4 LMGT3','Team WRT',136,'6:01:32.533','+14 laps +23.814',[[ 'Ahmad Al Harthy','Oman'],['Valentino Rossi','Italy'],['Kelvin van der Linde','South Africa']]),
    E(24,'LMGT3','85','porsche','Porsche 911 GT3 R LMGT3','Iron Dames',136,'6:01:35.142','+14 laps +26.423',[[ 'Célia Martin','France'],['Rahel Frey','Switzerland'],['Michelle Gatting','Denmark']]),
    E(25,'LMGT3','61','mercedes','Mercedes-AMG LMGT3','Iron Lynx',136,'6:01:39.752','+14 laps +31.033',[[ 'Martin Berry','Australia'],['Lin Hodenius','Netherlands'],['Maxime Martin','Belgium']]),
    E(26,'LMGT3','60','mercedes','Mercedes-AMG LMGT3','Iron Lynx',136,'6:01:42.315','+14 laps +33.596',[[ 'Stephen Grove','Australia'],['Brenton Grove','Australia'],['Matteo Cairoli','Italy']]),
    E(27,'LMGT3','33','corvette','Chevrolet Corvette Z06 GT3.R','TF Sport',136,'6:02:12.966','+14 laps +1:04.247',[[ 'Ben Keating','United States'],['Jonny Edgar','United Kingdom'],['Daniel Juncadella','Spain']]),
    E(28,'LMGT3','81','corvette','Chevrolet Corvette Z06 GT3.R','TF Sport',136,'6:02:18.672','+14 laps +1:09.953',[[ 'Tom Van Rompuy','Belgium'],['Rui Andrade','Angola'],['Charlie Eastwood','Ireland']]),
    E(29,'LMGT3','59','mclaren','McLaren 720S LMGT3 Evo','United Autosports',133,'6:02:20.573','+17 laps',[[ 'James Cottingham','United Kingdom'],['Sébastien Baud','France'],['Grégoire Saucy','Switzerland']]),
    E(30,'HYP','83','ferrari','Ferrari 499P','AF Corse',111,'6:02:52.832','+39 laps',[[ 'Robert Kubica','Poland'],['Yifei Ye','China'],['Phil Hanson','United Kingdom']]),
    E(31,'HYP','20','bmw','BMW M Hybrid V8','BMW M Team WRT',132,'5:23:30.758','RET',[[ 'René Rast','Germany'],['Robin Frijns','Netherlands']],'RET'),
    E(32,'HYP','94','peugeot','Peugeot 9X8','Peugeot TotalEnergies',99,'4:11:47.041','RET',[[ 'Loïc Duval','France'],['Malthe Jakobsen','Denmark'],['Stoffel Vandoorne','Belgium']],'RET'),
    E(33,'LMGT3','95','mclaren','McLaren 720S LMGT3 Evo','United Autosports',68,'2:58:21.321','RET',[[ 'Darren Leung','United Kingdom'],['Sean Gelael','Indonesia'],['Marino Sato','Japan']],'RET'),
    E(34,'LMGT3','87','lexus','Lexus RC F LMGT3','Akkodis ASP Team',29,'1:11:59.128','RET',[[ 'Petru Umbrarescu','Romania'],['Clemens Schmid','Austria'],['José María López','Argentina']],'RET'),
    E(35,'LMGT3','31','bmw','BMW M4 LMGT3','The Bend Team WRT',29,'1:12:23.173','RET',[[ 'Yasser Shahin','Australia'],['Timur Boguslavskiy','Kyrgyzstan'],['Augusto Farfus','Brazil']],'RET'),
    E(36,'HYP','99','porsche','Porsche 963','Proton Competition',22,'0:52:28.282','RET',[[ 'Neel Jani','Switzerland'],['Nico Pino','Chile'],['Nicolás Varrone','Argentina']],'RET')
  ];
  replaceRace({
    id:'wec-spa-2025',season:2025,round:3,series:'wec',event:'6 Hours of Spa-Francorchamps',circuit:'Spa-Francorchamps',country:'Belgium',date:'2025-05-10',
    scheduledDuration:'06:00:00',officialDuration:'06:01:07.299',scheduledLaps:150,officialLaps:150,
    segments:[{id:'g0',phase:'GREEN',start:0,end:21667,startLap:0,endLap:150,reason:'Race',notes:'Race Control timeline pending import.'}],
    entries,
    performance:{
      fastestLaps:[
        {type:'FL',class:'Overall',no:'51',team:'Ferrari AF Corse',driver:'Alessandro Pier Guidi',lap:134,time:'2:03.799'},
        {type:'FL',class:'HYP',no:'51',team:'Ferrari AF Corse',driver:'Alessandro Pier Guidi',lap:134,time:'2:03.799'},
        {type:'FL',class:'LMGT3',no:'21',team:'Vista AF Corse',driver:'Alessio Rovera',lap:122,time:'2:18.721'}
      ],
      poles:[
        {type:'PP',class:'Overall',no:'50',team:'Ferrari AF Corse',driver:'Antonio Fuoco',time:'1:59.617'},
        {type:'PP',class:'HYP',no:'50',team:'Ferrari AF Corse',driver:'Antonio Fuoco',time:'1:59.617'},
        {type:'PP',class:'LMGT3',no:'78',team:'Akkodis ASP Team',driver:'Finn Gehrsitz',time:'2:17.732'}
      ]
    },
    completeness:{metadata:true,entryList:false,results:true,fastestLaps:true,poles:true,raceControl:false},
    sources:['Al Kamel FIA WEC 2025 Spa Final Classification','Al Kamel FIA WEC 2025 Spa Qualifying Classification']
  });
  if(typeof window!=='undefined') window.RACES=RACES;
})();


/* --- SCC Le Mans 2025 clean reference data ONLY --- */
(function(){
  const D=(n,c)=>[n,c||''];
  const E=(pos, cls, no, cons, model, team, laps, time, gap, drivers, status='FIN')=>({
    pos,class:cls,no:String(no),constructor:cons,model,team,laps,time,gap,drivers:drivers.map(x=>D(x[0],x[1])),status
  });
  function replaceRace(r){const idx=RACES.findIndex(x=>x.id===r.id); if(idx>=0)RACES[idx]=r; else RACES.push(r);}
  const entries=[
    E(1,'HYP','83','ferrari','Ferrari 499P','AF Corse',387,'24:02:53.332','—',[[ 'Phil Hanson','United Kingdom'],['Robert Kubica','Poland'],['Yifei Ye','China']]),
    E(2,'HYP','6','porsche','Porsche 963','Porsche Penske Motorsport',387,'+14.084','+14.084',[[ 'Matt Campbell','Australia'],['Kévin Estre','France'],['Laurens Vanthoor','Belgium']]),
    E(3,'HYP','51','ferrari','Ferrari 499P','Ferrari AF Corse',387,'+28.487','+28.487',[[ 'James Calado','United Kingdom'],['Antonio Giovinazzi','Italy'],['Alessandro Pier Guidi','Italy']]),
    E(4,'HYP','12','cadillac','Cadillac V-Series.R','Cadillac Hertz Team JOTA',387,'+2:18.639','+2:18.639',[[ 'Alex Lynn','United Kingdom'],['Norman Nato','France'],['Will Stevens','United Kingdom']]),
    E(5,'HYP','7','toyota','Toyota GR010 Hybrid','Toyota Gazoo Racing',386,'+1 lap','+1 lap',[[ 'Mike Conway','United Kingdom'],['Kamui Kobayashi','Japan'],['Nyck de Vries','Netherlands']]),
    E(6,'HYP','5','porsche','Porsche 963','Porsche Penske Motorsport',386,'+1 lap','+1 lap',[[ 'Julien Andlauer','France'],['Michael Christensen','Denmark'],['Mathieu Jaminet','France']]),
    E(7,'HYP','38','cadillac','Cadillac V-Series.R','Cadillac Hertz Team JOTA',386,'+1 lap','+1 lap',[[ 'Earl Bamber','New Zealand'],['Sébastien Bourdais','France'],['Jenson Button','United Kingdom']]),
    E(8,'HYP','4','porsche','Porsche 963','Porsche Penske Motorsport',386,'+1 lap','+1 lap',[[ 'Felipe Nasr','Brazil'],['Nick Tandy','United Kingdom'],['Pascal Wehrlein','Germany']]),
    E(9,'HYP','35','alpine','Alpine A424','Alpine Endurance Team',385,'+2 laps','+2 laps',[[ 'Paul-Loup Chatin','France'],['Ferdinand Habsburg','Austria'],['Charles Milesi','France']]),
    E(10,'HYP','36','alpine','Alpine A424','Alpine Endurance Team',384,'+3 laps','+3 laps',[[ 'Jules Gounon','France'],['Frédéric Makowiecki','France'],['Mick Schumacher','Germany']]),
    E(11,'HYP','94','peugeot','Peugeot 9X8','Peugeot TotalEnergies',384,'+3 laps','+3 laps',[[ 'Loïc Duval','France'],['Malthe Jakobsen','Denmark'],['Stoffel Vandoorne','Belgium']]),
    E(12,'HYP','009','astonmartin','Aston Martin Valkyrie','Aston Martin THOR Team',383,'+4 laps','+4 laps',[[ 'Roman De Angelis','Canada'],['Alex Riberas','Spain'],['Marco Sørensen','Denmark']]),
    E(13,'HYP','99','porsche','Porsche 963','Proton Competition',383,'+4 laps','+4 laps',[[ 'Neel Jani','Switzerland'],['Nico Pino','Chile'],['Nicolás Varrone','Argentina']]),
    E(14,'HYP','007','astonmartin','Aston Martin Valkyrie','Aston Martin THOR Team',381,'+6 laps','+6 laps',[[ 'Tom Gamble','United Kingdom'],['Ross Gunn','United Kingdom'],['Harry Tincknell','United Kingdom']]),
    E(15,'HYP','8','toyota','Toyota GR010 Hybrid','Toyota Gazoo Racing',380,'+7 laps','+7 laps',[[ 'Sébastien Buemi','Switzerland'],['Brendon Hartley','New Zealand'],['Ryo Hirakawa','Japan']]),
    E(16,'HYP','93','peugeot','Peugeot 9X8','Peugeot TotalEnergies',379,'+8 laps','+8 laps',[[ 'Paul di Resta','United Kingdom'],['Mikkel Jensen','Denmark'],['Jean-Éric Vergne','France']]),
    E(17,'HYP','20','bmw','BMW M Hybrid V8','BMW M Team WRT',375,'+12 laps','+12 laps',[[ 'Robin Frijns','Netherlands'],['René Rast','Germany'],['Sheldon van der Linde','South Africa']]),
    E(18,'LMP2','43','oreca','Oreca 07 Gibson','Inter Europol Competition',367,'+20 laps','+20 laps',[[ 'Tom Dillmann','France'],['Jakub Śmiechowski','Poland'],['Nick Yelloly','United Kingdom']]),
    E(19,'LMP2','48','oreca','Oreca 07 Gibson','VDS Panis Racing',367,'+20 laps','+20 laps',[[ 'Oliver Gray','United Kingdom'],['Esteban Masson','France'],['Franck Perera','France']]),
    E(20,'LMP2PA','199','oreca','Oreca 07 Gibson','AO by TF',366,'+21 laps','+21 laps',[[ 'Dane Cameron','United States'],['Louis Delétraz','Switzerland'],['PJ Hyett','United States']]),
    E(21,'LMP2','9','oreca','Oreca 07 Gibson','Iron Lynx - Proton',365,'+22 laps','+22 laps',[[ 'Macéo Capietto','France'],['Reshad de Gerus','France'],['Jonas Ried','Germany']]),
    E(22,'LMP2PA','29','oreca','Oreca 07 Gibson','TDS Racing',365,'+22 laps','+22 laps',[[ 'Mathias Beche','Switzerland'],['Clément Novalak','France'],['Rodrigo Sales','United States']]),
    E(23,'LMP2PA','11','oreca','Oreca 07 Gibson','Proton Competition',365,'+22 laps','+22 laps',[[ 'René Binder','Austria'],['Giorgio Roda','Italy'],['Bent Viscaal','Netherlands']]),
    E(24,'LMP2','22','oreca','Oreca 07 Gibson','United Autosports',364,'+23 laps','+23 laps',[[ 'Pietro Fittipaldi','Brazil'],['David Heinemeier Hansson','Denmark'],['Renger van der Zande','Netherlands']]),
    E(25,'LMP2','25','oreca','Oreca 07 Gibson','Algarve Pro Racing',364,'+23 laps','+23 laps',[[ 'Lorenzo Fluxá','Spain'],['Matthias Kaiser','Liechtenstein'],['Théo Pourchaire','France']]),
    E(26,'LMP2PA','183','oreca','Oreca 07 Gibson','AF Corse',364,'+23 laps','+23 laps',[[ 'António Félix da Costa','Portugal'],['François Perrodo','France'],['Matthieu Vaxivière','France']]),
    E(27,'LMP2PA','34','oreca','Oreca 07 Gibson','Inter Europol Competition',363,'+24 laps','+24 laps',[[ 'Nick Boulle','United States'],['Luca Ghiotto','Italy'],['Jean-Baptiste Simmenauer','France']]),
    E(28,'LMP2PA','23','oreca','Oreca 07 Gibson','United Autosports',363,'+24 laps','+24 laps',[[ 'Ben Hanley','United Kingdom'],['Oliver Jarvis','United Kingdom'],['Daniel Schneider','Brazil']]),
    E(29,'LMP2PA','16','oreca','Oreca 07 Gibson','RLR MSport',362,'+25 laps','+25 laps',[[ 'Ryan Cullen','Ireland'],['Michael Jensen','Denmark'],['Patrick Pilet','France']]),
    E(30,'LMP2PA','45','oreca','Oreca 07 Gibson','Algarve Pro Racing',362,'+25 laps','+25 laps',[[ 'Nicky Catsburg','Netherlands'],['George Kurtz','United States'],['Alex Quinn','United Kingdom']]),
    E(31,'HYP','15','bmw','BMW M Hybrid V8','BMW M Team WRT',361,'+26 laps','+26 laps',[[ 'Kevin Magnussen','Denmark'],['Raffaele Marciello','Switzerland'],['Dries Vanthoor','Belgium']]),
    E(32,'LMP2','37','oreca','Oreca 07 Gibson','CLX - Pure Rxcing',358,'+29 laps','+29 laps',[[ 'Tom Blomqvist','United Kingdom'],['Alex Malykhin','Saint Kitts and Nevis'],['Tristan Vautier','France']]),
    E(33,'LMGT3','92','porsche','Porsche 911 GT3 R LMGT3','Manthey 1st Phorm',341,'+46 laps','+46 laps',[[ 'Ryan Hardwick','United States'],['Richard Lietz','Austria'],['Riccardo Pera','Italy']]),
    E(34,'LMGT3','21','ferrari','Ferrari 296 GT3','Vista AF Corse',341,'+46 laps','+46 laps',[[ 'François Hériau','France'],['Simon Mann','United States'],['Alessio Rovera','Italy']]),
    E(35,'LMGT3','81','corvette','Chevrolet Corvette Z06 GT3.R','TF Sport',341,'+46 laps','+46 laps',[[ 'Rui Andrade','Angola'],['Charlie Eastwood','Ireland'],['Tom Van Rompuy','Belgium']]),
    E(36,'LMGT3','27','astonmartin','Aston Martin Vantage AMR GT3 Evo','Heart of Racing Team',341,'+46 laps','+46 laps',[[ 'Mattia Drudi','Italy'],['Ian James','United Kingdom'],['Zacharie Robichon','Canada']]),
    E(37,'LMGT3','87','lexus','Lexus RC F GT3','Akkodis ASP Team',340,'+47 laps','+47 laps',[[ 'José María López','Argentina'],['Clemens Schmid','Austria'],['Răzvan Umbrărescu','Romania']]),
    E(38,'LMGT3','90','porsche','Porsche 911 GT3 R LMGT3','Manthey',340,'+47 laps','+47 laps',[[ 'Antares Au','Hong Kong'],['Klaus Bachler','Austria'],['Loek Hartog','Netherlands']]),
    E(39,'LMGT3','33','corvette','Chevrolet Corvette Z06 GT3.R','TF Sport',339,'+48 laps','+48 laps',[[ 'Jonny Edgar','United Kingdom'],['Daniel Juncadella','Spain'],['Ben Keating','United States']]),
    E(40,'LMGT3','57','ferrari','Ferrari 296 GT3','Kessel Racing',339,'+48 laps','+48 laps',[[ 'Takeshi Kimura','Japan'],['Daniel Serra','Brazil'],['Casper Stevenson','United Kingdom']]),
    E(41,'LMGT3','77','ford','Ford Mustang GT3','Proton Competition',338,'+49 laps','+49 laps',[[ 'Ben Barker','United Kingdom'],['Bernardo Sousa','Portugal'],['Ben Tuck','United Kingdom']]),
    E(42,'LMGT3','13','corvette','Chevrolet Corvette Z06 GT3.R','AWA Racing',338,'+49 laps','+49 laps',[[ 'Matt Bell','United Kingdom'],['Orey Fidani','Canada'],['Lars Kern','Germany']]),
    E(43,'LMGT3','150','ferrari','Ferrari 296 GT3','Richard Mille AF Corse',338,'+49 laps','+49 laps',[[ 'Riccardo Agostini','Italy'],['Custodio Toledo','Brazil'],['Lilou Wadoux','France']]),
    E(44,'LMGT3','61','mercedes','Mercedes-AMG GT3 Evo','Iron Lynx',337,'+50 laps','+50 laps',[[ 'Martin Berry','Australia'],['Lin Hodenius','Netherlands'],['Maxime Martin','Belgium']]),
    E(45,'LMGT3','10','astonmartin','Aston Martin Vantage AMR GT3 Evo','Racing Spirit of Léman',336,'+51 laps','+51 laps',[[ 'Eduardo Barrichello','Brazil'],['Derek DeBoer','United States'],['Valentin Hasse-Clot','France']]),
    E(46,'LMGT3','193','ferrari','Ferrari 296 GT3','Ziggo Sport - Tempesta',335,'+52 laps','+52 laps',[[ 'Eddie Cheever III','Italy'],['Chris Froggatt','United Kingdom'],['Jonathan Hui','Hong Kong']]),
    E(47,'LMGT3','63','mercedes','Mercedes-AMG GT3 Evo','Iron Lynx',334,'+53 laps','+53 laps',[[ 'Brenton Grove','Australia'],['Stephen Grove','Australia'],['Luca Stolz','Germany']]),
    E(48,'LMGT3','85','porsche','Porsche 911 GT3 R LMGT3','Iron Dames',334,'+53 laps','+53 laps',[[ 'Sarah Bovy','Belgium'],['Rahel Frey','Switzerland'],['Célia Martin','France']]),
    E(49,'LMGT3','59','mclaren','McLaren 720S GT3 Evo','United Autosports',314,'Not running','Not running',[[ 'Sébastien Baud','France'],['James Cottingham','United Kingdom'],['Grégoire Saucy','Switzerland']],'RET'),
    E(50,'LMP2','28','oreca','Oreca 07 Gibson','IDEC Sport',308,'Lost wheel','Lost wheel',[[ 'Sebastián Álvarez','Mexico'],['Paul Lafargue','France'],['Job van Uitert','Netherlands']],'RET'),
    E(51,'LMGT3','78','lexus','Lexus RC F GT3','Akkodis ASP Team',268,'Accident damage','Accident damage',[[ 'Finn Gehrsitz','Germany'],['Jack Hawksworth','United Kingdom'],['Arnold Robin','France']],'RET'),
    E(52,'HYP','311','cadillac','Cadillac V-Series.R','Cadillac Whelen',247,'Engine','Engine',[[ 'Jack Aitken','United Kingdom'],['Felipe Drugovich','Brazil'],['Frederik Vesti','Denmark']],'RET'),
    E(53,'LMP2','18','oreca','Oreca 07 Gibson','IDEC Sport',206,'Lost wheel','Lost wheel',[[ 'Jamie Chadwick','United Kingdom'],['Mathys Jaubert','France'],['André Lotterer','Germany']],'RET'),
    E(54,'LMGT3','54','ferrari','Ferrari 296 GT3','Vista AF Corse',192,'Mechanical','Mechanical',[[ 'Francesco Castellacci','Italy'],['Thomas Flohr','Switzerland'],['Davide Rigon','Italy']],'RET'),
    E(55,'HYP','101','cadillac','Cadillac V-Series.R','Cadillac WTR',189,'Engine','Engine',[[ 'Filipe Albuquerque','Portugal'],['Jordan Taylor','United States'],['Ricky Taylor','United States']],'RET'),
    E(56,'LMP2PA','24','oreca','Oreca 07 Gibson','Nielsen Racing',170,'Accident','Accident',[[ 'Cem Bölükbaşı','Turkey'],['Colin Braun','United States'],['Naveen Rao','United States']],'RET'),
    E(57,'LMGT3','31','bmw','BMW M4 GT3 Evo','The Bend Team WRT',168,'Collision damage','Collision damage',[[ 'Timur Boguslavskiy','Kyrgyzstan'],['Augusto Farfus','Brazil'],['Yasser Shahin','Australia']],'RET'),
    E(58,'LMGT3','46','bmw','BMW M4 GT3 Evo','Team WRT',156,'Electrical','Electrical',[[ 'Ahmad Al Harthy','Oman'],['Valentino Rossi','Italy'],['Kelvin van der Linde','South Africa']],'RET'),
    E(59,'LMGT3','95','mclaren','McLaren 720S GT3 Evo','United Autosports',80,'Drivetrain','Drivetrain',[[ 'Sean Gelael','Indonesia'],['Darren Leung','United Kingdom'],['Marino Sato','Japan']],'RET'),
    E(60,'LMGT3','60','mercedes','Mercedes-AMG GT3 Evo','Iron Lynx',57,'Engine','Engine',[[ 'Andrew Gilbert','United Kingdom'],['Lorcan Hanafin','United Kingdom'],['Fran Rueda','Spain']],'RET'),
    E(61,'LMGT3','88','ford','Ford Mustang GT3','Proton Competition',46,'Accident','Accident',[[ 'Stefano Gattuso','Italy'],['Giammarco Levorato','Italy'],['Dennis Olsen','Norway']],'RET'),
    E(62,'HYP','50','ferrari','Ferrari 499P','Ferrari AF Corse',387,'Disqualified','DSQ',[[ 'Antonio Fuoco','Italy'],['Miguel Molina','Spain'],['Nicklas Nielsen','Denmark']],'DSQ')
  ];
  replaceRace({
    id:'wec-lemans-2025',season:2025,round:4,series:'wec',event:'24 Hours of Le Mans',circuit:'Circuit de la Sarthe',country:'France',date:'2025-06-15',
    scheduledDuration:'24:00:00',officialDuration:'24:02:53.332',scheduledLaps:387,officialLaps:387,
    segments:[{id:'g0',phase:'GREEN',start:0,end:86573,startLap:0,endLap:387,reason:'Race',notes:'Race Control timeline pending import.'}],
    entries,
    performance:{
      fastestLaps:[
        {type:'FL',class:'Overall',no:'38',team:'Cadillac Hertz Team JOTA',driver:'Sébastien Bourdais',lap:'',time:'3:26.063'},
        {type:'FL',class:'HYP',no:'38',team:'Cadillac Hertz Team JOTA',driver:'Sébastien Bourdais',lap:'',time:'3:26.063'},
        {type:'FL',class:'LMP2',no:'43',team:'Inter Europol Competition',driver:'Nick Yelloly',lap:'',time:'3:37.125'},
        {type:'FL',class:'LMP2PA',no:'16',team:'RLR MSport',driver:'Patrick Pilet',lap:'',time:'3:36.888'},
        {type:'FL',class:'LMGT3',no:'27',team:'Heart of Racing Team',driver:'Mattia Drudi',lap:'',time:'3:55.456'}
      ],
      poles:[
        {type:'PP',class:'Overall',no:'12',team:'Cadillac Hertz Team JOTA',driver:'Alex Lynn',time:'3:23.166'},
        {type:'PP',class:'HYP',no:'12',team:'Cadillac Hertz Team JOTA',driver:'Alex Lynn',time:'3:23.166'},
        {type:'PP',class:'LMP2',no:'43',team:'Inter Europol Competition',driver:'Tom Dillmann',time:'3:35.333'},
        {type:'PP',class:'LMP2PA',no:'29',team:'TDS Racing',driver:'Mathias Beche',time:'3:35.062'},
        {type:'PP',class:'LMGT3',no:'27',team:'Heart of Racing Team',driver:'Zacharie Robichon',time:'3:52.789'}
      ]
    },
    completeness:{metadata:true,entryList:false,results:true,fastestLaps:true,poles:true,raceControl:false},
    sources:['Al Kamel FIA WEC 2025 Le Mans Final Classification','Al Kamel FIA WEC 2025 Le Mans Qualifying Classification']
  });
  if(typeof window!=='undefined') window.RACES=RACES;
})();


/* --- SCC São Paulo 2025 + COTA 2025 clean reference data ONLY --- */
(function(){
  const D=(n,c)=>[n,c||''];
  const E=(pos, cls, no, cons, model, team, laps, time, gap, drivers, status='FIN')=>({
    pos,class:cls,no:String(no),constructor:cons,model,team,laps,time,gap,drivers:drivers.map(x=>D(x[0],x[1])),status
  });
  function replaceRace(r){const idx=RACES.findIndex(x=>x.id===r.id); if(idx>=0)RACES[idx]=r; else RACES.push(r);}

  const saoEntries=[
    E(1,'HYP','12','cadillac','Cadillac V-Series.R','Cadillac Hertz Team JOTA',242,'6:00:19.732','—',[[ 'Alex Lynn','United Kingdom'],['Norman Nato','France'],['Will Stevens','United Kingdom']]),
    E(2,'HYP','38','cadillac','Cadillac V-Series.R','Cadillac Hertz Team JOTA',242,'6:01:16.748','+57.016',[[ 'Earl Bamber','New Zealand'],['Sébastien Bourdais','France'],['Jenson Button','United Kingdom']]),
    E(3,'HYP','5','porsche','Porsche 963','Porsche Penske Motorsport',242,'6:01:18.614','+58.882',[[ 'Julien Andlauer','France'],['Michael Christensen','Denmark']]),
    E(4,'HYP','6','porsche','Porsche 963','Porsche Penske Motorsport',241,'6:00:47.676','+1 lap',[[ 'Kévin Estre','France'],['Laurens Vanthoor','Belgium']]),
    E(5,'HYP','20','bmw','BMW M Hybrid V8','BMW M Team WRT',241,'6:01:42.059','+1 lap +54.383',[[ 'René Rast','Germany'],['Marco Wittmann','Germany'],['Sheldon van der Linde','South Africa']]),
    E(6,'HYP','94','peugeot','Peugeot 9X8','Peugeot TotalEnergies',240,'6:00:23.184','+2 laps',[[ 'Loïc Duval','France'],['Malthe Jakobsen','Denmark']]),
    E(7,'HYP','93','peugeot','Peugeot 9X8','Peugeot TotalEnergies',240,'6:00:40.955','+2 laps +17.771',[[ 'Paul di Resta','United Kingdom'],['Mikkel Jensen','Denmark']]),
    E(8,'HYP','83','ferrari','Ferrari 499P','AF Corse',240,'6:00:56.572','+2 laps +33.388',[[ 'Robert Kubica','Poland'],['Yifei Ye','China'],['Phil Hanson','United Kingdom']]),
    E(9,'HYP','36','alpine','Alpine A424','Alpine Endurance Team',240,'6:00:57.326','+2 laps +34.142',[[ 'Jules Gounon','France'],['Frédéric Makowiecki','France'],['Mick Schumacher','Germany']]),
    E(10,'HYP','99','porsche','Porsche 963','Proton Competition',240,'6:01:40.434','+2 laps +1:17.250',[[ 'Neel Jani','Switzerland'],['Nico Pino','Chile'],['Nicolás Varrone','Argentina']]),
    E(11,'HYP','51','ferrari','Ferrari 499P','Ferrari AF Corse',239,'6:00:26.730','+3 laps',[[ 'Alessandro Pier Guidi','Italy'],['James Calado','United Kingdom'],['Antonio Giovinazzi','Italy']]),
    E(12,'HYP','50','ferrari','Ferrari 499P','Ferrari AF Corse',239,'6:00:42.389','+3 laps +15.659',[[ 'Antonio Fuoco','Italy'],['Miguel Molina','Spain'],['Nicklas Nielsen','Denmark']]),
    E(13,'HYP','009','astonmartin','Aston Martin Valkyrie','Aston Martin THOR Team',239,'6:01:04.673','+3 laps +37.943',[[ 'Alex Riberas','Spain'],['Marco Sørensen','Denmark']]),
    E(14,'HYP','7','toyota','Toyota GR010 Hybrid','Toyota Gazoo Racing',239,'6:01:20.329','+3 laps +53.599',[[ 'Mike Conway','United Kingdom'],['Kamui Kobayashi','Japan'],['Nyck de Vries','Netherlands']]),
    E(15,'HYP','8','toyota','Toyota GR010 Hybrid','Toyota Gazoo Racing',239,'6:01:21.870','+3 laps +55.140',[[ 'Brendon Hartley','New Zealand'],['Ryo Hirakawa','Japan']]),
    E(16,'HYP','007','astonmartin','Aston Martin Valkyrie','Aston Martin THOR Team',238,'6:01:00.107','+4 laps',[[ 'Harry Tincknell','United Kingdom'],['Tom Gamble','United Kingdom']]),
    E(17,'HYP','15','bmw','BMW M Hybrid V8','BMW M Team WRT',222,'6:01:23.383','+20 laps',[[ 'Dries Vanthoor','Belgium'],['Raffaele Marciello','Switzerland'],['Kevin Magnussen','Denmark']]),
    E(18,'LMGT3','87','lexus','Lexus RC F LMGT3','Akkodis ASP Team',216,'6:00:54.573','+26 laps',[[ 'Răzvan Umbrărescu','Romania'],['Clemens Schmid','Austria'],['José María López','Argentina']]),
    E(19,'LMGT3','81','corvette','Chevrolet Corvette Z06 GT3.R','TF Sport',216,'6:01:32.289','+26 laps +37.716',[[ 'Tom Van Rompuy','Belgium'],['Rui Andrade','Angola'],['Charlie Eastwood','Ireland']]),
    E(20,'LMGT3','10','astonmartin','Aston Martin Vantage AMR LMGT3','Racing Spirit of Léman',216,'6:01:37.138','+26 laps +42.565',[[ 'Anthony McIntosh','United States'],['Eduardo Barrichello','Brazil'],['Valentin Hasse-Clot','France']]),
    E(21,'LMGT3','85','porsche','Porsche 911 GT3 R LMGT3','Iron Dames',216,'6:01:38.599','+26 laps +44.026',[[ 'Célia Martin','France'],['Rahel Frey','Switzerland'],['Michelle Gatting','Denmark']]),
    E(22,'LMGT3','78','lexus','Lexus RC F LMGT3','Akkodis ASP Team',216,'6:01:42.288','+26 laps +47.715',[[ 'Arnold Robin','France'],['Finn Gehrsitz','Germany'],['Yuichi Nakayama','Japan']]),
    E(23,'LMGT3','92','porsche','Porsche 911 GT3 R LMGT3','Manthey 1ST Phorm',215,'6:00:34.980','+27 laps',[[ 'Ryan Hardwick','United States'],['Riccardo Pera','Italy'],['Richard Lietz','Austria']]),
    E(24,'LMGT3','33','corvette','Chevrolet Corvette Z06 GT3.R','TF Sport',215,'6:00:41.425','+27 laps +6.445',[[ 'Ben Keating','United States'],['Jonny Edgar','United Kingdom'],['Daniel Juncadella','Spain']]),
    E(25,'LMGT3','59','mclaren','McLaren 720S LMGT3 Evo','United Autosports',215,'6:00:41.642','+27 laps +6.662',[[ 'James Cottingham','United Kingdom'],['Sébastien Baud','France'],['Grégoire Saucy','Switzerland']]),
    E(26,'LMGT3','95','mclaren','McLaren 720S LMGT3 Evo','United Autosports',215,'6:00:55.775','+27 laps +20.795',[[ 'Darren Leung','United Kingdom'],['Sean Gelael','Indonesia'],['Marino Sato','Japan']]),
    E(27,'LMGT3','46','bmw','BMW M4 LMGT3','Team WRT',215,'6:00:57.512','+27 laps +22.532',[[ 'Ahmad Al Harthy','Oman'],['Valentino Rossi','Italy'],['Kelvin van der Linde','South Africa']]),
    E(28,'LMGT3','54','ferrari','Ferrari 296 LMGT3','Vista AF Corse',215,'6:01:12.575','+27 laps +37.595',[[ 'Thomas Flohr','Switzerland'],['Francesco Castellacci','Italy'],['Davide Rigon','Italy']]),
    E(29,'LMGT3','31','bmw','BMW M4 LMGT3','The Bend Team WRT',215,'6:01:29.019','+27 laps +54.039',[[ 'Yasser Shahin','Australia'],['P. Ebrahim','South Africa'],['Augusto Farfus','Brazil']]),
    E(30,'LMGT3','21','ferrari','Ferrari 296 LMGT3','Vista AF Corse',215,'6:01:43.139','+27 laps +1:08.159',[[ 'François Hériau','France'],['Simon Mann','United States'],['Alessio Rovera','Italy']]),
    E(31,'LMGT3','27','astonmartin','Aston Martin Vantage AMR LMGT3','Heart of Racing Team',214,'6:00:50.966','+28 laps',[[ 'Ian James','United Kingdom'],['Zacharie Robichon','Canada'],['Mattia Drudi','Italy']]),
    E(32,'LMGT3','60','mercedes','Mercedes-AMG LMGT3','Iron Lynx',214,'6:02:29.910','+28 laps +1:38.944',[[ 'Andrew Gilbert','United Kingdom'],['Lorcan Hanafin','United Kingdom'],['Fran Rueda','Spain']]),
    E(33,'HYP','35','alpine','Alpine A424','Alpine Endurance Team',200,'6:00:50.068','+42 laps',[[ 'Paul-Loup Chatin','France'],['Ferdinand Habsburg','Austria'],['Charles Milesi','France']]),
    E(34,'LMGT3','61','mercedes','Mercedes-AMG LMGT3','Iron Lynx',184,'5:11:21.327','RET',[[ 'Martin Berry','Australia'],['Lin Hodenius','Netherlands'],['Maxime Martin','Belgium']],'RET'),
    E(35,'LMGT3','77','ford','Ford Mustang LMGT3','Proton Competition',169,'4:45:01.108','RET',[[ 'Bernardo Sousa','Portugal'],['Ben Tuck','United Kingdom'],['Ben Barker','United Kingdom']],'RET'),
    E(36,'LMGT3','88','ford','Ford Mustang LMGT3','Proton Competition',86,'2:27:03.189','RET',[[ 'Stefano Gattuso','Italy'],['Giammarco Levorato','Italy'],['Dennis Olsen','Norway']],'RET')
  ];
  replaceRace({
    id:'wec-saopaulo-2025',season:2025,round:5,series:'wec',event:'Rolex 6 Hours of São Paulo',circuit:'Interlagos',country:'Brazil',date:'2025-07-13',
    scheduledDuration:'06:00:00',officialDuration:'06:00:19.732',scheduledLaps:242,officialLaps:242,
    segments:[{id:'g0',phase:'GREEN',start:0,end:21620,startLap:0,endLap:242,reason:'Race',notes:'Race Control timeline pending import.'}],
    entries:saoEntries,
    performance:{
      fastestLaps:[
        {type:'FL',class:'Overall',no:'12',team:'Cadillac Hertz Team JOTA',driver:'Will Stevens',lap:3,time:'1:24.498'},
        {type:'FL',class:'HYP',no:'12',team:'Cadillac Hertz Team JOTA',driver:'Will Stevens',lap:3,time:'1:24.498'},
        {type:'FL',class:'LMGT3',no:'10',team:'Racing Spirit of Léman',driver:'Eduardo Barrichello',lap:189,time:'1:34.463'}
      ],
      poles:[
        {type:'PP',class:'Overall',no:'12',team:'Cadillac Hertz Team JOTA',driver:'Alex Lynn',time:'1:22.829'},
        {type:'PP',class:'HYP',no:'12',team:'Cadillac Hertz Team JOTA',driver:'Alex Lynn',time:'1:22.829'},
        {type:'PP',class:'LMGT3',no:'10',team:'Racing Spirit of Léman',driver:'Eduardo Barrichello',time:'1:33.849'}
      ]
    },
    completeness:{metadata:true,entryList:false,results:true,fastestLaps:true,poles:true,raceControl:false},
    sources:['Al Kamel FIA WEC 2025 São Paulo Final Classification','Al Kamel FIA WEC 2025 São Paulo Qualifying/Hyperpole Classification']
  });

  const cotaEntries=[
    E(1,'HYP','6','porsche','Porsche 963','Porsche Penske Motorsport',120,'6:01:25.310','—',[[ 'Kévin Estre','France'],['Laurens Vanthoor','Belgium'],['Matt Campbell','Australia']]),
    E(2,'HYP','50','ferrari','Ferrari 499P','Ferrari AF Corse',120,'6:01:33.935','+8.625',[[ 'Antonio Fuoco','Italy'],['Miguel Molina','Spain'],['Nicklas Nielsen','Denmark']]),
    E(3,'HYP','94','peugeot','Peugeot 9X8','Peugeot TotalEnergies',120,'6:01:34.851','+9.541',[[ 'Loïc Duval','France'],['Malthe Jakobsen','Denmark'],['Stoffel Vandoorne','Belgium']]),
    E(4,'HYP','93','peugeot','Peugeot 9X8','Peugeot TotalEnergies',120,'6:01:40.459','+15.149',[[ 'Paul di Resta','United Kingdom'],['Mikkel Jensen','Denmark'],['Jean-Éric Vergne','France']]),
    E(5,'HYP','51','ferrari','Ferrari 499P','Ferrari AF Corse',120,'6:01:47.929','+22.619',[[ 'Alessandro Pier Guidi','Italy'],['James Calado','United Kingdom'],['Antonio Giovinazzi','Italy']]),
    E(6,'HYP','38','cadillac','Cadillac V-Series.R','Cadillac Hertz Team JOTA',120,'6:02:07.827','+42.517',[[ 'Earl Bamber','New Zealand'],['Sébastien Bourdais','France'],['Jenson Button','United Kingdom']]),
    E(7,'HYP','83','ferrari','Ferrari 499P','AF Corse',120,'6:02:22.265','+56.955',[[ 'Robert Kubica','Poland'],['Yifei Ye','China'],['Phil Hanson','United Kingdom']]),
    E(8,'HYP','12','cadillac','Cadillac V-Series.R','Cadillac Hertz Team JOTA',120,'6:02:36.206','+1:10.896',[[ 'Alex Lynn','United Kingdom'],['Norman Nato','France'],['Will Stevens','United Kingdom']]),
    E(9,'HYP','8','toyota','Toyota GR010 Hybrid','Toyota Gazoo Racing',120,'6:02:39.925','+1:14.615',[[ 'Sébastien Buemi','Switzerland'],['Brendon Hartley','New Zealand'],['Ryo Hirakawa','Japan']]),
    E(10,'HYP','5','porsche','Porsche 963','Porsche Penske Motorsport',120,'6:02:46.427','+1:21.117',[[ 'Julien Andlauer','France'],['Michael Christensen','Denmark'],['Mathieu Jaminet','France']]),
    E(11,'HYP','35','alpine','Alpine A424','Alpine Endurance Team',120,'6:03:06.076','+1:40.766',[[ 'Paul-Loup Chatin','France'],['Ferdinand Habsburg','Austria'],['Charles Milesi','France']]),
    E(12,'HYP','15','bmw','BMW M Hybrid V8','BMW M Team WRT',119,'6:03:38.135','+1 lap',[[ 'Dries Vanthoor','Belgium'],['Raffaele Marciello','Switzerland'],['Kevin Magnussen','Denmark']]),
    E(13,'HYP','99','porsche','Porsche 963','Proton Competition',118,'6:01:29.266','+2 laps',[[ 'Neel Jani','Switzerland'],['Nico Pino','Chile'],['Nicolás Varrone','Argentina']]),
    E(14,'HYP','7','toyota','Toyota GR010 Hybrid','Toyota Gazoo Racing',116,'6:01:57.876','+4 laps',[[ 'José María López','Argentina'],['Kamui Kobayashi','Japan'],['Nyck de Vries','Netherlands']]),
    E(15,'HYP','36','alpine','Alpine A424','Alpine Endurance Team',116,'6:03:13.498','+4 laps +1:15.622',[[ 'Jules Gounon','France'],['Frédéric Makowiecki','France'],['Mick Schumacher','Germany']]),
    E(16,'LMGT3','95','mclaren','McLaren 720S LMGT3 Evo','United Autosports',115,'6:01:36.154','+5 laps',[[ 'Darren Leung','United Kingdom'],['Sean Gelael','Indonesia'],['Marino Sato','Japan']]),
    E(17,'LMGT3','46','bmw','BMW M4 LMGT3','Team WRT',115,'6:01:36.410','+5 laps +0.256',[[ 'Ahmad Al Harthy','Oman'],['Valentino Rossi','Italy'],['Kelvin van der Linde','South Africa']]),
    E(18,'LMGT3','54','ferrari','Ferrari 296 LMGT3','Vista AF Corse',115,'6:01:38.859','+5 laps +2.705',[[ 'Thomas Flohr','Switzerland'],['Francesco Castellacci','Italy'],['Davide Rigon','Italy']]),
    E(19,'LMGT3','59','mclaren','McLaren 720S LMGT3 Evo','United Autosports',115,'6:01:42.611','+5 laps +6.457',[[ 'James Cottingham','United Kingdom'],['Sébastien Baud','France'],['Grégoire Saucy','Switzerland']]),
    E(20,'LMGT3','27','astonmartin','Aston Martin Vantage AMR LMGT3','Heart of Racing Team',115,'6:01:50.985','+5 laps +14.831',[[ 'Ian James','United Kingdom'],['Zacharie Robichon','Canada'],['Mattia Drudi','Italy']]),
    E(21,'LMGT3','77','ford','Ford Mustang LMGT3','Proton Competition',115,'6:01:57.447','+5 laps +21.293',[[ 'Bernardo Sousa','Portugal'],['Ben Tuck','United Kingdom'],['Ben Barker','United Kingdom']]),
    E(22,'LMGT3','92','porsche','Porsche 911 GT3 R LMGT3','Manthey 1ST Phorm',115,'6:01:57.912','+5 laps +21.758',[[ 'Ryan Hardwick','United States'],['Riccardo Pera','Italy'],['Richard Lietz','Austria']]),
    E(23,'LMGT3','88','ford','Ford Mustang LMGT3','Proton Competition',115,'6:02:16.036','+5 laps +39.882',[[ 'Stefano Gattuso','Italy'],['Giammarco Levorato','Italy'],['Dennis Olsen','Norway']]),
    E(24,'LMGT3','31','bmw','BMW M4 LMGT3','The Bend Team WRT',115,'6:02:25.002','+5 laps +48.848',[[ 'Yasser Shahin','Australia'],['Timur Boguslavskiy','Kyrgyzstan'],['Augusto Farfus','Brazil']]),
    E(25,'LMGT3','60','mercedes','Mercedes-AMG LMGT3','Iron Lynx',115,'6:02:31.721','+5 laps +55.567',[[ 'Andrew Gilbert','United Kingdom'],['Lorcan Hanafin','United Kingdom'],['Fran Rueda','Spain']]),
    E(26,'LMGT3','10','astonmartin','Aston Martin Vantage AMR LMGT3','Racing Spirit of Léman',115,'6:02:46.895','+5 laps +1:10.741',[[ 'Derek DeBoer','United States'],['Eduardo Barrichello','Brazil'],['Valentin Hasse-Clot','France']]),
    E(27,'LMGT3','21','ferrari','Ferrari 296 LMGT3','Vista AF Corse',115,'6:02:51.185','+5 laps +1:15.031',[[ 'François Hériau','France'],['Simon Mann','United States'],['Alessio Rovera','Italy']]),
    E(28,'LMGT3','81','corvette','Chevrolet Corvette Z06 GT3.R','TF Sport',114,'6:01:25.966','+6 laps',[[ 'Tom Van Rompuy','Belgium'],['Rui Andrade','Angola'],['Charlie Eastwood','Ireland']]),
    E(29,'LMGT3','78','lexus','Lexus RC F LMGT3','Akkodis ASP Team',114,'6:02:18.778','+6 laps +52.812',[[ 'Arnold Robin','France'],['Finn Gehrsitz','Germany'],['Ben Barnicoat','United Kingdom']]),
    E(30,'LMGT3','61','mercedes','Mercedes-AMG LMGT3','Iron Lynx',85,'4:47:27.464','NC',[[ 'Martin Berry','Australia'],['Lin Hodenius','Netherlands'],['Maxime Martin','Belgium']],'NC'),
    E(31,'LMGT3','33','corvette','Chevrolet Corvette Z06 GT3.R','TF Sport',76,'4:24:54.946','NC',[[ 'Ben Keating','United States'],['Jonny Edgar','United Kingdom'],['Daniel Juncadella','Spain']],'NC'),
    E(32,'LMGT3','87','lexus','Lexus RC F LMGT3','Akkodis ASP Team',72,'4:22:33.451','NC',[[ 'Jack Hawksworth','United Kingdom'],['Clemens Schmid','Austria'],['Răzvan Umbrărescu','Romania']],'NC'),
    E(33,'HYP','20','bmw','BMW M Hybrid V8','BMW M Team WRT',13,'39:37.017','NC',[[ 'Robin Frijns','Netherlands'],['René Rast','Germany'],['Sheldon van der Linde','South Africa']],'NC'),
    E(34,'LMGT3','85','porsche','Porsche 911 GT3 R LMGT3','Iron Dames',113,'5:57:40.423','RET',[[ 'Célia Martin','France'],['Rahel Frey','Switzerland'],['Michelle Gatting','Denmark']],'RET'),
    E(35,'HYP','009','astonmartin','Aston Martin Valkyrie','Aston Martin THOR Team',106,'5:33:03.180','RET',[[ 'Alex Riberas','Spain'],['Marco Sørensen','Denmark']],'RET'),
    E(36,'HYP','007','astonmartin','Aston Martin Valkyrie','Aston Martin THOR Team',102,'5:22:04.166','RET',[[ 'Harry Tincknell','United Kingdom'],['Tom Gamble','United Kingdom']],'RET')
  ];
  replaceRace({
    id:'wec-cota-2025',season:2025,round:6,series:'wec',event:'Lone Star Le Mans',circuit:'Circuit of the Americas',country:'United States',date:'2025-09-07',
    scheduledDuration:'06:00:00',officialDuration:'06:01:25.310',scheduledLaps:120,officialLaps:120,
    segments:[{id:'g0',phase:'GREEN',start:0,end:21685,startLap:0,endLap:120,reason:'Race',notes:'Race Control timeline pending import.'}],
    entries:cotaEntries,
    performance:{
      fastestLaps:[
        {type:'FL',class:'Overall',no:'6',team:'Porsche Penske Motorsport',driver:'Kévin Estre',lap:108,time:'2:03.443'},
        {type:'FL',class:'HYP',no:'6',team:'Porsche Penske Motorsport',driver:'Kévin Estre',lap:108,time:'2:03.443'},
        {type:'FL',class:'LMGT3',no:'59',team:'United Autosports',driver:'Grégoire Saucy',lap:114,time:'2:09.490'}
      ],
      poles:[
        {type:'PP',class:'Overall',no:'83',team:'AF Corse',driver:'Robert Kubica',time:'1:57.655'},
        {type:'PP',class:'HYP',no:'83',team:'AF Corse',driver:'Robert Kubica',time:'1:57.655'},
        {type:'PP',class:'LMGT3',no:'88',team:'Proton Competition',driver:'Giammarco Levorato',time:'2:07.645'}
      ]
    },
    completeness:{metadata:true,entryList:false,results:true,fastestLaps:true,poles:true,raceControl:false},
    sources:['Al Kamel FIA WEC 2025 COTA Final Classification','Al Kamel FIA WEC 2025 COTA Qualifying/Hyperpole Classification']
  });
  if(typeof window!=='undefined') window.RACES=RACES;
})();
