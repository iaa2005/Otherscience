function openMenu() {
    $(".menu-open-button").css("display", "none");
    $(".menu-close-button").css("display", "block");
    $(".mobile-menu").addClass("menu-open");
    // $(".logo-header-block-mobile").addClass("down");
    $("body").addClass("body-clip");
}

function closeMenu() {
    $(".menu-close-button").css("display", "none");
    $(".menu-open-button").css("display", "block");
    $(".mobile-menu").removeClass("menu-open");
    // $(".logo-header-block-mobile").removeClass("down");
    $("body").removeClass("body-clip");

}

$(document).ready(async function() {
    let buttonMenuOpen = document.getElementById("menu-open-button");
    buttonMenuOpen.addEventListener("click", openMenu)

    let buttonMenuClose = document.getElementById("menu-close-button");
    buttonMenuClose.addEventListener("click", closeMenu)

    setTimeout( function () {
        $(".header").css("top", "0").css("animation", "--");
    }, 4000)

    let q1 = 0;
    document.getElementById("block-faq-question-title-1").addEventListener("click", function () {
        if (q1 === 0) {
            $("#block-faq-question-ans-1").addClass("open");
            $("#block-faq-question-title-1").addClass("rotate-plus");
            q1 = 1;
        } else {
            $("#block-faq-question-ans-1").removeClass("open");
            $("#block-faq-question-title-1").removeClass("rotate-plus");
            q1 = 0;
        }
    });

    let q2 = 0;
    document.getElementById("block-faq-question-title-2").addEventListener("click", function () {
        if (q2 === 0) {
            $("#block-faq-question-ans-2").addClass("open");
            $("#block-faq-question-title-2").addClass("rotate-plus");
            q2 = 1;
        } else {
            $("#block-faq-question-ans-2").removeClass("open");
            $("#block-faq-question-title-2").removeClass("rotate-plus");
            q2 = 0;
        }
    });

    let q3 = 0;
    document.getElementById("block-faq-question-title-3").addEventListener("click", function () {
        if (q3 === 0) {
            $("#block-faq-question-ans-3").addClass("open");
            $("#block-faq-question-title-3").addClass("rotate-plus");
            q3 = 1;
        } else {
            $("#block-faq-question-ans-3").removeClass("open");
            $("#block-faq-question-title-3").removeClass("rotate-plus");
            q3 = 0;
        }
    });

});

