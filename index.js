
let  globalTaskData=[]
taskContents = document.getElementById("taskContentsrow");
colors=["bg-primary","bg-danger","bg-info","bg-dark","bg-warning","bg-success"]
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
 

const addCard = () => {
    const newTaskDetails = {
        id: `${Date.now()}`,
        title: document.getElementById("taskTitle").value,
        description: document.getElementById("message-text").value,
        randomColor: colors[Math.floor(Math.random()*6)],
        date : date,
        time : time
    };

   
    taskContents.insertAdjacentHTML('beforeend', generateTaskCard(newTaskDetails));

    globalTaskData.push(newTaskDetails)
    saveToLocalStorage();
}

const generateTaskCard = ({id, title,description,randomColor,date,time}) => {
  console.log(randomColor)
    return (`
    <div class="card text-white ${randomColor} mb-3 ml-3 mr-3 mt-3" style="max-width: 100%;" id=${id} key=${id}>
    <div class="text-end mt-2">
    <button type="button" class="btn btn-dark" data-bs-toggle="tooltip" data-bs-placement="top" title="Remove" name=${id} onclick="deleteTask(this)"><i class="fas fa-times"></i></button>
  </div>
  <div class="card-body">
    <h2 class="card-title">${title}</h2>
    <p class="card-text">${description}</p>
    <p><i class="fas fa-calendar-week"></i> ${date}</p>
    <p><i class="fas fa-clock"></i> ${time}</p>
    

  </div>
</div>
`)
}

const saveToLocalStorage=()=>{
    localStorage.setItem("tasky",JSON.stringify({task : globalTaskData}) )
}

const reloadTaskCard = ()=>{
  const localStorageCopy=JSON.parse(localStorage.getItem("tasky"))
  if(localStorageCopy){
    globalTaskData=localStorageCopy["task"];
  }
  globalTaskData.map((cardData)=>{
    taskContents.insertAdjacentHTML('beforeend', generateTaskCard(cardData));
 })
}

const deleteTask =(e)=>{
   const targerId=e.getAttribute("name")
   globalTaskData=globalTaskData.filter((id)=>id.id!==targerId)
   globalTaskData.removeTask;
   saveToLocalStorage();
   window.location.reload()
}






