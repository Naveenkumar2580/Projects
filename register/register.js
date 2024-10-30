const form=document.querySelector('#form');
const username=document.querySelector('#username');
const email=document.querySelector('#email');
const password=document.querySelector('#password');
const cpassword=document.querySelector('#cpassword');

form.addEventListener('submit',(e)=>{
      if(!ValidInput()){
        e.preventDefault();
      }
});
function ValidInput(){
        const usernameval=username.value.trim();
        const emailval=email.value.trim();
        const passwordval=password.value.trim();
        const cpasswordval=cpassword.value.trim();
        let success=true;

        if(usernameval===''){
            success=false;
            setError(username,"username is required");
        }
        else{
            setSuccess(username);
        }
        
        if(emailval===''){
            success=false;
            setError(email,"email is required");
        }
        else if(!validateEmail(emailval)){
            success=false;
            setError(email,"please enter valid email");
        }
        else{
            setSuccess(email);
        }

        if(passwordval===''){
            success=false;
            setError(password,"password is required");
        }
        else if(passwordval.length<8){
            success=false;
            setError(password,"password must be 8 character")
        }
        else{
            setSuccess(password);
        }

        if(cpasswordval===''){
            success=false;
            setError(cpassword,"confirm password is required");
        }
        else if (cpasswordval !== passwordval){
            success=false;
            setError(cpassword,"passward do not match");
        }
        else{
            setSuccess(cpassword);
        }
        return success;
};        
        
const setError=(element,message)=>{
        const InputGroup=element.parentElement;
        const errorElement=InputGroup.querySelector('.error');

        errorElement.innerText=message;
        InputGroup.classList.add('error');
        InputGroup.classList.remove('success');
};
const setSuccess=(element)=>{
        const InputGroup=element.parentElement;
        const errorElement=InputGroup.querySelector('.error');

        errorElement.innerText='';
        InputGroup.classList.add('success');
        InputGroup.classList.remove('error');
};
const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
};