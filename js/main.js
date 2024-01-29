/// <reference types="../@types/jquery" />

 let fname =document.getElementById('fname');
 let content =document.querySelectorAll('.content')[0];
 let lname =document.getElementById('lname');
 let lists =document.querySelectorAll('.sidebar li');
 let row = document.querySelectorAll('.home')[0];

//  $('.filter').on('click',function(e){

//     // console.log(   $ (e.target.innerHTML)
//     //     );
//     // $('.filter').find('h3').html();
//     // console.log(    $('.filter').find('h3').html()
//     // );
//  });

 
//  function getCols(){
//     let id=setInterval(
//         function(){
//            let meals=document.querySelectorAll('.meals');
//             //  console.log(  document.querySelectorAll('.meals'));
          
//              if(document.querySelectorAll('.meals').length!=0){
//                  clearInterval(id);
//                  for(var i=0;i<meals.length;i++){
//                     meals[i].addEventListener('click', function(){
//                      console.log("hello");
//                     console.log(meals[i]);
//                     console.log("jqueryyyy");
//                     //  console.log(e.target);
//                     // await searchByCategoryName(e.target.innerHTML);
//                     //   await displayMeals();
//                     });
    
//                  }
             
//              //https://www.themealdb.com/api/json/v1/1/filter.php?c=beef
                 
//              }
//          },1000
         
//      );
// }


//https://www.themealdb.com/api/json/v1/1/search.php?s= 
 let data;


async function getMeals(){
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
     if(response.ok){
      data= await response.json();
      console.log(data);
       await displayMeals();
     }


}
getMeals();
 //getMeals().then(displayMeals)
async function searchByName(name){
 // https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    if(response.ok){
     data= await response.json();
     console.log(data);
     
    }
}
async function searchById(id){
  // https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772
     let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
     if(response.ok){
      data= await response.json();
      console.log(data);
      displayInstructions();
     }
}

async function searchFirstLetter(firstLetter){
    if (firstLetter==''){
        firstLetter='a';
    }
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
    if(response.ok){
     data= await response.json();
     console.log(data);
    }
}

async function searchByCategories(){
    //https://www.themealdb.com/api/json/v1/1/categories.php
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    if(response.ok){
     data= await response.json();
     console.log("search by categories");
     console.log(data);
     displayCategories();
    }
}

async function searchByIngredients(){
    // https://www.themealdb.com/api/json/v1/1/list.php?i=list
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    if(response.ok){
     data= await response.json();
     console.log("search by Ingredients");
     console.log(data);
     displayByIngredients();
    }
}



async function searchByArea(){
  //  https://www.themealdb.com/api/json/v1/1/list.php?a=list
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    if(response.ok){
     data= await response.json();
     console.log("search by Area");
     console.log(data);
     displayByArea();
    }
}
async function searchByCategoryName(category){
    //  https://www.themealdb.com/api/json/v1/1/filter.php?c=beef
      let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      if(response.ok){
       data= await response.json();
      // console.log("search by Area");
       console.log(data);
        displayMeals();
      }
  }

  function displayMeals(){
   
   var content="";
   console.log("display mealsss!");
      
     for(var i=0;i<data.meals.length;i++){
      if(i==20){
        break;
      }
         content +=` <div onclick="searchById(${data.meals[i].idMeal})" class="meals col-sm-12 col-md-3"  >
    <div class="img-container " >
        <div class="filter d-flex align-items-center ">
            <h3 class="p-2">${data.meals[i].strMeal}</h3>
        </div>
      <img src="${data.meals[i].strMealThumb}" alt="meal1" class="w-100 rounded  ">   
    </div>
    </div>`
      
     }
     document.querySelectorAll('.home')[0].innerHTML=content;

    }
    

    function displayCategories(){
   
        var content="";
        
     
          for(var i=0;i<data.categories.length;i++){
              content +=` <div  class=" meals col-sm-12 col-md-3"  onclick="searchByCategoryName('${data.categories[i].strCategory}')">
         <div class="img-container">
             <div class="filter text-center  overflow-hidden  rounded p-2   ">
                 <h3 class="p-2">${data.categories[i].strCategory}</h3>
                 <p  class="meal"> ${data.categories[i].strCategoryDescription}</p>
             </div>
           <img src="${data.categories[i].strCategoryThumb}" alt="meal1" class="w-100 rounded  ">   
         </div>
         </div>`
           
          }
          document.querySelectorAll('.home')[0].innerHTML=content;
     
    }
    async function filterByArea(area){
      //https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian
      let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
      if(response.ok){
       data= await response.json();
      // console.log("search by Area");
       console.log(data);
        displayMeals();
      
    }
  }

    function displayByArea(){
      var content="";
     // console.log("display mealsss!");
         
        for(var i=0;i<data.meals.length;i++){
          
            content +=`   
            <div  class="meals col-sm-12 col-md-3" onclick="filterByArea('${data.meals[i].strArea}')" >
                  <div class="text-white d-flex  text-center  justify-content-center align-items-center    " >
                      <div class="">
                          <i class="fa-solid fa-house-laptop  "></i>
                          <h2 class="p-2">${data.meals[i].strArea}</h2>
                      </div>
                      </div>
             
          </div>  
         
       
       `
         
        }
        document.querySelectorAll('.home')[0].innerHTML=content;
    }
 async  function filterbyIngredient(ingredient){
   //https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast
   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
   if(response.ok){
    data= await response.json();
   // console.log("search by Area");
    console.log(data);
     displayMeals();
   

    }
  }

    function displayByIngredients(){
      var content="";
     // console.log("display mealsss!");
        var pargarah="" ;
        for(var i=0;i<20;i++){
           pargarah=data.meals[i].strDescription.split(" ").slice(0,15).join(" ");
          console.log(pargarah);
       
            content +=`   
            <div  class="meals col-sm-12 col-md-3" onclick="filterbyIngredient('${data.meals[i].strIngredient}')" >
                  <div class="text-white d-flex  text-center  justify-content-center align-items-center    " >
                      <div class="">
                          <i class="fa-solid fa-drumstick-bite  "></i>
                          <h2 class="p-2">${data.meals[i].strIngredient}</h2>
                          <p>${pargarah}</p>
                      </div>
                      </div>
             
          </div>  
         
       
       `
         
        }
        document.querySelectorAll('.home')[0].innerHTML=content;
    }

    function displayInstructions(){

      let ingredients = ``

    for (let i = 1; i <= 20; i++) {
      var meal =data.meals[0];
        if (meal[`strIngredient${i}`]) {
            ingredients += `  <li class="bg-lite  rounded p-2   " >${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = data.meals[0].strTags?.split(",")
    
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <span class="bg-danger rounded p-2 m-1">${tags[i]}</span>`
    }


      var content=`   <div class="col-lg-4 ">
      <div class="img text-white ">
        <img src="${data.meals[0].strMealThumb}" class="w-100">
        <h2>${data.meals[0].strMeal}</h2>
      </div>
     </div>
     <div class="col-lg-8 ">
      <div class="description text-white ">
        <h2>Instructions</h2>
        <p>${data.meals[0].strInstructions}</p>
        <h2>Area : ${data.meals[0].strArea}</h2>
        <h2>category : ${data.meals[0].strCategory}</h2>
        <h2>Recipes :</h2>
        <ul class="list-unstyled d-flex g-3  flex-wrap   ">
         ${ingredients}
         
        </ul>

         <div class="m-3">
           <h2 class="mb-3  mt-3 ">Tags :</h2>
          ${tagsStr}
         </div>
         <div class="mt-4 mb-4 d-flex w-25 justify-content-between    ">
           <a href="${data.meals[0].strSource}" target="_blank" class=" btn btn-danger   ">source</a>
           <a href="${data.meals[0].strYoutube}" target="_blank"class=" btn btn-success ">Youtube</a>
         </div>
      </div>
     </div>`;
     
     row.innerHTML=content;

    }
  
    


  for(var i=0;i<lists.length;i++){
    lists[i].addEventListener('click',async function(e){
        console.log(e.target.innerHTML);
        if(e.target.innerHTML!="Search"){
          document.querySelectorAll('.replace')[0].classList.replace('d-block','d-none');

        }
        if(e.target.innerHTML=="Categories"){
          await searchByCategories();
          //console.log("yes equal ");
        }
        else if(e.target.innerHTML=="Search"){
          row.innerHTML="";
             // document.querySelectorAll('.content')[0].classList.replace('d-block','d-none');
             document.querySelectorAll('.replace')[0].classList.replace('d-none','d-block');
          // console.log("blah blah ");
        }
        else if(e.target.innerHTML=="Area"){
         await searchByArea();
         
        }
        else if(e.target.innerHTML=="Ingredients"){
          searchByIngredients();

        }
        else if(e.target.innerHTML=="Contact Us"){
        row.innerHTML="";
         displayContacts();
        }
        

        //console.log(lists[i]);
        // if(e.target.innerHTML!='search'){
        //     // document.querySelectorAll('.content')[0].classList.replace('d-block','d-none');
        //     // document.querySelectorAll('.replace')[0].classList.replace('d-block','d-none'); 
        //     // content.classList.replace('d-none','d-block');

        
        // }



        // if(e.target.innerHTML=='Search'){
        //     document.querySelectorAll('.content')[0].classList.replace('d-block','d-none');
        //     document.querySelectorAll('.replace')[0].classList.replace('d-none','d-block');
        
        // }
        // else if(e.target.innerHTML=='Categories'){
        //    console.log("categories!");
        //   await  searchByCategories();
        //   //  displayCategories();
       
        //     // displayCategories();
        //     // git( function (x) {
        //     //   img=x;
        //     //   console.log(img);
        //     //   for(var i=0;i<img.length;i++){
        //     //     img[i].addEventListener('click',async function(e){
        //     //       console.log("yarab ");
        //     //     // $(img[i]).next();
        //     //     //  console.log( img[i]);
        //     //    //  console.log(e.target);
        //     //      if( e.target.classList.contains("p-2")){
        //     //       var value= e.target.innerHTML
        //     //       console.log(value);
        //     //      await searchByCategoryName(value);
        //     //        displayMeals();

                 

        //     //      }
        //     //     else if(e.target.classList.contains("filter")){
        //     //       console.log("hello filter");
        //     //        console.log(this.childNodes[1].innerHTML);
        //     //        value=this.childNodes[1].innerHTML;
        //     //        await searchByCategoryName(value);
        //     //        displayMeals();
        //     //      }
        //     //      else if(e.target.classList.contains("meal")){
        //     //       console.log( this.childNodes[1].innerHTML);
        //     //        value=this.childNodes[1].innerHTML;
        //     //        await searchByCategoryName(value);
        //     //        displayMeals();
        //     //      }
                


        //     //     })
        //     //   }

        //     //   });

            
             
        //     // getCols();

        // }
        // else if(e.target.innerHTML=='Area'){
        //   console.log("Areas!");
        //      await searchByArea();
        //     //  await displayMeals();
        // }
        // else if(e.target.innerHTML=='Ingredients'){
           
        //      searchByIngredients()
        // }
        // else if( e.target.innerHTML=="Contact Us"){
          
        
        // }
       
    
    }
    );
  }

fname.addEventListener('input',
async function(){
    var name =fname.value;
    console.log(name);
  await searchByName(name);
  content.classList.replace('d-none','d-block');

   displayMeals();
}
);

lname.addEventListener('input',
async function(){
  
    var name =lname.value;
    console.log(name);
  await searchFirstLetter(name);
  content.classList.replace('d-none','d-block');

   displayMeals();
}
);


   
let  value= $('.left-part').outerWidth(true);
 console.log(value);
  if($('.sidebar').css("left")=="0px"){
     $('.sidebar').animate({left:-value},800);
     $('svg').addClass("d-none");
     $('.fa-bars').removeClass("d-none");
  }

$('svg,.fa-bars').on('click',function(){

  console.log("hello");
 let  value= $('.left-part').outerWidth(true);
 console.log(value);
  if($('.sidebar').css("left")=="0px"){
     $('.sidebar').animate({left:-value},800);
     $('svg').addClass("d-none");
     $('.fa-bars').removeClass("d-none");
    
  }
  else{
    $('.sidebar').animate({left:0},800);
    $('svg').removeClass("d-none");
    $('.fa-bars').addClass("d-none")
  }
 


});

//  async function get (){
//   let img =document. await(querySelector('.img-container img')) ;
// console.log(img);

// }


// function git( callback) {
//   var i = 0;
//   var git = setInterval(function () {
    
   
//    var img= document.querySelectorAll('.filter')
//       console.log(i);
//       if (img!=null) {
//           clearInterval(git);
//           callback(img);
//       }
//       i++;
//   }, 800);
// }



function displayContacts(){
  var content=`<div class=" contact min-vh-100 d-flex  justify-content-center align-items-center text-center ">
  <div class="container  ">
      <div class="row g-3    ">
          <div class="col-lg-6 ">
            <div>
              <div><input id="name" type="text"placeholder="Enter your name" class="form-control " oninput="checkAll();isValidName()"></div>
               <div  class="alert alert-danger mt-2 d-none in-valid">Special characters and numbers not allowed
               </div>
          </div>

          </div>
          <div class="col-lg-6 ">
              <div>
                <div><input id="email"type="email"placeholder="Enter your email" class="form-control " oninput="checkAll();isValidEmail()"></div>
                <div class="alert alert-danger mt-2 d-none in-valid ">Email not valid *exemple@yyy.zzz

                </div>
            </div>
            

            </div>

           <div class="col-lg-6 ">
            <div>
              <div>
              <input id="phone"type="phone"placeholder="Enter your phone" class="form-control " oninput="checkAll();isValidPhone()">
              </div>
              <div class="alert alert-danger mt-2 d-none in-valid">Invalid phone number
              </div>
          </div>
         

          </div>
          <div class="col-lg-6 ">
              <div>
                <div><input id="age"type="number"placeholder="Enter your Age" class="form-control " oninput="checkAll();isValidAge()"></div>
                <div class="alert alert-danger mt-2 d-none in-valid">Invalid Age
                </div>
            </div>
           

            </div>
            <div class="col-lg-6 ">
              <div>
                <div><input id="password" type="password"placeholder="Enter your pasword" class="form-control " oninput="checkAll();isValidPassword()"></div>
                <div class="alert alert-danger mt-2 d-none in-valid">Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div> 
           

            </div>
            <div class="col-lg-6 ">
              <div>
                <div><input id="re" type="password"placeholder="repassword" class="form-control " oninput="checkAll();isMatch()"></div>
                <div class="alert alert-danger mt-2 d-none in-valid">password doesnot match*
                </div>
            </div>
           

            </div>
          </div>
          <button disabled id="btn" class="btn btn-outline-danger mt-3  ">submit</button>

            </div>

      </div>`
      row.innerHTML=content;
      
       
     
}
function checkAll(){
  if(isValidEmail()&&isValidName()&&
  isValidPassword() && isValidPhone() && isValidAge()&&
  isMatch()
  ){
    console.log("yes")
   document.getElementById("btn").removeAttribute("disabled");
     document.getElementById("btn").setAttribute("enabled","");

  }else{
    console.log("no")
    document.getElementById("btn").setAttribute("disabled","");

        document.getElementById("btn").removeAttribute("enabled");


  }
}

function isValidName(){
  var inValid=document.getElementsByClassName('in-valid')[0];

  var input =document.getElementById("name").value;
  var regex=/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
  if(regex.test(input)){
    inValid.classList.replace('d-block','d-none');

    return true;
  } else if(input==""){
    return false;
  }
  else {
    inValid.classList.replace('d-none','d-block');
    return false;
  }
}
function isValidEmail(){
  var inValid=document.getElementsByClassName('in-valid')[1];

  var input =document.getElementById("email").value;
  var regex=/^\S+@\S+\.\S+$/;
  if(regex.test(input)){
    inValid.classList.replace('d-block','d-none');

    return true;
  }else if(input==""){
    return false;
  }
  else{
    inValid.classList.replace('d-none','d-block');
    return false;
  }
}
function isValidPhone(){
  var inValid=document.getElementsByClassName('in-valid')[2];

  var input =document.getElementById("phone").value;
  var regex=/^\+?[0-9]\d{1,20}$/;
  if(regex.test(input)){
    inValid.classList.replace('d-block','d-none');

    return true;
  }
  else if(input==""){
    return false;
  }
  else{
    inValid.classList.replace('d-none','d-block');
    return false;
  }
}

function isValidAge(){
  var inValid=document.getElementsByClassName('in-valid')[3];

  var input =document.getElementById("age").value;
  var regex=/^[1-9]?[0-9]{1}$|^100$/;
  if(regex.test(input)){
    inValid.classList.replace('d-block','d-none');

    return true;
  }else if(input==""){
    return false;
  }
  else{
    inValid.classList.replace('d-none','d-block');
    return false;
  }
}
function isValidPassword(){
  var inValid=document.getElementsByClassName('in-valid')[4];

  var input =document.getElementById("password").value;
  var regex=/^(?=.*\d).{8,}$/;
  if(regex.test(input)){
    inValid.classList.replace('d-block','d-none');

    return true;
  }
  else if(input==""){
    return false;
  }
  else{
    inValid.classList.replace('d-none','d-block');
    return false;
  }
}
function isMatch(){
  var inValid=document.getElementsByClassName('in-valid')[5];

  var input =document.getElementById("password").value;
  var input2=document.getElementById("re").value;
  if(input==input2) {
    inValid.classList.replace('d-block','d-none');

    return true;
  }
  else{
    inValid.classList.replace('d-none','d-block');
    return false;
  }

}




