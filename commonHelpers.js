import{a as f,S as b,i as c}from"./assets/vendor-202cbe3f.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&a(d)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const y=t=>`
  <li class="gallery-card">
    <a class="gallery-link" href="${t.largeImageURL}">
      <img
        class="gallery-img"
        src="${t.webformatURL}"
        alt="${t.tags}"
        />
    </a>
<div class="gallery-info">
    <div class="info-item">
      <strong>Likes</strong>
      <span>${t.likes}</span>
    </div>
    <div class="info-item">
      <strong>Views</strong>
      <span>${t.views}</span>
    </div>
    <div class="info-item">
      <strong>Comments</strong>
      <span>${t.comments}</span>
    </div>
    <div class="info-item">
      <strong>Downloads</strong>
      <span>${t.downloads}</span>
    </div>
  </div>
  </li>
  `;f.defaults.baseURL="https://pixabay.com";const w="45269069-80d5a565d51e24ea911778696",L=(t,s)=>{const o={params:{q:t,key:w,page:s,per_page:15,image_type:"photo",orientation:"horizontal",safesearch:!0}};return f.get("/api/",o)},g=document.querySelector(".js-search-form"),u=document.querySelector(".js-gallery"),p=document.querySelector(".js-loader"),n=document.querySelector(".js-load-more"),h="topRight";let m=0,i=1,l="",v=new b(".gallery a",{captionsData:"alt",captionDelay:250});const S=()=>{const t=document.querySelector(".gallery-img");return t?t.getBoundingClientRect().height:0},P=async t=>{try{if(m>0&&m<=15*i){c.error({message:"Ми шкодуемо але всі пости закінчилися!",position:h}),n.classList.add("is-hidden");return}i++;const{data:s}=await L(l,i),{hits:o}=s;if(m=s.totalHits,s.length===0){n.classList.add("is-hidden"),c.error({message:"Постів більше не знайдено!",position:h});return}const a=o.map(r=>y(r)).join("");u.insertAdjacentHTML("beforeend",a),v.refresh();const e=S();window.scrollBy({top:e*2,behavior:"smooth"})}catch(s){console.log(s)}},q=t=>{if(t.preventDefault(),l=t.target.elements.user_query.value.trim(),n.classList.add("is-hidden"),l===""){c.error({message:"Поле для пошуку не має бути порожнім!",position:h}),g.reset();return}p.classList.remove("is-hidden"),i=1,L(l,i).finally(()=>{p.classList.add("is-hidden")}).then(({data:s})=>{const{hits:o}=s;if(o.length===0){c.error({message:"За вашим запитом, зображень не знайдено!",position:"topRight"}),g.reset(),u.innerHTML="";return}const a=o.map(e=>y(e)).join("");u.innerHTML=a,v.refresh(),n.classList.remove("is-hidden")}).catch(s=>{console.log(s)})};g.addEventListener("submit",q);n.addEventListener("click",P);
//# sourceMappingURL=commonHelpers.js.map
