let questions=[]
let editIndex=null
let editField=null
let originalFileName="questions"

document.getElementById("fileInput").addEventListener("change",loadFile)
document.getElementById("searchBox").addEventListener("input",searchQuestions)

function loadFile(event){

const file=event.target.files[0]

if(!file) return

originalFileName=file.name.replace(".json","")

const reader=new FileReader()

reader.onload=function(e){

questions=JSON.parse(e.target.result)

renderNavigation()
renderQuestions()

}

reader.readAsText(file)

}

function renderNavigation(){

const nav=document.getElementById("questionNav")
nav.innerHTML=""

questions.forEach((q,i)=>{

const li=document.createElement("li")
li.innerText=q.ID

li.onclick=function(){

document.getElementById("q"+i).scrollIntoView({
behavior:"smooth"
})

highlightNav(i)

}

nav.appendChild(li)

})

}

function highlightNav(index){

document.querySelectorAll("#sidebar li").forEach(li=>{
li.classList.remove("active")
})

document.querySelectorAll("#sidebar li")[index].classList.add("active")

}

function renderQuestions(){

const container=document.getElementById("questionsContainer")
container.innerHTML=""

questions.forEach((q,index)=>{

const div=document.createElement("div")
div.className="card"
div.id="q"+index

div.innerHTML=`

<h3>${q.ID}</h3>

<div class="sectionTitle">
Question
<button class="editBtn" onclick="openEditor(${index},'QUESTION')">Edit</button>
</div>

<div>${q.QUESTION}</div>

<div class="sectionTitle">Options</div>

<div class="option">
A. ${q.OPTION_A}
<button class="editBtn" onclick="openEditor(${index},'OPTION_A')">Edit</button>
</div>

<div class="option">
B. ${q.OPTION_B}
<button class="editBtn" onclick="openEditor(${index},'OPTION_B')">Edit</button>
</div>

<div class="option">
C. ${q.OPTION_C}
<button class="editBtn" onclick="openEditor(${index},'OPTION_C')">Edit</button>
</div>

<div class="option">
D. ${q.OPTION_D}
<button class="editBtn" onclick="openEditor(${index},'OPTION_D')">Edit</button>
</div>

<div class="option">
E. ${q.OPTION_E}
<button class="editBtn" onclick="openEditor(${index},'OPTION_E')">Edit</button>
</div>

<div class="sectionTitle">
Correct Answer
<button class="editBtn" onclick="openEditor(${index},'CORRECT')">Edit</button>
</div>

<div class="correct">${q.CORRECT}</div>

<div class="sectionTitle">
Feedback
<button class="editBtn" onclick="openEditor(${index},'FEEDBACK')">Edit</button>
</div>

<div class="feedback">${q.FEEDBACK}</div>

`

container.appendChild(div)

})

}

function openEditor(index,field){

editIndex=index
editField=field

const modal=document.getElementById("editorModal")
const editor=document.getElementById("editor")

editor.innerHTML=questions[index][field]

modal.classList.remove("hidden")

document.getElementById("saveBtn").onclick=saveEdit

}

function closeEditor(){
document.getElementById("editorModal").classList.add("hidden")
}

function saveEdit(){

const editor=document.getElementById("editor")

questions[editIndex][editField]=editor.innerHTML

closeEditor()

renderQuestions()

}

function applyTag(tag){

const sel=window.getSelection()

if(!sel.rangeCount) return

const range=sel.getRangeAt(0)

const text=range.toString()

if(text.length===0) return

const node=document.createElement(tag)

node.textContent=text

range.deleteContents()

range.insertNode(node)

}

function exportJSON(){

const fileName = originalFileName + "_qa_verified.json"

const dataStr="data:text/json;charset=utf-8,"+
encodeURIComponent(JSON.stringify(questions,null,2))

const a=document.createElement("a")

a.href=dataStr
a.download=fileName

a.click()

}

function searchQuestions(){

const term=document.getElementById("searchBox").value.toLowerCase()

document.querySelectorAll(".card").forEach(card=>{

if(card.innerText.toLowerCase().includes(term))
card.style.display="block"
else
card.style.display="none"

})

}

document.addEventListener("keydown",function(e){

if(e.ctrlKey && e.key==="b"){
applyTag("b")
e.preventDefault()
}

if(e.ctrlKey && e.key==="i"){
applyTag("i")
e.preventDefault()
}

if(e.ctrlKey && e.key==="u"){
applyTag("u")
e.preventDefault()
}

if(e.ctrlKey && e.key==="s"){
saveEdit()
e.preventDefault()
}

if(e.key==="Escape"){
closeEditor()
}

})
