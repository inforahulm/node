call_my_property_list();

function call_my_property_list() {

    var property_is_for = $("#property_is_for").val();
    $.ajax({
        type: "POST",
        url: MAIN_URL_API + "api/my-property",
        data: {
            property_is_for: property_is_for,
        },
        dataType: "json",
        success: function (data) {
            var htm = '';

            if(data.length>0){
            for (var i = 0; i < data.length; i++) {

               

                if (data[i]['property_is_for'] == 1) {
                    var property_is_for = 'buy';
                } else if (data[i]['property_is_for'] == 2) {
                    var property_is_for = 'rent';
                } else {
                    var property_is_for = 'share';
                }
                

                htm+='<div class="p-tabs-list-row">';
                htm+='<div class="p-tabs-list-left p-row-listslider owl-carousel">';
                if (data[i]['images'].length > 0) {
                    for (var j = 0; j < data[i]['images'].length; j++) {
                        htm += '<div class="p-list-item">';
                        htm += '<img src="' + data[i]['images'][j]['url'] + '" class="img-fluid" alt="">';
                        htm += '</div>';
                    }
                } else {
                    htm += '<div class="p-list-item">';
                    htm += '<img src="/assets/images/placeholder.png" class="img-fluid" alt="">';
                    htm += '</div>';
                }
                htm+='</div>';
                htm+='<div class="p-tabs-list-right">';
                htm+='<h5>' + CURRENCY + ' ' + data[i]['property_price'] + '</h5>';
                htm+='<p><span class="material-icons-outlined">place</span>' + data[i]['location'] + '</p>';
                htm+='<ul class="p-items">';
                htm+='<li>';
                htm+='<em><img src="/assets/images/home.svg" class="img-fluid" alt=""></em>';
                htm+='<span>' + data[i]['land_size'] + '</span>';
                htm+='</li>';
                htm+='<li>';
                htm+='<em><img src="/assets/images/bed.svg" class="img-fluid" alt=""></em>';
                htm+='<span>' + data[i]['bedrooms'] + '</span>';
                htm+='</li>';
                htm+='<li>';
                htm+='<em><img src="/assets/images/bath.svg" class="img-fluid" alt=""></em>';
                htm+='<span>' + data[i]['bathrooms'] + '</span>';
                htm+='</li>';
                htm+='<li>';
                htm+='<em><img src="/assets/images/sedan.svg" class="img-fluid" alt=""></em>';
                htm+='<span>' + data[i]['car_spaces'] + '</span>';
                htm+='</li>';
                htm+='</ul>';
                htm+='<div class="p-tabs-list-bm">';
                htm+='<a href="/properties/' + property_is_for + '/' + data[i]['property_code'] + '" class="p-list-detail"><span class="material-icons-outlined mr-2 align-middle">visibility</span>Detail</a>';
                htm+='<ul class="d-flex">';
                htm+='<li><a href="/edit-property/' + data[i]['property_code'] + '" class="p_edit_btn"><span class="material-icons-outlined">drive_file_rename_outline</span></a></li>';
                htm+='<li><a href="javascript:;" class="p_del_btn property-delete" data-id="'+data[i]['property_id']+'"><span class="material-icons-outlined">delete</span></a></li>';
                htm+='</ul>';
                htm+='</div>';
                htm+='</div>';
                htm+='</div>';
                
                setTimeout(function () {
                    $('.p-row-listslider').owlCarousel({
                        loop: false,
                        margin: 5,
                        nav: true,
                        items: 1,
                        navText: ['<span class="material-icons-outlined">chevron_left</span>', '<span class="material-icons-outlined">chevron_right</span>']
                    });
                }, 1000);

            }
        }else{
            htm += '<div class="no-pro-found"><img src="/assets/images/no-properties.png" alt="" /> <h6>No Properties Found.</h6></div>';
        }

            $(".my-property-list-call").html(htm);
            $(".pro_listed_count").html(data.length);
          
        },
        error: function (data) {
            call_notify("Fail", data.responseJSON.message, "danger");
        },
    });
}

