
function call_notify(title,messages,types){
    var icons = '';
    if(types=='success'){
        var icons = 'fas fa-check';
    }else{
        var icons = 'fas fa-exclamation-triangle';
    }
    $.notify(
    {
        title: "<strong>"+title+"</strong>",
        message: "<br>"+messages,
        icon: icons,
    },
    {
        type: types,
        allow_dismiss: true,
        delay: 3000,
        placement: {
          from: "top",
          align: "right"
      },
  }
  );
}

if($(location).attr('pathname')=='/'){
    $(".header-wrapper").addClass("home-header");
}

var route = $(location).attr('pathname').split('/');
if(route[1]=='news'){
    $("ul.d-xl-flex li").removeClass("active");
    $(".news-page").addClass("active");
}
if(route[1]=='chats'){
    $("ul.d-xl-flex li").removeClass("active");
    $(".chats-page").addClass("active");
}
if(route[1]=='properties'){
    if(route[2]=='buy'){
        $("ul.d-xl-flex li").removeClass("active");
        $(".property-buy-page").addClass("active");
    }else if(route[2]=='rent'){
        $("ul.d-xl-flex li").removeClass("active");
        $(".property-rent-page").addClass("active");
    }else if(route[2]=='share'){
        $("ul.d-xl-flex li").removeClass("active");
        $(".property-share-page").addClass("active");
    }
}


$("#frmNewsletter").validate({
    rules: {
        email: {
            required: true,
            email: true
        },
    },

    messages: {
        email: {
            required: "Please Enter Email"
        },
    },

    submitHandler: function (form) {

        $(".fa-newsleter").show();
        $("#btnNewsletter").attr('disabled', 'disabled');

        var url_path = "/add-newsletter";
        $.ajax({
            type: "POST",
            url: url_path,
            data: $("#frmNewsletter").serialize(),
            dataType:"json",
            success: function (data) {
                if(data.message.status==1){
                 $("#btnNewsletter").attr('disabled', false);
                 $(".fa-newsleter").hide();
                 $("#frmNewsletter").trigger("reset");
                 $(".newsletter-err").hide();

                 call_notify("Success",data.message.message,"success");


             }else{
                $("#btnNewsletter").attr('disabled', false);
                $(".fa-newsleter").hide();
                $(".newsletter-err").show();
                $(".newsletter-err").html(data.message.message);
            }

        }
    });
        return false;

    }

});


var locationValue = (new URL(location.href)).searchParams.get('valid'); 
if(locationValue != null)
{
    localStorage.setItem('userInfo', locationValue);
}

var login_token = localStorage.getItem('userInfo');

if(login_token==null){
    $(".without-login").show();
    $(".with-login").hide();
}else{
    $(".without-login").hide();
    $(".with-login").show();

    call_main();

}

function call_main(){
    $.ajax({
        type: "GET",
        url: MAIN_URL_API+"api/get-user-profile",
        dataType:"json",
        headers: {
            "Authorization":localStorage.getItem('userInfo'),
        },
        success: function (data) {
            if(data.user_id!=''){

                $(".set-user-name").text(data.full_name);
                $(".set-user-email").text(data.email);
                $(".set-value-user-name").val(data.full_name);

                if(data.url!='' && data.url!=null){
                    $(".profile-pic").attr("src",data.url);
                }

                if(data.is_session==1){
                    localStorage.removeItem('userInfo');
                    window.location.reload();
                }

            }

        },
        error: function(data,textStatus, xhr) {
            if(data.status == 401) {
               localStorage.removeItem('userInfo');
               window.location.reload();
           }
           call_notify("Fail",data.responseJSON.message,"danger");
       },
   });
}


