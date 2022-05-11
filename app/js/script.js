$(document).ready(function(){
    $('.header_nav a').on('click', function(){
        let section_name = $(this).data('section_name');
        let section = $('#'+section_name);
        $('html, body').animate({ scrollTop: section.offset().top - 100}, 500);
        if($('#nav-toggle').prop('checked') === true){
            $('#nav-toggle').prop('checked','')
        }
    })
    $('.hero_inner button, .about button.contact, .footer .contact').on('click', function(){
        $('.contact_btn').click()
    })
    $('.about button.services, .footer .services').on('click', function(){
        $('.services_btn').click()
    })
    $('.footer .about').on('click', function(){
        $('html, body').animate({ scrollTop: $('#about').offset().top - 100}, 500);
    })

    getLanguage();
    let lang = localStorage.getItem('language');
    $('.language a').removeClass('active');
    $('.language a[data-lang="'+lang+'"]').addClass('active');
    setText();

    const form = $('#form');
    form.on('submit', formSend)

    async function formSend(e){
        e.preventDefault();
        let error = formValidate(form);
        let formData = {
            "name": $('#form .name').val(),
            "phone":$('#form .number').val(),
            "time":$('#form .time').val(),
            "email":$('#form .email').val(),
        }
        if(error === 0){
            execute(formData);
        }else{
            alert ('phone field is requred');
        }
    }

    function formValidate(form){
        let error = 0 ;
        $('._req').each(function(){
            const input = $(this);
            formRemoveError(input);
            if($(input).val() === ''){
                formAddError(input)
                error++;
            }
        })
        return error;
    }

    function formAddError (input){
        $(input).addClass('_error')
    }

    function formRemoveError (input){
        $(input).removeClass('_error')
    }
    const token = '5296019318:AAGQgffAWeQEtY5Ll84fSq6Rj-3z61SoI1w';
    const chatId = '975994997';
    function execute(formData) {
        const name = formData.name;
        const phone = formData.phone;
        const time = formData.time;
        const mail = formData.email;
        const message = `Имя: ${name}\nТелефон: ${phone}\nВремя: ${time}\nEmail: ${mail}\n`;

        $.ajax({
            type: 'POST',
            url: `https://api.telegram.org/bot${token}/sendMessage`,
            data: {
                chat_id: chatId,
                text: message,
                parse_mode: 'html',
            },
            success: function (res) {
                console.debug(res);
                $('#form input').each(function(){
                    $(this).val('');
                    $('#form button').css('background','#46b475');
                    setTimeout(function(){
                        $('#form button').css('background','#b44547');
                    },2000)
                })
            },
            error: function (error) {
                console.error(error);
                alert("error failed");
            }
        });
    }
})


var language;
function getLanguage() {
    (localStorage.getItem('language') == null) ? setLanguage('default') : false;
    $.ajax({
    url:  '/languages/' +  localStorage.getItem('language') + '.json',
    dataType: 'json', async: false, dataType: 'json',
    success: function (lang) { language = lang } });
}

function setLanguage(lang) {
    localStorage.setItem('language', lang);
}

function changeLanguage(lang){
    setLanguage(lang);
    $('.language a').removeClass('active');
    $('.language a[data-lang="'+lang+'"]').addClass('active')
    getLanguage();
    setText();
}

function setText(){
    $('.header_nav li').eq(0).find('a').text(language.menu[0].menu_item_1);
    $('.header_nav li').eq(1).find('a').text(language.menu[0].menu_item_2);
    $('.header_nav li').eq(2).find('a').text(language.menu[0].menu_item_3);
    $('.new_hero .text_container .text h3').text(language.hero_description[0].title);
    $('.new_hero .text_container .text div span').eq(0).text(language.hero_description[0].description_1);
    $('.new_hero .text_container .text div span').eq(1).text(language.hero_description[0].description_2);
    $('.new_hero .text_container .text div span').eq(2).text(language.hero_description[0].description_3);
    $('.new_hero .text_container .text div span').eq(3).text(language.hero_description[0].description_4);
    $('.about .about_information .section_title').text(language.about_us[0].title);
    $('.about .about_information .description').text(language.about_us[0].description);
    $('.about .about_information .btn_group .services').text(language.about_us[0].btn1);
    $('.about .about_information .btn_group .contact').text(language.about_us[0].btn2);
    $('.services .services_inner > h4').text(language.services[0].title);
    $('.services .services_inner > h1').text(language.services[0].description_title);
    $('.services .services_inner .description').text(language.services[0].description);
    $('.services .services_inner .services_container .card').eq(0).find('.card__side--front h3').text(language.services[0].card1.title);
    $('.services .services_inner .services_container .card').eq(1).find('.card__side--front h3').text(language.services[0].card2.title);
    $('.services .services_inner .services_container .card').eq(2).find('.card__side--front h3').text(language.services[0].card3.title);
    $('.services .services_inner .services_container .card').eq(3).find('.card__side--front h3').text(language.services[0].card4.title);
    $('.services .services_inner .services_container .card').eq(4).find('.card__side--front h3').text(language.services[0].card5.title);
    $('.services .services_inner .services_container .card').eq(5).find('.card__side--front h3').text(language.services[0].card6.title);

    $('.services .services_inner .services_container .card').eq(0).find('.card__side--back span').eq(0).text(language.services[0].card1.ser1);
    $('.services .services_inner .services_container .card').eq(0).find('.card__side--back span').eq(1).text(language.services[0].card1.ser2);
    $('.services .services_inner .services_container .card').eq(0).find('.card__side--back span').eq(2).text(language.services[0].card1.ser3);
    $('.services .services_inner .services_container .card').eq(0).find('.card__side--back span').eq(3).text(language.services[0].card1.ser4);
    $('.services .services_inner .services_container .card').eq(0).find('.card__side--back span').eq(4).text(language.services[0].card1.ser5);
    $('.services .services_inner .services_container .card').eq(0).find('.card__side--back span').eq(5).text(language.services[0].card1.ser6);

    $('.services .services_inner .services_container .card').eq(1).find('.card__side--back span').eq(0).text(language.services[0].card2.ser1);
    $('.services .services_inner .services_container .card').eq(1).find('.card__side--back span').eq(1).text(language.services[0].card2.ser2);
    $('.services .services_inner .services_container .card').eq(1).find('.card__side--back span').eq(2).text(language.services[0].card2.ser3);
    $('.services .services_inner .services_container .card').eq(1).find('.card__side--back span').eq(3).text(language.services[0].card2.ser4);
    $('.services .services_inner .services_container .card').eq(1).find('.card__side--back span').eq(4).text(language.services[0].card2.ser5);
    $('.services .services_inner .services_container .card').eq(1).find('.card__side--back span').eq(5).text(language.services[0].card2.ser6);

    $('.services .services_inner .services_container .card').eq(2).find('.card__side--back span').eq(0).text(language.services[0].card3.ser1);
    $('.services .services_inner .services_container .card').eq(2).find('.card__side--back span').eq(1).text(language.services[0].card3.ser2);
    $('.services .services_inner .services_container .card').eq(2).find('.card__side--back span').eq(2).text(language.services[0].card3.ser3);
    $('.services .services_inner .services_container .card').eq(2).find('.card__side--back span').eq(3).text(language.services[0].card3.ser4);
    $('.services .services_inner .services_container .card').eq(2).find('.card__side--back span').eq(4).text(language.services[0].card3.ser5);
    $('.services .services_inner .services_container .card').eq(2).find('.card__side--back span').eq(5).text(language.services[0].card3.ser6);
    $('.services .services_inner .services_container .card').eq(2).find('.card__side--back span').eq(6).text(language.services[0].card3.ser7);
    $('.services .services_inner .services_container .card').eq(2).find('.card__side--back span').eq(7).text(language.services[0].card3.ser8);

    $('.services .services_inner .services_container .card').eq(3).find('.card__side--back span').eq(0).text(language.services[0].card4.ser1);
    $('.services .services_inner .services_container .card').eq(3).find('.card__side--back span').eq(1).text(language.services[0].card4.ser2);
    $('.services .services_inner .services_container .card').eq(3).find('.card__side--back span').eq(2).text(language.services[0].card4.ser3);
    $('.services .services_inner .services_container .card').eq(3).find('.card__side--back span').eq(3).text(language.services[0].card4.ser4);
    $('.services .services_inner .services_container .card').eq(3).find('.card__side--back span').eq(4).text(language.services[0].card4.ser5);
    $('.services .services_inner .services_container .card').eq(3).find('.card__side--back span').eq(5).text(language.services[0].card4.ser6);

    $('.services .services_inner .services_container .card').eq(4).find('.card__side--back span').eq(0).text(language.services[0].card5.ser1);
    $('.services .services_inner .services_container .card').eq(4).find('.card__side--back span').eq(1).text(language.services[0].card5.ser2);

    $('.services .services_inner .services_container .card').eq(5).find('.card__side--back span').eq(0).text(language.services[0].card6.ser1);
    $('.services .services_inner .services_container .card').eq(5).find('.card__side--back span').eq(1).text(language.services[0].card6.ser2);
    $('.services .services_inner .services_container .card').eq(5).find('.card__side--back span').eq(2).text(language.services[0].card6.ser3);

    $('.contact .contact_inner h1').text(language.contact[0].title);
    $('.contact .contact_inner .description').text(language.contact[0].description);
    $('.contact .contact_inner .information span').eq(0).text(language.contact[0].span1);
    $('.contact .contact_inner .information span').eq(1).text(language.contact[0].span2);
    $('.contact .contact_inner .information span').eq(2).text(language.contact[0].span3);
    $('.contact .contact_inner .information span').eq(3).text(language.contact[0].span4);
    $('.contact .contact_inner .contact_form .name').attr('placeholder',language.contact[0].name);
    $('.contact .contact_inner .contact_form .number').attr('placeholder',language.contact[0].telefon);
    $('.contact .contact_inner .contact_form .time').attr('placeholder',language.contact[0].time);
    $('.contact .contact_inner .contact_form button').text(language.contact[0].btn);

    $('.footer .ft1').text(language.footer[0].ft1);
    $('.footer .ft2').text(language.footer[0].ft2);
    $('.footer .footer_link li').eq(0).find('a').text(language.menu[0].menu_item_1);
    $('.footer .footer_link li').eq(1).find('a').text(language.menu[0].menu_item_2);
    $('.footer .footer_link li').eq(2).find('a').text(language.menu[0].menu_item_3);
}






