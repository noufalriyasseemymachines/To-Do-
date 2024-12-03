let tasks=[]

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0'); 
const day = String(today.getDate()).padStart(2, '0');
const formattedDate = `${year}-${month}-${day}`;
const alertMessage=document.getElementById("alert-message");

const addTask=() => {
    const taskInput = document.getElementById("task-input");
    let text = taskInput.value.trim()
    text = text.replace(/[^a-zA-Z ]/g, '');
    const date=document.getElementById("task-date");
    const dateValue=date.value

    if(text && dateValue){
        if(dateValue >= formattedDate){
            tasks.push({ text:text, completed:false, date:dateValue });
            taskInput.value= "";
            date.value=""
            updateTasksList(tasks)
            updateBar()
            showDeleteBar()
        }
        else{
            alertMessage.innerHTML=`Please enter correct date`
            setTimeout(()=>{
                alertMessage.innerHTML=''
            },1000)
            date.value=''
        }
    }
    else{
        alertMessage.innerHTML=`Please Enter Your Task and Deadline`
        setTimeout(()=>{
            alertMessage.innerHTML=''
        },1000)
    }
};

const updateTasksList=(displayTask)=>{
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = ''
    displayTask.forEach((task,index)=>{
        const listItem=document.createElement("li");
        listItem.innerHTML = `
        <div class="taskItem ${task.completed ? 'completed': ''}">
            <div class="task">
                <input type="checkbox" class="checkbox" />
                <p class="text ${task.completed? 'ctask':""}">${task.text}</p>
                <p class="date ${task.completed? 'ctask':""}">${task.date}</p>
                <p class="note ${task.completed? "success-note" : ""}">Completed <i class="fa-solid fa-check"></i></p>
            </div>
            <div class="icons">
                <i class="fa-regular fa-pen-to-square" onClick="editTask(${index})"></i>
                <i class="fa-solid fa-delete-left" onClick="deleteTask(${index})" ></i>
            </div>
        </div>
        `;
        listItem.onchange = () => toggleTaskComplete(index);
        taskList.appendChild(listItem);
    });
};

const toggleTaskComplete = (index)=>{
    tasks[index].completed  = !tasks[index].completed;
    updateTasksList(tasks)
    updateBar()
};

const deleteTask = (index)=>{
    tasks.splice(index,1)
    updateTasksList(tasks)
    updateBar()
    showDeleteBar()
};

const editTask = (index)=>{
    const taskInput=document.getElementById("task-input");
    const date=document.getElementById('task-date');
    taskInput.value=tasks[index].text
    date.value=tasks[index].date
    tasks.splice(index,1)
    updateTasksList(tasks)
    updateBar()
    showDeleteBar()
};

const display=()=>{
    updateTasksList(tasks);
}

const updateBar =()=>{
    const totalTask=tasks.length;
    const completedTask=tasks.filter(task=>task.completed).length;
    const status=(completedTask/totalTask)*100
    const statusBar=document.getElementById("status")
    statusBar.style.width=`${status}%`;
    const number=document.getElementById("numbers");
    const displayValue=`${completedTask} / ${totalTask}`;
    number.textContent=displayValue
}

const search=(index)=>{
    const searchInput=document.getElementById("search-box");
    const searchInputValue=searchInput.value.toLowerCase();
    const filteredTask=tasks.filter(task=>task.text.toLowerCase().includes(searchInputValue));
    if(filteredTask.length>0){
        updateTasksList(filteredTask)
    }
    else{
        alertMessage.innerHTML=`Search result not found`
        setTimeout(()=>{
            alertMessage.innerHTML=''
        },1000)
    }
   searchInput.value=''
}

const showDeleteBar=()=>{
    const deleteAllTask=document.getElementById("delete-all");
    if(tasks.length<=0){
        deleteAllTask.style.display="none"
    }
    else{
        deleteAllTask.style.display="block"
    }
    updateTasksList(tasks)
}

window.onload = () => {
    updateTasksList(tasks); 
    showDeleteBar(); 
};

const deleteAll=()=>{
    if(tasks.length>0){
        tasks.splice(0,tasks.length)
        console.log(tasks)
        updateTasksList(tasks)
        updateBar()
        showDeleteBar()
    }
    else{
        alertMessage.innerHTML="No tasks to delete"
        setTimeout(()=>{
            alertMessage.innerHTML=''
        },1000)
    }
}

document.getElementById("newTask").addEventListener("click",function(e){
    e.preventDefault();
    addTask();
})
