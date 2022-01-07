var property_image_arr = [];
var property_rm_image_arr = [];

$("#frmAddProperty").validate({
    rules: {
        property_type_id: {
            required: true
        },
        land_size: {
            required: true
        },
        property_price: {
            required: true
        },
    },

    messages: {
        property_type_id: {
            required: "Please Select Property Type"
        },
        land_size: {
            required: "Please Enter Land Size"
        },
        property_price: {
            required: "Please Enter Property Price"
        },
    },
    onfocusout: function (element, event) {
        $element = $(element);
        if ( $element.is(':input') && !$element.is(':password') ) {
            $element.val($.trim($element.val()));
        }
      },
    submitHandler: function (form) {

        if(property_image_arr.length>0){
            $("#images").val(property_image_arr.toString());
        }
        if(property_rm_image_arr.length>0){
            $("#deleted_media").val(property_rm_image_arr.toString());
        }

      
        if(property_image_arr.length==0 || ($("#vidoes").val()=='' && $("#videos").val()==undefined)){
            if(is_property==1){
                call_notify("Fail","Please select Video or Images","danger");
                return false;
            }else{
                if($("#deleted_media").val()!=''){
                    call_notify("Fail","Please select Video or Images","danger");
                    return false;
                }
            }

        }

        $(".fa-add-property").show();
        $("#btnAddProperty").attr('disabled', 'disabled');

        if(is_property==1){
            var url_path = MAIN_URL_API+"api/add-property";
        }else{
            var url_path = MAIN_URL_API+"api/property-update";
        }
        $.ajax({
            type: "POST",
            url: url_path,
            data: $('#frmAddProperty').serialize(),
            dataType:"json",
            success: function (data) {

                if(data.property_id!=''){
                    if(is_property==1){
                    call_notify("Success","Property Added Successfully.....!","success");
                    }else{
                        call_notify("Success","Property Updated Successfully.....!","success");
                    }
                    setTimeout(function(){ 
                        window.location.href="/my-properties";
                    }, 2000);
                    
                }
                
            },
            error: function(data) {
                call_notify("Fail",data.responseJSON.message,"danger");
                $("#btnAddProperty").attr('disabled', false);
                $(".fa-add-property").hide();
            },
        });
        return false;

    }

});

$(".addprop-first").on("click",function(){
    if($("#property_type_id").val()==''){
        call_notify("Fail","Please Select Property Type","danger");
        return false;
    }
    if($("#land_size").val()==''){
        call_notify("Fail","Please Enter Land Size","danger");
        return false;
    }
    if($("#property_price").val()==''){
        call_notify("Fail","Please Enter Property Price","danger");
        return false;
    }
    if($("#searchTextField").val()==''){
        call_notify("Fail","Please Select Location","danger");
        return false;
    }
    call_nrext();

    $.ajax({
        type: "POST",
        url: MAIN_URL_API+"api/property-features",
        dataType:"json",
        success: function (data) {
            
            var htm = '';
            if(is_property==2){
                var outdoor_old = $("#outdoor_features").val();
                var outdoor_arr = outdoor_old.split(',');
            }
    
            for(var i=0;i<data.outdoor_features.length;i++){
                var checked = "";
                if(is_property==2){
                    if(jQuery.inArray(data.outdoor_features[i]['property_outdoor_id'].toString(), outdoor_arr) != -1) {
                        checked = "checked";
                    }
                }

                htm+='<div class="custom-control custom-checkbox mb-4 outdoor-list">';
                htm+='<input type="checkbox" class="custom-control-input" name="doutdoor[]" id="outcheck'+i+'" value="'+data.outdoor_features[i]['property_outdoor_id']+'" '+checked+' >';
                htm+='<label class="custom-control-label" for="outcheck'+i+'">'+data.outdoor_features[i]['name']+'</label>';
                htm+='</div>';
            }

            var htm2 = '';
            if(is_property==2){
                var indoor_old = $("#indoor_features").val();
                var indoor_arr = indoor_old.split(',');
            }
            for(var i=0;i<data.intdoor_features.length;i++){
                var checked = "";
                if(is_property==2){
                    if(jQuery.inArray(data.intdoor_features[i]['property_indoor_id'].toString(), indoor_arr) != -1) {
                        checked = "checked";
                    }
                }
                htm2+='<div class="custom-control custom-checkbox mb-4 indoor-list">';
                htm2+='<input type="checkbox" class="custom-control-input" name="indoor[]" id="indcheck'+i+'" value="'+data.intdoor_features[i]['property_indoor_id']+'" '+checked+' >';
                htm2+='<label class="custom-control-label" for="indcheck'+i+'">'+data.intdoor_features[i]['name']+'</label>';
                htm2+='</div>';
            }

            var htm3 = '';
            if(is_property==2){
                var climate_control_energy_old = $("#climate_control_energy").val();
                var climate_control_energy_arr = climate_control_energy_old.split(',');
            }
            for(var i=0;i<data.climate_control_and_energy.length;i++){
                var checked = "";
                if(is_property==2){
                    if(jQuery.inArray(data.climate_control_and_energy[i]['property_climate_control_energy_id'].toString(), climate_control_energy_arr) != -1) {
                        checked = "checked";
                    }
                }
                htm3+='<div class="custom-control custom-checkbox mb-4 climate-list">';
                htm3+='<input type="checkbox" class="custom-control-input" name="climate[]" id="climatecheck'+i+'" value="'+data.climate_control_and_energy[i]['property_climate_control_energy_id']+'" '+checked+' >';
                htm3+='<label class="custom-control-label" for="climatecheck'+i+'">'+data.climate_control_and_energy[i]['name']+'</label>';
                htm3+='</div>';
            }

            $(".outdoor-feature-view").html(htm);
            $(".indoor-feature-view").html(htm2);
            $(".climate-control-and-energy-view").html(htm3);

        },
        error: function(data) {
            call_notify("Fail",data.responseJSON.message,"danger");
        },
    });

});

$(".addprop-second").on("click",function(){

    // iundoor
    var outdoor_arr = [];
    var no=0;
    $('.outdoor-list').each(function () {
        if($("#outcheck"+no).is(':checked')){
            outdoor_arr.push($("#outcheck"+no).val());
        }
        no++;
    });
    if(outdoor_arr.length>0){
        $("#outdoor_features").val(outdoor_arr.toString());
    }
    
    //outdoor
    var indoor_arr = [];
    var no=0;
    $('.indoor-list').each(function () {
        if($("#indcheck"+no).is(':checked')){
            indoor_arr.push($("#indcheck"+no).val());
        }
        no++;
    });
    if(indoor_arr.length>0){
        $("#indoor_features").val(indoor_arr.toString());
    }

    //climate
    var climate_arr = [];
    var no=0;
    $('.climate-list').each(function () {
        if($("#climatecheck"+no).is(':checked')){
            climate_arr.push($("#climatecheck"+no).val());
        }
        no++;
    });
    if(climate_arr.length>0){
        $("#climate_control_energy").val(climate_arr.toString());
    }
    call_nrext();
});

function call_nrext(){
    var $active = $('.wizard .nav-tabs li a.active');
    $active.parent().next().children().removeClass('disabled');
    $active.parent().addClass('done');
    nextTab($active);
}

function load_image(input){

    formData = new FormData();
    formData.append('type', '1');
    formData.append('media', $('.photoinputfile')[0].files[0]);

    $.ajax({
        type: "POST",
        url: MAIN_URL_API+"api/add-property-media",
        data:formData,
        cache:false,
        contentType: false,
        processData: false,
        dataType:"json",
        success: function (response) {
            var htm = '';
            htm+='<div class="col-md-6">';
            htm+='<div class="photos-images-preview">';
            htm+='<img src="'+response.url+'" alt="" />';
            htm+='<button type="button" class="photoremove" data-image="'+response.filepath_url+'"><i class="feather icon-x"></i></button>';
            htm+='</div>';
            htm+='</div>';

            property_image_arr.push(response.filepath_url);

            $(".show-selected-images").append(htm);

        },
        error: function(data) {
            call_notify("Fail",data.responseJSON.message,"danger");
        },
    });
}

function load_video(input){

    formData = new FormData();
    formData.append('type', '2');
    formData.append('media', $('.videoinputfile')[0].files[0]);

    $.ajax({
        type: "POST",
        url: MAIN_URL_API+"api/add-property-media",
        data:formData,
        cache:false,
        contentType: false,
        processData: false,
        dataType:"json",
        success: function (response) {
            
            $(".bg-video-box").removeClass("d-none");
            $("#videosrc").attr("src",response.url);
            $("#rmvideo").val(response.filepath_url);

            //$("#videos").val(response.filepath_url+','+response.filepath_thumbnail);
            $("#videos").val('a.png,b.png');
        },
        error: function(data) {
            call_notify("Fail",data.responseJSON.message,"danger");
        },
    });
}

$(document).on("click",".photoremove",function(){
    var image = $(this).data("image");
    property_rm_image_arr.push(image);
    $(this).parent().parent().remove();

    property_image_arr.remove(image);

});

$(document).on("click",".videoremove",function(){
    var image = $("#rmvideo").val();
    property_rm_image_arr.push(image);
    property_image_arr.remove(image);
});

Array.prototype.remove = function() {
    var what, a = arguments,
        L = a.length,
        ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

$(document).ready(function(){
    if(is_property==2){
        $.ajax({
            type: "POST",
            url: MAIN_URL_API+"api/property-view",
            data:{
                property_id:$("#property_id").val()
            },
            dataType:"json",
            success: function (data) {

                
                if(data.property_is_for==1){
                    $("#filtercheck1").prop("checked","checked");
                }else if(data.property_is_for==2){
                    $("#filtercheck2").prop("checked","checked");
                }else{
                    $("#filtercheck3").prop("checked","checked");
                }

                if(data.property_is==1){
                    $("#newprops1").prop("checked","checked");
                }else{
                    $("#newprops2").prop("checked","checked");
                }

                $("#property_type_id").val(data.property_type_id);
                $("#land_size").val(data.land_size);
                $("#property_price").val(data.property_price);

                $("input[name='bedrooms']").val(data.bedrooms);
                $("input[name='bathrooms']").val(data.bathrooms);
                $("input[name='car_spaces']").val(data.car_spaces);

                $("#searchTextField").val(data.location);
                $("#lattitudevv").val(data.lattitude);
                $("#longitude").val(data.longitude);

                var outdoor_arr = [];
                if(data.outdoor_features.length>0){
                    for(var i=0;i<data.outdoor_features.length;i++){
                        outdoor_arr.push(data.outdoor_features[i]['property_outdoor_id']);
                    }
                    $("#outdoor_features").val(outdoor_arr.toString());
                }

                var indoor_arr = [];
                if(data.intdoor_features.length>0){
                    for(var i=0;i<data.intdoor_features.length;i++){
                        indoor_arr.push(data.intdoor_features[i]['property_indoor_id']);
                    }
                    $("#indoor_features").val(indoor_arr.toString());
                }

                var climates_arr = [];
                if(data.climate_control_energy.length>0){
                    for(var i=0;i<data.climate_control_energy.length;i++){
                        climates_arr.push(data.climate_control_energy[i]['property_climate_control_energy_id']);
                    }
                    $("#climate_control_energy").val(climates_arr.toString());
                }


                if(data.images.length>0){
                    var htm = '';
                    for(var i=0;i<data.images.length;i++){
                        htm+='<div class="col-md-6">';
                        htm+='<div class="photos-images-preview">';
                        htm+='<img src="'+data.images[i]['url']+'" alt="" />';
                        htm+='<button type="button" class="photoremove" data-image="'+data.images[i]['filepath_url']+'"><i class="feather icon-x"></i></button>';
                        htm+='</div>';
                        htm+='</div>';
                    }
                    $(".show-selected-images").append(htm);
                }

                if(data.videos.length>0){
                    $(".bg-video-box").removeClass("d-none");
                    var htm='';
                    htm+='<video class="videopreview" controls="">';
                    htm+='<source src="'+data.videos[0]['url']+'" id="videosrc" class="videosrc">';
                    htm+='</video>';
                    $(".modal-video").html(htm);
                }

            },
            error: function(data) {
                call_notify("Fail",data.message,"danger");
            },
        });
    }
});