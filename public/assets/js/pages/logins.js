$.ajaxSetup({
    headers: { "Authorization":localStorage.getItem('userInfo') }
});

// User Regostration
$("#accept_terms_user").on("click", function() {
    if ($('#accept_terms_user:checkbox:checked').length == 0) {
        $(".frmRegiUserErr").show();
    } else {
        $(".frmRegiUserErr").hide();
    }
});

$("#frmUserRegi").validate({
    rules: {
        full_name: {
            required: true
        },
        email: {
            required: true,
            email: true
        },
        phone_number: {
            required: true,
            number:true,
            minlength:7,
            maxlength:11
        },
        password: {
            required: true,
            minlength:6
        },
    },

    messages: {
        full_name: {
            required: "Please Enter Full Name"
        },
        email: {
            required: "Please Enter Email"
        },
        phone_number: {
            required: "Please Enter Phone Number"
        },
        password: {
            required: "Please Enter Password"
        },
    },
    onfocusout: function (element, event) {
        $element = $(element);
        if ( $element.is(':input') && !$element.is(':password') ) {
            $element.val($.trim($element.val()));
        }
    },
    submitHandler: function (form) {

        if ($('#accept_terms_user:checkbox:checked').length == 0) {
            $(".frmRegiUserErr").text("Please agree to all Terms & Conditions");
            return false;
        } else {
            $(".frmRegiUserErr").text("");
        }

        $(".fa-userregi").show();
        $("#btnUserRegi").attr('disabled', 'disabled');

        var url_path = MAIN_URL_API+"api/register";
        
        $.ajax({
            type: "POST",
            url: url_path,
            data: $("#frmUserRegi").serialize(),
            dataType:"json",
            success: function (data) {

                if(data.user_id!=''){
                    localStorage.setItem('userInfo', data.token);
                    call_notify("Success","Registration Successfully","success");
                    $("#btnUserRegi").attr('disabled', false);
                    $(".fa-userregi").hide();
                    $("#frmUserRegi").trigger("reset");
                    $("#signupmodal").modal("hide");
                    setTimeout(function(){ 
                        window.location.reload();
                    }, 2000);
                }
                
            },
            error: function(data) {
                call_notify("Fail",data.responseJSON.message,"danger");
                $("#btnUserRegi").attr('disabled', false);
                $(".fa-userregi").hide();
            },
        });
        return false;

    }

});

$("#frmUserLogin").validate({
    rules: {
        email: {
            required: true,
            email: true
        },
        password: {
            required: true,
            minlength:6
        },
    },

    messages: {
        email: {
            required: "Please Enter Email"
        },
        password: {
            required: "Please Enter Password"
        },
    },
    onfocusout: function (element, event) {
        $element = $(element);
        if ( $element.is(':input') && !$element.is(':password') ) {
            $element.val($.trim($element.val()));
        }
    },
    submitHandler: function (form) {

        $(".fa-userlogin").show();
        $("#btnUserLogin").attr('disabled', 'disabled');

        var url_path = MAIN_URL_API+"api/login";
        
        $.ajax({
            type: "POST",
            url: url_path,
            data: $("#frmUserLogin").serialize(),
            dataType:"json",
            success: function (data) {

                if(data.user_id!=''){
                    localStorage.setItem('userInfo', data.token);
                    call_notify("Success","Login Successfully.....!","success");
                    $("#btnUserLogin").attr('disabled', false);
                    $(".fa-userlogin").hide();
                    $("#frmUserLogin").trigger("reset");
                    $("#loginmodal").modal("hide");
                    setTimeout(function(){ 
                        window.location.reload();
                    }, 2000);
                }
                
            },
            error: function(data) {
                call_notify("Fail",data.responseJSON.message,"danger");
                $("#btnUserLogin").attr('disabled', false);
                $(".fa-userlogin").hide();
            },
        });
        return false;

    }

});



// Agent Regostration
$("#accept_terms_agent").on("click", function() {
    if ($('#accept_terms_agent:checkbox:checked').length == 0) {
        $(".frmRegiAgentErr").show();
    } else {
        $(".frmRegiAgentErr").hide();
    }
});

$("#frmAgentRegi").validate({
    rules: {
        full_name: {
            required: true
        },
        email: {
            required: true,
            email: true
        },
        phone_number: {
            required: true,
            number:true,
            minlength:7,
            maxlength:11
        },
        password: {
            required: true,
            minlength:6
        },
    },

    messages: {
        full_name: {
            required: "Please Enter Full Name"
        },
        email: {
            required: "Please Enter Email"
        },
        phone_number: {
            required: "Please Enter Phone Number"
        },
        password: {
            required: "Please Enter Password"
        },
    },
    onfocusout: function (element, event) {
        $element = $(element);
        if ( $element.is(':input') && !$element.is(':password') ) {
            $element.val($.trim($element.val()));
        }
    },
    submitHandler: function (form) {

        if ($('#accept_terms_agent:checkbox:checked').length == 0) {
            $(".frmRegiAgentErr").text("Please agree to all Terms & Conditions");
            return false;
        } else {
            $(".frmRegiAgentErr").text("");
        }

        $(".fa-agentregi").show();
        $("#btnAgentRegi").attr('disabled', 'disabled');

        var url_path = MAIN_URL_API+"api/register";
        
        $.ajax({
            type: "POST",
            url: url_path,
            data: $("#frmAgentRegi").serialize(),
            dataType:"json",
            success: function (data) {

                if(data.user_id!=''){
                    localStorage.setItem('userInfo', data.token);
                    call_notify("Success","Registration Successfully","success");
                    $("#btnAgentRegi").attr('disabled', false);
                    $(".fa-agentregi").hide();
                    $("#frmAgentRegi").trigger("reset");
                    $("#signupmodal").modal("hide");
                    setTimeout(function(){ 
                        window.location.reload();
                    }, 2000);
                }
                
            },
            error: function(data) {
                call_notify("Fail",data.responseJSON.message,"danger");
                $("#btnAgentRegi").attr('disabled', false);
                $(".fa-agentregi").hide();
            },
        });
        return false;

    }

});

$("#frmAgentLogin").validate({
    rules: {
        email: {
            required: true,
            email: true
        },
        password: {
            required: true,
            minlength:6
        },
    },

    messages: {
        email: {
            required: "Please Enter Email"
        },
        password: {
            required: "Please Enter Password"
        },
    },
    onfocusout: function (element, event) {
        $element = $(element);
        if ( $element.is(':input') && !$element.is(':password') ) {
            $element.val($.trim($element.val()));
        }
    },
    submitHandler: function (form) {

        $(".fa-agentlogin").show();
        $("#btnAgentLogin").attr('disabled', 'disabled');

        var url_path = MAIN_URL_API+"api/login";
        
        $.ajax({
            type: "POST",
            url: url_path,
            data: $("#frmAgentLogin").serialize(),
            dataType:"json",
            success: function (data) {

                if(data.user_id!=''){
                    localStorage.setItem('userInfo', data.token);
                    call_notify("Success","Login Successfully.....!","success");
                    $("#btnAgentLogin").attr('disabled', false);
                    $(".fa-agentlogin").hide();
                    $("#frmAgentLogin").trigger("reset");
                    $("#loginmodal").modal("hide");
                    setTimeout(function(){ 
                        window.location.reload();
                    }, 2000);
                }
                
            },
            error: function(data) {
                call_notify("Fail",data.responseJSON.message,"danger");
                $("#btnAgentLogin").attr('disabled', false);
                $(".fa-agentlogin").hide();
            },
        });
        return false;

    }

});


$(".logout-click").on("click",function(){
    $.ajax({
        type: "POST",
        url: MAIN_URL_API+"api/logout",
        dataType:"json",
        success: function (data) {
            if(data.status==1){
             localStorage.removeItem('userInfo');
             call_notify("Success","Logout Successfully...!","success");
             window.location = window.location.href.split("?")[0];

             setTimeout(function(){ 
                window.location.reload();
            }, 2000);

         }

     },
     error: function(data) {
        call_notify("Fail",data.responseJSON.message,"danger");
    },
});

});


$("#frmProfile").validate({
    rules: {
        full_name: {
            required: true,
        },
    },

    messages: {
        full_name: {
            required: "Please Enter Full Name"
        },
    },
    onfocusout: function (element, event) {
        $element = $(element);
        if ( $element.is(':input') && !$element.is(':password') ) {
            $element.val($.trim($element.val()));
        }
    },
    submitHandler: function (form) {

        $(".fa-profile").show();
        $("#btnProfile").attr('disabled', 'disabled');

        var url_path = MAIN_URL_API+"api/profile";
        
        $.ajax({
            type: "POST",
            url: url_path,
            data: $("#frmProfile").serialize(),
            dataType:"json",
            success: function (data) {

                if(data.user_id!=''){
                    call_notify("Success","Profile Updated Successfully.....!","success");
                    $("#btnProfile").attr('disabled', false);
                    $(".fa-profile").hide();
                    $("#editprofilemodal").modal("hide");
                    call_main();
                }
                
            },
            error: function(data) {
                call_notify("Fail",data.responseJSON.message,"danger");
                $("#btnProfile").attr('disabled', false);
                $(".fa-profile").hide();
            },
        });
        return false;

    }

});


$("#frmChangePassword").validate({
    rules: {
        current_password: {
            required: true,
            minlength:6
        },
        new_password: {
            required: true,
            minlength:6
        },
    },

    messages: {
        current_password: {
            required: "Please Enter Current Password"
        },
        new_password: {
            required: "Please Enter New Password"
        },
    },
    onfocusout: function (element, event) {
        $element = $(element);
        if ( $element.is(':input') && !$element.is(':password') ) {
            $element.val($.trim($element.val()));
        }
    },
    submitHandler: function (form) {

        $(".fa-changepass").show();
        $("#btnChangePassword").attr('disabled', 'disabled');

        var url_path = MAIN_URL_API+"api/change-password";
        
        $.ajax({
            type: "POST",
            url: url_path,
            data: $("#frmChangePassword").serialize(),
            dataType:"json",
            success: function (data) {

                if(data.user_id!=''){
                    call_notify("Success","Password Changed Successfully.....!","success");
                    $("#btnChangePassword").attr('disabled', false);
                    $(".fa-changepass").hide();
                    $("#changepasswordmodal").modal("hide");
                }
                
            },
            error: function(data) {
                call_notify("Fail",data.responseJSON.message,"danger");
                $("#btnChangePassword").attr('disabled', false);
                $(".fa-changepass").hide();
            },
        });
        return false;

    }

});

$("#frmUserForgot").validate({
    rules: {
        phone_number: {
            required: true,
        }
    },

    messages: {
        phone_number: {
            required: "Please Enter Mobile number"
        }
    },
    onfocusout: function (element, event) {
        $element = $(element);
        if ( $element.is(':input') && !$element.is(':password') ) {
            $element.val($.trim($element.val()));
        }
    },
    submitHandler: function (form) {

        $(".fa-userforgot").show();
        $("#btnUserfogot").attr('disabled', true);

        var url_path = MAIN_URL_API+"api/forgotpassword";
        
        $.ajax({
            type: "POST",
            url: url_path,
            data: $("#frmUserForgot").serialize(),
            dataType:"json",
            success: function (data) {

                if(data.user_id!=''){
                    call_notify("Success","OTP Send Successfully","success");
                    $(".otptextusers").removeClass('d-none');
                    $("#btnUserfogot").attr('disabled', true);
                    $(".fa-userforgot").hide();
                    $("#btnUserfogot").text('Verify OTP');
                    $("#btnUserfogot").attr('type','button');
                    $("#btnUserfogot").attr('id','btnUserfogot1');
                }
                
            },
            error: function(data) {
                call_notify("Fail",data.responseJSON.message,"danger");
                $("#btnUserfogot").attr('disabled', false);
                $(".fa-userforgot").hide();
            },
        });
        return false;

    }

});

$("#btnresendOTPuserForgot").click(function(){
    $("#frmUserForgot").submit();
})



$(".otp-inputbaruser").on("keyup keydown keypress", function (e) {
    var  count = 0;
    $(".otp-inputbaruser").each(function(){
        if($(this).val()!="")
            count++;
    })
    if(count == 6){
        $("#btnUserfogot1").attr('disabled', false);
    } else {
        $("#btnUserfogot1").attr('disabled', true);
    }
});

$(document).on("click","#btnUserfogot2",function(){
    var url_path = MAIN_URL_API+"api/resetPassword";
    $.ajax({
        type: "POST",
        url: url_path,
        data: {
            phone_number:$("#frmUserForgot").find("#phone_number").val(),
            type:"1",
            password:$("#frmUserForgot").find("#password").val()
        },
        dataType:"json",
        success: function (data) {

            if(data.user_id!=''){
                $(".otptextusers").hide();
                $(".newpassworduser").removeClass('d-none')
                $("#forgotmodal").modal('hide');
                call_notify("Success","Password Reset Successfully","success");
                setTimeout(function(){
                    window.location.reload();
                },500)
            }
        },
        error: function(data) {
            call_notify("Fail",data.responseJSON.message,"danger");
            $(".fa-changepass").hide();
        },
    });
});
$(document).on("click","#btnUserfogot1",function(){
    var url_path = MAIN_URL_API+"api/verifyOTP";
    var  otp = "";
    $(".otp-inputbaruser").each(function(){
        otp  = otp + $(this).val().toString();
    })
    $.ajax({
        type: "POST",
        url: url_path,
        data: {
            phone_number:$("#frmUserForgot").find("#phone_number").val(),
            type:"1",
            otp:otp
        },
        dataType:"json",
        success: function (data) {

            if(data.user_id!=''){
                $(".otptextusers").hide()
                $(".newpassworduser").removeClass('d-none')
                call_notify("Success","OTP Verify Successfully","success");
                $("#btnUserfogot1").text('Reset Password');
                $("#btnUserfogot1").attr('id','btnUserfogot2');
                $(".textuserphonenumber").hide()
            }

        },
        error: function(data) {
            call_notify("Fail",data.responseJSON.message,"danger");
            $(".fa-changepass").hide();
        },
    });
});


// agent reset 
$("#frmAgentFotgot").validate({
    rules: {
        phone_number: {
            required: true,
        }
    },

    messages: {
        phone_number: {
            required: "Please Enter Mobile number"
        }
    },
    onfocusout: function (element, event) {
        $element = $(element);
        if ( $element.is(':input') && !$element.is(':password') ) {
            $element.val($.trim($element.val()));
        }
    },
    submitHandler: function (form) {

        $(".fa-agforgot").show();
        $("#btnAgentfogot").attr('disabled', true);

        var url_path = MAIN_URL_API+"api/forgotpassword";
        $.ajax({
            type: "POST",
            url: url_path,
            data: $("#frmAgentFotgot").serialize(),
            dataType:"json",
            success: function (data) {

                if(data.user_id!=''){
                    call_notify("Success","OTP Send Successfully","success");
                    $(".otptextag").removeClass('d-none');
                    $("#btnAgentfogot").attr('disabled', true);
                    $(".fa-agforgot").hide();
                    $("#btnAgentfogot").text('Verify OTP');
                    $("#btnAgentfogot").attr('type','button');
                    $("#btnAgentfogot").attr('id','btnAgentfogot1');
                }
                
            },
            error: function(data) {
                call_notify("Fail",data.responseJSON.message,"danger");
                $("#btnAgentfogot").attr('disabled', false);
                $(".fa-agforgot").hide();
            },
        });
        return false;

    }

});

$("#btnresendOTPagForgot").click(function(){
    $("#frmAgentFotgot").submit();
})


$(".otp-inputbarag").on("keyup keydown keypress", function (e) {
    var  count = 0;
    $(".otp-inputbarag").each(function(){
        if($(this).val()!="")
            count++;
    })
    if(count == 6){
        $("#btnAgentfogot1").attr('disabled', false);
    } else {
        $("#btnAgentfogot1").attr('disabled', true);
    }
});

$(document).on("click","#btnAgentfogot2",function(){
    var url_path = MAIN_URL_API+"api/resetPassword";
    $.ajax({
        type: "POST",
        url: url_path,
        data: {
            phone_number:$("#frmAgentFotgot").find("#phone_number").val(),
            type:"2",
            password:$("#frmAgentFotgot").find("#password").val()
        },
        dataType:"json",
        success: function (data) {

            if(data.user_id!=''){
                $(".otptextag").hide();
                $(".newpasswordag").removeClass('d-none')
                $("#forgotmodal").modal('hide');
                call_notify("Success","Password Reset Successfully","success");
                setTimeout(function(){
                    window.location.reload();
                },500)
            }
        },
        error: function(data) {
            call_notify("Fail",data.responseJSON.message,"danger");
            $(".fa-changepass").hide();
        },
    });
});

$(document).on("click","#btnAgentfogot1",function(){
    var url_path = MAIN_URL_API+"api/verifyOTP";
    var  otp = "";
    $(".otp-inputbarag").each(function(){
        otp  = otp + $(this).val().toString();
    })
    $.ajax({
        type: "POST",
        url: url_path,
        data: {
            phone_number:$("#frmAgentFotgot").find("#phone_number").val(),
            type:"2",
            otp:otp
        },
        dataType:"json",
        success: function (data) {

            if(data.user_id!=''){
                $(".otptextag").hide()
                $(".newpasswordag").removeClass('d-none')
                call_notify("Success","OTP Verify Successfully","success");
                $("#btnAgentfogot1").text('Reset Password');
                $("#btnAgentfogot1").attr('id','btnAgentfogot2');
                $(".textagphonenumber").hide()
            }

        },
        error: function(data) {
            call_notify("Fail",data.responseJSON.message,"danger");
            $(".fa-changepass").hide();
        },
    });
});
