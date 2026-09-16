// ===============================
// NetForge V1
// SCRIPT PART 1
// ===============================

// ===== LOGIN DATA =====

const username=localStorage.getItem("netforge_username");
const kelas=localStorage.getItem("netforge_kelas");
const role=localStorage.getItem("netforge_role");

const welcomeName=document.getElementById("welcomeName");
const welcomeClass=document.getElementById("welcomeClass");
const welcomeRole=document.getElementById("welcomeRole");

if(welcomeName){

welcomeName.innerHTML=""

}

if(welcomeClass){

welcomeClass.innerHTML="Kelas: "+(kelas||"-");

}

if(welcomeRole){

welcomeRole.innerHTML="Role: "+(role||"User");

}

// ===== LOGOUT =====

function logout(){


localStorage.removeItem("netforge_username");
localStorage.removeItem("netforge_kelas");
localStorage.removeItem("netforge_role");

window.location.href="login.html";

}

function toggleSidebar(){

const sidebar=document.querySelector(".sidebar");
const main=document.querySelector(".main");

if(!sidebar || !main) return;

sidebar.classList.toggle("collapsed");
main.classList.toggle("sidebar-collapsed");

localStorage.setItem(
"netforge_sidebar",
sidebar.classList.contains("collapsed")
);

}

function restoreSidebar(){

const collapsed=
localStorage.getItem("netforge_sidebar");

const sidebar=document.querySelector(".sidebar");
const main=document.querySelector(".main");

if(collapsed==="true" && sidebar && main){

sidebar.classList.add("collapsed");
main.classList.add("sidebar-collapsed");

}

}

window.addEventListener("load",restoreSidebar);

// ===== RANDOM =====

function rand(min,max){

return Math.floor(Math.random()*(max-min+1))+min;

}

// ===== CLOCK =====

function updateClock(){

const clock=document.getElementById("clock");
const today=document.getElementById("today");

const now=new Date();

if(clock){

clock.innerHTML=now.toLocaleTimeString("id-ID");

}

if(today){

today.innerHTML=now.toLocaleDateString("id-ID",{

weekday:"long",
day:"numeric",
month:"long",
year:"numeric"

});

}

}

setInterval(updateClock,1000);

updateClock();

// ===== LIVE DASHBOARD =====

let second=0;

setInterval(()=>{

const cpu=document.getElementById("cpu");
const ram=document.getElementById("ram");
const overviewCPU=document.getElementById("overviewCPU");
const overviewRAM=document.getElementById("overviewRAM");
const ping=document.getElementById("ping");
const online=document.getElementById("onlineUser");
const uptime=document.getElementById("uptime");
const status=document.getElementById("serverStatus");

const cpuValue=rand(20,85);
const ramValue=rand(25,90);
const pingValue=rand(2,35);

if(cpu){

cpu.innerHTML=cpuValue+"%";

}

if(ram){

ram.innerHTML=ramValue+"%";

}

if(overviewCPU){
overviewCPU.innerHTML=cpuValue+"%";
}

if(overviewRAM){
overviewRAM.innerHTML=ramValue+"%";
}

if(ping){

ping.innerHTML=pingValue+" ms";

}

if(online){

online.innerHTML=rand(5,60);

}

second++;

const h=String(Math.floor(second/3600)).padStart(2,"0");
const m=String(Math.floor(second%3600/60)).padStart(2,"0");
const s=String(second%60).padStart(2,"0");

if(uptime){

uptime.innerHTML=`${h}:${m}:${s}`;

}

if(status){

if(cpuValue<70){

status.innerHTML="🟢 ONLINE";
status.style.color="#00ff66";

}else{

status.innerHTML="🟡 HIGH LOAD";
status.style.color="#ffcc00";

}

}

},1000);

// ===============================
// NetForge V1
// SCRIPT PART 2
// ===============================

// ===== LIVE CHART =====

const chartCanvas=document.getElementById("liveChart");

if(chartCanvas){

const ctx=chartCanvas.getContext("2d");

const labels=[];
const cpuData=[];
const ramData=[];
const pingData=[];

const liveChart=new Chart(ctx,{

type:"line",

data:{

labels:labels,

datasets:[

{
label:"CPU",
data:cpuData,
borderColor:"#00e5ff",
backgroundColor:"transparent",
tension:.4
},

{
label:"RAM",
data:ramData,
borderColor:"#00ff99",
backgroundColor:"transparent",
tension:.4
},

{
label:"PING",
data:pingData,
borderColor:"#ffcc00",
backgroundColor:"transparent",
tension:.4
}

]

},

options:{

responsive:true,

plugins:{

legend:{
labels:{
color:"#ffffff"
}
}

},

scales:{

x:{
ticks:{color:"#ffffff"}
},

y:{
ticks:{color:"#ffffff"},
beginAtZero:true
}

}

}

});

setInterval(()=>{

if(labels.length>=20){

labels.shift();
cpuData.shift();
ramData.shift();
pingData.shift();

}

labels.push(new Date().toLocaleTimeString());

cpuData.push(rand(20,85));
ramData.push(rand(30,90));
pingData.push(rand(2,35));

liveChart.update();

},1000);

}

// ===== TRAFFIC CHART =====

const trafficCanvas=document.getElementById("trafficChart");

if(trafficCanvas){

const ctx2=trafficCanvas.getContext("2d");

const labels2=[];
const uploadData=[];
const downloadData=[];

const trafficChart=new Chart(ctx2,{

type:"line",

data:{

labels:labels2,

datasets:[

{

label:"Upload",

data:uploadData,

borderColor:"#00ffff",

backgroundColor:"transparent",

tension:.4

},

{

label:"Download",

data:downloadData,

borderColor:"#ff44aa",

backgroundColor:"transparent",

tension:.4

}

]

},

options:{

responsive:true,

plugins:{

legend:{
labels:{
color:"#ffffff"
}
}

},

scales:{

x:{
ticks:{color:"#ffffff"}
},

y:{
ticks:{color:"#ffffff"},
beginAtZero:true
}

}

}

});

setInterval(()=>{

if(labels2.length>=20){

labels2.shift();
uploadData.shift();
downloadData.shift();

}

labels2.push(new Date().toLocaleTimeString());

uploadData.push(rand(10,100));
downloadData.push(rand(30,250));

trafficChart.update();

},1000);

}

// ===== NETWORK SPEED =====

setInterval(()=>{

const up=document.getElementById("uploadSpeed");
const down=document.getElementById("downloadSpeed");
const bar=document.getElementById("serverBar");

const upload=rand(10,120);
const download=rand(20,300);
const load=rand(20,95);

if(up){

up.innerHTML=upload+" Mbps";

}

if(down){

down.innerHTML=download+" Mbps";

}

if(bar){

bar.style.width=load+"%";
bar.innerHTML=load+"%";

}

},1000);

// ===============================
// NetForge V1
// SCRIPT PART 3
// NETWORKING TOOLS
// ===============================

// ===== IPv4 VALIDATOR =====

function validateIPv4(){

const ip=document.getElementById("ipv4Input").value.trim();
const hasil=document.getElementById("ipv4Result");

const regex=/^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;

if(regex.test(ip)){

hasil.innerHTML="✅ IPv4 Valid";

}else{

hasil.innerHTML="❌ IPv4 Tidak Valid";

}

}

// ===== IP CLASS =====

function checkIPClass(){

const ip=document.getElementById("classInput").value.trim();
const hasil=document.getElementById("classResult");

const part=parseInt(ip.split(".")[0]);

if(isNaN(part)){

hasil.innerHTML="Masukkan IP yang benar";
return;

}

if(part<=126){

hasil.innerHTML="Class A";

}else if(part<=191){

hasil.innerHTML="Class B";

}else if(part<=223){

hasil.innerHTML="Class C";

}else if(part<=239){

hasil.innerHTML="Class D (Multicast)";

}else{

hasil.innerHTML="Class E (Reserved)";

}

}

// ===== SUBNET CALCULATOR =====

function calculateSubnet(){

const ip=document.getElementById("ipInput").value.trim();
const prefix=parseInt(document.getElementById("prefixInput").value);
const hasil=document.getElementById("subnetResult");

const octets=ip.split(".").map(Number);

if(octets.length!==4||prefix<0||prefix>32){

hasil.innerHTML="Input tidak valid";
return;

}

const ipNum=((octets[0]<<24)>>>0)+
(octets[1]<<16)+
(octets[2]<<8)+
octets[3];

const mask=prefix===0?0:(0xffffffff<<(32-prefix))>>>0;

const network=ipNum&mask;
const broadcast=network|(~mask>>>0);

function toIP(num){

return[
(num>>>24)&255,
(num>>>16)&255,
(num>>>8)&255,
num&255

].join(".");

}

const host=Math.max(0,Math.pow(2,32-prefix)-2);

hasil.innerHTML=

"Network ID : "+toIP(network)+"<br>"+
"Broadcast : "+toIP(broadcast)+"<br>"+
"First Host : "+toIP(network+1)+"<br>"+
"Last Host : "+toIP(broadcast-1)+"<br>"+
"Total Host : "+host;

}

// ===== CIDR CONVERTER =====

function convertCIDR(){

const input=document.getElementById("cidrInput").value.trim();
const hasil=document.getElementById("cidrResult");

if(input.startsWith("/")){

const prefix=parseInt(input.substring(1));

if(prefix<0||prefix>32){

hasil.innerHTML="CIDR tidak valid";
return;

}

const mask=[];

let bit=prefix;

for(let i=0;i<4;i++){

let value=0;

for(let j=0;j<8;j++){

if(bit>0){

value+=1<<(7-j);
bit--;

}

}

mask.push(value);

}

hasil.innerHTML=mask.join(".");

}else{

const map={

"255.0.0.0":8,
"255.128.0.0":9,
"255.192.0.0":10,
"255.224.0.0":11,
"255.240.0.0":12,
"255.248.0.0":13,
"255.252.0.0":14,
"255.254.0.0":15,
"255.255.0.0":16,
"255.255.128.0":17,
"255.255.192.0":18,
"255.255.224.0":19,
"255.255.240.0":20,
"255.255.248.0":21,
"255.255.252.0":22,
"255.255.254.0":23,
"255.255.255.0":24,
"255.255.255.128":25,
"255.255.255.192":26,
"255.255.255.224":27,
"255.255.255.240":28,
"255.255.255.248":29,
"255.255.255.252":30,
"255.255.255.254":31,
"255.255.255.255":32

};

hasil.innerHTML=map[input]
?"/"+map[input]
:"Subnet Mask tidak valid";

}

}

// ===============================
// NetForge V1
// SCRIPT PART 4
// MORE NETWORK TOOLS
// ===============================

// ===== BINARY → DECIMAL =====

function convertBinary(){

const binary=document.getElementById("binaryInput").value.trim();
const hasil=document.getElementById("binaryResult");

if(!/^[01]+$/.test(binary)){

hasil.innerHTML="❌ Binary tidak valid";
return;

}

hasil.innerHTML=parseInt(binary,2);

}

// ===== WILDCARD CALCULATOR =====

function calculateWildcard(){

const mask=document.getElementById("wildcardInput").value.trim();
const hasil=document.getElementById("wildcardResult");

const part=mask.split(".").map(Number);

if(part.length!==4){

hasil.innerHTML="Mask tidak valid";
return;

}

const wildcard=part.map(n=>255-n);

hasil.innerHTML=wildcard.join(".");

}

// ===== HOST CALCULATOR =====

function calculateHost(){

const prefix=parseInt(document.getElementById("hostPrefix").value);
const hasil=document.getElementById("hostResult");

if(isNaN(prefix)||prefix<0||prefix>32){

hasil.innerHTML="Prefix tidak valid";
return;

}

const total=Math.pow(2,32-prefix);

const usable=prefix>=31?total:total-2;

hasil.innerHTML=

"Total Address : "+total+
"<br>Usable Host : "+usable;

}

// ===== PASSWORD GENERATOR =====

function generatePassword(){

const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
let pass="";

for(let i=0;i<16;i++){

pass+=chars.charAt(rand(0,chars.length-1));

}

document.getElementById("passwordResult").innerHTML=pass;

}

// ===== PING SIMULATOR =====

function pingHost(){

const host=document.getElementById("pingHost").value.trim();
const hasil=document.getElementById("pingResult");

if(host===""){

hasil.innerHTML="Masukkan host";
return;

}

hasil.innerHTML=

"Pinging "+host+
"...<br>Reply time = "+rand(2,40)+" ms";

}

// ===== DNS LOOKUP =====

function dnsLookup(){

const domain=document.getElementById("dnsInput").value.trim();
const hasil=document.getElementById("dnsResult");

if(domain===""){

hasil.innerHTML="Masukkan domain";
return;

}

hasil.innerHTML=

"Domain : "+domain+
"<br>IPv4 : 192.168."+rand(1,254)+"."+rand(1,254);

}

// ===== NETWORK SCANNER =====

function scanNetwork(){

const hasil=document.getElementById("scanResult");

let text="";

for(let i=1;i<=10;i++){

text+="192.168.1."+i+" ✅ Online<br>";

}

hasil.innerHTML=text;

}

// ===============================
// NetForge V1
// SCRIPT PART 5
// TERMINAL & SETTINGS
// ===============================

// ===== TERMINAL =====

const terminal=document.getElementById("terminal");
const terminalInput=document.getElementById("terminal-input");

function print(text){

if(!terminal) return;

terminal.innerHTML+=text+"<br>";
terminal.scrollTop=terminal.scrollHeight;

}

if(terminal){

print("NetForge Terminal");
print("Ketik 'help' untuk melihat command.");

}

if(terminalInput){

terminalInput.addEventListener("keydown",function(e){

if(e.key!=="Enter") return;

const cmd=this.value.trim().toLowerCase();

print("> "+cmd);

switch(cmd){

case "help":

print("help");
print("clear");
print("date");
print("uptime");
print("whoami");
print("hostname");
print("ipconfig");
print("ifconfig");
print("exit");

break;

case "clear":

terminal.innerHTML="";

break;

case "date":

print(new Date());

break;

case "uptime":

print(document.getElementById("uptime").innerHTML);

break;

case "whoami":

print(username||"Guest");

break;

case "hostname":

print("NetForge");

break;

case "ipconfig":

print("IPv4 : 192.168.1."+rand(2,254));

break;

case "ifconfig":

print("eth0 : UP");
print("RX : "+rand(100,999)+" MB");
print("TX : "+rand(100,999)+" MB");

break;

case "exit":

print("Session closed.");

break;

default:

print("Command tidak ditemukan.");

}

this.value="";

});

}

// ===== NOTIFICATION =====

function notify(text){

const n=document.createElement("div");

n.className="notify";

n.innerHTML=text;

document.body.appendChild(n);

setTimeout(()=>{

n.classList.add("show");

},100);

setTimeout(()=>{

n.remove();

},3000);

}

// ===== THEME =====

function toggleTheme(){

document.body.classList.toggle("light");

localStorage.setItem(

"netforge_theme",

document.body.classList.contains("light")

?"light":"dark"

);

}

if(localStorage.getItem("netforge_theme")=="light"){

document.body.classList.add("light");

}

// ===== COPY RESULT =====

function copyResult(id){

const el=document.getElementById(id);

if(!el) return;

navigator.clipboard.writeText(el.innerText);

notify("📋 Hasil berhasil disalin");

}

// ===== EXPORT REPORT =====

function exportReport(){

let txt="NetForge Report\n\n";

txt+="CPU : "+document.getElementById("cpu").innerText+"\n";
txt+="RAM : "+document.getElementById("ram").innerText+"\n";
txt+="Ping : "+document.getElementById("ping").innerText+"\n";
txt+="Uptime : "+document.getElementById("uptime").innerText+"\n";
txt+="Server : "+document.getElementById("serverStatus").innerText+"\n";

const blob=new Blob([txt],{

type:"text/plain"

});

const a=document.createElement("a");

a.href=URL.createObjectURL(blob);

a.download="NetForge-Report.txt";

a.click();

notify("📄 Report berhasil dibuat");

}

// ===============================
// NetForge V1
// SCRIPT PART 6 (FINAL)
// ===============================

// ===== KEYBOARD SHORTCUT =====

document.addEventListener("keydown",e=>{

if(e.ctrlKey&&e.key==="l"){

e.preventDefault();

if(terminal){

terminal.innerHTML="";

print("Terminal dibersihkan.");

}

}

if(e.ctrlKey&&e.key==="e"){

e.preventDefault();

exportReport();

}

if(e.ctrlKey&&e.key==="d"){

e.preventDefault();

toggleTheme();

}

});

// ===== STARTUP =====

window.addEventListener("load",()=>{

notify("✅ NetForge berhasil dimuat");

});

// ===== RANDOM LOG =====

const logs=[

"Firewall Active",
"Traffic Normal",
"DNS Running",
"Server Stable",
"Connection Secure",
"Monitoring Active",
"Network Healthy",
"CPU Optimized",
"RAM Stable"

];

setInterval(()=>{

if(terminal){

print("[LOG] "+logs[rand(0,logs.length-1)]);

if(terminal.children.length>100){

terminal.innerHTML="";

print("Terminal dibersihkan otomatis.");

}

}

},8000);

// ===== AUTO SAVE =====

setInterval(()=>{

localStorage.setItem(

"netforge_last_open",

new Date().toLocaleString("id-ID")

);

},10000);

// ===== DOCUMENT TITLE =====

setInterval(()=>{

const cpu=document.getElementById("cpu");
const ram=document.getElementById("ram");
const ping=document.getElementById("ping");

if(cpu&&ram&&ping){

document.title=

`CPU ${cpu.innerText} | RAM ${ram.innerText} | Ping ${ping.innerText}`;

}

},1000);

// ===== START MESSAGE =====

console.clear();

console.log("%cNetForge V1",
"color:#00e5ff;font-size:24px;font-weight:bold;");

console.log("Developer : MUSYAFFA HANIF SUNNI");

console.log("Repository : https://github.com/LyuuZhnn/NetForge/");

console.log("Status : READY");

// ===== FINISH =====

notify("🚀 NetForge Siap Digunakan");


function calculateIPv6(){

const input=document.getElementById("ipv6Input").value.trim();
const result=document.getElementById("ipv6Result");

if(input===""){
result.innerHTML="Masukkan alamat IPv6";
return;
}

const data=input.split("/");

result.innerHTML=
"IPv6 : "+data[0]+
"<br>Prefix : /"+(data[1]||64);

}


function calculateVLSM(){

const network=document.getElementById("vlsmNetwork").value.trim();
const host=parseInt(document.getElementById("vlsmHost").value);
const result=document.getElementById("vlsmResult");

if(network===""||isNaN(host)||host<1){

result.innerHTML="Masukkan network dan jumlah host.";
return;

}

let bits=0;

while((2**bits-2)<host){

bits++;

}

const prefix=32-bits;
const total=2**bits;
const usable=total-2;

result.innerHTML=
"Network : "+network+
"<br>Host Dibutuhkan : "+host+
"<br>CIDR : /"+prefix+
"<br>Total Address : "+total+
"<br>Usable Host : "+usable;

}


function simulateRouting(){

const dest=document.getElementById("routeDest").value.trim();
const gateway=document.getElementById("routeGateway").value.trim();
const result=document.getElementById("routeResult");

if(dest===""||gateway===""){

result.innerHTML="Lengkapi Destination dan Gateway.";
return;

}

result.innerHTML=
"Destination : "+dest+
"<br>Gateway : "+gateway+
"<br>Interface : eth0"+
"<br>Metric : 1"+
"<br>Status : ✅ Route Added (Simulation)";

}


function runTraceroute(){

const host=document.getElementById("traceHost").value.trim();
const result=document.getElementById("traceResult");

if(host===""){

result.innerHTML="Masukkan host.";
return;

}

let output="";

for(let i=1;i<=8;i++){

output+=
i+
". 192.168."+i+"."+rand(1,254)+
" - "+
rand(2,40)+
" ms<br>";

}

output+="<br>Destination : "+host+" ✅";

result.innerHTML=output;

}


function toggleTheme(){

document.body.classList.toggle("light");

localStorage.setItem(
"theme",
document.body.classList.contains("light")
?"light":"dark"
);

}

window.onload=function(){

if(localStorage.getItem("theme")=="light"){

document.body.classList.add("light");

}

};


async function exportPDF(){

const { jsPDF } = window.jspdf;

const pdf=new jsPDF();

pdf.setFontSize(20);
pdf.text("NetForge Report",20,20);

pdf.setFontSize(12);

pdf.text("CPU : "+document.getElementById("cpu").innerText,20,40);
pdf.text("RAM : "+document.getElementById("ram").innerText,20,50);
pdf.text("Ping : "+document.getElementById("ping").innerText,20,60);
pdf.text("Uptime : "+document.getElementById("uptime").innerText,20,70);
pdf.text("Status : "+document.getElementById("serverStatus").innerText,20,80);

pdf.save("NetForge-Report.pdf");

}


function drawTopology(){

const canvas=document.getElementById("topologyCanvas");

if(!canvas) return;

const rect=canvas.getBoundingClientRect();

if(rect.width>0){
canvas.width=rect.width;
}else{
canvas.width=900;
}

if(rect.height>0){
canvas.height=rect.height;
}else{
canvas.height=500;
}

drawInteractive();

}

window.addEventListener("load",()=>{

drawTopology();

loadTopology();

});

function whoisLookup(){

const domain=document.getElementById("whoisDomain").value.trim();
const result=document.getElementById("whoisResult");

if(domain===""){

result.innerHTML="Masukkan nama domain.";
return;

}

result.innerHTML=`
<b>Domain</b> : ${domain}<br>
<b>Status</b> : Active<br>
<b>Registrar</b> : Example Registrar<br>
<b>Created</b> : 2024-01-15<br>
<b>Expires</b> : 2027-01-15<br>
<b>Name Server</b> : ns1.example.net<br>
<b>Name Server</b> : ns2.example.net
`;

}

function dnsLookupPro(){

const domain=document.getElementById("dnsDomain").value.trim();
const result=document.getElementById("dnsResult");

if(domain===""){
result.innerHTML="Masukkan nama domain.";
return;
}

const ip=
rand(1,223)+"."+
rand(0,255)+"."+
rand(0,255)+"."+
rand(1,254);

result.innerHTML=`
<b>Domain</b> : ${domain}<br>
<b>A Record</b> : ${ip}<br>
<b>MX Record</b> : mail.${domain}<br>
<b>NS1</b> : ns1.${domain}<br>
<b>NS2</b> : ns2.${domain}<br>
<b>TTL</b> : 3600 Seconds
`;

}


function scanPorts(){

const ip=document.getElementById("scanIP").value.trim();
const result=document.getElementById("scanPortResult");

if(ip===""){

result.innerHTML="Masukkan alamat IP.";
return;

}

const ports=[
21,
22,
23,
25,
53,
80,
110,
135,
139,
143,
443,
445,
3306,
3389,
8080
];

let html="<b>Target :</b> "+ip+"<br><br>";

ports.forEach(port=>{

const status=Math.random()>0.5
?"🟢 OPEN"
:"🔴 CLOSED";

html+="Port "+port+" : "+status+"<br>";

});

result.innerHTML=html;

}


let devices=[];

let connections=[];
let connectMode=false;
let firstDevice=null;

let selectedDevice = null;
let offsetX = 0;
let offsetY = 0;

function addDevice(type){

devices.push({

type:type,
x:80+Math.random()*650,
y:80+Math.random()*250

});

drawInteractive();

}

function clearTopology(){

devices=[];

drawInteractive();

}

const canvas=document.getElementById("topologyCanvas");

if(canvas){

canvas.addEventListener("mousedown",startDrag);
canvas.addEventListener("mousemove",dragDevice);
canvas.addEventListener("mouseup",stopDrag);
canvas.addEventListener("mouseleave",stopDrag);

}

function startDrag(e){

const rect=canvas.getBoundingClientRect();

const x=e.clientX-rect.left;
const y=e.clientY-rect.top;

devices.forEach(device=>{

const dx=x-device.x;
const dy=y-device.y;

if(Math.sqrt(dx*dx+dy*dy)<30){

selectedDevice=device;
if(connectMode){

if(!firstDevice){

firstDevice=device;

}else{

connections.push({
from:firstDevice,
to:device
});

firstDevice=null;

drawInteractive();

}

return;

}

offsetX=dx;
offsetY=dy;

}

});

}

function dragDevice(e){

if(!selectedDevice) return;

const rect=canvas.getBoundingClientRect();

selectedDevice.x=e.clientX-rect.left-offsetX;
selectedDevice.y=e.clientY-rect.top-offsetY;

drawInteractive();

}

function stopDrag(){

selectedDevice=null;

}

if(canvas){

canvas.addEventListener("touchstart",e=>{

const t=e.touches[0];

startDrag({
clientX:t.clientX,
clientY:t.clientY
});

});

canvas.addEventListener("touchmove",e=>{

const t=e.touches[0];

dragDevice({
clientX:t.clientX,
clientY:t.clientY
});

e.preventDefault();

});

canvas.addEventListener("touchend",stopDrag);

}

function drawInteractive(){

const canvas=document.getElementById("topologyCanvas");

if(!canvas) return;

const ctx=canvas.getContext("2d");

ctx.clearRect(0,0,canvas.width,canvas.height);

// Gambar koneksi
connections.forEach(c=>{

ctx.beginPath();

ctx.moveTo(c.from.x,c.from.y);

ctx.lineTo(c.to.x,c.to.y);

ctx.strokeStyle="#00e5ff";
ctx.lineWidth=3;
ctx.stroke();

});

// Gambar device
devices.forEach(d=>{

ctx.beginPath();

ctx.arc(d.x,d.y,28,0,Math.PI*2);

switch(d.type){

case "router":
ctx.fillStyle="#ff9800";
break;

case "switch":
ctx.fillStyle="#00e5ff";
break;

case "server":
ctx.fillStyle="#4caf50";
break;

default:
ctx.fillStyle="#2196f3";

}

ctx.fill();

ctx.fillStyle="#fff";
ctx.font="13px Arial";
ctx.textAlign="center";
ctx.fillText(d.type.toUpperCase(),d.x,d.y+5);

});

}

function toggleConnectMode(){

connectMode=!connectMode;

alert(
connectMode
?"Connect Mode Aktif"
:"Connect Mode Nonaktif"
);

}

function saveTopology(){

localStorage.setItem(
"netforge_devices",
JSON.stringify(devices)
);

localStorage.setItem(
"netforge_connections",
JSON.stringify(connections)
);

alert("Topology berhasil disimpan!");

}

function loadTopology(){

const d=localStorage.getItem("netforge_devices");
const c=localStorage.getItem("netforge_connections");

if(d){

devices=JSON.parse(d);

}else{

devices=[];

}

if(c){

connections=JSON.parse(c);

}else{

connections=[];

}

drawInteractive();

alert("Topology berhasil dimuat!");

}

function exportTopology(){

const canvas=document.getElementById("topologyCanvas");

const link=document.createElement("a");

link.download="NetForge-Topology.png";

link.href=canvas.toDataURL("image/png");

link.click();

}

function loginNetForge(){

const name=document
.getElementById("username")
.value.trim();

if(name===""){
alert("Masukkan nama!");
return;
}

localStorage.setItem(
"netforge_user",
name
);

showUser();

}

function showUser(){

const user=
localStorage.getItem("netforge_user");

const modal=
document.getElementById("loginModal");

const welcome=
document.getElementById("welcomeUser");

if(user){

modal.style.display="none";

welcome.innerHTML=
"👋 Welcome, <b>"+user+"</b>";

}else{

modal.style.display="flex";

}

}

window.addEventListener(
"load",
showUser
);

function toggleProfileMenu(){

const menu=document.getElementById("profileDropdown");

if(!menu) return;

menu.classList.toggle("show");

}

function updateProfile(){

const user=localStorage.getItem("netforge_user");
const topbarUser=document.getElementById("topbarUser");

if(topbarUser){
    topbarUser.textContent=user || "User";
}

if(!user) return;

const name=document.getElementById("profileName");
const profileUser=document.getElementById("profileUserName");

if(name) name.textContent=user;

if(profileUser) profileUser.textContent=user;

}

function openSettings(){
const modal=document.getElementById("settingsModal");

if(!modal) return;

modal.classList.add("show");

const dropdown=document.getElementById("profileDropdown");

if(dropdown){
dropdown.classList.remove("show");
}
}

function closeSettings(){
const modal=document.getElementById("settingsModal");

if(modal){
modal.classList.remove("show");
}
}

window.addEventListener("load",updateProfile);

document.addEventListener("click",function(e){

const profile=document.querySelector(".profile-menu");

if(!profile) return;

if(!profile.contains(e.target)){

const dropdown=document.getElementById("profileDropdown");

if(dropdown){

dropdown.classList.remove("show");

}

}

});

function showToast(message,type="success"){

const container=
document.getElementById("toastContainer");

if(!container) return;

const toast=document.createElement("div");

toast.className=`toast ${type}`;

toast.textContent=message;

container.appendChild(toast);

setTimeout(()=>{

toast.style.opacity="0";
toast.style.transform="translateX(30px)";

setTimeout(()=>{
toast.remove();
},300);

},3000);

}

window.addEventListener("load",()=>{

setTimeout(()=>{
showToast("NetForge V3.1 aktif 🚀");
},500);

});

function updateActiveMenu(){

    const links=document.querySelectorAll(".sidebar a");
    const current=window.location.hash || "#dashboard";

    links.forEach(link=>{
        link.classList.remove("active");

        if(link.getAttribute("href")===current){
            link.classList.add("active");
        }
    });

}

window.addEventListener("hashchange",updateActiveMenu);
window.addEventListener("load",updateActiveMenu);


/* =========================================
   NETFORGE QUICK SEARCH
   ========================================= */

function searchNetForge(value){

  const query = value.trim().toLowerCase();

  if(!query) return;

  const targets = {
    dashboard:"#dashboard",
    monitor:"#monitor",
    tools:"#tools",
    networking:"#tools",
    ipv6:"#ipv6",
    vlsm:"#vlsm",
    routing:"#routing",
    topology:"#topology",
    traceroute:"#traceroute",
    dns:"#dns",
    whois:"#whois",
    scanner:"#portscanner",
    port:"#portscanner",
    terminal:"#terminal-section",
    about:"#about"
  };

  for(const key in targets){

    if(key.includes(query) || query.includes(key)){

      window.location.hash = targets[key];

      showToast(
        "Membuka " + key.toUpperCase()
      );

      return;
    }
  }

  showToast(
    "Fitur \"" + value + "\" tidak ditemukan",
    "error"
  );
}


/* =================================
   NETFORGE CTRL + K SEARCH
   ================================= */

document.addEventListener("keydown", function(e){

  if((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k"){

    e.preventDefault();
    e.stopPropagation();

    const search = document.querySelector(".nf-topbar-search input");

    if(search){
      search.focus();
      search.select();
    }

  }

});
