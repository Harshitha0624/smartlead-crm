const API = "/api/leads";

/* -----------------------
   LEAD SCORING
------------------------*/

function calculateScore(source,notes,followup){

let score=0

if(source==="Referral") score+=40
if(source==="Website") score+=30
if(source==="Instagram") score+=20

if(notes && notes.length>20) score+=10
if(followup) score+=10

return score

}


/* -----------------------
   ADD LEAD
------------------------*/

async function addLead(){

let name=document.getElementById("name").value
let email=document.getElementById("email").value
let phone=document.getElementById("phone").value
let source=document.getElementById("source").value
let notes=document.getElementById("notes").value
let followup=document.getElementById("followup").value

let score = calculateScore(source,notes,followup)

let lead={
name,
email,
phone,
source,
notes,
followup,
score,
status:"New"
}

await fetch(API,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(lead)
})

alert("Lead Added")

loadLeads()
loadDashboard()
loadActivity()

}


/* -----------------------
   LOAD LEADS TABLE
------------------------*/

async function loadLeads(){

let table=document.getElementById("leadTable")

if(!table) return

let res = await fetch(API)

let leads = await res.json()

table.innerHTML=""

leads.forEach((lead,index)=>{

table.innerHTML += `
<tr>

<td>${lead.name}</td>

<td>${lead.email}</td>

<td>${lead.source}</td>

<td>
<select onchange="updateStatus(${index},this.value)">
<option ${lead.status=="New"?"selected":""}>New</option>
<option ${lead.status=="Contacted"?"selected":""}>Contacted</option>
<option ${lead.status=="Converted"?"selected":""}>Converted</option>
</select>
</td>

<td>${lead.score || 0}</td>

<td>
<button onclick="deleteLead(${index})">Delete</button>
</td>

</tr>
`

})

}


/* -----------------------
   UPDATE STATUS
------------------------*/

async function updateStatus(index,status){

await fetch(`${API}/${index}`,{
method:"PUT",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({status:status})
})

loadLeads()
loadDashboard()
loadActivity()

}


/* -----------------------
   SEARCH LEADS
------------------------*/

function searchLeads(){

let input=document.getElementById("searchLead").value.toLowerCase()

let rows=document.querySelectorAll("#leadTable tr")

rows.forEach(row=>{

let text=row.innerText.toLowerCase()

if(text.includes(input)){
row.style.display=""
}
else{
row.style.display="none"
}

})

}


/* -----------------------
   DELETE LEAD
------------------------*/

async function deleteLead(i){

await fetch(`${API}/${i}`,{
method:"DELETE"
})

loadLeads()
loadDashboard()
loadActivity()

}


/* -----------------------
   DASHBOARD LOGIC
------------------------*/

async function loadDashboard(){

let priorityTable=document.getElementById("priorityTable")
let sourceChart=document.getElementById("sourceChart")
let pipelineChart=document.getElementById("pipelineChart")

if(!priorityTable && !sourceChart) return

let res = await fetch(API)
let leads = await res.json()

let total = leads.length
let converted = 0

let website=0
let referral=0
let instagram=0

let newStatus=0
let contacted=0
let convertedStatus=0

let today=new Date().toISOString().split("T")[0]
let todayFollowups=0

if(priorityTable) priorityTable.innerHTML=""

leads.forEach(lead=>{

if(lead.status==="Converted"){
converted++
convertedStatus++
}

if(lead.status==="New") newStatus++
if(lead.status==="Contacted") contacted++

if(lead.source==="Website") website++
if(lead.source==="Referral") referral++
if(lead.source==="Instagram") instagram++

if(lead.followup===today){
todayFollowups++
}

let priority="Cold"
let color="blue"

if(lead.score>=60){
priority="Hot"
color="red"
}
else if(lead.score>=40){
priority="Warm"
color="orange"
}

if(priorityTable){

priorityTable.innerHTML+=`
<tr>
<td>${lead.name}</td>
<td>${lead.email}</td>
<td>${lead.source}</td>
<td style="color:${color};font-weight:bold">${priority}</td>
</tr>
`

}

})


/* KPI CARDS */

let totalElement=document.getElementById("totalLeads")
let convertedElement=document.getElementById("convertedLeads")
let rateElement=document.getElementById("conversionRate")
let followupElement=document.getElementById("todayFollowups")

if(totalElement) totalElement.innerText=total
if(convertedElement) convertedElement.innerText=converted

let rate=0

if(total>0){
rate=Math.round((converted/total)*100)
}

if(rateElement) rateElement.innerText=rate+"%"
if(followupElement) followupElement.innerText=todayFollowups



/* LEAD SOURCE CHART */

if(sourceChart){

new Chart(sourceChart,{
type:"doughnut",
data:{
labels:["Website","Referral","Instagram"],
datasets:[{
data:[website,referral,instagram],
backgroundColor:["#2563eb","#16a34a","#f59e0b"]
}]
}
})

}


/* PIPELINE CHART */

if(pipelineChart){

new Chart(pipelineChart,{
type:"bar",
data:{
labels:["New","Contacted","Converted"],
datasets:[{
label:"Lead Pipeline",
data:[newStatus,contacted,convertedStatus],
backgroundColor:["#3b82f6","#f59e0b","#22c55e"]
}]
}
})

}

}


/* -----------------------
   ANALYTICS PAGE
------------------------*/

async function loadAnalytics(){

let statusChart=document.getElementById("statusChart")
let growthChart=document.getElementById("growthChart")

if(!statusChart && !growthChart) return

let res=await fetch(API)
let leads=await res.json()

let newStatus=0
let contacted=0
let converted=0

leads.forEach(lead=>{

if(lead.status==="New") newStatus++
if(lead.status==="Contacted") contacted++
if(lead.status==="Converted") converted++

})


if(statusChart){

new Chart(statusChart,{
type:"bar",
data:{
labels:["New","Contacted","Converted"],
datasets:[{
label:"Lead Status",
data:[newStatus,contacted,converted],
backgroundColor:["#3b82f6","#f59e0b","#22c55e"]
}]
}
})

}


if(growthChart){

new Chart(growthChart,{
type:"line",
data:{
labels:["Week1","Week2","Week3","Week4"],
datasets:[{
label:"Lead Growth",
data:[2,4,6,leads.length],
borderColor:"#2563eb",
fill:false
}]
}
})

}

}


/* -----------------------
   RECENT ACTIVITY FEED
------------------------*/

async function loadActivity(){

let feed=document.getElementById("activityFeed")

if(!feed) return

let res=await fetch("http://127.0.0.1:5000/api/activity")

let activities=await res.json()

feed.innerHTML=""

activities.forEach(act=>{
feed.innerHTML+=`<li>${act}</li>`
})

}


/* -----------------------
   AUTO LOAD PAGES
------------------------*/

loadLeads()
loadDashboard()
loadAnalytics()
loadActivity()