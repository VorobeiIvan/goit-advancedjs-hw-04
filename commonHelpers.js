import{a as m,S as f}from"./assets/vendor-a97f8a75.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const g="40813799-13823f8fac4dfa82ba757ecf4";async function d(o,r=1,a=40){const n=`https://pixabay.com/api/?key=${g}&q=${o}&image_type=photo&orientation=horizontal&safesearch=true&page=${r}&per_page=${a}`,{data:e}=await m.get(n);return e}const i={searchForm:document.getElementById("search-form"),searchQueryInput:document.getElementsByName("searchQuery")[0],gallery:document.querySelector(".gallery"),loadMoreBtn:document.querySelector(".load-more")};let l=new f(".gallery-link",{captions:!0}),c="",u=1;i.searchForm.addEventListener("submit",async o=>{if(o.preventDefault(),c=i.searchQueryInput.value.trim(),!c){Notiflix.Report.failure("Please enter a request","OK"),i.searchQueryInput.value="";return}try{const{hits:r,totalHits:a}=await d(c,u);if(a===0){v();return}a<=40?Notiflix.Report.info("Search Results",`Hooray! We found ${a} images. Sorry, but that's all I could find. You have reached the end of your search.`,"OK"):Notiflix.Report.success("Search Results",`Hooray! We found ${a} images.`,"OK"),b(r,a),y(r)}catch(r){console.error("Search error:",r),Notiflix.Report.failure("Search Error","Sorry, there was an error retrieving the images. Please try again later.","OK")}});i.loadMoreBtn.addEventListener("click",async o=>{u+=1;try{const{hits:r}=await d(c,u);y(r),i.gallery.insertAdjacentHTML("beforeend",p(r))}catch(r){console.error("Load more error:",r)}});function b(o){i.gallery.innerHTML=p(o),$()}function y(o){o.length>=40?i.loadMoreBtn.style.display="block":(i.loadMoreBtn.style.display="none",Notiflix.Report.info("End of Results","We're sorry, but you've reached the end of search results.","OK"))}function v(){Notiflix.Report.failure("No results found","Please try another search","OK")}function p(o){return o.map(({webformatURL:r,largeImageURL:a,tags:n,likes:e,views:t,comments:s,downloads:h})=>`
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
            <b>Comments</b> ${s}</p>
            <p class="info-item">
            <b>Downloads</b> ${h}</p>
          </div>
        </div>
      `).join("")}function $(){l&&l.destroy&&l.destroy(),l=new f(".gallery-link",{captions:!0})}
//# sourceMappingURL=commonHelpers.js.map
