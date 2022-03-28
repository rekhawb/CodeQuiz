
// qThemeJson has Theme as Key and  choices as values. Object properties are in JSON format.

var qListJsonArray ='';
var dynamicEle_ul = '';
var dynamicEle_li='';
var counter = 0;
var counter_button = 0;
var link ='';
//localStorage.setItem("headerPoints",0);
localStorage.setItem("headerTimer",60);
var points ='';

var qThemeJson = {

    qListTheme1 : '[ ["Which space shuttle was the first to be launched into space?","Discovery","Atlantis","Columbia","Endeavour","Columbia"] ,["what was Nasa\'s first human space program?","Apollo","Gemini","Skylab","Mercury","Mercury"] ,["What species was the first living being launched into space by the U.S.?","Dog","Guinea pig","Monkey","Fruit flies","Fruit flies"] ]',

    qListTheme2 : '[ ["In Harry Potter, what does the wizard/witch need to say to open the Marauder’s Map?","I solemnly swear that I’m up to something good","I soberly swear that I’m up to something good","I solemnly swear that I’m up to no good","I soberly swear that I’m up to no good","I solemnly swear that I’m up to no good"] ,["Who was the fictional character Shrek marries in his film series??","Princess Simona","Princess Fiona","Princess Cora","Princess Nora","Princess Fiona"]      ]',
   
    clearHtmlBody   :function(){

        document.querySelector("h2").setAttribute("style","display:none");
        document.querySelector("nav").setAttribute("style","display:none");
        document.querySelector("section").setAttribute("style","display:none");
        document.querySelector("footer").setAttribute("style","display:none");
                        
    },

    scoreAndInitials        :'',

    latestScore       :function(){
      scoreAndInitials = prompt("Time's up! Enter your Initials: ") +" : " + localStorage.getItem("headerPoints");
      localStorage.setItem("Latest Highest Score: ",scoreAndInitials);

    },

    btnClickCounter : localStorage.getItem("btnCounter"),

   headerH1           :document.querySelector("h1"),
   


}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 


function qList(btnArray){  //questions start here
//check the local storage counter. if it is 0, then display first question. else display question at index local storage counter
var btnClickCounter = 0;//localStorage.getItem("btnCounter");
//alert(btnClickCounter);
var themeArrayLen = btnArray.length;
//alert(themeArrayLen);
//alert("question start");
qThemeJson.clearHtmlBody();

var answer = '';
var counterTime='';
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
setInterval(setCounter,2500);
function setCounter(){
localStorage.setItem("headerTimer",localStorage.getItem("headerTimer")-1);
counterTime = localStorage.getItem("headerTimer");

  document.querySelector("h1").textContent = "Points Earned:  "+localStorage.getItem("headerPoints")+"   Time remaining:  "+counterTime;


if(counterTime == 0){
qThemeJson.latestScore();
location.reload();
}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

btnArray[btnClickCounter].forEach((element,index) =>{
    //alert(index);
    localStorage.setItem("btnCounter",parseInt(btnClickCounter)+1);
    
   // alert( localStorage.getItem("btnCounter"));
    if(index == 0){
        //Question
        dynamicEle_ul = document.createElement("ul");
        dynamicEle_ul.setAttribute("id","ul"+ index);
        //append the ul to the document body
        document.body.appendChild(dynamicEle_ul);
        //set id of the ul created
        //dynamicEle_ul.textContent =qThemeJson.btnClickCounter+"."+element;
        dynamicEle_ul.textContent = element;
        counter_button = 0;

    }else if (index < 5){
        //Choices
       counter_button++;
       //create list item
        dynamicEle_li = document.createElement("li");
      //  dynamicEle_li.href = element;

        //append to parent ul
        dynamicEle_ul.appendChild(dynamicEle_li);

        //create a button
        dynamicEle_button = document.createElement("button");
        dynamicEle_button.setAttribute("id","button"+index);

        //append  the button to the parent li
        dynamicEle_li.appendChild(dynamicEle_button);
        dynamicEle_button.textContent=element;
    }
    else if(index == 5){
      answer = element;
      //alert(answer);      
      
      //localStorage.setItem("headerPoints",0);
      document.querySelector("h1").textContent = "Points Earned:  "+localStorage.getItem("headerPoints")+"   Time remaining:  "+counterTime;
    }
    
    else{
    }


    
});

// loop through li and get text content to enable click only when answer choice buttons are clicked
//var liTags = document.getElementsByTagName("li");
var btn1 = document.querySelector("#button1");
var btn2 = document.querySelector("#button2");
var btn3 = document.querySelector("#button3");
var btn4 = document.querySelector("#button4");
var answerSelected = '';


btn1.addEventListener("click",(e) => {

e.stopPropagation();
answerSelected = e.target.textContent;
checkAnswer(answerSelected,answer,btnArray);

});

btn2.addEventListener("click",(e) => {
  e.stopPropagation();
 answerSelected = e.target.textContent;
 checkAnswer(answerSelected,answer,btnArray);
 });

 btn3.addEventListener("click",(e) => {
 e.stopPropagation();
answerSelected = e.target.textContent;
checkAnswer(answerSelected,answer,btnArray);
 });

 btn4.addEventListener("click",(e) => {
 e.stopPropagation();
 answerSelected = e.target.textContent;
 checkAnswer(answerSelected,answer,btnArray);
 });

}

function checkAnswer(answerSelected,answer,btnArray){
  localStorage.setItem("answerSelected",answerSelected);
  localStorage.setItem("answer",answer);
  answerSelect(answerSelected,answer,btnArray);

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function answerSelect(answerSelected,answer,btnArray){
  if (answerSelected === answer){
    
  
   points = pointCounter("correct",Number(localStorage.getItem("headerPoints")));
   localStorage.setItem("headerTimer",parseInt(localStorage.getItem("headerTimer"))+2);
   document.querySelector("h1").textContent = "Points Earned:  "+localStorage.getItem("headerPoints")+"   Time remaining:  "+localStorage.getItem("headerTimer");
  
     //remove the current element and call function for next question
     
     document.querySelector("li").remove();
    document.querySelector("#ul0").remove();
    
    setTimeout(() => nextQuestion(btnArray), 1000);
  
      }else{
        points = pointCounter("incorrect",Number(localStorage.getItem("headerPoints")));
        localStorage.setItem("headerTimer",parseInt(localStorage.getItem("headerTimer"))-3);
        document.querySelector("h1").textContent = "Points Earned:  "+localStorage.getItem("headerPoints")+"   Time remaining:  "+localStorage.getItem("headerTimer");

   document.querySelector("li").remove();
   document.querySelector("#ul0").remove();
        setTimeout(() => nextQuestion(btnArray), 1000);
      } 
    }
 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
    


function nextQuestion(btnArray){
  //alert("Here is the next question" + btnArray.length);



if(btnArray.length >1){
//alert("nextQuestion"+btnArray);

btnArray.shift();

  qList(btnArray);
}else{
 /* var scoreAndInitials = prompt("Time's up! Enter your Initials: ") +" : " + localStorage.getItem("headerPoints");
  localStorage.setItem("Latest Highest Score: ",scoreAndInitials);*/
  qThemeJson.latestScore();
  setTimeout(() =>  pageReload(), 1000);
 // location.reload();
}

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

//after we loop through all the questions, prompt final score, ask user to enter initials and then refresh page to go to the main page

function pageReload(){

  location.reload();
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

function pointCounter(answer,curPoints){

  if(answer === "correct"){
   // alert(curPoints);
    localStorage.setItem("headerPoints",curPoints+20);
    return localStorage.getItem("headerPoints");
  }else{

    localStorage.setItem("headerPoints",curPoints-5);
    return localStorage.getItem("headerPoints");
  }

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
document.addEventListener("click",(e) => {
  var btnID = e.target.id;
  //alert(btnID);
  localStorage.setItem("btnCounter", counter);
  

  if(btnID == 'nav_btnSpace'  || btnID == 'img_btnSpace'){
    //qThemeJson.clearHtmlBody();
    qListJsonArray  = JSON.parse(qThemeJson.qListTheme1);
    
   // alert(qListJsonArray);
  qList(qListJsonArray );
  

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



  } else if(btnID == 'nav_btnEntr'  || btnID == 'img_btnEntr'){
    qListJsonArray  = JSON.parse(qThemeJson.qListTheme2);
    //alert(qListJsonArray);
  //  qListJsonArray  = JSON.parse(qThemeJson.qListTheme2);
    qList(qListJsonArray );
  }else if (btnID.textContent == "SUBMIT"){
alert("submit");
  }
});


