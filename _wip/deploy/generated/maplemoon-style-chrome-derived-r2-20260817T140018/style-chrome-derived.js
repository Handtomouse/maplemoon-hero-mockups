/* MapleMoon style-only derived mobile chrome. Packet 20260817T134139. */
(function(){
  'use strict';
  var media=window.matchMedia('(max-width: 900px)');
  document.querySelectorAll('[data-mm-style-mobile-header]').forEach(function(header){
    var toggle=header.querySelector('[data-mm-style-menu-toggle]');
    var panel=header.querySelector('[data-mm-style-menu-panel]');
    var inerted=[];
    var lastOpener=null;
    function focusables(){
      return Array.prototype.filter.call(header.querySelectorAll('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])'),function(el){
        return !el.hidden&&el.getClientRects().length>0;
      });
    }
    function containBackground(on){
      if(on){
        inerted=[];
        var branch=header;
        while(branch&&branch!==document.body){
          Array.prototype.forEach.call(branch.parentElement.children,function(el){
            if(el===branch||el.tagName==='SCRIPT'||el.tagName==='STYLE')return;
            inerted.push({el:el,inert:el.inert,aria:el.getAttribute('aria-hidden')});
            el.inert=true;el.setAttribute('aria-hidden','true');
          });
          branch=branch.parentElement;
        }
      }else{
        inerted.forEach(function(item){
          item.el.inert=item.inert;
          if(item.aria===null)item.el.removeAttribute('aria-hidden');else item.el.setAttribute('aria-hidden',item.aria);
        });
        inerted=[];
      }
    }
    function setOpen(open,returnFocus){
      if(!media.matches)open=false;
      toggle.setAttribute('aria-expanded',String(open));
      toggle.setAttribute('aria-label',open?'Close menu':'Open menu');
      toggle.textContent=open?'Close':'Menu';
      panel.hidden=!open;
      header.setAttribute('data-mm-style-menu-state',open?'open':'closed');
      document.documentElement.toggleAttribute('data-mm-style-menu-open',open);
      containBackground(open);
      if(open){
        lastOpener=toggle;
        var first=panel.querySelector('a[href]');if(first)first.focus();
      }else if(returnFocus&&lastOpener){
        lastOpener.focus();
      }
    }
    toggle.addEventListener('click',function(){setOpen(toggle.getAttribute('aria-expanded')!=='true',true);});
    header.addEventListener('keydown',function(event){
      if(toggle.getAttribute('aria-expanded')!=='true')return;
      if(event.key==='Escape'){event.preventDefault();setOpen(false,true);return;}
      if(event.key!=='Tab')return;
      var items=focusables();if(!items.length)return;
      var first=items[0],last=items[items.length-1];
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
    });
    panel.addEventListener('click',function(event){if(event.target.closest('a[href]'))setOpen(false,false);});
    function reset(){if(!media.matches)setOpen(false,false);}
    if(media.addEventListener)media.addEventListener('change',reset);else media.addListener(reset);
    setOpen(false,false);
  });
})();


/* R2 bounded skip activation: make preserved route targets reliably reached. */
(function(){
  'use strict';
  document.querySelectorAll(':where(.skip-link,.mm-skip-link,.mm-review-skip,.mm-style-skip-link)[href^="#"]').forEach(function(skip){
    skip.addEventListener('click',function(event){
      var id=skip.getAttribute('href').slice(1);
      var target=id&&document.getElementById(id);
      if(!target)return;
      event.preventDefault();
      var top=Math.max(0,target.getBoundingClientRect().top+window.scrollY-78);
      var root=document.documentElement;
      var priorScrollBehavior=root.style.scrollBehavior;
      root.style.scrollBehavior='auto';
      window.scrollTo(0,top);
      root.style.scrollBehavior=priorScrollBehavior;
      if(typeof target.focus==='function')target.focus({preventScroll:true});
      if(history.replaceState)history.replaceState(null,'','#'+id);
    });
  });
})();
