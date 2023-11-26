import{a as h,S as m}from"./assets/vendor-a97f8a75.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const g="40813799-13823f8fac4dfa82ba757ecf4";async function u(o,r=1,a=40){const n=`https://pixabay.com/api/?key=${g}&q=${o}&image_type=photo&orientation=horizontal&safesearch=true&page=${r}&per_page=${a}`,{data:e}=await h.get(n);return e}const s={searchForm:document.getElementById("search-form"),searchQueryInput:document.getElementsByName("searchQuery")[0],gallery:document.querySelector(".gallery"),loadMoreBtn:document.querySelector(".load-more")};let f=new m(".gallery-link",{captions:!0}),l="",c=1;s.searchForm.addEventListener("submit",async o=>{if(o.preventDefault(),c=1,l=s.searchQueryInput.value.trim(),!l){Notiflix.Report.failure("Please enter a request","OK"),s.searchQueryInput.value="";return}try{const{hits:r,totalHits:a}=await u(l,c);if(a===0){v();return}a<=40?Notiflix.Report.info("Search Results",`Hooray! We found ${a} images. Sorry, but that's all I could find. You have reached the end of your search.`,"OK"):Notiflix.Report.success("Search Results",`Hooray! We found ${a} images.`,"OK"),b(r,a),d(r)}catch(r){console.error("Search error:",r),Notiflix.Report.failure("Search Error","Sorry, there was an error retrieving the images. Please try again later.","OK")}});s.loadMoreBtn.addEventListener("click",async o=>{c+=1;try{const{hits:r}=await u(l,c);d(r),s.gallery.insertAdjacentHTML("beforeend",y(r))}catch(r){console.error("Load more error:",r)}f.refresh()});function b(o){s.gallery.innerHTML=y(o),f.refresh()}function d(o){o.length>=40?s.loadMoreBtn.style.display="block":(s.loadMoreBtn.style.display="none",Notiflix.Report.info("End of Results","We're sorry, but you've reached the end of search results.","OK"))}function v(){s.searchQueryInput.value="",s.gallery.innerHTML="",s.loadMoreBtn.style.display="none",Notiflix.Report.failure("No results found","Please try another search","OK")}function y(o){return o.map(({webformatURL:r,largeImageURL:a,tags:n,likes:e,views:t,comments:i,downloads:p})=>`
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
            <b>Downloads</b> ${p}</p>
          </div>
        </div>
      `).join("")}
//# sourceMappingURL=commonHelpers.js.map
