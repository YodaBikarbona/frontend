$(document).ready(function () {
    $("#show-list-of-faculties").click(function () {
        if ($("#faculty-info-content").css("display") == "block") {
            $("#faculty-info-content").fadeOut();
        }
        else {
            $("#faculty-info-content").fadeIn();
        }
        if ($("#facultyadd-form").css("display") == "block") {
            $("#facultyadd-form").hide();
        }
        if ($("#delete-prompt").css("display") == 'block') {
            $("#delete-prompt").hide();
        }
        if ($("#update-form").css("display") == 'block') {
            $("#update-form").hide();
        }
    });
    
    $("#open-facultyadd-form").click(function () {
        if ($("#delete-prompt").css("display") == 'block') {
            $("#delete-prompt").hide();
        }
        if ($("#update-form").css("display") == 'block') {
            $("#update-form").hide();
        }
        $("#facultyadd-form").fadeIn();
    });
    $("#close-facultyadd-form").click(function(){
        $("#facultyadd-form").fadeOut();
    });

    $(document).on("click", '#faculty-list-table .delete-button-prompt', function () {
        if ($("#update-form").css("display") == 'block') {
            $("#update-form").fadeOut();
        }
        if($("#facultyadd-form").css("display") == 'block'){
            $("#facultyadd-form").fadeOut();
        }
        $("#delete-prompt").fadeIn();
    });
    $("#hide-delete-prompt").click(function () {
        $("#delete-prompt").fadeOut();
    });

   $("#close-delete-prompt").click(function () {
        $("#delete-prompt").fadeOut();
    });

    $(document).on("click", "#faculty-list-table #open-update-form", function () {
        if ($("#delete-prompt").css("display") == 'block') {
            $("#delete-prompt").fadeOut();
        }
        if($("#facultyadd-form").css("display") == 'block'){
            $("#facultyadd-form").fadeOut();
        }
        $("#update-form").fadeIn();

    });
    $("#close-update-form").click(function () {
        $("#update-form").fadeOut();
    });
    $("#close-updateform-onSubmit").click(function () {
        $("#update-form").fadeOut();
    });
   
});

