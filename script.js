
// qThemeJson has Theme as Key and  choices as values. Object properties are in JSON format.

var qListJsonArray ='';
var dynamicEle_ul = '';
var dynamicEle_li='';
var counter = 0;
var counter_button = 0;
var link ='';
localStorage.setItem("headerPoints",0);
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

    btnClickCounter : localStorage.getItem("btnCounter"),

   headerH1           :document.querySelector("h1"),
   


}




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
setInterval(setCounter,2500);
function setCounter(){
localStorage.setItem("headerTimer",localStorage.getItem("headerTimer")-1);
counterTime = localStorage.getItem("headerTimer");

  document.querySelector("h1").textContent = "Points Earned:  "+localStorage.getItem("headerPoints")+"   Time remaining:  "+counterTime;


if(counterTime == 0){
  alert("Time's up!");
location.reload();
}
}

btnArray[btnClickCounter].forEach((element,index) =>{
    //alert(index);
    localStorage.setItem("btnCounter",parseInt(btnClickCounter)+1);
    
   // alert( localStorage.getItem("btnCounter"));
    if(index == 0){
        //Question
        dynamicEle_ul = document.createElement("ul");
        dynamicEle_ul.setAttribute("id","ul"+ qThemeJson.btnClickCounter);
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
        dynamicEle_button.setAttribute("id","button"+counter_button);

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

document.addEventListener("click",(e) => {
 // alert(e.target.id);
  //e.stopPropagation();
  var answerSelected = e.target.textContent;


  if (answerSelected === answer){
    // alert("You got it!");
      //e.target.textContent = answer+"  "+String.fromCodePoint(0x1F44D);
  
     //add code here to increment points
  
     //alert(answerSelected+localStorage.getItem("headerPoints"));
  
   points = pointCounter("correct",Number(localStorage.getItem("headerPoints")));
   document.querySelector("h1").textContent = "Points Earned:  "+localStorage.getItem("headerPoints")+"   Time remaining:  "+counterTime;
  
     //remove the current element and call function for next question
     
     dynamicEle_li.remove();
    dynamicEle_ul.remove();
    
    setTimeout(() => nextQuestion(btnArray), 1000);
  
      }else{
  
        //add code here to decrement points
  
        //highligth incorrect answer in red
       // alert(answerSelected+localStorage.getItem("headerPoints"));
        e.target.setAttribute("style","background-color:red");
       // points = pointCounter("",Number(localStorage.getItem("headerPoints")));
       // qThemeJson.headerH1.textContent = "Points Earned:  "+points;
        // loop through li tags and find and higlight correct answer in green
        
  /*
        for (var i = 0; i < liTags.length; i++) {
          if (liTags[i].textContent == answer) {
           // alert(liTags[i].textContent);
            liTags[i].setAttribute("style","background-color:green");         
            break;
          }
        }/// end of for loop to search for li tags*/
        dynamicEle_li.remove();
        dynamicEle_ul.remove();
        setTimeout(() => nextQuestion(btnArray), 1000);
      } /// end of if -else answer answerSelected
    
    //setTimeout(() => nextQuestion(btnArray), 1000);
    //alert("question end before timeout");
});

// clear the page after the correct answer is shown
//setTimeout(() => nextQuestion(btnArray), 5000);


}//questions end here
// clear the question once it is answered


function nextQuestion(btnArray){
  //alert("Here is the next question" + btnArray.length);
if(btnArray.length >=1){
//alert("nextQuestion"+btnArray);

btnArray.shift();

  qList(btnArray);
}else{
  setTimeout(() =>  pageReload(), 1000);
 // location.reload();
}
 // dynamicEle_ul.remove();
  
//alert("nextQuestion"+btnArray.length);
//alert(btnArray);
//if(btnArray.length < 0){

  //location.reload();
  //alert("Here is the Last question" + btnArray.length);
  //document.getElementsByTagName("button").remove();
  //var dynamicBtn = document.createElement("button");
 
  //document.body.appendChild(dynamicBtn);
  //dynamicBtn.textContent = "Home Page";
//}else{
  //btnArray.shift();
  //qList(btnArray);
//}

}



//after we loop through all the questions, prompt final score, ask user to enter initials and then refresh page to go to the main page

function pageReload(){

  location.reload();
}


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




/*

var qListJson = '[ ["Which space shuttle was the first to be launched into space?","Discovery","Atlantis","Columbia","Endeavour","Columbia"] ,["what was Nasa\'s first human space program?","Apollo","Gemini","Skylab","Mercury","Mercury"] ,["What species was the first living being launched into space by the U.S.?","Dog","Guinea Pig","Monkey","Fruit flies","Fruit flies"]     ]';

var qListJsonArray = JSON.parse(qListJson);
//alert(qListJsonArray);
                           
                           //document.querySelector("#jsonText").textContent = qListJsonArray[0][0];
                           
                           var dynamicEle_ul = '';
                           var dynamicEle_li='';
                           var counter = 0;
                           var counter_button = 0;
                           var link ='';
                           
                           //document.body.appendChild(dynamicEle_ul);

                          // qListJsonArray.forEach((element,index) => {
                            var eleVal =   qListJsonArray[0];//element;
                            //alert(index);
                            counter++;
                            counter_button = 0;
                            eleVal.forEach((element,index) =>{
                                //alert(index);
                               
                                if(index == 0){
                                    //Question
                                    dynamicEle_ul = document.createElement("ul");
                                    dynamicEle_ul.setAttribute("id","ul"+counter);
                                    //append the ul to the document body
                                    document.body.appendChild(dynamicEle_ul);
                                    //set id of the ul created
                                    dynamicEle_ul.textContent = counter+"."+element;

                                }else if (index < 5){
                                //Choices
                               counter_button++;
                               //create list item
                                dynamicEle_li = document.createElement("li");
                                dynamicEle_li.href = element;

                                //append to parent ul
                                dynamicEle_ul.appendChild(dynamicEle_li);

                                //create a button
                                dynamicEle_button = document.createElement("button");
                                dynamicEle_button.setAttribute("id","button"+counter_button);

                                //append  the button to the parent li
                                dynamicEle_li.appendChild(dynamicEle_button);
                                dynamicEle_button.textContent=element;
                            }
                            
                               // alert(element);
                            })
                           
                          // });
                           

 
 
 /*class qList {
   constructor()

 }*/


