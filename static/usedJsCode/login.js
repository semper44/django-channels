<<<<<<< Updated upstream
const e=document.querySelector("#passwordshow"),s=document.querySelector("input[name='password']");e.onclick=function(){"password"===s.type?(e.children[0].classList.remove="fa fa-eye",e.children[0].classList="svg-inline--fa fa-eye-slash",s.type="text"):(e.children[0].classList="",e.children[0].classList="svg-inline--fa fa-eye",s.type="password")};
=======
const passwordshow=document.querySelector("#passwordshow"),password=document.querySelector("input[name='password1']");passwordshow.onclick=function(){"password"===password.type?(passwordshow.children[0].classList.remove="fa fa-eye",passwordshow.children[0].classList="svg-inline--fa fa-eye-slash",password.type="text"):(passwordshow.children[0].classList="",passwordshow.children[0].classList="svg-inline--fa fa-eye",password.type="password")};
>>>>>>> Stashed changes
