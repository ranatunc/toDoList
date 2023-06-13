
const form=document.querySelector("#todoAddForm")
const addInput=document.querySelector("#todoName")
const todoList=document.querySelector(".list-group")
const firstCardBody=document.querySelectorAll(".card-body")[0]
const secondCardBody=document.querySelectorAll(".card-body")[1]
const clearButton=document.querySelector("#clearButton")
const filterInput=document.querySelector("#todoSearch")

let todos=[]

runEvents()

function runEvents(){
    form.addEventListener("submit",addTodo)
    document.addEventListener("DOMContentLoaded", pageLoaded) 
    secondCardBody.addEventListener("click", removeTodoUI)
    clearButton.addEventListener("click", allTodosEveryWhere)
    filterInput.addEventListener("keyup", filter)
    secondCardBody.addEventListener("click", colorTodos)
}

//! ***************** Todolar Üzerinde Filtreleme Yapma  *******************************

function filter(e){
    const filterValue=e.target.value.toLowerCase().trim()
    const todoListesi=document.querySelectorAll(".list-group-item")

    if(todoListesi.length>0){

        todoListesi.forEach(function(todo){
            if(todo.textContent.toLowerCase().trim().includes(filterValue)){


                todo.setAttribute("style","display : block");
            }
            else{
                todo.setAttribute("style","display : none !important");

            }
        })
    }
    else{
        showAlert("warning","Filtre yapabilmek için en az 1 tood'nuz olmalı!!!")
    }

}

//! ******************************** Renklendirme ********************************
function colorTodos(e){
 
        if(e.target.className === "fa-sharp fa-solid fa-circle icon1"){

            const todo=e.target.parentElement.parentElement.parentElement
            todo.style.backgroundColor ="#91b3ee "
        }
        else if(e.target.className === "fa-sharp fa-solid fa-circle icon2"){
            const todo=e.target.parentElement.parentElement.parentElement
            todo.style.backgroundColor ="#f79ceb "
        }
        else if(e.target.className === "fa-sharp fa-solid fa-circle icon3"){
            const todo=e.target.parentElement.parentElement.parentElement
            todo.style.backgroundColor ="#a8f5d4 "
        }

        else if(e.target.className === "fa-sharp fa-solid fa-circle icon4"){
            const todo=e.target.parentElement.parentElement.parentElement
            todo.style.backgroundColor ="#f5b975 "
            console.log("sarı")
        }
        else{
            const todo=e.target.parentElement.parentElement.parentElement
            todo.style.backgroundColor ="white "
        }


}

//! *****************  Storage'dan Alınan Değerleri Ekrana Yazdırmak *******************************

function pageLoaded(){
    checkTodosFromStorage()
    todos.forEach(function(todo){
        addTodoUI(todo)
    })

}
//! ***************** Ekrandan Todo Silme *******************************

function removeTodoUI(e){
  if(e.target.className === "fa fa-remove ml-3"){

    //Ekrandan silme---------
    const todo=e.target.parentElement.parentElement
    todo.remove()

    // storageden silme----------
    removeTodoToStorage(todo.textContent)

    showAlert("success","Başarıyla silindi")
  }
}
//! ***************** Storage Todo Silme *******************************

function removeTodoToStorage(removeTodo){
    checkTodosFromStorage()
    todos.forEach(function(todo,index){ 
        if( removeTodo === todo){
            todos.splice(index,1) 
        }
        localStorage.setItem("todos",JSON.stringify(todos)) 
    })

}

//! ******************************** Tüm to do silme ********************************

function allTodosEveryWhere(){
    const todoListesi=document.querySelectorAll(".list-group-item") 
    
    if(todoListesi.length>0){

        //ekrandan silme--------
        todoListesi.forEach(function(todo){
            todo.remove()

        })

        //storageden silme--------
        todos=[]
        localStorage.setItem("todos",JSON.stringify(todos))
    }
    else{
        showAlert("warning", "Listeyi temizlemek için en az 1 toodo'nuz olmalı!!!")
    }

}


function addTodo(e){
    const inputText=addInput.value.trim()

    if(inputText==null || inputText==""){
        showAlert("warning","Lütfen Boş Bırakmayınız!!")
    }
    else{
     //Arayüze Ekleme--------
     addTodoUI(inputText)   
     showAlert("success","Todo Eklendi!")  
     //Storage Ekleme-----------
     addTodoToStorage(inputText)
  
    }

    e.preventDefault() 
}



//! *****************  İnputa yazdırma ve list ekleme *******************************
function addTodoUI(newTodo){

 const li=document.createElement("li")
 li.className="list-group-item d-flex justify-content-between"
 li.textContent = newTodo

 const a=document.createElement("a")
 a.href="#"
 a.className="delete-item d-flex justify-content-between"

 const i=document.createElement("i")
 i.className="fa fa-remove ml-3"

 const icon1=document.createElement("i")
 icon1.className="fa-sharp fa-solid fa-circle icon1"
 icon1.style.background=" #91b3ee"
 icon1.style.color="#91b3ee"
 icon1.style.borderRadius="50%"
 icon1.style.width="25px"
 icon1.style.height="25px"
 icon1.style.border="1px solid"
 icon1.style.borderColor="gray"


 const icon2=document.createElement("i")
 icon2.className="fa-sharp fa-solid fa-circle icon2"
 icon2.style.background=" #f79ceb"
 icon2.style.color="#f79ceb"
 icon2.style.borderRadius="50%"
 icon2.style.width="25px"
 icon2.style.height="25px"
 icon2.style.marginLeft="3px"
 icon2.style.border="1px solid"
 icon2.style.borderColor="gray"

 const icon3=document.createElement("i")
 icon3.className="fa-sharp fa-solid fa-circle icon3"
 icon3.style.background=" #a8f5d4"
 icon3.style.color="#a8f5d4"
 icon3.style.borderRadius="50%"
 icon3.style.width="25px"
 icon3.style.height="25px"
 icon3.style.marginLeft="3px"
 icon3.style.border="1px solid "
 icon3.style.borderColor="gray"

 const icon4=document.createElement("i")
 icon4.className="fa-sharp fa-solid fa-circle icon4"
 icon4.style.background=" #f5b975"
 icon4.style.color="#f5b975"
 icon4.style.borderRadius="50%"
 icon4.style.width="25px"
 icon4.style.height="25px"
 icon4.style.marginLeft="3px"
 icon4.style.border="1px solid"
 icon4.style.borderColor="gray"

 const div=document.createElement("div")
 div.className ="d-flex justify-content-end"

 div.appendChild(icon1)
 div.appendChild(icon2)
 div.appendChild(icon3)
 div.appendChild(icon4)

 a.appendChild(div)
 a.appendChild(i)
 li.appendChild(a)
 todoList.appendChild(li)

 addInput.value="" 

}
//! *****************  Local Storage Ekleme *******************************
function checkTodosFromStorage() {
    if(localStorage.getItem("todos")===null){ 
        todos=[] 
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos")) 
    }
  
}
function addTodoToStorage(newTodo) {
    checkTodosFromStorage()
    todos.push(newTodo) 
    localStorage.setItem("todos",JSON.stringify(todos)) 
}
//! ******************************** saniyeli bilgilendirme çıkartma ********************************
function showAlert(type,message) {

    const div=document.createElement("div")
    div.className="alert alert-"+type
    div.textContent = message

    firstCardBody.appendChild(div)


    setTimeout (()=>{
        div.remove()
    },1500) 

}





























