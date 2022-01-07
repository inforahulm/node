call_property_list();

$(".search-property").on("click", function () {
    call_property_list();
    if($("#searchTextField").val()==''){
        $("#lattitude").val("");
        $("#longitude").val("");
    }else{
    var lat = $("#lat_first").val();
    var long = $("#long_first").val();
    var location = $("#location_first").val();
    call_map(lat, long,location);
    }
});

$(".apply-popup-filter").on("click", function () {
    $("#bedrooms").val($("#bed_qty").val());
    $("#bathrooms").val($("#bath_qty").val());
    $("#car_spaces").val($("#car_space_qty").val());
    $("#land_size").val($("#landsize").val());

    var min_price = $("#min_price").val();
    var max_price = $("#max_price").val();

    if(min_price!='' && max_price==''){
        call_notify("Fail","Please enter min and max both property price","danger");
        return false;
    }

    if(min_price=='' && max_price!=''){
        call_notify("Fail","Please enter min and max both property price","danger");
        return false;
    }
    if(min_price!='' && max_price!=''){
        $("#property_price").val(min_price+'-'+max_price);
    }else{
        $("#property_price").val('');
    }

    call_property_list();

    if($("#searchTextField").val()==''){
        $("#lattitude").val("");
        $("#longitude").val("");
    }else{
        var lat = $("#lat_first").val();
        var long = $("#long_first").val();
        var location = $("#location_first").val();
        call_map(lat, long,location);
    }
    $("#filtermodal").modal("hide");
});


$(".buy-tab-click").on("click", function () {
    $("#property_is_for").val("buy");
});

$(".rent-tab-click").on("click", function () {
    $("#property_is_for").val("rent");
});

$(".share-tab-click").on("click", function () {
    $("#property_is_for").val("share");
});



function call_property_list() {

    var get_property_type = $("#property_is_for").val();
    if (get_property_type == 'buy') {
        var property_type = 1;
    } else if (get_property_type == 'rent') {
        var property_type = 2;
    } else {
        var property_type = 3;
    }
    var property_is_for = property_type;
    var type = 1;
    var property_type_id = $("#property_type_id").val();
    var last_ids = '';

    var lattitude = $("#lattitude").val();
    var longitude = $("#longitude").val();

    var device_type = 'PC';

    //filter popup
    var bedrooms = $("#bedrooms").val();
    var bathrooms = $("#bathrooms").val();
    var car_spaces = $("#car_spaces").val();
    var property_is = $("#property_is").val();
    var land_size = $("#land_size").val();

    var property_price = $("#property_price").val();
 

    $.ajax({
        type: "POST",
        url: MAIN_URL_API + "api/property-list",
        data: {
            property_is_for: property_is_for,
            type: type,
            property_type_id: property_type_id,
            last_ids: last_ids,
            device_type: device_type,
            lattitude: lattitude,
            longitude: longitude,
            bedrooms: bedrooms,
            bathrooms: bathrooms,
            car_spaces: car_spaces,
            property_is: property_is,
            land_size: land_size,
            property_price: property_price,
        },
        dataType: "json",
        success: function (data) {
            var htm = '';

            if(data.length>0){
            for (var i = 0; i < data.length; i++) {

                if (i == 0) {
                    $("#lat_first").val(data[i]['lattitude']);
                    $("#long_first").val(data[i]['longitude']);
                    $("#location_first").val(CURRENCY+' '+data[i]['property_price']+'<br>'+data[i]['location']);
                }

                if (data[i]['property_is_for'] == 1) {
                    var property_is_for = 'buy';
                } else if (data[i]['property_is_for'] == 2) {
                    var property_is_for = 'rent';
                } else {
                    var property_is_for = 'share';
                }
                
                htm += '<div class="p-tabs-list-row">';

                htm += '<div class="p-tabs-list-left p-row-listslider owl-carousel">';

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


                htm += '</div>';

                htm += '<div class="p-tabs-list-right">';
                htm += '<div class="list-property-address" data-lat="' + data[i]['lattitude'] + '" data-long="' + data[i]['longitude'] + '" data-location="'+CURRENCY+' '+data[i]['property_price']+'<br>'+data[i]['location']+'">';
                htm += '<h5>' + CURRENCY + ' ' + data[i]['property_price'] + '</h5>';
                htm += '<p><span class="material-icons-outlined">place</span>' + data[i]['location'] + '</p>';
                htm += '<ul class="p-items">';
                htm += '<li>';
                htm += '<em><img src="/assets/images/home.svg" class="img-fluid" alt=""></em>';
                htm += '<span>' + data[i]['land_size'] + '</span>';
                htm += '</li>';
                htm += '<li>';
                htm += '<em><img src="/assets/images/bed.svg" class="img-fluid" alt=""></em>';
                htm += '<span>' + data[i]['bedrooms'] + '</span>';
                htm += '</li>';
                htm += '<li>';
                htm += '<em><img src="/assets/images/bath.svg" class="img-fluid" alt=""></em>';
                htm += '<span>' + data[i]['bathrooms'] + '</span>';
                htm += '</li>';
                htm += '<li>';
                htm += '<em><img src="/assets/images/sedan.svg" class="img-fluid" alt=""></em>';
                htm += '<span>' + data[i]['car_spaces'] + '</span>';
                htm += '</li>';
                htm += '</ul>';
                htm += '</div>';

                htm += '<div class="p-tabs-list-bm">';
                htm += '<div class="p-dt-user">';
                htm += '<div class="pt-user-img">';
                if (data[i]['image'] == null) {
                    htm += '<img src="/images/user-img.png" alt="" />';
                } else {
                    htm += '<img src="/uploads/users/'+data[i]['image']+'" alt="" />';
                }
                htm += '</div>';
                htm += '<div class="pt-user-text">';
                htm += '<p>Owner:<strong>' + data[i]['full_name'] + '</strong></p>';
                htm += '</div>';
                htm += '</div>';
                htm += '<a href="/properties/' + property_is_for + '/' + data[i]['property_code'] + '" class="p-list-detail"><span class="material-icons-outlined mr-2 align-middle">visibility</span>Detail</a>';
                htm += '</div>';
                htm += '</div>';
                htm += '</div>';

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

            $(".property-list-call").html(htm);
            $(".pro_listed_count").html(data.length);
            // if(data.length>2){
            //     setTimeout(function () {
            //         $(".property-list-call").mCustomScrollbar({
            //             theme: "minimal-dark",
            //             mouseWheelPixels: 300,
            //         });
            //         $(".property-list-call").mCustomScrollbar("scrollTo", "top");
            //     }, 1100);
            // }
        },
        error: function (data) {
            call_notify("Fail", data.responseJSON.message, "danger");
        },
    });
}


$(document).on("click", ".list-property-address", function () {
    var lat = $(this).data("lat");
    var long = $(this).data("long");
    var location = $(this).data("location");
    call_map(lat, long,location);
});

setTimeout(function () {
    call_map($("#lat_first").val(), $("#long_first").val(), $("#location_first").val());
}, 1000);
function call_map(lat, long, location) {

    var map;
    var marker;
    function initialize() {
        var latlng1 = new google.maps.LatLng(lat, long);

        marker = new google.maps.Marker({
            position: latlng1,
            title: "Hello World!",
            icon: '/assets/images/pin.png',
        });

        var mapProp1 = {
            center: latlng1,
            zoom: 14,
            zoomControl: false,
            streetViewControl: false,
            // draggable: false,
            scrollwheel: true,
            icon: '/assets/images/pin.png',
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var infowindow = new google.maps.InfoWindow({ // Create a new InfoWindow
            content: location // HTML contents of the InfoWindow
        });
        google.maps.event.addListener(marker, 'click', function () { // Add a Click Listener to our marker
            infowindow.open(map, marker); // Open our InfoWindow
        });
        //google.maps.event.addDomListener(window, 'resize', function () { map.setCenter(myLatlng); }); // Keeps the Pin Central when resizing the browser on responsive sites
        map = new google.maps.Map(document.getElementById("location-map"), mapProp1);
        marker.setMap(map);
    };
    initialize();

}

$(".custom-control-input").on("click",function(){
    if ($(this).is(':checked')) {
        $(".custom-control-input").prop("checked",false);
        $(this).prop("checked",true);
        $("#property_is").val($(this).val());
    }else{
        $(this).prop("checked",false);
        $("#property_is").val('');
    }
});