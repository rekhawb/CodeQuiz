
// qThemeJson has Theme as Key and  choices as values. Object properties are in JSON format.

var qListJsonArray ='';
var dynamicEle_ul = '';
var dynamicEle_li='';
var counter = 0;
var counter_button = 0;
var link ='';
localStorage.setItem("headerPoints",0);
localStorage.setItem("headerTimer",30);
var points ='';

var qThemeJson = {

    qListTheme1 : '[ ["Which space shuttle was the first to be launched into space?","Discovery","Atlantis","Columbia","Endeavour","Columbia"] ,["what was Nasa\'s first human space program?","Apollo","Gemini","Skylab","Mercury","Mercury"] ,["What species was the first living being launched into space by the U.S.?","Dog","Guinea pig","Monkey","Fruit flies","Fruit flies"] ]',

    qListTheme2 : '[ ["What is the most common hobby during recent pandemic?","Reading","Working Out","DIY","Watching TV shows and movies","Watching TV shows and movies"] ,["What is the most popular flower in the world?","Tulip","Orchid","Rose","Daisy","Rose"],["What is the most common excuse at work in the world?","To be unwell","Family member ill","Avoiding bad weather","Collecting kids from school","To be unwell"]      ]',

    qListTheme3 : '[ ["The code in The Matrix comes from what food recipes?","Sushi recipes","Dumpling recipes","Stir-fry recipes","Pad thai recipes","Sushi recipes"] ,["Where were The Lord of the Rings movies filmed?","Ireland","Iceland","New Zealand","Australia","New Zealand"],["What is the name of the fictional land where Frozen takes place?","Arendelle","Naples","Florin","Grimm","Arendelle"]      ]',

    qListTheme4 : '[ ["What is soccer field called?","Box","Pitch","Court","Paddock","Pitch"] ,["Sailing is an Olympic sport. When was the first time it was included on the Olympic program??","1981","1891","1996","1896","1896"],["What is the biggest game of all time?","Minecraft","Pac Man","PUB G","Tetris","Minecraft"]      ]',

    qListTheme5 : '[ ["What was Twitter’s original name?","Twitter","twiter","Twwiter","twttr","twttr"] ,["Which bone are babies born without?","Lacrimal bone","Temporal bones","Fibula","Kneecap","Kneecap"],["Which animal symbolizes good luck in Europe?","Cheetah","Beetles","Horse","Elephant","Beetles"]      ]',
   
    clearHtmlBody   :function(){
      document.querySelector(".theme").setAttribute("style","display:none");
        document.querySelector("h2").setAttribute("style","display:none");
        document.querySelector("nav").setAttribute("style","display:none");
        document.querySelector("section").setAttribute("style","display:none");
        document.querySelector("footer").setAttribute("style","display:none");
                        
    },

    scoreAndInitials        :'',

    latestScore       :function(){
      scoreAndInitials = prompt("Time's up! Enter your Initials: ","Name") +" : " + localStorage.getItem("headerPoints");
      localStorage.setItem("Latest Highest Score: ",scoreAndInitials);

    },


    btnClickCounter : localStorage.getItem("btnCounter"),

   headerH1           :document.querySelector("h1"),
   headerHighScore    : document.querySelector("#hdrBtn"),
   


}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

/*

btnArray is the question list passed to the qList() when Theme is selected on the mainpage.
it is passed to the below qList function to loop through questions.
first the HTML body is cleared to load the question as ul element and the options as li items
setInterval  is used to capture the time limit (headerTimer) and decrement. 
header H1 is updated to reflect points earned and time remaining.

button click events are captured. user's answer selection and correct answer are stored as local storage items
after button click event, the array, answer selected and correct answer are passed to the checkAnswer()
checkAnwer() sets local storage Items answerSelected and answer and then calls answerSelected()
answerSelected() checks if the selection is correct or not and then calls pointCounter() to increment or decrement points based on selection
then the timer is incremented or decremented based on answer selection
the game ends if all the questions are answered or the timer is 0s

There are two places in the code that checks if the game ended or not
first in the nextQuestion() function. if the question array list length is not greater than 1 , it means that for the next iteration there are no more questions and page reload is called after prompting the user for intials and storing the latest highest score as local storage item
second in the setInterval section, if the timer value is equal to zero, page reload is called after prompting the user for intials and storing the latest highest score as local storage item

The code uses stop event propagation when any of the buttons in dynamic li items is clicked. This is to avoid propagating the click event when an answer is selected. if e.stopPropagation() is not used, then for second question,  answer selection click, two button events (answer for the first question as blank, and answer for second question as answerSelected) would be generated and for the third question,  answer click 3 button events (answer for first and second questions as blank and third question as answer selected) would be generated. 

And also the code uses click event only on the buttons in the li tag, to make sure click event generated on any other element such as ul, li, header, html, document are not responsive

so here is the summary of functions and the flow

Home page theme click
qLIst()
checkAnswer()
answerSelected()
pointCounter()
nextQuestion()

*/

function qList(btnArray){  //questions start here

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
        dynamicEle_ul.setAttribute("class","qList");
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
   localStorage.setItem("headerTimer",Number(localStorage.getItem("headerTimer"))+2);
   document.querySelector("h1").textContent = "Points Earned:  "+localStorage.getItem("headerPoints")+"   Time remaining:  "+localStorage.getItem("headerTimer");
  
     //remove the current element and call function for next question
     
     document.querySelector("li").remove();
    document.querySelector("#ul0").remove();
    
    setTimeout(() => nextQuestion(btnArray), 1000);
  
      }else{
        points = pointCounter("incorrect",Number(localStorage.getItem("headerPoints")));
        localStorage.setItem("headerTimer",Number(localStorage.getItem("headerTimer"))-3);
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
Code Starts here, Select the theme
Based on the theme, question list from the Object qThemeJson is picked and passed to the loop
*/

document.addEventListener("click",(e) => {
  var btnID = e.target.id;
// alert(btnID);
  localStorage.setItem("btnCounter", counter);
  if(btnID == 'nav_btnSpace'  || btnID == 'img_btnSpace'){
     qListJsonArray  = JSON.parse(qThemeJson.qListTheme1);
     qList(qListJsonArray ); 
 } else if(btnID == 'nav_btnEntr'  || btnID == 'img_btnEntr'){
    qListJsonArray  = JSON.parse(qThemeJson.qListTheme2);
   // alert(qListJsonArray);
     qList(qListJsonArray );
  }else if(btnID == 'nav_btnMov'  || btnID == 'img_btnMov'){
    qListJsonArray  = JSON.parse(qThemeJson.qListTheme3);
    qList(qListJsonArray );
  }else if(btnID == 'nav_btnSpt'  || btnID == 'img_btnSpt'){
    qListJsonArray  = JSON.parse(qThemeJson.qListTheme4);
    qList(qListJsonArray );
  }else if(btnID == 'nav_btnTrv'  || btnID == 'img_btnTrv'){
    qListJsonArray  = JSON.parse(qThemeJson.qListTheme5);
    qList(qListJsonArray );
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
qThemeJson.headerHighScore.addEventListener("mouseover",highScore);

function highScore(){
  var lastHighScore = localStorage.getItem("Latest Highest Score: ");
  alert( lastHighScore);
  }
