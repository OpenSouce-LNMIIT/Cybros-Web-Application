/* Gets provoked every alternate time toggle switch is clicked*/
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}
/* Gets provoked every alternate time toggle switch is clicked*/
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
$(document).ready(function(){
    var click = 0;   //Click flag
    
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