/* SCC v0.8.5: Database polish - stable tabs, DOB seed, unique circuits, filters/sorting */
(function(){
'use strict';
const VERSION='v0.8.6.11';
const $=id=>document.getElementById(id);
const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim().replace(/\s+/g,' ');
const key=s=>norm(s).replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'unknown';
const uniq=a=>[...new Set(a.filter(Boolean))];
const pct=(n,d)=>d?Math.round(100*n/d)+'%':'—';
const num=v=>Number(v)||0;
const G={
  races:()=>{try{return (typeof RACES!=='undefined'&&Array.isArray(RACES))?RACES:(Array.isArray(window.RACES)?window.RACES:[])}catch{return Array.isArray(window.RACES)?window.RACES:[]}},
  series:()=>{try{return (typeof SERIES!=='undefined')?SERIES:(window.SERIES||{})}catch{return window.SERIES||{}}},
  constructors:()=>{try{return (typeof CONSTRUCTORS!=='undefined'&&Array.isArray(CONSTRUCTORS))?CONSTRUCTORS:(Array.isArray(window.CONSTRUCTORS)?window.CONSTRUCTORS:[])}catch{return Array.isArray(window.CONSTRUCTORS)?window.CONSTRUCTORS:[]}},
  flags:()=>{try{return (typeof SCC_FLAG_SVGS!=='undefined')?SCC_FLAG_SVGS:(window.SCC_FLAG_SVGS||{})}catch{return window.SCC_FLAG_SVGS||{}}},
  flagAliases:()=>{try{return (typeof FLAG_ALIASES!=='undefined')?FLAG_ALIASES:(window.FLAG_ALIASES||{})}catch{return window.FLAG_ALIASES||{}}},
};

const COUNTRY_ALIASES={
  'ita':'Italy','italy':'Italy','italian':'Italy','bel':'Belgium','be':'Belgium','belgium':'Belgium','belgian':'Belgium','esp':'Spain','es':'Spain','spain':'Spain','spanish':'Spain','bra':'Brazil','br':'Brazil','brazil':'Brazil','brazilian':'Brazil','aut':'Austria','at':'Austria','austria':'Austria','austrian':'Austria','fra':'France','fr':'France','france':'France','french':'France','deu':'Germany','ger':'Germany','de':'Germany','germany':'Germany','german':'Germany','irl':'Ireland','ie':'Ireland','ireland':'Ireland','irish':'Ireland','gbr':'United Kingdom','gb':'United Kingdom','uk':'United Kingdom','united kingdom':'United Kingdom','britain':'United Kingdom','british':'United Kingdom','england':'United Kingdom','sco':'United Kingdom','scotland':'United Kingdom','nld':'Netherlands','nl':'Netherlands','netherlands':'Netherlands','dutch':'Netherlands','can':'Canada','ca':'Canada','canada':'Canada','canadian':'Canada','omn':'Oman','om':'Oman','oman':'Oman','aus':'Australia','au':'Australia','australia':'Australia','australian':'Australia','angola':'Angola','ago':'Angola','denmark':'Denmark','danish':'Denmark','dnk':'Denmark','dk':'Denmark','switzerland':'Switzerland','swiss':'Switzerland','sui':'Switzerland','che':'Switzerland','ch':'Switzerland','portugal':'Portugal','prt':'Portugal','por':'Portugal','pt':'Portugal','usa':'United States','us':'United States','united states':'United States','american':'United States','japan':'Japan','jpn':'Japan','jp':'Japan','china':'China','chn':'China','cn':'China','poland':'Poland','pol':'Poland','pl':'Poland','turkey':'Turkey','turkiye':'Turkey','tur':'Turkey','tr':'Turkey','russia':'Russia','russian':'Russia','rus':'Russia','ru':'Russia','hong kong':'Hong Kong','hkg':'Hong Kong','hk':'Hong Kong','romania':'Romania','rou':'Romania','ro':'Romania','argentina':'Argentina','arg':'Argentina','ar':'Argentina','south africa':'South Africa','rsa':'South Africa','zaf':'South Africa','za':'South Africa','new zealand':'New Zealand','nzl':'New Zealand','nz':'New Zealand','mexico':'Mexico','mex':'Mexico','mx':'Mexico','sweden':'Sweden','swe':'Sweden','se':'Sweden','norway':'Norway','nor':'Norway','no':'Norway','finland':'Finland','fin':'Finland','fi':'Finland','luxembourg':'Luxembourg','lux':'Luxembourg','lu':'Luxembourg','monaco':'Monaco','mco':'Monaco','mc':'Monaco','thailand':'Thailand','tha':'Thailand','th':'Thailand','malaysia':'Malaysia','mys':'Malaysia','my':'Malaysia','indonesia':'Indonesia','idn':'Indonesia','id':'Indonesia','chile':'Chile','chl':'Chile','cl':'Chile','peru':'Peru','per':'Peru','pe':'Peru','colombia':'Colombia','col':'Colombia','co':'Colombia','uruguay':'Uruguay','ury':'Uruguay','uy':'Uruguay'};

const COUNTRY_CODES={
  'Italy':'it','Belgium':'be','Spain':'es','Brazil':'br','Austria':'at','France':'fr','Germany':'de','Ireland':'ie','United Kingdom':'gb','Netherlands':'nl','Canada':'ca','Oman':'om','Australia':'au','Angola':'ao','Denmark':'dk','Switzerland':'ch','Portugal':'pt','United States':'us','Japan':'jp','China':'cn','Poland':'pl','Turkey':'tr','Russia':'ru','Belarus':'by','Hong Kong':'hk','Romania':'ro','Argentina':'ar','South Africa':'za','New Zealand':'nz','Mexico':'mx','Sweden':'se','Norway':'no','Finland':'fi','Luxembourg':'lu','Monaco':'mc','Thailand':'th','Malaysia':'my','Indonesia':'id','Chile':'cl','Peru':'pe','Colombia':'co','Uruguay':'uy','Czechia':'cz','Slovakia':'sk','Saudi Arabia':'sa','United Arab Emirates':'ae','Qatar':'qa','Kuwait':'kw','Ukraine':'ua','Bulgaria':'bg','Greece':'gr','India':'in','South Korea':'kr','Taiwan':'tw','Philippines':'ph','Singapore':'sg','Lithuania':'lt','Estonia':'ee','Latvia':'lv','Hungary':'hu','Croatia':'hr','Slovenia':'si','Serbia':'rs','Israel':'il'
};
function emojiFromCode(code){
  code=String(code||'').toUpperCase().replace(/[^A-Z]/g,'');
  if(code.length!==2)return '';
  return [...code].map(c=>String.fromCodePoint(127397+c.charCodeAt(0))).join('');
}
function canonicalCountry(c){const n=norm(c); return COUNTRY_ALIASES[n]||COUNTRY_ALIASES[n.replace(/\s/g,'')]||String(c||'').trim();}
function flagHtml(country){
  const c=canonicalCountry(country); if(!c)return '';
  const aliases=G.flagAliases();
  let code=aliases[c]||aliases[c.toUpperCase?.()]||aliases[c.toLowerCase?.()]||aliases[String(country||'').trim()]||COUNTRY_CODES[c]||'';
  if(!code && String(country||'').trim().length===2) code=String(country).trim().toLowerCase();
  code=String(code||'').toLowerCase().replace(/[^a-z]/g,'');
  const flagSvgs=G.flags();
  if(code && flagSvgs && flagSvgs[code]) return `<span class="db85-flag" title="${esc(c)}">${flagSvgs[code]}</span>`;
  const em=emojiFromCode(code);
  if(em) return `<span class="db85-flag emoji" title="${esc(c)}">${em}</span>`;
  return `<span class="db85-flag missing" title="${esc(c)}">🏳</span>`;
}

const DOB_MASTER={'bijoy-garg':'2002-07-15','ben-barker':'1991-04-23','alberto-di-folco':'1996-03-21','alberto-maria-di-folco':'1996-03-21',
  'davide-rigon':'1986-08-26','dries-vanthoor':'1998-04-20','antonio-fuoco':'1996-05-20','augusto-farfus':'1983-09-03','daniel-juncadella':'1991-05-07','ferdinand-habsburg':'1997-06-21','charlie-eastwood':'1995-08-11','jonny-edgar':'2004-02-13','lilou-wadoux':'2001-04-10','marvin-kirchhofer':'1994-03-19','maxime-martin':'1986-03-20','riccardo-pera':'1999-07-04','rui-andrade':'1999-09-23','sebastien-baud':'2000-11-08','valentin-hasse-clot':'1996-02-27','alessio-rovera':'1995-06-22','alessio-picariello':'1993-08-27','alex-riberas':'1994-01-27','robin-frijns':'1991-08-07','rene-rast':'1986-10-26','sheldon-van-der-linde':'1999-05-13','kevin-magnussen':'1992-10-05','raffaele-marciello':'1994-12-17','miguel-molina':'1989-02-17','nicklas-nielsen':'1997-02-06','harry-tincknell':'1991-10-29','tom-gamble':'2001-11-17','mike-conway':'1983-08-19','kamui-kobayashi':'1986-09-13','nyck-de-vries':'1995-02-06','yifei-ye':'2000-06-16','robert-kubica':'1984-12-07','philip-hanson':'1999-07-05','paul-di-resta':'1986-04-16','stoffel-vandoorne':'1992-03-26','nick-cassidy':'1994-08-19','andre-lotterer':'1981-11-19','luis-felipe-derani':'1993-10-12','will-stevens':'1991-06-28','norman-nato':'1992-07-08','louis-deletraz':'1997-04-22','sebastien-buemi':'1988-10-31','brendon-hartley':'1989-11-10','ryo-hirakawa':'1994-03-07','frederic-makowiecki':'1980-11-22','jules-gounon':'1994-12-31','victor-martins':'2001-06-16','antonio-felix-da-costa':'1991-08-31','charles-milesi':'2001-03-04','alexander-sims':'1988-03-15','alex-lynn':'1993-09-17','earl-bamber':'1990-07-09','sebastien-bourdais':'1979-02-28','jack-aitken':'1995-09-23','antonio-giovinazzi':'1993-12-14','alessandro-pier-guidi':'1983-12-18','james-calado':'1989-06-13','loic-duval':'1982-06-12','malthe-jakobsen':'2003-10-29','theo-pourchaire':'2003-08-20','hadrien-david':'2004-02-26','esteban-masson':'2004-09-19','tom-blomqvist':'1993-11-30','colton-herta':'2000-03-30','jordan-taylor':'1991-05-10','ricky-taylor':'1989-08-03','felipe-nasr':'1992-08-21','matt-campbell':'1995-02-17','nick-tandy':'1984-11-05','mathieu-jaminet':'1994-10-24','laurens-vanthoor':'1991-05-08','ben-barnicoat':'1996-12-20','jack-hawksworth':'1991-02-28','daniel-serra':'1984-02-24','nick-catsburg':'1988-02-15','nicky-catsburg':'1988-02-15','robin-liddell':'1974-02-28','andy-lally':'1975-02-11','katherine-legge':'1980-07-12','sarah-bovy':'1989-05-15','rahel-frey':'1986-02-23','michelle-gatting':'1993-12-31','doriane-pin':'2004-01-06','mikkel-jensen':'1994-12-31','nicolas-lapierre':'1984-04-02','oliver-jarvis':'1984-01-09','filipe-albuquerque':'1985-06-13','ben-hanley':'1985-01-22','tom-dillmann':'1989-04-06','jakub-smiechowski':'1991-10-11','nick-yelloly':'1990-12-03','paul-loup-chatin':'1991-10-19','gregoire-saucy':'1999-12-26','jamie-chadwick':'1998-05-20','valerio-rinicella':'2007-01-01','laurents-horr':'1997-09-11','louis-deletraz':'1997-04-22','morris-schuring':'2005-02-20','kobe-pauwels':'2004-10-23','zacharie-robichon':'1992-05-14','ahmad-al-harthy':'1981-08-31','yasser-shahin':'1974-09-26','riccardo-agostini':'1994-04-20','thomas-preining':'1998-07-21','dennis-olsen':'1996-04-14','laurin-heinrich':'2001-09-26','klaus-bachler':'1991-07-27','christian-engelhart':'1986-12-13','dirk-werner':'1981-05-25','matteo-cairoli':'1996-06-01','patrick-pilet':'1981-10-08'};

Object.assign(DOB_MASTER, {
  'luca-stolz':'1995-07-29','alex-quinn':'2000-12-29','lorenzo-patrese':'2005-08-12','dean-macdonald':'1992-07-19','dean-mcdonald':'1992-07-19',
  'kevin-estre':'1988-10-28','richard-lietz':'1983-12-17','valentino-rossi':'1979-02-16','francesco-castellacci':'1987-04-04','louis-machiels':'1971-09-23',
  'christopher-mies':'1989-05-24','simon-gachet':'1993-10-31','christopher-haase':'1987-09-26','fabian-schiller':'1997-10-24','mattia-drudi':'1998-07-16',
  'marco-s-rensen':'1990-09-06','nicki-thiim':'1989-04-17','lucas-auer':'1994-09-11','maro-engel':'1985-08-27','thomas-fleming':'2003-09-01',
  'benjamin-goethe':'2003-11-28','kelvin-van-der-linde':'1996-06-20','jordan-pepper':'1996-07-31','joseph-loake':'2005-04-17','jake-dennis':'1995-06-16',
  'maximilian-gotz':'1986-02-04','james-kell':'1998-04-09','arthur-rougier':'2000-01-20','chris-lulham':'2003-02-19','ugo-de-wilde':'2002-11-20',
  'tim-tramnitz':'2004-11-16','jens-klingmann':'1990-07-16','dorian-boccolacci':'1998-09-09','daniel-harper':'2000-12-08','max-hesse':'2001-07-23',
  'antares-au':'1999-10-07','loek-hartog':'2002-10-06','markus-winkelhock':'1980-06-13','frederik-schandorff':'1996-08-20','max-hofer':'1999-05-23',
  'ignacio-montenegro':'2004-11-23','amaury-cordeel':'2002-07-09','arthur-leclerc':'2000-10-14','sean-gelael':'1996-11-01','oliver-soderstrom':'1998-07-29',
  'simon-reicher':'2000-01-13','marvin-dienst':'1997-02-24','gabriele-piana':'1986-08-29','darren-leung':'1987-03-29','ashley-sutton':'1994-01-15',
  'robert-de-haan':'2006-06-22','arjun-maini':'1997-12-10','fabio-scherer':'1999-06-13','thomas-drouet':'1999-01-08','finn-wiebelhaus':'2006-03-18',
  'reece-barr':'2000-01-31','dennis-marschall':'1996-08-15','calan-williams':'2000-06-30','ezequiel-perez-companc':'1994-07-05','ivan-klymenko':'2005-02-15',
  'ben-dorr':'2005-01-03','aurelien-panis':'1994-10-29','cesar-gazeau':'2004-08-16','alexander-bukhantsov':'1997-01-01',
  'andrew-gilbert':'1980-10-24','benjamin-barker':'1991-04-23','bernardo-sousa':'1987-05-16','celia-martin':'1991-10-04',
  'robert-shwartzman':'1999-09-16','oliver-rasmussen':'2000-11-21','mirko-bortolotti':'1990-01-10','edoardo-mortara':'1987-01-12',
  'nicolas-lapierre':'1984-04-02','antonio-serravalle':'2002-09-18','wattana-bennett':'2004-09-02','carl-wattana-bennett':'2004-09-02',
  'jean-karl-vernay':'1987-10-31','daniel-mancinelli':'1988-07-23','joshua-caygill':'1989-06-22','hiroshi-koizumi':'1969-05-25',
  'erwan-bastard':'1998-06-09','nicolas-costa':'1991-11-14'
});
// v0.8.6.21 batch 1: top-50-by-starts drivers still missing a DOB, researched and confirmed
// against Wikipedia/DriverDB/official team sources.
Object.assign(DOB_MASTER, {
  'lin-hodenius':'2006-08-01','simon-mann':'2001-02-10','ben-tuck':'1997-03-03','clemens-schmid':'1990-08-18','finn-gehrsitz':'2004-09-25',
  'francois-heriau':'1983-10-25','giammarco-levorato':'2003-07-24','ian-james':'1974-07-22','james-cottingham':'1984-01-21','jose-maria-lopez':'1983-04-26',
  'marco-s-rensen':'1990-09-06','phil-hanson':'1999-07-05','stefano-gattuso':'1984-05-03','thomas-flohr':'1960-03-17','tom-van-rompuy':'1987-09-08',
  'eduardo-barrichello':'2001-09-23','julien-andlauer':'1999-07-05','timur-boguslavskiy':'2000-04-30','ben-keating':'1971-08-18','marino-sato':'1999-05-12',
  'martin-berry':'1977-06-09','nicolas-varrone':'2000-11-06','ryan-hardwick':'1980-10-03','arnold-robin':'1984-10-07','jenson-button':'1980-01-19',
  'matteo-cressoni':'1984-10-28','mick-schumacher':'1999-03-22','michael-christensen':'1990-08-28','neel-jani':'1983-12-08','nico-pino':'2004-09-21',
  'derek-deboer':'1975-03-04','jean-eric-vergne':'1990-04-25','lorcan-hanafin':'2002-12-06','mathys-jaubert':'2005-03-03','razvan-petru-umbrarescu':'1993-06-30',
  'sebastian-priaulx':'2001-01-18','anthony-mcintosh':'1975-04-06','dane-cameron':'1988-10-18','fran-rueda':'1997-02-14','parker-thompson':'1998-03-02',
  'pietro-fittipaldi':'1996-06-25','pj-hyett':'1983-08-10','roman-de-angelis':'2001-02-15','ross-gunn':'1997-01-01','salih-yoluc':'1985-08-22',
  'sebastian-alvarez':'2002-07-08','tristan-vautier':'1989-08-22','alexander-west':'1965-11-07','ayhancan-guven':'1998-01-02'
});
// v0.8.6.21 batch 2: next 49 drivers by starts still missing a DOB.
Object.assign(DOB_MASTER, {
  'blake-mcdonald':'1990-11-05','daniel-schneider':'1973-09-06','david-heinemeier-hansson':'1979-10-15','eric-powell':'1985-11-04','franck-perera':'1984-03-21',
  'francois-perrodo':'1977-02-14','george-kurtz':'1970-10-14','gray-newell':'1997-10-07','job-van-uitert':'1998-10-10','johannes-zelger':'1979-10-15',
  'jonas-ried':'2004-12-18','jonathan-adam':'1984-09-04','lars-kern':'1987-11-18','logan-sargeant':'2000-12-31','lorenzo-fluxa':'2004-11-23',
  'matthieu-vaxiviere':'1994-12-03','michael-jensen':'1975-02-05','orey-fidani':'1986-11-21','paul-lafargue':'1988-07-08','peter-dempsey':'1986-03-31',
  'pipo-derani':'1993-10-12','renger-van-der-zande':'1986-02-16','reshad-de-gerus':'2003-07-01','ryan-cullen':'1991-03-26','takeshi-kimura':'1970-10-22',
  'brenton-grove':'1997-04-09','casper-stevenson':'2003-04-22','cem-bolukbas':'1998-02-09','claudio-schiavoni':'1960-11-14','clement-mateu':'1981-04-30',
  'colin-braun':'1988-09-22','conrad-laursen':'2006-05-11','custodio-toledo':'1969-09-17','david-perel':'1985-05-07','dustin-blattner':'1986-02-20',
  'enzo-trulli':'2005-04-15','ethan-ischer':'2007-02-01','frederik-vesti':'2002-01-13','giorgio-roda':'1994-03-18','harry-king':'2001-01-20',
  'horst-felbermayr':'1970-11-30','huub-van-eijndhoven':'1999-11-30','charles-weerts':'2001-03-01','chris-froggatt':'1993-12-11','christian-ried':'1979-02-24',
  'ian-aguilera':'2007-03-14','indy-dontje':'1992-11-21','jack-doohan':'2003-01-20'
});
// v0.8.6.21 batch 3: next 43 drivers by starts with a confidently-sourced DOB (a handful of
// entered:1 names were skipped - no reliable public DOB found, or the name was ambiguous
// between multiple same-named drivers).
Object.assign(DOB_MASTER, {
  'james-allen':'1996-07-04','jason-hart':'1976-02-20','jean-baptiste-simmenauer':'2000-11-19','john-farano':'1959-12-08','julian-hanses':'1997-08-31',
  'louis-rousset':'1999-01-25','luca-ghiotto':'1995-02-24','manuel-espirito-santo':'2003-08-13','marco-wittmann':'1989-11-24','mathias-beche':'1986-06-28',
  'matt-bell':'1989-11-05','matthias-kaiser':'1991-01-22','naveen-rao':'1975-05-20','nico-muller':'1992-02-25','oliver-gray':'2005-04-28',
  'pascal-wehrlein':'1994-10-18','philip-ellis':'1992-10-09','rasmus-lindh':'2001-07-06','rene-binder':'1992-01-01','ricardo-feller':'2000-06-01',
  'richard-verschoor':'2000-12-16','russell-ward':'1992-03-08','scott-noble':'1962-11-01','stephen-grove':'1967-04-01','theodor-jensen':'2006-06-30',
  'tobi-lutke':'1980-07-16','vladislav-lomko':'2004-12-27','yuichi-nakayama':'1991-07-25','aaron-muss':'1994-12-15','aaron-telitz':'1991-12-13',
  'abdulla-ali-al-khelaifi':'1990-05-08','adam-adelson':'1997-02-01','adam-smalley':'2001-01-02','adrien-closmenil':'2007-01-19','albert-costa-balboa':'1990-05-02',
  'alec-udell':'1995-11-29','aleksei-nesov':'2003-09-22','alessandro-cozzi':'1972-03-06','alessandro-ghiretti':'2002-01-18','alex-aka':'2000-08-07',
  'alex-fontana':'1992-08-05','alex-palou':'1997-04-01','alex-malykhin':'1987-08-17'
});
// v0.8.6.21 batch 4: 10 more by starts. Only 1 of 10 had a findable DOB - the rest are
// entered:1 amateur/gentleman drivers with no public birth record.
Object.assign(DOB_MASTER, {
  'mike-rockenfeller':'1983-10-31'
});
// "Akhil Kumar" in the archive is Tamil actor-turned-racer Ajith Kumar (aliased above) - a
// misheard/mistyped name from an import source, not a different person.
Object.assign(DOB_MASTER, {'ajith-kumar':'1971-05-01'});
// v0.8.6.21 batch 5: next 10 by starts, 10/10 found (younger drivers with more online presence).
Object.assign(DOB_MASTER, {
  'alvise-rodella':'2007-12-12','amaury-cordeel':'2002-07-09','ameerh-naran':'1986-01-19','anders-fjordbach':'1990-11-04','andrea-caldarelli':'1990-02-14',
  'andrea-frassineti':'2006-09-07','andrew-ferguson':'1964-07-22','angus-whiteside':'1996-04-26','anthony-bartone':'2000-04-27','antoine-doquin':'2004-09-16'
});
// v0.8.6.21 batch 6: next 10 by starts, 6/10 found (3 of those already had a DOB from an earlier
// batch/seed and only needed a nationality).
Object.assign(DOB_MASTER, {
  'antonio-garcia':'1980-06-05','antti-rammo':'1983-01-28','ariel-levi':'2000-06-13'
});
// Duplicate-name merge cleanup found while auditing coverage (Eddie Cheever III, son of the
// retired F1 driver, sometimes gets recorded as just "Eddie Cheever" - see the alias above).
Object.assign(DOB_MASTER, {'eddie-cheever-iii':'1993-06-05'});
// Tom Sargent's ELMS entry mistags him as "United States" - he's Australian (races for both
// Wright Motorsports/IMSA and Proton Competition/ELMS in the same season, hence the two names).
Object.assign(DOB_MASTER, {'tom-sargent':'2003-07-19'});
// Confirmed against the user's own archive (Felipe Fraga and Gabriel Aubry visible there).
Object.assign(DOB_MASTER, {'felipe-fraga':'1995-07-03','andre-negrao':'1992-06-17','gabriel-aubry':'1998-04-03','alexander-jacoby':'2009-02-27'});
Object.assign(DOB_MASTER, {'mikkel-gaarde-pedersen':'2008-09-30','michael-wainwright':'1973-07-25'});
Object.assign(DOB_MASTER, {
  'paul-dalla-lana':'1966-02-01','giancarlo-fisichella':'1973-01-14','gianmaria-bruni':'1981-05-30','roberto-gonzalez':'1976-03-31','callum-ilott':'1998-11-11',
  'daniil-kvyat':'1994-04-26','frits-van-eerd':'1967-03-25','giedo-van-der-garde':'1985-04-25','gustavo-menezes':'1994-09-19','joel-sturm':'2001-11-29'
});
const COUNTRY_MASTER={'bijoy-garg':'United States','ben-barker':'United Kingdom','alberto-di-folco':'Italy','alberto-maria-di-folco':'Italy',
  'tomasso-mosca':'Italy','tommaso-mosca':'Italy','petru-umbrarescu':'Romania','alex-aka':'Germany','aaron-muss':'United States','adam-smalley':'United Kingdom','jonny-edgar':'United Kingdom','ahmad-al-harthy':'Oman','alex-riberas':'Spain','kobe-pauwels':'Belgium','rui-andrade':'Angola','yasser-shahin':'Australia','antónio-félix-da-costa':'Portugal','antonio-felix-da-costa':'Portugal','mathys-jaubert':'France','matthieu-vaxiviere':'France','george-kurtz':'United States','colin-braun':'United States','tom-dyer':'United States'};

Object.assign(COUNTRY_MASTER, {'alex-quinn':'United Kingdom','luca-stolz':'Germany','lorenzo-patrese':'Italy','dean-macdonald':'United Kingdom','dean-mcdonald':'United Kingdom',
  'andrew-gilbert':'United Kingdom','benjamin-barker':'United Kingdom','bernardo-sousa':'Portugal','celia-martin':'France','valentin-hasse-clot':'France',
  'darren-leung':'United Kingdom','sheldon-van-der-linde':'South Africa','kelvin-van-der-linde':'South Africa','thomas-flohr':'Switzerland','james-cottingham':'United Kingdom',
  'robert-shwartzman':'Israel','oliver-rasmussen':'Denmark','mirko-bortolotti':'Italy','edoardo-mortara':'Italy','nicolas-lapierre':'France',
  'antonio-serravalle':'Canada','wattana-bennett':'Thailand','carl-wattana-bennett':'Thailand','jean-karl-vernay':'France','daniel-mancinelli':'Italy',
  'joshua-caygill':'United Kingdom','hiroshi-koizumi':'Japan','erwan-bastard':'France','nicolas-costa':'Brazil',
  'mike-rockenfeller':'Germany','aleksei-nesov':'Russia','alessandro-ghiretti':'France','alex-fontana':'Switzerland',
  'amaury-cordeel':'Belgium','andrea-frassineti':'Italy','angus-whiteside':'United Kingdom','anthony-bartone':'United States','antoine-doquin':'France',
  'ariel-levi':'Israel','arjun-maini':'India','arthur-leclerc':'Monaco','arthur-rougier':'France','tom-sargent':'Australia','michael-wainwright':'United Kingdom'});
// buildDrivers()/buildTeams()/buildConstructors()/buildCircuits() re-scan every race/entry from
// scratch (parsing localStorage each time too), and renderDrivers() + diag() were both calling
// them on every single keystroke/sort-click/driver-select. Memoize on __dbCache and only
// recompute when something that could change the underlying data actually happens (rebuild
// button, DOB/nationality save) - not on every UI interaction.
let __dbCache={};
function invalidateDbCache(){__dbCache={};}
function cached(k,fn){ if(!(k in __dbCache))__dbCache[k]=fn(); return __dbCache[k]; }
function userDobStore(){return cached('dobStore',()=>{try{return JSON.parse(localStorage.getItem('scc_driver_dobs_v082')||'{}')}catch{return {}}});}
function userCountryStore(){return cached('countryStore',()=>{try{return JSON.parse(localStorage.getItem('scc_driver_countries_v082')||'{}')}catch{return {}}});}
function getDob(name){const k=key(name); return userDobStore()[k]||userDobStore()[name]||DOB_MASTER[k]||'';}
// FIA driver categorisation (Platinum/Gold/Silver/Bronze) isn't present anywhere in imported
// race data - it's a separate license classification, not something derivable from results.
// Keyed the same way as DOB_MASTER/COUNTRY_MASTER so it can be populated the same way later;
// starts empty, so every driver shows "Unrated" until real data is added here per driver.
// Shape: 'driver-key':{current:'Gold',history:[{year:2024,category:'Gold'},{year:2023,category:'Silver'}]}
const RATING_MASTER={"harry-tincknell":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"alex-riberas":{"current":"gold","history":[{"year":2026,"category":"gold"}]},"mike-conway":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"kamui-kobayashi":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"nyck-de-vries":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"sebastien-buemi":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"brendon-hartley":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"ryo-hirakawa":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"alex-lynn":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"will-stevens":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"norman-nato":{"current":"gold","history":[{"year":2026,"category":"gold"}]},"kevin-magnussen":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"raffaele-marciello":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"dries-vanthoor":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"luis-felipe-derani":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"mathys-jaubert":{"current":"silver","history":[{"year":2026,"category":"silver"}]},"mathieu-jaminet":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"paul-loup-chatin":{"current":"gold","history":[{"year":2026,"category":"gold"}]},"daniel-juncadella":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"robin-frijns":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"rene-rast":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"sheldon-van-der-linde":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"antonio-felix-da-costa":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"andre-lotterer":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"frederic-makowiecki":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"earl-bamber":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"sebastien-bourdais":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"jack-aitken":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"antonio-fuoco":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"miguel-molina":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"nicklas-nielsen":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"alessandro-pier-guidi":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"james-calado":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"antonio-giovinazzi":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"yifei-ye":{"current":"gold","history":[{"year":2026,"category":"gold"}]},"paul-di-resta":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"loic-duval":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"antares-au":{"current":"bronze","history":[{"year":2026,"category":"bronze"}]},"thomas-fleming":{"current":"silver","history":[{"year":2026,"category":"silver"}]},"marvin-kirchhofer":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"francois-heriau":{"current":"bronze","history":[{"year":2026,"category":"bronze"}]},"simon-mann":{"current":"silver","history":[{"year":2026,"category":"silver"}]},"alessio-rovera":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"gray-newell":{"current":"bronze","history":[{"year":2026,"category":"bronze"}]},"ian-james":{"current":"bronze","history":[{"year":2026,"category":"bronze"}]},"darren-leung":{"current":"bronze","history":[{"year":2026,"category":"bronze"}]},"nicky-catsburg":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"charlie-eastwood":{"current":"gold","history":[{"year":2026,"category":"gold"}]},"thomas-flohr":{"current":"bronze","history":[{"year":2026,"category":"bronze"}]},"francesco-castellacci":{"current":"silver","history":[{"year":2026,"category":"silver"}]},"davide-rigon":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"alexander-west":{"current":"bronze","history":[{"year":2026,"category":"bronze"}]},"finn-gehrsitz":{"current":"silver","history":[{"year":2026,"category":"silver"}]},"benjamin-goethe":{"current":"gold","history":[{"year":2026,"category":"gold"}]},"martin-berry":{"current":"bronze","history":[{"year":2026,"category":"bronze"}]},"rui-andrade":{"current":"silver","history":[{"year":2026,"category":"silver"}]},"maxime-martin":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"anthony-mcintosh":{"current":"bronze","history":[{"year":2026,"category":"bronze"}]},"ben-tuck":{"current":"silver","history":[{"year":2026,"category":"silver"}]},"esteban-masson":{"current":"gold","history":[{"year":2026,"category":"gold"}]},"johannes-zelger":{"current":"bronze","history":[{"year":2026,"category":"bronze"}]},"matteo-cressoni":{"current":"silver","history":[{"year":2026,"category":"silver"}]},"lin-hodenius":{"current":"silver","history":[{"year":2026,"category":"silver"}]},"jose-maria-lopez":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"giammarco-levorato":{"current":"silver","history":[{"year":2026,"category":"silver"}]},"ayhancan-guven":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"richard-lietz":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"tom-gamble":{"current":"gold","history":[{"year":2026,"category":"gold"}]},"ross-gunn":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"marco-s-rensen":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"roman-de-angelis":{"current":"gold","history":[{"year":2026,"category":"gold"}]},"charles-milesi":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"ferdinand-habsburg":{"current":"gold","history":[{"year":2026,"category":"gold"}]},"jules-gounon":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"victor-martins":{"current":"gold","history":[{"year":2026,"category":"gold"}]},"robert-kubica":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"philip-hanson":{"current":"gold","history":[{"year":2026,"category":"gold"}]},"stoffel-vandoorne":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"nick-cassidy":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"malthe-jakobsen":{"current":"gold","history":[{"year":2026,"category":"gold"}]},"theo-pourchaire":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"ricky-taylor":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"jordan-taylor":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"filipe-albuquerque":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"alexander-mattschull":{"current":"bronze","history":[{"year":2026,"category":"bronze"}]},"george-kurtz":{"current":"bronze","history":[{"year":2026,"category":"bronze"}]},"alexander-quinn":{"current":"gold","history":[{"year":2026,"category":"gold"}]},"jonas-ried":{"current":"silver","history":[{"year":2026,"category":"silver"}]},"tobias-lutke":{"current":"bronze","history":[{"year":2026,"category":"bronze"}]},"mathias-beche":{"current":"gold","history":[{"year":2026,"category":"gold"}]},"rasmus-lindh":{"current":"silver","history":[{"year":2026,"category":"silver"}]},"gregoire-saucy":{"current":"gold","history":[{"year":2026,"category":"gold"}]},"mikkel-jensen":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"edward-pearson":{"current":"silver","history":[{"year":2026,"category":"silver"}]},"michael-jensen":{"current":"bronze","history":[{"year":2026,"category":"bronze"}]},"enzo-trulli":{"current":"silver","history":[{"year":2026,"category":"silver"}]},"ryan-cullen":{"current":"silver","history":[{"year":2026,"category":"silver"}]},"vladislav-lomko":{"current":"gold","history":[{"year":2026,"category":"gold"}]},"pietro-fittipaldi":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"paul-lafargue":{"current":"silver","history":[{"year":2026,"category":"silver"}]},"louis-rousset":{"current":"silver","history":[{"year":2026,"category":"silver"}]},"doriane-pin":{"current":"silver","history":[{"year":2026,"category":"silver"}]},"adrien-closmenil":{"current":"silver","history":[{"year":2026,"category":"silver"}]},"ian-aguilera":{"current":"silver","history":[{"year":2026,"category":"silver"}]},"theodor-jensen":{"current":"silver","history":[{"year":2026,"category":"silver"}]},"jakub-smiechowski":{"current":"silver","history":[{"year":2026,"category":"silver"}]},"tom-dillmann":{"current":"gold","history":[{"year":2026,"category":"gold"}]},"nicholas-yelloly":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"stefan-aust":{"current":"bronze","history":[{"year":2026,"category":"bronze"}]},"fred-poordad":{"current":"bronze","history":[{"year":2026,"category":"bronze"}]},"romain-dumas":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"pj-hyett":{"current":"bronze","history":[{"year":2026,"category":"bronze"}]},"louis-deletraz":{"current":"gold","history":[{"year":2026,"category":"gold"}]},"dane-cameron":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"francois-perrodo":{"current":"bronze","history":[{"year":2026,"category":"bronze"}]},"matthieu-vaxiviere":{"current":"gold","history":[{"year":2026,"category":"gold"}]},"daniel-schneider":{"current":"bronze","history":[{"year":2026,"category":"bronze"}]},"benjamin-hanley":{"current":"gold","history":[{"year":2026,"category":"gold"}]},"oliver-jarvis":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"bijoy-garg":{"current":"silver","history":[{"year":2026,"category":"silver"}]},"prince-jefri-ibrahim":{"current":"bronze","history":[{"year":2026,"category":"bronze"}]},"orey-fidani":{"current":"bronze","history":[{"year":2026,"category":"bronze"}]},"lars-kern":{"current":"silver","history":[{"year":2026,"category":"silver"}]},"matthew-bell":{"current":"gold","history":[{"year":2026,"category":"gold"}]},"sean-gelael":{"current":"silver","history":[{"year":2026,"category":"silver"}]},"augusto-farfus":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"ben-keating":{"current":"bronze","history":[{"year":2026,"category":"bronze"}]},"jonny-edgar":{"current":"silver","history":[{"year":2026,"category":"silver"}]},"peter-dempsey":{"current":"bronze","history":[{"year":2026,"category":"bronze"}]},"salih-yoluc":{"current":"silver","history":[{"year":2026,"category":"silver"}]},"takeshi-kimura":{"current":"bronze","history":[{"year":2026,"category":"bronze"}]},"daniel-serra":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"clement-mateu":{"current":"bronze","history":[{"year":2026,"category":"bronze"}]},"sebastien-baud":{"current":"silver","history":[{"year":2026,"category":"silver"}]},"valentin-hasse-clot":{"current":"gold","history":[{"year":2026,"category":"gold"}]},"abdulla-al-khelaifi":{"current":"bronze","history":[{"year":2026,"category":"bronze"}]},"julian-hanses":{"current":"silver","history":[{"year":2026,"category":"silver"}]},"giuliano-alesi":{"current":"gold","history":[{"year":2026,"category":"gold"}]},"parker-thompson":{"current":"silver","history":[{"year":2026,"category":"silver"}]},"daniel-harper":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"dustin-blattner":{"current":"bronze","history":[{"year":2026,"category":"bronze"}]},"lorenzo-patrese":{"current":"silver","history":[{"year":2026,"category":"silver"}]},"dennis-marschall":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"eric-powell":{"current":"bronze","history":[{"year":2026,"category":"bronze"}]},"sebastian-priaulx":{"current":"gold","history":[{"year":2026,"category":"gold"}]},"tom-van-rompuy":{"current":"bronze","history":[{"year":2026,"category":"bronze"}]},"hadrien-david":{"current":"silver","history":[{"year":2026,"category":"silver"}]},"jack-hawksworth":{"current":"gold","history":[{"year":2026,"category":"gold"}]},"petru-umbrarescu":{"current":"bronze","history":[{"year":2026,"category":"bronze"}]},"clemens-schmid":{"current":"silver","history":[{"year":2026,"category":"silver"}]},"stefano-gattuso":{"current":"bronze","history":[{"year":2026,"category":"bronze"}]},"logan-sargeant":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]},"james-cottingham":{"current":"bronze","history":[{"year":2026,"category":"bronze"}]},"timur-boguslavskiy":{"current":"silver","history":[{"year":2026,"category":"silver"}]},"yasser-shahin":{"current":"bronze","history":[{"year":2026,"category":"bronze"}]},"riccardo-pera":{"current":"silver","history":[{"year":2026,"category":"silver"}]},"custodio-toledo":{"current":"bronze","history":[{"year":2026,"category":"bronze"}]},"lilou-wadoux":{"current":"silver","history":[{"year":2026,"category":"silver"}]},"riccardo-agostini":{"current":"gold","history":[{"year":2026,"category":"gold"}]},"michael-wainwright":{"current":"bronze","history":[{"year":2026,"category":"bronze"}]},"roberto-lacorte":{"current":"bronze","history":[{"year":2026,"category":"bronze"}]},"nicola-lacorte":{"current":"silver","history":[{"year":2026,"category":"silver"}]},"giacomo-petrobelli":{"current":"bronze","history":[{"year":2026,"category":"bronze"}]},"john-farano":{"current":"bronze","history":[{"year":2026,"category":"bronze"}]},"michael-birch":{"current":"bronze","history":[{"year":2026,"category":"bronze"}]},"garnet-patterson":{"current":"silver","history":[{"year":2026,"category":"silver"}]},"wayne-boyd":{"current":"gold","history":[{"year":2026,"category":"gold"}]},"david-heinemeier-hansson":{"current":"silver","history":[{"year":2026,"category":"silver"}]},"cem-bolukbas":{"current":"silver","history":[{"year":2026,"category":"silver"}]},"charles-henri-samani":{"current":"bronze","history":[{"year":2026,"category":"bronze"}]},"conrad-laursen":{"current":"silver","history":[{"year":2026,"category":"silver"}]},"horst-felbermayr":{"current":"bronze","history":[{"year":2026,"category":"bronze"}]},"dario-franchitti":{"current":"platinum","history":[{"year":2026,"category":"platinum"}]}};
function getRating(name){const k=key(name); return RATING_MASTER[k]||null;}
function getCountry(name, imported){const k=key(name); const c=userCountryStore()[k]||userCountryStore()[name]||COUNTRY_MASTER[k]||imported||''; return canonicalCountry(c);}
function ageFromDob(dob){if(!dob)return ''; const d=new Date(dob); if(isNaN(d))return ''; const today=new Date(); let a=today.getFullYear()-d.getFullYear(); const m=today.getMonth()-d.getMonth(); if(m<0||(m===0&&today.getDate()<d.getDate()))a--; return a>=0&&a<100?String(a):'';}
function raceYear(r){return Number(r.season)||Number(String(r.date||'').slice(0,4))||0;}
function yearsActiveText(d){const years=(d.history||[]).map(h=>Number(h.season)||Number(String(h.date||'').slice(0,4))).filter(Boolean); if(!years.length)return '—'; const first=Math.min(...years), last=Math.max(...years); const current=Math.max(...allRaces().map(raceYear).filter(Boolean)); return last>=current?`${first}–`:(first===last?String(first):`${first}–${last}`);}
function metricOc(o,c){return `<span class="db86-oc-count">${num(o)}/${num(c)}</span>`;}
function metricOne(n){return `<span class="db86-oc-count">${num(n)}</span>`;}

function allRaces(){
  return cached('races',()=>{
    const arr=[]; if(Array.isArray(G.races()))arr.push(...G.races());
    try{const saved=JSON.parse(localStorage.getItem('scc_saved_races_v081')||'[]'); if(Array.isArray(saved))arr.push(...saved);}catch{}
    // The PDF importer (js/importer.js) writes to a newer key ('scc_imported_races_v1', an
    // id-keyed object) than the old save button this file was written against - without this,
    // any race imported through the current importer is invisible to the driver/team/circuit
    // database views even though it shows up fine in Order/Summary.
    try{const imported=JSON.parse(localStorage.getItem('scc_imported_races_v1')||'{}'); Object.values(imported).forEach(r=>{if(r&&r.id)arr.push(r)});}catch{}
    const by=new Map(); arr.filter(r=>r&&r.id).forEach(r=>by.set(r.id,r)); return [...by.values()];
  });
}
function status(e){return String(e.status||e.classification||'FIN').toUpperCase();}
function classified(e){return !/(RET|DNF|DNS|DSQ|NC|NOT CLASSIFIED|EXCLUDED|WITHDRAWN)/.test(status(e)+' '+String(e.gap||'').toUpperCase());}
function classMeta(series, cls){const ser=G.series(); const s=ser&&ser[series]; return (s&&s.classes&&s.classes[cls])||{short:cls||'—',color:'#3b4658',text:'#fff'};}
function classBadge(series, cls){const m=classMeta(series,cls); return `<span class="db85-badge" style="background:${m.color};color:${m.text}">${esc(m.short||cls||'—')}</span>`;}
// Same fixed spelling as app.js's DRIVER_NAME_ALIASES - kept as its own copy since this file's
// driver database (key()/buildDrivers()) is a separate system from app.js's, not just a
// separate display layer, so the alias has to apply where the grouping key is computed too.
const NAME_ALIASES={'ben barker':'Benjamin Barker','tom fleming':'Thomas Fleming','maria lopez':'Jose Maria Lopez','razvan umbrarescu':'Răzvan Petru Umbrărescu','petru umbrarescu':'Răzvan Petru Umbrărescu','dan harper':'Daniel Harper','jonny adam':'Jonathan Adam','lorenzo fluxa cross':'Lorenzo Fluxá','aliaksandr malykhin':'Alex Malykhin','akhil kumar':'Ajith Kumar','marco sorensen':'Marco Sørensen','nicolas pino':'Nico Pino','matthew campbell':'Matt Campbell','benjamin hanley':'Ben Hanley','horst felix felbermayr':'Horst Felbermayr','horst felbermayr jr.':'Horst Felbermayr','matthew bell':'Matt Bell','matthew richard bell':'Matt Bell','olli gray':'Oliver Gray','mikkel pedersen':'Mikkel Gaarde Pedersen','eddie cheever':'Eddie Cheever III','thomas sargent':'Tom Sargent','v. hasse clot':'Valentin Hasse-Clot','v hasse clot':'Valentin Hasse-Clot','alex jacoby':'Alexander Jacoby','gaarde pedersen':'Mikkel Gaarde Pedersen','c. eastwood':'Charlie Eastwood','charles eastwood':'Charlie Eastwood','edward cheever':'Eddie Cheever III','n. varrone':'Nicolás Varrone','j. lopez':'Jose Maria Lopez','m. espirito santo':'Manuel Espírito Santo','p. hanson':'Phil Hanson','a. quinn':'Alex Quinn','alexander quinn':'Alex Quinn','christopher froggatt':'Chris Froggatt','oscar ryndziewicz':'Oscar Lee Ryndziewicz','matthew kurzejewski':'Matt Kurzejewski','christian dannemand jorgensen':'Christian Dannemand Jørgensen'};
function canonName(name){
  if(NAME_ALIASES[norm(name)]) return NAME_ALIASES[norm(name)];
  // app.js's registry also upgrades "V. Hasse Clot" -> "Valentin Hasse-Clot" using full names
  // already known from other races - without this an initials-only row from one race and the
  // full-name row from another land in two different driver records here.
  if(typeof window.resolveDriverFullName==='function') return window.resolveDriverFullName(name)||name;
  return name;
}
function getDriverNames(entry){return (entry.drivers||[]).map(d=>Array.isArray(d)?{name:canonName(d[0]),country:d[1]}:{name:canonName(d?.name||d),country:d?.country||d?.nationality||''}).filter(d=>d.name);}
function classPositions(r){const map=new Map(); const byCls={}; (r.entries||[]).forEach(e=>{const cls=e.class||'UNKNOWN';(byCls[cls]??=[]).push(e);}); Object.values(byCls).forEach(list=>list.sort((a,b)=>num(a.classPos||a.cpos)||num(a.pos)-num(b.pos)).forEach((e,i)=>map.set(e, num(e.classPos||e.cpos)||i+1))); return map;}
// e.grid (overall starting position) only exists when a separate Starting Grid PDF was imported
// - most races only have the Hyperpole/qualifying PDF, which populates race.qualifying with a
// CLASS-relative position instead (see app.js's extendedQualifyingRows comment). So class grid
// position falls back to race.qualifying (matched by car number + class) whenever e.grid is
// missing; overall grid position has no such fallback, since qualifying is class-only.
function gridPositions(r){
  const map=new Map(); const byCls={};
  (r.entries||[]).forEach(e=>{if(Number(e.grid)>0){const cls=e.class||'UNKNOWN';(byCls[cls]??=[]).push(e);}});
  Object.values(byCls).forEach(list=>list.sort((a,b)=>Number(a.grid)-Number(b.grid)).forEach((e,i)=>map.set(e,i+1)));
  if(Array.isArray(r.qualifying)&&r.qualifying.length){
    const byKey={};
    r.qualifying.forEach(q=>{ if(q.pos&&!byKey[q.class+'|'+q.no]) byKey[q.class+'|'+q.no]=q.pos; });
    (r.entries||[]).forEach(e=>{
      if(map.has(e)) return;
      const p=byKey[(e.class||'')+'|'+(e.no||'')];
      if(p!=null) map.set(e,p);
    });
  }
  return map;
}
function perfSets(r){const out={ppO:new Set(),ppC:new Set(),flO:new Set(),flC:new Set()}; const add=(type,p)=>{if(!p||!p.driver)return; const k=key(p.driver); const cls=String(p.class||'').toLowerCase(); const overall=cls==='overall'||p.overall; if(type==='PP') (overall?out.ppO:out.ppC).add(k); else (overall?out.flO:out.flC).add(k);}; if(Array.isArray(r.performance)){r.performance.forEach(p=>add(String(p.type||'').toUpperCase(),p));} else { (r.performance?.poles||[]).forEach(p=>add('PP',p)); (r.performance?.fastestLaps||[]).forEach(p=>add('FL',p)); } return out;}
function buildDrivers(){return cached('drivers',()=>{
  const m=new Map();
  const races=allRaces();
  if(typeof window.learnDriverFullNames==='function') races.forEach(r=>window.learnDriverFullNames(r.entries||[]));
  for(const r of races){
    const cp=classPositions(r), gp=gridPositions(r), perf=perfSets(r);
    for(const e of (r.entries||[])){
      const cpos=cp.get(e)||num(e.classPos)||9999, opos=num(e.pos)||9999;
      const driverNames=getDriverNames(e);
      // "Fastest of crew" only means something when a car was shared by more than one driver AND
      // the timing doc actually named who set the lap (e.bestLapDriver) - a solo entry would
      // trivially always be "fastest of crew" and skew the percentage, so it's excluded entirely
      // rather than counted as a free win.
      const crewEligible=driverNames.length>1 && !!e.bestLapDriver;
      const bestLapKey=crewEligible ? key(canonName(e.bestLapDriver)) : null;
      for(const drv of driverNames){
        const k=key(drv.name); if(!m.has(k))m.set(k,{key:k,name:String(drv.name),country:'',dob:'',raceIds:new Set(),finRaceIds:new Set(),startedRaceIds:new Set(),teams:new Set(),constructors:new Set(),classes:new Set(),series:new Map(),history:[],overallWins:0,classWins:0,overallPodiums:0,classPodiums:0,ppO:0,ppC:0,flO:0,flC:0,finishOSum:0,finishOCount:0,finishCSum:0,finishCCount:0,gridOSum:0,gridOCount:0,gridCSum:0,gridCCount:0,crewFastest:0,crewEligible:0});
        const d=m.get(k); d.country=getCountry(d.name,drv.country||d.country)||d.country; d.dob=getDob(d.name)||d.dob; d.raceIds.add(r.id); if(!/(DNS|DID NOT START|WITHDRAWN|WITHDRAWAL)/.test(status(e))) d.startedRaceIds.add(r.id); d.teams.add(e.team||''); d.constructors.add(e.constructor||''); d.classes.add(e.class||''); if(classified(e))d.finRaceIds.add(r.id);
        if(!d.series.has(r.series))d.series.set(r.series,{raceIds:new Set(),finRaceIds:new Set(),winsO:0,winsC:0,podO:0,podC:0,ppO:0,ppC:0,flO:0,flC:0}); const s=d.series.get(r.series); s.raceIds.add(r.id); if(classified(e))s.finRaceIds.add(r.id);
        if(opos===1){d.overallWins++;s.winsO++;} if(cpos===1){d.classWins++;s.winsC++;}
        if(opos<=3){d.overallPodiums++;s.podO++;} if(cpos<=3){d.classPodiums++;s.podC++;}
        if(perf.ppO.has(k)){d.ppO++;s.ppO++;} if(perf.ppC.has(k)){d.ppC++;s.ppC++;} if(perf.flO.has(k)){d.flO++;s.flO++;} if(perf.flC.has(k)){d.flC++;s.flC++;}
        if(opos<9999){d.finishOSum+=opos;d.finishOCount++;} if(cpos<9999){d.finishCSum+=cpos;d.finishCCount++;}
        if(Number(e.grid)>0){d.gridOSum+=Number(e.grid);d.gridOCount++;} if(gp.has(e)){d.gridCSum+=gp.get(e);d.gridCCount++;}
        const wasFastestOfCrew=crewEligible ? (key(drv.name)===bestLapKey) : null;
        if(crewEligible){ d.crewEligible++; if(wasFastestOfCrew) d.crewFastest++; }
        d.history.push({raceId:r.id,date:r.date||'',season:r.season,series:r.series,event:r.event,team:e.team,constructor:e.constructor,model:e.model,class:e.class,pos:opos,classPos:cpos,grid:Number(e.grid)||0,status:status(e),overallTotal:(r.entries||[]).length,classTotal:(r.entries||[]).filter(x=>String(x.class||'')===String(e.class||'')).length,ppO:perf.ppO.has(k),ppC:perf.ppC.has(k),flO:perf.flO.has(k),flC:perf.flC.has(k),crewEligible,wasFastestOfCrew});
      }
    }
  }
  return [...m.values()].map(d=>{d.entered=d.raceIds.size; d.starts=d.startedRaceIds?d.startedRaceIds.size:d.raceIds.size; d.finishes=d.finRaceIds.size; d.age=ageFromDob(d.dob); d.yearsActive=yearsActiveText(d); d.active=driverIsActive(d); d.ppTotal=d.ppO+d.ppC; d.flTotal=d.flO+d.flC; d.finishPct=d.entered?Math.round(100*d.finishes/d.entered):0; d.avgFinishO=d.finishOCount?+(d.finishOSum/d.finishOCount).toFixed(1):0; d.avgFinishC=d.finishCCount?+(d.finishCSum/d.finishCCount).toFixed(1):0; d.avgGridO=d.gridOCount?+(d.gridOSum/d.gridOCount).toFixed(1):0; d.avgGridC=d.gridCCount?+(d.gridCSum/d.gridCCount).toFixed(1):0; return d;}).sort((a,b)=>b.starts-a.starts||a.name.localeCompare(b.name));
});}
function buildTeams(){return cached('teams',()=>{const m=new Map(); for(const r of allRaces())for(const e of r.entries||[]){const k=key(e.team);if(!m.has(k))m.set(k,{name:e.team||'Unknown',raceIds:new Set(),entries:0,series:new Set(),constructors:new Set()});const x=m.get(k);x.raceIds.add(r.id);x.entries++;x.series.add(r.series);x.constructors.add(e.constructor||'');} return [...m.values()].sort((a,b)=>b.raceIds.size-a.raceIds.size||a.name.localeCompare(b.name));});}
function buildConstructors(){return cached('constructors',()=>{const m=new Map(); for(const r of allRaces())for(const e of r.entries||[]){const id=e.constructor||'unknown';const k=key(id);if(!m.has(k))m.set(k,{id:k,raw:id,name:String((G.constructors()||[]).find(c=>c.id===id)?.name||id),raceIds:new Set(),entries:0,series:new Set(),models:new Set()});const x=m.get(k);x.raceIds.add(r.id);x.entries++;x.series.add(r.series);x.models.add(e.model||'');} return [...m.values()].sort((a,b)=>b.raceIds.size-a.raceIds.size||String(a.name||'').localeCompare(String(b.name||'')));});}
function buildCircuits(){return cached('circuits',()=>{const m=new Map(); for(const r of allRaces()){const name=r.circuit||r.event||'Unknown'; const k=key(name+'-'+(r.country||'')); if(!m.has(k))m.set(k,{name,country:r.country||'',raceIds:new Set(),series:new Set(),events:[]}); const x=m.get(k); x.raceIds.add(r.id); x.series.add(r.series); if(!x.events.some(e=>e.id===r.id))x.events.push({id:r.id,event:r.event,series:r.series,season:r.season,date:r.date});} return [...m.values()].sort((a,b)=>b.raceIds.size-a.raceIds.size||a.name.localeCompare(b.name));});}
function diag(){
  const all=allRaces(); const withEntries=all.filter(r=>(r.entries||[]).length>0).length; const skeletons=all.length-withEntries;
  return `<div class="db85-diag"><b>Archive DB</b><span>${withEntries} races${skeletons?` <small>(+${skeletons} empty)</small>`:''}</span><span>${buildDrivers().length} drivers</span><span>${buildTeams().length} teams</span><span>${buildConstructors().length} constructors</span><span>${buildCircuits().length} circuits</span><button id="db85Rebuild">↻ Rebuild</button></div>`;
}
function renderDatabaseShell(active){
  document.body.classList.add('db-tab-active');
  const sec=$('tab-data'); if(sec)sec.classList.add('active'); document.querySelectorAll('.tab-content').forEach(s=>{if(s.id!=='tab-data')s.classList.remove('active')}); document.querySelectorAll('.tabs button').forEach(b=>b.classList.toggle('active',b.dataset.tab==='data'));
  document.querySelectorAll('[data-db-tab],[data-data-tab]').forEach(b=>b.classList.toggle('active',(b.dataset.dbTab||b.dataset.dataTab)===active));
}
const DRIVER_HEADERS=[
  {key:null,label:'#'},
  {key:'name',label:'Name'},
  {key:'country',label:'Nationality'},
  {key:'age',label:'Age'},
  {key:'active',label:'Active'},
  {key:'yearsActive',label:'Years active'},
  {key:'entered',label:'Entered',sub:'finished'},
  {key:'finishPct',label:'Finish rate'},
  {key:'winsTotal',label:'Wins',sub:'overall / class'},
  {key:'podiumsTotal',label:'Podiums',sub:'overall / class'},
  {key:'ppTotal',label:'PP',sub:'overall'},
  {key:'flTotal',label:'FL',sub:'overall'},
];
function driverSortValue(d,key){
  if(key==='name'||key==='country')return d[key]||'';
  if(key==='yearsActive')return Number(String(d.yearsActive).slice(0,4))||9999;
  if(key==='winsTotal')return d.overallWins+d.classWins;
  if(key==='podiumsTotal')return d.overallPodiums+d.classPodiums;
  if(key==='active')return d.active?1:0;
  return Number(d[key]??0);
}
// "Active" is anchored to today's real calendar year, not the newest season present in the
// archive - unlike yearsActiveText()'s "–" suffix, which reflects dataset coverage, this
// should read "no" for a driver whose most recent start already fell out of the trailing
// two-year window even if the archive itself hasn't been updated with newer seasons yet.
function driverIsActive(d){
  const currentYear=new Date().getFullYear();
  return (d.history||[]).some(h=>{const y=Number(h.season)||Number(String(h.date||'').slice(0,4)); return y && y>=currentYear-1;});
}
function driverHeaderCell(h,f){
  if(!h.key)return `<span>${h.label}</span>`;
  const active=f.sort===h.key;
  const arrow=active?(f.sortDir==='asc'?'▲':'▼'):'⇅';
  return `<span class="db85-sortable ${active?'active':''}" data-sort-key="${h.key}">${h.label} <em class="db85-sort-arrow ${active?'':'idle'}">${arrow}</em>${h.sub?`<br><small>${h.sub}</small>`:''}</span>`;
}
function renderDrivers(){
  const el=$('dataManager'); if(!el)return; const f=window.__db85Filters||(window.__db85Filters={q:'',country:'',series:'all',sort:'entered',sortDir:'desc',ageMin:'',ageMax:'',startsMin:'',winsMin:'',podiumsMin:'',ppMin:'',flMin:'',activeOnly:false}); let list=buildDrivers();
  if(f.q)list=list.filter(d=>norm(d.name+' '+[...d.teams].join(' ')).includes(norm(f.q))); if(f.country)list=list.filter(d=>norm(d.country).includes(norm(f.country))); if(f.series&&f.series!=='all')list=list.filter(d=>d.series.has(f.series)); if(f.activeOnly)list=list.filter(d=>d.active);
  const min=(v)=>Number(v)||0; if(f.ageMin)list=list.filter(d=>Number(d.age)>=min(f.ageMin)); if(f.ageMax)list=list.filter(d=>d.age&&Number(d.age)<=min(f.ageMax)); if(f.startsMin)list=list.filter(d=>d.entered>=min(f.startsMin)); if(f.winsMin)list=list.filter(d=>d.classWins+d.overallWins>=min(f.winsMin)); if(f.podiumsMin)list=list.filter(d=>d.classPodiums+d.overallPodiums>=min(f.podiumsMin)); if(f.ppMin)list=list.filter(d=>d.ppTotal>=min(f.ppMin)); if(f.flMin)list=list.filter(d=>d.flTotal>=min(f.flMin));
  const sort=f.sort||'entered', dir=f.sortDir||'desc', mul=dir==='asc'?1:-1;
  list.sort((a,b)=>{ const av=driverSortValue(a,sort), bv=driverSortValue(b,sort); const cmp=typeof av==='string'?av.localeCompare(bv):(av-bv); return mul*cmp||a.name.localeCompare(b.name); });
  const selected=list.find(d=>d.key===window.__db85Selected)||null; const seriesOpts=['all',...uniq(allRaces().map(r=>r.series))];
  // The Database tab's title/description/data-tab pills are static markup in index.html,
  // outside #dataManager - they're not part of what this function regenerates, so a driver's
  // full-page detail view has to explicitly hide them itself or they'd sit above it wasting
  // space (the whole point of the full-page detail was to give it more room).
  el.parentElement?.classList.toggle('db85-detail-open',!!selected);
  if(selected){
    el.innerHTML=driverDetail(selected);
    if($('db85Back'))$('db85Back').onclick=()=>{window.__db85Selected='';renderDrivers();};
    bindRebuild();
    document.querySelectorAll('[data-year-toggle]').forEach(tr=>tr.onclick=()=>{const y=tr.dataset.yearToggle; const ex=window.__db85ExpandedYears||(window.__db85ExpandedYears=new Set()); if(ex.has(y))ex.delete(y); else ex.add(y); renderDrivers();});
    // Clicking a race-history row closes the driver card and jumps straight to that race's
    // Dashboard - loadRace()/switchTab() come from app.js, not this file's own render system.
    document.querySelectorAll('[data-race-id]').forEach(tr=>tr.onclick=()=>{
      const id=tr.dataset.raceId; if(!id||typeof window.loadRace!=='function')return;
      window.__db85Selected='';
      window.loadRace(id);
    });
    return;
  }
  el.innerHTML=`${diag()}<div class="db85-driver-layout"><section class="db85-list"><div class="db85-head"><h3>Drivers</h3><span>${list.length}</span></div><div class="db85-filters"><input id="db85Q" placeholder="Driver or team…" value="${esc(f.q)}"><input id="db85Country" placeholder="Nationality…" value="${esc(f.country)}"><select id="db85Series">${seriesOpts.map(s=>`<option value="${esc(s)}" ${f.series===s?'selected':''}>${s==='all'?'All series':esc((G.series()&&G.series()[s]?.short)||s)}</option>`).join('')}</select><input id="db85AgeMin" type="number" placeholder="Age ≥" value="${esc(f.ageMin)}"><input id="db85StartsMin" type="number" placeholder="Entered ≥" value="${esc(f.startsMin)}"><input id="db85WinsMin" type="number" placeholder="Wins ≥" value="${esc(f.winsMin)}"><input id="db85PodiumsMin" type="number" placeholder="Podiums ≥" value="${esc(f.podiumsMin)}"><div class="db85-active-toggle"><button class="db85-toggle-btn ${!f.activeOnly?'active':''}" data-active-filter="all">All</button><button class="db85-toggle-btn ${f.activeOnly?'active':''}" data-active-filter="active">Active</button></div><button id="db85Clear">Clear</button></div><div class="db85-driver-row db85-row-head">${DRIVER_HEADERS.map(h=>driverHeaderCell(h,f)).join('')}</div>${list.map((d,i)=>`<button class="db85-driver-row" data-driver="${esc(d.key)}"><span>${i+1}</span><strong>${esc(d.name)}</strong><span>${flagHtml(d.country)} ${esc(d.country||'—')}</span><span>${esc(d.age||'—')}</span><span class="db86-active ${d.active?'yes':'no'}" title="${d.active?'Active':'Inactive'}">${d.active?'✓':'✗'}</span><span>${esc(d.yearsActive||'—')}</span><span class="db86-starts db86-entered-finish"><b>${d.entered}</b><small>${d.finishes} finished</small></span><span class="db86-finish-rate">${pct(d.finishes,d.entered)}</span><span>${metricPair(d.overallWins,d.classWins)}</span><span>${metricPair(d.overallPodiums,d.classPodiums)}</span><span><b class="db86-overall-only">${d.ppO}</b></span><span><b class="db86-overall-only">${d.flO}</b></span></button>`).join('')||'<div class="empty-state">No drivers.</div>'}</section></div>`;
  const bind=(id,k)=>{const x=$(id);if(!x)return; x.oninput=x.onchange=()=>{const pos=x.selectionStart; f[k]=x.value; renderDrivers(); const n=$(id); if(n){n.focus(); try{n.setSelectionRange(pos,pos)}catch{}}};};
  [['db85Q','q'],['db85Country','country'],['db85Series','series'],['db85AgeMin','ageMin'],['db85StartsMin','startsMin'],['db85WinsMin','winsMin'],['db85PodiumsMin','podiumsMin']].forEach(([i,k])=>bind(i,k));
  document.querySelectorAll('[data-sort-key]').forEach(elx=>elx.onclick=()=>{const k=elx.dataset.sortKey; if(f.sort===k){f.sortDir=f.sortDir==='asc'?'desc':'asc';}else{f.sort=k;f.sortDir=(k==='name'||k==='country'||k==='yearsActive')?'asc':'desc';} renderDrivers();});
  document.querySelectorAll('[data-active-filter]').forEach(b=>b.onclick=()=>{f.activeOnly=b.dataset.activeFilter==='active';renderDrivers();});
  document.querySelectorAll('[data-driver]').forEach(b=>b.onclick=()=>{window.__db85Selected=b.dataset.driver;renderDrivers();}); if($('db85Clear'))$('db85Clear').onclick=()=>{window.__db85Filters={q:'',country:'',series:'all',sort:'entered',sortDir:'desc',ageMin:'',ageMax:'',startsMin:'',winsMin:'',podiumsMin:'',ppMin:'',flMin:'',activeOnly:false};renderDrivers();};
  bindRebuild();
  document.querySelectorAll('[data-year-toggle]').forEach(tr=>tr.onclick=()=>{const y=tr.dataset.yearToggle; const ex=window.__db85ExpandedYears||(window.__db85ExpandedYears=new Set()); if(ex.has(y))ex.delete(y); else ex.add(y); renderDrivers();});
}
function seriesLabel(s){const ser=G.series(); return String((ser&&ser[s]?.short)||s||'').toUpperCase();}

function titleCaseBrand(v){
  const raw=String(v||'').trim();
  const map={bmw:'BMW',oreca:'Oreca',ferrari:'Ferrari',porsche:'Porsche',mercedes:'Mercedes',astonmartin:'Aston Martin',cadillac:'Cadillac',toyota:'Toyota',peugeot:'Peugeot',alpine:'Alpine',lamborghini:'Lamborghini',mclaren:'McLaren',corvette:'Corvette',lexus:'Lexus',ford:'Ford',audi:'Audi',acura:'Acura',ligier:'Ligier',duqueine:'Duqueine',ginetta:'Ginetta'};
  const k=key(raw).replace(/-/g,'');
  return map[k]||raw.replace(/[-_]+/g,' ').replace(/\b\w/g,m=>m.toUpperCase());
}
function yesNo(v){return v?'✓':'–'}
function metricPair(o,c){return `<span class="db86-main-pair"><b>${o}</b><small>overall</small></span><span class="db86-main-pair"><b>${c}</b><small>class</small></span>`;}
function statMini(label,count,percent){return `<div class="db86-mini-stat"><b>${count}</b><span>${label}</span><strong>${percent}</strong></div>`;}
function seriesLogo(s){try{if(typeof logo==='function')return logo('series',s,'db85-series-logo')}catch{} return '';}
function constructorLogo(id){try{if(typeof logo==='function')return logo('constructor',id,'db85-car-logo')}catch{} return '';}
function carDisplay(h){const model=h.model||titleCaseBrand(h.constructor||''); const brand=titleCaseBrand(h.constructor||''); return `<span class="db85-car-cell">${constructorLogo(h.constructor)}<span><b>${esc(model)}</b><small>${esc(brand)}</small></span></span>`;}
function placeText(prefix,pos,total){return `${prefix}${pos<9000?esc(pos):'—'}${total?` <small>(${esc(total)})</small>`:''}`;}
function seriesBadge(s){return `<span class="db85-series-badge db85-series-${esc(key(s))}">${seriesLogo(s)}<span>${esc(seriesLabel(s))}</span></span>`;}
function seriesBadgeCompact(s){return `<span class="db85-series-compact" title="${esc(seriesLabel(s))}">${seriesLogo(s)}</span>`;}
function fmtDate(dateStr,season){
  const m=String(dateStr||'').match(/^(\d{4})-(\d{2})-(\d{2})/);
  if(m)return `${m[3]}.${m[2]}.${m[1].slice(2)}`;
  return dateStr?esc(dateStr):esc(season||'');
}
function historyRowsHtml(history){
  const groups=[]; let cur=null;
  for(const h of history){
    const year=String(h.date||'').slice(0,4)||String(h.season||'');
    if(!cur||cur.year!==year){ cur={year,items:[]}; groups.push(cur); }
    cur.items.push(h);
  }
  const expanded=window.__db85ExpandedYears||(window.__db85ExpandedYears=new Set());
  const rows=[];
  for(const g of groups){
    const isOpen=expanded.has(g.year);
    const s={entered:g.items.length,finished:0,winO:0,winC:0,podO:0,podC:0,ppO:0,ppC:0,flO:0,flC:0,crewFastest:0,crewEligible:0};
    g.items.forEach(h=>{ if(!/(RET|DNF|DNS|DSQ|NC|NOT CLASSIFIED|EXCLUDED|WITHDRAWN)/.test(String(h.status||'').toUpperCase()))s.finished++; if(h.pos===1)s.winO++; if(h.classPos===1)s.winC++; if(h.pos<=3)s.podO++; if(h.classPos<=3)s.podC++; if(h.ppO)s.ppO++; if(h.ppC)s.ppC++; if(h.flO)s.flO++; if(h.flC)s.flC++; if(h.crewEligible){s.crewEligible++; if(h.wasFastestOfCrew)s.crewFastest++;} });
    const crewStat=s.crewEligible?` · Fastest of crew ${s.crewFastest}/${s.crewEligible}`:'';
    rows.push(`<tr class="db85-year-row ${isOpen?'open':''}" data-year-toggle="${esc(g.year)}"><td colspan="14"><span class="db85-year-caret">${isOpen?'▾':'▸'}</span><b>${esc(g.year)}</b><span class="db85-year-stats">Entered ${s.entered} · Finished ${s.finished} · Win ${s.winO}/${s.winC} · Podium ${s.podO}/${s.podC} · PP ${s.ppO}/${s.ppC} · FL ${s.flO}/${s.flC}${crewStat}</span></td></tr>`);
    if(isOpen){
      for(const h of g.items){
        const openHref=h.raceId?`#race=${encodeURIComponent(h.raceId)}`:'';
        rows.push(`<tr class="db85-history-row" data-race-id="${esc(h.raceId||'')}"><td>${fmtDate(h.date,h.season)}</td><td>${seriesBadgeCompact(h.series)}</td><td>${esc(h.event)}</td><td>${classBadge(h.series,h.class)}</td><td>${esc(h.team||'')}</td><td>${carDisplay(h)}</td><td>${placeText('P',h.pos,h.overallTotal)}</td><td>${placeText('P',h.classPos,h.classTotal)}</td><td>${esc(h.status)}</td><td>${yesNo(h.ppO)}</td><td>${yesNo(h.ppC)}</td><td>${yesNo(h.flO)}</td><td>${yesNo(h.flC)}</td><td>${h.raceId?`<a class="db85-race-open" href="${openHref}" target="_blank" title="Open race dashboard in a new tab" onclick="event.stopPropagation()">↗</a>`:''}</td></tr>`);
      }
    }
  }
  return rows.join('');
}
function statTile(label,count,percent){return `<div class="db85-stat-tile"><b>${count}</b><span>${label}</span><strong>${percent}</strong></div>`;}
function dobFormatted(dob){const m=String(dob||'').match(/^(\d{4})-(\d{2})-(\d{2})/); return m?`${m[3]}.${m[2]}.${m[1].slice(2)}`:'';}
function lastActiveYear(d){const years=(d.history||[]).map(h=>Number(h.season)||Number(String(h.date||'').slice(0,4))).filter(Boolean); return years.length?Math.max(...years):null;}
function driverInitials(name){return String(name||'').trim().split(/\s+/).map(w=>w[0]).filter(Boolean).slice(0,2).join('').toUpperCase();}
const RATING_COLORS={platinum:'#ffffff',gold:'#d4af37',silver:'#adb5bd',bronze:'#c07a3a'};
function ratingLabel(cat){const c=String(cat||'').toLowerCase(); return c?(c[0].toUpperCase()+c.slice(1)):'Unrated';}
function ratingDot(cat){const c=String(cat||'').toLowerCase(); return `<span class="db85-rating-dot" style="background:${RATING_COLORS[c]||'#4a5b70'}"></span>`;}
function ratingBlock(d){
  const r=getRating(d.name);
  const history=(r&&r.history||[]).slice().sort((a,b)=>Number(b.year)-Number(a.year));
  const historyHtml=history.length
    ? history.map(h=>`<li>${ratingDot(h.category)}<span>${esc(h.year)}</span><b>${esc(ratingLabel(h.category))}</b></li>`).join('')
    : '<li class="db85-rating-empty">No rating history recorded yet.</li>';
  return `<div class="db85-rating"><div class="db85-rating-current" title="FIA Driver rating category">${ratingDot(r&&r.current)}<span>${esc(ratingLabel(r&&r.current))}</span></div><details class="db85-rating-history"><summary>Rating history</summary><ul>${historyHtml}</ul></details></div>`;
}
function driverDetail(d){
  const by=[...d.series.entries()].map(([s,x])=>`<div class="db85-series"><b>${seriesBadge(s)}</b><span>${x.raceIds.size} starts · ${x.finRaceIds.size} finishes</span><span>Win overall ${x.winsO} · win class ${x.winsC}</span><span>Podium overall ${x.podO} · podium class ${x.podC}</span><span>PP overall ${x.ppO} · PP class ${x.ppC}</span><span>FL overall ${x.flO} · FL class ${x.flC}</span></div>`).join('');
  const hist=historyRowsHtml(d.history.sort((a,b)=>String(b.date).localeCompare(String(a.date))));
  const dob=dobFormatted(d.dob);
  const last=lastActiveYear(d);
  const activeHtml=d.active?`<span class="db86-active yes">✓ Active</span>`:`<span class="db86-active no">✗ Inactive${last?` · last active ${esc(last)}`:''}</span>`;
  return `<section class="db85-detail"><button id="db85Back" class="db85-back">← Back to Drivers</button><div class="db85-detail-header"><div class="db85-photo">${esc(driverInitials(d.name))}</div><div class="db85-detail-heading"><h1 class="db85-detail-name">${flagHtml(d.country)}${esc(d.name)}</h1><div class="db85-detail-meta"><span>Age ${esc(d.age||'—')}${dob?` (${dob})`:''}</span><span>Years active ${esc(d.yearsActive||'—')}</span>${activeHtml}</div></div>${ratingBlock(d)}</div><div class="db86-detail-metrics"><div class="db86-metric-row db86-row-starts">${statMini('Entered',d.entered,'')}${statMini('Started',d.starts,'')}${statMini('Finished',d.finishes,'')}${statMini('Finish rate',pct(d.finishes,d.entered),`${d.finishes} / ${d.entered} finished`)}</div><div class="db86-metric-row">${statMini('Avg finish (overall)',d.avgFinishO||'—','')}${statMini('Avg finish (class)',d.avgFinishC||'—','')}${statMini('Avg grid (overall)',d.avgGridO||'—','')}${statMini('Avg grid (class)',d.avgGridC||'—','')}</div><div class="db86-metric-row">${statMini('Win overall',d.overallWins,pct(d.overallWins,d.starts))}${statMini('Win class',d.classWins,pct(d.classWins,d.starts))}${statMini('Podium overall',d.overallPodiums,pct(d.overallPodiums,d.starts))}${statMini('Podium class',d.classPodiums,pct(d.classPodiums,d.starts))}</div><div class="db86-metric-row db86-row-five">${statMini('PP overall',d.ppO,pct(d.ppO,d.starts))}${statMini('PP class',d.ppC,pct(d.ppC,d.starts))}${statMini('FL overall',d.flO,pct(d.flO,d.starts))}${statMini('FL class',d.flC,pct(d.flC,d.starts))}${statMini('Fastest of crew',d.crewEligible?pct(d.crewFastest,d.crewEligible):'—',d.crewEligible?`${d.crewFastest} / ${d.crewEligible} shared drives`:'no shared-car data')}</div></div><h3>Race history</h3><div class="db85-table-wrap"><table><thead><tr><th>Date</th><th>Series</th><th>Race</th><th>Class</th><th>Team</th><th>Car</th><th>Ovr</th><th>Cls</th><th>Status</th><th>PP Ovr</th><th>PP Cls</th><th>FL Ovr</th><th>FL Cls</th><th></th></tr></thead><tbody>${hist}</tbody></table></div><h3>By series</h3><div class="db85-series-grid">${by}</div></section>`;
}

function cardGrid(kind){const el=$('dataManager'); if(!el)return; let items=[]; if(kind==='teams')items=buildTeams(); if(kind==='constructors')items=buildConstructors(); if(kind==='circuits')items=buildCircuits(); const title=kind[0].toUpperCase()+kind.slice(1); el.innerHTML=`${diag()}<section class="db85-cards"><h3>${title}</h3><div class="db85-grid">${items.map(x=>{const ser=uniq([...(x.series||[])].map(s=>(G.series()&&G.series()[s]?.short)||s)).join(' · '); if(kind==='circuits'){const ev=(x.events||[]).slice(0,5).map(e=>`<li>${seriesBadge(e.series)} <span>${esc(e.season||'')}</span> ${esc(e.event||'')}</li>`).join('');return `<article class="db85-circuit-card"><h3>${flagHtml(x.country)} ${esc(x.name)}</h3><p>${x.raceIds.size} unique race${x.raceIds.size===1?'':'s'}</p><div class="db85-series-line">${[...(x.series||[])].map(seriesBadge).join('')}</div><ul>${ev}</ul></article>`;} if(kind==='constructors')return `<article><div class="db85-logo">${constructorLogo(x.raw||x.id)}</div><h3>${esc(x.name)}</h3><p>${x.raceIds.size} races · ${x.entries} entries</p><em>${esc(ser)}</em><em>${esc([...x.models].filter(Boolean).slice(0,5).join(', '))}</em></article>`; return `<article><h3>${esc(x.name)}</h3><p>${x.raceIds.size} races · ${x.entries} entries</p><em>${esc(ser)}</em><em>${esc([...x.constructors].filter(Boolean).join(', '))}</em></article>`;}).join('')}</div></section>`; bindRebuild();}
function bindRebuild(){const rb=$('db85Rebuild'); if(rb)rb.onclick=()=>{invalidateDbCache(); renderDb(window.__db85Tab||'drivers');};}
function renderDb(tab,activate=true){tab=tab||window.__db85Tab||'drivers'; window.__db85Tab=tab; if(activate)renderDatabaseShell(tab); if(tab==='drivers')renderDrivers(); else cardGrid(tab); bindRebuild();}
function bindNav(){document.addEventListener('click',ev=>{const btn=ev.target.closest('[data-db-tab],[data-data-tab]'); if(!btn)return; ev.preventDefault(); ev.stopImmediatePropagation(); const tab=btn.dataset.dbTab||btn.dataset.dataTab||'drivers'; window.__db85Selected=''; renderDb(tab);},true);}
function addCss(){const css=`
.db85-diag{display:flex;gap:10px;align-items:center;background:rgba(255,255,255,.04);border:1px solid #25384f;border-radius:12px;padding:8px 10px;margin:0 0 12px}.db85-diag span{background:#101c2b;border:1px solid #263b56;border-radius:999px;padding:3px 8px;color:#b9c5d8}.db85-diag button,.db85-back,#db85Clear{background:#16263a;border:1px solid #34506f;color:#eaf1fb;border-radius:8px;padding:6px 10px;cursor:pointer}.db85-driver-layout{display:grid;grid-template-columns:1fr;gap:14px}.db85-list,.db85-detail,.db85-cards{background:rgba(10,22,35,.92);border:1px solid #263b56;border-radius:14px;padding:12px}.db85-head{display:flex;justify-content:space-between;align-items:center}.db85-filters{display:grid;grid-template-columns:repeat(6,minmax(100px,1fr));gap:8px;margin:10px 0}.db85-filters input,.db85-filters select,.db85-edit input{background:#071321;border:1px solid #263b56;color:#eaf1fb;border-radius:8px;padding:8px}.db85-driver-row{display:grid;grid-template-columns:34px minmax(132px,1.25fr) minmax(118px,.92fr) 42px 54px 78px 70px 68px 92px 100px 76px 76px;gap:8px;align-items:center;width:100%;background:transparent;border:0;border-bottom:1px solid rgba(255,255,255,.08);color:#eaf1fb;text-align:left;padding:8px 6px;cursor:pointer}
.db86-active{text-align:center;font-size:15px;font-weight:900}.db86-active.yes{color:#3ddc84}.db86-active.no{color:#ff5c5c}
.db85-active-toggle{display:flex;gap:6px}.db85-toggle-btn{background:#071321;border:1px solid #263b56;color:#9fb0c7;border-radius:8px;padding:8px 12px;cursor:pointer;font-size:12px}.db85-toggle-btn.active{background:#1d3350;border-color:#3b5f87;color:#eaf1fb}.db85-driver-row.active{background:rgba(35,126,207,.18);box-shadow:inset 3px 0 #2aa8ff}.db85-row-head{color:#9fb0c7;text-transform:uppercase;font-size:10px;letter-spacing:.06em;cursor:default}.db85-flag svg{height:13px;width:auto;vertical-align:-2px;margin-right:5px}.db85-flag.missing{font-size:10px;color:#8595ac}.db85-detail{width:100%;padding:20px}.db85-back{margin-bottom:16px;font-size:13px}.db85-detail-header{display:flex;gap:18px;align-items:center;margin-bottom:18px}.db85-rating{margin-left:auto;align-self:flex-start;flex:none;text-align:right}.db85-rating-current{display:inline-flex;align-items:center;gap:8px;background:#111f30;border:1px solid #263b56;border-radius:999px;padding:7px 14px;font-size:13px;font-weight:800;color:#eaf1fb;white-space:nowrap}.db85-rating-dot{width:12px;height:12px;border-radius:50%;flex:none;box-shadow:0 0 0 2px rgba(255,255,255,.1)}.db85-rating-history{margin-top:7px;text-align:left}.db85-rating-history summary{cursor:pointer;list-style:none;color:#7fc4ff;font-size:12px;font-weight:700;text-align:right}.db85-rating-history summary::-webkit-details-marker{display:none}.db85-rating-history summary::before{content:'▸';display:inline-block;margin-right:5px;transition:transform .15s}.db85-rating-history[open] summary::before{transform:rotate(90deg)}.db85-rating-history ul{list-style:none;margin:8px 0 0;padding:0;display:grid;gap:5px;min-width:170px}.db85-rating-history li{display:flex;align-items:center;gap:7px;font-size:12px;color:#b9c5d8;background:#0d1a29;border:1px solid #1c2c40;border-radius:8px;padding:5px 10px}.db85-rating-history li b{color:#eaf1fb;margin-left:auto;font-size:12px}.db85-rating-empty{color:#7f93ab;font-style:italic;font-size:11px}.db85-photo{width:88px;height:88px;flex:none;border-radius:14px;background:linear-gradient(180deg,#16263a,#0b1420);border:1px solid #34506f;display:flex;align-items:center;justify-content:center;font-size:30px;font-weight:900;color:#6f849e}.db85-detail-heading{min-width:0}.db85-detail-name{display:flex;align-items:center;gap:12px;font-size:32px;font-weight:950;color:#fff;margin:0 0 10px;line-height:1.1}.db85-detail-name .db85-flag{margin:0}.db85-detail-name .db85-flag svg{height:30px;width:auto;margin-right:0}.db85-detail-name .db85-flag.emoji{font-size:30px;width:auto}.db85-detail-name .db85-flag.missing{font-size:17px}.db85-detail-meta{display:flex;gap:18px;flex-wrap:wrap;align-items:center;color:#9fb0c7;font-size:14px}.db85-detail-meta .db86-active{font-size:14px;text-align:left;font-weight:800}.db85-metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:12px 0}.db85-metrics div,.db85-series,.db85-grid article{background:#111f30;border:1px solid #263b56;border-radius:10px;padding:10px}.db85-metrics b{display:block;font-size:20px}.db85-metrics span,.db85-series span{display:block;color:#9fb0c7;font-size:12px}.db85-series-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.db85-table-wrap{overflow:auto;max-height:380px}.db85-detail table{width:100%;border-collapse:collapse}.db85-detail th,.db85-detail td{border-bottom:1px solid rgba(255,255,255,.08);padding:7px;text-align:left;vertical-align:middle}.db85-badge{border-radius:6px;padding:3px 7px;font-weight:800;font-size:11px;white-space:nowrap}.db85-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px}.db85-grid article{display:flex;flex-direction:column;gap:5px}.db85-grid article h3{margin:2px 0 0;font-size:15px;line-height:1.25}.db85-grid article>p{margin:0;color:#9fb0c7;font-size:12px}.db85-grid article em{display:block;font-style:normal;font-size:11px;line-height:1.4;color:#8fa1b8;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.db85-grid article em:first-of-type{color:#7fc4ff;font-weight:700;letter-spacing:.02em}.db85-logo{display:flex;align-items:center;min-height:28px}.db85-logo img,.db85-logo svg{max-height:26px;max-width:56px}.db85-flag.emoji{font-size:15px;display:inline-block;width:20px;text-align:center;margin-right:5px}.db85-series-badge{display:inline-flex;align-items:center;gap:5px;border-radius:6px;background:#1d3350;border:1px solid #3b5f87;color:#ddecff;font-size:10px;font-weight:900;padding:3px 7px;letter-spacing:.06em;white-space:nowrap}.db85-series-badge .logo-box{height:14px;min-width:22px}.db85-series-badge .logo-box img{max-height:12px;max-width:34px}.db85-series-wec{background:#14284d;color:#fff}.db85-series-elms{background:#103d26;color:#a6ffcb}.db85-series-imsa{background:#3b1520;color:#ffd0d8}.db85-series-gtwc-eu,.db85-series-gtwc{background:#2d234f;color:#dfd5ff}.db85-series-mlmc{background:#533b0e;color:#ffe4a0}.db85-series-line{display:flex;gap:5px;flex-wrap:wrap;margin:6px 0}.db85-circuit-card ul{list-style:none;padding:0;margin:8px 0 0;display:grid;gap:5px}.db85-circuit-card li{font-size:12px;color:#b9c5d8}.db85-circuit-card li span{color:#8192aa;margin:0 5px}.db85-stat-tile strong,.db85-metrics div strong{display:block;margin-top:4px;color:#9fd2ff;font-size:12px}.db85-metrics div{min-height:66px}.db86-oc-count{display:block;font-weight:800}.db86-oc-pct{display:none}.db85-car-cell{display:flex;align-items:center;gap:7px}.db85-car-logo{height:24px;min-width:42px}.db85-car-logo img{max-height:20px;max-width:48px}.db85-car-logo .fallback-logo{font-size:10px}.db85-car-cell b{display:block;font-size:12px}.db85-car-cell small{display:block;color:#8fa1b8;font-size:10px;line-height:1.05}.db86-main-pair{display:inline-flex;flex-direction:column;align-items:flex-start;margin-right:7px;line-height:1.05}.db86-main-pair:first-child b{font-size:18px;color:#eaf6ff}.db86-main-pair:first-child small{font-size:10px;color:#b8d7ff}.db86-main-pair b{font-size:12px;color:#9db1c8}.db86-overall-only{font-size:18px;color:#eaf6ff}.db86-finish-rate{font-size:14px;font-weight:800;color:#eaf6ff}.db86-main-pair small,.db85-row-head small,.db86-starts small{font-size:9px;color:#8fa1b8;text-transform:none;letter-spacing:0}.db86-starts{display:flex;flex-direction:column;line-height:1.1}.db86-entered-finish strong{font-size:16px;color:#eaf6ff;line-height:1.05}.db86-entered-finish small{font-size:9px;color:#8fa1b8}.db86-detail-metrics{display:grid;gap:8px;margin:12px 0}.db86-metric-row{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}.db86-row-starts{grid-template-columns:repeat(4,1fr)}.db86-row-five{grid-template-columns:repeat(5,1fr)}.db86-mini-stat{background:#111f30;border:1px solid #263b56;border-radius:10px;padding:10px;min-height:62px}.db86-mini-stat b{display:block;font-size:22px}.db86-mini-stat span{display:block;color:#9fb0c7;font-size:12px}.db86-mini-stat strong{display:block;margin-top:4px;color:#9fd2ff;font-size:12px}@media(max-width:1100px){.db85-filters{grid-template-columns:repeat(2,1fr)}.db85-driver-row{grid-template-columns:30px 1fr .85fr 38px 44px 66px 62px 58px 80px 84px 66px 66px;font-size:12px}.db85-series-grid,.db85-metrics{grid-template-columns:repeat(2,1fr)}.db85-detail-header{flex-direction:column;align-items:flex-start}.db85-detail-name{font-size:24px}.db85-rating{margin-left:0;margin-top:4px;text-align:left}.db85-rating-history{text-align:left}.db85-rating-history summary{text-align:left}}
.db85-series-compact{display:inline-flex;align-items:center;justify-content:center}.db85-series-compact .logo-box{height:26px;min-width:36px;width:auto}.db85-series-compact .logo-box img{max-height:24px;max-width:52px}
.db85-year-row{cursor:pointer}.db85-year-row td{padding:10px 7px;font-weight:900;font-size:14px;border-bottom:1px solid rgba(159,210,255,.3);background:rgba(159,210,255,.04)}.db85-year-row:hover td{background:rgba(159,210,255,.09)}.db85-year-row:first-child td{padding-top:8px}.db85-year-caret{display:inline-block;width:14px;color:#7fa8cc;font-size:11px}.db85-year-row b{letter-spacing:.04em;color:#9fd2ff;margin-right:14px}.db85-year-stats{font-weight:600;font-size:12px;color:#8fa1b8;letter-spacing:0}.db85-year-row.open td{background:rgba(159,210,255,.07)}
.db85-history-row{cursor:pointer}.db85-history-row:hover td{background:rgba(45,138,255,.08)}.db85-race-open{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:6px;color:#7fa8cc;text-decoration:none;font-size:13px}.db85-race-open:hover{background:rgba(159,210,255,.15);color:#eaf6ff}
.data-manager-panel.db85-detail-open>.panel-title-row,.data-manager-panel.db85-detail-open>p.muted,.data-manager-panel.db85-detail-open>.data-tabs{display:none}
.db85-detail td:first-child,.db85-detail th:first-child{white-space:nowrap}
.db85-sortable{cursor:pointer;user-select:none}.db85-sortable:hover{color:#eaf6ff}.db85-sortable.active{color:#9fd2ff}.db85-sort-arrow{font-size:9px;color:#4da6ff}.db85-sort-arrow.idle{color:#5b6c82;font-size:8px}.db85-sortable:hover .db85-sort-arrow.idle{color:#8fa1b8}
`; const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);}
function boot(){document.title='SCC v0.8.6.11 · Database + importer foundations'; document.querySelectorAll('.brand span,.version,.app-version,[data-version]').forEach(el=>el.textContent=VERSION); addCss(); bindNav(); setTimeout(()=>renderDb(window.__db85Tab||'drivers',false),80);}
document.addEventListener('DOMContentLoaded',boot); setTimeout(boot,100);
// activate=false here: this hook is also called by app.js's render() on every re-render to
// keep the (possibly hidden) Data tab's content warm, regardless of which tab is actually
// visible - forcing tab-data active on every call was silently hijacking navigation (e.g.
// on to any Dashboard/Order/Summary re-render). Real navigation into the tab (the sidebar's
// data-db-tab buttons, handled by bindNav() below) still calls renderDb(tab) directly with
// activate defaulting to true.
window.renderDataManager=()=>renderDb(window.__db85Tab||'drivers',false); window.openSccDatabase=renderDb; window.__SCC_DB85={buildDrivers,buildTeams,buildConstructors,buildCircuits,renderDb};
})();
