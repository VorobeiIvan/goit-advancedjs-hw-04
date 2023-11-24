import{a as p,S as u}from"./assets/vendor-a97f8a75.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const m="40813799-13823f8fac4dfa82ba757ecf4";async function d(r,n=1,a=40){const s=`https://pixabay.com/api/?key=${m}&q=${r}&image_type=photo&orientation=horizontal&safesearch=true&page=${n}&per_page=${a}`,{data:e}=await p.get(s);return e}const o={searchForm:document.getElementById("search-form"),searchQueryInput:document.getElementsByName("searchQuery")[0],gallery:document.querySelector(".gallery"),loadMoreBtn:document.querySelector(".load-more")};let l=new u(".gallery-link",{captions:!0}),c=1;o.searchForm.addEventListener("submit",async r=>{r.preventDefault();const n=o.searchQueryInput.value.trim();if(n)try{const{hits:a,totalHits:s}=await d(n,c);if(s===0){b();return}Notiflix.Report.success("Search Results",`Hooray! We found ${s} images.`,"OK"),g(a,s),a.length>=40?o.loadMoreBtn.style.display="block":o.loadMoreBtn.style.display="none"}catch(a){console.error("Search error:",a),Notiflix.Report.failure("Search Error","Sorry, there was an error retrieving the images. Please try again later.","OK")}else Notiflix.Report.failure("Please enter a request","OK"),o.searchQueryInput.value=""});o.loadMoreBtn.addEventListener("click",async r=>{c+=1,h()});function h(){d(o.searchQueryInput.value,c).then(({hits:r})=>{o.gallery.insertAdjacentHTML("beforeend",f(r))}).catch(r=>{console.error("Load more error:",r)})}function g(r,n){const a=f(r);o.gallery.innerHTML=a,v(),n/r.length===c?o.loadMoreBtn.style.display="block":(o.loadMoreBtn.style.display="none",Notiflix.Report.info("End of Results","We're sorry, but you've reached the end of search results.","OK"))}function b(){o.gallery.innerHTML="<p>No results found. Please try another search.</p>",o.loadMoreBtn.style.display="none"}function f(r){return r.map(({webformatURL:n,largeImageURL:a,tags:s,likes:e,views:t,comments:i,downloads:y})=>`
        <div class="photo-card">
          <a class="gallery-link" href="${a}" title="${s}" >
            <img src="${n}" alt="${s}" width="300" loading="lazy">
          </a>
          <div class="info">
            <p class="info-item">
            <b>Likes</b> ${e}</p>
            <p class="info-item">
            <b>Views</b> ${t}</p>
            <p class="info-item">
            <b>Comments</b> ${i}</p>
            <p class="info-item">
            <b>Downloads</b> ${y}</p>
          </div>
        </div>
      `).join("")}function v(){l&&l.destroy&&l.destroy(),l=new u(".gallery-link",{captions:!0})}
//# sourceMappingURL=commonHelpers.js.map
