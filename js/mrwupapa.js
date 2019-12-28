// bootstrap
// modal
// $('.modal').on('shown.bs.modal', function () {
//   $('.modal_btn').trigger('focus')
// });

// muuri
var grid = new Muuri('.grid',{
  dragEnabled: true,
  // showDuration: 600,
  // layoutEasing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
});

// swiper
var swiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  centeredSlides: true,
  grabCursor: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
    clickable: true,
  },
  pagination: {
    el: '.swiper-pagination',
  },
});

var corner_swiper = new Swiper('.corner_swiper',{
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  // centeredSlides: true,
  // autoplay: {
  //   delay: 2500,
  //   disableOnInteraction: false,
  // },
  grabCursor: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
    clickable: true,
  },
  pagination: {
    el: '.swiper-pagination',
  },
});


// 進版畫面跳關於庭園
// $(document).ready(function(){
//   $('.start').click(function() {
//     $('#index').addClass('disapear')
//     $('.all').addClass('show')
// })
// $('.back_to_index').click(function(){
//   $('#index').removeClass('disapear')
//     $('.all').removeClass('show')
// })
// })


// 換頁效果
var number_li = $('.nav li').length
n = 1

$('.page').on('mousewheel', function scroll (e) {
  // console.log(e.deltaY);
  if (e.deltaY == -1) {
    if (n < number_li) {
      n++
      $(`.page:nth-child(${n})`).addClass('remove')
      $('.nav li').removeClass('active')
      $(`.nav li:nth-child(${n})`).addClass('active')
    }
  } else {
    if (n > 1) {
      n--
      $(`.page:nth-child(${n + 1})`).removeClass('remove')
      $('.nav li').removeClass('active')
      $(`.nav li:nth-child(${n})`).addClass('active')

    }
  }
  // setTimeout(scroll , 1500)

})


$('.nav li').click(function () {
  var index = $(".nav li").index(this) + 1;

  //check 是否跳頁 math.abs()->絕對值>1表示有跳頁
  if (Math.abs(n - index) > 1) {
    //跳頁
    $('.nav li').removeClass('active')
    $(this).addClass('active')

    //add this
    $(`.page`).removeClass('remove')

    //remove page->可以讓最後一頁不新增remove這個class
    for (let i = 1; i < index; i++) {
      $(`.page:nth-child(${i + 1})`).addClass('remove')
    }

    n = index;

    console.log("click跳頁:", n);

  } else {
    $('.nav li').removeClass('active')
    $(this).addClass('active')
    // $('.page').removeClass('remove')
    $(`.page:nth-child(${index + 1})`).removeClass('remove')
    $(`.page:nth-child(${index})`).addClass('remove')

    //update n
    n = index;
    console.log("click不跳頁:", index);
  }



})
