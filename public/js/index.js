/* Gets provoked every alternate time toggle switch is clicked*/
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}
/* Gets provoked every alternate time toggle switch is clicked*/
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
$(document).ready(function(){
    var tsclick = 0;   //Click flag
    $(".pmessage").html('');
    $(".toggle-switch").click(function(){
        this.classList.toggle("change");
        if(tsclick === 0){
            tsclick = 1;
            openNav();
        }
        else if(tsclick == 1){
            tsclick = 0;
            closeNav();
        }
    });
    $(".rest").click(function(){
        if(tsclick == 1){
            tsclick = 0;
            closeNav();
        }
    });
    
//Show password feature
    $(".showhide").click(function(e){
        if($(".showhide").prop('checked') == true){
            $("#password_input").attr('type', 'text');
        }else 
        if($(".showhide").prop('checked') == false){
            $("#password_input").attr('type', 'password');
        }
    });
//Make Form available for editing
$(".editUser").click(function(e){
    $(".pmessage").html('Details are now available for editing.');
    $(".updatebtn").css('display', 'block');
    $(".decryptForEdit").prop('readonly',false);
});
$(".rest").click(function(){
    if(tsclick == 1){
        tsclick = 0;
        closeNav();
  }
});
});