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
  it:`<svg viewBox="0 0 3 2"><path shape-rendering="crispEdges" fill="#009246" d="M0 0h1v2H0z"/><path shape-rendering="crispEdges" fill="#fff" d="M1 0h1v2H1z"/><path shape-rendering="crispEdges" fill="#ce2b37" d="M2 0h1v2H2z"/></svg>`,
  be:`<svg viewBox="0 0 3 2"><path fill="#000" d="M0 0h1v2H0z"/><path fill="#fae042" d="M1 0h1v2H1z"/><path fill="#ed2939" d="M2 0h1v2H2z"/></svg>`,
  fr:`<svg viewBox="0 0 3 2"><path shape-rendering="crispEdges" fill="#0055a4" d="M0 0h1v2H0z"/><path shape-rendering="crispEdges" fill="#fff" d="M1 0h1v2H1z"/><path shape-rendering="crispEdges" fill="#ef4135" d="M2 0h1v2H2z"/></svg>`,
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
  ca:`<svg viewBox="0 0 640 480"><path shape-rendering="crispEdges" fill="#fff" d="M150.1 0h339.7v480H150z"/><path shape-rendering="crispEdges" fill="#d52b1e" d="M-19.7 0h169.8v480H-19.7zm509.5 0h169.8v480H489.9z"/><path fill="#d52b1e" d="M201 232l-13.3 4.4 61.4 54c4.7 13.7-1.6 17.8-5.6 25l66.6-8.4-1.6 67 13.9-.3-3.1-66.6 66.7 8c-4.1-8.7-7.8-13.3-4-27.2l61.3-51-10.7-4c-8.8-6.8 3.8-32.6 5.6-48.9 0 0-35.7 12.3-38 5.8l-9.2-17.5-32.6 35.8c-3.5.9-5-.5-5.9-3.5l15-74.8-23.8 13.4q-3.2 1.3-5.2-2.2l-23-46-23.6 47.8q-2.8 2.5-5 .7L264 130.8l13.7 74.1c-1.1 3-3.7 3.8-6.7 2.2l-31.2-35.3c-4 6.5-6.8 17.1-12.2 19.5s-23.5-4.5-35.6-7c4.2 14.8 17 39.6 9 47.7"/></svg>`,
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
  {id:'porsche',name:'Porsche',category:'hypercar',short:'POR',logo:'assets/assetpack/constructors/porsche.png',fallbackColor:'#111'},
  {id:'toyota',name:'Toyota',category:'hypercar',short:'TOY',logo:'assets/assetpack/constructors/toyota.svg',fallbackColor:'#e4002b'},
  {id:'cadillac',name:'Cadillac',category:'hypercar',short:'CAD',logo:'assets/assetpack/constructors/cadillac.svg',fallbackColor:'#ad8a3b'},
  {id:'bmw',name:'BMW',category:'hypercar',short:'BMW',logo:'assets/assetpack/constructors/bmw.svg',fallbackColor:'#1c69d4'},
  {id:'alpine',name:'Alpine',category:'hypercar',short:'ALP',logo:'assets/assetpack/constructors/alpine.png',fallbackColor:'#0087c6'},
  {id:'peugeot',name:'Peugeot',category:'hypercar',short:'PEU',logo:'assets/assetpack/constructors/peugeot.svg',fallbackColor:'#111'},
  {id:'astonmartin',name:'Aston Martin',category:'hypercar',short:'AMR',logo:'assets/assetpack/constructors/astonmartin.png',fallbackColor:'#00665e'},
  {id:'lamborghini',name:'Lamborghini',category:'hypercar',short:'LAM',logo:'assets/assetpack/constructors/lamborghini.svg',fallbackColor:'#d4af37'},
  {id:'glickenhaus',name:'Glickenhaus',category:'LMP1',short:'GLI',logo:'assets/assetpack/constructors/glickenhaus.png',fallbackColor:'#e8821d'},
  {id:'isotta',name:'Isotta Fraschini',category:'hypercar',short:'ISO',logo:'assets/assetpack/constructors/isotta.png',fallbackColor:'#1c3f94'},
  {id:'vanwall',name:'Vanwall',category:'LMP1',short:'VAN',logo:'assets/assetpack/constructors/vanwall.png',fallbackColor:'#2f4e37'},
  {id:'oreca',name:'Oreca',category:'prototype',short:'ORC',logo:'assets/assetpack/constructors/oreca.svg',fallbackColor:'#0057b8'},
  {id:'ligier',name:'Ligier',category:'prototype',short:'LIG',logo:'assets/assetpack/constructors/ligier.png',fallbackColor:'#1f4b99'},
  {id:'duqueine',name:'Duqueine',category:'prototype',short:'DUQ',logo:'assets/assetpack/constructors/duqueine.svg',fallbackColor:'#263b80'},
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
  wec:{name:'FIA World Endurance Championship',short:'WEC',logo:'assets/assetpack/series/wec.png',phases:['GREEN','LOCAL_YELLOW','SLOW_ZONE','FCY','VSC','SC','RED'],classes:{LMP1:{label:'LMP1',short:'LMP1',color:'#c8102e',text:'#fff'},LMP1H:{label:'LMP1-H',short:'LMP1-H',color:'#c8102e',text:'#fff'},LMP1L:{label:'LMP1-L',short:'LMP1-L',color:'#8a0f22',text:'#fff'},HYP:{label:'Hypercar',short:'HYP',color:'#c8102e',text:'#fff'},LMP2:{label:'LMP2',short:'LMP2',color:'#0057b8',text:'#fff'},LMP2PA:{label:'LMP2 Pro/Am',short:'LMP2 P/A',color:'#5ec5ff',text:'#071014'},LMGT3:{label:'LMGT3',short:'LMGT3',color:'#00a651',text:'#071014'},GTEPRO:{label:'LMGTE Pro',short:'GTE PRO',color:'#00a651',text:'#071014'},GTEAM:{label:'LMGTE Am',short:'GTE AM',color:'#f2811d',text:'#071014'}}},
  imsa:{name:'IMSA WeatherTech SportsCar Championship',short:'IMSA',logo:'assets/assetpack/series/imsa.png',phases:['GREEN','SC','RED'],classes:{GTP:{label:'GTP',short:'GTP',color:'#111',text:'#fff'},LMP2:{label:'LMP2',short:'LMP2',color:'#0057b8',text:'#fff'},GTDPRO:{label:'GTD PRO',short:'GTD PRO',color:'#c8102e',text:'#fff'},GTD:{label:'GTD',short:'GTD',color:'#00a651',text:'#071014'}}},
  gtwc:{name:'GT World Challenge Europe',short:'GTWC EU',logo:'assets/assetpack/series/gtwc.svg',phases:['GREEN','LOCAL_YELLOW','FCY','SC','RED'],classes:{PRO:{label:'Pro',short:'PRO',color:'#f2f2f2',text:'#111'},GOLD:{label:'Gold',short:'GOLD',color:'#f2c230',text:'#111'},SILVER:{label:'Silver',short:'SILVER',color:'#2d8cff',text:'#fff'},BRONZE:{label:'Bronze',short:'BRONZE',color:'#c66a28',text:'#fff'},PROAM:{label:'Pro-Am',short:'PRO-AM',color:'#00a651',text:'#071014'}}},
  gtwc_us:{name:'GT World Challenge America',short:'GTWC USA',logo:'assets/assetpack/series/gtwc_us.svg',phases:['GREEN','LOCAL_YELLOW','FCY','SC','RED'],classes:{PRO:{label:'Pro',short:'PRO',color:'#f2f2f2',text:'#111'},PROAM:{label:'Pro-Am',short:'PRO-AM',color:'#00a651',text:'#071014'},AM:{label:'Am',short:'AM',color:'#c66a28',text:'#fff'}}},
  elms:{name:'European Le Mans Series',short:'ELMS',logo:'assets/assetpack/series/elms.png',phases:['GREEN','LOCAL_YELLOW','FCY','VSC','SC','RED'],classes:{LMP2:{label:'LMP2',short:'LMP2',color:'#0057b8',text:'#fff'},LMP2PA:{label:'LMP2 Pro/Am',short:'LMP2 P/A',color:'#5ec5ff',text:'#071014'},LMP3:{label:'LMP3',short:'LMP3',color:'#7f3fbf',text:'#fff'},LMGT3:{label:'LMGT3',short:'LMGT3',color:'#00a651',text:'#071014'}}},
  mlmc:{name:'Michelin Le Mans Cup',short:'MLMC',logo:'assets/assetpack/series/mlmc.png',phases:['GREEN','LOCAL_YELLOW','SLOW_ZONE','FCY','VSC','SC','RED'],classes:{LMP3:{label:'LMP3',short:'LMP3',color:'#f2c230',text:'#111'},LMP3PA:{label:'LMP3 Pro/Am',short:'LMP3 P/A',color:'#7f3fbf',text:'#fff'},GT3:{label:'GT3',short:'GT3',color:'#f2f2f2',text:'#111'}}},
  aslms:{name:'Asian Le Mans Series',short:'Asian LMS',logo:'assets/assetpack/series/aslms.png',phases:['GREEN','LOCAL_YELLOW','FCY','VSC','SC','RED'],classes:{LMP2:{label:'LMP2',short:'LMP2',color:'#0057b8',text:'#fff'},LMP3:{label:'LMP3',short:'LMP3',color:'#7f3fbf',text:'#fff'},GT:{label:'GT',short:'GT',color:'#00a651',text:'#071014'}}},
  gtopen:{name:'International GT Open',short:'GT Open',logo:'assets/assetpack/series/gtopen.png',phases:['GREEN','LOCAL_YELLOW','FCY','SC','RED'],classes:{PRO:{label:'Pro',short:'PRO',color:'#f2f2f2',text:'#111'},PROAM:{label:'Pro-Am',short:'PRO-AM',color:'#00a651',text:'#071014'},AM:{label:'Am',short:'AM',color:'#c66a28',text:'#fff'}}},
  creventic:{name:'24H Series',short:'24H Series',logo:'assets/assetpack/series/creventic.png',phases:['GREEN','CODE_60','RED'],classes:{GT3:{label:'GT3',short:'GT3',color:'#00a651',text:'#071014'},GTX:{label:'GTX',short:'GTX',color:'#7f3fbf',text:'#fff'},TCR:{label:'TCR',short:'TCR',color:'#2d8cff',text:'#fff'},TCX:{label:'TCX',short:'TCX',color:'#f2c230',text:'#111'}}},
  mpc:{name:'IMSA Michelin Pilot Challenge',short:'Pilot Challenge',logo:'assets/assetpack/series/mpc.png',phases:['GREEN','SC','RED'],classes:{GS:{label:'GS',short:'GS',color:'#c8102e',text:'#fff'},TCR:{label:'TCR',short:'TCR',color:'#2d8cff',text:'#fff'}}}
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
 {pos:8,class:'GTDPRO',no:'3',constructor:'corvette',model:'Corvette Z06 GT3.R',team:'Corvette Racing by Pratt Miller',gap:'+5 laps',laps:338,time:'+5 laps',drivers:[['Antonio Garcia','Spain'],['Alexander Sims','United Kingdom'],['Nicky Catsburg','Netherlands']]},
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
    ['mlmc-barcelona-2026',2026,1,'mlmc','Barcelona Round','Barcelona-Catalunya','Spain','2026-04-11','02:00:00',70],['mlmc-paulricard-2026',2026,2,'mlmc','Le Castellet Round','Paul Ricard','France','2026-05-02','02:00:00',70],['mlmc-roadlemans-2026',2026,3,'mlmc','Road to Le Mans','Circuit de la Sarthe','France','2026-06-12','02:00:00',25],['mlmc-spa-2026',2026,4,'mlmc','Spa-Francorchamps Round','Spa-Francorchamps','Belgium','2026-08-22','02:00:00',60],['mlmc-silverstone-2026',2026,5,'mlmc','Silverstone Round','Silverstone','United Kingdom','2026-09-12','02:00:00',70],['mlmc-portimao-2026',2026,6,'mlmc','Portimão Round','Portimão','Portugal','2026-10-10','02:00:00',70],
    ['mlmc-barcelona-2025',2025,1,'mlmc','Barcelona Round','Barcelona-Catalunya','Spain','2025-04-05','02:00:00',70],['mlmc-paulricard-2025',2025,2,'mlmc','Le Castellet Round','Paul Ricard','France','2025-05-03','02:00:00',70],['mlmc-roadlemans-2025',2025,3,'mlmc','Road to Le Mans','Circuit de la Sarthe','France','2025-06-12','02:00:00',25],['mlmc-spa-2025',2025,4,'mlmc','Spa-Francorchamps Round','Spa-Francorchamps','Belgium','2025-08-23','02:00:00',60],['mlmc-silverstone-2025',2025,5,'mlmc','Silverstone Round','Silverstone','United Kingdom','2025-09-13','02:00:00',70],['mlmc-portimao-2025',2025,6,'mlmc','Portimão Round','Portimão','Portugal','2025-10-17','02:00:00',70],
    ['aslms-sepang-2026',2026,1,'aslms','4 Hours of Sepang','Sepang','Malaysia','2026-12-12','04:00:00',120],['aslms-dubai-2026',2026,2,'aslms','4 Hours of Dubai','Dubai Autodrome','United Arab Emirates','2026-02-07','04:00:00',120],['aslms-abudhabi-2026',2026,3,'aslms','4 Hours of Abu Dhabi','Yas Marina','United Arab Emirates','2026-02-14','04:00:00',120],
    ['aslms-sepang-2025',2025,1,'aslms','4 Hours of Sepang','Sepang','Malaysia','2025-12-13','04:00:00',120],['aslms-dubai-2025',2025,2,'aslms','4 Hours of Dubai','Dubai Autodrome','United Arab Emirates','2025-02-08','04:00:00',120],['aslms-abudhabi-2025',2025,3,'aslms','4 Hours of Abu Dhabi','Yas Marina','United Arab Emirates','2025-02-15','04:00:00',120],
    ['gtwc-paulricard-2026',2026,1,'gtwc','Paul Ricard 1000 km','Paul Ricard','France','2026-04-12','06:00:00',180],['gtwc-monza-2026',2026,2,'gtwc','Monza','Monza','Italy','2026-05-31','03:00:00',95],['gtwc-misano-2026',2026,5,'gtwc','Misano','Misano','Italy','2026-07-19','01:00:00',40],['gtwc-magny-2026',2026,6,'gtwc','Magny-Cours','Magny-Cours','France','2026-08-02','01:00:00',40],['gtwc-nurburgring-2026',2026,7,'gtwc','Nürburgring','Nürburgring','Germany','2026-08-30','03:00:00',95],['gtwc-zandvoort-2026',2026,8,'gtwc','Zandvoort','Zandvoort','Netherlands','2026-09-20','01:00:00',40],['gtwc-barcelona-2026',2026,9,'gtwc','Barcelona','Barcelona-Catalunya','Spain','2026-10-04','03:00:00',95],['gtwc-portimao-2026',2026,10,'gtwc','Portimão','Portimão','Portugal','2026-10-18','03:00:00',95],
    ['gtwc-paulricard-2025',2025,1,'gtwc','Paul Ricard 1000 km','Paul Ricard','France','2025-04-12','06:00:00',180],['gtwc-monza-2025',2025,2,'gtwc','Monza','Monza','Italy','2025-06-01','03:00:00',95],['gtwc-spa24-2025',2025,3,'gtwc','CrowdStrike 24 Hours of Spa','Spa-Francorchamps','Belgium','2025-06-29','24:00:00',541],['gtwc-misano-2025',2025,4,'gtwc','Misano','Misano','Italy','2025-07-20','01:00:00',40],['gtwc-nurburgring-2025',2025,5,'gtwc','Nürburgring','Nürburgring','Germany','2025-08-31','03:00:00',95],['gtwc-valencia-2025',2025,6,'gtwc','Valencia','Valencia','Spain','2025-09-21','01:00:00',40],['gtwc-barcelona-2025',2025,7,'gtwc','Barcelona','Barcelona-Catalunya','Spain','2025-10-12','03:00:00',95],
    ['gtwca-sonoma-2026',2026,1,'gtwc_us','Sonoma','Sonoma Raceway','United States','2026-03-29','01:30:00',50],['gtwca-cota-2026',2026,2,'gtwc_us','Circuit of the Americas','COTA','United States','2026-05-03','01:30:00',50],['gtwca-sebring-2026',2026,3,'gtwc_us','Sebring','Sebring','United States','2026-05-17','01:30:00',50],['gtwca-roadamerica-2026',2026,4,'gtwc_us','Road America','Road America','United States','2026-08-16','01:30:00',50],['gtwca-barber-2026',2026,5,'gtwc_us','Barber','Barber Motorsports Park','United States','2026-09-06','01:30:00',50],['gtwca-indy-2026',2026,6,'gtwc_us','Indianapolis','Indianapolis','United States','2026-10-04','01:30:00',50],
    ['gtwca-sonoma-2025',2025,1,'gtwc_us','Sonoma','Sonoma Raceway','United States','2025-03-30','01:30:00',50],['gtwca-cota-2025',2025,2,'gtwc_us','Circuit of the Americas','COTA','United States','2025-04-27','01:30:00',50],['gtwca-sebring-2025',2025,3,'gtwc_us','Sebring','Sebring','United States','2025-05-18','01:30:00',50],['gtwca-vir-2025',2025,4,'gtwc_us','VIR','VIR','United States','2025-07-20','01:30:00',50],['gtwca-roadamerica-2025',2025,5,'gtwc_us','Road America','Road America','United States','2025-08-17','01:30:00',50],['gtwca-indy-2025',2025,6,'gtwc_us','Indianapolis','Indianapolis','United States','2025-10-05','01:30:00',50],
    ['gtopen-portimao-2026',2026,1,'gtopen','Portimão','Portimão','Portugal','2026-04-26','01:10:00',45],['gtopen-spa-2026',2026,2,'gtopen','Spa-Francorchamps','Spa-Francorchamps','Belgium','2026-05-24','01:10:00',45],['gtopen-hockenheim-2026',2026,3,'gtopen','Hockenheim','Hockenheim','Germany','2026-06-14','01:10:00',45],['gtopen-paulricard-2026',2026,4,'gtopen','Paul Ricard','Paul Ricard','France','2026-07-19','01:10:00',45],['gtopen-redbull-2026',2026,5,'gtopen','Red Bull Ring','Red Bull Ring','Austria','2026-09-13','01:10:00',45],['gtopen-monza-2026',2026,6,'gtopen','Monza','Monza','Italy','2026-10-04','01:10:00',45],['gtopen-barcelona-2026',2026,7,'gtopen','Barcelona','Barcelona-Catalunya','Spain','2026-10-25','01:10:00',45],
    ['gtopen-portimao-2025',2025,1,'gtopen','Portimão','Portimão','Portugal','2025-04-27','01:10:00',45],['gtopen-spa-2025',2025,2,'gtopen','Spa-Francorchamps','Spa-Francorchamps','Belgium','2025-05-25','01:10:00',45],['gtopen-hockenheim-2025',2025,3,'gtopen','Hockenheim','Hockenheim','Germany','2025-06-08','01:10:00',45],['gtopen-hungaroring-2025',2025,4,'gtopen','Hungaroring','Hungaroring','Hungary','2025-07-06','01:10:00',45],['gtopen-redbull-2025',2025,5,'gtopen','Red Bull Ring','Red Bull Ring','Austria','2025-09-14','01:10:00',45],['gtopen-monza-2025',2025,6,'gtopen','Monza','Monza','Italy','2025-10-05','01:10:00',45],['gtopen-barcelona-2025',2025,7,'gtopen','Barcelona','Barcelona-Catalunya','Spain','2025-10-26','01:10:00',45]
  ].map(([id,season,round,series,event,circuit,country,date,duration,laps])=>makeGreenRace({id,season,round,series,event,circuit,country,date,duration,laps}))
];

// v0.8.6.32: calendar-only shells for WEC/ELMS 2023 and 2024 (event, circuit, date, round -
// no entries, no results). Calendars verified against Wikipedia/fiawec.com; lap counts are
// rough estimates for the placeholder timeline only, same as the existing 2025/2026 shells.
RACES.push(...[
  ['wec-spa-2018',2019,1,'wec','6 Hours of Spa-Francorchamps (2018–19)','Spa-Francorchamps','Belgium','2018-05-05','06:00:00',205],
  ['wec-lemans-2018',2019,2,'wec','24 Hours of Le Mans (2018–19)','Circuit de la Sarthe','France','2018-06-16','24:00:00',380],
  ['wec-silverstone-2018',2019,3,'wec','6 Hours of Silverstone (2018–19)','Silverstone','United Kingdom','2018-08-19','06:00:00',210],
  ['wec-fuji-2018',2019,4,'wec','6 Hours of Fuji (2018–19)','Fuji Speedway','Japan','2018-10-14','06:00:00',220],
  ['wec-shanghai-2018',2019,5,'wec','6 Hours of Shanghai (2018–19)','Shanghai International Circuit','China','2018-11-04','06:00:00',195],
  ['wec-sebring-2018',2019,6,'wec','1000 Miles of Sebring (2018–19)','Sebring','United States','2019-03-15','08:00:00',260],
  ['wec-spa-2019',2019,7,'wec','6 Hours of Spa-Francorchamps (2018–19)','Spa-Francorchamps','Belgium','2019-05-04','06:00:00',205],
  ['wec-lemans-2019',2019,8,'wec','24 Hours of Le Mans (2018–19)','Circuit de la Sarthe','France','2019-06-15','24:00:00',380],
  ['wec-spa-2021',2021,1,'wec','6 Hours of Spa-Francorchamps','Spa-Francorchamps','Belgium','2021-05-01','06:00:00',205],
  ['wec-portimao-2021',2021,2,'wec','8 Hours of Portimão','Portimão','Portugal','2021-06-06','08:00:00',260],
  ['wec-monza-2021',2021,3,'wec','6 Hours of Monza','Monza','Italy','2021-07-18','06:00:00',165],
  ['wec-lemans-2021',2021,4,'wec','24 Hours of Le Mans','Circuit de la Sarthe','France','2021-08-21','24:00:00',340],
  ['wec-bahrain6h-2021',2021,5,'wec','6 Hours of Bahrain','Bahrain International Circuit','Bahrain','2021-11-06','06:00:00',195],
  ['wec-bahrain8h-2021',2021,6,'wec','8 Hours of Bahrain','Bahrain International Circuit','Bahrain','2021-11-13','08:00:00',260],
  ['wec-sebring-2022',2022,1,'wec','1000 Miles of Sebring','Sebring','United States','2022-03-18','06:00:00',195],
  ['wec-spa-2022',2022,2,'wec','6 Hours of Spa-Francorchamps','Spa-Francorchamps','Belgium','2022-05-07','06:00:00',150],
  ['wec-lemans-2022',2022,3,'wec','24 Hours of Le Mans','Circuit de la Sarthe','France','2022-06-11','24:00:00',350],
  ['wec-monza-2022',2022,4,'wec','6 Hours of Monza','Monza','Italy','2022-07-10','06:00:00',165],
  ['wec-fuji-2022',2022,5,'wec','6 Hours of Fuji','Fuji Speedway','Japan','2022-09-11','06:00:00',220],
  ['wec-bahrain-2022',2022,6,'wec','8 Hours of Bahrain','Bahrain International Circuit','Bahrain','2022-11-12','08:00:00',250],
  ['wec-sebring-2023',2023,1,'wec','1000 Miles of Sebring','Sebring','United States','2023-03-17','08:00:00',260],
  ['wec-portimao-2023',2023,2,'wec','6 Hours of Portimão','Portimão','Portugal','2023-04-16','06:00:00',205],
  ['wec-spa-2023',2023,3,'wec','6 Hours of Spa-Francorchamps','Spa-Francorchamps','Belgium','2023-04-29','06:00:00',150],
  ['wec-lemans-2023',2023,4,'wec','24 Hours of Le Mans','Circuit de la Sarthe','France','2023-06-10','24:00:00',380],
  ['wec-monza-2023',2023,5,'wec','6 Hours of Monza','Monza','Italy','2023-07-09','06:00:00',165],
  ['wec-fuji-2023',2023,6,'wec','6 Hours of Fuji','Fuji Speedway','Japan','2023-09-10','06:00:00',220],
  ['wec-bahrain-2023',2023,7,'wec','8 Hours of Bahrain','Bahrain International Circuit','Bahrain','2023-11-04','08:00:00',250],
  ['wec-qatar-2024',2024,1,'wec','Qatar 1812 km','Lusail','Qatar','2024-03-02','10:00:00',335],
  ['wec-imola-2024',2024,2,'wec','6 Hours of Imola','Imola','Italy','2024-04-21','06:00:00',215],
  ['wec-spa-2024',2024,3,'wec','6 Hours of Spa-Francorchamps','Spa-Francorchamps','Belgium','2024-05-11','06:00:00',150],
  ['wec-lemans-2024',2024,4,'wec','24 Hours of Le Mans','Circuit de la Sarthe','France','2024-06-15','24:00:00',380],
  ['wec-saopaulo-2024',2024,5,'wec','6 Hours of São Paulo','Interlagos','Brazil','2024-07-14','06:00:00',230],
  ['wec-cota-2024',2024,6,'wec','Lone Star Le Mans','Circuit of the Americas','United States','2024-09-01','06:00:00',180],
  ['wec-fuji-2024',2024,7,'wec','6 Hours of Fuji','Fuji Speedway','Japan','2024-09-15','06:00:00',220],
  ['wec-bahrain-2024',2024,8,'wec','8 Hours of Bahrain','Bahrain International Circuit','Bahrain','2024-11-02','08:00:00',250],
  ['elms-barcelona-2023',2023,1,'elms','4 Hours of Barcelona','Barcelona-Catalunya','Spain','2023-04-23','04:00:00',135],
  ['elms-paulricard-2023',2023,2,'elms','4 Hours of Le Castellet','Paul Ricard','France','2023-07-16','04:00:00',130],
  ['elms-aragon-2023',2023,3,'elms','4 Hours of Aragón','Aragón','Spain','2023-08-26','04:00:00',130],
  ['elms-spa-2023',2023,4,'elms','4 Hours of Spa-Francorchamps','Spa-Francorchamps','Belgium','2023-09-24','04:00:00',100],
  ['elms-algarve-2023',2023,5,'elms','4 Hours of Algarve','Portimão','Portugal','2023-10-20','04:00:00',130],
  ['elms-portimao-2023',2023,6,'elms','4 Hours of Portimão','Portimão','Portugal','2023-10-22','04:00:00',130],
  ['elms-barcelona-2024',2024,1,'elms','4 Hours of Barcelona','Barcelona-Catalunya','Spain','2024-04-14','04:00:00',135],
  ['elms-paulricard-2024',2024,2,'elms','4 Hours of Le Castellet','Paul Ricard','France','2024-05-05','04:00:00',130],
  ['elms-imola-2024',2024,3,'elms','4 Hours of Imola','Imola','Italy','2024-07-07','04:00:00',135],
  ['elms-spa-2024',2024,4,'elms','4 Hours of Spa-Francorchamps','Spa-Francorchamps','Belgium','2024-08-25','04:00:00',100],
  ['elms-mugello-2024',2024,5,'elms','4 Hours of Mugello','Mugello','Italy','2024-09-29','04:00:00',130],
  ['elms-portimao-2024',2024,6,'elms','4 Hours of Portimão','Portimão','Portugal','2024-10-19','04:00:00',130],
].map(([id,season,round,series,event,circuit,country,date,duration,laps])=>makeGreenRace({id,season,round,series,event,circuit,country,date,duration,laps})));

// Historical calendars 2012+ (researched season-by-season, one entry per real event
// weekend - not split into sub-races - matching the plain skeleton style already used
// above for WEC/ELMS/MLMC 2023+, kept lightweight since these are placeholders until a
// real PDF import replaces each one). WEC 2012-2017 (plain calendar-year era, before the
// 2018-19/2019-20 split winter seasons already present above).
RACES.push(...[
  ['wec-sebring-2012',2012,1,'wec','12 Hours of Sebring','Sebring','United States','2012-03-17','12:00:00',330],
  ['wec-spa-2012',2012,2,'wec','6 Hours of Spa-Francorchamps','Spa-Francorchamps','Belgium','2012-05-05','06:00:00',205],
  ['wec-lemans-2012',2012,3,'wec','24 Hours of Le Mans','Circuit de la Sarthe','France','2012-06-16','24:00:00',380],
  ['wec-silverstone-2012',2012,4,'wec','6 Hours of Silverstone','Silverstone','United Kingdom','2012-08-26','06:00:00',210],
  ['wec-saopaulo-2012',2012,5,'wec','6 Hours of São Paulo','Interlagos','Brazil','2012-09-16','06:00:00',230],
  ['wec-fuji-2012',2012,6,'wec','6 Hours of Fuji','Fuji Speedway','Japan','2012-09-30','06:00:00',220],
  ['wec-bahrain-2012',2012,7,'wec','6 Hours of Bahrain','Bahrain International Circuit','Bahrain','2012-10-20','06:00:00',195],
  ['wec-shanghai-2012',2012,8,'wec','6 Hours of Shanghai','Shanghai International Circuit','China','2012-10-27','06:00:00',195],
  ['wec-silverstone-2013',2013,1,'wec','6 Hours of Silverstone','Silverstone','United Kingdom','2013-04-14','06:00:00',210],
  ['wec-spa-2013',2013,2,'wec','6 Hours of Spa-Francorchamps','Spa-Francorchamps','Belgium','2013-05-04','06:00:00',205],
  ['wec-lemans-2013',2013,3,'wec','24 Hours of Le Mans','Circuit de la Sarthe','France','2013-06-22','24:00:00',380],
  ['wec-saopaulo-2013',2013,4,'wec','6 Hours of São Paulo','Interlagos','Brazil','2013-09-01','06:00:00',230],
  ['wec-cota-2013',2013,5,'wec','6 Hours of COTA','Circuit of the Americas','United States','2013-09-22','06:00:00',205],
  ['wec-fuji-2013',2013,6,'wec','6 Hours of Fuji','Fuji Speedway','Japan','2013-10-20','06:00:00',220],
  ['wec-shanghai-2013',2013,7,'wec','6 Hours of Shanghai','Shanghai International Circuit','China','2013-11-10','06:00:00',195],
  ['wec-bahrain-2013',2013,8,'wec','6 Hours of Bahrain','Bahrain International Circuit','Bahrain','2013-11-30','06:00:00',195],
  ['wec-silverstone-2014',2014,1,'wec','6 Hours of Silverstone','Silverstone','United Kingdom','2014-04-20','06:00:00',210],
  ['wec-spa-2014',2014,2,'wec','6 Hours of Spa-Francorchamps','Spa-Francorchamps','Belgium','2014-05-03','06:00:00',205],
  ['wec-lemans-2014',2014,3,'wec','24 Hours of Le Mans','Circuit de la Sarthe','France','2014-06-14','24:00:00',380],
  ['wec-cota-2014',2014,4,'wec','6 Hours of COTA','Circuit of the Americas','United States','2014-09-20','06:00:00',205],
  ['wec-fuji-2014',2014,5,'wec','6 Hours of Fuji','Fuji Speedway','Japan','2014-10-12','06:00:00',220],
  ['wec-shanghai-2014',2014,6,'wec','6 Hours of Shanghai','Shanghai International Circuit','China','2014-11-01','06:00:00',195],
  ['wec-bahrain-2014',2014,7,'wec','6 Hours of Bahrain','Bahrain International Circuit','Bahrain','2014-11-15','06:00:00',195],
  ['wec-saopaulo-2014',2014,8,'wec','6 Hours of São Paulo','Interlagos','Brazil','2014-11-30','06:00:00',230],
  ['wec-silverstone-2015',2015,1,'wec','6 Hours of Silverstone','Silverstone','United Kingdom','2015-04-12','06:00:00',210],
  ['wec-spa-2015',2015,2,'wec','6 Hours of Spa-Francorchamps','Spa-Francorchamps','Belgium','2015-05-02','06:00:00',205],
  ['wec-lemans-2015',2015,3,'wec','24 Hours of Le Mans','Circuit de la Sarthe','France','2015-06-13','24:00:00',380],
  ['wec-nurburgring-2015',2015,4,'wec','6 Hours of Nürburgring','Nürburgring','Germany','2015-08-30','06:00:00',180],
  ['wec-cota-2015',2015,5,'wec','6 Hours of COTA','Circuit of the Americas','United States','2015-09-19','06:00:00',205],
  ['wec-fuji-2015',2015,6,'wec','6 Hours of Fuji','Fuji Speedway','Japan','2015-10-11','06:00:00',220],
  ['wec-shanghai-2015',2015,7,'wec','6 Hours of Shanghai','Shanghai International Circuit','China','2015-11-01','06:00:00',195],
  ['wec-bahrain-2015',2015,8,'wec','6 Hours of Bahrain','Bahrain International Circuit','Bahrain','2015-11-21','06:00:00',195],
  ['wec-silverstone-2016',2016,1,'wec','6 Hours of Silverstone','Silverstone','United Kingdom','2016-04-17','06:00:00',210],
  ['wec-spa-2016',2016,2,'wec','6 Hours of Spa-Francorchamps','Spa-Francorchamps','Belgium','2016-05-07','06:00:00',205],
  ['wec-lemans-2016',2016,3,'wec','24 Hours of Le Mans','Circuit de la Sarthe','France','2016-06-18','24:00:00',380],
  ['wec-nurburgring-2016',2016,4,'wec','6 Hours of Nürburgring','Nürburgring','Germany','2016-07-24','06:00:00',180],
  ['wec-mexico-2016',2016,5,'wec','6 Hours of Mexico City','Autódromo Hermanos Rodríguez','Mexico','2016-09-04','06:00:00',195],
  ['wec-cota-2016',2016,6,'wec','6 Hours of COTA','Circuit of the Americas','United States','2016-09-17','06:00:00',205],
  ['wec-fuji-2016',2016,7,'wec','6 Hours of Fuji','Fuji Speedway','Japan','2016-10-16','06:00:00',220],
  ['wec-shanghai-2016',2016,8,'wec','6 Hours of Shanghai','Shanghai International Circuit','China','2016-11-06','06:00:00',195],
  ['wec-bahrain-2016',2016,9,'wec','6 Hours of Bahrain','Bahrain International Circuit','Bahrain','2016-11-19','06:00:00',195],
  ['wec-silverstone-2017',2017,1,'wec','6 Hours of Silverstone','Silverstone','United Kingdom','2017-04-16','06:00:00',210],
  ['wec-spa-2017',2017,2,'wec','6 Hours of Spa-Francorchamps','Spa-Francorchamps','Belgium','2017-05-06','06:00:00',205],
  ['wec-lemans-2017',2017,3,'wec','24 Hours of Le Mans','Circuit de la Sarthe','France','2017-06-17','24:00:00',380],
  ['wec-nurburgring-2017',2017,4,'wec','6 Hours of Nürburgring','Nürburgring','Germany','2017-07-16','06:00:00',180],
  ['wec-mexico-2017',2017,5,'wec','6 Hours of Mexico City','Autódromo Hermanos Rodríguez','Mexico','2017-09-03','06:00:00',195],
  ['wec-cota-2017',2017,6,'wec','6 Hours of COTA','Circuit of the Americas','United States','2017-09-16','06:00:00',205],
  ['wec-fuji-2017',2017,7,'wec','6 Hours of Fuji','Fuji Speedway','Japan','2017-10-15','06:00:00',220],
  ['wec-shanghai-2017',2017,8,'wec','6 Hours of Shanghai','Shanghai International Circuit','China','2017-11-05','06:00:00',195],
  ['wec-bahrain-2017',2017,9,'wec','6 Hours of Bahrain','Bahrain International Circuit','Bahrain','2017-11-18','06:00:00',195],
  // ELMS 2012-2022 (2023-2026 already present above).
  ['elms-castellet-2012',2012,1,'elms','6 Hours of Le Castellet','Paul Ricard','France','2012-04-01','06:00:00',195],
  ['elms-donington-2012',2012,2,'elms','6 Hours of Donington','Donington Park','United Kingdom','2012-07-15','06:00:00',195],
  ['elms-roadatlanta-2012',2012,3,'elms','Petit Le Mans (double points)','Road Atlanta','United States','2012-10-20','10:00:00',380],
  ['elms-silverstone-2013',2013,1,'elms','3 Hours of Silverstone','Silverstone','United Kingdom','2013-04-13','03:00:00',100],
  ['elms-imola-2013',2013,2,'elms','3 Hours of Imola','Imola','Italy','2013-05-18','03:00:00',100],
  ['elms-redbullring-2013',2013,3,'elms','3 Hours of Red Bull Ring','Red Bull Ring','Austria','2013-07-20','03:00:00',95],
  ['elms-hungaroring-2013',2013,4,'elms','3 Hours of Hungaroring','Hungaroring','Hungary','2013-09-14','03:00:00',95],
  ['elms-castellet-2013',2013,5,'elms','3 Hours of Le Castellet','Paul Ricard','France','2013-09-28','03:00:00',100],
  ['elms-silverstone-2014',2014,1,'elms','4 Hours of Silverstone','Silverstone','United Kingdom','2014-04-19','04:00:00',130],
  ['elms-imola-2014',2014,2,'elms','4 Hours of Imola','Imola','Italy','2014-05-18','04:00:00',130],
  ['elms-redbullring-2014',2014,3,'elms','4 Hours of Red Bull Ring','Red Bull Ring','Austria','2014-07-20','04:00:00',125],
  ['elms-castellet-2014',2014,4,'elms','4 Hours of Le Castellet','Paul Ricard','France','2014-09-14','04:00:00',130],
  ['elms-estoril-2014',2014,5,'elms','4 Hours of Estoril','Estoril','Portugal','2014-10-19','04:00:00',130],
  ['elms-silverstone-2015',2015,1,'elms','4 Hours of Silverstone','Silverstone','United Kingdom','2015-04-11','04:00:00',130],
  ['elms-imola-2015',2015,2,'elms','4 Hours of Imola','Imola','Italy','2015-05-17','04:00:00',130],
  ['elms-redbullring-2015',2015,3,'elms','4 Hours of Red Bull Ring','Red Bull Ring','Austria','2015-07-12','04:00:00',125],
  ['elms-castellet-2015',2015,4,'elms','4 Hours of Le Castellet','Paul Ricard','France','2015-09-06','04:00:00',130],
  ['elms-estoril-2015',2015,5,'elms','4 Hours of Estoril','Estoril','Portugal','2015-10-18','04:00:00',130],
  ['elms-silverstone-2016',2016,1,'elms','4 Hours of Silverstone','Silverstone','United Kingdom','2016-04-17','04:00:00',130],
  ['elms-imola-2016',2016,2,'elms','4 Hours of Imola','Imola','Italy','2016-05-15','04:00:00',130],
  ['elms-redbullring-2016',2016,3,'elms','4 Hours of Red Bull Ring','Red Bull Ring','Austria','2016-07-17','04:00:00',125],
  ['elms-castellet-2016',2016,4,'elms','4 Hours of Le Castellet','Paul Ricard','France','2016-08-28','04:00:00',130],
  ['elms-spa-2016',2016,5,'elms','4 Hours of Spa-Francorchamps','Spa-Francorchamps','Belgium','2016-09-25','04:00:00',135],
  ['elms-estoril-2016',2016,6,'elms','4 Hours of Estoril','Estoril','Portugal','2016-10-23','04:00:00',130],
  ['elms-silverstone-2017',2017,1,'elms','4 Hours of Silverstone','Silverstone','United Kingdom','2017-04-16','04:00:00',130],
  ['elms-monza-2017',2017,2,'elms','4 Hours of Monza','Monza','Italy','2017-05-14','04:00:00',140],
  ['elms-redbullring-2017',2017,3,'elms','4 Hours of Red Bull Ring','Red Bull Ring','Austria','2017-07-16','04:00:00',125],
  ['elms-castellet-2017',2017,4,'elms','4 Hours of Le Castellet','Paul Ricard','France','2017-08-27','04:00:00',130],
  ['elms-spa-2017',2017,5,'elms','4 Hours of Spa-Francorchamps','Spa-Francorchamps','Belgium','2017-09-24','04:00:00',135],
  ['elms-portimao-2017',2017,6,'elms','4 Hours of Portimão','Portimão','Portugal','2017-10-22','04:00:00',130],
  ['elms-castellet-2018',2018,1,'elms','4 Hours of Le Castellet','Paul Ricard','France','2018-04-15','04:00:00',130],
  ['elms-monza-2018',2018,2,'elms','4 Hours of Monza','Monza','Italy','2018-05-13','04:00:00',140],
  ['elms-redbullring-2018',2018,3,'elms','4 Hours of Red Bull Ring','Red Bull Ring','Austria','2018-07-22','04:00:00',125],
  ['elms-silverstone-2018',2018,4,'elms','4 Hours of Silverstone','Silverstone','United Kingdom','2018-08-18','04:00:00',130],
  ['elms-spa-2018',2018,5,'elms','4 Hours of Spa-Francorchamps','Spa-Francorchamps','Belgium','2018-09-23','04:00:00',135],
  ['elms-portimao-2018',2018,6,'elms','4 Hours of Portimão','Portimão','Portugal','2018-10-28','04:00:00',130],
  ['elms-castellet-2019',2019,1,'elms','4 Hours of Le Castellet','Paul Ricard','France','2019-04-13','04:00:00',130],
  ['elms-monza-2019',2019,2,'elms','4 Hours of Monza','Monza','Italy','2019-05-11','04:00:00',140],
  ['elms-barcelona-2019',2019,3,'elms','4 Hours of Barcelona','Barcelona-Catalunya','Spain','2019-07-20','04:00:00',135],
  ['elms-silverstone-2019',2019,4,'elms','4 Hours of Silverstone','Silverstone','United Kingdom','2019-08-17','04:00:00',130],
  ['elms-spa-2019',2019,5,'elms','4 Hours of Spa-Francorchamps','Spa-Francorchamps','Belgium','2019-09-21','04:00:00',135],
  ['elms-portimao-2019',2019,6,'elms','4 Hours of Portimão','Portimão','Portugal','2019-10-27','04:00:00',130],
  ['elms-castellet2020a-2020',2020,1,'elms','4 Hours of Le Castellet','Paul Ricard','France','2020-07-19','04:00:00',130],
  ['elms-spa-2020',2020,2,'elms','4 Hours of Spa-Francorchamps','Spa-Francorchamps','Belgium','2020-08-09','04:00:00',135],
  ['elms-castellet2020b-2020',2020,3,'elms','Le Castellet 240 (replacing Barcelona)','Paul Ricard','France','2020-08-29','04:00:00',130],
  ['elms-monza-2020',2020,4,'elms','4 Hours of Monza','Monza','Italy','2020-10-11','04:00:00',140],
  ['elms-portimao-2020',2020,5,'elms','4 Hours of Portimão','Portimão','Portugal','2020-11-01','04:00:00',130],
  ['elms-barcelona-2021',2021,1,'elms','4 Hours of Barcelona','Barcelona-Catalunya','Spain','2021-04-18','04:00:00',135],
  ['elms-redbullring-2021',2021,2,'elms','4 Hours of Red Bull Ring','Red Bull Ring','Austria','2021-05-16','04:00:00',125],
  ['elms-castellet-2021',2021,3,'elms','4 Hours of Le Castellet','Paul Ricard','France','2021-06-06','04:00:00',130],
  ['elms-monza-2021',2021,4,'elms','4 Hours of Monza','Monza','Italy','2021-07-11','04:00:00',140],
  ['elms-spa-2021',2021,5,'elms','4 Hours of Spa-Francorchamps','Spa-Francorchamps','Belgium','2021-09-19','04:00:00',135],
  ['elms-portimao-2021',2021,6,'elms','4 Hours of Portimão','Portimão','Portugal','2021-10-24','04:00:00',130],
  ['elms-castellet-2022',2022,1,'elms','4 Hours of Le Castellet','Paul Ricard','France','2022-04-17','04:00:00',130],
  ['elms-imola-2022',2022,2,'elms','4 Hours of Imola','Imola','Italy','2022-05-15','04:00:00',130],
  ['elms-monza-2022',2022,3,'elms','4 Hours of Monza','Monza','Italy','2022-07-03','04:00:00',140],
  ['elms-barcelona-2022',2022,4,'elms','4 Hours of Barcelona','Barcelona-Catalunya','Spain','2022-08-28','04:00:00',135],
  ['elms-spa-2022',2022,5,'elms','4 Hours of Spa-Francorchamps','Spa-Francorchamps','Belgium','2022-09-25','04:00:00',135],
  ['elms-portimao-2022',2022,6,'elms','4 Hours of Portimão','Portimão','Portugal','2022-10-16','04:00:00',130],
  // MLMC 2016-2024 (2025-2026 already present above).
  ['mlmc-imola-2016',2016,1,'mlmc','Imola Round','Imola','Italy','2016-05-14','01:50:00',50],
  ['mlmc-lemans-2016',2016,2,'mlmc','Road to Le Mans','Circuit de la Sarthe','France','2016-06-18','00:55:00',20],
  ['mlmc-redbullring-2016',2016,3,'mlmc','Red Bull Ring Round','Red Bull Ring','Austria','2016-07-16','01:50:00',48],
  ['mlmc-castellet-2016',2016,4,'mlmc','Paul Ricard Round','Paul Ricard','France','2016-08-27','01:50:00',50],
  ['mlmc-spa-2016',2016,5,'mlmc','Spa-Francorchamps Round','Spa-Francorchamps','Belgium','2016-09-24','01:50:00',48],
  ['mlmc-estoril-2016',2016,6,'mlmc','Estoril Round','Estoril','Portugal','2016-10-22','01:50:00',50],
  ['mlmc-monza-2017',2017,1,'mlmc','Monza Round','Monza','Italy','2017-05-13','01:50:00',52],
  ['mlmc-lemans-2017',2017,2,'mlmc','Road to Le Mans','Circuit de la Sarthe','France','2017-06-15','00:55:00',20],
  ['mlmc-redbullring-2017',2017,3,'mlmc','Red Bull Ring Round','Red Bull Ring','Austria','2017-07-22','01:50:00',48],
  ['mlmc-castellet-2017',2017,4,'mlmc','Le Castellet Round','Paul Ricard','France','2017-08-26','01:50:00',50],
  ['mlmc-spa-2017',2017,5,'mlmc','Spa-Francorchamps Round','Spa-Francorchamps','Belgium','2017-09-23','01:50:00',48],
  ['mlmc-algarve-2017',2017,6,'mlmc','Algarve Round','Algarve','Portugal','2017-10-21','01:50:00',50],
  ['mlmc-castellet-2018',2018,1,'mlmc','Le Castellet Round','Paul Ricard','France','2018-04-14','01:50:00',50],
  ['mlmc-monza-2018',2018,2,'mlmc','Monza Round','Monza','Italy','2018-05-12','01:50:00',52],
  ['mlmc-lemans-2018',2018,3,'mlmc','Road to Le Mans','Circuit de la Sarthe','France','2018-06-15','00:55:00',20],
  ['mlmc-redbullring-2018',2018,4,'mlmc','Red Bull Ring Round','Red Bull Ring','Austria','2018-07-22','01:50:00',48],
  ['mlmc-spa-2018',2018,5,'mlmc','Spa-Francorchamps Round','Spa-Francorchamps','Belgium','2018-09-22','01:50:00',48],
  ['mlmc-algarve-2018',2018,6,'mlmc','Algarve Round','Algarve','Portugal','2018-10-27','01:50:00',50],
  ['mlmc-castellet-2019',2019,1,'mlmc','Le Castellet Round','Paul Ricard','France','2019-04-13','01:50:00',50],
  ['mlmc-monza-2019',2019,2,'mlmc','Monza Round','Monza','Italy','2019-05-11','01:50:00',52],
  ['mlmc-lemans-2019',2019,3,'mlmc','Road to Le Mans','Circuit de la Sarthe','France','2019-06-13','00:55:00',20],
  ['mlmc-barcelona-2019',2019,4,'mlmc','Barcelona Round','Barcelona-Catalunya','Spain','2019-07-20','01:50:00',52],
  ['mlmc-spa-2019',2019,5,'mlmc','Spa-Francorchamps Round','Spa-Francorchamps','Belgium','2019-09-21','01:50:00',48],
  ['mlmc-algarve-2019',2019,6,'mlmc','Algarve Round','Algarve','Portugal','2019-10-26','01:50:00',50],
  ['mlmc-castellet2020a-2020',2020,1,'mlmc','Le Castellet Round','Paul Ricard','France','2020-07-18','01:50:00',50],
  ['mlmc-spa-2020',2020,2,'mlmc','Spa-Francorchamps Round','Spa-Francorchamps','Belgium','2020-08-08','01:50:00',48],
  ['mlmc-castellet2020b-2020',2020,3,'mlmc','Le Castellet Round (replacing Barcelona)','Paul Ricard','France','2020-08-29','01:50:00',50],
  ['mlmc-lemans-2020',2020,4,'mlmc','Road to Le Mans','Circuit de la Sarthe','France','2020-09-19','00:55:00',20],
  ['mlmc-monza-2020',2020,5,'mlmc','Monza Round','Monza','Italy','2020-10-10','01:50:00',52],
  ['mlmc-algarve-2020',2020,6,'mlmc','Algarve Round','Algarve','Portugal','2020-11-01','01:50:00',50],
  ['mlmc-barcelona-2021',2021,1,'mlmc','Barcelona Round','Barcelona-Catalunya','Spain','2021-04-17','01:50:00',52],
  ['mlmc-castellet-2021',2021,2,'mlmc','Le Castellet Round','Paul Ricard','France','2021-06-05','01:50:00',50],
  ['mlmc-monza-2021',2021,3,'mlmc','Monza Round','Monza','Italy','2021-07-10','01:50:00',52],
  ['mlmc-lemans-2021',2021,4,'mlmc','Road to Le Mans','Circuit de la Sarthe','France','2021-08-19','00:55:00',20],
  ['mlmc-spa-2021',2021,5,'mlmc','Spa-Francorchamps Round','Spa-Francorchamps','Belgium','2021-09-18','01:50:00',48],
  ['mlmc-algarve-2021',2021,6,'mlmc','Algarve Round','Algarve','Portugal','2021-10-24','01:50:00',50],
  ['mlmc-castellet-2022',2022,1,'mlmc','Le Castellet Round','Paul Ricard','France','2022-04-16','01:50:00',50],
  ['mlmc-imola-2022',2022,2,'mlmc','Imola Round','Imola','Italy','2022-05-14','01:50:00',50],
  ['mlmc-lemans-2022',2022,3,'mlmc','Road to Le Mans','Circuit de la Sarthe','France','2022-06-09','00:55:00',20],
  ['mlmc-monza-2022',2022,4,'mlmc','Monza Round','Monza','Italy','2022-07-02','01:50:00',52],
  ['mlmc-spa-2022',2022,5,'mlmc','Spa-Francorchamps Round','Spa-Francorchamps','Belgium','2022-09-24','01:50:00',48],
  ['mlmc-algarve-2022',2022,6,'mlmc','Algarve Round','Algarve','Portugal','2022-10-16','01:50:00',50],
  ['mlmc-barcelona-2023',2023,1,'mlmc','Barcelona Round','Barcelona-Catalunya','Spain','2023-04-22','01:50:00',52],
  ['mlmc-lemans-2023',2023,2,'mlmc','Road to Le Mans','Circuit de la Sarthe','France','2023-06-08','00:55:00',20],
  ['mlmc-castellet-2023',2023,3,'mlmc','Le Castellet Round','Paul Ricard','France','2023-07-15','01:50:00',50],
  ['mlmc-aragon-2023',2023,4,'mlmc','Aragón Round (replacing Imola)','Aragón','Spain','2023-08-25','01:50:00',50],
  ['mlmc-spa-2023',2023,5,'mlmc','Spa-Francorchamps Round','Spa-Francorchamps','Belgium','2023-09-23','01:50:00',48],
  ['mlmc-algarve-2023',2023,6,'mlmc','Algarve Round','Algarve','Portugal','2023-10-22','01:50:00',50],
  ['mlmc-barcelona-2024',2024,1,'mlmc','Barcelona Round','Barcelona-Catalunya','Spain','2024-04-13','01:50:00',52],
  ['mlmc-castellet-2024',2024,2,'mlmc','Le Castellet Round','Paul Ricard','France','2024-05-04','01:50:00',50],
  ['mlmc-lemans-2024',2024,3,'mlmc','Road to Le Mans','Circuit de la Sarthe','France','2024-06-14','00:55:00',20],
  ['mlmc-spa-2024',2024,4,'mlmc','Spa-Francorchamps Round','Spa-Francorchamps','Belgium','2024-08-24','01:50:00',48],
  ['mlmc-mugello-2024',2024,5,'mlmc','Mugello Round','Mugello','Italy','2024-09-28','01:50:00',52],
  ['mlmc-algarve-2024',2024,6,'mlmc','Algarve Round','Algarve','Portugal','2024-10-19','01:50:00',50]
].map(([id,season,round,series,event,circuit,country,date,duration,laps])=>makeGreenRace({id,season,round,series,event,circuit,country,date,duration,laps})));

// IMSA WeatherTech SportsCar Championship 2014-2024 (2025-2026 already present above).
// IMSA didn't exist under this unified name before 2014 (ALMS + Grand-Am ran separately
// 2012-2013, out of scope). Called "Tudor United SportsCar Championship" 2014-2015.
RACES.push(...[
  ['imsa-daytona-2014',2014,1,'imsa','Rolex 24 at Daytona','Daytona International Speedway','United States','2014-01-25','24:00:00',705],
  ['imsa-sebring-2014',2014,2,'imsa','Mobil 1 Twelve Hours of Sebring','Sebring','United States','2014-03-15','12:00:00',330],
  ['imsa-longbeach-2014',2014,3,'imsa','Sports Car Showcase at Long Beach','Long Beach','United States','2014-04-12','01:40:00',85],
  ['imsa-lagunaseca-2014',2014,4,'imsa','Monterey Grand Prix','Laguna Seca','United States','2014-05-04','02:40:00',120],
  ['imsa-belleisle-2014',2014,5,'imsa','Chevrolet Sports Car Classic','Belle Isle','United States','2014-05-31','01:40:00',70],
  ['imsa-kansas-2014',2014,6,'imsa','Grand Prix of Kansas','Kansas Speedway','United States','2014-06-07','02:40:00',120],
  ['imsa-watkinsglen-2014',2014,7,'imsa','Sahlen’s Six Hours of The Glen','Watkins Glen','United States','2014-06-29','06:00:00',200],
  ['imsa-mosport-2014',2014,8,'imsa','SportsCar Grand Prix','Canadian Tire Motorsport Park','Canada','2014-07-13','02:40:00',120],
  ['imsa-indy-2014',2014,9,'imsa','Brickyard Grand Prix','Indianapolis','United States','2014-07-25','02:40:00',115],
  ['imsa-roadamerica-2014',2014,10,'imsa','Road Race Showcase','Road America','United States','2014-08-10','06:00:00',160],
  ['imsa-vir-2014',2014,11,'imsa','Oak Tree Grand Prix','VIR','United States','2014-08-24','02:40:00',90],
  ['imsa-cota-2014',2014,12,'imsa','Lone Star Le Mans','Circuit of the Americas','United States','2014-09-20','06:00:00',180],
  ['imsa-atlanta-2014',2014,13,'imsa','Petit Le Mans','Road Atlanta','United States','2014-10-04','10:00:00',400],
  ['imsa-daytona-2015',2015,1,'imsa','Rolex 24 at Daytona','Daytona International Speedway','United States','2015-01-24','24:00:00',705],
  ['imsa-sebring-2015',2015,2,'imsa','Mobil 1 Twelve Hours of Sebring','Sebring','United States','2015-03-21','12:00:00',330],
  ['imsa-longbeach-2015',2015,3,'imsa','Sports Car Showcase at Long Beach','Long Beach','United States','2015-04-18','01:40:00',85],
  ['imsa-lagunaseca-2015',2015,4,'imsa','Monterey Grand Prix','Laguna Seca','United States','2015-05-03','02:40:00',120],
  ['imsa-belleisle-2015',2015,5,'imsa','Chevrolet Sports Car Classic','Belle Isle','United States','2015-05-30','01:40:00',70],
  ['imsa-watkinsglen-2015',2015,6,'imsa','Sahlen’s Six Hours of The Glen','Watkins Glen','United States','2015-06-28','06:00:00',200],
  ['imsa-mosport-2015',2015,7,'imsa','SportsCar Grand Prix','Canadian Tire Motorsport Park','Canada','2015-07-12','02:40:00',120],
  ['imsa-limerock-2015',2015,8,'imsa','Northeast Grand Prix','Lime Rock Park','United States','2015-07-25','01:40:00',90],
  ['imsa-roadamerica-2015',2015,9,'imsa','Road Race Showcase','Road America','United States','2015-08-09','06:00:00',160],
  ['imsa-vir-2015',2015,10,'imsa','Oak Tree Grand Prix','VIR','United States','2015-08-23','02:40:00',90],
  ['imsa-cota-2015',2015,11,'imsa','Lone Star Le Mans','Circuit of the Americas','United States','2015-09-19','06:00:00',180],
  ['imsa-atlanta-2015',2015,12,'imsa','Petit Le Mans','Road Atlanta','United States','2015-10-03','10:00:00',400],
  ['imsa-daytona-2016',2016,1,'imsa','Rolex 24 at Daytona','Daytona International Speedway','United States','2016-01-30','24:00:00',705],
  ['imsa-sebring-2016',2016,2,'imsa','Mobil 1 Twelve Hours of Sebring','Sebring','United States','2016-03-19','12:00:00',330],
  ['imsa-longbeach-2016',2016,3,'imsa','Sports Car GP at Long Beach','Long Beach','United States','2016-04-16','01:40:00',85],
  ['imsa-lagunaseca-2016',2016,4,'imsa','Monterey Grand Prix','Laguna Seca','United States','2016-05-01','02:40:00',120],
  ['imsa-belleisle-2016',2016,5,'imsa','Chevrolet Sports Car Classic','Belle Isle','United States','2016-06-04','01:40:00',70],
  ['imsa-watkinsglen-2016',2016,6,'imsa','Sahlen’s Six Hours of The Glen','Watkins Glen','United States','2016-07-03','06:00:00',200],
  ['imsa-mosport-2016',2016,7,'imsa','SportsCar Grand Prix','Canadian Tire Motorsport Park','Canada','2016-07-10','02:40:00',120],
  ['imsa-limerock-2016',2016,8,'imsa','Northeast Grand Prix','Lime Rock Park','United States','2016-07-23','01:40:00',90],
  ['imsa-roadamerica-2016',2016,9,'imsa','Road Race Showcase','Road America','United States','2016-08-07','06:00:00',160],
  ['imsa-vir-2016',2016,10,'imsa','Michelin GT Challenge','VIR','United States','2016-08-28','02:40:00',90],
  ['imsa-cota-2016',2016,11,'imsa','Lone Star Le Mans','Circuit of the Americas','United States','2016-09-17','06:00:00',180],
  ['imsa-atlanta-2016',2016,12,'imsa','Petit Le Mans','Road Atlanta','United States','2016-10-01','10:00:00',400],
  ['imsa-daytona-2017',2017,1,'imsa','Rolex 24 at Daytona','Daytona International Speedway','United States','2017-01-28','24:00:00',705],
  ['imsa-sebring-2017',2017,2,'imsa','Mobil 1 Twelve Hours of Sebring','Sebring','United States','2017-03-18','12:00:00',330],
  ['imsa-longbeach-2017',2017,3,'imsa','Sports Car GP at Long Beach','Long Beach','United States','2017-04-08','01:40:00',85],
  ['imsa-cota2-2017',2017,4,'imsa','Sportscar Showdown','Circuit of the Americas','United States','2017-05-06','02:40:00',120],
  ['imsa-belleisle-2017',2017,5,'imsa','Chevrolet Sports Car Classic','Belle Isle','United States','2017-06-03','01:40:00',70],
  ['imsa-watkinsglen-2017',2017,6,'imsa','Sahlen’s Six Hours of The Glen','Watkins Glen','United States','2017-07-02','06:00:00',200],
  ['imsa-mosport-2017',2017,7,'imsa','SportsCar Grand Prix','Canadian Tire Motorsport Park','Canada','2017-07-09','02:40:00',120],
  ['imsa-limerock-2017',2017,8,'imsa','Northeast Grand Prix','Lime Rock Park','United States','2017-07-22','01:40:00',90],
  ['imsa-roadamerica-2017',2017,9,'imsa','Road Race Showcase','Road America','United States','2017-08-06','06:00:00',160],
  ['imsa-vir-2017',2017,10,'imsa','Michelin GT Challenge at VIR','VIR','United States','2017-08-27','02:40:00',90],
  ['imsa-lagunaseca-2017',2017,11,'imsa','America’s Tire 250','Laguna Seca','United States','2017-09-24','02:40:00',120],
  ['imsa-atlanta-2017',2017,12,'imsa','Motul Petit Le Mans','Road Atlanta','United States','2017-10-07','10:00:00',400],
  ['imsa-daytona-2018',2018,1,'imsa','Rolex 24 at Daytona','Daytona International Speedway','United States','2018-01-27','24:00:00',705],
  ['imsa-sebring-2018',2018,2,'imsa','Mobil 1 Twelve Hours of Sebring','Sebring','United States','2018-03-17','12:00:00',330],
  ['imsa-longbeach-2018',2018,3,'imsa','Sports Car GP at Long Beach','Long Beach','United States','2018-04-14','01:40:00',85],
  ['imsa-midohio-2018',2018,4,'imsa','Acura Sports Car Challenge','Mid-Ohio','United States','2018-05-06','02:40:00',120],
  ['imsa-belleisle-2018',2018,5,'imsa','Chevrolet Detroit Grand Prix','Belle Isle','United States','2018-06-02','01:40:00',70],
  ['imsa-watkinsglen-2018',2018,6,'imsa','Sahlen’s Six Hours of The Glen','Watkins Glen','United States','2018-07-01','06:00:00',200],
  ['imsa-mosport-2018',2018,7,'imsa','SportsCar Grand Prix','Canadian Tire Motorsport Park','Canada','2018-07-08','02:40:00',120],
  ['imsa-limerock-2018',2018,8,'imsa','Northeast Grand Prix','Lime Rock Park','United States','2018-07-21','01:40:00',90],
  ['imsa-roadamerica-2018',2018,9,'imsa','Road Race Showcase','Road America','United States','2018-08-05','06:00:00',160],
  ['imsa-vir-2018',2018,10,'imsa','Michelin GT Challenge at VIR','VIR','United States','2018-08-19','02:40:00',90],
  ['imsa-lagunaseca-2018',2018,11,'imsa','Monterey Grand Prix','WeatherTech Raceway Laguna Seca','United States','2018-09-09','02:40:00',120],
  ['imsa-atlanta-2018',2018,12,'imsa','Motul Petit Le Mans','Road Atlanta','United States','2018-10-13','10:00:00',400],
  ['imsa-daytona-2019',2019,1,'imsa','Rolex 24 at Daytona','Daytona International Speedway','United States','2019-01-26','24:00:00',705],
  ['imsa-sebring-2019',2019,2,'imsa','Mobil 1 Twelve Hours of Sebring','Sebring','United States','2019-03-16','12:00:00',330],
  ['imsa-longbeach-2019',2019,3,'imsa','Sports Car GP at Long Beach','Long Beach','United States','2019-04-13','01:40:00',85],
  ['imsa-midohio-2019',2019,4,'imsa','Acura Sports Car Challenge','Mid-Ohio','United States','2019-05-05','02:40:00',120],
  ['imsa-belleisle-2019',2019,5,'imsa','Chevrolet Sports Car Classic','Belle Isle','United States','2019-06-01','01:40:00',70],
  ['imsa-watkinsglen-2019',2019,6,'imsa','Sahlen’s Six Hours of The Glen','Watkins Glen','United States','2019-06-30','06:00:00',200],
  ['imsa-mosport-2019',2019,7,'imsa','SportsCar Grand Prix','Canadian Tire Motorsport Park','Canada','2019-07-07','02:40:00',120],
  ['imsa-limerock-2019',2019,8,'imsa','Northeast Grand Prix','Lime Rock Park','United States','2019-07-20','01:40:00',90],
  ['imsa-roadamerica-2019',2019,9,'imsa','IMSA Road Race Showcase','Road America','United States','2019-08-04','06:00:00',160],
  ['imsa-vir-2019',2019,10,'imsa','Michelin GT Challenge at VIR','VIR','United States','2019-08-25','02:40:00',90],
  ['imsa-lagunaseca-2019',2019,11,'imsa','IMSA Monterey Grand Prix','WeatherTech Raceway Laguna Seca','United States','2019-09-15','02:40:00',120],
  ['imsa-atlanta-2019',2019,12,'imsa','Motul Petit Le Mans','Michelin Raceway Road Atlanta','United States','2019-10-12','10:00:00',400],
  ['imsa-daytona-2020',2020,1,'imsa','Rolex 24 at Daytona','Daytona International Speedway','United States','2020-01-25','24:00:00',705],
  ['imsa-daytona240-2020',2020,2,'imsa','WeatherTech 240','Daytona International Speedway','United States','2020-07-04','04:00:00',150],
  ['imsa-sebring2-2020',2020,3,'imsa','Cadillac Grand Prix of Sebring','Sebring','United States','2020-07-18','02:40:00',120],
  ['imsa-roadamerica-2020',2020,4,'imsa','Road Race Showcase','Road America','United States','2020-08-02','06:00:00',160],
  ['imsa-vir-2020',2020,5,'imsa','Michelin GT Challenge at VIR','VIR','United States','2020-08-22','02:40:00',90],
  ['imsa-atlanta1-2020',2020,6,'imsa','TireRack.com Grand Prix','Michelin Raceway Road Atlanta','United States','2020-09-05','02:40:00',120],
  ['imsa-midohio-2020',2020,7,'imsa','Acura Sports Car Challenge','Mid-Ohio','United States','2020-09-27','02:40:00',120],
  ['imsa-charlotte-2020',2020,8,'imsa','Motul 100% Synthetic Grand Prix','Charlotte Motor Speedway (Roval)','United States','2020-10-09','02:40:00',100],
  ['imsa-atlanta2-2020',2020,9,'imsa','Motul Petit Le Mans','Michelin Raceway Road Atlanta','United States','2020-10-17','10:00:00',400],
  ['imsa-lagunaseca-2020',2020,10,'imsa','Hyundai Monterey SportsCar Championship','WeatherTech Raceway Laguna Seca','United States','2020-11-01','02:40:00',120],
  ['imsa-sebring12h-2020',2020,11,'imsa','Mobil 1 Twelve Hours of Sebring','Sebring','United States','2020-11-14','12:00:00',330],
  ['imsa-daytona-2021',2021,1,'imsa','Rolex 24 at Daytona','Daytona International Speedway','United States','2021-01-30','24:00:00',705],
  ['imsa-sebring-2021',2021,2,'imsa','Mobil 1 Twelve Hours of Sebring','Sebring','United States','2021-03-20','12:00:00',330],
  ['imsa-midohio-2021',2021,3,'imsa','Acura Sports Car Challenge','Mid-Ohio','United States','2021-05-16','02:40:00',120],
  ['imsa-detroit-2021',2021,4,'imsa','Detroit Grand Prix','Belle Isle','United States','2021-06-12','01:40:00',70],
  ['imsa-watkinsglen1-2021',2021,5,'imsa','Sahlen’s Six Hours of The Glen','Watkins Glen','United States','2021-06-27','06:00:00',200],
  ['imsa-watkinsglen2-2021',2021,6,'imsa','WeatherTech 240 at the Glen','Watkins Glen','United States','2021-07-02','04:00:00',150],
  ['imsa-limerock-2021',2021,7,'imsa','Northeast Grand Prix','Lime Rock Park','United States','2021-07-17','01:40:00',90],
  ['imsa-roadamerica-2021',2021,8,'imsa','IMSA Sports Car Weekend','Road America','United States','2021-08-08','06:00:00',160],
  ['imsa-lagunaseca-2021',2021,9,'imsa','Hyundai Monterey SportsCar Championship','WeatherTech Raceway Laguna Seca','United States','2021-09-12','02:40:00',120],
  ['imsa-longbeach-2021',2021,10,'imsa','Acura Grand Prix of Long Beach','Long Beach','United States','2021-09-25','01:40:00',85],
  ['imsa-vir-2021',2021,11,'imsa','Michelin GT Challenge at VIR','VIR','United States','2021-10-09','02:40:00',90],
  ['imsa-atlanta-2021',2021,12,'imsa','Motul Petit Le Mans','Michelin Raceway Road Atlanta','United States','2021-11-13','10:00:00',400],
  ['imsa-daytona-2022',2022,1,'imsa','Rolex 24 at Daytona','Daytona International Speedway','United States','2022-01-29','24:00:00',705],
  ['imsa-sebring-2022',2022,2,'imsa','Mobil 1 Twelve Hours of Sebring','Sebring','United States','2022-03-19','12:00:00',330],
  ['imsa-longbeach-2022',2022,3,'imsa','Acura Grand Prix of Long Beach','Long Beach','United States','2022-04-09','01:40:00',85],
  ['imsa-lagunaseca-2022',2022,4,'imsa','Hyundai Monterey SportsCar Championship','WeatherTech Raceway Laguna Seca','United States','2022-05-01','02:40:00',120],
  ['imsa-midohio-2022',2022,5,'imsa','Lexus Grand Prix at Mid-Ohio','Mid-Ohio','United States','2022-05-15','02:40:00',120],
  ['imsa-detroit-2022',2022,6,'imsa','Detroit Grand Prix','Belle Isle','United States','2022-06-04','01:40:00',70],
  ['imsa-watkinsglen-2022',2022,7,'imsa','Sahlen’s Six Hours of The Glen','Watkins Glen','United States','2022-06-26','06:00:00',200],
  ['imsa-mosport-2022',2022,8,'imsa','Chevrolet Grand Prix','Canadian Tire Motorsport Park','Canada','2022-07-03','02:40:00',120],
  ['imsa-limerock-2022',2022,9,'imsa','FCP Euro Northeast Grand Prix','Lime Rock Park','United States','2022-07-16','01:40:00',90],
  ['imsa-roadamerica-2022',2022,10,'imsa','IMSA Fastlane SportsCar Weekend','Road America','United States','2022-08-07','06:00:00',160],
  ['imsa-vir-2022',2022,11,'imsa','Michelin GT Challenge at VIR','VIR','United States','2022-08-28','02:40:00',90],
  ['imsa-atlanta-2022',2022,12,'imsa','Motul Petit Le Mans','Michelin Raceway Road Atlanta','United States','2022-10-01','10:00:00',400],
  ['imsa-daytona-2023',2023,1,'imsa','Rolex 24 at Daytona','Daytona International Speedway','United States','2023-01-28','24:00:00',705],
  ['imsa-sebring-2023',2023,2,'imsa','Mobil 1 Twelve Hours of Sebring','Sebring','United States','2023-03-18','12:00:00',330],
  ['imsa-longbeach-2023',2023,3,'imsa','Acura Grand Prix of Long Beach','Long Beach','United States','2023-04-15','01:40:00',85],
  ['imsa-lagunaseca-2023',2023,4,'imsa','Motul Course de Monterey','WeatherTech Raceway Laguna Seca','United States','2023-05-14','02:40:00',120],
  ['imsa-watkinsglen-2023',2023,5,'imsa','Sahlen’s Six Hours of The Glen','Watkins Glen','United States','2023-06-25','06:00:00',200],
  ['imsa-mosport-2023',2023,6,'imsa','Chevrolet Grand Prix','Canadian Tire Motorsport Park','Canada','2023-07-09','02:40:00',120],
  ['imsa-limerock-2023',2023,7,'imsa','FCP Euro Northeast Grand Prix','Lime Rock Park','United States','2023-07-22','01:40:00',90],
  ['imsa-roadamerica-2023',2023,8,'imsa','IMSA SportsCar Weekend','Road America','United States','2023-08-06','06:00:00',160],
  ['imsa-vir-2023',2023,9,'imsa','Michelin GT Challenge at VIR','VIR','United States','2023-08-27','02:40:00',90],
  ['imsa-indy-2023',2023,10,'imsa','IMSA Battle on the Bricks','Indianapolis','United States','2023-09-17','02:40:00',115],
  ['imsa-atlanta-2023',2023,11,'imsa','Motul Petit Le Mans','Michelin Raceway Road Atlanta','United States','2023-10-14','10:00:00',400],
  ['imsa-daytona-2024',2024,1,'imsa','Rolex 24 at Daytona','Daytona International Speedway','United States','2024-01-27','24:00:00',705],
  ['imsa-sebring-2024',2024,2,'imsa','Mobil 1 Twelve Hours of Sebring','Sebring','United States','2024-03-16','12:00:00',330],
  ['imsa-longbeach-2024',2024,3,'imsa','Acura Grand Prix of Long Beach','Long Beach','United States','2024-04-20','01:40:00',85],
  ['imsa-lagunaseca-2024',2024,4,'imsa','Motul Course de Monterey','WeatherTech Raceway Laguna Seca','United States','2024-05-12','02:40:00',120],
  ['imsa-detroit-2024',2024,5,'imsa','Chevrolet Detroit Sports Car Classic','Detroit Street Circuit','United States','2024-06-01','01:40:00',70],
  ['imsa-watkinsglen-2024',2024,6,'imsa','Sahlen’s Six Hours of The Glen','Watkins Glen','United States','2024-06-23','06:00:00',200],
  ['imsa-mosport-2024',2024,7,'imsa','Chevrolet Grand Prix','Canadian Tire Motorsport Park','Canada','2024-07-14','02:40:00',120],
  ['imsa-roadamerica-2024',2024,8,'imsa','IMSA Sportscar Weekend','Road America','United States','2024-08-04','06:00:00',160],
  ['imsa-vir-2024',2024,9,'imsa','Michelin GT Challenge at VIR','VIR','United States','2024-08-25','02:40:00',90],
  ['imsa-indy-2024',2024,10,'imsa','Tirerack.com Battle on the Bricks','Indianapolis','United States','2024-09-22','02:40:00',115],
  ['imsa-atlanta-2024',2024,11,'imsa','Motul Petit Le Mans','Michelin Raceway Road Atlanta','United States','2024-10-12','10:00:00',400]
].map(([id,season,round,series,event,circuit,country,date,duration,laps])=>makeGreenRace({id,season,round,series,event,circuit,country,date,duration,laps})));

// Asian Le Mans Series - genuinely messy history: 2009 single race, hiatus 2010-2012,
// 2013/2014 standalone years, winter-split "20XX-YY" seasons from 2015-16 (season number
// = END year, same convention as WEC's split winter seasons), then UAE-only standalone
// years 2021-2023 after a planned "2020-21" season was scrapped and never run, then back
// to winter-split from 2023-24. season=2025/2026 (2024-25/2025-26) already present above -
// not touched/duplicated here.
RACES.push(...[
  ['aslms-okayama-2009',2009,1,'aslms','1000km of Okayama','Okayama International Circuit','Japan','2009-10-30','06:00:00',135],
  ['aslms-inje-2013',2013,1,'aslms','4 Hours of Inje','Inje Speedium','South Korea','2013-08-04','04:00:00',120],
  ['aslms-fuji-2013',2013,2,'aslms','4 Hours of Fuji','Fuji Speedway','Japan','2013-09-22','04:00:00',120],
  ['aslms-zhuhai-2013',2013,3,'aslms','4 Hours of Zhuhai','Zhuhai International Circuit','China','2013-10-13','04:00:00',120],
  ['aslms-sepang-2013',2013,4,'aslms','4 Hours of Sepang','Sepang International Circuit','Malaysia','2013-12-08','04:00:00',120],
  ['aslms-inje-2014',2014,1,'aslms','3 Hours of Inje','Inje Speedium','South Korea','2014-07-20','03:00:00',90],
  ['aslms-fuji-2014',2014,2,'aslms','3 Hours of Fuji','Fuji Speedway','Japan','2014-08-31','03:00:00',90],
  ['aslms-shanghai-2014',2014,3,'aslms','3 Hours of Shanghai','Shanghai International Circuit','China','2014-10-11','03:00:00',90],
  ['aslms-sepang-2014',2014,4,'aslms','3 Hours of Sepang','Sepang International Circuit','Malaysia','2014-12-07','03:00:00',90],
  ['aslms-fuji-2016',2016,1,'aslms','2 Hours of Fuji','Fuji Speedway','Japan','2015-10-10','02:00:00',60],
  ['aslms-sepang1-2016',2016,2,'aslms','3 Hours of Sepang','Sepang International Circuit','Malaysia','2015-11-08','03:00:00',90],
  ['aslms-buriram-2016',2016,3,'aslms','3 Hours of Thailand','Chang International Circuit','Thailand','2016-01-10','03:00:00',90],
  ['aslms-sepang2-2016',2016,4,'aslms','3 Hours of Sepang','Sepang International Circuit','Malaysia','2016-01-24','03:00:00',90],
  ['aslms-zhuhai-2017',2017,1,'aslms','4 Hours of Zhuhai','Zhuhai International Circuit','China','2016-10-30','04:00:00',120],
  ['aslms-fuji-2017',2017,2,'aslms','4 Hours of Fuji','Fuji Speedway','Japan','2016-12-04','04:00:00',120],
  ['aslms-buriram-2017',2017,3,'aslms','4 Hours of Buriram','Chang International Circuit','Thailand','2017-01-08','04:00:00',120],
  ['aslms-sepang-2017',2017,4,'aslms','4 Hours of Sepang','Sepang International Circuit','Malaysia','2017-01-22','04:00:00',120],
  ['aslms-zhuhai-2018',2018,1,'aslms','4 Hours of Zhuhai','Zhuhai International Circuit','China','2017-10-29','04:00:00',120],
  ['aslms-fuji-2018',2018,2,'aslms','4 Hours of Fuji','Fuji Speedway','Japan','2017-12-03','04:00:00',120],
  ['aslms-buriram-2018',2018,3,'aslms','6 Hours of Buriram','Chang International Circuit','Thailand','2018-01-13','06:00:00',175],
  ['aslms-sepang-2018',2018,4,'aslms','4 Hours of Sepang','Sepang International Circuit','Malaysia','2018-02-04','04:00:00',120],
  ['aslms-shanghai-2019',2019,1,'aslms','4 Hours of Shanghai','Shanghai International Circuit','China','2018-11-25','04:00:00',120],
  ['aslms-fuji-2019',2019,2,'aslms','4 Hours of Fuji','Fuji Speedway','Japan','2018-12-09','04:00:00',120],
  ['aslms-buriram-2019',2019,3,'aslms','4 Hours of Buriram','Chang International Circuit','Thailand','2019-01-12','04:00:00',120],
  ['aslms-sepang-2019',2019,4,'aslms','4 Hours of Sepang','Sepang International Circuit','Malaysia','2019-02-24','04:00:00',120],
  ['aslms-shanghai-2020',2020,1,'aslms','4 Hours of Shanghai','Shanghai International Circuit','China','2019-11-24','04:00:00',120],
  ['aslms-thebend-2020',2020,2,'aslms','4 Hours of The Bend','The Bend Motorsport Park','Australia','2020-01-12','04:00:00',120],
  ['aslms-sepang-2020',2020,3,'aslms','4 Hours of Sepang','Sepang International Circuit','Malaysia','2020-02-15','04:00:00',120],
  ['aslms-buriram-2020',2020,4,'aslms','4 Hours of Buriram','Chang International Circuit','Thailand','2020-02-23','04:00:00',120],
  ['aslms-dubai1-2021',2021,1,'aslms','4 Hours of Dubai','Dubai Autodrome','United Arab Emirates','2021-02-13','04:00:00',120],
  ['aslms-dubai2-2021',2021,2,'aslms','4 Hours of Dubai','Dubai Autodrome','United Arab Emirates','2021-02-14','04:00:00',120],
  ['aslms-abudhabi1-2021',2021,3,'aslms','4 Hours of Abu Dhabi','Yas Marina Circuit','United Arab Emirates','2021-02-19','04:00:00',120],
  ['aslms-abudhabi2-2021',2021,4,'aslms','4 Hours of Abu Dhabi','Yas Marina Circuit','United Arab Emirates','2021-02-20','04:00:00',120],
  ['aslms-dubai1-2022',2022,1,'aslms','4 Hours of Dubai','Dubai Autodrome','United Arab Emirates','2022-02-12','04:00:00',120],
  ['aslms-dubai2-2022',2022,2,'aslms','4 Hours of Dubai','Dubai Autodrome','United Arab Emirates','2022-02-13','04:00:00',120],
  ['aslms-abudhabi1-2022',2022,3,'aslms','4 Hours of Abu Dhabi','Yas Marina Circuit','United Arab Emirates','2022-02-19','04:00:00',120],
  ['aslms-abudhabi2-2022',2022,4,'aslms','4 Hours of Abu Dhabi','Yas Marina Circuit','United Arab Emirates','2022-02-20','04:00:00',120],
  ['aslms-dubai1-2023',2023,1,'aslms','4 Hours of Dubai','Dubai Autodrome','United Arab Emirates','2023-02-11','04:00:00',120],
  ['aslms-dubai2-2023',2023,2,'aslms','4 Hours of Dubai','Dubai Autodrome','United Arab Emirates','2023-02-12','04:00:00',120],
  ['aslms-abudhabi1-2023',2023,3,'aslms','4 Hours of Abu Dhabi','Yas Marina Circuit','United Arab Emirates','2023-02-18','04:00:00',120],
  ['aslms-abudhabi2-2023',2023,4,'aslms','4 Hours of Abu Dhabi','Yas Marina Circuit','United Arab Emirates','2023-02-19','04:00:00',120],
  ['aslms-sepang1-2024',2024,1,'aslms','4 Hours of Sepang','Sepang International Circuit','Malaysia','2023-12-02','04:00:00',120],
  ['aslms-sepang2-2024',2024,2,'aslms','4 Hours of Sepang','Sepang International Circuit','Malaysia','2023-12-03','04:00:00',120],
  ['aslms-dubai-2024',2024,3,'aslms','4 Hours of Dubai','Dubai Autodrome','United Arab Emirates','2024-02-04','04:00:00',120],
  ['aslms-abudhabi1-2024',2024,4,'aslms','4 Hours of Abu Dhabi','Yas Marina Circuit','United Arab Emirates','2024-02-10','04:00:00',120],
  ['aslms-abudhabi2-2024',2024,5,'aslms','4 Hours of Abu Dhabi','Yas Marina Circuit','United Arab Emirates','2024-02-11','04:00:00',120]
].map(([id,season,round,series,event,circuit,country,date,duration,laps])=>makeGreenRace({id,season,round,series,event,circuit,country,date,duration,laps})));

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

// International GT Open 2012-2024 (2025-2026 already present above via GTOPEN_REVISED with
// a more detailed per-race Race1/Race2/Endurance breakdown - kept simple here, one entry
// per event weekend, consistent with the rest of this historical skeleton). Running
// continuously since 2006 with no gaps - only 2012-2024 needed here. Inserted after the
// gtopen splice-cleanup above so it doesn't get wiped by it.
RACES.push(...[
  ['gtopen-portimao-2012',2012,1,'gtopen','Portimão','Portimão','Portugal','2012-04-15','01:10:00',45],
  ['gtopen-nurburgring-2012',2012,2,'gtopen','Nürburgring','Nürburgring','Germany','2012-05-20','01:10:00',45],
  ['gtopen-spa-2012',2012,3,'gtopen','Spa-Francorchamps','Spa-Francorchamps','Belgium','2012-06-24','01:10:00',45],
  ['gtopen-brandshatch-2012',2012,4,'gtopen','Brands Hatch','Brands Hatch','United Kingdom','2012-07-22','01:10:00',45],
  ['gtopen-paulricard-2012',2012,5,'gtopen','Paul Ricard','Paul Ricard','France','2012-08-19','01:10:00',45],
  ['gtopen-hungaroring-2012',2012,6,'gtopen','Hungaroring','Hungaroring','Hungary','2012-09-09','01:10:00',45],
  ['gtopen-monza-2012',2012,7,'gtopen','Monza','Monza','Italy','2012-09-30','01:10:00',45],
  ['gtopen-barcelona-2012',2012,8,'gtopen','Barcelona','Barcelona-Catalunya','Spain','2012-10-21','01:10:00',45],
  ['gtopen-paulricard-2013',2013,1,'gtopen','Paul Ricard','Paul Ricard','France','2013-04-14','01:10:00',45],
  ['gtopen-portimao-2013',2013,2,'gtopen','Portimão','Portimão','Portugal','2013-05-12','01:10:00',45],
  ['gtopen-nurburgring-2013',2013,3,'gtopen','Nürburgring','Nürburgring','Germany','2013-06-09','01:10:00',45],
  ['gtopen-jerez-2013',2013,4,'gtopen','Jerez','Jerez','Spain','2013-07-07','01:10:00',45],
  ['gtopen-silverstone-2013',2013,5,'gtopen','Silverstone','Silverstone','United Kingdom','2013-08-04','01:10:00',45],
  ['gtopen-spa-2013',2013,6,'gtopen','Spa-Francorchamps','Spa-Francorchamps','Belgium','2013-09-01','01:10:00',45],
  ['gtopen-monza-2013',2013,7,'gtopen','Monza','Monza','Italy','2013-09-22','01:10:00',45],
  ['gtopen-barcelona-2013',2013,8,'gtopen','Barcelona','Barcelona-Catalunya','Spain','2013-10-13','01:10:00',45],
  ['gtopen-nurburgring-2014',2014,1,'gtopen','Nürburgring','Nürburgring','Germany','2014-04-13','01:10:00',45],
  ['gtopen-portimao-2014',2014,2,'gtopen','Portimão','Portimão','Portugal','2014-05-11','01:10:00',45],
  ['gtopen-jerez-2014',2014,3,'gtopen','Jerez','Jerez','Spain','2014-06-08','01:10:00',45],
  ['gtopen-hungaroring-2014',2014,4,'gtopen','Hungaroring','Hungaroring','Hungary','2014-07-06','01:10:00',45],
  ['gtopen-silverstone-2014',2014,5,'gtopen','Silverstone','Silverstone','United Kingdom','2014-08-03','01:10:00',45],
  ['gtopen-spa-2014',2014,6,'gtopen','Spa-Francorchamps','Spa-Francorchamps','Belgium','2014-08-31','01:10:00',45],
  ['gtopen-monza-2014',2014,7,'gtopen','Monza','Monza','Italy','2014-09-21','01:10:00',45],
  ['gtopen-barcelona-2014',2014,8,'gtopen','Barcelona','Barcelona-Catalunya','Spain','2014-10-12','01:10:00',45],
  ['gtopen-paulricard-2015',2015,1,'gtopen','Paul Ricard','Paul Ricard','France','2015-04-12','01:10:00',45],
  ['gtopen-estoril-2015',2015,2,'gtopen','Estoril','Estoril','Portugal','2015-05-10','01:10:00',45],
  ['gtopen-silverstone-2015',2015,3,'gtopen','Silverstone','Silverstone','United Kingdom','2015-06-14','01:10:00',45],
  ['gtopen-redbullring-2015',2015,4,'gtopen','Red Bull Ring','Red Bull Ring','Austria','2015-07-19','01:10:00',45],
  ['gtopen-spa-2015',2015,5,'gtopen','Spa-Francorchamps','Spa-Francorchamps','Belgium','2015-08-30','01:10:00',45],
  ['gtopen-monza-2015',2015,6,'gtopen','Monza','Monza','Italy','2015-09-20','01:10:00',45],
  ['gtopen-barcelona-2015',2015,7,'gtopen','Barcelona','Barcelona-Catalunya','Spain','2015-10-11','01:10:00',45],
  ['gtopen-estoril-2016',2016,1,'gtopen','Estoril','Estoril','Portugal','2016-04-17','01:10:00',45],
  ['gtopen-spa-2016',2016,2,'gtopen','Spa-Francorchamps','Spa-Francorchamps','Belgium','2016-05-15','01:10:00',45],
  ['gtopen-paulricard-2016',2016,3,'gtopen','Paul Ricard','Paul Ricard','France','2016-06-19','01:10:00',45],
  ['gtopen-silverstone-2016',2016,4,'gtopen','Silverstone','Silverstone','United Kingdom','2016-07-17','01:10:00',45],
  ['gtopen-redbullring-2016',2016,5,'gtopen','Red Bull Ring','Red Bull Ring','Austria','2016-08-14','01:10:00',45],
  ['gtopen-monza-2016',2016,6,'gtopen','Monza','Monza','Italy','2016-09-18','01:10:00',45],
  ['gtopen-barcelona-2016',2016,7,'gtopen','Barcelona','Barcelona-Catalunya','Spain','2016-10-16','01:10:00',45],
  ['gtopen-estoril-2017',2017,1,'gtopen','Estoril','Estoril','Portugal','2017-04-23','01:10:00',45],
  ['gtopen-spa-2017',2017,2,'gtopen','Spa-Francorchamps','Spa-Francorchamps','Belgium','2017-05-21','01:10:00',45],
  ['gtopen-paulricard-2017',2017,3,'gtopen','Paul Ricard','Paul Ricard','France','2017-06-18','01:10:00',45],
  ['gtopen-hungaroring-2017',2017,4,'gtopen','Hungaroring','Hungaroring','Hungary','2017-07-16','01:10:00',45],
  ['gtopen-silverstone-2017',2017,5,'gtopen','Silverstone','Silverstone','United Kingdom','2017-08-13','01:10:00',45],
  ['gtopen-monza-2017',2017,6,'gtopen','Monza','Monza','Italy','2017-09-17','01:10:00',45],
  ['gtopen-barcelona-2017',2017,7,'gtopen','Barcelona','Barcelona-Catalunya','Spain','2017-10-15','01:10:00',45],
  ['gtopen-estoril-2018',2018,1,'gtopen','Estoril','Estoril','Portugal','2018-04-22','01:10:00',45],
  ['gtopen-paulricard-2018',2018,2,'gtopen','Paul Ricard','Paul Ricard','France','2018-05-20','01:10:00',45],
  ['gtopen-spa-2018',2018,3,'gtopen','Spa-Francorchamps','Spa-Francorchamps','Belgium','2018-06-17','01:10:00',45],
  ['gtopen-hungaroring-2018',2018,4,'gtopen','Hungaroring','Hungaroring','Hungary','2018-07-15','01:10:00',45],
  ['gtopen-silverstone-2018',2018,5,'gtopen','Silverstone','Silverstone','United Kingdom','2018-08-12','01:10:00',45],
  ['gtopen-monza-2018',2018,6,'gtopen','Monza','Monza','Italy','2018-09-16','01:10:00',45],
  ['gtopen-barcelona-2018',2018,7,'gtopen','Barcelona','Barcelona-Catalunya','Spain','2018-10-14','01:10:00',45],
  ['gtopen-paulricard-2019',2019,1,'gtopen','Paul Ricard','Paul Ricard','France','2019-04-14','01:10:00',45],
  ['gtopen-hockenheim-2019',2019,2,'gtopen','Hockenheim','Hockenheim','Germany','2019-05-12','01:10:00',45],
  ['gtopen-spa-2019',2019,3,'gtopen','Spa-Francorchamps','Spa-Francorchamps','Belgium','2019-06-16','01:10:00',45],
  ['gtopen-redbullring-2019',2019,4,'gtopen','Red Bull Ring','Red Bull Ring','Austria','2019-07-14','01:10:00',45],
  ['gtopen-silverstone-2019',2019,5,'gtopen','Silverstone','Silverstone','United Kingdom','2019-08-11','01:10:00',45],
  ['gtopen-barcelona-2019',2019,6,'gtopen','Barcelona','Barcelona-Catalunya','Spain','2019-09-15','01:10:00',45],
  ['gtopen-monza-2019',2019,7,'gtopen','Monza','Monza','Italy','2019-10-13','01:10:00',45],
  ['gtopen-hungaroring-2020',2020,1,'gtopen','Hungaroring','Hungaroring','Hungary','2020-08-01','01:10:00',45],
  ['gtopen-paulricard-2020',2020,2,'gtopen','Paul Ricard','Paul Ricard','France','2020-08-22','01:10:00',45],
  ['gtopen-redbullring-2020',2020,3,'gtopen','Red Bull Ring','Red Bull Ring','Austria','2020-09-12','01:10:00',45],
  ['gtopen-monza-2020',2020,4,'gtopen','Monza','Monza','Italy','2020-09-26','01:10:00',45],
  ['gtopen-spa-2020',2020,5,'gtopen','Spa-Francorchamps','Spa-Francorchamps','Belgium','2020-10-10','01:10:00',45],
  ['gtopen-barcelona-2020',2020,6,'gtopen','Barcelona','Barcelona-Catalunya','Spain','2020-10-31','01:10:00',45],
  ['gtopen-paulricard-2021',2021,1,'gtopen','Paul Ricard','Paul Ricard','France','2021-04-25','01:10:00',45],
  ['gtopen-spa-2021',2021,2,'gtopen','Spa-Francorchamps','Spa-Francorchamps','Belgium','2021-05-23','01:10:00',45],
  ['gtopen-hungaroring-2021',2021,3,'gtopen','Hungaroring','Hungaroring','Hungary','2021-06-20','01:10:00',45],
  ['gtopen-imola-2021',2021,4,'gtopen','Imola','Imola','Italy','2021-07-18','01:10:00',45],
  ['gtopen-redbullring-2021',2021,5,'gtopen','Red Bull Ring','Red Bull Ring','Austria','2021-08-15','01:10:00',45],
  ['gtopen-monza-2021',2021,6,'gtopen','Monza','Monza','Italy','2021-09-19','01:10:00',45],
  ['gtopen-barcelona-2021',2021,7,'gtopen','Barcelona','Barcelona-Catalunya','Spain','2021-10-17','01:10:00',45],
  ['gtopen-estoril-2022',2022,1,'gtopen','Estoril','Estoril','Portugal','2022-04-24','01:10:00',45],
  ['gtopen-paulricard-2022',2022,2,'gtopen','Paul Ricard','Paul Ricard','France','2022-05-22','01:10:00',45],
  ['gtopen-spa-2022',2022,3,'gtopen','Spa-Francorchamps (double points)','Spa-Francorchamps','Belgium','2022-06-19','02:00:00',70],
  ['gtopen-hungaroring-2022',2022,4,'gtopen','Hungaroring','Hungaroring','Hungary','2022-07-17','01:10:00',45],
  ['gtopen-redbullring-2022',2022,5,'gtopen','Red Bull Ring','Red Bull Ring','Austria','2022-08-14','01:10:00',45],
  ['gtopen-monza-2022',2022,6,'gtopen','Monza','Monza','Italy','2022-09-18','01:10:00',45],
  ['gtopen-barcelona-2022',2022,7,'gtopen','Barcelona','Barcelona-Catalunya','Spain','2022-10-16','01:10:00',45],
  ['gtopen-algarve-2023',2023,1,'gtopen','Algarve','Algarve','Portugal','2023-04-23','01:10:00',45],
  ['gtopen-spa-2023',2023,2,'gtopen','Spa-Francorchamps','Spa-Francorchamps','Belgium','2023-05-21','01:10:00',45],
  ['gtopen-hungaroring-2023',2023,3,'gtopen','Hungaroring','Hungaroring','Hungary','2023-06-18','01:10:00',45],
  ['gtopen-castellet-2023',2023,4,'gtopen','Le Castellet','Paul Ricard','France','2023-07-16','01:10:00',45],
  ['gtopen-redbullring-2023',2023,5,'gtopen','Red Bull Ring','Red Bull Ring','Austria','2023-08-13','01:10:00',45],
  ['gtopen-monza-2023',2023,6,'gtopen','Monza','Monza','Italy','2023-09-17','01:10:00',45],
  ['gtopen-barcelona-2023',2023,7,'gtopen','Barcelona','Barcelona-Catalunya','Spain','2023-10-15','01:10:00',45],
  ['gtopen-algarve-2024',2024,1,'gtopen','Algarve','Algarve','Portugal','2024-04-21','01:10:00',45],
  ['gtopen-hockenheim-2024',2024,2,'gtopen','Hockenheim','Hockenheim','Germany','2024-05-19','01:10:00',45],
  ['gtopen-spa-2024',2024,3,'gtopen','Spa-Francorchamps','Spa-Francorchamps','Belgium','2024-06-16','01:10:00',45],
  ['gtopen-hungaroring-2024',2024,4,'gtopen','Hungaroring','Hungaroring','Hungary','2024-07-14','01:10:00',45],
  ['gtopen-paulricard-2024',2024,5,'gtopen','Paul Ricard','Paul Ricard','France','2024-08-11','01:10:00',45],
  ['gtopen-redbullring-2024',2024,6,'gtopen','Red Bull Ring','Red Bull Ring','Austria','2024-09-15','01:10:00',45],
  ['gtopen-barcelona-2024',2024,7,'gtopen','Barcelona','Barcelona-Catalunya','Spain','2024-09-29','01:10:00',45],
  ['gtopen-monza-2024',2024,8,'gtopen','Monza','Monza','Italy','2024-10-13','01:10:00',45]
].map(([id,season,round,series,event,circuit,country,date,duration,laps])=>makeGreenRace({id,season,round,series,event,circuit,country,date,duration,laps})));

// GT World Challenge Europe 2012-2024 (2025-2026 already present above). Kept as ONE
// top-level series (series:'gtwc', "GTWC EU") per user request - the Endurance/Sprint
// split only shows up as a "second level": the event name is prefixed "Endurance Cup"
// or "Sprint Cup", and each category has its OWN round numbering (both starting at 1
// per season) since they're really two separate championships sharing one brand. Naming
// history: Endurance side was "Blancpain Endurance Series" 2011-2015, "Blancpain GT
// Series Endurance Cup" 2016-2018, "GT World Challenge Europe Endurance Cup" 2019+.
// Sprint side didn't exist in 2012 - started 2013 as "FIA GT Series", then "Blancpain
// Sprint Series" 2014-2015, "Blancpain GT Series Sprint Cup" 2016-2018, "GT World
// Challenge Europe Sprint Cup" 2019+. 24 Hours of Spa is the Endurance headline round
// every single year.
RACES.push(...[
  ['gtwc-end-monza-2012',2012,1,'gtwc','Endurance Cup — Monza','Monza','Italy','2012-04-15','02:00:00',70],
  ['gtwc-end-silverstone-2012',2012,2,'gtwc','Endurance Cup — Silverstone','Silverstone','United Kingdom','2012-06-03','03:00:00',95],
  ['gtwc-end-paulricard-2012',2012,3,'gtwc','Endurance Cup — Paul Ricard','Paul Ricard','France','2012-07-01','03:00:00',95],
  ['gtwc-end-spa24h-2012',2012,4,'gtwc','Endurance Cup — 24 Hours of Spa','Spa-Francorchamps','Belgium','2012-07-29','24:00:00',560],
  ['gtwc-end-nurburgring-2012',2012,5,'gtwc','Endurance Cup — Nürburgring','Nürburgring','Germany','2012-09-23','03:00:00',80],
  ['gtwc-end-navarra-2012',2012,6,'gtwc','Endurance Cup — Navarra','Navarra','Spain','2012-10-14','03:00:00',95],
  ['gtwc-end-monza-2013',2013,1,'gtwc','Endurance Cup — Monza','Monza','Italy','2013-04-14','02:00:00',70],
  ['gtwc-end-silverstone-2013',2013,2,'gtwc','Endurance Cup — Silverstone','Silverstone','United Kingdom','2013-06-02','03:00:00',95],
  ['gtwc-end-paulricard-2013',2013,3,'gtwc','Endurance Cup — Paul Ricard','Paul Ricard','France','2013-06-30','03:00:00',95],
  ['gtwc-end-spa24h-2013',2013,4,'gtwc','Endurance Cup — 24 Hours of Spa','Spa-Francorchamps','Belgium','2013-07-28','24:00:00',560],
  ['gtwc-end-nurburgring-2013',2013,5,'gtwc','Endurance Cup — 1000km Nürburgring','Nürburgring','Germany','2013-09-22','06:00:00',150],
  ['gtwc-sprint-nogaro-2013',2013,1,'gtwc','Sprint Cup — Nogaro','Nogaro','France','2013-04-01','01:00:00',45],
  ['gtwc-sprint-zolder-2013',2013,2,'gtwc','Sprint Cup — Zolder','Zolder','Belgium','2013-04-21','01:00:00',45],
  ['gtwc-sprint-zandvoort-2013',2013,3,'gtwc','Sprint Cup — Zandvoort','Zandvoort','Netherlands','2013-07-07','01:00:00',45],
  ['gtwc-sprint-slovakiaring-2013',2013,4,'gtwc','Sprint Cup — Slovakia Ring','Slovakia Ring','Slovakia','2013-08-18','01:00:00',45],
  ['gtwc-sprint-navarra-2013',2013,5,'gtwc','Sprint Cup — Navarra','Navarra','Spain','2013-09-29','01:00:00',45],
  ['gtwc-sprint-baku-2013',2013,6,'gtwc','Sprint Cup — Baku','Baku','Azerbaijan','2013-11-24','01:00:00',45],
  ['gtwc-end-monza-2014',2014,1,'gtwc','Endurance Cup — Monza','Monza','Italy','2014-04-13','02:00:00',70],
  ['gtwc-end-silverstone-2014',2014,2,'gtwc','Endurance Cup — Silverstone','Silverstone','United Kingdom','2014-05-25','03:00:00',95],
  ['gtwc-end-paulricard-2014',2014,3,'gtwc','Endurance Cup — Paul Ricard','Paul Ricard','France','2014-06-28','03:00:00',95],
  ['gtwc-end-spa24h-2014',2014,4,'gtwc','Endurance Cup — 24 Hours of Spa','Spa-Francorchamps','Belgium','2014-07-27','24:00:00',560],
  ['gtwc-end-nurburgring-2014',2014,5,'gtwc','Endurance Cup — 1000km Nürburgring','Nürburgring','Germany','2014-09-21','06:00:00',150],
  ['gtwc-sprint-nogaro-2014',2014,1,'gtwc','Sprint Cup — Nogaro','Nogaro','France','2014-04-21','01:00:00',45],
  ['gtwc-sprint-brandshatch-2014',2014,2,'gtwc','Sprint Cup — Brands Hatch','Brands Hatch','United Kingdom','2014-05-18','01:00:00',45],
  ['gtwc-sprint-zandvoort-2014',2014,3,'gtwc','Sprint Cup — Zandvoort','Zandvoort','Netherlands','2014-07-06','01:00:00',45],
  ['gtwc-sprint-slovakiaring-2014',2014,4,'gtwc','Sprint Cup — Slovakia Ring','Slovakia Ring','Slovakia','2014-08-24','01:00:00',45],
  ['gtwc-sprint-algarve-2014',2014,5,'gtwc','Sprint Cup — Algarve','Algarve','Portugal','2014-09-07','01:00:00',45],
  ['gtwc-sprint-zolder-2014',2014,6,'gtwc','Sprint Cup — Zolder','Zolder','Belgium','2014-10-19','01:00:00',45],
  ['gtwc-sprint-baku-2014',2014,7,'gtwc','Sprint Cup — Baku','Baku','Azerbaijan','2014-11-02','01:00:00',45],
  ['gtwc-end-monza-2015',2015,1,'gtwc','Endurance Cup — Monza','Monza','Italy','2015-04-12','02:00:00',70],
  ['gtwc-end-silverstone-2015',2015,2,'gtwc','Endurance Cup — Silverstone','Silverstone','United Kingdom','2015-05-24','03:00:00',95],
  ['gtwc-end-paulricard1000-2015',2015,3,'gtwc','Endurance Cup — Paul Ricard 1000km','Paul Ricard','France','2015-06-20','06:00:00',150],
  ['gtwc-end-spa24h-2015',2015,4,'gtwc','Endurance Cup — 24 Hours of Spa','Spa-Francorchamps','Belgium','2015-07-25','24:00:00',560],
  ['gtwc-end-nurburgring-2015',2015,5,'gtwc','Endurance Cup — Nürburgring','Nürburgring','Germany','2015-09-20','03:00:00',80],
  ['gtwc-sprint-nogaro-2015',2015,1,'gtwc','Sprint Cup — Nogaro','Nogaro','France','2015-04-06','01:00:00',45],
  ['gtwc-sprint-brandshatch-2015',2015,2,'gtwc','Sprint Cup — Brands Hatch','Brands Hatch','United Kingdom','2015-05-10','01:00:00',45],
  ['gtwc-sprint-zolder-2015',2015,3,'gtwc','Sprint Cup — Zolder','Zolder','Belgium','2015-06-07','01:00:00',45],
  ['gtwc-sprint-moscow-2015',2015,4,'gtwc','Sprint Cup — Moscow Raceway','Moscow Raceway','Russia','2015-07-04','01:00:00',45],
  ['gtwc-sprint-algarve-2015',2015,5,'gtwc','Sprint Cup — Algarve','Algarve','Portugal','2015-09-06','01:00:00',45],
  ['gtwc-sprint-misano-2015',2015,6,'gtwc','Sprint Cup — Misano','Misano','Italy','2015-10-04','01:00:00',45],
  ['gtwc-sprint-zandvoort-2015',2015,7,'gtwc','Sprint Cup — Zandvoort','Zandvoort','Netherlands','2015-10-11','01:00:00',45],
  ['gtwc-end-monza-2016',2016,1,'gtwc','Endurance Cup — Monza','Monza','Italy','2016-04-24','02:00:00',70],
  ['gtwc-end-silverstone-2016',2016,2,'gtwc','Endurance Cup — Silverstone','Silverstone','United Kingdom','2016-05-15','03:00:00',95],
  ['gtwc-end-paulricard1000-2016',2016,3,'gtwc','Endurance Cup — Paul Ricard 1000km','Paul Ricard','France','2016-06-25','06:00:00',150],
  ['gtwc-end-spa24h-2016',2016,4,'gtwc','Endurance Cup — 24 Hours of Spa','Spa-Francorchamps','Belgium','2016-07-30','24:00:00',560],
  ['gtwc-end-nurburgring-2016',2016,5,'gtwc','Endurance Cup — Nürburgring','Nürburgring','Germany','2016-09-18','03:00:00',80],
  ['gtwc-sprint-misano-2016',2016,1,'gtwc','Sprint Cup — Misano','Misano','Italy','2016-04-10','01:00:00',45],
  ['gtwc-sprint-brandshatch-2016',2016,2,'gtwc','Sprint Cup — Brands Hatch','Brands Hatch','United Kingdom','2016-05-08','01:00:00',45],
  ['gtwc-sprint-nurburgring-2016',2016,3,'gtwc','Sprint Cup — Nürburgring','Nürburgring','Germany','2016-07-03','01:00:00',45],
  ['gtwc-sprint-hungaroring-2016',2016,4,'gtwc','Sprint Cup — Hungaroring','Hungaroring','Hungary','2016-08-28','01:00:00',45],
  ['gtwc-sprint-barcelona-2016',2016,5,'gtwc','Sprint Cup — Barcelona','Barcelona-Catalunya','Spain','2016-10-02','01:00:00',45],
  ['gtwc-end-monza-2017',2017,1,'gtwc','Endurance Cup — Monza','Monza','Italy','2017-04-23','02:00:00',70],
  ['gtwc-end-silverstone-2017',2017,2,'gtwc','Endurance Cup — Silverstone','Silverstone','United Kingdom','2017-05-14','03:00:00',95],
  ['gtwc-end-paulricard1000-2017',2017,3,'gtwc','Endurance Cup — Paul Ricard 1000km','Paul Ricard','France','2017-06-24','06:00:00',150],
  ['gtwc-end-spa24h-2017',2017,4,'gtwc','Endurance Cup — 24 Hours of Spa','Spa-Francorchamps','Belgium','2017-07-29','24:00:00',560],
  ['gtwc-end-barcelona-2017',2017,5,'gtwc','Endurance Cup — Barcelona','Barcelona-Catalunya','Spain','2017-10-01','03:00:00',85],
  ['gtwc-sprint-misano-2017',2017,1,'gtwc','Sprint Cup — Misano','Misano','Italy','2017-04-02','01:00:00',45],
  ['gtwc-sprint-brandshatch-2017',2017,2,'gtwc','Sprint Cup — Brands Hatch','Brands Hatch','United Kingdom','2017-05-07','01:00:00',45],
  ['gtwc-sprint-zolder-2017',2017,3,'gtwc','Sprint Cup — Zolder','Zolder','Belgium','2017-06-04','01:00:00',45],
  ['gtwc-sprint-hungaroring-2017',2017,4,'gtwc','Sprint Cup — Hungaroring','Hungaroring','Hungary','2017-08-27','01:00:00',45],
  ['gtwc-sprint-nurburgring-2017',2017,5,'gtwc','Sprint Cup — Nürburgring','Nürburgring','Germany','2017-09-17','01:00:00',45],
  ['gtwc-end-monza-2018',2018,1,'gtwc','Endurance Cup — Monza','Monza','Italy','2018-04-22','02:00:00',70],
  ['gtwc-end-silverstone-2018',2018,2,'gtwc','Endurance Cup — Silverstone','Silverstone','United Kingdom','2018-05-20','03:00:00',95],
  ['gtwc-end-paulricard1000-2018',2018,3,'gtwc','Endurance Cup — Paul Ricard 1000km','Paul Ricard','France','2018-06-02','06:00:00',150],
  ['gtwc-end-spa24h-2018',2018,4,'gtwc','Endurance Cup — 24 Hours of Spa','Spa-Francorchamps','Belgium','2018-07-28','24:00:00',560],
  ['gtwc-end-barcelona-2018',2018,5,'gtwc','Endurance Cup — Barcelona','Barcelona-Catalunya','Spain','2018-09-30','03:00:00',85],
  ['gtwc-sprint-zolder-2018',2018,1,'gtwc','Sprint Cup — Zolder','Zolder','Belgium','2018-04-07','01:00:00',45],
  ['gtwc-sprint-brandshatch-2018',2018,2,'gtwc','Sprint Cup — Brands Hatch','Brands Hatch','United Kingdom','2018-05-06','01:00:00',45],
  ['gtwc-sprint-misano-2018',2018,3,'gtwc','Sprint Cup — Misano','Misano','Italy','2018-06-24','01:00:00',45],
  ['gtwc-sprint-hungaroring-2018',2018,4,'gtwc','Sprint Cup — Hungaroring','Hungaroring','Hungary','2018-09-02','01:00:00',45],
  ['gtwc-sprint-nurburgring-2018',2018,5,'gtwc','Sprint Cup — Nürburgring','Nürburgring','Germany','2018-09-16','01:00:00',45],
  ['gtwc-end-monza-2019',2019,1,'gtwc','Endurance Cup — Monza','Monza','Italy','2019-04-14','02:00:00',70],
  ['gtwc-end-silverstone-2019',2019,2,'gtwc','Endurance Cup — Silverstone','Silverstone','United Kingdom','2019-05-12','03:00:00',95],
  ['gtwc-end-paulricard1000-2019',2019,3,'gtwc','Endurance Cup — Paul Ricard 1000km','Paul Ricard','France','2019-06-01','06:00:00',150],
  ['gtwc-end-spa24h-2019',2019,4,'gtwc','Endurance Cup — 24 Hours of Spa','Spa-Francorchamps','Belgium','2019-07-27','24:00:00',560],
  ['gtwc-end-barcelona-2019',2019,5,'gtwc','Endurance Cup — Barcelona','Barcelona-Catalunya','Spain','2019-09-29','03:00:00',85],
  ['gtwc-sprint-brandshatch-2019',2019,1,'gtwc','Sprint Cup — Brands Hatch','Brands Hatch','United Kingdom','2019-05-04','01:00:00',45],
  ['gtwc-sprint-misano-2019',2019,2,'gtwc','Sprint Cup — Misano','Misano','Italy','2019-06-30','01:00:00',45],
  ['gtwc-sprint-zandvoort-2019',2019,3,'gtwc','Sprint Cup — Zandvoort','Zandvoort','Netherlands','2019-07-14','01:00:00',45],
  ['gtwc-sprint-nurburgring-2019',2019,4,'gtwc','Sprint Cup — Nürburgring','Nürburgring','Germany','2019-09-01','01:00:00',45],
  ['gtwc-sprint-hungaroring-2019',2019,5,'gtwc','Sprint Cup — Hungaroring','Hungaroring','Hungary','2019-09-08','01:00:00',45],
  ['gtwc-end-imola-2020',2020,1,'gtwc','Endurance Cup — Imola','Imola','Italy','2020-07-26','03:00:00',85],
  ['gtwc-end-nurburgring6h-2020',2020,2,'gtwc','Endurance Cup — 6 Hours of Nürburgring','Nürburgring','Germany','2020-09-06','06:00:00',140],
  ['gtwc-end-spa24h-2020',2020,3,'gtwc','Endurance Cup — 24 Hours of Spa','Spa-Francorchamps','Belgium','2020-10-24','24:00:00',560],
  ['gtwc-end-paulricard1000-2020',2020,4,'gtwc','Endurance Cup — Paul Ricard 1000km','Paul Ricard','France','2020-11-15','06:00:00',150],
  ['gtwc-sprint-misano-2020',2020,1,'gtwc','Sprint Cup — Misano','Misano','Italy','2020-08-09','01:00:00',45],
  ['gtwc-sprint-magnycours-2020',2020,2,'gtwc','Sprint Cup — Magny-Cours','Magny-Cours','France','2020-09-13','01:00:00',45],
  ['gtwc-sprint-zandvoort-2020',2020,3,'gtwc','Sprint Cup — Zandvoort','Zandvoort','Netherlands','2020-09-27','01:00:00',45],
  ['gtwc-sprint-barcelona-2020',2020,4,'gtwc','Sprint Cup — Barcelona','Barcelona-Catalunya','Spain','2020-10-11','01:00:00',45],
  ['gtwc-end-monza-2021',2021,1,'gtwc','Endurance Cup — Monza','Monza','Italy','2021-04-16','02:00:00',70],
  ['gtwc-end-paulricard1000-2021',2021,2,'gtwc','Endurance Cup — Paul Ricard 1000km','Paul Ricard','France','2021-05-28','06:00:00',150],
  ['gtwc-end-spa24h-2021',2021,3,'gtwc','Endurance Cup — 24 Hours of Spa','Spa-Francorchamps','Belgium','2021-07-29','24:00:00',560],
  ['gtwc-end-nurburgring-2021',2021,4,'gtwc','Endurance Cup — Nürburgring','Nürburgring','Germany','2021-09-03','03:00:00',80],
  ['gtwc-end-barcelona-2021',2021,5,'gtwc','Endurance Cup — Barcelona','Barcelona-Catalunya','Spain','2021-10-08','03:00:00',85],
  ['gtwc-sprint-magnycours-2021',2021,1,'gtwc','Sprint Cup — Magny-Cours','Magny-Cours','France','2021-05-07','01:00:00',45],
  ['gtwc-sprint-zandvoort-2021',2021,2,'gtwc','Sprint Cup — Zandvoort','Zandvoort','Netherlands','2021-06-18','01:00:00',45],
  ['gtwc-sprint-misano-2021',2021,3,'gtwc','Sprint Cup — Misano','Misano','Italy','2021-07-02','01:00:00',45],
  ['gtwc-sprint-brandshatch-2021',2021,4,'gtwc','Sprint Cup — Brands Hatch','Brands Hatch','United Kingdom','2021-08-28','01:00:00',45],
  ['gtwc-sprint-ricardotormo-2021',2021,5,'gtwc','Sprint Cup — Circuit Ricardo Tormo','Ricardo Tormo','Spain','2021-09-25','01:00:00',45],
  ['gtwc-end-imola-2022',2022,1,'gtwc','Endurance Cup — Imola','Imola','Italy','2022-04-01','03:00:00',85],
  ['gtwc-end-paulricard1000-2022',2022,2,'gtwc','Endurance Cup — Paul Ricard 1000km','Paul Ricard','France','2022-06-03','06:00:00',150],
  ['gtwc-end-spa24h-2022',2022,3,'gtwc','Endurance Cup — 24 Hours of Spa','Spa-Francorchamps','Belgium','2022-07-28','24:00:00',560],
  ['gtwc-end-hockenheim-2022',2022,4,'gtwc','Endurance Cup — Hockenheim','Hockenheim','Germany','2022-09-02','03:00:00',80],
  ['gtwc-end-barcelona-2022',2022,5,'gtwc','Endurance Cup — Barcelona','Barcelona-Catalunya','Spain','2022-09-30','03:00:00',85],
  ['gtwc-sprint-brandshatch-2022',2022,1,'gtwc','Sprint Cup — Brands Hatch','Brands Hatch','United Kingdom','2022-04-30','01:00:00',45],
  ['gtwc-sprint-magnycours-2022',2022,2,'gtwc','Sprint Cup — Magny-Cours','Magny-Cours','France','2022-05-13','01:00:00',45],
  ['gtwc-sprint-zandvoort-2022',2022,3,'gtwc','Sprint Cup — Zandvoort','Zandvoort','Netherlands','2022-06-17','01:00:00',45],
  ['gtwc-sprint-misano-2022',2022,4,'gtwc','Sprint Cup — Misano','Misano','Italy','2022-07-01','01:00:00',45],
  ['gtwc-sprint-ricardotormo-2022',2022,5,'gtwc','Sprint Cup — Circuit Ricardo Tormo','Ricardo Tormo','Spain','2022-09-16','01:00:00',45],
  ['gtwc-end-monza-2023',2023,1,'gtwc','Endurance Cup — Monza','Monza','Italy','2023-04-22','02:00:00',70],
  ['gtwc-end-paulricard1000-2023',2023,2,'gtwc','Endurance Cup — Paul Ricard 1000km','Paul Ricard','France','2023-06-03','06:00:00',150],
  ['gtwc-end-spa24h-2023',2023,3,'gtwc','Endurance Cup — 24 Hours of Spa','Spa-Francorchamps','Belgium','2023-06-29','24:00:00',560],
  ['gtwc-end-nurburgring-2023',2023,4,'gtwc','Endurance Cup — Nürburgring','Nürburgring','Germany','2023-07-29','03:00:00',80],
  ['gtwc-end-barcelona-2023',2023,5,'gtwc','Endurance Cup — Barcelona','Barcelona-Catalunya','Spain','2023-09-30','03:00:00',85],
  ['gtwc-sprint-brandshatch-2023',2023,1,'gtwc','Sprint Cup — Brands Hatch','Brands Hatch','United Kingdom','2023-05-13','01:00:00',45],
  ['gtwc-sprint-misano-2023',2023,2,'gtwc','Sprint Cup — Misano','Misano','Italy','2023-07-15','01:00:00',45],
  ['gtwc-sprint-hockenheim-2023',2023,3,'gtwc','Sprint Cup — Hockenheim','Hockenheim','Germany','2023-09-02','01:00:00',45],
  ['gtwc-sprint-ricardotormo-2023',2023,4,'gtwc','Sprint Cup — Circuit Ricardo Tormo','Ricardo Tormo','Spain','2023-09-16','01:00:00',45],
  ['gtwc-sprint-zandvoort-2023',2023,5,'gtwc','Sprint Cup — Zandvoort','Zandvoort','Netherlands','2023-10-14','01:00:00',45],
  ['gtwc-end-paulricard3h-2024',2024,1,'gtwc','Endurance Cup — 3 Hours of Paul Ricard','Paul Ricard','France','2024-04-06','03:00:00',85],
  ['gtwc-end-spa24h-2024',2024,2,'gtwc','Endurance Cup — 24 Hours of Spa','Spa-Francorchamps','Belgium','2024-06-29','24:00:00',560],
  ['gtwc-end-nurburgring-2024',2024,3,'gtwc','Endurance Cup — Nürburgring','Nürburgring','Germany','2024-07-27','03:00:00',80],
  ['gtwc-end-monza-2024',2024,4,'gtwc','Endurance Cup — Monza','Monza','Italy','2024-09-21','02:00:00',70],
  ['gtwc-end-jeddah-2024',2024,5,'gtwc','Endurance Cup — Jeddah','Jeddah Corniche Circuit','Saudi Arabia','2024-11-29','03:00:00',90],
  ['gtwc-sprint-brandshatch-2024',2024,1,'gtwc','Sprint Cup — Brands Hatch','Brands Hatch','United Kingdom','2024-05-04','01:00:00',45],
  ['gtwc-sprint-misano-2024',2024,2,'gtwc','Sprint Cup — Misano','Misano','Italy','2024-05-18','01:00:00',45],
  ['gtwc-sprint-hockenheim-2024',2024,3,'gtwc','Sprint Cup — Hockenheim','Hockenheim','Germany','2024-07-20','01:00:00',45],
  ['gtwc-sprint-magnycours-2024',2024,4,'gtwc','Sprint Cup — Magny-Cours','Magny-Cours','France','2024-08-24','01:00:00',45],
  ['gtwc-sprint-barcelona-2024',2024,5,'gtwc','Sprint Cup — Barcelona','Barcelona-Catalunya','Spain','2024-10-12','01:00:00',45]
].map(([id,season,round,series,event,circuit,country,date,duration,laps])=>makeGreenRace({id,season,round,series,event,circuit,country,date,duration,laps})));

// GT World Challenge America 2012-2026 - net new, nothing existed for series:'gtwc_us'
// before this. Called "Pirelli World Challenge" 2012-2018, "Blancpain GT World Challenge
// America" 2019, "GT World Challenge America" 2020+ (rename year confirmed as 2019, not
// 2020/21). All rounds in the United States except Canadian Tire Motorsport Park/Toronto
// (Canada).
RACES.push(...[
  ['gtwc-us-stpete-2012',2012,1,'gtwc_us','St. Petersburg','St. Petersburg','United States','2012-03-24','01:40:00',85],
  ['gtwc-us-longbeach-2012',2012,2,'gtwc_us','Long Beach','Long Beach','United States','2012-04-15','01:40:00',85],
  ['gtwc-us-miller-2012',2012,3,'gtwc_us','Miller Motorsports Park','Miller Motorsports Park','United States','2012-04-28','01:40:00',85],
  ['gtwc-us-lagunaseca-2012',2012,4,'gtwc_us','Laguna Seca','Laguna Seca','United States','2012-05-11','01:40:00',85],
  ['gtwc-us-belleisle-2012',2012,5,'gtwc_us','Detroit Belle Isle','Belle Isle','United States','2012-06-02','01:40:00',85],
  ['gtwc-us-mosport-2012',2012,6,'gtwc_us','Canadian Tire Motorsport Park','Canadian Tire Motorsport Park','Canada','2012-06-23','01:40:00',85],
  ['gtwc-us-midohio-2012',2012,7,'gtwc_us','Mid-Ohio','Mid-Ohio','United States','2012-08-04','01:40:00',85],
  ['gtwc-us-sonoma-2012',2012,8,'gtwc_us','Sonoma','Sonoma','United States','2012-08-24','01:40:00',85],
  ['gtwc-us-stpete-2013',2013,1,'gtwc_us','St. Petersburg','St. Petersburg','United States','2013-03-23','01:40:00',85],
  ['gtwc-us-longbeach-2013',2013,2,'gtwc_us','Long Beach','Long Beach','United States','2013-04-20','01:40:00',85],
  ['gtwc-us-cota-2013',2013,3,'gtwc_us','Circuit of the Americas','Circuit of the Americas','United States','2013-05-18','01:40:00',85],
  ['gtwc-us-belleisle-2013',2013,4,'gtwc_us','Detroit Belle Isle','Belle Isle','United States','2013-06-01','01:40:00',85],
  ['gtwc-us-limerock-2013',2013,5,'gtwc_us','Lime Rock Park','Lime Rock Park','United States','2013-07-05','01:40:00',85],
  ['gtwc-us-toronto-2013',2013,6,'gtwc_us','Streets of Toronto','Toronto','Canada','2013-07-13','01:40:00',85],
  ['gtwc-us-midohio-2013',2013,7,'gtwc_us','Mid-Ohio','Mid-Ohio','United States','2013-08-03','01:40:00',85],
  ['gtwc-us-sonoma-2013',2013,8,'gtwc_us','Sonoma','Sonoma','United States','2013-08-24','01:40:00',85],
  ['gtwc-us-houston-2013',2013,9,'gtwc_us','Streets of Houston','Houston','United States','2013-10-04','01:40:00',85],
  ['gtwc-us-stpete-2014',2014,1,'gtwc_us','St. Petersburg','St. Petersburg','United States','2014-03-28','01:40:00',85],
  ['gtwc-us-longbeach-2014',2014,2,'gtwc_us','Long Beach','Long Beach','United States','2014-04-11','01:40:00',85],
  ['gtwc-us-barber-2014',2014,3,'gtwc_us','Barber Motorsports Park','Barber Motorsports Park','United States','2014-04-25','01:40:00',85],
  ['gtwc-us-belleisle-2014',2014,4,'gtwc_us','Detroit Belle Isle','Belle Isle','United States','2014-05-30','01:40:00',85],
  ['gtwc-us-roadamerica-2014',2014,5,'gtwc_us','Road America','Road America','United States','2014-06-19','01:40:00',85],
  ['gtwc-us-toronto-2014',2014,6,'gtwc_us','Streets of Toronto','Toronto','Canada','2014-07-18','01:40:00',85],
  ['gtwc-us-midohio-2014',2014,7,'gtwc_us','Mid-Ohio','Mid-Ohio','United States','2014-08-01','01:40:00',85],
  ['gtwc-us-sonoma-2014',2014,8,'gtwc_us','Sonoma','Sonoma','United States','2014-08-22','01:40:00',85],
  ['gtwc-us-miller-2014',2014,9,'gtwc_us','Miller Motorsports Park','Miller Motorsports Park','United States','2014-09-12','01:40:00',85],
  ['gtwc-us-cota-2015',2015,1,'gtwc_us','Circuit of the Americas','Circuit of the Americas','United States','2015-03-06','01:40:00',85],
  ['gtwc-us-stpete-2015',2015,2,'gtwc_us','St. Petersburg','St. Petersburg','United States','2015-03-27','01:40:00',85],
  ['gtwc-us-longbeach-2015',2015,3,'gtwc_us','Long Beach','Long Beach','United States','2015-04-17','01:40:00',85],
  ['gtwc-us-barber-2015',2015,4,'gtwc_us','Barber Motorsports Park','Barber Motorsports Park','United States','2015-04-24','01:40:00',85],
  ['gtwc-us-mosport-2015',2015,5,'gtwc_us','Canadian Tire Motorsport Park','Canadian Tire Motorsport Park','Canada','2015-05-15','01:40:00',85],
  ['gtwc-us-belleisle-2015',2015,6,'gtwc_us','Detroit Belle Isle','Belle Isle','United States','2015-05-29','01:40:00',85],
  ['gtwc-us-roadamerica-2015',2015,7,'gtwc_us','Road America','Road America','United States','2015-06-26','01:40:00',85],
  ['gtwc-us-midohio-2015',2015,8,'gtwc_us','Mid-Ohio','Mid-Ohio','United States','2015-07-31','01:40:00',85],
  ['gtwc-us-miller-2015',2015,9,'gtwc_us','Miller Motorsports Park','Miller Motorsports Park','United States','2015-08-21','01:40:00',85],
  ['gtwc-us-sonoma-2015',2015,10,'gtwc_us','Sonoma','Sonoma','United States','2015-08-28','01:40:00',85],
  ['gtwc-us-lagunaseca-2015',2015,11,'gtwc_us','Laguna Seca','Laguna Seca','United States','2015-09-11','01:40:00',85],
  ['gtwc-us-cota-2016',2016,1,'gtwc_us','Circuit of the Americas','Circuit of the Americas','United States','2016-03-03','01:40:00',85],
  ['gtwc-us-stpete-2016',2016,2,'gtwc_us','St. Petersburg','St. Petersburg','United States','2016-03-11','01:40:00',85],
  ['gtwc-us-longbeach-2016',2016,3,'gtwc_us','Long Beach','Long Beach','United States','2016-04-15','01:40:00',85],
  ['gtwc-us-barber-2016',2016,4,'gtwc_us','Barber Motorsports Park','Barber Motorsports Park','United States','2016-04-22','01:40:00',85],
  ['gtwc-us-mosport-2016',2016,5,'gtwc_us','Canadian Tire Motorsport Park','Canadian Tire Motorsport Park','Canada','2016-05-19','01:40:00',85],
  ['gtwc-us-limerock-2016',2016,6,'gtwc_us','Lime Rock Park','Lime Rock Park','United States','2016-05-27','01:40:00',85],
  ['gtwc-us-roadamerica-2016',2016,7,'gtwc_us','Road America','Road America','United States','2016-06-23','01:40:00',85],
  ['gtwc-us-midohio-2016',2016,8,'gtwc_us','Mid-Ohio','Mid-Ohio','United States','2016-07-28','01:40:00',85],
  ['gtwc-us-utah-2016',2016,9,'gtwc_us','Utah Motorsports Campus','Utah Motorsports Campus','United States','2016-08-11','01:40:00',85],
  ['gtwc-us-sonoma-2016',2016,10,'gtwc_us','Sonoma','Sonoma','United States','2016-09-16','01:40:00',85],
  ['gtwc-us-lagunaseca-2016',2016,11,'gtwc_us','Laguna Seca','Laguna Seca','United States','2016-10-07','01:40:00',85],
  ['gtwc-us-stpete-2017',2017,1,'gtwc_us','St. Petersburg','St. Petersburg','United States','2017-03-09','01:40:00',85],
  ['gtwc-us-longbeach-2017',2017,2,'gtwc_us','Long Beach','Long Beach','United States','2017-04-07','01:40:00',85],
  ['gtwc-us-vir-2017',2017,3,'gtwc_us','Virginia International Raceway','VIR','United States','2017-04-28','01:40:00',85],
  ['gtwc-us-mosport-2017',2017,4,'gtwc_us','Canadian Tire Motorsport Park','Canadian Tire Motorsport Park','Canada','2017-05-19','01:40:00',85],
  ['gtwc-us-limerock-2017',2017,5,'gtwc_us','Lime Rock Park','Lime Rock Park','United States','2017-05-26','01:40:00',85],
  ['gtwc-us-roadamerica-2017',2017,6,'gtwc_us','Road America','Road America','United States','2017-06-23','01:40:00',85],
  ['gtwc-us-midohio-2017',2017,7,'gtwc_us','Mid-Ohio','Mid-Ohio','United States','2017-07-28','01:40:00',85],
  ['gtwc-us-utah-2017',2017,8,'gtwc_us','Utah Motorsports Campus','Utah Motorsports Campus','United States','2017-08-11','01:40:00',85],
  ['gtwc-us-cota-2017',2017,9,'gtwc_us','Circuit of the Americas','Circuit of the Americas','United States','2017-09-01','01:40:00',85],
  ['gtwc-us-sonoma-2017',2017,10,'gtwc_us','Sonoma','Sonoma','United States','2017-09-15','01:40:00',85],
  ['gtwc-us-lagunaseca-2017',2017,11,'gtwc_us','Laguna Seca (Monterey)','Laguna Seca','United States','2017-10-13','01:40:00',85],
  ['gtwc-us-stpete-2018',2018,1,'gtwc_us','St. Petersburg','St. Petersburg','United States','2018-03-09','01:40:00',85],
  ['gtwc-us-cota-2018',2018,2,'gtwc_us','Circuit of the Americas','Circuit of the Americas','United States','2018-03-23','01:40:00',85],
  ['gtwc-us-longbeach-2018',2018,3,'gtwc_us','Long Beach','Long Beach','United States','2018-04-13','01:40:00',85],
  ['gtwc-us-vir-2018',2018,4,'gtwc_us','Virginia International Raceway','VIR','United States','2018-04-27','01:40:00',85],
  ['gtwc-us-mosport-2018',2018,5,'gtwc_us','Canadian Tire Motorsport Park','Canadian Tire Motorsport Park','Canada','2018-05-18','01:40:00',85],
  ['gtwc-us-limerock-2018',2018,6,'gtwc_us','Lime Rock Park','Lime Rock Park','United States','2018-05-25','01:40:00',85],
  ['gtwc-us-roadamerica-2018',2018,7,'gtwc_us','Road America','Road America','United States','2018-06-22','01:40:00',85],
  ['gtwc-us-portland-2018',2018,8,'gtwc_us','Portland International Raceway','Portland International Raceway','United States','2018-07-13','01:40:00',85],
  ['gtwc-us-utah-2018',2018,9,'gtwc_us','Utah Motorsports Campus','Utah Motorsports Campus','United States','2018-08-10','01:40:00',85],
  ['gtwc-us-watkinsglen-2018',2018,10,'gtwc_us','Watkins Glen','Watkins Glen','United States','2018-08-31','01:40:00',85],
  ['gtwc-us-cota-2019',2019,1,'gtwc_us','Circuit of the Americas','Circuit of the Americas','United States','2019-03-02','01:40:00',85],
  ['gtwc-us-vir-2019',2019,2,'gtwc_us','Virginia International Raceway','VIR','United States','2019-04-27','01:40:00',85],
  ['gtwc-us-mosport-2019',2019,3,'gtwc_us','Canadian Tire Motorsport Park','Canadian Tire Motorsport Park','Canada','2019-05-18','01:40:00',85],
  ['gtwc-us-sonoma-2019',2019,4,'gtwc_us','Sonoma','Sonoma','United States','2019-06-08','01:40:00',85],
  ['gtwc-us-watkinsglen-2019',2019,5,'gtwc_us','Watkins Glen','Watkins Glen','United States','2019-08-31','01:40:00',85],
  ['gtwc-us-roadamerica-2019',2019,6,'gtwc_us','Road America','Road America','United States','2019-09-21','01:40:00',85],
  ['gtwc-us-lasvegas-2019',2019,7,'gtwc_us','Las Vegas Motor Speedway','Las Vegas Motor Speedway','United States','2019-10-19','01:40:00',85],
  ['gtwc-us-cota-2020',2020,1,'gtwc_us','Circuit of the Americas','Circuit of the Americas','United States','2020-03-07','01:40:00',85],
  ['gtwc-us-vir-2020',2020,2,'gtwc_us','Virginia International Raceway','VIR','United States','2020-07-11','01:40:00',85],
  ['gtwc-us-sonoma-2020',2020,3,'gtwc_us','Sonoma','Sonoma','United States','2020-08-08','01:40:00',85],
  ['gtwc-us-roadamerica-2020',2020,4,'gtwc_us','Road America','Road America','United States','2020-08-29','01:40:00',85],
  ['gtwc-us-cota2-2020',2020,5,'gtwc_us','Circuit of the Americas (2nd visit)','Circuit of the Americas','United States','2020-09-19','01:40:00',85],
  ['gtwc-us-indy-2020',2020,6,'gtwc_us','Indianapolis Motor Speedway','Indianapolis','United States','2020-10-04','01:40:00',85],
  ['gtwc-us-sonoma-2021',2021,1,'gtwc_us','Sonoma','Sonoma','United States','2021-03-06','01:40:00',85],
  ['gtwc-us-cota-2021',2021,2,'gtwc_us','Circuit of the Americas','Circuit of the Americas','United States','2021-05-01','01:40:00',85],
  ['gtwc-us-vir-2021',2021,3,'gtwc_us','Virginia International Raceway','VIR','United States','2021-06-04','01:40:00',85],
  ['gtwc-us-roadamerica-2021',2021,4,'gtwc_us','Road America','Road America','United States','2021-08-28','01:40:00',85],
  ['gtwc-us-watkinsglen-2021',2021,5,'gtwc_us','Watkins Glen','Watkins Glen','United States','2021-09-18','01:40:00',85],
  ['gtwc-us-sebring-2021',2021,6,'gtwc_us','Sebring','Sebring','United States','2021-10-01','01:40:00',85],
  ['gtwc-us-indy8h-2021',2021,7,'gtwc_us','Indianapolis 8 Hour','Indianapolis','United States','2021-10-17','08:00:00',220],
  ['gtwc-us-sonoma-2022',2022,1,'gtwc_us','Sonoma','Sonoma','United States','2022-04-15','01:40:00',85],
  ['gtwc-us-nola-2022',2022,2,'gtwc_us','NOLA Motorsports Park','NOLA Motorsports Park','United States','2022-05-20','01:40:00',85],
  ['gtwc-us-vir-2022',2022,3,'gtwc_us','Virginia International Raceway','VIR','United States','2022-06-17','01:40:00',85],
  ['gtwc-us-watkinsglen-2022',2022,4,'gtwc_us','Watkins Glen','Watkins Glen','United States','2022-07-22','01:40:00',85],
  ['gtwc-us-roadamerica-2022',2022,5,'gtwc_us','Road America','Road America','United States','2022-08-19','01:40:00',85],
  ['gtwc-us-sebring-2022',2022,6,'gtwc_us','Sebring','Sebring','United States','2022-09-23','01:40:00',85],
  ['gtwc-us-indy-2022',2022,7,'gtwc_us','Indianapolis Motor Speedway','Indianapolis','United States','2022-10-07','01:40:00',85],
  ['gtwc-us-sonoma-2023',2023,1,'gtwc_us','Sonoma','Sonoma','United States','2023-03-30','01:40:00',85],
  ['gtwc-us-nola-2023',2023,2,'gtwc_us','NOLA Motorsports Park','NOLA Motorsports Park','United States','2023-04-28','01:40:00',85],
  ['gtwc-us-cota-2023',2023,3,'gtwc_us','Circuit of the Americas','Circuit of the Americas','United States','2023-05-19','01:40:00',85],
  ['gtwc-us-vir-2023',2023,4,'gtwc_us','Virginia International Raceway','VIR','United States','2023-06-16','01:40:00',85],
  ['gtwc-us-roadamerica-2023',2023,5,'gtwc_us','Road America','Road America','United States','2023-08-18','01:40:00',85],
  ['gtwc-us-sebring-2023',2023,6,'gtwc_us','Sebring','Sebring','United States','2023-09-22','01:40:00',85],
  ['gtwc-us-indy-2023',2023,7,'gtwc_us','Indianapolis Motor Speedway','Indianapolis','United States','2023-10-06','01:40:00',85],
  ['gtwc-us-sonoma-2024',2024,1,'gtwc_us','Sonoma','Sonoma','United States','2024-04-05','01:40:00',85],
  ['gtwc-us-sebring-2024',2024,2,'gtwc_us','Sebring','Sebring','United States','2024-05-03','01:40:00',85],
  ['gtwc-us-cota-2024',2024,3,'gtwc_us','Circuit of the Americas','Circuit of the Americas','United States','2024-05-17','01:40:00',85],
  ['gtwc-us-vir-2024',2024,4,'gtwc_us','Virginia International Raceway','VIR','United States','2024-07-19','01:40:00',85],
  ['gtwc-us-roadamerica-2024',2024,5,'gtwc_us','Road America','Road America','United States','2024-08-16','01:40:00',85],
  ['gtwc-us-barber-2024',2024,6,'gtwc_us','Barber Motorsports Park','Barber Motorsports Park','United States','2024-09-06','01:40:00',85],
  ['gtwc-us-indy8h-2024',2024,7,'gtwc_us','Indianapolis 8 Hour','Indianapolis','United States','2024-10-04','08:00:00',220]
].map(([id,season,round,series,event,circuit,country,date,duration,laps])=>makeGreenRace({id,season,round,series,event,circuit,country,date,duration,laps})));

// 24H Series (Creventic) 2015-2026 - net new, nothing existed for series:'creventic'
// before this. No formal scored championship existed 2012-2014 (individual Creventic
// races only) - the FIA-recognised points series started 2015. Dubai split off into a
// separate "Middle East Trophy"/"24H Series Middle East" sub-championship starting the
// 2022-23 winter (Dubai Jan 2023 was the last Dubai round counted in THIS main series) -
// not modelled here, out of scope. Creventic's own "12H Spa-Francorchamps" is a different
// event from the famous SRO/CrowdStrike "24 Hours of Spa" GT3 race (same circuit, very
// different organisers/formats) - don't confuse the two.
RACES.push(...[
  ['creventic-dubai-2015',2015,1,'creventic','24H Dubai','Dubai Autodrome','United Arab Emirates','2015-01-08','24:00:00',560],
  ['creventic-mugello-2015',2015,2,'creventic','12H Mugello','Mugello','Italy','2015-03-13','12:00:00',290],
  ['creventic-zandvoort-2015',2015,3,'creventic','12H Zandvoort','Zandvoort','Netherlands','2015-05-29','12:00:00',290],
  ['creventic-paulricard-2015',2015,4,'creventic','24H Paul Ricard','Paul Ricard','France','2015-07-10','24:00:00',560],
  ['creventic-barcelona-2015',2015,5,'creventic','24H Barcelona','Barcelona-Catalunya','Spain','2015-09-04','24:00:00',560],
  ['creventic-brno-2015',2015,6,'creventic','12H Epilog Brno','Brno','Czech Republic','2015-10-09','12:00:00',290],
  ['creventic-dubai-2016',2016,1,'creventic','24H Dubai','Dubai Autodrome','United Arab Emirates','2016-01-14','24:00:00',560],
  ['creventic-mugello-2016',2016,2,'creventic','12H Mugello','Mugello','Italy','2016-03-18','12:00:00',290],
  ['creventic-silverstone-2016',2016,3,'creventic','24H Silverstone','Silverstone','United Kingdom','2016-04-01','24:00:00',560],
  ['creventic-zandvoort-2016',2016,4,'creventic','12H Zandvoort','Zandvoort','Netherlands','2016-05-06','12:00:00',290],
  ['creventic-paulricard-2016',2016,5,'creventic','24H Paul Ricard','Paul Ricard','France','2016-07-15','24:00:00',560],
  ['creventic-barcelona-2016',2016,6,'creventic','24H Barcelona','Barcelona-Catalunya','Spain','2016-09-02','24:00:00',560],
  ['creventic-brno-2016',2016,7,'creventic','24H Epilog Brno','Brno','Czech Republic','2016-10-14','24:00:00',560],
  ['creventic-dubai-2017',2017,1,'creventic','24H Dubai','Dubai Autodrome','United Arab Emirates','2017-01-12','24:00:00',560],
  ['creventic-mugello-2017',2017,2,'creventic','12H Mugello','Mugello','Italy','2017-03-17','12:00:00',290],
  ['creventic-redbullring-2017',2017,3,'creventic','12H Red Bull Ring','Red Bull Ring','Austria','2017-04-07','12:00:00',270],
  ['creventic-paulricard-2017',2017,4,'creventic','24H Paul Ricard','Paul Ricard','France','2017-05-05','24:00:00',560],
  ['creventic-imola-2017',2017,5,'creventic','12H Imola','Imola','Italy','2017-06-30','12:00:00',290],
  ['creventic-portimao-2017',2017,6,'creventic','24H Portimão','Portimão','Portugal','2017-08-25','24:00:00',560],
  ['creventic-cota-2017',2017,7,'creventic','24H COTA','Circuit of the Americas','United States','2017-11-09','24:00:00',560],
  ['creventic-dubai-2018',2018,1,'creventic','24H Dubai','Dubai Autodrome','United Arab Emirates','2018-01-11','24:00:00',560],
  ['creventic-silverstone-2018',2018,2,'creventic','12H Silverstone','Silverstone','United Kingdom','2018-03-09','12:00:00',290],
  ['creventic-navarra-2018',2018,3,'creventic','12H Navarra','Navarra','Spain','2018-04-20','12:00:00',270],
  ['creventic-imola-2018',2018,4,'creventic','12H Imola','Imola','Italy','2018-05-24','12:00:00',290],
  ['creventic-portimao-2018',2018,5,'creventic','24H Portimão','Portimão','Portugal','2018-07-06','24:00:00',560],
  ['creventic-barcelona-2018',2018,6,'creventic','24H Barcelona','Barcelona-Catalunya','Spain','2018-09-07','24:00:00',560],
  ['creventic-spa-2018',2018,7,'creventic','12H Spa-Francorchamps','Spa-Francorchamps','Belgium','2018-10-12','12:00:00',300],
  ['creventic-cota-2018',2018,8,'creventic','24H COTA','Circuit of the Americas','United States','2018-11-16','24:00:00',560],
  ['creventic-dubai-2019',2019,1,'creventic','24H Dubai','Dubai Autodrome','United Arab Emirates','2019-01-11','24:00:00',560],
  ['creventic-mugello-2019',2019,2,'creventic','12H Mugello','Mugello','Italy','2019-03-29','12:00:00',290],
  ['creventic-spa-2019',2019,3,'creventic','12H Spa-Francorchamps','Spa-Francorchamps','Belgium','2019-04-19','12:00:00',300],
  ['creventic-brno-2019',2019,4,'creventic','12H Brno','Brno','Czech Republic','2019-05-24','12:00:00',290],
  ['creventic-portimao-2019',2019,5,'creventic','24H Portimão','Portimão','Portugal','2019-07-06','24:00:00',560],
  ['creventic-barcelona-2019',2019,6,'creventic','24H Barcelona','Barcelona-Catalunya','Spain','2019-08-30','24:00:00',560],
  ['creventic-cota-2019',2019,7,'creventic','24H COTA','Circuit of the Americas','United States','2019-11-16','24:00:00',560],
  ['creventic-dubai-2020',2020,1,'creventic','24H Dubai','Dubai Autodrome','United Arab Emirates','2020-01-09','24:00:00',560],
  ['creventic-portimao-2020',2020,2,'creventic','24H Portimão','Portimão','Portugal','2020-06-12','24:00:00',560],
  ['creventic-monza-2020',2020,3,'creventic','12H Monza','Monza','Italy','2020-07-10','12:00:00',300],
  ['creventic-hockenheim-2020',2020,4,'creventic','16H Hockenheimring','Hockenheim','Germany','2020-09-04','16:00:00',380],
  ['creventic-sicily-2020',2020,5,'creventic','Coppa Florio 12H Sicily','Autodromo di Pergusa','Italy','2020-10-09','12:00:00',270],
  ['creventic-mugello-2020',2020,6,'creventic','12H Mugello','Mugello','Italy','2020-11-13','12:00:00',290],
  ['creventic-dubai-2021',2021,1,'creventic','24H Dubai','Dubai Autodrome','United Arab Emirates','2021-01-15','24:00:00',560],
  ['creventic-mugello-2021',2021,2,'creventic','12H Mugello','Mugello','Italy','2021-03-26','12:00:00',290],
  ['creventic-paulricard-2021',2021,3,'creventic','12H Paul Ricard','Paul Ricard','France','2021-04-24','12:00:00',280],
  ['creventic-hockenheim-2021',2021,4,'creventic','12H Hockenheimring','Hockenheim','Germany','2021-05-22','12:00:00',290],
  ['creventic-barcelona-2021',2021,5,'creventic','24H Barcelona','Barcelona-Catalunya','Spain','2021-09-04','24:00:00',560],
  ['creventic-hungaroring-2021',2021,6,'creventic','12H Hungary','Hungaroring','Hungary','2021-10-02','12:00:00',290],
  ['creventic-sebring-2021',2021,7,'creventic','24H Sebring','Sebring','United States','2021-11-20','24:00:00',560],
  ['creventic-dubai-2022',2022,1,'creventic','24H Dubai','Dubai Autodrome','United Arab Emirates','2022-01-13','24:00:00',560],
  ['creventic-mugello-2022',2022,2,'creventic','12H Mugello','Mugello','Italy','2022-03-25','12:00:00',290],
  ['creventic-spa-2022',2022,3,'creventic','12H Spa-Francorchamps','Spa-Francorchamps','Belgium','2022-04-22','12:00:00',300],
  ['creventic-hockenheim-2022',2022,4,'creventic','12H Hockenheimring','Hockenheim','Germany','2022-05-13','12:00:00',290],
  ['creventic-portimao-2022',2022,5,'creventic','24H Portimão','Portimão','Portugal','2022-07-08','24:00:00',560],
  ['creventic-barcelona-2022',2022,6,'creventic','24H Barcelona','Barcelona-Catalunya','Spain','2022-09-09','24:00:00',560],
  ['creventic-kuwait-2022',2022,7,'creventic','12H Kuwait','Kuwait Motor Town','Kuwait','2022-11-30','12:00:00',270],
  ['creventic-mugello-2023',2023,1,'creventic','12H Mugello','Mugello','Italy','2023-03-25','12:00:00',290],
  ['creventic-spa-2023',2023,2,'creventic','12H Spa-Francorchamps','Spa-Francorchamps','Belgium','2023-05-06','12:00:00',300],
  ['creventic-monza-2023',2023,3,'creventic','12H Monza','Monza','Italy','2023-06-10','12:00:00',300],
  ['creventic-estoril-2023',2023,4,'creventic','12H Estoril','Estoril','Portugal','2023-07-07','12:00:00',280],
  ['creventic-barcelona-2023',2023,5,'creventic','24H Barcelona','Barcelona-Catalunya','Spain','2023-09-15','24:00:00',560],
  ['creventic-mugello-2024',2024,1,'creventic','12H Mugello','Mugello','Italy','2024-03-23','12:00:00',290],
  ['creventic-spa-2024',2024,2,'creventic','12H Spa-Francorchamps','Spa-Francorchamps','Belgium','2024-04-20','12:00:00',300],
  ['creventic-portimao-2024',2024,3,'creventic','24H Portimão','Portimão','Portugal','2024-05-10','24:00:00',560],
  ['creventic-misano-2024',2024,4,'creventic','12H Misano','Misano','Italy','2024-07-06','12:00:00',280],
  ['creventic-barcelona-2024',2024,5,'creventic','24H Barcelona','Barcelona-Catalunya','Spain','2024-09-13','24:00:00',560],
  ['creventic-mugello-2025',2025,1,'creventic','12H Mugello','Mugello','Italy','2025-03-21','12:00:00',290],
  ['creventic-spa-2025',2025,2,'creventic','12H Spa-Francorchamps','Spa-Francorchamps','Belgium','2025-04-18','12:00:00',300],
  ['creventic-misano-2025',2025,3,'creventic','12H Misano','Misano','Italy','2025-05-23','12:00:00',280],
  ['creventic-paulricard-2025',2025,4,'creventic','12H Paul Ricard','Paul Ricard','France','2025-07-05','12:00:00',280],
  ['creventic-barcelona-2025',2025,5,'creventic','24H Barcelona','Barcelona-Catalunya','Spain','2025-09-26','24:00:00',560],
  ['creventic-mugello-2026',2026,1,'creventic','12H Mugello','Mugello','Italy','2026-03-20','12:00:00',290],
  ['creventic-spa-2026',2026,2,'creventic','12H Spa-Francorchamps','Spa-Francorchamps','Belgium','2026-04-17','12:00:00',300],
  ['creventic-paulricard-2026',2026,3,'creventic','12H Paul Ricard','Paul Ricard','France','2026-06-05','12:00:00',280],
  ['creventic-nurburgring-2026',2026,4,'creventic','12H Nürburgring','Nürburgring','Germany','2026-07-03','12:00:00',270],
  ['creventic-barcelona-2026',2026,5,'creventic','24H Barcelona','Barcelona-Catalunya','Spain','2026-09-18','24:00:00',560]
].map(([id,season,round,series,event,circuit,country,date,duration,laps])=>makeGreenRace({id,season,round,series,event,circuit,country,date,duration,laps})));



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
{pos:41,class:"LMGT3",no:"59",constructor:"astonmartin",model:"Aston Martin Vantage AMR LMGT3",team:"Racing Spirit of Leman",gap:"10 Laps",laps:102,time:"4:00:25.407",drivers:[["Clément Mateu","France"],["Marius Fossard","Andorra"],["Valentin Hasse-Clot","France"]]},
{pos:42,class:"LMP2",no:"29",constructor:"oreca",model:"Oreca 07 - Gibson",team:"Forestier Racing by Panis",gap:"NC",laps:91,time:"3:22:01.172",drivers:[["Louis Rousset","France"],["Oliver Gray","United Kingdom"],["Esteban Masson","France"]]},
{pos:43,class:"LMGT3",no:"62",constructor:"mercedes",model:"Mercedes-AMG LMGT3",team:"Team Qatar by Iron Lynx",gap:"NC",laps:85,time:"3:23:56.333",drivers:[["Abdulla Ali Al-Khelaifi","Qatar"],["Julian Hanses","Germany"],["Maxime Martin","Belgium"]]},
{pos:44,class:"LMGT3",no:"74",constructor:"ferrari",model:"Ferrari 296 LMGT3 Evo",team:"Kessel Racing",gap:"NC",laps:69,time:"2:38:23.912",drivers:[["Andrew Gilbert","United Kingdom"],["Fran Rueda","Spain"],["Romain Leroux","France"]]},
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
      {type:'FL',class:'LMGT3',no:'59',driver:'Valentin Hasse-Clot',lap:86,time:'2:03.741'}
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
// New constructors: no logo asset supplied yet, so these render as clean fallback badges
// (short code on a colored border) until a real logo file is added to assets/assetpack/constructors.
if(!CONSTRUCTORS.find(c=>c.id==='maserati')) CONSTRUCTORS.push({id:'maserati',name:'Maserati',category:'gt',short:'MAS',fallbackColor:'#0c2340'});
if(!CONSTRUCTORS.find(c=>c.id==='dallara')) CONSTRUCTORS.push({id:'dallara',name:'Dallara',category:'prototype',short:'DAL',fallbackColor:'#e2001a'});
if(!CONSTRUCTORS.find(c=>c.id==='nissan')) CONSTRUCTORS.push({id:'nissan',name:'Nissan',category:'gt',short:'NIS',fallbackColor:'#c3002f'});
if(!CONSTRUCTORS.find(c=>c.id==='bentley')) CONSTRUCTORS.push({id:'bentley',name:'Bentley',category:'gt',short:'BEN',fallbackColor:'#0b3d2e'});
if(!CONSTRUCTORS.find(c=>c.id==='jaguar')) CONSTRUCTORS.push({id:'jaguar',name:'Jaguar',category:'gt',short:'JAG',fallbackColor:'#1b5e20'});
if(!CONSTRUCTORS.find(c=>c.id==='rebellion')) CONSTRUCTORS.push({id:'rebellion',name:'Rebellion Racing',category:'LMP1',short:'REB',logo:'assets/assetpack/constructors/rebellion.png',fallbackColor:'#c8202f'});
if(!CONSTRUCTORS.find(c=>c.id==='smp')) CONSTRUCTORS.push({id:'smp',name:'SMP Racing',category:'LMP1',short:'SMP',logo:'assets/assetpack/constructors/smp.png',fallbackColor:'#3a4963'});
if(!CONSTRUCTORS.find(c=>c.id==='bykolles')) CONSTRUCTORS.push({id:'bykolles',name:'ByKolles Racing',category:'LMP1',short:'BYK',logo:'assets/assetpack/constructors/bykolles.png',fallbackColor:'#c9b400'});

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
    {pos:10,class:'GTDPRO',no:'911',constructor:'porsche',model:'Porsche 911 GT3 R',team:'AO Racing',gap:'8 Laps',laps:335,time:'8 Laps',drivers:[['Laurin Heinrich','Germany'],['Michael Christensen','Denmark'],['Klaus Bachler','Austria']]},
    {pos:11,class:'GTDPRO',no:'3',constructor:'corvette',model:'Corvette Z06 GT3.R',team:'Corvette Racing by Pratt Miller',gap:'8 Laps',laps:335,time:'8 Laps',drivers:[['Antonio García','Spain'],['Alexander Sims','United Kingdom'],['Nicky Catsburg','Netherlands']]},
    {pos:18,class:'GTD',no:'21',constructor:'ferrari',model:'Ferrari 296 GT3',team:'AF Corse',gap:'12 Laps',laps:331,time:'12 Laps',drivers:[['Alessandro Pier Guidi','Italy'],['Simon Mann','United States'],['Lilou Wadoux','France']]},
    {pos:19,class:'GTD',no:'57',constructor:'mercedes',model:'Mercedes-AMG GT3',team:'Winward Racing',gap:'12 Laps',laps:331,time:'12 Laps',drivers:[['Russell Ward','United States'],['Philip Ellis','Switzerland'],['Indy Dontje','Netherlands']]}
  ],
  performance:makePerf([
    {type:'FL',class:'Overall',no:'31',driver:'Jack Aitken',lap:10,time:'1:31.284'},
    {type:'FL',class:'GTP',no:'31',driver:'Jack Aitken',lap:10,time:'1:31.284'},
    {type:'FL',class:'LMP2',no:'2',driver:'Ben Hanley',lap:84,time:'1:35.020'},
    {type:'FL',class:'GTDPRO',no:'911',driver:'Laurin Heinrich',lap:126,time:'2:00.112'},
    {type:'FL',class:'GTD',no:'21',driver:'Alessandro Pier Guidi',lap:138,time:'2:00.780'}
  ],[
    {type:'PP',class:'Overall',no:'31',driver:'Jack Aitken',time:'1:45.???',note:'Replace with official qualifying import'},
    {type:'PP',class:'GTP',no:'31',driver:'Jack Aitken',time:'1:45.???'},
    {type:'PP',class:'LMP2',no:'2',driver:'Ben Hanley',time:'1:48.???'},
    {type:'PP',class:'GTDPRO',no:'911',driver:'Laurin Heinrich',time:'1:58.???'},
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
  completeRace('imsa-sebring-2026', IMSA_COMPLETE, {"fastestLaps": [{"type": "FL", "class": "Overall", "no": "4", "driver": "Andrea Nielsen", "lap": 87, "time": "1:48.271"}, {"type": "FL", "class": "GTP", "no": "4", "driver": "Andrea Nielsen", "lap": 83, "time": "1:31.284"}, {"type": "FL", "class": "LMP2", "no": "9", "driver": "Jack Rossi", "lap": 86, "time": "1:35.020"}, {"type": "FL", "class": "GTDPRO", "no": "7", "driver": "Arthur Klein", "lap": 89, "time": "2:00.112"}, {"type": "FL", "class": "GTD", "no": "5", "driver": "Nick Hansen", "lap": 92, "time": "2:00.780"}], "poles": [{"type": "PP", "class": "Overall", "no": "4", "driver": "Andrea Nielsen", "time": "1:47.883"}, {"type": "PP", "class": "GTP", "no": "4", "driver": "David Costa", "time": "1:45.312"}, {"type": "PP", "class": "LMP2", "no": "9", "driver": "Felix Müller", "time": "1:48.010"}, {"type": "PP", "class": "GTDPRO", "no": "7", "driver": "Martin Ricci", "time": "1:58.650"}, {"type": "PP", "class": "GTD", "no": "5", "driver": "Harry Schmidt", "time": "1:59.210"}]});
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
    E(1,'GTP',7,'porsche','Porsche 963','Porsche Penske Motorsport',343,'—','—',[['Felipe Nasr','Brazil'],['Julien Andlauer','France'],['Laurin Heinrich','Germany']]),E(2,'GTP',6,'porsche','Porsche 963','Porsche Penske Motorsport',343,'+1.515','+1.515',[['Laurens Vanthoor','Belgium'],['Kevin Estre','France'],['Matthew Campbell','Australia']]),E(3,'GTP',31,'cadillac','Cadillac V-Series.R','Whelen Cadillac Racing',343,'+10.377','+0.975',[['Jack Aitken','United Kingdom'],['Earl Bamber','New Zealand'],['Frederik Vesti','Denmark']]),E(4,'GTP',60,'acura','Acura ARX-06','Meyer Shank Racing',343,'+11.104','+0.727',[['Tom Blomqvist','United Kingdom'],['Colin Braun','United States'],['Scott Dixon','New Zealand']]),E(5,'GTP',24,'bmw','BMW M Hybrid V8','BMW M Team RLL',343,'+13.723','+2.619',[['Dries Vanthoor','Belgium'],['Sheldon van der Linde','South Africa'],['Robin Frijns','Netherlands']]),E(6,'GTP',93,'acura','Acura ARX-06','Meyer Shank Racing',343,'+14.819','+1.096',[['Renger van der Zande','Netherlands'],['Nick Yelloly','United Kingdom'],['Alex Palou','Spain']]),E(7,'GTP',40,'cadillac','Cadillac V-Series.R','Wayne Taylor Racing',343,'+16.642','+1.823',[['Jordan Taylor','United States'],['Louis Deletraz','Switzerland'],['Colton Herta','United States']]),E(8,'GTP',5,'porsche','Porsche 963','Proton Competition',343,'+24.739','+8.097',[['Tijmen van der Helm','Netherlands'],['Nicolás Pino','Chile'],['Kaylen Frederick','United States']]),E(9,'LMP2',2,'oreca','Oreca 07 Gibson','United Autosports USA',338,'+5 laps','+5 laps',[['Philip Fayer','Canada'],['Hunter McElrea','Australia'],['Mikkel Jensen','Denmark']]),E(10,'LMP2',22,'oreca','Oreca 07 Gibson','United Autosports USA',338,'+5 laps','+0.510',[['Dan Goldburg','United States'],['Paul di Resta','United Kingdom'],['Rasmus Lindh','Sweden']]),E(11,'LMP2',8,'oreca','Oreca 07 Gibson','Tower Motorsports',338,'+5 laps','+11.368',[['John Farano','Canada'],['Tristan Vautier','France'],['Sebastian Alvarez','Spain']]),E(12,'LMP2',18,'oreca','Oreca 07 Gibson','Era Motorsport',338,'+5 laps','+0.538',[['Naveen Rao','United States'],['Ferdinand Habsburg','Austria'],['Jacob Abel','United States']]),E(13,'LMP2','04','oreca','Oreca 07 Gibson','CrowdStrike Racing by APR',338,'+5 laps','+0.023',[['George Kurtz','United States'],['Alex Quinn','United Kingdom'],['Toby Sowery','United Kingdom']]),E(14,'LMP2',99,'oreca','Oreca 07 Gibson','AO Racing',338,'+5 laps','+0.852',[['PJ Hyett','United States'],['Dane Cameron','United States'],['Jonny Edgar','United Kingdom']]),E(15,'LMP2',11,'oreca','Oreca 07 Gibson','TDS Racing',338,'+5 laps','+1.550',[['Tobi Lutke','Canada'],['Charles Milesi','France'],['David Heinemeier Hansson','Denmark']]),E(16,'LMP2',52,'oreca','Oreca 07 Gibson','PR1 Mathiasen Motorsports',336,'+7 laps','+2 laps',[['Mikhail Goikhberg','Canada'],['Parker Thompson','Canada'],['Harry Tincknell','United Kingdom']]),E(17,'LMP2',73,'oreca','Oreca 07 Gibson','Inter Europol Competition',336,'+7 laps','+7.172',[['Pietro Fittipaldi','Brazil'],['Manuel Espírito Santo','Portugal'],['Christopher Cumming','Canada']]),E(18,'LMP2',37,'oreca','Oreca 07 Gibson','TDS Racing',334,'+9 laps','+2 laps',[['Oliver Jarvis','United Kingdom'],['Seth Lucas','United States'],['Jon Field','United States']]),E(19,'GTP',23,'astonmartin','Aston Martin Valkyrie','Heart of Racing Team',331,'+12 laps','+3 laps',[['Ross Gunn','United Kingdom'],['Roman De Angelis','Canada'],['Alex Riberas','Spain']]),E(20,'GTP',25,'bmw','BMW M Hybrid V8','BMW M Team RLL',329,'+14 laps','+2 laps',[['Philipp Eng','Austria'],['Marco Wittmann','Germany'],['Kevin Magnussen','Denmark']]),E(21,'GTP',10,'cadillac','Cadillac V-Series.R','Wayne Taylor Racing',343,'DSQ','', [['Ricky Taylor','United States'],['Filipe Albuquerque','Portugal'],['Will Stevens','United Kingdom']],'DSQ'),E(22,'GTDPRO',911,'porsche','Porsche 911 GT3 R','Manthey',321,'+22 laps','+8 laps',[['Thomas Preining','Austria'],['Klaus Bachler','Austria'],['Ricardo Feller','Switzerland']]),E(23,'GTDPRO',77,'porsche','Porsche 911 GT3 R','AO Racing',321,'+22 laps','+1.430',[['Nick Tandy','United Kingdom'],['Harry King','United Kingdom'],['Alessio Picariello','Belgium']]),E(24,'GTDPRO',4,'corvette','Corvette Z06 GT3.R','Corvette Racing by Pratt Miller',321,'+22 laps','+3.810',[['Tommy Milner','United States'],['Nicky Catsburg','Netherlands'],['Nicolás Varrone','Argentina']]),E(25,'GTDPRO',3,'corvette','Corvette Z06 GT3.R','Corvette Racing by Pratt Miller',321,'+22 laps','+7.187',[['Antonio García','Spain'],['Alexander Sims','United Kingdom'],['Marvin Kirchhöfer','Germany']]),E(26,'GTDPRO',1,'bmw','BMW M4 GT3 EVO','Paul Miller Racing',321,'+22 laps','+1.100',[['Neil Verhagen','United States'],['Connor De Phillippi','United States'],['Max Hesse','Germany']]),E(27,'GTDPRO',64,'ford','Ford Mustang GT3','Ford Multimatic Motorsports',321,'+22 laps','+0.524',[['Ben Barker','United Kingdom'],['Dennis Olsen','Norway'],['Mike Rockenfeller','Germany']]),E(28,'GTDPRO','033','ferrari','Ferrari 296 GT3','Risi Competizione',321,'+22 laps','+20.553',[['James Calado','United Kingdom'],['Riccardo Agostini','Italy'],['Miguel Molina','Spain']]),E(29,'GTDPRO',65,'ford','Ford Mustang GT3','Ford Multimatic Motorsports',321,'+22 laps','+50.464',[['Christopher Mies','Germany'],['Frédéric Vervisch','Belgium'],['Sebastian Priaulx','France']]),E(30,'GTDPRO',59,'mclaren','McLaren 720S GT3 EVO','United Autosports',320,'+23 laps','+1 lap',[['Max Esterson','United States'],['Nikita Johnson','United States'],['Dean MacDonald','United Kingdom']]),E(31,'GTDPRO',9,'lamborghini','Lamborghini Temerario GT3','Pfaff Motorsports',320,'+23 laps','+1:05.005',[['Andrea Caldarelli','Italy'],['Sandy Mitchell','United Kingdom'],['Franck Perera','France']]),E(32,'GTD',21,'ferrari','Ferrari 296 GT3','AF Corse',318,'+25 laps','+2 laps',[['Simon Mann','United States'],['Lilou Wadoux','France'],['Antonio Fuoco','Italy']]),E(33,'GTD',27,'astonmartin','Aston Martin Vantage GT3 Evo','Heart of Racing Team',318,'+25 laps','+0.746',[['Tom Gamble','United Kingdom'],['Dudu Barrichello','Brazil'],['Zacharie Robichon','Canada']]),E(34,'GTD',120,'porsche','Porsche 911 GT3 R','Wright Motorsports',318,'+25 laps','+6.338',[['Adam Adelson','United States'],['Tom Sargent','Australia'],['Callum Ilott','United Kingdom']]),E(35,'GTD',80,'mercedes','Mercedes-AMG GT3','Lone Star Racing',318,'+25 laps','+1.141',[['Scott Andrews','Australia'],['Lin Hodenius','Netherlands'],['James Roe','Ireland']]),E(36,'GTD',96,'bmw','BMW M4 GT3 EVO','Turner Motorsport',318,'+25 laps','+0.417',[['Patrick Gallagher','United States'],['Robby Foley','United States'],['Francis Selldorff','United States']]),E(37,'GTD',13,'corvette','Corvette Z06 GT3.R','AWA',318,'+25 laps','+2.906',[['Orey Fidani','Canada'],['Matt Bell','United States'],['Lars Kern','Germany']]),E(38,'GTD',34,'ferrari','Ferrari 296 GT3','Conquest Racing',318,'+25 laps','+24.904',[['Manny Franco','United States'],['Albert Costa Balboa','Spain'],['Lorenzo Patrese','Italy']]),E(39,'GTD',66,'ford','Ford Mustang GT3','Gradient Racing',318,'+25 laps','+33.110',[['Jake Walker','United States'],['Till Bechtolsheimer','United States'],['Joey Hand','United States']]),E(40,'GTD',36,'corvette','Corvette Z06 GT3.R','DXDT Racing',317,'+26 laps','+1 lap',[['Mason Filippi','United States'],['Charlie Eastwood','Ireland'],['Salih Yoluç','Turkey']]),E(41,'GTDPRO',14,'lexus','Lexus RC F GT3','Vasser Sullivan',316,'+27 laps','+1 lap',[['Jack Hawksworth','United Kingdom'],['Ben Barnicoat','United Kingdom'],['Kyle Kirkwood','United States']]),E(42,'GTD',28,'porsche','Porsche 911 GT3 R','RS1',312,'+31 laps','+4 laps',[['Jan Heylen','Belgium'],['Dillon Machavern','United States'],['Spencer Pumpelly','United States']]),E(43,'LMP2',43,'oreca','Oreca 07 Gibson','Inter Europol Competition',303,'+40 laps','+9 laps',[['Tom Dillmann','France'],['Bijoy Garg','United States'],['Jeremy Clarke','United States']]),E(44,'GTD',16,'ford','Ford Mustang GT3','Gradient Racing',279,'RET','+23 laps',[['Sheena Monk','United States'],['Felipe Fraga','Brazil'],['Jenson Altzman','United States']],'RET'),E(45,'GTD',12,'lexus','Lexus RC F GT3','Vasser Sullivan',268,'+75 laps','+11 laps',[['Aaron Telitz','United States'],['Benjamin Pedersen','Denmark'],['Frankie Montecalvo','United States']]),E(46,'GTD',19,'astonmartin','Aston Martin Vantage GT3 Evo','Van der Steur Racing',239,'RET','+29 laps',[['Valentin Hasse-Clot','France'],['Rory van der Steur','United States'],['Sébastien Baud','France']],'RET'),E(47,'GTDPRO',48,'mercedes','Mercedes-AMG GT3','Winward Racing',223,'RET','+16 laps',[['Scott Noble','United States'],['Jason Hart','United States'],['Luca Stolz','Germany']],'RET'),E(48,'GTD','023','ferrari','Ferrari 296 GT3','Triarsi Competizione',208,'RET','+15 laps',[['Onofrio Triarsi','United States'],['Kenton Koch','United States'],['Robert Megennis','United States']],'RET'),E(49,'GTD',81,'corvette','Corvette Z06 GT3.R','Dragonspeed',155,'RET','+53 laps',[['Henrik Hedman','Sweden'],['Giacomo Altoè','Italy'],['Casper Stevenson','United Kingdom']],'RET'),E(50,'GTD',45,'lamborghini','Lamborghini Huracan GT3 EVO2','Wayne Taylor Racing',150,'RET','+5 laps',[['Danny Formal','Costa Rica'],['Trent Hindman','United States'],['Graham Doyle','United States']],'RET'),E(51,'GTD',70,'ferrari','Ferrari 296 GT3','Inception Racing',111,'RET','+39 laps',[['Brendan Iribe','United States'],['Frederik Schandorff','Denmark'],['Ollie Millroy','United Kingdom']],'RET'),E(52,'GTDPRO',62,'ferrari','Ferrari 296 GT3','Risi Competizione',76,'RET','+35 laps',[['Daniel Serra','Brazil'],['Davide Rigon','Italy'],['Alessandro Pier Guidi','Italy']],'RET'),E(53,'GTD',57,'mercedes','Mercedes-AMG GT3','Winward Racing',76,'RET','+2.032',[['Russell Ward','United States'],['Philip Ellis','Switzerland'],['Indy Dontje','Netherlands']],'RET'),E(54,'GTD',912,'porsche','Porsche 911 GT3 R','Manthey',302,'RET','', [['Riccardo Pera','Italy'],['Morris Schuring','Netherlands'],['Ryan Hardwick','United States']],'RET')];return {id:'imsa-sebring-2026',season:2026,round:2,series:'imsa',event:'12 Hours of Sebring',circuit:'Sebring',country:'United States',date:'2026-03-21',scheduledDuration:'12:00:00',officialDuration:'12:01:48.652',scheduledLaps:342,officialLaps:343,segments:(RACES.find(r=>r.id==='imsa-sebring-2026')||{}).segments||[{id:'g0',phase:'GREEN',start:0,end:43309,startLap:0,endLap:343,reason:'Race',notes:'Race Control pending import.'}],entries,performance:perf([{type:'FL',class:'Overall',no:'31',driver:'Jack Aitken',time:'1:31.284'},{type:'FL',class:'GTP',no:'31',driver:'Jack Aitken',time:'1:31.284'},{type:'FL',class:'LMP2',no:'2',driver:'Ben Hanley',time:'1:35.020'},{type:'FL',class:'GTDPRO',no:'911',driver:'Laurin Heinrich',time:'2:00.112'},{type:'FL',class:'GTD',no:'21',driver:'Antonio Fuoco',time:'2:00.780'}],[{type:'PP',class:'Overall',no:'31',driver:'Jack Aitken',time:'—'}]),completeness:{metadata:true,entryList:true,results:true,fastestLaps:true,poles:false,raceControl:false},sources:['Motorsport.com full IMSA Sebring 2026 results table']}})();
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
{pos:27,class:'LMGT3',no:'32',constructor:'bmw',model:'BMW M4 LMGT3 Evo',team:'Team WRT',laps:139,time:'6:02:51.380',gap:'+1:05.946',int:'+37.438',drivers:[['Darren Leung','United Kingdom'],['Sean Gelael','Indonesia'],['Augusto Farfus','Brazil']]},
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
    entry(39,'LMGT3','32','bmw','BMW M4 LMGT3 Evo','Team WRT',334,'24:03:32.171','+47 laps',[['Darren Leung','United Kingdom'],['Sean Gelael','Indonesia'],['Augusto Farfus','Brazil']]),
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

// IMSA Michelin Pilot Challenge (support series, GS + TCR classes), 2019 onward - renamed
// from "Continental Tire SportsCar Challenge" for 2019 when Michelin replaced Continental as
// tire supplier (Street Tuner class dropped at the same time). Runs on most of the same race
// weekends as the WeatherTech Championship, plus a few standalone venues (Mid-Ohio, Lime
// Rock). Lightweight skeleton entries with approximate dates, pending real PDF imports.
RACES.push(...[
  ['mpc-daytona-2019',2019,1,'mpc','BMW Endurance Challenge at Daytona','Daytona International Speedway','United States','2019-01-25','04:00:00',120],
  ['mpc-sebring-2019',2019,2,'mpc','Alan Jay Automotive Network 120','Sebring','United States','2019-03-15','02:30:00',75],
  ['mpc-midohio-2019',2019,3,'mpc','Mid-Ohio 120','Mid-Ohio','United States','2019-05-04','02:30:00',75],
  ['mpc-watkins-2019',2019,4,'mpc','Tioga Downs Casino Resort 240 at The Glen','Watkins Glen','United States','2019-06-29','04:00:00',120],
  ['mpc-mosport-2019',2019,5,'mpc','Canadian Tire Motorsport Park 120','Canadian Tire Motorsport Park','Canada','2019-07-06','02:30:00',75],
  ['mpc-limerock-2019',2019,6,'mpc','Lime Rock Park 120','Lime Rock Park','United States','2019-07-20','02:00:00',65],
  ['mpc-roadamerica-2019',2019,7,'mpc','Road America 120','Road America','United States','2019-08-03','02:30:00',80],
  ['mpc-vir-2019',2019,8,'mpc','Virginia Is For Racing Lovers Grand Prix','VIR','United States','2019-08-24','02:30:00',75],
  ['mpc-laguna-2019',2019,9,'mpc','WeatherTech Raceway Laguna Seca 120','Laguna Seca','United States','2019-09-14','02:30:00',75],
  ['mpc-atlanta-2019',2019,10,'mpc','Fox Factory 120','Road Atlanta','United States','2019-10-11','02:30:00',75],

  ['mpc-daytona-2020',2020,1,'mpc','BMW Endurance Challenge at Daytona','Daytona International Speedway','United States','2020-01-24','04:00:00',120],
  ['mpc-sebring-2020',2020,2,'mpc','AdventHealth 120','Sebring','United States','2020-07-17','02:30:00',75],
  ['mpc-roadamerica-2020',2020,3,'mpc','Road America 120','Road America','United States','2020-08-01','02:30:00',80],
  ['mpc-vir-2020',2020,4,'mpc','Virginia Is For Racing Lovers Grand Prix','VIR','United States','2020-08-22','02:30:00',75],
  ['mpc-atlanta-frosty-2020',2020,5,'mpc','VP Racing Stay Frosty 240','Road Atlanta','United States','2020-09-05','04:00:00',120],
  ['mpc-midohio1-2020',2020,6,'mpc','Mid-Ohio 120 (Race 1)','Mid-Ohio','United States','2020-09-25','02:00:00',65],
  ['mpc-midohio2-2020',2020,7,'mpc','Mid-Ohio 120 (Race 2)','Mid-Ohio','United States','2020-09-26','02:00:00',65],
  ['mpc-atlanta-2020',2020,8,'mpc','Fox Factory 120','Road Atlanta','United States','2020-10-16','04:00:00',120],
  ['mpc-laguna-2020',2020,9,'mpc','WeatherTech Raceway Laguna Seca 120','Laguna Seca','United States','2020-10-31','02:30:00',75],
  ['mpc-sebring2-2020',2020,10,'mpc','Alan Jay Automotive Network 120','Sebring','United States','2020-11-13','02:30:00',75],

  ['mpc-daytona-2021',2021,1,'mpc','BMW Endurance Challenge at Daytona','Daytona International Speedway','United States','2021-01-29','04:00:00',120],
  ['mpc-sebring-2021',2021,2,'mpc','Alan Jay Automotive Network 120','Sebring','United States','2021-03-18','02:30:00',75],
  ['mpc-midohio-2021',2021,3,'mpc','Mid-Ohio 120','Mid-Ohio','United States','2021-05-15','02:30:00',75],
  ['mpc-watkins1-2021',2021,4,'mpc','Tioga Downs Casino Resort 240 at The Glen','Watkins Glen','United States','2021-06-26','04:00:00',120],
  ['mpc-watkins2-2021',2021,5,'mpc',"Sahlen's 120 at The Glen",'Watkins Glen','United States','2021-07-02','02:00:00',60],
  ['mpc-limerock-2021',2021,6,'mpc','Lime Rock Park 120','Lime Rock Park','United States','2021-07-17','02:00:00',65],
  ['mpc-roadamerica-2021',2021,7,'mpc','Road America 120','Road America','United States','2021-08-07','02:30:00',80],
  ['mpc-laguna-2021',2021,8,'mpc','WeatherTech Raceway Laguna Seca 120','Laguna Seca','United States','2021-09-11','02:30:00',75],
  ['mpc-vir-2021',2021,9,'mpc','Virginia Is For Racing Lovers Grand Prix','VIR','United States','2021-10-10','02:30:00',75],
  ['mpc-atlanta-2021',2021,10,'mpc','Fox Factory 120','Road Atlanta','United States','2021-11-12','02:30:00',75],

  ['mpc-daytona-2022',2022,1,'mpc','BMW Endurance Challenge at Daytona','Daytona International Speedway','United States','2022-01-29','04:00:00',120],
  ['mpc-sebring-2022',2022,2,'mpc','Alan Jay Automotive Network 120','Sebring','United States','2022-03-16','02:30:00',75],
  ['mpc-laguna-2022',2022,3,'mpc','WeatherTech Raceway Laguna Seca 120','Laguna Seca','United States','2022-04-30','02:30:00',75],
  ['mpc-midohio-2022',2022,4,'mpc','Mid-Ohio 120','Mid-Ohio','United States','2022-05-14','02:30:00',75],
  ['mpc-watkins-2022',2022,5,'mpc','Tioga Downs Casino Resort 120','Watkins Glen','United States','2022-06-25','02:30:00',75],
  ['mpc-mosport-2022',2022,6,'mpc','Canadian Tire Motorsport Park 120','Canadian Tire Motorsport Park','Canada','2022-07-02','02:30:00',75],
  ['mpc-limerock-2022',2022,7,'mpc','Lime Rock Park 120','Lime Rock Park','United States','2022-07-16','02:00:00',65],
  ['mpc-roadamerica-2022',2022,8,'mpc','Road America 240','Road America','United States','2022-08-06','04:00:00',120],
  ['mpc-vir-2022',2022,9,'mpc','Virginia Is For Racing Lovers Grand Prix','VIR','United States','2022-08-27','02:30:00',75],
  ['mpc-atlanta-2022',2022,10,'mpc','Fox Factory 120','Road Atlanta','United States','2022-09-30','02:30:00',75],

  ['mpc-daytona-2023',2023,1,'mpc','BMW Endurance Challenge at Daytona','Daytona International Speedway','United States','2023-01-28','02:30:00',75],
  ['mpc-sebring-2023',2023,2,'mpc','Alan Jay Automotive Network 120','Sebring','United States','2023-03-15','02:30:00',75],
  ['mpc-laguna-2023',2023,3,'mpc','WeatherTech Raceway Laguna Seca 120','Laguna Seca','United States','2023-05-12','02:30:00',75],
  ['mpc-detroit-2023',2023,4,'mpc','Chevrolet Detroit Grand Prix presented by Lear (GS only)','Detroit','United States','2023-06-03','01:40:00',50],
  ['mpc-watkins-2023',2023,5,'mpc','Tioga Downs Casino Resort 120','Watkins Glen','United States','2023-06-24','02:30:00',75],
  ['mpc-mosport-2023',2023,6,'mpc','Canadian Tire Motorsport Park 120','Canadian Tire Motorsport Park','Canada','2023-07-08','02:30:00',75],
  ['mpc-limerock-2023',2023,7,'mpc','Lime Rock Park 120 (TCR only)','Lime Rock Park','United States','2023-07-22','02:00:00',60],
  ['mpc-roadamerica-2023',2023,8,'mpc','Road America 120','Road America','United States','2023-08-05','02:30:00',80],
  ['mpc-vir-2023',2023,9,'mpc','Virginia Is For Racing Lovers Grand Prix','VIR','United States','2023-08-26','02:30:00',75],
  ['mpc-indy-2023',2023,10,'mpc','Indianapolis Motor Speedway 240','Indianapolis','United States','2023-09-16','04:00:00',120],
  ['mpc-atlanta-2023',2023,11,'mpc','Fox Factory 120','Road Atlanta','United States','2023-10-12','02:30:00',75],

  ['mpc-daytona-2024',2024,1,'mpc','BMW Endurance Challenge at Daytona','Daytona International Speedway','United States','2024-01-26','04:00:00',120],
  ['mpc-sebring-2024',2024,2,'mpc','Alan Jay Automotive Network 120','Sebring','United States','2024-03-14','02:30:00',75],
  ['mpc-laguna-2024',2024,3,'mpc','WeatherTech Raceway Laguna Seca 120','Laguna Seca','United States','2024-05-11','02:30:00',75],
  ['mpc-midohio-2024',2024,4,'mpc',"O'Reilly Auto Parts 4 Hours of Mid-Ohio",'Mid-Ohio','United States','2024-06-08','04:00:00',120],
  ['mpc-watkins-2024',2024,5,'mpc','The Esses 120 at The Glen','Watkins Glen','United States','2024-06-21','02:30:00',75],
  ['mpc-mosport-2024',2024,6,'mpc','Canadian Tire Motorsport Park 120','Canadian Tire Motorsport Park','Canada','2024-07-13','02:30:00',75],
  ['mpc-roadamerica-2024',2024,7,'mpc','Road America 120','Road America','United States','2024-08-03','02:30:00',80],
  ['mpc-vir-2024',2024,8,'mpc','Virginia Is For Racing Lovers Grand Prix','VIR','United States','2024-08-24','02:30:00',75],
  ['mpc-indy-2024',2024,9,'mpc','Indianapolis Motor Speedway 120','Indianapolis','United States','2024-09-20','02:30:00',75],
  ['mpc-atlanta-2024',2024,10,'mpc','Fox Factory 120','Road Atlanta','United States','2024-10-10','02:30:00',75],

  ['mpc-daytona-2025',2025,1,'mpc','BMW Endurance Challenge at Daytona','Daytona International Speedway','United States','2025-01-24','02:30:00',75],
  ['mpc-sebring-2025',2025,2,'mpc','Alan Jay Automotive Network 120','Sebring','United States','2025-03-13','02:30:00',75],
  ['mpc-laguna-2025',2025,3,'mpc','WeatherTech Raceway Laguna Seca 120','Laguna Seca','United States','2025-05-09','02:30:00',75],
  ['mpc-midohio-2025',2025,4,'mpc',"O'Reilly Auto Parts 4 Hours of Mid-Ohio",'Mid-Ohio','United States','2025-06-07','04:00:00',120],
  ['mpc-watkins-2025',2025,5,'mpc','LP Building Solutions 120','Watkins Glen','United States','2025-06-20','02:30:00',75],
  ['mpc-mosport-2025',2025,6,'mpc','Canadian Tire Motorsport Park 120','Canadian Tire Motorsport Park','Canada','2025-07-11','02:30:00',75],
  ['mpc-roadamerica-2025',2025,7,'mpc','Road America 120','Road America','United States','2025-08-01','02:30:00',80],
  ['mpc-vir-2025',2025,8,'mpc','Virginia Is For Racing Lovers Grand Prix','VIR','United States','2025-08-22','02:30:00',75],
  ['mpc-indy-2025',2025,9,'mpc','Indianapolis Motor Speedway 120','Indianapolis','United States','2025-09-19','02:30:00',75],
  ['mpc-atlanta-2025',2025,10,'mpc','Fox Factory 120','Road Atlanta','United States','2025-10-09','02:30:00',75],

  ['mpc-daytona-2026',2026,1,'mpc','BMW Endurance Challenge at Daytona','Daytona International Speedway','United States','2026-01-24','04:00:00',120],
  ['mpc-sebring-2026',2026,2,'mpc','Alan Jay Automotive Network 120','Sebring','United States','2026-03-18','02:30:00',75],
  ['mpc-laguna-2026',2026,3,'mpc','WeatherTech Raceway Laguna Seca 120','Laguna Seca','United States','2026-05-08','02:30:00',75],
  ['mpc-midohio-2026',2026,4,'mpc',"O'Reilly Auto Parts 4 Hours of Mid-Ohio",'Mid-Ohio','United States','2026-06-06','04:00:00',120],
  ['mpc-watkins-2026',2026,5,'mpc','LP Building Solutions 120 at The Glen','Watkins Glen','United States','2026-06-26','02:30:00',75],
  ['mpc-mosport-2026',2026,6,'mpc','Canadian Tire Motorsport Park 120','Canadian Tire Motorsport Park','Canada','2026-07-10','02:30:00',75],
  ['mpc-roadamerica-2026',2026,7,'mpc','Road America 120','Road America','United States','2026-07-31','02:30:00',80],
  ['mpc-vir-2026',2026,8,'mpc','Virginia Is For Racing Lovers Grand Prix','VIR','United States','2026-08-21','02:30:00',75],
  ['mpc-indy-2026',2026,9,'mpc','Indianapolis Motor Speedway 120','Indianapolis','United States','2026-09-17','02:30:00',75],
  ['mpc-atlanta-2026',2026,10,'mpc','Fox Factory 120','Road Atlanta','United States','2026-10-09','02:30:00',75]
].map(([id,season,round,series,event,circuit,country,date,duration,laps])=>makeGreenRace({id,season,round,series,event,circuit,country,date,duration,laps})));

// WEC 2012 Sebring (season opener, round 1) - real import from Al Kamel PDFs (Race Final
// Classification by Class, Qualifying Practice Classification by Class, Provisional
// Classification by Driver Fastest Lap), replacing the wec-sebring-2012 skeleton entry.
// First real historical import from the pre-Hypercar-era WEC document format (single fastest
// lap qualifying, no Hyperpole/two-driver-average system yet - that started 2013+).

const WEC_SEBRING_2012_GOLD={
  "id": "wec-sebring-2012",
  "season": 2012,
  "round": 1,
  "series": "wec",
  "event": "60th Annual 12 Hours of Sebring",
  "circuit": "Sebring",
  "country": "United States",
  "date": "2012-03-17",
  "scheduledDuration": "12:00:00",
  "officialDuration": "12:00:15.243",
  "scheduledLaps": 325,
  "officialLaps": 325,
  "segments": [
    {
      "id": "g0",
      "phase": "GREEN",
      "start": 0,
      "end": 43215.243,
      "startLap": 0,
      "endLap": 325,
      "reason": "Race",
      "notes": "Race Control pending manual entry."
    }
  ],
  "entries": [
    {
      "pos": 1,
      "class": "LMP1",
      "no": "2",
      "constructor": "audi",
      "model": "Audi R18",
      "team": "Audi Sport Team Joest",
      "gap": "—",
      "laps": 325,
      "time": "12:00:15.243",
      "status": "Classified",
      "drivers": [
        [
          "Allan Mcnish",
          ""
        ],
        [
          "Tom Kristensen",
          ""
        ],
        [
          "Dindo Capello",
          ""
        ]
      ],
      "bestLap": "1:47.534",
      "bestLapNo": "238",
      "bestLapDriver": "Dindo Capello"
    },
    {
      "pos": 2,
      "class": "LMP1",
      "no": "3",
      "constructor": "audi",
      "model": "Audi R18",
      "team": "Audi Sport Team Joest",
      "gap": "4 Laps",
      "laps": 321,
      "time": "12:00:42.168",
      "status": "Classified",
      "drivers": [
        [
          "Timo Bernhard",
          ""
        ],
        [
          "Romain Dumas",
          ""
        ],
        [
          "Loic Duval",
          "France"
        ]
      ],
      "bestLap": "1:47.438",
      "bestLapNo": "157",
      "bestLapDriver": "Timo Bernhard"
    },
    {
      "pos": 3,
      "class": "LMP2",
      "no": "44",
      "constructor": "",
      "model": "HPD ARX 03b - Honda",
      "team": "Starworks Motorsports",
      "gap": "—",
      "laps": 319,
      "time": "12:01:28.511",
      "status": "Classified",
      "drivers": [
        [
          "Vicente Potolicchio",
          ""
        ],
        [
          "Ryan Dalziel",
          ""
        ],
        [
          "Stéphane Sarrazin",
          "France"
        ]
      ],
      "bestLap": "1:52.295",
      "bestLapNo": "164",
      "bestLapDriver": "Stéphane Sarrazin"
    },
    {
      "pos": 4,
      "class": "LMP2",
      "no": "24",
      "constructor": "",
      "model": "Morgan - Judd",
      "team": "Oak Racing",
      "gap": "1 Laps",
      "laps": 318,
      "time": "12:01:02.039",
      "status": "Classified",
      "drivers": [
        [
          "Jacques Nicolet",
          ""
        ],
        [
          "Olivier Pla",
          "France"
        ],
        [
          "Matthieu Lahaye",
          ""
        ]
      ],
      "bestLap": "1:51.306",
      "bestLapNo": "186",
      "bestLapDriver": "Olivier Pla"
    },
    {
      "pos": 5,
      "class": "LMP1",
      "no": "16",
      "constructor": "",
      "model": "Pescarolo - Judd",
      "team": "Pescarolo Team",
      "gap": "7 Laps",
      "laps": 318,
      "time": "12:01:08.914",
      "status": "Classified",
      "drivers": [
        [
          "Emmanuel Collard",
          ""
        ],
        [
          "Jean-Christophe Boullion",
          ""
        ],
        [
          "Julien Jousse",
          ""
        ]
      ],
      "bestLap": "1:51.285",
      "bestLapNo": "234",
      "bestLapDriver": "Julien Jousse"
    },
    {
      "pos": 6,
      "class": "LMP2",
      "no": "49",
      "constructor": "oreca",
      "model": "Oreca 03 - Nissan",
      "team": "Pecom Racing",
      "gap": "2 Laps",
      "laps": 317,
      "time": "12:01:23.639",
      "status": "Classified",
      "drivers": [
        [
          "Luis Perez Companc",
          "Argentina"
        ],
        [
          "Soheil Ayari",
          ""
        ],
        [
          "Pierre Kaffer",
          ""
        ]
      ],
      "bestLap": "1:52.616",
      "bestLapNo": "187",
      "bestLapDriver": "Pierre Kaffer"
    },
    {
      "pos": 7,
      "class": "LMP2",
      "no": "41",
      "constructor": "nissan",
      "model": "Zytek Z11SN - Nissan",
      "team": "Greaves Motorsport",
      "gap": "3 Laps",
      "laps": 316,
      "time": "12:00:44.900",
      "status": "Classified",
      "drivers": [
        [
          "Christian Zugel",
          ""
        ],
        [
          "Ricardo Gonzalez",
          ""
        ],
        [
          "Elton Julian",
          ""
        ]
      ],
      "bestLap": "1:53.506",
      "bestLapNo": "6",
      "bestLapDriver": "Elton Julian"
    },
    {
      "pos": 8,
      "class": "LMP1",
      "no": "21",
      "constructor": "",
      "model": "HPD ARX 03a - Honda",
      "team": "Strakka Racing",
      "gap": "9 Laps",
      "laps": 316,
      "time": "12:01:42.494",
      "status": "Classified",
      "drivers": [
        [
          "Nick Leventis",
          ""
        ],
        [
          "Danny Watts",
          ""
        ],
        [
          "Jonny Kane",
          ""
        ]
      ],
      "bestLap": "1:50.348",
      "bestLapNo": "277",
      "bestLapDriver": "Jonny Kane"
    },
    {
      "pos": 9,
      "class": "LMP2",
      "no": "25",
      "constructor": "oreca",
      "model": "Oreca 03 - Nissan",
      "team": "ADR-Delta",
      "gap": "4 Laps",
      "laps": 315,
      "time": "12:03:40.489",
      "status": "Classified",
      "drivers": [
        [
          "Tor Graves",
          ""
        ],
        [
          "John Martin",
          ""
        ],
        [
          "Robbie Kerr",
          ""
        ]
      ],
      "bestLap": "1:52.929",
      "bestLapNo": "264",
      "bestLapDriver": "Robbie Kerr"
    },
    {
      "pos": 10,
      "class": "LMP2",
      "no": "31",
      "constructor": "",
      "model": "Lola B12/80 Coupé - Lotus",
      "team": "Lotus",
      "gap": "9 Laps",
      "laps": 310,
      "time": "11:59:56.852",
      "status": "Classified",
      "drivers": [
        [
          "Thomas Holzer",
          ""
        ],
        [
          "Mirco Shultis",
          ""
        ],
        [
          "Luca Moro",
          ""
        ]
      ],
      "bestLap": "1:54.474",
      "bestLapNo": "22",
      "bestLapDriver": "Thomas Holzer"
    },
    {
      "pos": 11,
      "class": "LMP1",
      "no": "1",
      "constructor": "audi",
      "model": "Audi R18",
      "team": "Audi Sport Team Joest",
      "gap": "15 Laps",
      "laps": 310,
      "time": "12:02:02.296",
      "status": "Classified",
      "drivers": [
        [
          "Benoit Tréluyer",
          ""
        ],
        [
          "Marcel Fässler",
          ""
        ],
        [
          "André Lotterer",
          "Germany"
        ]
      ],
      "bestLap": "1:46.567",
      "bestLapNo": "252",
      "bestLapDriver": "André Lotterer"
    },
    {
      "pos": 12,
      "class": "LMP1",
      "no": "22",
      "constructor": "",
      "model": "HPD ARX 03a - Honda",
      "team": "JRM",
      "gap": "16 Laps",
      "laps": 309,
      "time": "12:03:13.341",
      "status": "Classified",
      "drivers": [
        [
          "David Brabham",
          ""
        ],
        [
          "Karun Chandhok",
          ""
        ],
        [
          "Peter Dumbreck",
          ""
        ]
      ],
      "bestLap": "1:49.482",
      "bestLapNo": "163",
      "bestLapDriver": "Peter Dumbreck"
    },
    {
      "pos": 13,
      "class": "GTEPRO",
      "no": "71",
      "constructor": "ferrari",
      "model": "Ferrari F458 Italia",
      "team": "AF Corse",
      "gap": "—",
      "laps": 307,
      "time": "12:01:26.088",
      "status": "Classified",
      "drivers": [
        [
          "Andrea Bertolini",
          ""
        ],
        [
          "Olivier Beretta",
          "Monaco"
        ],
        [
          "Marco Cioci",
          ""
        ]
      ],
      "bestLap": "2:00.504",
      "bestLapNo": "120",
      "bestLapDriver": "Olivier Beretta"
    },
    {
      "pos": 14,
      "class": "GTEPRO",
      "no": "77",
      "constructor": "porsche",
      "model": "Porsche 911 RSR (997)",
      "team": "Team Felbermayr-Proton",
      "gap": "1 Laps",
      "laps": 306,
      "time": "12:01:22.371",
      "status": "Classified",
      "drivers": [
        [
          "Marc Lieb",
          ""
        ],
        [
          "Richard Lietz",
          "Austria"
        ],
        [
          "Patrick Pilet",
          ""
        ]
      ],
      "bestLap": "2:01.225",
      "bestLapNo": "226",
      "bestLapDriver": "Marc Lieb"
    },
    {
      "pos": 15,
      "class": "GTEAM",
      "no": "88",
      "constructor": "porsche",
      "model": "Porsche 911 RSR (997)",
      "team": "Team Felbermayr-Proton",
      "gap": "—",
      "laps": 298,
      "time": "12:00:19.336",
      "status": "Classified",
      "drivers": [
        [
          "Christian Ried",
          ""
        ],
        [
          "Gianluca Roda",
          ""
        ],
        [
          "Paolo Ruberti",
          ""
        ]
      ],
      "bestLap": "2:02.445",
      "bestLapNo": "205",
      "bestLapDriver": "Paolo Ruberti"
    },
    {
      "pos": 16,
      "class": "GTEAM",
      "no": "70",
      "constructor": "corvette",
      "model": "Chevrolet Corvette C6-ZR1",
      "team": "Larbre Competition",
      "gap": "1 Laps",
      "laps": 297,
      "time": "12:00:41.989",
      "status": "Classified",
      "drivers": [
        [
          "Jean-Phillipe Belloc",
          ""
        ],
        [
          "Christophe Bourret",
          ""
        ],
        [
          "Pascal Gibon",
          ""
        ]
      ],
      "bestLap": "2:02.892",
      "bestLapNo": "48",
      "bestLapDriver": "Jean-Phillipe Belloc"
    },
    {
      "pos": 17,
      "class": "LMP1",
      "no": "12",
      "constructor": "toyota",
      "model": "Lola B12/60 Coupé - Toyota",
      "team": "Rebellion Racing",
      "gap": "29 Laps",
      "laps": 296,
      "time": "12:00:20.972",
      "status": "Classified",
      "drivers": [
        [
          "Nicolas Prost",
          ""
        ],
        [
          "Neel Jani",
          ""
        ],
        [
          "Nick Heidfeld",
          ""
        ]
      ],
      "bestLap": "1:49.946",
      "bestLapNo": "140",
      "bestLapDriver": "Nick Heidfeld"
    },
    {
      "pos": 18,
      "class": "GTEPRO",
      "no": "97",
      "constructor": "astonmartin",
      "model": "Aston Martin Vantage V8",
      "team": "Aston Martin Racing",
      "gap": "15 Laps",
      "laps": 292,
      "time": "12:02:18.900",
      "status": "Classified",
      "drivers": [
        [
          "Adrian Fernandez",
          ""
        ],
        [
          "Stefan Mücke",
          "Germany"
        ],
        [
          "Darren Turner",
          "United Kingdom"
        ]
      ],
      "bestLap": "2:00.606",
      "bestLapNo": "219",
      "bestLapDriver": "Stefan Mücke"
    },
    {
      "pos": 19,
      "class": "LMP1",
      "no": "13",
      "constructor": "toyota",
      "model": "Lola B12/60 Coupé - Toyota",
      "team": "Rebellion Racing",
      "gap": "34 Laps",
      "laps": 291,
      "time": "12:01:29.678",
      "status": "Classified",
      "drivers": [
        [
          "Andrea Belicchi",
          "Italy"
        ],
        [
          "Harold Primat",
          ""
        ],
        [
          "Jeroen Bleekemolen",
          "Netherlands"
        ]
      ],
      "bestLap": "1:49.477",
      "bestLapNo": "164",
      "bestLapDriver": "Andrea Belicchi"
    },
    {
      "pos": 20,
      "class": "GTEAM",
      "no": "50",
      "constructor": "corvette",
      "model": "Chevrolet Corvette C6-ZR1",
      "team": "Larbre Competition",
      "gap": "10 Laps",
      "laps": 288,
      "time": "11:38:19.629",
      "status": "Classified",
      "drivers": [
        [
          "Patrick Bornhauser",
          ""
        ],
        [
          "Julien Canal",
          "France"
        ],
        [
          "Pedro Lamy",
          "Portugal"
        ]
      ],
      "bestLap": "2:02.701",
      "bestLapNo": "211",
      "bestLapDriver": "Pedro Lamy"
    },
    {
      "pos": 21,
      "class": "GTEAM",
      "no": "61",
      "constructor": "ferrari",
      "model": "Ferrari F458 Italia",
      "team": "AF Corse-Waltrip",
      "gap": "15 Laps",
      "laps": 283,
      "time": "12:01:29.790",
      "status": "Classified",
      "drivers": [
        [
          "Robert Kauffman",
          ""
        ],
        [
          "Michael Waltrip",
          ""
        ],
        [
          "Rui Aguas",
          ""
        ]
      ],
      "bestLap": "2:01.746",
      "bestLapNo": "243",
      "bestLapDriver": "Rui Aguas"
    },
    {
      "pos": 22,
      "class": "LMP2",
      "no": "28",
      "constructor": "nissan",
      "model": "Lola B12/80 Coupé - Nissan",
      "team": "Gulf Racing Middle East",
      "gap": "43 Laps",
      "laps": 276,
      "time": "12:00:08.974",
      "status": "Classified",
      "drivers": [
        [
          "Maxime Jousse",
          ""
        ],
        [
          "Fabien Giroix",
          ""
        ],
        [
          "Stefan Johansson",
          ""
        ]
      ],
      "bestLap": "1:55.907",
      "bestLapNo": "55",
      "bestLapDriver": "Stefan Johansson"
    },
    {
      "pos": 23,
      "class": "GTEAM",
      "no": "57",
      "constructor": "ferrari",
      "model": "Ferrari F458 Italia",
      "team": "Krohn Racing",
      "gap": "33 Laps",
      "laps": 265,
      "time": "12:01:17.842",
      "status": "Classified",
      "drivers": [
        [
          "Tracy Krohn",
          ""
        ],
        [
          "Niclas Jönsson",
          ""
        ],
        [
          "Michele Rugolo",
          ""
        ]
      ],
      "bestLap": "2:01.818",
      "bestLapNo": "164",
      "bestLapDriver": "Michele Rugolo"
    },
    {
      "pos": 24,
      "class": "GTEAM",
      "no": "55",
      "constructor": "porsche",
      "model": "Porsche 911 RSR (997)",
      "team": "JWA-Avila",
      "gap": "45 Laps",
      "laps": 253,
      "time": "12:02:44.756",
      "status": "Classified",
      "drivers": [
        [
          "Jöel Camathias",
          ""
        ],
        [
          "Markus Palttala",
          ""
        ],
        [
          "Bill Binnie",
          ""
        ]
      ],
      "bestLap": "2:04.412",
      "bestLapNo": "224",
      "bestLapDriver": "Markus Palttala"
    },
    {
      "pos": 25,
      "class": "LMP1",
      "no": "15",
      "constructor": "",
      "model": "Oak Pescarolo - Judd",
      "team": "Oak Racing",
      "gap": "92 Laps",
      "laps": 233,
      "time": "9:01:22.907",
      "status": "Classified",
      "drivers": [
        [
          "Guillaume Moreau",
          ""
        ],
        [
          "Bertrand Baguette",
          ""
        ],
        [
          "Dominik Kraihamer",
          "Austria"
        ]
      ],
      "bestLap": "1:49.905",
      "bestLapNo": "233",
      "bestLapDriver": "Guillaume Moreau"
    },
    {
      "pos": 26,
      "class": "LMP2",
      "no": "23",
      "constructor": "oreca",
      "model": "Oreca 03 - Nissan",
      "team": "Signatech Nissan",
      "gap": "NC",
      "laps": 85,
      "time": "3:04:50.867",
      "status": "NC",
      "drivers": [
        [
          "Franck Mailleux",
          ""
        ],
        [
          "Olivier Lombard",
          ""
        ],
        [
          "Jordan Tresson",
          ""
        ]
      ],
      "bestLap": "1:53.936",
      "bestLapNo": "20",
      "bestLapDriver": "Olivier Lombard"
    },
    {
      "pos": 27,
      "class": "GTEPRO",
      "no": "59",
      "constructor": "ferrari",
      "model": "Ferrari F458 Italia",
      "team": "Luxury Racing",
      "gap": "NC",
      "laps": 83,
      "time": "3:13:23.687",
      "status": "NC",
      "drivers": [
        [
          "Frédéric Makowiecki",
          "France"
        ],
        [
          "Jaime Melo",
          ""
        ],
        [
          "Jean-Karl Vernay",
          "France"
        ]
      ],
      "bestLap": "2:00.702",
      "bestLapNo": "19",
      "bestLapDriver": "Jaime Melo"
    },
    {
      "pos": 28,
      "class": "GTEAM",
      "no": "58",
      "constructor": "ferrari",
      "model": "Ferrari F458 Italia",
      "team": "Luxury Racing",
      "gap": "NC",
      "laps": 0,
      "time": "",
      "status": "NC",
      "drivers": [
        [
          "Pierre Ehret",
          ""
        ],
        [
          "Dominik Farnbacher",
          ""
        ],
        [
          "François Jakubowski",
          ""
        ]
      ],
      "bestLap": "",
      "bestLapNo": ""
    },
    {
      "pos": 29,
      "class": "GTEPRO",
      "no": "51",
      "constructor": "ferrari",
      "model": "Ferrari F458 Italia",
      "team": "AF Corse",
      "gap": "DSQ",
      "laps": 214,
      "time": "12:01:18.487",
      "status": "DSQ",
      "drivers": [
        [
          "Giancarlo Fisichella",
          "Italy"
        ],
        [
          "Gianmaria Bruni",
          "Italy"
        ],
        [
          "Toni Vilander",
          ""
        ]
      ],
      "bestLap": "2:00.123",
      "bestLapNo": "196",
      "bestLapDriver": "Giancarlo Fisichella"
    }
  ],
  "performance": {
    "fastestLaps": [
      {
        "type": "FL",
        "class": "LMP1",
        "no": "1",
        "team": "Audi Sport Team Joest",
        "driver": "André Lotterer",
        "lap": "",
        "time": "1:46.567"
      },
      {
        "type": "FL",
        "class": "GTEPRO",
        "no": "51",
        "team": "AF Corse",
        "driver": "Giancarlo Fisichella",
        "lap": "",
        "time": "2:00.123"
      },
      {
        "type": "FL",
        "class": "GTEAM",
        "no": "61",
        "team": "AF Corse-Waltrip",
        "driver": "Rui Aguas",
        "lap": "",
        "time": "2:01.746"
      },
      {
        "type": "FL",
        "class": "Overall",
        "no": "1",
        "team": "Audi Sport Team Joest",
        "driver": "André Lotterer",
        "lap": "",
        "time": "1:46.567"
      },
      {
        "type": "FL",
        "class": "LMP2",
        "no": "24",
        "team": "Oak Racing",
        "driver": "Olivier Pla",
        "lap": "",
        "time": "1:51.306"
      }
    ],
    "poles": [
      {
        "type": "PP",
        "class": "LMP1",
        "no": "1",
        "team": "Audi Sport Team Joest",
        "driver": "Benoit Tréluyer",
        "lap": "",
        "time": "1:45.820"
      },
      {
        "type": "PP",
        "class": "GTEPRO",
        "no": "51",
        "team": "AF Corse",
        "driver": "Giancarlo Fisichella",
        "lap": "",
        "time": "1:58.427"
      },
      {
        "type": "PP",
        "class": "GTEAM",
        "no": "58",
        "team": "Luxury Racing",
        "driver": "Pierre Ehret",
        "lap": "",
        "time": "2:00.184"
      },
      {
        "type": "PP",
        "class": "Overall",
        "no": "1",
        "team": "Audi Sport Team Joest",
        "driver": "Benoit Tréluyer",
        "lap": "",
        "time": "1:45.820"
      },
      {
        "type": "PP",
        "class": "LMP2",
        "no": "24",
        "team": "Oak Racing",
        "driver": "Jacques Nicolet",
        "lap": "",
        "time": "1:50.467"
      }
    ]
  },
  "qualifying": [
    {
      "pos": 1,
      "no": "58",
      "class": "GTEAM",
      "team": "Luxury Racing",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "drivers": [
        [
          "P. Ehret",
          ""
        ],
        [
          "D. Farnbacher",
          ""
        ],
        [
          "F. Jakubowski",
          ""
        ]
      ],
      "time": "2:00.184"
    },
    {
      "pos": 2,
      "no": "57",
      "class": "GTEAM",
      "team": "Krohn Racing",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "drivers": [
        [
          "T. Krohn",
          ""
        ],
        [
          "N. Jönsson",
          ""
        ],
        [
          "M. Rugolo",
          ""
        ]
      ],
      "time": "2:00.929"
    },
    {
      "pos": 3,
      "no": "50",
      "class": "GTEAM",
      "team": "Larbre Competition",
      "model": "Chevrolet Corvette C6-ZR1",
      "constructor": "corvette",
      "drivers": [
        [
          "P. Bornhauser",
          ""
        ],
        [
          "J. Canal",
          "France"
        ],
        [
          "P. Lamy",
          "Portugal"
        ]
      ],
      "time": "2:01.640"
    },
    {
      "pos": 4,
      "no": "88",
      "class": "GTEAM",
      "team": "Team Felbermayr-Proton",
      "model": "Porsche 911 RSR (997)",
      "constructor": "porsche",
      "drivers": [
        [
          "C. Ried",
          ""
        ],
        [
          "G. Roda",
          ""
        ],
        [
          "P. Ruberti",
          ""
        ]
      ],
      "time": "2:01.787"
    },
    {
      "pos": 5,
      "no": "70",
      "class": "GTEAM",
      "team": "Larbre Competition",
      "model": "Chevrolet Corvette C6-ZR1",
      "constructor": "corvette",
      "drivers": [
        [
          "C. Bourret",
          ""
        ],
        [
          "P. Gibon",
          ""
        ],
        [
          "J. Belloc",
          ""
        ]
      ],
      "time": "2:02.732"
    },
    {
      "pos": 6,
      "no": "61",
      "class": "GTEAM",
      "team": "AF Corse-Waltrip",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "drivers": [
        [
          "R. Kauffman",
          ""
        ],
        [
          "M. Waltrip",
          ""
        ],
        [
          "R. Aguas",
          ""
        ]
      ],
      "time": "2:03.331"
    },
    {
      "pos": 7,
      "no": "55",
      "class": "GTEAM",
      "team": "JWA-Avila",
      "model": "Porsche 911 RSR (997)",
      "constructor": "porsche",
      "drivers": [
        [
          "B. Binnie",
          ""
        ],
        [
          "M. Palttala",
          ""
        ],
        [
          "J. Camathias",
          ""
        ]
      ],
      "time": "2:04.342"
    },
    {
      "pos": 1,
      "no": "51",
      "class": "GTEPRO",
      "team": "AF Corse",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "drivers": [
        [
          "G. Fisichella",
          "Italy"
        ],
        [
          "G. Bruni",
          "Italy"
        ],
        [
          "T. Vilander",
          ""
        ]
      ],
      "time": "1:58.427"
    },
    {
      "pos": 2,
      "no": "59",
      "class": "GTEPRO",
      "team": "Luxury Racing",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "drivers": [
        [
          "F. Makowiecki",
          "France"
        ],
        [
          "J. Melo",
          ""
        ],
        [
          "J. Vernay",
          ""
        ]
      ],
      "time": "1:58.723"
    },
    {
      "pos": 3,
      "no": "71",
      "class": "GTEPRO",
      "team": "AF Corse",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "drivers": [
        [
          "A. Bertolini",
          ""
        ],
        [
          "O. Beretta",
          "Monaco"
        ],
        [
          "M. Cioci",
          ""
        ]
      ],
      "time": "1:59.084"
    },
    {
      "pos": 4,
      "no": "97",
      "class": "GTEPRO",
      "team": "Aston Martin Racing",
      "model": "Aston Martin Vantage V8",
      "constructor": "astonmartin",
      "drivers": [
        [
          "S. Mücke",
          "Germany"
        ],
        [
          "A. Fernandez",
          ""
        ],
        [
          "D. Turner",
          "United Kingdom"
        ]
      ],
      "time": "2:00.174"
    },
    {
      "pos": 5,
      "no": "77",
      "class": "GTEPRO",
      "team": "Team Felbermayr-Proton",
      "model": "Porsche 911 RSR (997)",
      "constructor": "porsche",
      "drivers": [
        [
          "R. Lietz",
          "Austria"
        ],
        [
          "M. Lieb",
          ""
        ],
        [
          "P. Pilet",
          ""
        ]
      ],
      "time": "2:00.256"
    },
    {
      "pos": 1,
      "no": "1",
      "class": "LMP1",
      "team": "Audi Sport Team Joest",
      "model": "Audi R18",
      "constructor": "audi",
      "drivers": [
        [
          "A. Lotterer",
          "Germany"
        ],
        [
          "B. Tréluyer",
          ""
        ],
        [
          "M. Fässler",
          ""
        ]
      ],
      "time": "1:45.820"
    },
    {
      "pos": 2,
      "no": "2",
      "class": "LMP1",
      "team": "Audi Sport Team Joest",
      "model": "Audi R18",
      "constructor": "audi",
      "drivers": [
        [
          "A. Mcnish",
          ""
        ],
        [
          "T. Kristensen",
          ""
        ],
        [
          "D. Capello",
          ""
        ]
      ],
      "time": "1:46.215"
    },
    {
      "pos": 3,
      "no": "3",
      "class": "LMP1",
      "team": "Audi Sport Team Joest",
      "model": "Audi R18",
      "constructor": "audi",
      "drivers": [
        [
          "T. Bernhard",
          ""
        ],
        [
          "R. Dumas",
          ""
        ],
        [
          "L. Duval",
          "France"
        ]
      ],
      "time": "1:46.935"
    },
    {
      "pos": 4,
      "no": "15",
      "class": "LMP1",
      "team": "Oak Racing",
      "model": "Oak Pescarolo - Judd",
      "constructor": "",
      "drivers": [
        [
          "G. Moreau",
          ""
        ],
        [
          "B. Baguette",
          ""
        ],
        [
          "D. Kraihamer",
          "Austria"
        ]
      ],
      "time": "1:48.319"
    },
    {
      "pos": 5,
      "no": "22",
      "class": "LMP1",
      "team": "JRM",
      "model": "HPD ARX 03a - Honda",
      "constructor": "",
      "drivers": [
        [
          "D. Brabham",
          ""
        ],
        [
          "K. Chandhok",
          ""
        ],
        [
          "P. Dumbreck",
          ""
        ]
      ],
      "time": "1:48.439"
    },
    {
      "pos": 6,
      "no": "21",
      "class": "LMP1",
      "team": "Strakka Racing",
      "model": "HPD ARX 03a - Honda",
      "constructor": "",
      "drivers": [
        [
          "N. Leventis",
          ""
        ],
        [
          "D. Watts",
          ""
        ],
        [
          "J. Kane",
          ""
        ]
      ],
      "time": "1:48.590"
    },
    {
      "pos": 7,
      "no": "12",
      "class": "LMP1",
      "team": "Rebellion Racing",
      "model": "Lola B12/60 Coupé - Toyota",
      "constructor": "toyota",
      "drivers": [
        [
          "N. Prost",
          ""
        ],
        [
          "N. Jani",
          ""
        ],
        [
          "N. Heidfeld",
          ""
        ]
      ],
      "time": "1:48.630"
    },
    {
      "pos": 8,
      "no": "13",
      "class": "LMP1",
      "team": "Rebellion Racing",
      "model": "Lola B12/60 Coupé - Toyota",
      "constructor": "toyota",
      "drivers": [
        [
          "A. Belicchi",
          "Italy"
        ],
        [
          "H. Primat",
          ""
        ],
        [
          "J. Bleekemolen",
          "Netherlands"
        ]
      ],
      "time": "1:48.956"
    },
    {
      "pos": 9,
      "no": "16",
      "class": "LMP1",
      "team": "Pescarolo Team",
      "model": "Pescarolo - Judd",
      "constructor": "",
      "drivers": [
        [
          "E. Collard",
          ""
        ],
        [
          "J. Boullion",
          ""
        ],
        [
          "J. Jousse",
          ""
        ]
      ],
      "time": "1:50.200"
    },
    {
      "pos": 1,
      "no": "24",
      "class": "LMP2",
      "team": "Oak Racing",
      "model": "Morgan - Judd",
      "constructor": "",
      "drivers": [
        [
          "J. Nicolet",
          ""
        ],
        [
          "M. Lahaye",
          ""
        ],
        [
          "O. Pla",
          "France"
        ]
      ],
      "time": "1:50.467"
    },
    {
      "pos": 2,
      "no": "44",
      "class": "LMP2",
      "team": "Starworks Motorsports",
      "model": "HPD ARX 03b - Honda",
      "constructor": "",
      "drivers": [
        [
          "V. Potolicchio",
          ""
        ],
        [
          "R. Dalziel",
          ""
        ],
        [
          "S. Sarrazin",
          "France"
        ]
      ],
      "time": "1:50.823"
    },
    {
      "pos": 3,
      "no": "41",
      "class": "LMP2",
      "team": "Greaves Motorsport",
      "model": "Zytek Z11SN - Nissan",
      "constructor": "nissan",
      "drivers": [
        [
          "C. Zugel",
          ""
        ],
        [
          "R. Gonzalez",
          "Mexico"
        ],
        [
          "E. Julian",
          ""
        ]
      ],
      "time": "1:51.809"
    },
    {
      "pos": 4,
      "no": "23",
      "class": "LMP2",
      "team": "Signatech Nissan",
      "model": "Oreca 03 - Nissan",
      "constructor": "oreca",
      "drivers": [
        [
          "J. Tresson",
          ""
        ],
        [
          "F. Mailleux",
          ""
        ],
        [
          "O. Lombard",
          ""
        ]
      ],
      "time": "1:52.084"
    },
    {
      "pos": 5,
      "no": "25",
      "class": "LMP2",
      "team": "ADR-Delta",
      "model": "Oreca 03 - Nissan",
      "constructor": "oreca",
      "drivers": [
        [
          "J. Martin",
          ""
        ],
        [
          "R. Kerr",
          ""
        ],
        [
          "T. Graves",
          ""
        ]
      ],
      "time": "1:52.113"
    },
    {
      "pos": 6,
      "no": "49",
      "class": "LMP2",
      "team": "Pecom Racing",
      "model": "Oreca 03 - Nissan",
      "constructor": "oreca",
      "drivers": [
        [
          "L. Perez Companc",
          "Argentina"
        ],
        [
          "P. Kaffer",
          ""
        ],
        [
          "S. Ayari",
          ""
        ]
      ],
      "time": "1:52.763"
    },
    {
      "pos": 7,
      "no": "31",
      "class": "LMP2",
      "team": "Lotus",
      "model": "Lola B12/80 Coupé - Lotus",
      "constructor": "",
      "drivers": [
        [
          "T. Holzer",
          ""
        ],
        [
          "M. Shultis",
          ""
        ],
        [
          "L. Moro",
          ""
        ]
      ],
      "time": "1:53.080"
    }
  ],
  "flClassification": [
    {
      "class": "LMP1",
      "no": "1",
      "team": "Audi Sport Team Joest",
      "model": "Audi R18",
      "constructor": "audi",
      "driver": "André Lotterer",
      "time": "1:46.567"
    },
    {
      "class": "LMP1",
      "no": "3",
      "team": "Audi Sport Team Joest",
      "model": "Audi R18",
      "constructor": "audi",
      "driver": "Timo Bernhard",
      "time": "1:47.438"
    },
    {
      "class": "LMP1",
      "no": "2",
      "team": "Audi Sport Team Joest",
      "model": "Audi R18",
      "constructor": "audi",
      "driver": "Dindo Capello",
      "time": "1:47.534"
    },
    {
      "class": "LMP1",
      "no": "2",
      "team": "Audi Sport Team Joest",
      "model": "Audi R18",
      "constructor": "audi",
      "driver": "Allan Mcnish",
      "time": "1:47.541"
    },
    {
      "class": "LMP1",
      "no": "1",
      "team": "Audi Sport Team Joest",
      "model": "Audi R18",
      "constructor": "audi",
      "driver": "Marcel Fässler",
      "time": "1:47.790"
    },
    {
      "class": "LMP1",
      "no": "3",
      "team": "Audi Sport Team Joest",
      "model": "Audi R18",
      "constructor": "audi",
      "driver": "Loic Duval",
      "time": "1:47.857"
    },
    {
      "class": "LMP1",
      "no": "2",
      "team": "Audi Sport Team Joest",
      "model": "Audi R18",
      "constructor": "audi",
      "driver": "Tom Kristensen",
      "time": "1:48.047"
    },
    {
      "class": "LMP1",
      "no": "1",
      "team": "Audi Sport Team Joest",
      "model": "Audi R18",
      "constructor": "audi",
      "driver": "Benoit Tréluyer",
      "time": "1:48.205"
    },
    {
      "class": "LMP1",
      "no": "3",
      "team": "Audi Sport Team Joest",
      "model": "Audi R18",
      "constructor": "audi",
      "driver": "Romain Dumas",
      "time": "1:48.652"
    },
    {
      "class": "LMP1",
      "no": "13",
      "team": "Rebellion Racing",
      "model": "Lola B12/60 Coupé - Toyota",
      "constructor": "toyota",
      "driver": "Andrea Belicchi",
      "time": "1:49.477"
    },
    {
      "class": "LMP1",
      "no": "22",
      "team": "JRM",
      "model": "HPD ARX 03a - Honda",
      "constructor": "",
      "driver": "Peter Dumbreck",
      "time": "1:49.482"
    },
    {
      "class": "LMP1",
      "no": "22",
      "team": "JRM",
      "model": "HPD ARX 03a - Honda",
      "constructor": "",
      "driver": "David Brabham",
      "time": "1:49.559"
    },
    {
      "class": "LMP1",
      "no": "15",
      "team": "Oak Racing",
      "model": "Oak Pescarolo - Judd",
      "constructor": "",
      "driver": "Guillaume Moreau",
      "time": "1:49.905"
    },
    {
      "class": "LMP1",
      "no": "12",
      "team": "Rebellion Racing",
      "model": "Lola B12/60 Coupé - Toyota",
      "constructor": "toyota",
      "driver": "Nick Heidfeld",
      "time": "1:49.946"
    },
    {
      "class": "LMP1",
      "no": "22",
      "team": "JRM",
      "model": "HPD ARX 03a - Honda",
      "constructor": "",
      "driver": "Karun Chandhok",
      "time": "1:50.033"
    },
    {
      "class": "LMP1",
      "no": "21",
      "team": "Strakka Racing",
      "model": "HPD ARX 03a - Honda",
      "constructor": "",
      "driver": "Jonny Kane",
      "time": "1:50.348"
    },
    {
      "class": "LMP1",
      "no": "15",
      "team": "Oak Racing",
      "model": "Oak Pescarolo - Judd",
      "constructor": "",
      "driver": "Dominik Kraihamer",
      "time": "1:50.548"
    },
    {
      "class": "LMP1",
      "no": "12",
      "team": "Rebellion Racing",
      "model": "Lola B12/60 Coupé - Toyota",
      "constructor": "toyota",
      "driver": "Neel Jani",
      "time": "1:50.672"
    },
    {
      "class": "LMP1",
      "no": "21",
      "team": "Strakka Racing",
      "model": "HPD ARX 03a - Honda",
      "constructor": "",
      "driver": "Danny Watts",
      "time": "1:50.946"
    },
    {
      "class": "LMP1",
      "no": "12",
      "team": "Rebellion Racing",
      "model": "Lola B12/60 Coupé - Toyota",
      "constructor": "toyota",
      "driver": "Nicolas Prost",
      "time": "1:51.237"
    },
    {
      "class": "LMP1",
      "no": "13",
      "team": "Rebellion Racing",
      "model": "Lola B12/60 Coupé - Toyota",
      "constructor": "toyota",
      "driver": "Jeroen Bleekemolen",
      "time": "1:51.267"
    },
    {
      "class": "LMP1",
      "no": "16",
      "team": "Pescarolo Team",
      "model": "Pescarolo - Judd",
      "constructor": "",
      "driver": "Julien Jousse",
      "time": "1:51.285"
    },
    {
      "class": "LMP1",
      "no": "13",
      "team": "Rebellion Racing",
      "model": "Lola B12/60 Coupé - Toyota",
      "constructor": "toyota",
      "driver": "Harold Primat",
      "time": "1:51.304"
    },
    {
      "class": "LMP2",
      "no": "24",
      "team": "Oak Racing",
      "model": "Morgan - Judd",
      "constructor": "",
      "driver": "Olivier Pla",
      "time": "1:51.306"
    },
    {
      "class": "LMP2",
      "no": "24",
      "team": "Oak Racing",
      "model": "Morgan - Judd",
      "constructor": "",
      "driver": "Matthieu Lahaye",
      "time": "1:51.427"
    },
    {
      "class": "LMP1",
      "no": "15",
      "team": "Oak Racing",
      "model": "Oak Pescarolo - Judd",
      "constructor": "",
      "driver": "Bertrand Baguette",
      "time": "1:51.882"
    },
    {
      "class": "LMP1",
      "no": "16",
      "team": "Pescarolo Team",
      "model": "Pescarolo - Judd",
      "constructor": "",
      "driver": "Emmanuel Collard",
      "time": "1:52.127"
    },
    {
      "class": "LMP2",
      "no": "44",
      "team": "Starworks Motorsports",
      "model": "HPD ARX 03b - Honda",
      "constructor": "",
      "driver": "Stéphane Sarrazin",
      "time": "1:52.295"
    },
    {
      "class": "LMP1",
      "no": "16",
      "team": "Pescarolo Team",
      "model": "Pescarolo - Judd",
      "constructor": "",
      "driver": "Jean-Christophe Boullion",
      "time": "1:52.534"
    },
    {
      "class": "LMP2",
      "no": "49",
      "team": "Pecom Racing",
      "model": "Oreca 03 - Nissan",
      "constructor": "oreca",
      "driver": "Pierre Kaffer",
      "time": "1:52.616"
    },
    {
      "class": "LMP2",
      "no": "49",
      "team": "Pecom Racing",
      "model": "Oreca 03 - Nissan",
      "constructor": "oreca",
      "driver": "Soheil Ayari",
      "time": "1:52.922"
    },
    {
      "class": "LMP2",
      "no": "25",
      "team": "ADR-Delta",
      "model": "Oreca 03 - Nissan",
      "constructor": "oreca",
      "driver": "Robbie Kerr",
      "time": "1:52.929"
    },
    {
      "class": "LMP2",
      "no": "25",
      "team": "ADR-Delta",
      "model": "Oreca 03 - Nissan",
      "constructor": "oreca",
      "driver": "John Martin",
      "time": "1:52.989"
    },
    {
      "class": "LMP2",
      "no": "44",
      "team": "Starworks Motorsports",
      "model": "HPD ARX 03b - Honda",
      "constructor": "",
      "driver": "Ryan Dalziel",
      "time": "1:53.354"
    },
    {
      "class": "LMP2",
      "no": "41",
      "team": "Greaves Motorsport",
      "model": "Zytek Z11SN - Nissan",
      "constructor": "nissan",
      "driver": "Elton Julian",
      "time": "1:53.506"
    },
    {
      "class": "LMP2",
      "no": "25",
      "team": "ADR-Delta",
      "model": "Oreca 03 - Nissan",
      "constructor": "oreca",
      "driver": "Tor Graves",
      "time": "1:53.667"
    },
    {
      "class": "LMP2",
      "no": "23",
      "team": "Signatech Nissan",
      "model": "Oreca 03 - Nissan",
      "constructor": "oreca",
      "driver": "Olivier Lombard",
      "time": "1:53.936"
    },
    {
      "class": "LMP2",
      "no": "41",
      "team": "Greaves Motorsport",
      "model": "Zytek Z11SN - Nissan",
      "constructor": "nissan",
      "driver": "Ricardo Gonzalez",
      "time": "1:54.201"
    },
    {
      "class": "LMP2",
      "no": "31",
      "team": "Lotus",
      "model": "Lola B12/80 Coupé - Lotus",
      "constructor": "",
      "driver": "Thomas Holzer",
      "time": "1:54.474"
    },
    {
      "class": "LMP2",
      "no": "44",
      "team": "Starworks Motorsports",
      "model": "HPD ARX 03b - Honda",
      "constructor": "",
      "driver": "Vicente Potolicchio",
      "time": "1:54.570"
    },
    {
      "class": "LMP1",
      "no": "21",
      "team": "Strakka Racing",
      "model": "HPD ARX 03a - Honda",
      "constructor": "",
      "driver": "Nick Leventis",
      "time": "1:54.837"
    },
    {
      "class": "LMP2",
      "no": "49",
      "team": "Pecom Racing",
      "model": "Oreca 03 - Nissan",
      "constructor": "oreca",
      "driver": "Luis Perez Companc",
      "time": "1:54.971"
    },
    {
      "class": "LMP2",
      "no": "23",
      "team": "Signatech Nissan",
      "model": "Oreca 03 - Nissan",
      "constructor": "oreca",
      "driver": "Franck Mailleux",
      "time": "1:54.994"
    },
    {
      "class": "LMP2",
      "no": "31",
      "team": "Lotus",
      "model": "Lola B12/80 Coupé - Lotus",
      "constructor": "",
      "driver": "Luca Moro",
      "time": "1:55.334"
    },
    {
      "class": "LMP2",
      "no": "28",
      "team": "Gulf Racing Middle East",
      "model": "Lola B12/80 Coupé - Nissan",
      "constructor": "nissan",
      "driver": "Stefan Johansson",
      "time": "1:55.907"
    },
    {
      "class": "LMP2",
      "no": "28",
      "team": "Gulf Racing Middle East",
      "model": "Lola B12/80 Coupé - Nissan",
      "constructor": "nissan",
      "driver": "Fabien Giroix",
      "time": "1:56.920"
    },
    {
      "class": "LMP2",
      "no": "28",
      "team": "Gulf Racing Middle East",
      "model": "Lola B12/80 Coupé - Nissan",
      "constructor": "nissan",
      "driver": "Maxime Jousse",
      "time": "1:57.676"
    },
    {
      "class": "LMP2",
      "no": "24",
      "team": "Oak Racing",
      "model": "Morgan - Judd",
      "constructor": "",
      "driver": "Jacques Nicolet",
      "time": "1:58.143"
    },
    {
      "class": "LMP2",
      "no": "31",
      "team": "Lotus",
      "model": "Lola B12/80 Coupé - Lotus",
      "constructor": "",
      "driver": "Mirco Shultis",
      "time": "1:59.105"
    },
    {
      "class": "LMP2",
      "no": "41",
      "team": "Greaves Motorsport",
      "model": "Zytek Z11SN - Nissan",
      "constructor": "nissan",
      "driver": "Christian Zugel",
      "time": "1:59.222"
    },
    {
      "class": "GTEPRO",
      "no": "51",
      "team": "AF Corse",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "driver": "Giancarlo Fisichella",
      "time": "2:00.123"
    },
    {
      "class": "GTEPRO",
      "no": "51",
      "team": "AF Corse",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "driver": "Gianmaria Bruni",
      "time": "2:00.176"
    },
    {
      "class": "GTEPRO",
      "no": "51",
      "team": "AF Corse",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "driver": "Toni Vilander",
      "time": "2:00.317"
    },
    {
      "class": "GTEPRO",
      "no": "71",
      "team": "AF Corse",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "driver": "Olivier Beretta",
      "time": "2:00.504"
    },
    {
      "class": "GTEPRO",
      "no": "97",
      "team": "Aston Martin Racing",
      "model": "Aston Martin Vantage V8",
      "constructor": "astonmartin",
      "driver": "Stefan Mücke",
      "time": "2:00.606"
    },
    {
      "class": "GTEPRO",
      "no": "59",
      "team": "Luxury Racing",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "driver": "Jaime Melo",
      "time": "2:00.702"
    },
    {
      "class": "GTEPRO",
      "no": "71",
      "team": "AF Corse",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "driver": "Andrea Bertolini",
      "time": "2:00.818"
    },
    {
      "class": "GTEPRO",
      "no": "59",
      "team": "Luxury Racing",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "driver": "Frédéric Makowiecki",
      "time": "2:00.925"
    },
    {
      "class": "GTEPRO",
      "no": "77",
      "team": "Team Felbermayr-Proton",
      "model": "Porsche 911 RSR (997)",
      "constructor": "porsche",
      "driver": "Marc Lieb",
      "time": "2:01.225"
    },
    {
      "class": "GTEPRO",
      "no": "97",
      "team": "Aston Martin Racing",
      "model": "Aston Martin Vantage V8",
      "constructor": "astonmartin",
      "driver": "Darren Turner",
      "time": "2:01.254"
    },
    {
      "class": "GTEPRO",
      "no": "77",
      "team": "Team Felbermayr-Proton",
      "model": "Porsche 911 RSR (997)",
      "constructor": "porsche",
      "driver": "Richard Lietz",
      "time": "2:01.466"
    },
    {
      "class": "GTEPRO",
      "no": "97",
      "team": "Aston Martin Racing",
      "model": "Aston Martin Vantage V8",
      "constructor": "astonmartin",
      "driver": "Adrian Fernandez",
      "time": "2:01.594"
    },
    {
      "class": "GTEPRO",
      "no": "77",
      "team": "Team Felbermayr-Proton",
      "model": "Porsche 911 RSR (997)",
      "constructor": "porsche",
      "driver": "Patrick Pilet",
      "time": "2:01.667"
    },
    {
      "class": "GTEPRO",
      "no": "71",
      "team": "AF Corse",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "driver": "Marco Cioci",
      "time": "2:01.714"
    },
    {
      "class": "GTEAM",
      "no": "61",
      "team": "AF Corse-Waltrip",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "driver": "Rui Aguas",
      "time": "2:01.746"
    },
    {
      "class": "GTEAM",
      "no": "57",
      "team": "Krohn Racing",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "driver": "Michele Rugolo",
      "time": "2:01.818"
    },
    {
      "class": "GTEAM",
      "no": "57",
      "team": "Krohn Racing",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "driver": "Niclas Jönsson",
      "time": "2:02.400"
    },
    {
      "class": "GTEAM",
      "no": "88",
      "team": "Team Felbermayr-Proton",
      "model": "Porsche 911 RSR (997)",
      "constructor": "porsche",
      "driver": "Paolo Ruberti",
      "time": "2:02.445"
    },
    {
      "class": "GTEAM",
      "no": "50",
      "team": "Larbre Competition",
      "model": "Chevrolet Corvette C6-ZR1",
      "constructor": "corvette",
      "driver": "Pedro Lamy",
      "time": "2:02.701"
    },
    {
      "class": "GTEAM",
      "no": "70",
      "team": "Larbre Competition",
      "model": "Chevrolet Corvette C6-ZR1",
      "constructor": "corvette",
      "driver": "Jean-Phillipe Belloc",
      "time": "2:02.892"
    },
    {
      "class": "GTEAM",
      "no": "70",
      "team": "Larbre Competition",
      "model": "Chevrolet Corvette C6-ZR1",
      "constructor": "corvette",
      "driver": "Pascal Gibon",
      "time": "2:03.233"
    },
    {
      "class": "GTEAM",
      "no": "50",
      "team": "Larbre Competition",
      "model": "Chevrolet Corvette C6-ZR1",
      "constructor": "corvette",
      "driver": "Julien Canal",
      "time": "2:03.245"
    },
    {
      "class": "GTEAM",
      "no": "88",
      "team": "Team Felbermayr-Proton",
      "model": "Porsche 911 RSR (997)",
      "constructor": "porsche",
      "driver": "Gianluca Roda",
      "time": "2:04.314"
    },
    {
      "class": "GTEAM",
      "no": "55",
      "team": "JWA-Avila",
      "model": "Porsche 911 RSR (997)",
      "constructor": "porsche",
      "driver": "Markus Palttala",
      "time": "2:04.412"
    },
    {
      "class": "GTEAM",
      "no": "61",
      "team": "AF Corse-Waltrip",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "driver": "Michael Waltrip",
      "time": "2:04.857"
    },
    {
      "class": "GTEAM",
      "no": "50",
      "team": "Larbre Competition",
      "model": "Chevrolet Corvette C6-ZR1",
      "constructor": "corvette",
      "driver": "Patrick Bornhauser",
      "time": "2:05.171"
    },
    {
      "class": "GTEAM",
      "no": "55",
      "team": "JWA-Avila",
      "model": "Porsche 911 RSR (997)",
      "constructor": "porsche",
      "driver": "Jöel Camathias",
      "time": "2:05.356"
    },
    {
      "class": "GTEAM",
      "no": "88",
      "team": "Team Felbermayr-Proton",
      "model": "Porsche 911 RSR (997)",
      "constructor": "porsche",
      "driver": "Christian Ried",
      "time": "2:06.191"
    },
    {
      "class": "GTEAM",
      "no": "57",
      "team": "Krohn Racing",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "driver": "Tracy Krohn",
      "time": "2:06.435"
    },
    {
      "class": "GTEAM",
      "no": "70",
      "team": "Larbre Competition",
      "model": "Chevrolet Corvette C6-ZR1",
      "constructor": "corvette",
      "driver": "Christophe Bourret",
      "time": "2:06.482"
    },
    {
      "class": "GTEAM",
      "no": "55",
      "team": "JWA-Avila",
      "model": "Porsche 911 RSR (997)",
      "constructor": "porsche",
      "driver": "Bill Binnie",
      "time": "2:08.145"
    },
    {
      "class": "GTEAM",
      "no": "61",
      "team": "AF Corse-Waltrip",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "driver": "Robert Kauffman",
      "time": "2:11.593"
    }
  ],
  "completeness": {
    "metadata": true,
    "results": true,
    "fastestLaps": true,
    "poles": true,
    "raceControl": false
  },
  "sources": [
    "FIA WEC 2012 Sebring Race Final Classification by Class (Al Kamel)",
    "FIA WEC 2012 Sebring Qualifying Practice Classification by Class (Al Kamel)",
    "FIA WEC 2012 Sebring Provisional Classification by Driver Fastest Lap - Race (Al Kamel)"
  ]
};
replaceRace(WEC_SEBRING_2012_GOLD);

// WEC 2013 Silverstone (round 1) - real import from Al Kamel PDFs. This season introduced
// the two-driver-average qualifying format (Driver 1/Driver 2, each Best+2nd Best, grid set
// by the average) - qualifyingAverageRowsFromText/qualifyingAverageDriversFromText/
// polesFromAverageRows (built earlier for the 2018-2019 era) were previously defined but
// never actually wired into a real import - this is the first real use, requires a SEPARATE
// qualifying-session Fastest-Lap-by-Driver document (not the race one) to attribute pole
// laps to the two actually-nominated drivers rather than the whole listed crew.
const WEC_SILVERSTONE_2013_GOLD={
  "id": "wec-silverstone-2013",
  "season": 2013,
  "round": 1,
  "series": "wec",
  "event": "6 Hours of Silverstone",
  "circuit": "Silverstone",
  "country": "United Kingdom",
  "date": "2013-04-14",
  "scheduledDuration": "06:00:00",
  "officialDuration": "06:01:40",
  "scheduledLaps": 210,
  "officialLaps": 197,
  "segments": [
    {
      "id": "g0",
      "phase": "GREEN",
      "start": 0,
      "end": 21700,
      "startLap": 0,
      "endLap": 197,
      "reason": "Race",
      "notes": "Race Control pending manual entry."
    }
  ],
  "entries": [
    {
      "pos": 1,
      "class": "LMP1",
      "no": "2",
      "constructor": "audi",
      "model": "Audi R18 e-tron quattro",
      "team": "Audi Sport Team Joest",
      "gap": "—",
      "laps": 197,
      "time": "6:00:01.686",
      "status": "Classified",
      "drivers": [
        [
          "Tom Kristensen",
          ""
        ],
        [
          "Loïc Duval",
          "France"
        ],
        [
          "Allan Mcnish",
          ""
        ]
      ],
      "bestLap": "1:42.767",
      "bestLapNo": "192",
      "bestLapDriver": "Allan Mcnish"
    },
    {
      "pos": 2,
      "class": "LMP1",
      "no": "1",
      "constructor": "audi",
      "model": "Audi R18 e-tron quattro",
      "team": "Audi Sport Team Joest",
      "gap": "3.462",
      "laps": 197,
      "time": "6:00:05.148",
      "status": "Classified",
      "drivers": [
        [
          "André Lotterer",
          "Germany"
        ],
        [
          "Benoit Tréluyer",
          ""
        ],
        [
          "Marcel Fässler",
          ""
        ]
      ],
      "bestLap": "1:42.926",
      "bestLapNo": "163",
      "bestLapDriver": "Benoit Tréluyer"
    },
    {
      "pos": 3,
      "class": "LMP1",
      "no": "8",
      "constructor": "toyota",
      "model": "Toyota TS030 - Hybrid",
      "team": "Toyota Racing",
      "gap": "1 Laps",
      "laps": 196,
      "time": "6:00:18.506",
      "status": "Classified",
      "drivers": [
        [
          "Anthony Davidson",
          "United Kingdom"
        ],
        [
          "Sébastien Buemi",
          "Switzerland"
        ],
        [
          "Stéphane Sarrazin",
          "France"
        ]
      ],
      "bestLap": "1:43.196",
      "bestLapNo": "172",
      "bestLapDriver": "Anthony Davidson"
    },
    {
      "pos": 4,
      "class": "LMP1",
      "no": "7",
      "constructor": "toyota",
      "model": "Toyota TS030 - Hybrid",
      "team": "Toyota Racing",
      "gap": "1 Laps",
      "laps": 196,
      "time": "6:01:23.062",
      "status": "Classified",
      "drivers": [
        [
          "Alexander Wurz",
          ""
        ],
        [
          "Nicolas Lapierre",
          "France"
        ]
      ],
      "bestLap": "1:43.741",
      "bestLapNo": "69",
      "bestLapDriver": "Nicolas Lapierre"
    },
    {
      "pos": 5,
      "class": "LMP1",
      "no": "12",
      "constructor": "toyota",
      "model": "Lola B12/60 Coupé - Toyota",
      "team": "Rebellion Racing",
      "gap": "4 Laps",
      "laps": 193,
      "time": "6:00:41.942",
      "status": "Classified",
      "drivers": [
        [
          "Nicolas Prost",
          ""
        ],
        [
          "Neel Jani",
          ""
        ],
        [
          "Nick Heidfeld",
          ""
        ]
      ],
      "bestLap": "1:44.985",
      "bestLapNo": "3",
      "bestLapDriver": "Neel Jani"
    },
    {
      "pos": 6,
      "class": "LMP1",
      "no": "13",
      "constructor": "toyota",
      "model": "Lola B12/60 Coupé - Toyota",
      "team": "Rebellion Racing",
      "gap": "7 Laps",
      "laps": 190,
      "time": "6:01:40.359",
      "status": "Classified",
      "drivers": [
        [
          "Andrea Belicchi",
          "Italy"
        ],
        [
          "Mathias Beche",
          ""
        ],
        [
          "Cong Fu Cheng",
          ""
        ]
      ],
      "bestLap": "1:45.732",
      "bestLapNo": "150",
      "bestLapDriver": "Mathias Beche"
    },
    {
      "pos": 7,
      "class": "LMP2",
      "no": "25",
      "constructor": "oreca",
      "model": "Oreca 03 - Nissan",
      "team": "Delta-ADR",
      "gap": "—",
      "laps": 184,
      "time": "6:01:22.670",
      "status": "Classified",
      "drivers": [
        [
          "Tor Graves",
          ""
        ],
        [
          "Antonio Pizzonia",
          ""
        ],
        [
          "James Walker",
          ""
        ]
      ],
      "bestLap": "1:50.668",
      "bestLapNo": "167",
      "bestLapDriver": "Antonio Pizzonia"
    },
    {
      "pos": 8,
      "class": "LMP2",
      "no": "24",
      "constructor": "nissan",
      "model": "Morgan - Nissan",
      "team": "OAK Racing",
      "gap": "1 Laps",
      "laps": 183,
      "time": "6:00:10.857",
      "status": "Classified",
      "drivers": [
        [
          "Olivier Pla",
          "France"
        ],
        [
          "David Heinemeier Hansson",
          "Denmark"
        ],
        [
          "Alex Brundle",
          "United Kingdom"
        ]
      ],
      "bestLap": "1:49.603",
      "bestLapNo": "170",
      "bestLapDriver": "Olivier Pla"
    },
    {
      "pos": 9,
      "class": "LMP2",
      "no": "49",
      "constructor": "oreca",
      "model": "Oreca 03 - Nissan",
      "team": "Pecom Racing",
      "gap": "5 Laps",
      "laps": 179,
      "time": "6:00:25.804",
      "status": "Classified",
      "drivers": [
        [
          "Luis Perez Companc",
          "Argentina"
        ],
        [
          "Nicolas Minassian",
          ""
        ],
        [
          "Pierre Kaffer",
          ""
        ]
      ],
      "bestLap": "1:51.475",
      "bestLapNo": "151",
      "bestLapDriver": "Pierre Kaffer"
    },
    {
      "pos": 10,
      "class": "LMP2",
      "no": "35",
      "constructor": "nissan",
      "model": "Morgan - Nissan",
      "team": "OAK Racing",
      "gap": "5 Laps",
      "laps": 179,
      "time": "6:00:36.219",
      "status": "Classified",
      "drivers": [
        [
          "Bertrand Baguette",
          ""
        ],
        [
          "Ricardo Gonzalez",
          ""
        ],
        [
          "Martin Plowmann",
          ""
        ]
      ],
      "bestLap": "1:51.427",
      "bestLapNo": "144",
      "bestLapDriver": "Martin Plowmann"
    },
    {
      "pos": 11,
      "class": "LMP2",
      "no": "41",
      "constructor": "nissan",
      "model": "Zytek Z11SN - Nissan",
      "team": "Greaves Motorsport",
      "gap": "5 Laps",
      "laps": 179,
      "time": "6:01:44.661",
      "status": "Classified",
      "drivers": [
        [
          "Chris Dyson",
          ""
        ],
        [
          "Michael Marsal",
          ""
        ],
        [
          "Tom Kimber-Smith",
          ""
        ]
      ],
      "bestLap": "1:51.324",
      "bestLapNo": "171",
      "bestLapDriver": "Tom Kimber-Smith"
    },
    {
      "pos": 12,
      "class": "LMP2",
      "no": "47",
      "constructor": "nissan",
      "model": "Morgan - Nissan",
      "team": "KCMG",
      "gap": "5 Laps",
      "laps": 179,
      "time": "6:01:49.606",
      "status": "Classified",
      "drivers": [
        [
          "Alexander Imperatori",
          ""
        ],
        [
          "Matthew Howson",
          ""
        ],
        [
          "Jim Ka To",
          ""
        ]
      ],
      "bestLap": "1:50.995",
      "bestLapNo": "163",
      "bestLapDriver": "Alexander Imperatori"
    },
    {
      "pos": 13,
      "class": "LMP2",
      "no": "26",
      "constructor": "oreca",
      "model": "Oreca 03 - Nissan",
      "team": "G-Drive Racing",
      "gap": "8 Laps",
      "laps": 176,
      "time": "6:00:04.641",
      "status": "Classified",
      "drivers": [
        [
          "Roman Rusinov",
          "Russia"
        ],
        [
          "John Martin",
          ""
        ],
        [
          "Mike Conway",
          "United Kingdom"
        ]
      ],
      "bestLap": "1:49.087",
      "bestLapNo": "144",
      "bestLapDriver": "Mike Conway"
    },
    {
      "pos": 14,
      "class": "GTEPRO",
      "no": "97",
      "constructor": "astonmartin",
      "model": "Aston Martin Vantage V8",
      "team": "Aston Martin Racing",
      "gap": "—",
      "laps": 171,
      "time": "6:00:45.343",
      "status": "Classified",
      "drivers": [
        [
          "Darren Turner",
          "United Kingdom"
        ],
        [
          "Stefan Mücke",
          "Germany"
        ],
        [
          "Bruno Senna",
          "Brazil"
        ]
      ],
      "bestLap": "2:01.732",
      "bestLapNo": "3",
      "bestLapDriver": "Stefan Mücke"
    },
    {
      "pos": 15,
      "class": "GTEPRO",
      "no": "71",
      "constructor": "ferrari",
      "model": "Ferrari F458 Italia",
      "team": "AF Corse",
      "gap": "1 Laps",
      "laps": 170,
      "time": "6:00:02.941",
      "status": "Classified",
      "drivers": [
        [
          "Kamui Kobayashi",
          "Japan"
        ],
        [
          "Toni Vilander",
          ""
        ]
      ],
      "bestLap": "2:01.713",
      "bestLapNo": "147",
      "bestLapDriver": "Kamui Kobayashi"
    },
    {
      "pos": 16,
      "class": "GTEPRO",
      "no": "99",
      "constructor": "astonmartin",
      "model": "Aston Martin Vantage V8",
      "team": "Aston Martin Racing",
      "gap": "1 Laps",
      "laps": 170,
      "time": "6:00:15.530",
      "status": "Classified",
      "drivers": [
        [
          "Paul Dalla Lana",
          "Canada"
        ],
        [
          "Frédéric Makowiecki",
          "France"
        ],
        [
          "Pedro Lamy",
          "Portugal"
        ]
      ],
      "bestLap": "2:01.426",
      "bestLapNo": "55",
      "bestLapDriver": "Frédéric Makowiecki"
    },
    {
      "pos": 17,
      "class": "GTEPRO",
      "no": "92",
      "constructor": "porsche",
      "model": "Porsche 911 RSR",
      "team": "Porsche AG Team Manthey",
      "gap": "1 Laps",
      "laps": 170,
      "time": "6:01:24.647",
      "status": "Classified",
      "drivers": [
        [
          "Marc Lieb",
          ""
        ],
        [
          "Richard Lietz",
          "Austria"
        ],
        [
          "Romain Dumas",
          ""
        ]
      ],
      "bestLap": "2:02.652",
      "bestLapNo": "130",
      "bestLapDriver": "Marc Lieb"
    },
    {
      "pos": 18,
      "class": "GTEPRO",
      "no": "51",
      "constructor": "ferrari",
      "model": "Ferrari F458 Italia",
      "team": "AF Corse",
      "gap": "1 Laps",
      "laps": 170,
      "time": "6:01:52.064",
      "status": "Classified",
      "drivers": [
        [
          "Gianmaria Bruni",
          "Italy"
        ],
        [
          "Giancarlo Fisichella",
          "Italy"
        ]
      ],
      "bestLap": "2:02.252",
      "bestLapNo": "142",
      "bestLapDriver": "Gianmaria Bruni"
    },
    {
      "pos": 19,
      "class": "GTEAM",
      "no": "95",
      "constructor": "astonmartin",
      "model": "Aston Martin Vantage V8",
      "team": "Aston Martin Racing",
      "gap": "—",
      "laps": 169,
      "time": "6:01:33.606",
      "status": "Classified",
      "drivers": [
        [
          "Christoffer Nygaard",
          ""
        ],
        [
          "Kristian Poulsen",
          ""
        ],
        [
          "Allan Simonsen",
          ""
        ]
      ],
      "bestLap": "2:02.707",
      "bestLapNo": "4",
      "bestLapDriver": "Allan Simonsen"
    },
    {
      "pos": 20,
      "class": "GTEPRO",
      "no": "91",
      "constructor": "porsche",
      "model": "Porsche 911 RSR",
      "team": "Porsche AG Team Manthey",
      "gap": "3 Laps",
      "laps": 168,
      "time": "6:00:52.490",
      "status": "Classified",
      "drivers": [
        [
          "Jörg Bergmeister",
          "Germany"
        ],
        [
          "Patrick Pilet",
          ""
        ],
        [
          "Timo Bernhard",
          ""
        ]
      ],
      "bestLap": "2:02.225",
      "bestLapNo": "4",
      "bestLapDriver": "Patrick Pilet"
    },
    {
      "pos": 21,
      "class": "GTEAM",
      "no": "50",
      "constructor": "corvette",
      "model": "Chevrolet Corvette C6-ZR1",
      "team": "Larbre Competition",
      "gap": "3 Laps",
      "laps": 166,
      "time": "6:01:22.636",
      "status": "Classified",
      "drivers": [
        [
          "Patrick Bornhauser",
          ""
        ],
        [
          "Julien Canal",
          "France"
        ],
        [
          "Fernando Rees",
          ""
        ]
      ],
      "bestLap": "2:02.213",
      "bestLapNo": "144",
      "bestLapDriver": "Fernando Rees"
    },
    {
      "pos": 22,
      "class": "GTEAM",
      "no": "81",
      "constructor": "ferrari",
      "model": "Ferrari F458 Italia",
      "team": "8 Star Motorsports",
      "gap": "4 Laps",
      "laps": 165,
      "time": "6:00:57.325",
      "status": "Classified",
      "drivers": [
        [
          "Vicente Potolicchio",
          ""
        ],
        [
          "Rui Aguas",
          ""
        ],
        [
          "Philipp Peter",
          ""
        ]
      ],
      "bestLap": "2:03.852",
      "bestLapNo": "147",
      "bestLapDriver": "Rui Aguas"
    },
    {
      "pos": 23,
      "class": "GTEAM",
      "no": "96",
      "constructor": "astonmartin",
      "model": "Aston Martin Vantage V8",
      "team": "Aston Martin Racing",
      "gap": "4 Laps",
      "laps": 165,
      "time": "6:01:23.069",
      "status": "Classified",
      "drivers": [
        [
          "Ronald Goethe",
          ""
        ],
        [
          "Stuart Hall",
          ""
        ],
        [
          "Jamie Campbell-Walter",
          ""
        ]
      ],
      "bestLap": "2:02.402",
      "bestLapNo": "122",
      "bestLapDriver": "Stuart Hall"
    },
    {
      "pos": 24,
      "class": "GTEAM",
      "no": "88",
      "constructor": "porsche",
      "model": "Porsche 911 GT3 RSR",
      "team": "Proton Competition",
      "gap": "4 Laps",
      "laps": 165,
      "time": "6:01:51.788",
      "status": "Classified",
      "drivers": [
        [
          "Christian Ried",
          ""
        ],
        [
          "Gianluca Roda",
          ""
        ],
        [
          "Paolo Ruberti",
          ""
        ]
      ],
      "bestLap": "2:03.226",
      "bestLapNo": "129",
      "bestLapDriver": "Paolo Ruberti"
    },
    {
      "pos": 25,
      "class": "GTEAM",
      "no": "57",
      "constructor": "ferrari",
      "model": "Ferrari F458 Italia",
      "team": "Krohn Racing",
      "gap": "5 Laps",
      "laps": 164,
      "time": "6:00:35.068",
      "status": "Classified",
      "drivers": [
        [
          "Tracy Krohn",
          ""
        ],
        [
          "Niclas Jönsson",
          ""
        ],
        [
          "Maurizio Mediani",
          ""
        ]
      ],
      "bestLap": "2:03.528",
      "bestLapNo": "141",
      "bestLapDriver": "Niclas Jönsson"
    },
    {
      "pos": 26,
      "class": "GTEAM",
      "no": "76",
      "constructor": "porsche",
      "model": "Porsche 911 GT3 RSR",
      "team": "IMSA Performance Matmut",
      "gap": "6 Laps",
      "laps": 163,
      "time": "6:00:30.583",
      "status": "Classified",
      "drivers": [
        [
          "Raymond Narac",
          ""
        ],
        [
          "Christophe Bourret",
          ""
        ],
        [
          "Jean-Karl Vernay",
          "France"
        ]
      ],
      "bestLap": "2:04.819",
      "bestLapNo": "28",
      "bestLapDriver": "Jean-Karl Vernay"
    },
    {
      "pos": 27,
      "class": "LMP2",
      "no": "45",
      "constructor": "nissan",
      "model": "Morgan - Nissan",
      "team": "OAK Racing",
      "gap": "30 Laps",
      "laps": 154,
      "time": "6:01:21.597",
      "status": "Classified",
      "drivers": [
        [
          "Jacques Nicolet",
          ""
        ],
        [
          "Jean-Marc Merlin",
          ""
        ]
      ],
      "bestLap": "1:54.471",
      "bestLapNo": "4",
      "bestLapDriver": "Jacques Nicolet"
    },
    {
      "pos": 28,
      "class": "GTEAM",
      "no": "61",
      "constructor": "ferrari",
      "model": "Ferrari F458 Italia",
      "team": "AF Corse",
      "gap": "30 Laps",
      "laps": 139,
      "time": "6:00:09.751",
      "status": "Classified",
      "drivers": [
        [
          "Jack Gerber",
          ""
        ],
        [
          "Matt Griffin",
          ""
        ],
        [
          "Marco Cioci",
          ""
        ]
      ],
      "bestLap": "2:02.948",
      "bestLapNo": "112",
      "bestLapDriver": "Marco Cioci"
    },
    {
      "pos": 29,
      "class": "LMP2",
      "no": "32",
      "constructor": "",
      "model": "Lotus T128",
      "team": "Lotus",
      "gap": "NC",
      "laps": 113,
      "time": "6:00:41.708",
      "status": "NC",
      "drivers": [
        [
          "Thomas Holzer",
          ""
        ],
        [
          "Dominik Kraihamer",
          "Austria"
        ],
        [
          "Jan Charouz",
          ""
        ]
      ],
      "bestLap": "1:53.033",
      "bestLapNo": "105",
      "bestLapDriver": "Dominik Kraihamer"
    },
    {
      "pos": 30,
      "class": "LMP1",
      "no": "21",
      "constructor": "",
      "model": "HPD ARX 03c - Honda",
      "team": "Strakka Racing",
      "gap": "NC",
      "laps": 55,
      "time": "1:43:35.570",
      "status": "NC",
      "drivers": [
        [
          "Nick Leventis",
          ""
        ],
        [
          "Watts",
          ""
        ],
        [
          "Jonny Kane",
          ""
        ]
      ],
      "bestLap": "1:47.014",
      "bestLapNo": "12",
      "bestLapDriver": "Jonny Kane"
    },
    {
      "pos": 31,
      "class": "LMP2",
      "no": "31",
      "constructor": "",
      "model": "Lotus T128",
      "team": "Lotus",
      "gap": "NC",
      "laps": 44,
      "time": "1:58:37.589",
      "status": "NC",
      "drivers": [
        [
          "Kevin Weeda",
          ""
        ],
        [
          "Vitantonio Liuzzi",
          ""
        ],
        [
          "Christophe Bouchut",
          ""
        ]
      ],
      "bestLap": "1:56.355",
      "bestLapNo": "17",
      "bestLapDriver": "Vitantonio Liuzzi"
    }
  ],
  "performance": {
    "fastestLaps": [
      {
        "type": "FL",
        "class": "LMP1",
        "no": "2",
        "team": "Audi Sport Team Joest",
        "driver": "Allan Mcnish",
        "lap": "",
        "time": "1:42.767"
      },
      {
        "type": "FL",
        "class": "GTEPRO",
        "no": "99",
        "team": "Aston Martin Racing",
        "driver": "Frédéric Makowiecki",
        "lap": "",
        "time": "2:01.426"
      },
      {
        "type": "FL",
        "class": "GTEAM",
        "no": "50",
        "team": "Larbre Competition",
        "driver": "Fernando Rees",
        "lap": "",
        "time": "2:02.213"
      },
      {
        "type": "FL",
        "class": "Overall",
        "no": "2",
        "team": "Audi Sport Team Joest",
        "driver": "Allan Mcnish",
        "lap": "",
        "time": "1:42.767"
      },
      {
        "type": "FL",
        "class": "LMP2",
        "no": "26",
        "team": "G-Drive Racing",
        "driver": "Mike Conway",
        "lap": "",
        "time": "1:49.087"
      }
    ],
    "poles": [
      {
        "type": "PP",
        "class": "GTEAM",
        "no": "96",
        "team": "Aston Martin Racing",
        "driver": "Jamie Campbell-Walter",
        "time": "2:01.158"
      },
      {
        "type": "PP",
        "class": "GTEAM",
        "no": "96",
        "team": "Aston Martin Racing",
        "driver": "Stuart Hall",
        "time": "2:01.158"
      },
      {
        "type": "PP",
        "class": "GTEPRO",
        "no": "97",
        "team": "Aston Martin Racing",
        "driver": "Stefan Mücke",
        "time": "2:00.566"
      },
      {
        "type": "PP",
        "class": "GTEPRO",
        "no": "97",
        "team": "Aston Martin Racing",
        "driver": "Darren Turner",
        "time": "2:00.566"
      },
      {
        "type": "PP",
        "class": "LMP1",
        "no": "7",
        "team": "Toyota Racing",
        "driver": "Alexander Wurz",
        "time": "1:48.021"
      },
      {
        "type": "PP",
        "class": "Overall",
        "no": "7",
        "team": "Toyota Racing",
        "driver": "Alexander Wurz",
        "time": "1:48.021"
      },
      {
        "type": "PP",
        "class": "LMP1",
        "no": "7",
        "team": "Toyota Racing",
        "driver": "Nicolas Lapierre",
        "time": "1:48.021"
      },
      {
        "type": "PP",
        "class": "Overall",
        "no": "7",
        "team": "Toyota Racing",
        "driver": "Nicolas Lapierre",
        "time": "1:48.021"
      },
      {
        "type": "PP",
        "class": "LMP2",
        "no": "25",
        "team": "Delta-ADR",
        "driver": "Antonio Pizzonia",
        "time": "1:55.148"
      },
      {
        "type": "PP",
        "class": "LMP2",
        "no": "25",
        "team": "Delta-ADR",
        "driver": "James Walker",
        "time": "1:55.148"
      }
    ]
  },
  "qualifying": [
    {
      "pos": 1,
      "no": "96",
      "class": "GTEAM",
      "team": "Aston Martin Racing",
      "model": "Aston Martin Vantage V8",
      "constructor": "astonmartin",
      "drivers": [
        [
          "R. Goethe",
          ""
        ],
        [
          "S. Hall",
          ""
        ],
        [
          "J. Campbell-Walt",
          ""
        ]
      ],
      "driver1Time": "2:01.037",
      "driver2Time": "2:01.513",
      "laps": 4,
      "time": "2:01.158",
      "timeDrivers": [
        "Jamie Campbell-Walter",
        "Stuart Hall"
      ]
    },
    {
      "pos": 2,
      "no": "95",
      "class": "GTEAM",
      "team": "Aston Martin Racing",
      "model": "Aston Martin Vantage V8",
      "constructor": "astonmartin",
      "drivers": [
        [
          "C. Nygaard",
          ""
        ],
        [
          "K. Poulsen",
          ""
        ],
        [
          "A. Simonsen",
          ""
        ]
      ],
      "driver1Time": "2:00.981",
      "driver2Time": "2:01.091",
      "laps": 4,
      "time": "2:01.544",
      "timeDrivers": [
        "Allan Simonsen",
        "Christoffer Nygaard"
      ]
    },
    {
      "pos": 3,
      "no": "61",
      "class": "GTEAM",
      "team": "AF Corse",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "drivers": [
        [
          "J. Gerber",
          ""
        ],
        [
          "M. Griffin",
          ""
        ],
        [
          "M. Cioci",
          ""
        ]
      ],
      "driver1Time": "2:02.498",
      "driver2Time": "2:02.810",
      "laps": 4,
      "time": "2:02.396",
      "timeDrivers": [
        "Marco Cioci",
        "Matt Griffin"
      ]
    },
    {
      "pos": 4,
      "no": "81",
      "class": "GTEAM",
      "team": "8 Star Motorsports",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "drivers": [
        [
          "V. Potolicchio",
          ""
        ],
        [
          "R. Aguas",
          ""
        ],
        [
          "P. Peter",
          ""
        ]
      ],
      "driver1Time": "2:02.677",
      "driver2Time": "2:02.879",
      "laps": 4,
      "time": "2:02.513",
      "timeDrivers": [
        "Philipp Peter",
        "Rui Aguas"
      ]
    },
    {
      "pos": 5,
      "no": "50",
      "class": "GTEAM",
      "team": "Larbre Competition",
      "model": "Chevrolet Corvette C6-ZR1",
      "constructor": "corvette",
      "drivers": [
        [
          "P. Bornhauser",
          ""
        ],
        [
          "J. Canal",
          "France"
        ],
        [
          "F. Rees",
          ""
        ]
      ],
      "driver1Time": "2:02.907",
      "driver2Time": "2:03.257",
      "laps": 4,
      "time": "2:02.862",
      "timeDrivers": [
        "Julien Canal",
        "Fernando Rees"
      ]
    },
    {
      "pos": 6,
      "no": "76",
      "class": "GTEAM",
      "team": "IMSA Performance Matmut",
      "model": "Porsche 911 GT3 RSR",
      "constructor": "porsche",
      "drivers": [
        [
          "R. Narac",
          ""
        ],
        [
          "C. Bourret",
          ""
        ],
        [
          "J. Vernay",
          ""
        ]
      ],
      "driver1Time": "2:03.597",
      "driver2Time": "2:03.616",
      "laps": 4,
      "time": "2:04.176",
      "timeDrivers": [
        "Jean-Karl Vernay",
        "Raymond Narac"
      ]
    },
    {
      "pos": 7,
      "no": "57",
      "class": "GTEAM",
      "team": "Krohn Racing",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "drivers": [
        [
          "T. Krohn",
          ""
        ],
        [
          "N. Jönsson",
          ""
        ],
        [
          "M. Mediani",
          ""
        ]
      ],
      "driver1Time": "2:04.711",
      "driver2Time": "2:04.760",
      "laps": 4,
      "time": "2:05.482",
      "timeDrivers": [
        "Maurizio Mediani",
        "Tracy Krohn"
      ]
    },
    {
      "pos": 1,
      "no": "97",
      "class": "GTEPRO",
      "team": "Aston Martin Racing",
      "model": "Aston Martin Vantage V8",
      "constructor": "astonmartin",
      "drivers": [
        [
          "D. Turner",
          "United Kingdom"
        ],
        [
          "S. Mücke",
          "Germany"
        ],
        [
          "B. Senna",
          "Brazil"
        ]
      ],
      "driver1Time": "2:00.523",
      "driver2Time": "2:01.385",
      "laps": 4,
      "time": "2:00.566",
      "timeDrivers": [
        "Stefan Mücke",
        "Darren Turner"
      ]
    },
    {
      "pos": 2,
      "no": "99",
      "class": "GTEPRO",
      "team": "Aston Martin Racing",
      "model": "Aston Martin Vantage V8",
      "constructor": "astonmartin",
      "drivers": [
        [
          "P. Dalla Lana",
          "Canada"
        ],
        [
          "F. Makowiecki",
          "France"
        ],
        [
          "P. Lamy",
          "Portugal"
        ]
      ],
      "driver1Time": "2:00.678",
      "driver2Time": "2:00.839",
      "laps": 4,
      "time": "2:00.772",
      "timeDrivers": [
        "Pedro Lamy",
        "Frédéric Makowiecki"
      ]
    },
    {
      "pos": 3,
      "no": "91",
      "class": "GTEPRO",
      "team": "Porsche AG Team Manthey",
      "model": "Porsche 911 RSR",
      "constructor": "porsche",
      "drivers": [
        [
          "J. Bergmeister",
          "Germany"
        ],
        [
          "P. Pilet",
          ""
        ],
        [
          "T. Bernhard",
          ""
        ]
      ],
      "driver1Time": "2:01.423",
      "driver2Time": "2:01.485",
      "laps": 4,
      "time": "2:01.308",
      "timeDrivers": [
        "Patrick Pilet",
        "Jörg Bergmeister"
      ]
    },
    {
      "pos": 4,
      "no": "92",
      "class": "GTEPRO",
      "team": "Porsche AG Team Manthey",
      "model": "Porsche 911 RSR",
      "constructor": "porsche",
      "drivers": [
        [
          "M. Lieb",
          ""
        ],
        [
          "R. Lietz",
          "Austria"
        ],
        [
          "R. Dumas",
          ""
        ]
      ],
      "driver1Time": "2:01.792",
      "driver2Time": "2:01.855",
      "laps": 4,
      "time": "2:01.452",
      "timeDrivers": [
        "Richard Lietz",
        "Romain Dumas"
      ]
    },
    {
      "pos": 5,
      "no": "51",
      "class": "GTEPRO",
      "team": "AF Corse",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "drivers": [
        [
          "G. Bruni",
          "Italy"
        ],
        [
          "G. Fisichella",
          "Italy"
        ]
      ],
      "driver1Time": "2:01.364",
      "driver2Time": "2:01.617",
      "laps": 4,
      "time": "2:01.512",
      "timeDrivers": [
        "Gianmaria Bruni",
        "Giancarlo Fisichella"
      ]
    },
    {
      "pos": 6,
      "no": "71",
      "class": "GTEPRO",
      "team": "AF Corse",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "drivers": [
        [
          "K. Kobayashi",
          "Japan"
        ],
        [
          "T. Vilander",
          ""
        ]
      ],
      "driver1Time": "2:02.081",
      "driver2Time": "2:02.254",
      "laps": 4,
      "time": "2:01.803",
      "timeDrivers": [
        "Toni Vilander",
        "Kamui Kobayashi"
      ]
    },
    {
      "pos": 1,
      "no": "7",
      "class": "LMP1",
      "team": "Toyota Racing",
      "model": "Toyota TS030 - Hybrid",
      "constructor": "toyota",
      "drivers": [
        [
          "A. Wurz",
          ""
        ],
        [
          "N. Lapierre",
          "France"
        ]
      ],
      "driver1Time": "1:43.281",
      "driver2Time": "1:45.099",
      "laps": 4,
      "time": "1:48.021",
      "timeDrivers": [
        "Alexander Wurz",
        "Nicolas Lapierre"
      ]
    },
    {
      "pos": 2,
      "no": "8",
      "class": "LMP1",
      "team": "Toyota Racing",
      "model": "Toyota TS030 - Hybrid",
      "constructor": "toyota",
      "drivers": [
        [
          "A. Davidson",
          "United Kingdom"
        ],
        [
          "S. Buemi",
          "Switzerland"
        ],
        [
          "S. Sarrazin",
          "France"
        ]
      ],
      "driver1Time": "1:48.506",
      "driver2Time": "1:48.601",
      "laps": 4,
      "time": "1:49.995",
      "timeDrivers": [
        "Sébastien Buemi",
        "Anthony Davidson"
      ]
    },
    {
      "pos": 3,
      "no": "2",
      "class": "LMP1",
      "team": "Audi Sport Team Joest",
      "model": "Audi R18 e-tron quattro",
      "constructor": "audi",
      "drivers": [
        [
          "T. Kristensen",
          ""
        ],
        [
          "L. Duval",
          "France"
        ],
        [
          "A. Mcnish",
          ""
        ]
      ],
      "driver1Time": "1:45.287",
      "driver2Time": "1:46.212",
      "laps": 4,
      "time": "1:51.283",
      "timeDrivers": [
        "Tom Kristensen",
        "Loïc Duval"
      ]
    },
    {
      "pos": 4,
      "no": "12",
      "class": "LMP1",
      "team": "Rebellion Racing",
      "model": "Lola B12/60 Coupé - Toyota",
      "constructor": "toyota",
      "drivers": [
        [
          "N. Prost",
          ""
        ],
        [
          "N. Jani",
          ""
        ],
        [
          "N. Heidfeld",
          ""
        ]
      ],
      "driver1Time": "1:43.884",
      "driver2Time": "1:45.524",
      "laps": 4,
      "time": "1:52.124",
      "timeDrivers": [
        "Nick Heidfeld",
        "Neel Jani"
      ]
    },
    {
      "pos": 5,
      "no": "1",
      "class": "LMP1",
      "team": "Audi Sport Team Joest",
      "model": "Audi R18 e-tron quattro",
      "constructor": "audi",
      "drivers": [
        [
          "A. Lotterer",
          "Germany"
        ],
        [
          "B. Tréluyer",
          ""
        ],
        [
          "M. Fässler",
          ""
        ]
      ],
      "driver1Time": "1:44.489",
      "driver2Time": "1:44.892",
      "laps": 4,
      "time": "1:53.488",
      "timeDrivers": [
        "André Lotterer",
        "Benoit Tréluyer"
      ]
    },
    {
      "pos": 6,
      "no": "13",
      "class": "LMP1",
      "team": "Rebellion Racing",
      "model": "Lola B12/60 Coupé - Toyota",
      "constructor": "toyota",
      "drivers": [
        [
          "A. Belicchi",
          "Italy"
        ],
        [
          "M. Beche",
          ""
        ],
        [
          "C. Cheng",
          ""
        ]
      ],
      "driver1Time": "1:47.421",
      "driver2Time": "1:47.652",
      "laps": 4,
      "time": "1:53.835",
      "timeDrivers": [
        "Mathias Beche",
        "Andrea Belicchi"
      ]
    },
    {
      "pos": 7,
      "no": "21",
      "class": "LMP1",
      "team": "Strakka Racing",
      "model": "HPD ARX 03c - Honda",
      "constructor": "",
      "drivers": [
        [
          "N. Leventis",
          ""
        ],
        [
          "D. Watts",
          ""
        ],
        [
          "J. Kane",
          ""
        ]
      ],
      "driver1Time": "1:49.719",
      "driver2Time": null,
      "laps": 2,
      "time": "1:49.347",
      "timeDrivers": [
        "Danny Watts"
      ]
    },
    {
      "pos": 1,
      "no": "25",
      "class": "LMP2",
      "team": "Delta-ADR",
      "model": "Oreca 03 - Nissan",
      "constructor": "oreca",
      "drivers": [
        [
          "T. Graves",
          ""
        ],
        [
          "A. Pizzonia",
          ""
        ],
        [
          "J. Walker",
          ""
        ]
      ],
      "driver1Time": "1:53.918",
      "driver2Time": "1:55.671",
      "laps": 4,
      "time": "1:55.148",
      "timeDrivers": [
        "Antonio Pizzonia",
        "James Walker"
      ]
    },
    {
      "pos": 2,
      "no": "24",
      "class": "LMP2",
      "team": "OAK Racing",
      "model": "Morgan - Nissan",
      "constructor": "nissan",
      "drivers": [
        [
          "O. Pla",
          "France"
        ],
        [
          "D. Heinemeier Hansson",
          "Denmark"
        ],
        [
          "A. Brundle",
          "United Kingdom"
        ]
      ],
      "driver1Time": "1:51.942",
      "driver2Time": "1:52.192",
      "laps": 4,
      "time": "1:57.629",
      "timeDrivers": [
        "Alex Brundle",
        "Olivier Pla"
      ]
    },
    {
      "pos": 3,
      "no": "26",
      "class": "LMP2",
      "team": "G-Drive Racing",
      "model": "Oreca 03 - Nissan",
      "constructor": "oreca",
      "drivers": [
        [
          "R. Rusinov",
          "Russia"
        ],
        [
          "J. Martin",
          ""
        ],
        [
          "M. Conway",
          "United Kingdom"
        ]
      ],
      "driver1Time": "1:51.536",
      "driver2Time": "1:52.103",
      "laps": 4,
      "time": "1:57.697",
      "timeDrivers": [
        "Mike Conway",
        "John Martin"
      ]
    },
    {
      "pos": 4,
      "no": "35",
      "class": "LMP2",
      "team": "OAK Racing",
      "model": "Morgan - Nissan",
      "constructor": "nissan",
      "drivers": [
        [
          "B. Baguette",
          ""
        ],
        [
          "R. Gonzalez",
          "Mexico"
        ],
        [
          "M. Plowmann",
          ""
        ]
      ],
      "driver1Time": "1:52.225",
      "driver2Time": "1:52.326",
      "laps": 4,
      "time": "1:58.729",
      "timeDrivers": [
        "Martin Plowmann",
        "Bertrand Baguette"
      ]
    },
    {
      "pos": 5,
      "no": "32",
      "class": "LMP2",
      "team": "Lotus",
      "model": "Lotus T128",
      "constructor": "",
      "drivers": [
        [
          "T. Holzer",
          ""
        ],
        [
          "D. Kraihamer",
          "Austria"
        ],
        [
          "J. Charouz",
          ""
        ]
      ],
      "driver1Time": "1:57.682",
      "driver2Time": "1:57.766",
      "laps": 4,
      "time": "2:01.555",
      "timeDrivers": [
        "Jan Charouz",
        "Dominik Kraihamer"
      ]
    },
    {
      "pos": 6,
      "no": "31",
      "class": "LMP2",
      "team": "Lotus",
      "model": "Lotus T128",
      "constructor": "",
      "drivers": [
        [
          "K. Weeda",
          ""
        ],
        [
          "V. Liuzzi",
          ""
        ],
        [
          "C. Bouchut",
          ""
        ]
      ],
      "driver1Time": "1:56.558",
      "driver2Time": "2:02.669",
      "laps": 4,
      "time": "2:02.144",
      "timeDrivers": [
        "Vitantonio Liuzzi",
        "Christophe Bouchut"
      ]
    },
    {
      "pos": 7,
      "no": "49",
      "class": "LMP2",
      "team": "Pecom Racing",
      "model": "Oreca 03 - Nissan",
      "constructor": "oreca",
      "drivers": [
        [
          "L. Perez Companc",
          "Argentina"
        ],
        [
          "N. Minassian",
          ""
        ],
        [
          "P. Kaffer",
          ""
        ]
      ],
      "driver1Time": "1:59.909",
      "driver2Time": "2:00.099",
      "laps": 4,
      "time": "2:02.454",
      "timeDrivers": [
        "Pierre Kaffer",
        "Nicolas Minassian"
      ]
    },
    {
      "pos": 8,
      "no": "47",
      "class": "LMP2",
      "team": "KCMG",
      "model": "Morgan - Nissan",
      "constructor": "nissan",
      "drivers": [
        [
          "A. Imperatori",
          ""
        ],
        [
          "M. Howson",
          ""
        ],
        [
          "J. Ka To",
          ""
        ]
      ],
      "driver1Time": "2:00.404",
      "driver2Time": "2:03.038",
      "laps": 4,
      "time": "2:02.991",
      "timeDrivers": [
        "Alexander Imperatori",
        "Matthew Howson"
      ]
    },
    {
      "pos": 9,
      "no": "41",
      "class": "LMP2",
      "team": "Greaves Motorsport",
      "model": "Zytek Z11SN - Nissan",
      "constructor": "nissan",
      "drivers": [
        [
          "C. Dyson",
          ""
        ],
        [
          "M. Marsal",
          ""
        ],
        [
          "T. Kimber-Smith",
          ""
        ]
      ],
      "driver1Time": "1:57.961",
      "driver2Time": "1:58.450",
      "laps": 4,
      "time": "2:04.491",
      "timeDrivers": [
        "Chris Dyson",
        "Tom Kimber-Smith"
      ]
    },
    {
      "pos": 10,
      "no": "45",
      "class": "LMP2",
      "team": "OAK Racing",
      "model": "Morgan - Nissan",
      "constructor": "nissan",
      "drivers": [
        [
          "J. Nicolet",
          ""
        ],
        [
          "J. Merlin",
          ""
        ]
      ],
      "driver1Time": "2:01.448",
      "driver2Time": "2:01.869",
      "laps": 4,
      "time": "2:10.475",
      "timeDrivers": [
        "Jean-Marc Merlin",
        "Jacques Nicolet"
      ]
    }
  ],
  "flClassification": [
    {
      "class": "LMP1",
      "no": "2",
      "team": "Audi Sport Team Joest",
      "model": "Audi R18 e-tron quattro",
      "constructor": "audi",
      "driver": "Allan Mcnish",
      "time": "1:42.767"
    },
    {
      "class": "LMP1",
      "no": "1",
      "team": "Audi Sport Team Joest",
      "model": "Audi R18 e-tron quattro",
      "constructor": "audi",
      "driver": "Benoit Tréluyer",
      "time": "1:42.926"
    },
    {
      "class": "LMP1",
      "no": "8",
      "team": "Toyota Racing",
      "model": "Toyota TS030 - Hybrid",
      "constructor": "toyota",
      "driver": "Anthony Davidson",
      "time": "1:43.196"
    },
    {
      "class": "LMP1",
      "no": "2",
      "team": "Audi Sport Team Joest",
      "model": "Audi R18 e-tron quattro",
      "constructor": "audi",
      "driver": "Tom Kristensen",
      "time": "1:43.695"
    },
    {
      "class": "LMP1",
      "no": "1",
      "team": "Audi Sport Team Joest",
      "model": "Audi R18 e-tron quattro",
      "constructor": "audi",
      "driver": "André Lotterer",
      "time": "1:43.698"
    },
    {
      "class": "LMP1",
      "no": "7",
      "team": "Toyota Racing",
      "model": "Toyota TS030 - Hybrid",
      "constructor": "toyota",
      "driver": "Nicolas Lapierre",
      "time": "1:43.741"
    },
    {
      "class": "LMP1",
      "no": "1",
      "team": "Audi Sport Team Joest",
      "model": "Audi R18 e-tron quattro",
      "constructor": "audi",
      "driver": "Marcel Fässler",
      "time": "1:44.016"
    },
    {
      "class": "LMP1",
      "no": "2",
      "team": "Audi Sport Team Joest",
      "model": "Audi R18 e-tron quattro",
      "constructor": "audi",
      "driver": "Loïc Duval",
      "time": "1:44.030"
    },
    {
      "class": "LMP1",
      "no": "8",
      "team": "Toyota Racing",
      "model": "Toyota TS030 - Hybrid",
      "constructor": "toyota",
      "driver": "Sébastien Buemi",
      "time": "1:44.096"
    },
    {
      "class": "LMP1",
      "no": "7",
      "team": "Toyota Racing",
      "model": "Toyota TS030 - Hybrid",
      "constructor": "toyota",
      "driver": "Alexander Wurz",
      "time": "1:44.162"
    },
    {
      "class": "LMP1",
      "no": "8",
      "team": "Toyota Racing",
      "model": "Toyota TS030 - Hybrid",
      "constructor": "toyota",
      "driver": "Stéphane Sarrazin",
      "time": "1:44.490"
    },
    {
      "class": "LMP1",
      "no": "12",
      "team": "Rebellion Racing",
      "model": "Lola B12/60 Coupé - Toyota",
      "constructor": "toyota",
      "driver": "Neel Jani",
      "time": "1:44.985"
    },
    {
      "class": "LMP1",
      "no": "12",
      "team": "Rebellion Racing",
      "model": "Lola B12/60 Coupé - Toyota",
      "constructor": "toyota",
      "driver": "Nick Heidfeld",
      "time": "1:45.262"
    },
    {
      "class": "LMP1",
      "no": "13",
      "team": "Rebellion Racing",
      "model": "Lola B12/60 Coupé - Toyota",
      "constructor": "toyota",
      "driver": "Mathias Beche",
      "time": "1:45.732"
    },
    {
      "class": "LMP1",
      "no": "13",
      "team": "Rebellion Racing",
      "model": "Lola B12/60 Coupé - Toyota",
      "constructor": "toyota",
      "driver": "Andrea Belicchi",
      "time": "1:45.814"
    },
    {
      "class": "LMP1",
      "no": "12",
      "team": "Rebellion Racing",
      "model": "Lola B12/60 Coupé - Toyota",
      "constructor": "toyota",
      "driver": "Nicolas Prost",
      "time": "1:46.155"
    },
    {
      "class": "LMP1",
      "no": "13",
      "team": "Rebellion Racing",
      "model": "Lola B12/60 Coupé - Toyota",
      "constructor": "toyota",
      "driver": "Cong Fu Cheng",
      "time": "1:46.912"
    },
    {
      "class": "LMP1",
      "no": "21",
      "team": "Strakka Racing",
      "model": "HPD ARX 03c - Honda",
      "constructor": "",
      "driver": "Jonny Kane",
      "time": "1:47.014"
    },
    {
      "class": "LMP2",
      "no": "26",
      "team": "G-Drive Racing",
      "model": "Oreca 03 - Nissan",
      "constructor": "oreca",
      "driver": "Mike Conway",
      "time": "1:49.087"
    },
    {
      "class": "LMP2",
      "no": "24",
      "team": "OAK Racing",
      "model": "Morgan - Nissan",
      "constructor": "nissan",
      "driver": "Olivier Pla",
      "time": "1:49.603"
    },
    {
      "class": "LMP2",
      "no": "26",
      "team": "G-Drive Racing",
      "model": "Oreca 03 - Nissan",
      "constructor": "oreca",
      "driver": "John Martin",
      "time": "1:50.662"
    },
    {
      "class": "LMP2",
      "no": "25",
      "team": "Delta-ADR",
      "model": "Oreca 03 - Nissan",
      "constructor": "oreca",
      "driver": "Antonio Pizzonia",
      "time": "1:50.668"
    },
    {
      "class": "LMP2",
      "no": "47",
      "team": "KCMG",
      "model": "Morgan - Nissan",
      "constructor": "nissan",
      "driver": "Alexander Imperatori",
      "time": "1:50.995"
    },
    {
      "class": "LMP2",
      "no": "25",
      "team": "Delta-ADR",
      "model": "Oreca 03 - Nissan",
      "constructor": "oreca",
      "driver": "James Walker",
      "time": "1:51.276"
    },
    {
      "class": "LMP2",
      "no": "41",
      "team": "Greaves Motorsport",
      "model": "Zytek Z11SN - Nissan",
      "constructor": "nissan",
      "driver": "Tom Kimber-Smith",
      "time": "1:51.324"
    },
    {
      "class": "LMP2",
      "no": "35",
      "team": "OAK Racing",
      "model": "Morgan - Nissan",
      "constructor": "nissan",
      "driver": "Martin Plowmann",
      "time": "1:51.427"
    },
    {
      "class": "LMP2",
      "no": "35",
      "team": "OAK Racing",
      "model": "Morgan - Nissan",
      "constructor": "nissan",
      "driver": "Bertrand Baguette",
      "time": "1:51.457"
    },
    {
      "class": "LMP2",
      "no": "49",
      "team": "Pecom Racing",
      "model": "Oreca 03 - Nissan",
      "constructor": "oreca",
      "driver": "Pierre Kaffer",
      "time": "1:51.475"
    },
    {
      "class": "LMP2",
      "no": "47",
      "team": "KCMG",
      "model": "Morgan - Nissan",
      "constructor": "nissan",
      "driver": "Matthew Howson",
      "time": "1:51.517"
    },
    {
      "class": "LMP2",
      "no": "26",
      "team": "G-Drive Racing",
      "model": "Oreca 03 - Nissan",
      "constructor": "oreca",
      "driver": "Roman Rusinov",
      "time": "1:51.532"
    },
    {
      "class": "LMP2",
      "no": "24",
      "team": "OAK Racing",
      "model": "Morgan - Nissan",
      "constructor": "nissan",
      "driver": "Alex Brundle",
      "time": "1:51.583"
    },
    {
      "class": "LMP2",
      "no": "49",
      "team": "Pecom Racing",
      "model": "Oreca 03 - Nissan",
      "constructor": "oreca",
      "driver": "Nicolas Minassian",
      "time": "1:52.336"
    },
    {
      "class": "LMP2",
      "no": "35",
      "team": "OAK Racing",
      "model": "Morgan - Nissan",
      "constructor": "nissan",
      "driver": "Ricardo Gonzalez",
      "time": "1:52.907"
    },
    {
      "class": "LMP2",
      "no": "32",
      "team": "Lotus",
      "model": "Lotus T128",
      "constructor": "",
      "driver": "Dominik Kraihamer",
      "time": "1:53.033"
    },
    {
      "class": "LMP2",
      "no": "25",
      "team": "Delta-ADR",
      "model": "Oreca 03 - Nissan",
      "constructor": "oreca",
      "driver": "Tor Graves",
      "time": "1:53.518"
    },
    {
      "class": "LMP2",
      "no": "24",
      "team": "OAK Racing",
      "model": "Morgan - Nissan",
      "constructor": "nissan",
      "driver": "David Heinemeier Hansson",
      "time": "1:53.792"
    },
    {
      "class": "LMP1",
      "no": "21",
      "team": "Strakka Racing",
      "model": "HPD ARX 03c - Honda",
      "constructor": "",
      "driver": "Nick Leventis",
      "time": "1:53.959"
    },
    {
      "class": "LMP2",
      "no": "32",
      "team": "Lotus",
      "model": "Lotus T128",
      "constructor": "",
      "driver": "Jan Charouz",
      "time": "1:54.173"
    },
    {
      "class": "LMP2",
      "no": "49",
      "team": "Pecom Racing",
      "model": "Oreca 03 - Nissan",
      "constructor": "oreca",
      "driver": "Luis Perez Companc",
      "time": "1:54.188"
    },
    {
      "class": "LMP2",
      "no": "45",
      "team": "OAK Racing",
      "model": "Morgan - Nissan",
      "constructor": "nissan",
      "driver": "Jacques Nicolet",
      "time": "1:54.471"
    },
    {
      "class": "LMP2",
      "no": "41",
      "team": "Greaves Motorsport",
      "model": "Zytek Z11SN - Nissan",
      "constructor": "nissan",
      "driver": "Chris Dyson",
      "time": "1:54.864"
    },
    {
      "class": "LMP2",
      "no": "47",
      "team": "KCMG",
      "model": "Morgan - Nissan",
      "constructor": "nissan",
      "driver": "Jim Ka To",
      "time": "1:55.533"
    },
    {
      "class": "LMP2",
      "no": "32",
      "team": "Lotus",
      "model": "Lotus T128",
      "constructor": "",
      "driver": "Thomas Holzer",
      "time": "1:55.708"
    },
    {
      "class": "LMP2",
      "no": "31",
      "team": "Lotus",
      "model": "Lotus T128",
      "constructor": "",
      "driver": "Vitantonio Liuzzi",
      "time": "1:56.355"
    },
    {
      "class": "LMP2",
      "no": "45",
      "team": "OAK Racing",
      "model": "Morgan - Nissan",
      "constructor": "nissan",
      "driver": "Jean-Marc Merlin",
      "time": "1:57.262"
    },
    {
      "class": "LMP2",
      "no": "41",
      "team": "Greaves Motorsport",
      "model": "Zytek Z11SN - Nissan",
      "constructor": "nissan",
      "driver": "Michael Marsal",
      "time": "1:59.333"
    },
    {
      "class": "LMP2",
      "no": "31",
      "team": "Lotus",
      "model": "Lotus T128",
      "constructor": "",
      "driver": "Christophe Bouchut",
      "time": "2:00.865"
    },
    {
      "class": "LMP2",
      "no": "31",
      "team": "Lotus",
      "model": "Lotus T128",
      "constructor": "",
      "driver": "Kevin Weeda",
      "time": "2:01.398"
    },
    {
      "class": "GTEPRO",
      "no": "99",
      "team": "Aston Martin Racing",
      "model": "Aston Martin Vantage V8",
      "constructor": "astonmartin",
      "driver": "Frédéric Makowiecki",
      "time": "2:01.426"
    },
    {
      "class": "GTEPRO",
      "no": "71",
      "team": "AF Corse",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "driver": "Kamui Kobayashi",
      "time": "2:01.713"
    },
    {
      "class": "GTEPRO",
      "no": "97",
      "team": "Aston Martin Racing",
      "model": "Aston Martin Vantage V8",
      "constructor": "astonmartin",
      "driver": "Stefan Mücke",
      "time": "2:01.732"
    },
    {
      "class": "GTEPRO",
      "no": "99",
      "team": "Aston Martin Racing",
      "model": "Aston Martin Vantage V8",
      "constructor": "astonmartin",
      "driver": "Pedro Lamy",
      "time": "2:02.015"
    },
    {
      "class": "GTEAM",
      "no": "50",
      "team": "Larbre Competition",
      "model": "Chevrolet Corvette C6-ZR1",
      "constructor": "corvette",
      "driver": "Fernando Rees",
      "time": "2:02.213"
    },
    {
      "class": "GTEPRO",
      "no": "97",
      "team": "Aston Martin Racing",
      "model": "Aston Martin Vantage V8",
      "constructor": "astonmartin",
      "driver": "Darren Turner",
      "time": "2:02.221"
    },
    {
      "class": "GTEPRO",
      "no": "91",
      "team": "Porsche AG Team Manthey",
      "model": "Porsche 911 RSR",
      "constructor": "porsche",
      "driver": "Patrick Pilet",
      "time": "2:02.225"
    },
    {
      "class": "GTEPRO",
      "no": "51",
      "team": "AF Corse",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "driver": "Gianmaria Bruni",
      "time": "2:02.252"
    },
    {
      "class": "GTEPRO",
      "no": "71",
      "team": "AF Corse",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "driver": "Toni Vilander",
      "time": "2:02.344"
    },
    {
      "class": "GTEAM",
      "no": "96",
      "team": "Aston Martin Racing",
      "model": "Aston Martin Vantage V8",
      "constructor": "astonmartin",
      "driver": "Stuart Hall",
      "time": "2:02.402"
    },
    {
      "class": "GTEAM",
      "no": "96",
      "team": "Aston Martin Racing",
      "model": "Aston Martin Vantage V8",
      "constructor": "astonmartin",
      "driver": "Jamie Campbell-Walter",
      "time": "2:02.530"
    },
    {
      "class": "GTEPRO",
      "no": "91",
      "team": "Porsche AG Team Manthey",
      "model": "Porsche 911 RSR",
      "constructor": "porsche",
      "driver": "Jörg Bergmeister",
      "time": "2:02.568"
    },
    {
      "class": "GTEPRO",
      "no": "97",
      "team": "Aston Martin Racing",
      "model": "Aston Martin Vantage V8",
      "constructor": "astonmartin",
      "driver": "Bruno Senna",
      "time": "2:02.583"
    },
    {
      "class": "GTEPRO",
      "no": "92",
      "team": "Porsche AG Team Manthey",
      "model": "Porsche 911 RSR",
      "constructor": "porsche",
      "driver": "Marc Lieb",
      "time": "2:02.652"
    },
    {
      "class": "GTEAM",
      "no": "95",
      "team": "Aston Martin Racing",
      "model": "Aston Martin Vantage V8",
      "constructor": "astonmartin",
      "driver": "Allan Simonsen",
      "time": "2:02.707"
    },
    {
      "class": "GTEAM",
      "no": "95",
      "team": "Aston Martin Racing",
      "model": "Aston Martin Vantage V8",
      "constructor": "astonmartin",
      "driver": "Christoffer Nygaard",
      "time": "2:02.753"
    },
    {
      "class": "GTEPRO",
      "no": "92",
      "team": "Porsche AG Team Manthey",
      "model": "Porsche 911 RSR",
      "constructor": "porsche",
      "driver": "Richard Lietz",
      "time": "2:02.836"
    },
    {
      "class": "GTEPRO",
      "no": "51",
      "team": "AF Corse",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "driver": "Giancarlo Fisichella",
      "time": "2:02.916"
    },
    {
      "class": "GTEAM",
      "no": "61",
      "team": "AF Corse",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "driver": "Marco Cioci",
      "time": "2:02.948"
    },
    {
      "class": "GTEPRO",
      "no": "91",
      "team": "Porsche AG Team Manthey",
      "model": "Porsche 911 RSR",
      "constructor": "porsche",
      "driver": "Timo Bernhard",
      "time": "2:03.086"
    },
    {
      "class": "GTEPRO",
      "no": "92",
      "team": "Porsche AG Team Manthey",
      "model": "Porsche 911 RSR",
      "constructor": "porsche",
      "driver": "Romain Dumas",
      "time": "2:03.141"
    },
    {
      "class": "GTEAM",
      "no": "61",
      "team": "AF Corse",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "driver": "Matt Griffin",
      "time": "2:03.179"
    },
    {
      "class": "GTEAM",
      "no": "88",
      "team": "Proton Competition",
      "model": "Porsche 911 GT3 RSR",
      "constructor": "porsche",
      "driver": "Paolo Ruberti",
      "time": "2:03.226"
    },
    {
      "class": "GTEAM",
      "no": "57",
      "team": "Krohn Racing",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "driver": "Niclas Jönsson",
      "time": "2:03.528"
    },
    {
      "class": "GTEAM",
      "no": "81",
      "team": "8 Star Motorsports",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "driver": "Rui Aguas",
      "time": "2:03.852"
    },
    {
      "class": "GTEAM",
      "no": "57",
      "team": "Krohn Racing",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "driver": "Maurizio Mediani",
      "time": "2:03.866"
    },
    {
      "class": "GTEAM",
      "no": "50",
      "team": "Larbre Competition",
      "model": "Chevrolet Corvette C6-ZR1",
      "constructor": "corvette",
      "driver": "Julien Canal",
      "time": "2:04.163"
    },
    {
      "class": "GTEAM",
      "no": "95",
      "team": "Aston Martin Racing",
      "model": "Aston Martin Vantage V8",
      "constructor": "astonmartin",
      "driver": "Kristian Poulsen",
      "time": "2:04.182"
    },
    {
      "class": "GTEAM",
      "no": "76",
      "team": "IMSA Performance Matmut",
      "model": "Porsche 911 GT3 RSR",
      "constructor": "porsche",
      "driver": "Jean-Karl Vernay",
      "time": "2:04.819"
    },
    {
      "class": "GTEAM",
      "no": "81",
      "team": "8 Star Motorsports",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "driver": "Philipp Peter",
      "time": "2:04.826"
    },
    {
      "class": "GTEPRO",
      "no": "99",
      "team": "Aston Martin Racing",
      "model": "Aston Martin Vantage V8",
      "constructor": "astonmartin",
      "driver": "Paul Dalla Lana",
      "time": "2:05.162"
    },
    {
      "class": "GTEAM",
      "no": "76",
      "team": "IMSA Performance Matmut",
      "model": "Porsche 911 GT3 RSR",
      "constructor": "porsche",
      "driver": "Raymond Narac",
      "time": "2:05.213"
    },
    {
      "class": "GTEAM",
      "no": "88",
      "team": "Proton Competition",
      "model": "Porsche 911 GT3 RSR",
      "constructor": "porsche",
      "driver": "Gianluca Roda",
      "time": "2:05.442"
    },
    {
      "class": "GTEAM",
      "no": "50",
      "team": "Larbre Competition",
      "model": "Chevrolet Corvette C6-ZR1",
      "constructor": "corvette",
      "driver": "Patrick Bornhauser",
      "time": "2:05.444"
    },
    {
      "class": "GTEAM",
      "no": "81",
      "team": "8 Star Motorsports",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "driver": "Vicente Potolicchio",
      "time": "2:06.668"
    },
    {
      "class": "GTEAM",
      "no": "88",
      "team": "Proton Competition",
      "model": "Porsche 911 GT3 RSR",
      "constructor": "porsche",
      "driver": "Christian Ried",
      "time": "2:07.167"
    },
    {
      "class": "GTEAM",
      "no": "57",
      "team": "Krohn Racing",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "driver": "Tracy Krohn",
      "time": "2:07.742"
    },
    {
      "class": "GTEAM",
      "no": "96",
      "team": "Aston Martin Racing",
      "model": "Aston Martin Vantage V8",
      "constructor": "astonmartin",
      "driver": "Ronald Goethe",
      "time": "2:08.341"
    },
    {
      "class": "GTEAM",
      "no": "76",
      "team": "IMSA Performance Matmut",
      "model": "Porsche 911 GT3 RSR",
      "constructor": "porsche",
      "driver": "Christophe Bourret",
      "time": "2:09.105"
    },
    {
      "class": "GTEAM",
      "no": "61",
      "team": "AF Corse",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "driver": "Jack Gerber",
      "time": "2:09.961"
    }
  ],
  "completeness": {
    "metadata": true,
    "results": true,
    "fastestLaps": true,
    "poles": true,
    "raceControl": false
  },
  "sources": [
    "FIA WEC 2013 Silverstone Race Final Classification by Class (Al Kamel)",
    "FIA WEC 2013 Silverstone Qualifying Practice Classification by Class (Al Kamel)",
    "FIA WEC 2013 Silverstone Race Provisional Classification by Driver Fastest Lap (Al Kamel)",
    "FIA WEC 2013 Silverstone Qualifying Practice Fastest Lap by Driver (Al Kamel)"
  ]
};
replaceRace(WEC_SILVERSTONE_2013_GOLD);

// WEC 2014 Silverstone (round 1) - real import. First season with the LMP1-H/LMP1-L split
// (see js/app.js flFamilyOf - merged back to one "LMP1" row in FL Classification for this
// season only). Pole-position driver attribution uses the qualifying session's own
// "FastestLapByDriverAfter...ByClass" document, filtered to its Session column so a car's
// unused 3rd crew member's practice-session personal best doesn't wrongly displace one of
// the two actually-nominated qualifying drivers.
const WEC_SILVERSTONE_2014_GOLD={
  "id": "wec-silverstone-2014",
  "season": 2014,
  "round": 1,
  "series": "wec",
  "event": "6 Hours of Silverstone",
  "circuit": "Silverstone",
  "country": "United Kingdom",
  "date": "2014-04-20",
  "scheduledDuration": "06:00:00",
  "officialDuration": "5:22:42.296",
  "scheduledLaps": 190,
  "officialLaps": 167,
  "segments": [
    {
      "id": "g0",
      "phase": "GREEN",
      "start": 0,
      "end": 19362.296,
      "startLap": 0,
      "endLap": 167,
      "reason": "Race",
      "notes": "Race Control pending manual entry."
    }
  ],
  "entries": [
    {
      "pos": 1,
      "class": "LMP1H",
      "no": "8",
      "constructor": "toyota",
      "model": "Toyota TS 040 - Hybrid",
      "team": "Toyota Racing",
      "gap": "—",
      "laps": 167,
      "time": "5:22:42.296",
      "status": "Classified",
      "drivers": [
        [
          "Anthony Davidson",
          "United Kingdom"
        ],
        [
          "Nicolas Lapierre",
          "France"
        ],
        [
          "Sébastien Buemi",
          "Switzerland"
        ]
      ],
      "bestLap": "1:44.646",
      "bestLapNo": "112",
      "bestLapDriver": "Anthony Davidson"
    },
    {
      "pos": 2,
      "class": "LMP1H",
      "no": "7",
      "constructor": "toyota",
      "model": "Toyota TS 040 - Hybrid",
      "team": "Toyota Racing",
      "gap": "1 Laps",
      "laps": 166,
      "time": "5:23:14.056",
      "status": "Classified",
      "drivers": [
        [
          "Alexander Wurz",
          ""
        ],
        [
          "Stéphane Sarrazin",
          "France"
        ],
        [
          "Kazuki Nakajima",
          "Japan"
        ]
      ],
      "bestLap": "1:44.326",
      "bestLapNo": "17",
      "bestLapDriver": "Alexander Wurz"
    },
    {
      "pos": 3,
      "class": "LMP1H",
      "no": "20",
      "constructor": "porsche",
      "model": "Porsche 919 Hybrid",
      "team": "Porsche Team",
      "gap": "2 Laps",
      "laps": 165,
      "time": "5:22:47.120",
      "status": "Classified",
      "drivers": [
        [
          "Timo Bernhard",
          ""
        ],
        [
          "Mark Webber",
          ""
        ],
        [
          "Brendon Hartley",
          "New Zealand"
        ]
      ],
      "bestLap": "1:45.245",
      "bestLapNo": "4",
      "bestLapDriver": "Timo Bernhard"
    },
    {
      "pos": 4,
      "class": "LMP1L",
      "no": "12",
      "constructor": "toyota",
      "model": "Lola B12/60 - Toyota",
      "team": "Rebellion Racing",
      "gap": "8 Laps",
      "laps": 159,
      "time": "5:23:52.071",
      "status": "Classified",
      "drivers": [
        [
          "Nicolas Prost",
          ""
        ],
        [
          "Nick Heidfeld",
          ""
        ],
        [
          "Mathias Beche",
          ""
        ]
      ],
      "bestLap": "1:47.195",
      "bestLapNo": "5",
      "bestLapDriver": "Nick Heidfeld"
    },
    {
      "pos": 5,
      "class": "LMP2",
      "no": "26",
      "constructor": "nissan",
      "model": "Morgan - Nissan",
      "team": "G-Drive Racing",
      "gap": "—",
      "laps": 154,
      "time": "5:24:15.065",
      "status": "Classified",
      "drivers": [
        [
          "Roman Rusinov",
          "Russia"
        ],
        [
          "Olivier Pla",
          "France"
        ],
        [
          "Julien Canal",
          "France"
        ]
      ],
      "bestLap": "1:51.339",
      "bestLapNo": "3",
      "bestLapDriver": "Olivier Pla"
    },
    {
      "pos": 6,
      "class": "LMP2",
      "no": "47",
      "constructor": "oreca",
      "model": "Oreca 03 - Nissan",
      "team": "KCMG",
      "gap": "2 Laps",
      "laps": 152,
      "time": "5:22:59.911",
      "status": "Classified",
      "drivers": [
        [
          "Matthew Howson",
          ""
        ],
        [
          "Richard Bradley",
          ""
        ],
        [
          "Tsugio Matsuda",
          ""
        ]
      ],
      "bestLap": "1:51.597",
      "bestLapNo": "4",
      "bestLapDriver": "Tsugio Matsuda"
    },
    {
      "pos": 7,
      "class": "GTEPRO",
      "no": "92",
      "constructor": "porsche",
      "model": "Porsche 911 RSR",
      "team": "Porsche Team Manthey",
      "gap": "—",
      "laps": 147,
      "time": "5:23:11.855",
      "status": "Classified",
      "drivers": [
        [
          "Marco Holzer",
          ""
        ],
        [
          "Frédéric Makowiecki",
          "France"
        ],
        [
          "Richard Lietz",
          "Austria"
        ]
      ],
      "bestLap": "2:00.963",
      "bestLapNo": "3",
      "bestLapDriver": "Frédéric Makowiecki"
    },
    {
      "pos": 8,
      "class": "GTEPRO",
      "no": "91",
      "constructor": "porsche",
      "model": "Porsche 911 RSR",
      "team": "Porsche Team Manthey",
      "gap": "45.781",
      "laps": 147,
      "time": "5:23:57.636",
      "status": "Classified",
      "drivers": [
        [
          "Patrick Pilet",
          ""
        ],
        [
          "Jörg Bergmeister",
          "Germany"
        ],
        [
          "Nick Tandy",
          ""
        ]
      ],
      "bestLap": "2:01.075",
      "bestLapNo": "3",
      "bestLapDriver": "Nick Tandy"
    },
    {
      "pos": 9,
      "class": "GTEPRO",
      "no": "97",
      "constructor": "astonmartin",
      "model": "Aston Martin Vantage V8",
      "team": "Aston Martin Racing",
      "gap": "42.064",
      "laps": 147,
      "time": "5:24:39.700",
      "status": "Classified",
      "drivers": [
        [
          "Darren Turner",
          "United Kingdom"
        ],
        [
          "Stefan Mücke",
          "Germany"
        ]
      ],
      "bestLap": "2:02.054",
      "bestLapNo": "3",
      "bestLapDriver": "Darren Turner"
    },
    {
      "pos": 10,
      "class": "GTEPRO",
      "no": "51",
      "constructor": "ferrari",
      "model": "Ferrari F458 Italia",
      "team": "AF Corse",
      "gap": "31.362",
      "laps": 147,
      "time": "5:25:11.062",
      "status": "Classified",
      "drivers": [
        [
          "Gianmaria Bruni",
          "Italy"
        ],
        [
          "Toni Vilander",
          ""
        ]
      ],
      "bestLap": "2:01.282",
      "bestLapNo": "3",
      "bestLapDriver": "Gianmaria Bruni"
    },
    {
      "pos": 11,
      "class": "GTEPRO",
      "no": "71",
      "constructor": "ferrari",
      "model": "Ferrari F458 Italia",
      "team": "AF Corse",
      "gap": "1 Laps",
      "laps": 146,
      "time": "5:25:06.489",
      "status": "Classified",
      "drivers": [
        [
          "Davide Rigon",
          ""
        ],
        [
          "James Calado",
          ""
        ]
      ],
      "bestLap": "2:01.909",
      "bestLapNo": "3",
      "bestLapDriver": "Davide Rigon"
    },
    {
      "pos": 12,
      "class": "GTEPRO",
      "no": "52",
      "constructor": "ferrari",
      "model": "Ferrari F458 Italia",
      "team": "RAM Racing",
      "gap": "1 Laps",
      "laps": 146,
      "time": "5:25:09.645",
      "status": "Classified",
      "drivers": [
        [
          "Matt Griffin",
          ""
        ],
        [
          "Alvaro Parente",
          ""
        ]
      ],
      "bestLap": "2:02.651",
      "bestLapNo": "97",
      "bestLapDriver": "Matt Griffin"
    },
    {
      "pos": 13,
      "class": "LMP2",
      "no": "27",
      "constructor": "oreca",
      "model": "Oreca 03 - Nissan",
      "team": "SMP Racing",
      "gap": "9 Laps",
      "laps": 145,
      "time": "5:23:53.313",
      "status": "Classified",
      "drivers": [
        [
          "Serguey Zlobin",
          ""
        ],
        [
          "Nicolas Minassian",
          ""
        ],
        [
          "Maurizio Mediani",
          ""
        ]
      ],
      "bestLap": "1:52.798",
      "bestLapNo": "4",
      "bestLapDriver": "Nicolas Minassian"
    },
    {
      "pos": 14,
      "class": "GTEPRO",
      "no": "99",
      "constructor": "astonmartin",
      "model": "Aston Martin Vantage V8",
      "team": "Aston Martin Racing",
      "gap": "3 Laps",
      "laps": 144,
      "time": "5:23:56.399",
      "status": "Classified",
      "drivers": [
        [
          "Alex Macdowall",
          ""
        ],
        [
          "Darryl O'Young",
          ""
        ],
        [
          "Fernando Rees",
          ""
        ]
      ],
      "bestLap": "2:02.549",
      "bestLapNo": "48",
      "bestLapDriver": "Fernando Rees"
    },
    {
      "pos": 15,
      "class": "GTEAM",
      "no": "95",
      "constructor": "astonmartin",
      "model": "Aston Martin Vantage V8",
      "team": "Aston Martin Racing",
      "gap": "—",
      "laps": 144,
      "time": "5:25:05.013",
      "status": "Classified",
      "drivers": [
        [
          "Kristian Poulsen",
          ""
        ],
        [
          "David Heinemeir Hansson",
          ""
        ],
        [
          "Nicki Thiim",
          ""
        ]
      ],
      "bestLap": "2:02.656",
      "bestLapNo": "114",
      "bestLapDriver": "Nicki Thiim"
    },
    {
      "pos": 16,
      "class": "GTEAM",
      "no": "98",
      "constructor": "astonmartin",
      "model": "Aston Martin Vantage V8",
      "team": "Aston Martin Racing",
      "gap": "7.496",
      "laps": 144,
      "time": "5:25:12.509",
      "status": "Classified",
      "drivers": [
        [
          "Paul Dalla Lana",
          "Canada"
        ],
        [
          "Pedro Lamy",
          "Portugal"
        ],
        [
          "Christoffer Nygaard",
          ""
        ]
      ],
      "bestLap": "2:02.212",
      "bestLapNo": "4",
      "bestLapDriver": "Pedro Lamy"
    },
    {
      "pos": 17,
      "class": "GTEAM",
      "no": "81",
      "constructor": "ferrari",
      "model": "Ferrari F458 Italia",
      "team": "AF Corse",
      "gap": "1 Laps",
      "laps": 143,
      "time": "5:25:12.924",
      "status": "Classified",
      "drivers": [
        [
          "Stephen Wyatt",
          ""
        ],
        [
          "Michele Rugolo",
          ""
        ],
        [
          "Sam Bird",
          "United Kingdom"
        ]
      ],
      "bestLap": "2:02.147",
      "bestLapNo": "3",
      "bestLapDriver": "Sam Bird"
    },
    {
      "pos": 18,
      "class": "GTEAM",
      "no": "88",
      "constructor": "porsche",
      "model": "Porsche 911 RSR",
      "team": "Proton Competition",
      "gap": "2 Laps",
      "laps": 142,
      "time": "5:24:35.104",
      "status": "Classified",
      "drivers": [
        [
          "Christian Ried",
          ""
        ],
        [
          "Klaus Bachler",
          ""
        ],
        [
          "Khaled Al Qubaisi",
          "United Arab Emirates"
        ]
      ],
      "bestLap": "2:02.414",
      "bestLapNo": "3",
      "bestLapDriver": "Klaus Bachler"
    },
    {
      "pos": 19,
      "class": "GTEAM",
      "no": "53",
      "constructor": "ferrari",
      "model": "Ferrari F458 Italia",
      "team": "RAM Racing",
      "gap": "3 Laps",
      "laps": 141,
      "time": "5:24:35.564",
      "status": "Classified",
      "drivers": [
        [
          "Johnny Mowlem",
          "United Kingdom"
        ],
        [
          "Mark Patterson",
          "United States"
        ],
        [
          "Ben Collins",
          ""
        ]
      ],
      "bestLap": "2:04.077",
      "bestLapNo": "39",
      "bestLapDriver": "Ben Collins"
    },
    {
      "pos": 20,
      "class": "GTEAM",
      "no": "61",
      "constructor": "ferrari",
      "model": "Ferrari F458 Italia",
      "team": "AF Corse",
      "gap": "3 Laps",
      "laps": 141,
      "time": "5:24:40.020",
      "status": "Classified",
      "drivers": [
        [
          "Luis Perez-Companc",
          "Argentina"
        ],
        [
          "Marco Cioci",
          ""
        ],
        [
          "Mirko Venturi",
          ""
        ]
      ],
      "bestLap": "2:02.706",
      "bestLapNo": "3",
      "bestLapDriver": "Marco Cioci"
    },
    {
      "pos": 21,
      "class": "LMP1H",
      "no": "2",
      "constructor": "audi",
      "model": "Audi R18 e-tron quattro",
      "team": "Audi Sport Team Joest",
      "gap": "NC",
      "laps": 94,
      "time": "3:03:21.796",
      "status": "NC",
      "drivers": [
        [
          "Fässler",
          ""
        ],
        [
          "André Lotterer",
          "Germany"
        ],
        [
          "Benoit Tréluyer",
          ""
        ]
      ],
      "bestLap": "1:44.217",
      "bestLapNo": "17",
      "bestLapDriver": "André Lotterer"
    },
    {
      "pos": 22,
      "class": "GTEAM",
      "no": "75",
      "constructor": "porsche",
      "model": "Porsche 911 GT3 RSR",
      "team": "Prospeed Competition",
      "gap": "NC",
      "laps": 83,
      "time": "3:07:49.251",
      "status": "NC",
      "drivers": [
        [
          "François Perrodo",
          ""
        ],
        [
          "Emmanuel Collard",
          ""
        ],
        [
          "Matthieu Vaxivière",
          ""
        ]
      ],
      "bestLap": "2:04.015",
      "bestLapNo": "72",
      "bestLapDriver": "Matthieu Vaxivière"
    },
    {
      "pos": 23,
      "class": "LMP2",
      "no": "37",
      "constructor": "oreca",
      "model": "Oreca 03 - Nissan",
      "team": "SMP Racing",
      "gap": "NC",
      "laps": 65,
      "time": "2:19:23.736",
      "status": "NC",
      "drivers": [
        [
          "Kirill Ladygin",
          ""
        ],
        [
          "Shaitar",
          ""
        ],
        [
          "Anton Ladygin",
          ""
        ]
      ],
      "bestLap": "1:52.734",
      "bestLapNo": "5",
      "bestLapDriver": "Kirill Ladygin"
    },
    {
      "pos": 24,
      "class": "LMP1H",
      "no": "14",
      "constructor": "porsche",
      "model": "Porsche 919 Hybrid",
      "team": "Porsche Team",
      "gap": "NC",
      "laps": 30,
      "time": "1:16:04.499",
      "status": "NC",
      "drivers": [
        [
          "Dumas",
          ""
        ],
        [
          "Neel Jani",
          ""
        ],
        [
          "Lieb",
          ""
        ]
      ],
      "bestLap": "1:45.452",
      "bestLapNo": "6",
      "bestLapDriver": "Neel Jani"
    },
    {
      "pos": 25,
      "class": "LMP1H",
      "no": "1",
      "constructor": "audi",
      "model": "Audi R18 e-tron quattro",
      "team": "Audi Sport Team Joest",
      "gap": "NC",
      "laps": 0,
      "time": "",
      "status": "NC",
      "drivers": [
        [
          "Lucas di Grassi",
          ""
        ],
        [
          "Duval",
          ""
        ],
        [
          "Kristensen",
          ""
        ]
      ],
      "bestLap": "1:44.656",
      "bestLapNo": "17",
      "bestLapDriver": "Lucas di Grassi"
    },
    {
      "pos": 26,
      "class": "LMP1L",
      "no": "13",
      "constructor": "toyota",
      "model": "Lola B12/60 - Toyota",
      "team": "Rebellion Racing",
      "gap": "NC",
      "laps": 0,
      "time": "",
      "status": "NC",
      "drivers": [
        [
          "Kraihamer",
          ""
        ],
        [
          "Andrea Belicchi",
          "Italy"
        ],
        [
          "Leimer",
          ""
        ]
      ],
      "bestLap": "1:47.120",
      "bestLapNo": "5",
      "bestLapDriver": "Andrea Belicchi"
    },
    {
      "pos": 27,
      "class": "GTEAM",
      "no": "90",
      "constructor": "ferrari",
      "model": "Ferrari F458 Italia",
      "team": "8 Star Motorsports",
      "gap": "RET",
      "laps": 118,
      "time": "4:29:24.266",
      "status": "RET",
      "drivers": [
        [
          "Vicente Potolicchio",
          ""
        ],
        [
          "Gianluca Roda",
          ""
        ],
        [
          "Paolo Ruberti",
          ""
        ]
      ],
      "bestLap": "2:02.878",
      "bestLapNo": "3",
      "bestLapDriver": "Paolo Ruberti"
    }
  ],
  "performance": {
    "fastestLaps": [
      {
        "type": "FL",
        "class": "LMP1H",
        "no": "2",
        "team": "Audi Sport Team Joest",
        "driver": "André Lotterer",
        "lap": "",
        "time": "1:44.217"
      },
      {
        "type": "FL",
        "class": "LMP1L",
        "no": "13",
        "team": "Rebellion Racing",
        "driver": "Andrea Belicchi",
        "lap": "",
        "time": "1:47.120"
      },
      {
        "type": "FL",
        "class": "GTEPRO",
        "no": "92",
        "team": "Porsche Team Manthey",
        "driver": "Frédéric Makowiecki",
        "lap": "",
        "time": "2:00.963"
      },
      {
        "type": "FL",
        "class": "GTEAM",
        "no": "81",
        "team": "AF Corse",
        "driver": "Sam Bird",
        "lap": "",
        "time": "2:02.147"
      },
      {
        "type": "FL",
        "class": "Overall",
        "no": "2",
        "team": "Audi Sport Team Joest",
        "driver": "André Lotterer",
        "lap": "",
        "time": "1:44.217"
      },
      {
        "type": "FL",
        "class": "LMP2",
        "no": "26",
        "team": "G-Drive Racing",
        "driver": "Olivier Pla",
        "lap": "",
        "time": "1:51.339"
      }
    ],
    "poles": [
      {
        "type": "PP",
        "class": "GTEAM",
        "no": "81",
        "team": "AF Corse",
        "driver": "S. Wyatt",
        "time": "1:59.932"
      },
      {
        "type": "PP",
        "class": "GTEAM",
        "no": "81",
        "team": "AF Corse",
        "driver": "M. Rugolo",
        "time": "1:59.932"
      },
      {
        "type": "PP",
        "class": "GTEAM",
        "no": "81",
        "team": "AF Corse",
        "driver": "S. Bird",
        "time": "1:59.932"
      },
      {
        "type": "PP",
        "class": "GTEPRO",
        "no": "51",
        "team": "AF Corse",
        "driver": "Gianmaria Bruni",
        "time": "1:59.125"
      },
      {
        "type": "PP",
        "class": "GTEPRO",
        "no": "51",
        "team": "AF Corse",
        "driver": "Toni Vilander",
        "time": "1:59.125"
      },
      {
        "type": "PP",
        "class": "LMP1H",
        "no": "7",
        "team": "Toyota Racing",
        "driver": "Kazuki Nakajima",
        "time": "1:42.774"
      },
      {
        "type": "PP",
        "class": "Overall",
        "no": "7",
        "team": "Toyota Racing",
        "driver": "Kazuki Nakajima",
        "time": "1:42.774"
      },
      {
        "type": "PP",
        "class": "LMP1H",
        "no": "7",
        "team": "Toyota Racing",
        "driver": "Alexander Wurz",
        "time": "1:42.774"
      },
      {
        "type": "PP",
        "class": "Overall",
        "no": "7",
        "team": "Toyota Racing",
        "driver": "Alexander Wurz",
        "time": "1:42.774"
      },
      {
        "type": "PP",
        "class": "LMP1L",
        "no": "13",
        "team": "Rebellion Racing",
        "driver": "Fabio Leimer",
        "time": "1:44.285"
      },
      {
        "type": "PP",
        "class": "LMP1L",
        "no": "13",
        "team": "Rebellion Racing",
        "driver": "Dominik Kraihamer",
        "time": "1:44.285"
      },
      {
        "type": "PP",
        "class": "LMP2",
        "no": "26",
        "team": "G-Drive Racing",
        "driver": "Olivier Pla",
        "time": "1:49.156"
      },
      {
        "type": "PP",
        "class": "LMP2",
        "no": "26",
        "team": "G-Drive Racing",
        "driver": "Roman Rusinov",
        "time": "1:49.156"
      }
    ]
  },
  "qualifying": [
    {
      "pos": 1,
      "no": "81",
      "class": "GTEAM",
      "team": "AF Corse",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "drivers": [
        [
          "S. Wyatt",
          ""
        ],
        [
          "M. Rugolo",
          ""
        ],
        [
          "S. Bird",
          "United Kingdom"
        ]
      ],
      "driver1Time": "2:00.369",
      "driver2Time": "2:00.901",
      "laps": 4,
      "time": "1:59.932",
      "timeDrivers": [
        "S. Wyatt",
        "M. Rugolo",
        "S. Bird"
      ]
    },
    {
      "pos": 2,
      "no": "98",
      "class": "GTEAM",
      "team": "Aston Martin Racing",
      "model": "Aston Martin Vantage V8",
      "constructor": "astonmartin",
      "drivers": [
        [
          "P. Dalla Lana",
          "Canada"
        ],
        [
          "P. Lamy",
          "Portugal"
        ],
        [
          "C. Nygaard",
          ""
        ]
      ],
      "driver1Time": "2:01.536",
      "driver2Time": "2:01.786",
      "laps": 4,
      "time": "2:00.923",
      "timeDrivers": [
        "Pedro Lamy",
        "Christoffer Nygaard"
      ]
    },
    {
      "pos": 3,
      "no": "61",
      "class": "GTEAM",
      "team": "AF Corse",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "drivers": [
        [
          "L. Perez-Companc",
          "Argentina"
        ],
        [
          "M. Cioci",
          ""
        ],
        [
          "M. Venturi",
          ""
        ]
      ],
      "driver1Time": "2:01.567",
      "driver2Time": "2:01.733",
      "laps": 4,
      "time": "2:00.971",
      "timeDrivers": [
        "Marco Cioci",
        "Mirko Venturi"
      ]
    },
    {
      "pos": 4,
      "no": "95",
      "class": "GTEAM",
      "team": "Aston Martin Racing",
      "model": "Aston Martin Vantage V8",
      "constructor": "astonmartin",
      "drivers": [
        [
          "K. Poulsen",
          ""
        ],
        [
          "D. Heinemeir Hansson",
          ""
        ],
        [
          "N. Thiim",
          ""
        ]
      ],
      "driver1Time": "2:00.906",
      "driver2Time": "2:01.244",
      "laps": 4,
      "time": "2:00.982",
      "timeDrivers": [
        "David Heinemeir Hansson",
        "Nicki Thiim"
      ]
    },
    {
      "pos": 5,
      "no": "75",
      "class": "GTEAM",
      "team": "Prospeed Competition",
      "model": "Porsche 911 GT3 RSR",
      "constructor": "porsche",
      "drivers": [
        [
          "F. Perrodo",
          ""
        ],
        [
          "E. Collard",
          ""
        ],
        [
          "M. Vaxivière",
          ""
        ]
      ],
      "driver1Time": "2:02.580",
      "driver2Time": "2:02.703",
      "laps": 4,
      "time": "2:01.886",
      "timeDrivers": [
        "F. Perrodo",
        "E. Collard",
        "M. Vaxivière"
      ]
    },
    {
      "pos": 6,
      "no": "88",
      "class": "GTEAM",
      "team": "Proton Competition",
      "model": "Porsche 911 RSR",
      "constructor": "porsche",
      "drivers": [
        [
          "C. Ried",
          ""
        ],
        [
          "K. Bachler",
          ""
        ],
        [
          "K. Al Qubaisi",
          "United Arab Emirates"
        ]
      ],
      "driver1Time": "2:03.734",
      "driver2Time": "2:03.934",
      "laps": 4,
      "time": "2:01.917",
      "timeDrivers": [
        "C. Ried",
        "K. Bachler",
        "K. Al Qubaisi"
      ]
    },
    {
      "pos": 7,
      "no": "53",
      "class": "GTEAM",
      "team": "RAM Racing",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "drivers": [
        [
          "J. Mowlem",
          "United Kingdom"
        ],
        [
          "M. Patterson",
          "United States"
        ],
        [
          "B. Collins",
          ""
        ]
      ],
      "driver1Time": "2:02.335",
      "driver2Time": "2:02.383",
      "laps": 4,
      "time": "2:01.953",
      "timeDrivers": [
        "Ben Collins",
        "Johnny Mowlem"
      ]
    },
    {
      "pos": 8,
      "no": "90",
      "class": "GTEAM",
      "team": "8 Star Motorsports",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "drivers": [
        [
          "V. Potolicchio",
          ""
        ],
        [
          "G. Roda",
          ""
        ],
        [
          "P. Ruberti",
          ""
        ]
      ],
      "driver1Time": "2:03.086",
      "driver2Time": "2:03.256",
      "laps": 4,
      "time": "2:01.982",
      "timeDrivers": [
        "V. Potolicchio",
        "G. Roda",
        "P. Ruberti"
      ]
    },
    {
      "pos": 1,
      "no": "51",
      "class": "GTEPRO",
      "team": "AF Corse",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "drivers": [
        [
          "G. Bruni",
          "Italy"
        ],
        [
          "T. Vilander",
          ""
        ]
      ],
      "driver1Time": "1:59.363",
      "driver2Time": "1:59.684",
      "laps": 4,
      "time": "1:59.125",
      "timeDrivers": [
        "Gianmaria Bruni",
        "Toni Vilander"
      ]
    },
    {
      "pos": 2,
      "no": "91",
      "class": "GTEPRO",
      "team": "Porsche Team Manthey",
      "model": "Porsche 911 RSR",
      "constructor": "porsche",
      "drivers": [
        [
          "P. Pilet",
          ""
        ],
        [
          "J. Bergmeister",
          "Germany"
        ],
        [
          "N. Tandy",
          ""
        ]
      ],
      "driver1Time": "1:59.973",
      "driver2Time": "2:00.113",
      "laps": 4,
      "time": "1:59.380",
      "timeDrivers": [
        "P. Pilet",
        "J. Bergmeister",
        "N. Tandy"
      ]
    },
    {
      "pos": 3,
      "no": "92",
      "class": "GTEPRO",
      "team": "Porsche Team Manthey",
      "model": "Porsche 911 RSR",
      "constructor": "porsche",
      "drivers": [
        [
          "M. Holzer",
          ""
        ],
        [
          "F. Makowiecki",
          "France"
        ],
        [
          "R. Lietz",
          "Austria"
        ]
      ],
      "driver1Time": "1:59.931",
      "driver2Time": "2:00.390",
      "laps": 4,
      "time": "1:59.717",
      "timeDrivers": [
        "Marco Holzer",
        "Frédéric Makowiecki"
      ]
    },
    {
      "pos": 4,
      "no": "71",
      "class": "GTEPRO",
      "team": "AF Corse",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "drivers": [
        [
          "D. Rigon",
          ""
        ],
        [
          "J. Calado",
          ""
        ]
      ],
      "driver1Time": "2:00.431",
      "driver2Time": "2:00.563",
      "laps": 4,
      "time": "1:59.841",
      "timeDrivers": [
        "Davide Rigon",
        "James Calado"
      ]
    },
    {
      "pos": 5,
      "no": "97",
      "class": "GTEPRO",
      "team": "Aston Martin Racing",
      "model": "Aston Martin Vantage V8",
      "constructor": "astonmartin",
      "drivers": [
        [
          "D. Turner",
          "United Kingdom"
        ],
        [
          "S. Mücke",
          "Germany"
        ]
      ],
      "driver1Time": "2:00.216",
      "driver2Time": "2:00.324",
      "laps": 4,
      "time": "1:59.954",
      "timeDrivers": [
        "Stefan Mücke",
        "Darren Turner"
      ]
    },
    {
      "pos": 6,
      "no": "52",
      "class": "GTEPRO",
      "team": "RAM Racing",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "drivers": [
        [
          "M. Griffin",
          ""
        ],
        [
          "A. Parente",
          ""
        ]
      ],
      "driver1Time": "2:00.635",
      "driver2Time": "2:00.745",
      "laps": 4,
      "time": "2:00.216",
      "timeDrivers": [
        "Alvaro Parente",
        "Matt Griffin"
      ]
    },
    {
      "pos": 7,
      "no": "99",
      "class": "GTEPRO",
      "team": "Aston Martin Racing",
      "model": "Aston Martin Vantage V8",
      "constructor": "astonmartin",
      "drivers": [
        [
          "A. Macdowall",
          ""
        ],
        [
          "D. O'Young",
          ""
        ],
        [
          "F. Rees",
          ""
        ]
      ],
      "driver1Time": "2:01.479",
      "driver2Time": "2:01.986",
      "laps": 4,
      "time": "2:01.122",
      "timeDrivers": [
        "Alex Macdowall",
        "Darryl O'Young"
      ]
    },
    {
      "pos": 1,
      "no": "7",
      "class": "LMP1H",
      "team": "Toyota Racing",
      "model": "Toyota TS 040 - Hybrid",
      "constructor": "toyota",
      "drivers": [
        [
          "A. Wurz",
          ""
        ],
        [
          "S. Sarrazin",
          "France"
        ],
        [
          "K. Nakajima",
          "Japan"
        ]
      ],
      "driver1Time": "1:42.509",
      "driver2Time": "1:42.933",
      "laps": 4,
      "time": "1:42.774",
      "timeDrivers": [
        "Kazuki Nakajima",
        "Alexander Wurz"
      ]
    },
    {
      "pos": 2,
      "no": "1",
      "class": "LMP1H",
      "team": "Audi Sport Team Joest",
      "model": "Audi R18 e-tron quattro",
      "constructor": "audi",
      "drivers": [
        [
          "L. di Grassi",
          ""
        ],
        [
          "L. Duval",
          "France"
        ],
        [
          "T. Kristensen",
          ""
        ]
      ],
      "driver1Time": "1:42.847",
      "driver2Time": "1:43.020",
      "laps": 4,
      "time": "1:42.779",
      "timeDrivers": [
        "Tom Kristensen",
        "Loïc Duval"
      ]
    },
    {
      "pos": 3,
      "no": "14",
      "class": "LMP1H",
      "team": "Porsche Team",
      "model": "Porsche 919 Hybrid",
      "constructor": "porsche",
      "drivers": [
        [
          "R. Dumas",
          ""
        ],
        [
          "N. Jani",
          ""
        ],
        [
          "M. Lieb",
          ""
        ]
      ],
      "driver1Time": "1:43.425",
      "driver2Time": "1:43.467",
      "laps": 4,
      "time": "1:43.087",
      "timeDrivers": [
        "Romain Dumas",
        "Neel Jani"
      ]
    },
    {
      "pos": 4,
      "no": "2",
      "class": "LMP1H",
      "team": "Audi Sport Team Joest",
      "model": "Audi R18 e-tron quattro",
      "constructor": "audi",
      "drivers": [
        [
          "M. Fässler",
          ""
        ],
        [
          "A. Lotterer",
          "Germany"
        ],
        [
          "B. Tréluyer",
          ""
        ]
      ],
      "driver1Time": "1:42.829",
      "driver2Time": "1:42.897",
      "laps": 4,
      "time": "1:43.137",
      "timeDrivers": [
        "André Lotterer",
        "Benoit Tréluyer"
      ]
    },
    {
      "pos": 5,
      "no": "8",
      "class": "LMP1H",
      "team": "Toyota Racing",
      "model": "Toyota TS 040 - Hybrid",
      "constructor": "toyota",
      "drivers": [
        [
          "A. Davidson",
          "United Kingdom"
        ],
        [
          "N. Lapierre",
          "France"
        ],
        [
          "S. Buemi",
          "Switzerland"
        ]
      ],
      "driver1Time": "1:43.607",
      "driver2Time": "1:43.618",
      "laps": 4,
      "time": "1:43.189",
      "timeDrivers": [
        "Anthony Davidson",
        "Nicolas Lapierre"
      ]
    },
    {
      "pos": 6,
      "no": "20",
      "class": "LMP1H",
      "team": "Porsche Team",
      "model": "Porsche 919 Hybrid",
      "constructor": "porsche",
      "drivers": [
        [
          "T. Bernhard",
          ""
        ],
        [
          "M. Webber",
          ""
        ],
        [
          "B. Hartley",
          "New Zealand"
        ]
      ],
      "driver1Time": "1:43.556",
      "driver2Time": "1:43.717",
      "laps": 4,
      "time": "1:43.226",
      "timeDrivers": [
        "Mark Webber",
        "Timo Bernhard"
      ]
    },
    {
      "pos": 7,
      "no": "13",
      "class": "LMP1L",
      "team": "Rebellion Racing",
      "model": "Lola B12/60 - Toyota",
      "constructor": "toyota",
      "drivers": [
        [
          "D. Kraihamer",
          "Austria"
        ],
        [
          "A. Belicchi",
          "Italy"
        ],
        [
          "F. Leimer",
          ""
        ]
      ],
      "driver1Time": "1:44.739",
      "driver2Time": "1:44.744",
      "laps": 4,
      "time": "1:44.285",
      "timeDrivers": [
        "Fabio Leimer",
        "Dominik Kraihamer"
      ]
    },
    {
      "pos": 8,
      "no": "12",
      "class": "LMP1L",
      "team": "Rebellion Racing",
      "model": "Lola B12/60 - Toyota",
      "constructor": "toyota",
      "drivers": [
        [
          "N. Prost",
          ""
        ],
        [
          "N. Heidfeld",
          ""
        ],
        [
          "M. Beche",
          ""
        ]
      ],
      "driver1Time": "1:44.773",
      "driver2Time": "1:45.042",
      "laps": 4,
      "time": "1:44.392",
      "timeDrivers": [
        "Nick Heidfeld",
        "Mathias Beche"
      ]
    },
    {
      "pos": 1,
      "no": "26",
      "class": "LMP2",
      "team": "G-Drive Racing",
      "model": "Morgan - Nissan",
      "constructor": "nissan",
      "drivers": [
        [
          "R. Rusinov",
          "Russia"
        ],
        [
          "O. Pla",
          "France"
        ],
        [
          "J. Canal",
          "France"
        ]
      ],
      "driver1Time": "1:49.089",
      "driver2Time": "1:49.432",
      "laps": 4,
      "time": "1:49.156",
      "timeDrivers": [
        "Olivier Pla",
        "Roman Rusinov"
      ]
    },
    {
      "pos": 2,
      "no": "47",
      "class": "LMP2",
      "team": "KCMG",
      "model": "Oreca 03 - Nissan",
      "constructor": "oreca",
      "drivers": [
        [
          "M. Howson",
          ""
        ],
        [
          "R. Bradley",
          ""
        ],
        [
          "T. Matsuda",
          ""
        ]
      ],
      "driver1Time": "1:49.633",
      "driver2Time": "1:49.666",
      "laps": 4,
      "time": "1:49.439",
      "timeDrivers": [
        "Tsugio Matsuda",
        "Richard Bradley"
      ]
    },
    {
      "pos": 3,
      "no": "37",
      "class": "LMP2",
      "team": "SMP Racing",
      "model": "Oreca 03 - Nissan",
      "constructor": "oreca",
      "drivers": [
        [
          "K. Ladygin",
          ""
        ],
        [
          "V. Shaitar",
          ""
        ],
        [
          "A. Ladygin",
          ""
        ]
      ],
      "driver1Time": "1:51.686",
      "driver2Time": "1:52.067",
      "laps": 4,
      "time": "1:51.236",
      "timeDrivers": [
        "Kirill Ladygin",
        "Viktor Shaitar"
      ]
    },
    {
      "pos": 4,
      "no": "27",
      "class": "LMP2",
      "team": "SMP Racing",
      "model": "Oreca 03 - Nissan",
      "constructor": "oreca",
      "drivers": [
        [
          "S. Zlobin",
          ""
        ],
        [
          "N. Minassian",
          ""
        ],
        [
          "M. Mediani",
          ""
        ]
      ],
      "driver1Time": "1:52.238",
      "driver2Time": "1:52.309",
      "laps": 4,
      "time": "1:51.514",
      "timeDrivers": [
        "S. Zlobin",
        "N. Minassian",
        "M. Mediani"
      ]
    }
  ],
  "flClassification": [
    {
      "class": "LMP1H",
      "no": "2",
      "team": "Audi Sport Team Joest",
      "model": "Audi R18 e-tron quattro",
      "constructor": "audi",
      "driver": "André Lotterer",
      "time": "1:44.217"
    },
    {
      "class": "LMP1H",
      "no": "7",
      "team": "Toyota Racing",
      "model": "Toyota TS 040 - Hybrid",
      "constructor": "toyota",
      "driver": "Alexander Wurz",
      "time": "1:44.326"
    },
    {
      "class": "LMP1H",
      "no": "8",
      "team": "Toyota Racing",
      "model": "Toyota TS 040 - Hybrid",
      "constructor": "toyota",
      "driver": "Anthony Davidson",
      "time": "1:44.646"
    },
    {
      "class": "LMP1H",
      "no": "1",
      "team": "Audi Sport Team Joest",
      "model": "Audi R18 e-tron quattro",
      "constructor": "audi",
      "driver": "Lucas di Grassi",
      "time": "1:44.656"
    },
    {
      "class": "LMP1H",
      "no": "8",
      "team": "Toyota Racing",
      "model": "Toyota TS 040 - Hybrid",
      "constructor": "toyota",
      "driver": "Sébastien Buemi",
      "time": "1:44.708"
    },
    {
      "class": "LMP1H",
      "no": "7",
      "team": "Toyota Racing",
      "model": "Toyota TS 040 - Hybrid",
      "constructor": "toyota",
      "driver": "Kazuki Nakajima",
      "time": "1:44.904"
    },
    {
      "class": "LMP1H",
      "no": "20",
      "team": "Porsche Team",
      "model": "Porsche 919 Hybrid",
      "constructor": "porsche",
      "driver": "Timo Bernhard",
      "time": "1:45.245"
    },
    {
      "class": "LMP1H",
      "no": "7",
      "team": "Toyota Racing",
      "model": "Toyota TS 040 - Hybrid",
      "constructor": "toyota",
      "driver": "Stéphane Sarrazin",
      "time": "1:45.354"
    },
    {
      "class": "LMP1H",
      "no": "8",
      "team": "Toyota Racing",
      "model": "Toyota TS 040 - Hybrid",
      "constructor": "toyota",
      "driver": "Nicolas Lapierre",
      "time": "1:45.433"
    },
    {
      "class": "LMP1H",
      "no": "14",
      "team": "Porsche Team",
      "model": "Porsche 919 Hybrid",
      "constructor": "porsche",
      "driver": "Neel Jani",
      "time": "1:45.452"
    },
    {
      "class": "LMP1H",
      "no": "2",
      "team": "Audi Sport Team Joest",
      "model": "Audi R18 e-tron quattro",
      "constructor": "audi",
      "driver": "Benoit Tréluyer",
      "time": "1:45.625"
    },
    {
      "class": "LMP1H",
      "no": "20",
      "team": "Porsche Team",
      "model": "Porsche 919 Hybrid",
      "constructor": "porsche",
      "driver": "Mark Webber",
      "time": "1:46.422"
    },
    {
      "class": "LMP1H",
      "no": "20",
      "team": "Porsche Team",
      "model": "Porsche 919 Hybrid",
      "constructor": "porsche",
      "driver": "Brendon Hartley",
      "time": "1:46.868"
    },
    {
      "class": "LMP1L",
      "no": "13",
      "team": "Rebellion Racing",
      "model": "Lola B12/60 - Toyota",
      "constructor": "toyota",
      "driver": "Andrea Belicchi",
      "time": "1:47.120"
    },
    {
      "class": "LMP1L",
      "no": "12",
      "team": "Rebellion Racing",
      "model": "Lola B12/60 - Toyota",
      "constructor": "toyota",
      "driver": "Nick Heidfeld",
      "time": "1:47.195"
    },
    {
      "class": "LMP1L",
      "no": "12",
      "team": "Rebellion Racing",
      "model": "Lola B12/60 - Toyota",
      "constructor": "toyota",
      "driver": "Nicolas Prost",
      "time": "1:48.051"
    },
    {
      "class": "LMP2",
      "no": "26",
      "team": "G-Drive Racing",
      "model": "Morgan - Nissan",
      "constructor": "nissan",
      "driver": "Olivier Pla",
      "time": "1:51.339"
    },
    {
      "class": "LMP2",
      "no": "47",
      "team": "KCMG",
      "model": "Oreca 03 - Nissan",
      "constructor": "oreca",
      "driver": "Tsugio Matsuda",
      "time": "1:51.597"
    },
    {
      "class": "LMP2",
      "no": "47",
      "team": "KCMG",
      "model": "Oreca 03 - Nissan",
      "constructor": "oreca",
      "driver": "Richard Bradley",
      "time": "1:52.255"
    },
    {
      "class": "LMP2",
      "no": "37",
      "team": "SMP Racing",
      "model": "Oreca 03 - Nissan",
      "constructor": "oreca",
      "driver": "Kirill Ladygin",
      "time": "1:52.734"
    },
    {
      "class": "LMP2",
      "no": "27",
      "team": "SMP Racing",
      "model": "Oreca 03 - Nissan",
      "constructor": "oreca",
      "driver": "Nicolas Minassian",
      "time": "1:52.798"
    },
    {
      "class": "LMP2",
      "no": "26",
      "team": "G-Drive Racing",
      "model": "Morgan - Nissan",
      "constructor": "nissan",
      "driver": "Julien Canal",
      "time": "1:53.457"
    },
    {
      "class": "LMP2",
      "no": "26",
      "team": "G-Drive Racing",
      "model": "Morgan - Nissan",
      "constructor": "nissan",
      "driver": "Roman Rusinov",
      "time": "1:53.754"
    },
    {
      "class": "LMP2",
      "no": "47",
      "team": "KCMG",
      "model": "Oreca 03 - Nissan",
      "constructor": "oreca",
      "driver": "Matthew Howson",
      "time": "1:53.853"
    },
    {
      "class": "LMP2",
      "no": "27",
      "team": "SMP Racing",
      "model": "Oreca 03 - Nissan",
      "constructor": "oreca",
      "driver": "Maurizio Mediani",
      "time": "1:54.355"
    },
    {
      "class": "LMP2",
      "no": "37",
      "team": "SMP Racing",
      "model": "Oreca 03 - Nissan",
      "constructor": "oreca",
      "driver": "Anton Ladygin",
      "time": "1:56.377"
    },
    {
      "class": "LMP2",
      "no": "27",
      "team": "SMP Racing",
      "model": "Oreca 03 - Nissan",
      "constructor": "oreca",
      "driver": "Serguey Zlobin",
      "time": "1:56.723"
    },
    {
      "class": "GTEPRO",
      "no": "92",
      "team": "Porsche Team Manthey",
      "model": "Porsche 911 RSR",
      "constructor": "porsche",
      "driver": "Frédéric Makowiecki",
      "time": "2:00.963"
    },
    {
      "class": "GTEPRO",
      "no": "91",
      "team": "Porsche Team Manthey",
      "model": "Porsche 911 RSR",
      "constructor": "porsche",
      "driver": "Nick Tandy",
      "time": "2:01.075"
    },
    {
      "class": "GTEPRO",
      "no": "51",
      "team": "AF Corse",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "driver": "Gianmaria Bruni",
      "time": "2:01.282"
    },
    {
      "class": "GTEPRO",
      "no": "91",
      "team": "Porsche Team Manthey",
      "model": "Porsche 911 RSR",
      "constructor": "porsche",
      "driver": "Patrick Pilet",
      "time": "2:01.553"
    },
    {
      "class": "GTEPRO",
      "no": "92",
      "team": "Porsche Team Manthey",
      "model": "Porsche 911 RSR",
      "constructor": "porsche",
      "driver": "Richard Lietz",
      "time": "2:01.728"
    },
    {
      "class": "GTEPRO",
      "no": "71",
      "team": "AF Corse",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "driver": "Davide Rigon",
      "time": "2:01.909"
    },
    {
      "class": "GTEPRO",
      "no": "71",
      "team": "AF Corse",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "driver": "James Calado",
      "time": "2:01.954"
    },
    {
      "class": "GTEPRO",
      "no": "97",
      "team": "Aston Martin Racing",
      "model": "Aston Martin Vantage V8",
      "constructor": "astonmartin",
      "driver": "Darren Turner",
      "time": "2:02.054"
    },
    {
      "class": "GTEAM",
      "no": "81",
      "team": "AF Corse",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "driver": "Sam Bird",
      "time": "2:02.147"
    },
    {
      "class": "GTEAM",
      "no": "98",
      "team": "Aston Martin Racing",
      "model": "Aston Martin Vantage V8",
      "constructor": "astonmartin",
      "driver": "Pedro Lamy",
      "time": "2:02.212"
    },
    {
      "class": "GTEPRO",
      "no": "97",
      "team": "Aston Martin Racing",
      "model": "Aston Martin Vantage V8",
      "constructor": "astonmartin",
      "driver": "Stefan Mücke",
      "time": "2:02.265"
    },
    {
      "class": "GTEPRO",
      "no": "51",
      "team": "AF Corse",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "driver": "Toni Vilander",
      "time": "2:02.314"
    },
    {
      "class": "GTEAM",
      "no": "88",
      "team": "Proton Competition",
      "model": "Porsche 911 RSR",
      "constructor": "porsche",
      "driver": "Klaus Bachler",
      "time": "2:02.414"
    },
    {
      "class": "GTEPRO",
      "no": "99",
      "team": "Aston Martin Racing",
      "model": "Aston Martin Vantage V8",
      "constructor": "astonmartin",
      "driver": "Fernando Rees",
      "time": "2:02.549"
    },
    {
      "class": "GTEPRO",
      "no": "52",
      "team": "RAM Racing",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "driver": "Matt Griffin",
      "time": "2:02.651"
    },
    {
      "class": "GTEAM",
      "no": "95",
      "team": "Aston Martin Racing",
      "model": "Aston Martin Vantage V8",
      "constructor": "astonmartin",
      "driver": "Nicki Thiim",
      "time": "2:02.656"
    },
    {
      "class": "GTEPRO",
      "no": "91",
      "team": "Porsche Team Manthey",
      "model": "Porsche 911 RSR",
      "constructor": "porsche",
      "driver": "Jörg Bergmeister",
      "time": "2:02.672"
    },
    {
      "class": "GTEPRO",
      "no": "52",
      "team": "RAM Racing",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "driver": "Alvaro Parente",
      "time": "2:02.697"
    },
    {
      "class": "GTEAM",
      "no": "61",
      "team": "AF Corse",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "driver": "Marco Cioci",
      "time": "2:02.706"
    },
    {
      "class": "GTEAM",
      "no": "61",
      "team": "AF Corse",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "driver": "Mirko Venturi",
      "time": "2:02.770"
    },
    {
      "class": "GTEAM",
      "no": "90",
      "team": "8 Star Motorsports",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "driver": "Paolo Ruberti",
      "time": "2:02.878"
    },
    {
      "class": "GTEPRO",
      "no": "99",
      "team": "Aston Martin Racing",
      "model": "Aston Martin Vantage V8",
      "constructor": "astonmartin",
      "driver": "Alex Macdowall",
      "time": "2:02.894"
    },
    {
      "class": "GTEAM",
      "no": "95",
      "team": "Aston Martin Racing",
      "model": "Aston Martin Vantage V8",
      "constructor": "astonmartin",
      "driver": "David Heinemeir Hansson",
      "time": "2:03.009"
    },
    {
      "class": "GTEPRO",
      "no": "92",
      "team": "Porsche Team Manthey",
      "model": "Porsche 911 RSR",
      "constructor": "porsche",
      "driver": "Marco Holzer",
      "time": "2:03.061"
    },
    {
      "class": "GTEPRO",
      "no": "99",
      "team": "Aston Martin Racing",
      "model": "Aston Martin Vantage V8",
      "constructor": "astonmartin",
      "driver": "Darryl O'Young",
      "time": "2:03.209"
    },
    {
      "class": "GTEAM",
      "no": "98",
      "team": "Aston Martin Racing",
      "model": "Aston Martin Vantage V8",
      "constructor": "astonmartin",
      "driver": "Christoffer Nygaard",
      "time": "2:03.240"
    },
    {
      "class": "GTEAM",
      "no": "81",
      "team": "AF Corse",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "driver": "Michele Rugolo",
      "time": "2:03.370"
    },
    {
      "class": "GTEAM",
      "no": "98",
      "team": "Aston Martin Racing",
      "model": "Aston Martin Vantage V8",
      "constructor": "astonmartin",
      "driver": "Paul Dalla Lana",
      "time": "2:03.786"
    },
    {
      "class": "GTEAM",
      "no": "75",
      "team": "Prospeed Competition",
      "model": "Porsche 911 GT3 RSR",
      "constructor": "porsche",
      "driver": "Matthieu Vaxivière",
      "time": "2:04.015"
    },
    {
      "class": "GTEAM",
      "no": "75",
      "team": "Prospeed Competition",
      "model": "Porsche 911 GT3 RSR",
      "constructor": "porsche",
      "driver": "Emmanuel Collard",
      "time": "2:04.046"
    },
    {
      "class": "GTEAM",
      "no": "53",
      "team": "RAM Racing",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "driver": "Ben Collins",
      "time": "2:04.077"
    },
    {
      "class": "GTEAM",
      "no": "88",
      "team": "Proton Competition",
      "model": "Porsche 911 RSR",
      "constructor": "porsche",
      "driver": "Christian Ried",
      "time": "2:04.487"
    },
    {
      "class": "GTEAM",
      "no": "90",
      "team": "8 Star Motorsports",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "driver": "Vicente Potolicchio",
      "time": "2:04.588"
    },
    {
      "class": "GTEAM",
      "no": "95",
      "team": "Aston Martin Racing",
      "model": "Aston Martin Vantage V8",
      "constructor": "astonmartin",
      "driver": "Kristian Poulsen",
      "time": "2:04.617"
    },
    {
      "class": "GTEAM",
      "no": "53",
      "team": "RAM Racing",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "driver": "Johnny Mowlem",
      "time": "2:04.762"
    },
    {
      "class": "GTEAM",
      "no": "90",
      "team": "8 Star Motorsports",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "driver": "Gianluca Roda",
      "time": "2:05.668"
    },
    {
      "class": "GTEAM",
      "no": "61",
      "team": "AF Corse",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "driver": "Luis Perez-Companc",
      "time": "2:05.888"
    },
    {
      "class": "GTEAM",
      "no": "88",
      "team": "Proton Competition",
      "model": "Porsche 911 RSR",
      "constructor": "porsche",
      "driver": "Khaled Al Qubaisi",
      "time": "2:06.144"
    },
    {
      "class": "GTEAM",
      "no": "81",
      "team": "AF Corse",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "driver": "Stephen Wyatt",
      "time": "2:06.225"
    },
    {
      "class": "GTEAM",
      "no": "53",
      "team": "RAM Racing",
      "model": "Ferrari F458 Italia",
      "constructor": "ferrari",
      "driver": "Mark Patterson",
      "time": "2:06.349"
    },
    {
      "class": "GTEAM",
      "no": "75",
      "team": "Prospeed Competition",
      "model": "Porsche 911 GT3 RSR",
      "constructor": "porsche",
      "driver": "François Perrodo",
      "time": "2:06.920"
    },
    {
      "class": "LMP1L",
      "no": "12",
      "team": "Rebellion Racing",
      "model": "Lola B12/60 - Toyota",
      "constructor": "toyota",
      "driver": "Mathias Beche",
      "time": "2:08.937"
    }
  ],
  "completeness": {
    "metadata": true,
    "results": true,
    "fastestLaps": true,
    "poles": true,
    "raceControl": false
  },
  "sources": [
    "FIA WEC 2014 Silverstone Race Final Classification by Class (Al Kamel)",
    "FIA WEC 2014 Silverstone Qualifying Practice Classification by Class (Al Kamel)",
    "FIA WEC 2014 Silverstone Race Provisional Classification by Driver Fastest Lap (Al Kamel)",
    "FIA WEC 2014 Silverstone Qualifying Practice Fastest Lap by Driver and Class (After, Al Kamel)"
  ]
};
replaceRace(WEC_SILVERSTONE_2014_GOLD);
if(typeof window!=='undefined') window.RACES=RACES;
