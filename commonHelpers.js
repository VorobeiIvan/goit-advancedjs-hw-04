import{a as p,S as u}from"./assets/vendor-a97f8a75.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const h="40813799-13823f8fac4dfa82ba757ecf4";async function d(o,r=1,a=40){const n=`https://pixabay.com/api/?key=${h}&q=${o}&image_type=photo&orientation=horizontal&safesearch=true&page=${r}&per_page=${a}`;try{const e=await p.get(n);return{hits:e.data.hits,totalHits:e.data.totalHits}}catch(e){throw console.error("Error getting data:",e),Notiflix.Notify.failure("Sorry, there was an error retrieving the images. Please try again later."),e}}const s={searchForm:document.getElementById("search-form"),searchQueryInput:document.getElementsByName("searchQuery")[0],gallery:document.querySelector(".gallery"),loadMoreBtn:document.querySelector(".load-more")};let l=new u(".gallery-link",{captions:!0}),c=1;s.searchForm.addEventListener("submit",async o=>{o.preventDefault();const r=s.searchQueryInput.value;try{const{hits:a,totalHits:n}=await d(r,c);if(n===0){m();return}Notiflix.Report.success("Search Results",`Hooray! We found ${n} images.`,"OK"),y(a,n),s.searchQueryInput.value="",a.length>=40?s.loadMoreBtn.style.display="block":s.loadMoreBtn.style.display="none"}catch(a){console.error("Search error:",a),Notiflix.Report.failure("Search Error","Sorry, there was an error retrieving the images. Please try again later.","OK")}});s.loadMoreBtn.addEventListener("click",async()=>{try{c+=1;const o=s.searchQueryInput.value,{hits:r}=await d(o,c);y(r)}catch(o){console.error("Load more error:",o)}});function y(o,r){const a=g(o);s.gallery.innerHTML=a,b(),r>c*40?s.loadMoreBtn.style.display="block":(s.loadMoreBtn.style.display="none",Notiflix.Report.info("End of Results","We're sorry, but you've reached the end of search results.","OK"))}function m(){s.gallery.innerHTML="<p>No results found. Please try another search.</p>",s.loadMoreBtn.style.display="none"}function g(o){return o.map(({webformatURL:r,largeImageURL:a,tags:n,likes:e,views:t,comments:i,downloads:f})=>`
        <div class="photo-card">
          <a class="gallery-link" href="${a}" title="${n}" >
            <img src="${r}" alt="${n}" width="300" loading="lazy">
          </a>
          <div class="info">
            <p class="info-item">
            <b>Likes</b> ${e}</p>
            <p class="info-item">
            <b>Views</b> ${t}</p>
            <p class="info-item">
            <b>Comments</b> ${i}</p>
            <p class="info-item">
            <b>Downloads</b> ${f}</p>
          </div>
        </div>
      `).join("")}function b(){l&&l.destroy&&l.destroy(),l=new u(".gallery-link",{captions:!0})}
//# sourceMappingURL=commonHelpers.js.map
