(function(){
  if (window.__mmFB) return; window.__mmFB = true;
  var active=false, hlEl=null, pop=null, toastT, tags=[];
  var params=new URLSearchParams(location.search), session=params.get('review')||'legacy';
  var dragStart=null, dragBox=null, isDragging=false;
  var CATS=['Fix / general','Colour','Size','Spacing','Copy / wording','Motion','Layout / position','Add / new','Like / keep','Remove'];
  var PRIORITIES=['P0 · blocks review','P1 · important','P2 · polish','P3 · later'];
  var STATUSES=['Observed','Needs decision','Approved','In progress','Verified','Accepted','Blocked'];
  var css=[
  "#mm-fb-root,#mm-fb-root *{box-sizing:border-box;font-family:-apple-system,Helvetica,sans-serif}",
  "#mm-fb-bar{position:fixed;left:16px;bottom:16px;z-index:2147483000;display:flex;gap:8px;align-items:center}",
  "#mm-fb-session{background:#e8e1cf;color:#59636b;border:1px solid #cbd0c8;border-radius:40px;padding:8px 11px;font:600 10px/1 sans-serif;max-width:190px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",
  "#mm-fb-toggle{background:#1f2b38;color:#e7e4ca;border:1px solid #b3a380;border-radius:40px;padding:11px 16px;min-height:44px;min-width:44px;font:600 12px/1 sans-serif;letter-spacing:.03em;cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,.45)}",
  "#mm-fb-toggle.on{background:#b3a380;color:#1a1d16}",
  "#mm-fb-list-btn,#mm-fb-export{background:#1f2b38;color:#e7e4ca;border:1px solid #33414f;border-radius:40px;padding:11px 14px;min-height:44px;min-width:44px;font:600 12px/1 sans-serif;cursor:pointer}",
  "#mm-fb-hint{background:rgba(20,29,39,.9);color:#9fb0bd;border:1px solid #33414f;border-radius:8px;padding:8px 12px;font:500 11px/1.3 sans-serif;display:none}",
  "#mm-fb-hint.on{display:block}",
  ".mm-fb-hl{outline:2px solid #b3a380 !important;outline-offset:1px;cursor:crosshair !important;background:rgba(179,163,128,.10) !important}",
  ".mm-fb-box{position:absolute;z-index:2147482500;border:1.5px dashed #b3a380;background:rgba(179,163,128,.16);pointer-events:none}",
  "#mm-fb-pop{position:absolute;z-index:2147483001;width:288px;background:#161d27;color:#e7e4ca;border:1px solid #b3a380;border-radius:10px;padding:12px;box-shadow:0 12px 40px rgba(0,0,0,.6)}",
  "#mm-fb-pop .t{font-size:11px;color:#9fb0bd;margin-bottom:9px;word-break:break-word;max-height:46px;overflow:hidden}",
  "#mm-fb-pop select,#mm-fb-pop textarea{width:100%;background:#0f141b;color:#e7e4ca;border:1px solid #33414f;border-radius:6px;padding:8px;font-size:13px;margin-bottom:8px}",
  "#mm-fb-pop textarea{resize:vertical;min-height:62px}",
  "#mm-fb-pop .btns{display:flex;gap:8px}#mm-fb-pop button{flex:1;border:0;border-radius:6px;padding:9px;font:600 12px/1 sans-serif;cursor:pointer}",
  "#mm-fb-save{background:#b3a380;color:#1a1d16}#mm-fb-cancel{background:#2a3644;color:#e7e4ca}",
  ".mm-fb-pin{position:absolute;z-index:2147482000;width:22px;height:22px;border-radius:50% 50% 50% 2px;background:#b3a380;color:#1a1d16;font:700 11px/22px sans-serif;text-align:center;cursor:pointer;box-shadow:0 3px 8px rgba(0,0,0,.5);transform:translate(-4px,-24px)}",
  ".mm-fb-pin.region{border-radius:3px}",
  "#mm-fb-panel{position:fixed;left:16px;bottom:64px;z-index:2147483001;width:320px;max-height:52vh;overflow:auto;background:#141d27;border:1px solid #33414f;border-radius:10px;padding:10px;box-shadow:0 12px 40px rgba(0,0,0,.6);display:none}",
  "#mm-fb-panel.open{display:block}#mm-fb-panel .mm-fb-title{margin:2px 4px 8px;font:700 12px/1 sans-serif;color:#e7e4ca}",
  ".mm-fb-row{display:flex;gap:8px;align-items:flex-start;padding:7px 6px;border-top:1px solid #232f3b;font-size:12px;color:#c7d0d8}",
  ".mm-fb-row .n{background:#b3a380;color:#1a1d16;border-radius:5px;min-width:18px;height:18px;font:700 10px/18px sans-serif;text-align:center;flex:none}",
  ".mm-fb-row .c{color:#b3a380;font-size:10px;text-transform:uppercase;letter-spacing:.05em}.mm-fb-row .x{margin-left:auto;color:#7c8794;cursor:pointer;font-weight:700;flex:none}",
  "#mm-fb-toast{position:fixed;left:16px;bottom:66px;z-index:2147483002;background:#16241a;color:#8fd0a0;border:1px solid #3f9d5b;border-radius:8px;padding:9px 14px;font:600 12px/1 sans-serif;opacity:0;transition:opacity .3s;pointer-events:none}#mm-fb-toast.show{opacity:1}"].join("\n");
  var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
  var root=document.createElement('div');root.id='mm-fb-root';document.body.appendChild(root);
  var bar=document.createElement('div');bar.id='mm-fb-bar';
  bar.innerHTML='<span id="mm-fb-session">Session: '+session.replace(/</g,'&lt;')+'</span><button id="mm-fb-toggle">&#127991; Tag feedback</button><button id="mm-fb-list-btn">Tags <span id="mm-fb-count">0</span></button><button id="mm-fb-export">Export session notes</button><span id="mm-fb-hint">Click an element, or <b>drag a box</b> for a region</span>';
  root.appendChild(bar);
  var panel=document.createElement('div');panel.id='mm-fb-panel';root.appendChild(panel);
  var toast=document.createElement('div');toast.id='mm-fb-toast';root.appendChild(toast);
  var toggle=bar.querySelector('#mm-fb-toggle'),listBtn=bar.querySelector('#mm-fb-list-btn'),exportBtn=bar.querySelector('#mm-fb-export'),hint=bar.querySelector('#mm-fb-hint');
  function isUI(el){return el&&el.closest&&el.closest('#mm-fb-root');}
  function selectorFor(el){
    if(!el||el===document.body)return 'body';var parts=[],node=el,depth=0;
    while(node&&node.nodeType===1&&node!==document.body&&depth<6){
      if(node.id){parts.unshift('#'+node.id);break;}
      var t=node.tagName.toLowerCase();var cls=(node.className&&typeof node.className==='string')?'.'+node.className.trim().split(/\s+/).slice(0,2).join('.'):'';
      var idx=1,sib=node;while(sib=sib.previousElementSibling){if(sib.tagName===node.tagName)idx++;}
      parts.unshift(t+cls+':nth-of-type('+idx+')');node=node.parentElement;depth++;
    }return parts.join(' > ');
  }
  function txt(el){return (el.textContent||'').trim().replace(/\s+/g,' ').slice(0,120);}
  function clearHl(){if(hlEl){hlEl.classList.remove('mm-fb-hl');hlEl=null;}}
  function showToast(m){toast.textContent=m;toast.classList.add('show');clearTimeout(toastT);toastT=setTimeout(function(){toast.classList.remove('show');},1900);}
  function closePop(){if(pop){pop.remove();pop=null;}}
  function renderCount(){document.getElementById('mm-fb-count').textContent=tags.length;}
  function addPin(rec){
    var pin=document.createElement('div');pin.className='mm-fb-pin'+(rec.region?' region':'');
    pin.style.left=(rec.rect?rec.rect.x:8)+'px';pin.style.top=(rec.rect?rec.rect.y:8)+'px';
    pin.title='['+rec.cat+'] '+rec.note;pin.dataset.id=rec.id;
    pin.onclick=function(){showToast('#'+pin.textContent+' ['+rec.cat+'] '+(rec.note||''));};
    root.appendChild(pin);renumberPins();
  }
  function renumberPins(){root.querySelectorAll('.mm-fb-pin').forEach(function(p,i){p.textContent=i+1;});}
  function renderPanel(){
    panel.innerHTML='<div class="mm-fb-title">Tags on this page ('+tags.length+')</div>';
    tags.forEach(function(rec,i){
      var row=document.createElement('div');row.className='mm-fb-row';
      row.innerHTML='<span class=n>'+(i+1)+'</span><div><span class=c>'+rec.cat+(rec.region?' · region':'')+'</span><br><span style="color:#9fb0bd;font-size:10px">'+(rec.viewport||((rec.vw||0)<700?'mobile':'desktop'))+' · '+(rec.priority||'P2 · polish')+' · '+(rec.status||'Observed')+'</span><br>'+(rec.note||'(no note)').replace(/</g,'&lt;')+'<br><span style="color:#6b7580;font-size:10px">'+((rec.text||'').slice(0,40))+'</span></div><span class=x data-id="'+rec.id+'">&times;</span>';
      row.querySelector('.x').onclick=function(){delTag(rec.id);};panel.appendChild(row);
    });
  }
  function exportMarkdown(){
    var title=location.pathname.split('/').pop().replace(/\.html?$/,'')+' '+session+' review ledger';
    var out='# '+title+'\n\nSource: `'+location.pathname+'`\nExported: '+new Date().toLocaleString()+'\n\n';
    out+='| ID | Viewport | Category | Priority | Status | Location | Request |\n|---|---|---|---|---|---|---|\n';
    tags.forEach(function(r,i){var clean=function(v){return String(v||'').replace(/\|/g,'\\|').replace(/\n/g,' ');};out+='| MM-'+String(i+1).padStart(3,'0')+' | '+clean(r.viewport||((r.vw||0)<700?'mobile':'desktop'))+' | '+clean(r.cat)+' | '+clean(r.priority||'P2 · polish')+' | '+clean(r.status||'Observed')+' | '+clean(r.sel||'[region]')+' | '+clean(r.note||'')+' |\n';});
    var blob=new Blob([out],{type:'text/markdown'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=title.replace(/[^a-z0-9]+/gi,'-')+'.md';a.click();setTimeout(function(){URL.revokeObjectURL(a.href);},500);showToast('Session notes exported');
  }
  function delTag(id){fetch('/__feedback/delete',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:id})}).then(function(){
    tags=tags.filter(function(r){return r.id!==id;});var pin=root.querySelector('.mm-fb-pin[data-id="'+id+'"]');if(pin)pin.remove();renumberPins();renderCount();renderPanel();showToast('Tag removed');});}
  function openPop(info,x,y){
    closePop();
    pop=document.createElement('div');pop.id='mm-fb-pop';
    var opts=CATS.map(function(c){return '<option>'+c+'</option>';}).join('');
    var head=info.isRegion?'<b>&#9723; Region</b> · '+info.rect.w+'&times;'+info.rect.h+'px':'<b>'+info.el.tagName.toLowerCase()+'</b> &middot; '+(info.tx||'(no text)');
    pop.innerHTML='<div class="t">'+head+'</div><select id="mm-fb-cat">'+opts+'</select><select id="mm-fb-priority">'+PRIORITIES.map(function(x){return '<option>'+x+'</option>';}).join('')+'</select><select id="mm-fb-status">'+STATUSES.map(function(x){return '<option>'+x+'</option>';}).join('')+'</select><textarea id="mm-fb-note" placeholder="What should change here?"></textarea><div class="btns"><button id="mm-fb-cancel">Cancel</button><button id="mm-fb-save">Save tag</button></div>';
    root.appendChild(pop);
    var px=Math.min(x,window.scrollX+window.innerWidth-304),py=Math.min(y+8,window.scrollY+window.innerHeight-250);
    pop.style.left=Math.max(8,px)+'px';pop.style.top=Math.max(8,py)+'px';pop.querySelector('#mm-fb-note').focus();
    pop.querySelector('#mm-fb-cancel').onclick=function(){closePop();clearHl();};
    pop.querySelector('#mm-fb-save').onclick=function(){
      var cat=pop.querySelector('#mm-fb-cat').value,priority=pop.querySelector('#mm-fb-priority').value,status=pop.querySelector('#mm-fb-status').value,note=pop.querySelector('#mm-fb-note').value.trim();
      var rec={session:session,url:location.pathname,sel:info.sel,text:info.tx,cat:cat,priority:priority,status:status,note:note,rect:info.rect,vw:window.innerWidth,viewport:window.innerWidth<700?'mobile':'desktop',region:!!info.isRegion};
      fetch('/__feedback',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(rec)}).then(function(r){return r.json();}).then(function(j){
        rec.id=j.id;tags.push(rec);addPin(rec);renderCount();renderPanel();showToast('Tagged ✓ (#'+tags.length+(info.isRegion?', region':'')+')');
      }).catch(function(){showToast('Save failed');});
      closePop();clearHl();
    };
  }
  function onMove(e){if(!active||dragStart)return;var t=e.target;if(isUI(t)){clearHl();return;}if(t!==hlEl){clearHl();hlEl=t;t.classList.add('mm-fb-hl');}}
  function onDown(e){if(!active)return;var t=e.target;if(isUI(t))return;e.preventDefault();e.stopPropagation();dragStart={x:e.pageX,y:e.pageY,target:t};isDragging=false;}
  function onDrag(e){if(!active||!dragStart)return;var dx=e.pageX-dragStart.x,dy=e.pageY-dragStart.y;
    if(!isDragging&&(Math.abs(dx)>5||Math.abs(dy)>5)){isDragging=true;clearHl();dragBox=document.createElement('div');dragBox.className='mm-fb-box';root.appendChild(dragBox);}
    if(isDragging){var x=Math.min(e.pageX,dragStart.x),y=Math.min(e.pageY,dragStart.y);dragBox.style.left=x+'px';dragBox.style.top=y+'px';dragBox.style.width=Math.abs(dx)+'px';dragBox.style.height=Math.abs(dy)+'px';}}
  function onUp(e){if(!active||!dragStart)return;var ds=dragStart;dragStart=null;
    if(isDragging){var x=Math.min(e.pageX,ds.x),y=Math.min(e.pageY,ds.y),w=Math.abs(e.pageX-ds.x),h=Math.abs(e.pageY-ds.y);
      if(dragBox){dragBox.remove();dragBox=null;}isDragging=false;
      openPop({isRegion:true,sel:'[region]',tx:'',rect:{x:Math.round(x),y:Math.round(y),w:Math.round(w),h:Math.round(h)}},e.pageX,e.pageY);
    }else{var el=ds.target,r=el.getBoundingClientRect();
      openPop({isRegion:false,el:el,sel:selectorFor(el),tx:txt(el),rect:{x:Math.round(r.left+window.scrollX),y:Math.round(r.top+window.scrollY),w:Math.round(r.width),h:Math.round(r.height)}},e.pageX,e.pageY);}}
  toggle.onclick=function(){active=!active;toggle.classList.toggle('on',active);hint.classList.toggle('on',active);if(!active){clearHl();closePop();if(dragBox){dragBox.remove();dragBox=null;}dragStart=null;}showToast(active?'Tagging ON':'Tagging off');};
  listBtn.onclick=function(){panel.classList.toggle('open');};
  exportBtn.onclick=exportMarkdown;
  document.addEventListener('mouseover',onMove,true);
  document.addEventListener('mousedown',onDown,true);
  document.addEventListener('mousemove',onDrag,true);
  document.addEventListener('mouseup',onUp,true);
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){closePop();if(dragBox){dragBox.remove();dragBox=null;}dragStart=null;}});
  fetch('/__feedback/log').then(function(r){return r.text();}).then(function(t){
    t.trim().split('\n').filter(Boolean).forEach(function(l){try{var r=JSON.parse(l);if(r.url===location.pathname && (r.session||'legacy')===session){tags.push(r);addPin(r);}}catch(e){}});renderCount();renderPanel();});
})();
