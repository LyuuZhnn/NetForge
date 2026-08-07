function login(){

const username=document.getElementById("username").value.trim();
const kelas=document.getElementById("kelas").value.trim();
const role=document.getElementById("role").value;

if(username===""||kelas===""){

alert("Username dan Kelas wajib diisi!");
return;

}

localStorage.setItem("netforge_username",username);
localStorage.setItem("netforge_kelas",kelas);
localStorage.setItem("netforge_role",role);

window.location.href="index.html";

}
