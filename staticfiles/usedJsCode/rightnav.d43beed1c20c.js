document.addEventListener("DOMContentLoaded",function(){let e=document.querySelector("#rightnavsearchButton"),t=document.querySelector("#rightnavsearchicon"),l=document.querySelector("#rightnavsearch"),n=document.querySelector("#rightnavsearch2"),s=document.querySelector("#rightnavParent"),r="                          https://django-channels-byf5.onrender.com";e.addEventListener("input",()=>{document.querySelector("#allrightnavsuggestions").style.display="none",s.style.display="block",l.style.display="block",n.style.display="none"}),document.querySelector("#rightnavcancel").addEventListener("click",()=>{s.style.display="none",document.querySelector("#allrightnavsuggestions").style.display="block"}),t.onclick=async e=>{document.querySelector("#allrightnavsuggestions").style.display="none",s.style.display="block",e.preventDefault();let t=new FormData(document.querySelector("#rightnavsearchform")),r=new URLSearchParams(t),o="https://django-channels-byf5.onrender.com/search?"+r.toString(),i=await fetch(o,{method:"GET",headers:{"X-CSRFToken":"{{ csrf_token }}"}});if(i.ok){let a=await i.json();document.querySelector("#rightnavParent").style.display="block",n.style.display="flex",console.log(a),console.log("data"),a.results.length>=1?a.results.forEach(e=>{let t=document.createElement("div"),l=document.createElement("div"),s=document.createElement("div"),r=document.createElement("img"),o=document.createElement("p"),i=document.createElement("p"),a=document.createElement("p"),y=document.createElement("p");t.style.width="80%",t.style.padding="1.5rem 0",t.style.height="fit-content",t.style.position="relative",t.style.backgroundImage="url("+e.cover+")",t.style.borderRadius="10px",t.style.minHeight="108px",r.src=e.pics,r.style.width="60px",r.style.height="60px",r.style.borderRadius="50%",r.style.position="absolute",r.style.left="4%",r.style.zIndex="20",t.append(r),o.innerHTML=e.username,o.style.color="white",o.style.width="100%",o.style.textAlign="center",i.innerHTML="item.bio",i.style.color="white",i.style.width="100%",i.style.textAlign="center",a.style.height="fit-content",a.style.width="fit-content",a.style.padding="5px",a.style.color="white",a.style.borderRadius="5px",a.style.backgroundColor="limegreen",a.style.zIndex="20",a.style.marginTop="8px",a.style.cursor="pointer",a.innerHTML="View",s.style.display="grid",s.style.backgroundColor="black",s.style.opacity="0.4",s.style.backdropFilter="blur(2px)",s.style.position="absolute",s.style.bottom="0",s.style.width="100%",s.style.height="50%",s.style.borderRadius="5px",s.style.paddingBottom="3x",s.append(o),s.append(i),l.append(y),l.append(a),l.style.position="absolute",l.style.right="4%",l.style.top="6%",l.style.zIndex="10",t.append(l),t.append(s),n.append(t)}):(document.querySelector("#rightnavcancel").style.display="block",l.style.display="none",n.innerHTML="Search not found")}};let o;e.addEventListener("input",e=>{clearTimeout(o),o=setTimeout(async()=>{document.querySelector("#allrightnavsuggestions").style.display="none",e.preventDefault();let t=new FormData(document.querySelector("#rightnavsearchform")),o=new URLSearchParams(t),i="https://django-channels-byf5.onrender.com/search?"+o.toString(),a=await fetch(i,{method:"GET",headers:{"X-CSRFToken":"{{ csrf_token }}"}}),y=await a.json();if(console.log(y),console.log("data233"),l.style.display="none",s.style.display="block",n.innerHTML="",n.style.display="flex",y.results.length>=1){y.results.slice(0,3).forEach(e=>{let t=document.createElement("div"),l=document.createElement("div"),s=document.createElement("div");document.createElement("div");let o=document.createElement("img"),i=document.createElement("p"),a=document.createElement("p"),y=document.createElement("p");t.style.width="80%",t.style.padding="1.5rem 0",t.style.height="fit-content",t.style.position="relative",t.style.borderRadius="10px",t.style.minHeight="108px",o.style.width="60px",o.style.height="60px",o.style.borderRadius="50%",o.style.position="absolute",o.style.left="4%",o.style.zIndex="20",i.style.color="limegreen",i.style.width="100%",i.style.textAlign="center",a.style.color="white",a.style.width="100%",a.style.textAlign="center",y.style.height="fit-content",y.style.width="fit-content",y.style.padding="5px",y.style.color="white",y.style.borderRadius="5px",y.style.backgroundColor="limegreen",y.style.zIndex="20",y.style.marginTop="8px",y.style.cursor="pointer",y.innerHTML="View",s.style.display="grid",s.style.backgroundColor="black",s.style.opacity="0.4",s.style.backdropFilter="blur(2px)",s.style.position="absolute",s.style.bottom="0",s.style.width="100%",s.style.height="50%",s.style.borderRadius="5px",s.style.paddingBottom="3x",t.style.background="white",console.log(e),console.log("item"),e.prof_pics&&e.username?(a.innerHTML=e.bio,i.innerHTML=e.username,o.src=e.prof_pics,t.append(o),y.onclick=function(){window.location.href=`${r}/profile/${e.username} `}):e.prof_pics&&e.owner?(i.innerHTML=e.content,y.onclick=function(){window.location.href=`${r}/comments/${e.slug} `}):(console.log(e),i.innerHTML=e.name,a.innerHTML=e.description,o.src=e.photo,t.append(o),y.onclick=function(){window.location.href=`${r}/group-view/${e.name} `}),s.append(i),s.append(a),l.append(y),l.style.position="absolute",l.style.right="4%",l.style.top="6%",l.style.zIndex="10",t.append(l),t.append(s),n.append(t)});let d=document.createElement("p");d.innerHTML="See all",d.style.width="75%",d.style.backgroundColor="white",d.style.color="#0d2438",d.style.textAlign="center",d.style.cursor="pointer",d.style.border="1px solid #00cc66",d.style.padding="0.5rem 0",d.style.borderRadius="10px",d.style.color="#0d2438",n.append(d),d.addEventListener("mouseenter",function(){d.style.backgroundColor="#16a34a",d.style.color="white"}),d.addEventListener("mouseleave",function(){d.style.backgroundColor="white",d.style.color="#0d2438"}),d.addEventListener("click",async e=>{o.toString(),window.location.href='{% url "search_view_template" %}?'+o.toString()})}else l.style.display="none",n.innerHTML="Search not found"})})});