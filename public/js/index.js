function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
   // document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  //  document.getElementById("main").style.marginLeft= "0";
}
$(document).ready(function(){
    var click = 0;
    $(".toggle-switch").click(function(){
        this.classList.toggle("change");
        if(click === 0){
            click = 1;
            openNav();
        }
        else if(click == 1){
            click = 0;
            closeNav();
        }
    });
});