function showContent(t){let e=document.getElementsByClassName("content"),o=document.querySelectorAll(".active");document.querySelector(".dataparent");for(let l=0;l<e.length;l++){let n=e[l];n.getAttribute("data-content")===t?n.style.display="block":n.style.display="none"}for(let a=0;a<o.length;a++){let r=o[a];r.getAttribute("data-content")===t?r.style.borderBottom="4px solid #0d2438":r.style.borderBottom="0 solid transparent"}}"/messages/"===window.location.pathname&&localStorage.removeItem("count");