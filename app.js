const lengthDisplay=document.querySelector(".length-numeric");
const slider=document.querySelector(".slider");
const indicator=document.querySelector(".indicator");
const generateBtn=document.querySelector(".generate-btn");
const displayPwd=document.querySelector(".display-pwd");
const copyBtn=document.querySelector(".copy-btn");
const copyMsg=document.querySelector(".copy-msg");

const numberCheck=document.querySelector("#number");
const uppercaseCheck=document.querySelector("#uppercase");
const lowercaseCheck=document.querySelector("#lowercase");
const splcharCheck=document.querySelector("#spl-char");

const allCheckBox=document.querySelectorAll("input[type=checkbox]");

const displayAlert=document.querySelector(".display-alert");


let passwordLength=8;
let checkBoxCount=2;

function getCheckBoxCount(){
    let temp=0;
    allCheckBox.forEach(function(checkbox){
        if(checkbox.checked) temp++;
    })
    return temp;
}

function setStrengthIndicator(){
    let strength=calcStrength();
    if(strength==1){
        indicator.classList="indicator bg-red-500 w-4 h-4 rounded-full drop-shadow-[0_0_5px_rgba(239,68,68,1)]"
    }
    else if(strength==2){
        indicator.classList="indicator bg-yellow-500 w-4 h-4 rounded-full drop-shadow-[0_0_5px_rgba(239,179,8,1)]"
    }
    else{
        indicator.classList="indicator bg-green-500 w-4 h-4 rounded-full drop-shadow-[0_0_5px_rgba(34,197,94,1)]"
    }
}

function calcStrength(){
    checkBoxCount=getCheckBoxCount();
    if(passwordLength<=6) return 1;
    else if(passwordLength>=7 && passwordLength<=12){
        if(checkBoxCount==1) return 1;
        else if(checkBoxCount==2||checkBoxCount==3) return 2;
        return 3;
    }
    else{
        if(checkBoxCount==1) return 1;
        else if(checkBoxCount==2) return 2;
        else return 3;
    }
}  


function generatePassword(){
    let password="";
    let selections=[];
    let i=0;
    allCheckBox.forEach(function(checkbox){
        if(checkbox.checked){
            selections[i]=checkbox;
            i++;
        }
    });
    for(let j=0;j<passwordLength;j++)
    {
        let selected=selections[(Math.floor(Math.random()*selections.length))];
        if(selected==numberCheck) password+=Math.floor(Math.random()*10);
        else if(selected==uppercaseCheck) password=password+(getRandomLetter().toUpperCase());
        else if(selected==lowercaseCheck) password+=getRandomLetter();
        else password+=getRandomCharacter();
    }
    displayPwd.value=password;
}

function getRandomLetter(){
    let alpha="abcdefghijklmnopqrstuvwxyz";
    return alpha[(Math.floor(Math.random()*26))];
}

function getRandomCharacter(){
    let charstr="!#$%&@()*^";
    return charstr[(Math.floor(Math.random()*charstr.length))];
}

function disableCheck(){
    if(checkBoxCount==1){
        allCheckBox.forEach(function(checkbox){
            if(checkbox.checked){
                checkbox.disabled=true;
            }
        });
        disableAlert();
    }
    else{
        allCheckBox.forEach(function(checkbox){
            if(checkbox.checked && checkbox.disabled) checkbox.disabled=false;
        })
    }
}

function disableAlert(){
    displayAlert.classList="display-alert bg-purple-600 rounded-md text-sm text-center p-2 scale-1 transition-all duration-200";
    setTimeout(function(){
        displayAlert.classList="display-alert bg-purple-600 rounded-md text-sm text-center p-2 scale-0 transition-all duration-200";
    },3000)
}

slider.addEventListener("input",function(){
    passwordLength=this.value;
    lengthDisplay.innerHTML=passwordLength;
    setStrengthIndicator();
});

numberCheck.addEventListener("click",function(){
    setStrengthIndicator();
    disableCheck();
});
uppercaseCheck.addEventListener("click",function(){
    setStrengthIndicator();
    disableCheck();
});
lowercaseCheck.addEventListener("click",function(){
    setStrengthIndicator();
    disableCheck();
});
splcharCheck.addEventListener("click",function(){
    setStrengthIndicator();
    disableCheck();
});

generateBtn.addEventListener("click",generatePassword);

copyBtn.addEventListener("click",copyPassword);
async function copyPassword(){
    try{
        await navigator.clipboard.writeText(displayPwd.value);
        copyMsg.classList="copy-msg bg-white/10 rounded-xl text-xs absolute p-1 bottom-6 right-[-1rem] scale-1 transition-all duration-200";
        setTimeout(function(){
            copyMsg.classList="copy-msg bg-white/10 rounded-xl text-xs absolute p-1 bottom-6 right-[-1rem] scale-0 transition-all duration-200";
        },3000);
    }
    catch(err){
        copyMsg.innerHTML="Failed to Copy!";
        copyMsg.classList="copy-msg bg-white/10 w-[100px] rounded-xl text-xs absolute p-1 bottom-7 right-[-3rem] scale-1 transition-all duration-200";
        setTimeout(function(){
            copyMsg.classList="copy-msg bg-white/10 w-[100px] rounded-xl text-xs absolute p-1 bottom-7 right-[-3rem] scale-0 transition-all duration-200";
        },3000);
    }
}