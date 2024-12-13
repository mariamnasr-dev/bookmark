var siteName = document.getElementById("siteName")
var siteUrl = document.getElementById("siteUrl")
var allSites = [] ;
 var mainButton = document.getElementById("subnitBtn")
if (localStorage.getItem("sites")!== null) {
    allSites =JSON.parse(localStorage.getItem("sites"));
    displayData();
}

function addwebsite() {
    if (allValidation(siteName ,'alertName') && allValidation(siteUrl ,'alertUrl') ) {
        var website = {
            name:siteName.value,
            url: siteUrl.value,
        };
      allSites.push(website);
      localStorage.setItem("sites" , JSON.stringify(allSites))
      displayData()
      clearData()
      console.log(allSites)  
    }else{
       
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#">Why do I have this issue?</a>'
          })
       
    }
 
}
mainButton.addEventListener("click",function(){
    addwebsite()
})
function clearData() {
    siteName.value = ""
    siteUrl.value = ""
    siteName.classList.remove("is-valid") ;
    siteUrl.classList.remove("is-valid") ;
}


function displayData(){
    var cartona = "" ;
    for (var i =0 ;i < allSites.length ; i++){
        cartona += `
        <tr>
          <td>${i}</td>
          <td>${allSites[i].name}</td>
          <td><button  onclick="visiteSite(${[i]})"class="btn btn-outline-success btn-sm">visit</button></td>
          <td><button  onclick="deleteForm(${[i]})" class="btn btn-outline-danger btn-sm">delete</button></td>
        </tr>
        `
    }
    document.getElementById("tableData").innerHTML= cartona
}
function deleteForm(index) {
    allSites.splice(index,1);
    displayData()
    localStorage.setItem("sites" , JSON.stringify(allSites))
}

function visiteSite(index){
    window.open(allSites[index].url , "_blank")
}
function allValidation(element , msgId) {
    var msg =document.getElementById(msgId);
    var regax = {
        siteName:/^[A-Z][a-z]{3,9}$/ ,
    
        siteUrl:/^(https?|ftp):\/\/(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i 
    }
    if (regax[element.id].test(element.value) == true) {
       element.classList.add("is-valid") ;
       element.classList.remove("is-invalid") ;
       msg.classList.add("d-none") ;
       return true ;
    }else{
        element.classList.add("is-invalid") ;
        element.classList.remove("is-valid") ; 
        msg.classList.remove("d-none") ;
        return false ;
    }
}