$(document).ready(function(){
    baseLayout()
    tab()
    dateFormatChange();
    scrollEvent()
})

function baseLayout(){
    $('#content:has(.dashboard)').mCustomScrollbar({
        
    });

    $('.card-group').each(function(){
        $(this).mCustomScrollbar({
            axis:"x", // horizontal scrollbar
            advanced:{ 
                updateOnContentResize: true 
            },
            scrollbarPosition: "outside",
        });
    });

    $('.btn-sitemap').click(function(){
        $('.sitemap').toggle();
    })
}

function scrollEvent(){
    scrollX();
    scrollY();
    scrollYX();
}

function scrollX() {
    $('.scroll-x').each(function(){
        $(this).mCustomScrollbar({
            axis:"x", // horizontal scrollbar
            advanced:{ 
                updateOnContentResize: true 
            },
            scrollbarPosition: "outside",
        });
    })
}

function scrollY() {
    $('.scroll-y').each(function(){
        if($(this).hasClass('pop-body') || $(this).hasClass('inside')){
            $(this).mCustomScrollbar({
                axis:"y", // horizontal scrollbar
                advanced:{ 
                    updateOnContentResize: true 
                },
            });
        } else {
            $(this).mCustomScrollbar({
                axis:"y", // horizontal scrollbar
                advanced:{ 
                    updateOnContentResize: true 
                },
                scrollbarPosition: "outside",
            });
        }
    });
}

function scrollYX() {
    $('.scroll-yx').each(function(){
        $(this).mCustomScrollbar({
            axis:"yx", // horizontal scrollbar
            advanced:{ 
                updateOnContentResize: true 
            },
            scrollbarPosition: "outside",
            callbacks: {
                whileScrolling: function () {
                    var scrollPos = $(this).find('.mCSB_container').position();
                    $(this).siblings('.list-head').find('table').css('transform', 'translateX(' + scrollPos.left + 'px)');
                },
                onInit: function () {
                    var scrollPos = $(this).find('.mCSB_container').position();
                    $(this).siblings('.list-head').find('table').css('transform', 'translateX(' + scrollPos.left + 'px)');
                }
            }
        })
    });
}

// 탭
function tab(){
    $('.tab-wrap').each(function(){
        let thisUse = $(this).data('use'),
            thisNo = $(this).find('.tab-btn.on').index();

        if(thisUse !== false) {
            $(this).children('.tab-cont-wrap').children('.tab-cont').hide()
            $(this).children('.tab-cont-wrap').children('.tab-cont').eq(thisNo).css('display', '');
            
            $(this).find('.tab-btn').click(function(){
                thisNo = $(this).index();

                scrollEvent()

                $(this).siblings('.tab-btn').removeClass('on');
                $(this).addClass('on');

                $(this).closest('.tab-wrap').children('.tab-cont-wrap').each(function(){
                    $(this).children('.tab-cont').hide()
                    $(this).children('.tab-cont').eq(thisNo).css('display', '');
                })
            })

            if($('[data-tab]').length > 0){
                $('[data-tab]').each(function(){
    
                    $(this).click(function(){
                        thisTabNo = $(this).data('tab') - 1;

                        $(this).closest('.tab-wrap').find('.tab-cont').hide()
                        $(this).closest('.tab-wrap').find('.tab-cont').eq(thisTabNo).css('display', '');
        
                        $(this).closest('.tab-wrap').find('.tab-btn').removeClass('on');
                        $(this).closest('.tab-wrap').find('.tab-btn').eq(thisTabNo).addClass('on');
                    })
                })
            }
        }
    });
}

function dateFormatChange(){
    $('.date input[type="date"], .date input[type="month"]').change(function(){
        let date = $(this).val();
        let dateYear = date.substr(0, 4);
        let dateMonth = date.substr(5, 2);
        let dateDay = date.substr(8, 2);

        if($(this).attr('type') == "date"){
            $(this).closest('.date').find('input[type="text"]').val(dateYear + '.' + dateMonth + '.' + dateDay)
        } else if($(this).attr('type') == "month"){
            
            $(this).closest('.date').find('input[type="text"]').val(dateYear + '.' + dateMonth)
        }
    });
}