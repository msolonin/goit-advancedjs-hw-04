import{a as y,S as w,i}from"./assets/vendor-202cbe3f.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const m of r.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&a(m)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const L=t=>`
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
  `;y.defaults.baseURL="https://pixabay.com";const P="45269069-80d5a565d51e24ea911778696",v=(t,s,o)=>{const a={params:{q:t,key:P,page:s,per_page:o,image_type:"photo",orientation:"horizontal",safesearch:!0}};return y.get("/api/",a)},u=document.querySelector(".js-search-form"),p=document.querySelector(".js-gallery"),f=document.querySelector(".js-loader"),c=document.querySelector(".js-load-more"),h=15,n="topRight";let g=0,l=1,d="",b=new w(".gallery a",{captionsData:"alt",captionDelay:250});const S=()=>{const t=document.querySelector(".gallery-img");return t?t.getBoundingClientRect().height:0},q=async t=>{try{l++;const{data:s}=await v(d,l,h),{hits:o}=s;if(g=s.totalHits,s.length===0){c.classList.add("is-hidden"),i.error({message:"Постів більше не знайдено!",position:n});return}const a=o.map(r=>L(r)).join("");p.insertAdjacentHTML("beforeend",a),b.refresh();const e=S();if(window.scrollBy({top:e*2,behavior:"smooth"}),g>0&&g<=h*l){i.error({message:"Ми шкодуемо але всі пости закінчилися!",position:n}),c.classList.add("is-hidden");return}}catch(s){i.error({message:s,position:n})}},C=async t=>{try{if(t.preventDefault(),d=t.target.elements.user_query.value.trim(),c.classList.add("is-hidden"),d===""){i.error({message:"Поле для пошуку не має бути порожнім!",position:n}),u.reset();return}f.classList.remove("is-hidden"),l=1;const{data:s}=await v(d,l,h),{hits:o}=s;if(o.length===0){i.error({message:"За вашим запитом, зображень не знайдено!",position:"topRight"}),u.reset(),p.innerHTML="";return}const a=o.map(e=>L(e)).join("");p.innerHTML=a,b.refresh(),c.classList.remove("is-hidden"),f.classList.add("is-hidden")}catch(s){i.error({message:s,position:n})}};u.addEventListener("submit",C);c.addEventListener("click",q);
//# sourceMappingURL=commonHelpers.js.map
