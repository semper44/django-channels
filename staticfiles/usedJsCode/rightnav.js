document.addEventListener("DOMContentLoaded",function(){let e=document.querySelector("#rightnavsearchButton"),t=document.querySelector("#rightnavsearchicon"),l=document.querySelector("#rightnavsearch"),n=document.querySelector("#rightnavsearch2"),s=document.querySelector("#rightnavParent"),r="django-channels-byf5.onrender.com";if(null!==e&&e.addEventListener("input",()=>{document.querySelector("#allrightnavsuggestions").style.display="none",s.style.display="block",l.style.display="block",n.style.display="none"}),document.querySelector("#rightnavcancel").addEventListener("click",()=>{s.style.display="none",document.querySelector("#allrightnavsuggestions").style.display="block"}),t.onclick=async e=>{document.querySelector("#allrightnavsuggestions").style.display="none",s.style.display="block",e.preventDefault();let t=new FormData(document.querySelector("#rightnavsearchform")),r=new URLSearchParams(t),i="django-channels-byf5.onrender.com/search?"+r.toString(),o=await fetch(i,{method:"GET",headers:{"X-CSRFToken":"{{ csrf_token }}"}});if(o.ok){let a=await o.json();document.querySelector("#rightnavParent").style.display="block",n.style.display="flex",a.results.length>=1?a.results.forEach(e=>{let t=document.createElement("div"),l=document.createElement("div"),s=document.createElement("div"),r=document.createElement("img"),i=document.createElement("p"),o=document.createElement("p"),a=document.createElement("p"),y=document.createElement("p");t.style.width="80%",t.style.padding="1.5rem 0",t.style.height="fit-content",t.style.position="relative",t.style.backgroundImage="url("+e.cover+")",t.style.borderRadius="10px",t.style.minHeight="108px",r.src=e.pics,r.style.width="60px",r.style.height="60px",r.style.borderRadius="50%",r.style.position="absolute",r.style.left="4%",r.style.zIndex="20",t.append(r),i.innerHTML=e.username,i.style.color="white",i.style.width="100%",i.style.textAlign="center",o.innerHTML="item.bio",o.style.color="white",o.style.width="100%",o.style.textAlign="center",a.style.height="fit-content",a.style.width="fit-content",a.style.padding="5px",a.style.color="white",a.style.borderRadius="5px",a.style.backgroundColor="limegreen",a.style.zIndex="20",a.style.marginTop="8px",a.style.cursor="pointer",a.innerHTML="View",s.style.display="grid",s.style.backgroundColor="black",s.style.opacity="0.4",s.style.backdropFilter="blur(2px)",s.style.position="absolute",s.style.bottom="0",s.style.width="100%",s.style.height="50%",s.style.borderRadius="5px",s.style.paddingBottom="3x",s.append(i),s.append(o),l.append(y),l.append(a),l.style.position="absolute",l.style.right="4%",l.style.top="6%",l.style.zIndex="10",t.append(l),t.append(s),n.append(t)}):(document.querySelector("#rightnavcancel").style.display="block",l.style.display="none",n.innerHTML="Search not found")}},null!==e){let i;e.addEventListener("input",e=>{clearTimeout(i),i=setTimeout(async()=>{document.querySelector("#allrightnavsuggestions").style.display="none",e.preventDefault();let t=new FormData(document.querySelector("#rightnavsearchform")),i=new URLSearchParams(t),o="django-channels-byf5.onrender.com/search?"+i.toString(),a=await fetch(o,{method:"GET",headers:{"X-CSRFToken":"{{ csrf_token }}"}}),y=await a.json();if(l.style.display="none",s.style.display="block",n.innerHTML="",n.style.display="flex",y.results.length>=1){y.results.slice(0,3).forEach(e=>{let t=document.createElement("div"),l=document.createElement("div"),s=document.createElement("div");document.createElement("div");let i=document.createElement("img"),o=document.createElement("p"),a=document.createElement("p"),y=document.createElement("p");t.style.width="80%",t.style.padding="1.5rem 0",t.style.height="fit-content",t.style.position="relative",t.style.borderRadius="10px",t.style.minHeight="108px",i.style.width="60px",i.style.height="60px",i.style.borderRadius="50%",i.style.position="absolute",i.style.left="4%",i.style.zIndex="20",o.style.color="limegreen",o.style.width="100%",o.style.textAlign="center",a.style.color="white",a.style.width="100%",a.style.textAlign="center",y.style.height="fit-content",y.style.width="fit-content",y.style.padding="5px",y.style.color="white",y.style.borderRadius="5px",y.style.backgroundColor="limegreen",y.style.zIndex="20",y.style.marginTop="8px",y.style.cursor="pointer",y.innerHTML="View",s.style.display="grid",s.style.backgroundColor="black",s.style.opacity="0.4",s.style.backdropFilter="blur(2px)",s.style.position="absolute",s.style.bottom="0",s.style.width="100%",s.style.height="50%",s.style.borderRadius="5px",s.style.paddingBottom="3x",t.style.background="white",e.prof_pics&&e.username?(a.innerHTML=e.bio,o.innerHTML=e.username,i.src=e.prof_pics,t.append(i),y.onclick=function(){window.location.href=`${r}/profile/${e.username} `}):e.prof_pics&&e.owner?(o.innerHTML=e.content,y.onclick=function(){window.location.href=`${r}/comments/${e.slug} `}):(o.innerHTML=e.name,a.innerHTML=e.description,i.src=e.photo,t.append(i),y.onclick=function(){window.location.href=`${r}/group-view/${e.name} `}),s.append(o),s.append(a),l.append(y),l.style.position="absolute",l.style.right="4%",l.style.top="6%",l.style.zIndex="10",t.append(l),t.append(s),n.append(t)});let c=document.createElement("p");c.innerHTML="See all",c.style.width="75%",c.style.backgroundColor="white",c.style.color="#0d2438",c.style.textAlign="center",c.style.cursor="pointer",c.style.border="1px solid #00cc66",c.style.padding="0.5rem 0",c.style.borderRadius="10px",c.style.color="#0d2438",n.append(c),c.addEventListener("mouseenter",function(){c.style.backgroundColor="#16a34a",c.style.color="white"}),c.addEventListener("mouseleave",function(){c.style.backgroundColor="white",c.style.color="#0d2438"}),c.addEventListener("click",async e=>{i.toString(),window.location.href='{% url "search_view_template" %}?'+i.toString()})}else l.style.display="none",n.innerHTML="Search not found"})})}});