const passwordshow=document.querySelector("#passwordshow"),password=document.querySelector("input[name='password']");
console.log(password)
passwordshow.onclick=function(){console.log(password)
;"password"===password.type?(passwordshow.children[0].classList.remove="fa fa-eye",passwordshow.children[0].classList="svg-inline--fa fa-eye-slash",password.type="text"):(passwordshow.children[0].classList="",passwordshow.children[0].classList="svg-inline--fa fa-eye",password.type="password")};
