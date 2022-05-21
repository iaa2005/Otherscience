function updateScroll() {
    document.getElementById("scroll-wrapper").style.opacity = (0.7 - Math.sqrt(window.scrollY / window.screen.height)).toString();
}

$(document).ready(async function() {
    window.addEventListener('scroll', function () {
        if (window.scrollY / window.screen.height > 0.57) {
            $(".logo-header-block").css("top",  "20px");
        }
        if (window.scrollY / window.screen.height < 0.57) {
            $(".logo-header-block").css("top",  "-50px");
        }
        if (window.scrollY / window.screen.height >= 0.5) {
            $("#preambula-tag-1").addClass("anim-on");
            $(".title-block").addClass("anim-on");
            $(".block-text").addClass("anim-on");
        }
        if (window.scrollY / window.screen.height >= 1.4) {
            $(".block-2").addClass("anim-on");

            $("#preambula-tag-2").addClass("anim-on");
            $(".title-block-2").addClass("anim-on");
            $(".block-text-2").addClass("anim-on");
        }

        if (window.scrollY / window.screen.height >= 2.6) {
            $(".block-3").addClass("anim-on");

            $("#preambula-tag-3").addClass("anim-on");
            $(".title-block-3").addClass("anim-on");
            $(".block-text-3").addClass("anim-on");
        }

        if (window.scrollY / window.screen.height >= 3.7) {
            $(".block-4").addClass("anim-on");

            $(".block-4-cards").addClass("anim-on");
            $("#preambula-tag-4").addClass("anim-on");
            $(".title-block-4").addClass("anim-on");
            $(".block-text-4").addClass("anim-on");
        }

        if (window.scrollY / window.screen.height >= 4.9) {
            $(".block-5").addClass("anim-on");

            $("#preambula-tag-5").addClass("anim-on");
            $(".title-block-5").addClass("anim-on");
            $(".block-text-5").addClass("anim-on");
            $(".block-5-sign-up").addClass("anim-on");
        }

        if (window.scrollY / window.screen.height >= 6.1) {
            $(".block-6").addClass("anim-on");

            $(".block-6-coin").addClass("anim-on");
            $("#preambula-tag-6").addClass("anim-on");
            $(".title-block-6").addClass("anim-on");
            $(".block-text-6").addClass("anim-on");
            $(".block-6-about").addClass("anim-on");
        }

        if (window.scrollY / window.screen.height >= 7.4) {
            $(".block-7").addClass("anim-on");

            $("#preambula-tag-7").addClass("anim-on");
            $(".title-block-7").addClass("anim-on");
            $(".block-text-7").addClass("anim-on");
            $(".block-7-table").addClass("anim-on");
        }

        if (window.scrollY / window.screen.height >= 9.5) {
            $(".block-go-to").addClass("anim-on");
            $(".block-go-text").addClass("anim-on");
            $(".block-go-button").addClass("anim-on");
        }

        // console.log(window.scrollY / window.screen.height)
    })
    setTimeout( function () {
        updateScroll();
        window.addEventListener('scroll', updateScroll)
    }, 6000)
});



