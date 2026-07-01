/* SCC v0.8.6.14 · current-field DOB enrichment marker */
(function(){
  const VERSION='v0.8.6.14';
  function boot(){
    document.title='SCC v0.8.6.14 · DOB pass + ACO importer';
    document.querySelectorAll('.brand span,.version,.app-version,[data-version]').forEach(el=>el.textContent=VERSION);
    document.body.dataset.sccVersion='0.8.6.14';
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else setTimeout(boot,0);
})();
