let questions=[]
let current=0

async function load(){

const res=await fetch("questions.json")
questions=await res.json()

renderList()
loadQuestion(0)

}

function renderList(){

const list=document.getElementById("questionList")
list.innerHTML=""

questions.forEach((q,i)=>{

const li=document.createElement("li")
li.innerText=q.ID
li.onclick=()=>loadQuestion(i)

list.appendChild(li)

})

}

function loadQuestion(i){

current=i
const q=questions[i]

qid.value=q.ID
question.innerHTML=q.QUESTION
optA.value=q.OPTION_A
optB.value=q.OPTION_B
optC.value=q.OPTION_C
optD.value=q.OPTION_D
optE.value=q.OPTION_E
correct.value=q.CORRECT
feedback.innerHTML=q.FEEDBACK

}

function save(){

const q=questions[current]

q.ID=qid.value
q.QUESTION=question.innerHTML
q.OPTION_A=optA.value
q.OPTION_B=optB.value
q.OPTION_C=optC.value
q.OPTION_D=optD.value
q.OPTION_E=optE.value
q.CORRECT=correct.value
q.FEEDBACK=feedback.innerHTML

alert("Saved")

}
document.getElementById("fileInput").addEventListener("change",loadFile)

function loadFile(event){

const file=event.target.files[0]

if(!file) return

const reader=new FileReader()

reader.onload=function(e){

questions=JSON.parse(e.target.result)

renderList()
loadQuestion(0)

}

reader.readAsText(file)

}

function format(cmd){
document.execCommand(cmd,false,null)
}

function exportJSON(){

const dataStr="data:text/json;charset=utf-8,"+
encodeURIComponent(JSON.stringify(questions,null,2))

const a=document.createElement("a")
a.href=dataStr
a.download="questions.json"
a.click()

}

load()