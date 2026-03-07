let questions=[]
let editIndex=null
let editField=null

document.getElementById("fileInput").addEventListener("change",loadFile)

function loadFile(event){

const file=event.target.files[0]

if(!file) return

const reader=new FileReader()

reader.onload=function(e){

questions=JSON.parse(e.target.result)

renderQuestions()

}

reader.readAsText(file)

}

function renderQuestions(){

const container=document.getElementById("questionsContainer")

container.innerHTML=""

questions.forEach((q,index)=>{

const div=document.createElement("div")
div.className="card"

div.innerHTML=`

<h3>${q.ID}</h3>

<div>
<span class="question">${q.QUESTION}</span>
<button class="editBtn" onclick="openEditor(${index},'QUESTION')">Edit</button>
</div>

<br>

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

<br>

<div class="correct">
Correct: ${q.CORRECT}
<button class="editBtn" onclick="openEditor(${index},'CORRECT')">Edit</button>
</div>

<div class="feedback">
${q.FEEDBACK}
<button class="editBtn" onclick="openEditor(${index},'FEEDBACK')">Edit</button>
</div>

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

const selectedText=range.toString()

if(selectedText.length===0) return

const newNode=document.createElement(tag)

newNode.textContent=selectedText

range.deleteContents()

range.insertNode(newNode)

}

function exportJSON(){

const dataStr="data:text/json;charset=utf-8,"+
encodeURIComponent(JSON.stringify(questions,null,2))

const a=document.createElement("a")

a.href=dataStr
a.download="questions_fixed.json"

a.click()

}
