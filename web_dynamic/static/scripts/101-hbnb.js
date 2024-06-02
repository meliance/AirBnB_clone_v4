$(document).ready(function () {
    let myAmenities = [];
    let myStates = [];
    let myCities = [];

    $('.amenities .popover input[type=checkbox]').click(function () {
        const myListName = [];
        myAmenities = [];

        $('.amenities .popover input[type=checkbox]:checked').each(function () {
            myListName.unshift($(this).attr('data-name'));
            myAmenities.unshift($(this).attr('data-id'));
        });
        if (myListName.length === 0) {
            $('.amenities h4').html('&nbsp;');
        } else {
            $('.amenities h4').text(myListName.join(', '));
        }
        console.log(myAmenities);
    });

    $('.locations .popover h2 input[type=checkbox]').click(function () {
        const myListName = [];
        myStates = [];

        $('.locations .popover h2 input[type=checkbox]:checked').each(function () {
            myListName.unshift($(this).attr('data-name'));
            myStates.unshift($(this).attr('data-id'));
        });
        if (myListName.length === 0) {
            $('.locations h6.myStates').html('&nbsp;');
        } else {
            $('.locations h6.myStates').text(myListName.join(', '));
        }
        console.log(myStates);
    });

    $('.locations .popover ul ul input[type=checkbox]').click(function () {
        const myListName = [];
        myCities = [];

        $('.locations .popover ul ul input[type=checkbox]:checked').each(function () {
            myListName.unshift($(this).attr('data-name'));
            myCities.unshift($(this).attr('data-id'));
        });
        if (myListName.length === 0) {
            $('.locations h6.myCities').html('&nbsp;');
        } else {
            $('.locations h6.myCities').text(myListName.join(', '));
        }
        console.log(myCities);
    });

    $('.filters button').click(function (event) {
        event.preventDefault();

        $('.places').text('');

        const obj = {};
        obj.amenities = myAmenities;
        obj.states = myStates;
        obj.cities = myCities;

        listPlaces(JSON.stringify(obj));
    });

    $.ajax({
        url: 'http://0.0.0.0:5001/api/v1/status/',
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            $('#api_status').addClass('available');
        },

        error: function (xhr, status) {
            console.log('error ' + xhr);
        }
    });

    $('#toggle_reviews').click(function () {
        const toggleSpan = $(this);
        const reviewsContainer = $('#reviews_container');
        
        if (toggleSpan.text() === 'show') {
            $.ajax({
                url: 'http://0.0.0.0:5001/api/v1/reviews/',
                type: 'GET',
                dataType: 'json',
                success: function (reviews) {
                    reviewsContainer.empty();
                    for (let review of reviews) {
                        reviewsContainer.append(`
                            <div class="review">
                                <h3>${review.user}:</h3>
                                <p>${review.text}</p>
                            </div>
                        `);
                    }
                    toggleSpan.text('hide');
                },
                error: function (xhr, status) {
                    console.log('error ' + status);
                }
            });
        } else {
            reviewsContainer.empty();
            toggleSpan.text('show');
        }
    });

    listPlaces();
});

function listPlaces (consult = '{}') {
    console.log(consult);
    $.ajax({
        type: 'POST',
        url: 'http://0.0.0.0:5001/api/v1/places_search',
        dataType: 'json',
        data: consult,
        contentType: 'application/json; charset=utf-8',
        success: function (places) {
            console.log(places);
            for (let i = 0; i < places.length; i++) {
                $('.places').append(`

