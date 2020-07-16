
$(document).ready(function () {


    $('.navbar .dropdown-item').on('click', function (e) {
        var $el = $(this).children('.dropdown-toggle');
        var $parent = $el.offsetParent(".dropdown-menu");
        $(this).parent("li").toggleClass('open');

        if (!$parent.parent().hasClass('navbar-nav')) {
            if ($parent.hasClass('show')) {
                $parent.removeClass('show');
                $el.next().removeClass('show');
                $el.next().css({ "top": -999, "left": -999 });
            } else {
                $parent.parent().find('.show').removeClass('show');
                $parent.addClass('show');
                $el.next().addClass('show');
                $el.next().css({ "top": $el[0].offsetTop, "left": $parent.outerWidth() - 4 });
            }
            e.preventDefault();
            e.stopPropagation();
        }
    });

    $('.navbar .dropdown').on('hidden.bs.dropdown', function () {
        $(this).find('li.dropdown').removeClass('show open');
        $(this).find('ul.dropdown-menu').removeClass('show open');
    });

    var itemsMainDiv = ('.MultiCarousel');
    var itemsDiv = ('.MultiCarousel-inner');
    var itemWidth = "";

    $('.leftLst, .rightLst').click(function () {
        var condition = $(this).hasClass("leftLst");
        if (condition)
            click(0, this);
        else
            click(1, this)
    });

    ResCarouselSize();

    $(window).resize(function () {
        ResCarouselSize();
    });

    //this function define the size of the items
    function ResCarouselSize() {
        var incno = 0;
        var dataItems = ("data-items");
        var itemClass = ('.item');
        var id = 0;
        var btnParentSb = '';
        var itemsSplit = '';
        var sampwidth = $(itemsMainDiv).width();
        var bodyWidth = $('body').width();
        $(itemsDiv).each(function () {
            id = id + 1;
            var itemNumbers = $(this).find(itemClass).length;
            btnParentSb = $(this).parent().attr(dataItems);
            itemsSplit = btnParentSb.split(',');
            $(this).parent().attr("id", "MultiCarousel" + id);


            if (bodyWidth >= 1200) {
                incno = itemsSplit[3];
                itemWidth = sampwidth / incno;
            }
            else if (bodyWidth >= 992) {
                incno = itemsSplit[2];
                itemWidth = sampwidth / incno;
            }
            else if (bodyWidth >= 768) {
                incno = itemsSplit[1];
                itemWidth = sampwidth / incno;
            }
            else {
                incno = itemsSplit[0];
                itemWidth = sampwidth / incno;
            }
            $(this).css({ 'transform': 'translateX(0px)', 'width': itemWidth * itemNumbers });
            $(this).find(itemClass).each(function () {
                $(this).outerWidth(itemWidth);
            });

            $(".leftLst").addClass("over");
            $(".rightLst").removeClass("over");

        });
    }

    //this function used to move the items
    function ResCarousel(e, el, s) {
        var leftBtn = ('.leftLst');
        var rightBtn = ('.rightLst');
        var translateXval = '';
        var divStyle = $(el + ' ' + itemsDiv).css('transform');
        var values = divStyle.match(/-?[\d\.]+/g);
        var xds = Math.abs(values[4]);
        if (e == 0) {
            translateXval = parseInt(xds) - parseInt(itemWidth * s);
            $(el + ' ' + rightBtn).removeClass("over");

            if (translateXval <= itemWidth / 2) {
                translateXval = 0;
                $(el + ' ' + leftBtn).addClass("over");
            }
        }
        else if (e == 1) {
            var itemsCondition = $(el).find(itemsDiv).width() - $(el).width();
            translateXval = parseInt(xds) + parseInt(itemWidth * s);
            $(el + ' ' + leftBtn).removeClass("over");

            if (translateXval >= itemsCondition - itemWidth / 2) {
                translateXval = itemsCondition;
                $(el + ' ' + rightBtn).addClass("over");
            }
        }
        $(el + ' ' + itemsDiv).css('transform', 'translateX(' + -translateXval + 'px)');
    }

    //It is used to get some elements from btn
    function click(ell, ee) {
        var Parent = "#" + $(ee).parent().attr("id");
        var slide = $(Parent).attr("data-slide");
        ResCarousel(ell, Parent, slide);
    }

    $('.brand-logos').slick({
        slidesToShow: 8,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        arrows: false,
        dots: false,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 6
                }
            }
            , {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4
                }
            }
            , {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3
                }
            }
            , {
                breakpoint: 400,
                settings: {
                    slidesToShow: 2
                }
            }
        ]
    });
});
var currentIndex = 0;

var imagesList = Array.from(document.querySelectorAll(".item .pro-img img"));
var itemList = Array.from(document.querySelectorAll(" .item"));
console.log(itemList);
var lightBoxContainer = document.querySelector(" .lightbox-container");
var lightBoxItem = document.querySelector(".lightbox-container .lightbox-item");

var itemImg = document.querySelector(".lightbox-container .item-img img");
var itemHeading = document.querySelector(".lightbox-container .layer h2 ");
var itemPrice = document.querySelector(".lightbox-container .layer .pricee ");
var itemOverview = document.querySelector(".lightbox-container .layer .pro-overview ");

var itemDesc = document.querySelector(" #accordion .card #collapseOne .card-body ");
var itemUsing = document.querySelector(" #accordion .card #collapseTwo .card-body ");
var itemIngredients = document.querySelector(" #accordion .card #collapseThree .card-body ");
var close = document.getElementById("closeIcon");


for (var i = 0; i < itemList.length; i++) {
    imagesList[i].addEventListener("click", showLightBoxContainer);
}



function showLightBoxContainer(e) {
    currentIndex = imagesList.indexOf(e.target);

    var headerValue = itemList[currentIndex].querySelector(".item h2").innerText;
    itemHeading.innerHTML = headerValue;

    var overViewValue = itemList[currentIndex].querySelector(".item .overview").innerText;
    itemOverview.innerHTML = overViewValue;


    var priceValue = itemList[currentIndex].querySelector(".hidden-div .price").innerText;
    itemPrice.innerHTML = priceValue;

    var desc = itemList[currentIndex].querySelector(".hidden-div .description").innerText;
    itemDesc.innerHTML = desc;

    var using = itemList[currentIndex].querySelector(".hidden-div .how-to-use").innerText;
    itemUsing.innerHTML = using;

    var ingredients = itemList[currentIndex].querySelector(".hidden-div .ingredients").innerText;
    itemIngredients.innerHTML = ingredients;

    lightBoxContainer.style.display = "flex";
    var imgSrc = e.target.src;

    itemImg.src = imgSrc;


    //var imgSrc = e.target.src;
    console.log(vv);
    //lightBoxContainer.firstElementChild.style.backgroundImage="url("+imgSrc+")";
}

close.addEventListener("click", hideLightBoxContainer);

function hideLightBoxContainer() {
    lightBoxContainer.style.display = "none";
}


$('#MultiCarousel').carousel({

});

//scroll slides on swipe for touch enabled devices

$("#myCarousel").on("touchstart", function (event) {

    var yClick = event.originalEvent.touches[0].pageY;
    $(this).one("touchmove", function (event) {

        var yMove = event.originalEvent.touches[0].pageY;
        if (Math.floor(yClick - yMove) > 1) {
            $(".carousel").carousel('next');
        }
        else if (Math.floor(yClick - yMove) < -1) {
            $(".carousel").carousel('prev');
        }
    });
    $(".carousel").on("touchend", function () {
        $(this).off("touchmove");
    });
});