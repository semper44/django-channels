        setTimeout(function () {
            document.getElementById('flash-messages').style.display = 'none';
        }, 3000);
        const passwordshow =document.querySelector("#passwordshow")
        const password =document.querySelector("input[name='password1']")
        const passwordshow2 =document.querySelector("#passwordshow2")
        const password2 =document.querySelector("input[name='password2']")
        const username =document.querySelector("#username")

        username.oninput = function(){
            if(username !== ""){
                let result= username.value.charAt(0).toLowerCase() + username.value.slice(1)
                username.value = result
            }
        }



        passwordshow.onclick = function(){
            if (password.type === 'password') {
                passwordshow.children[0].classList.remove= "fa fa-eye"
                passwordshow.children[0].classList = "svg-inline--fa fa-eye-slash"
                password.type = 'text';
            } else {
                passwordshow.children[0].classList= ""
                passwordshow.children[0].classList = "svg-inline--fa fa-eye"
                password.type = 'password';
            }

        }
        
        passwordshow2.onclick = function(){
            if (password2.type === 'password') {
                passwordshow2.children[0].classList.remove= "fa fa-eye"
                passwordshow2.children[0].classList = "svg-inline--fa fa-eye-slash"
                password2.type = 'text';
            } else {
                passwordshow2.children[0].classList= ""
                passwordshow2.children[0].classList = "svg-inline--fa fa-eye"
                password2.type = 'password';
            }

        }