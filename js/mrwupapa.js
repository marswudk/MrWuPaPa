// bootstrap
// modal
// $('.modal').on('shown.bs.modal', function () {
//   $('.modal_btn').trigger('focus')
// });

// muuri
var grid = new Muuri('.grid', {
  dragEnabled: true,
  // showDuration: 600,
  // layoutEasing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
});

// swiper
var swiper = new Swiper('.swiper-container', {
  observer: true,
  observeParents: true,
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

var corner_swiper = new Swiper('.corner_swiper', {
  observer: true,
  observeParents: true,
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
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
$(document).ready(function () {
  $('.start').click(function () {
    // console.log("123");

    $('.index').addClass('disapear')
    $('.all').addClass('show')
  })
  $('.back_to_index').click(function () {
    // console.log("456");
    $('#index').removeClass('disapear')
    $('.all').removeClass('show')
  })
})


// 換頁效果
// console.log($(window).width());

// $(window).on('resize',function () {

var width = $(window).width();
console.log(width);

if (width > 1080) {
  var number_li = $('.nav_list li').length;
  n = 1;
  console.log(width);

  $('.page').on('mousewheel', function scroll(e) {
    // console.log(e.deltaY);
    if (e.deltaY == -1) {
      if (n < number_li) {
        n++

        $(`.page:nth-child(${n})`).addClass('remove')
        $('.nav_list li').removeClass('active')
        $(`.nav_list li:nth-child(${n})`).addClass('active')

        if (n == 4) {
          grid.refreshItems().layout()
        }

      }
    } else {
      if (n > 1) {
        n--
        $(`.page:nth-child(${n + 1})`).removeClass('remove')
        $('.nav_list li').removeClass('active')
        $(`.nav_list li:nth-child(${n})`).addClass('active')

        if (n == 4) {
          grid.refreshItems().layout()
        }

      }
    }
    // setTimeout(scroll , 1500)

  })


  $('.nav_list li').click(function () {
    var index = $(".nav li").index(this) + 1;

    //check 是否跳頁 math.abs()->絕對值>1表示有跳頁
    if (Math.abs(n - index) > 1) {
      //跳頁
      $('.nav_list li').removeClass('active')
      $(this).addClass('active')

      //add this
      $(`.page`).removeClass('remove')

      //remove page->可以讓最後一頁不新增remove這個class
      for (let i = 1; i < index; i++) {
        $(`.page:nth-child(${i + 1})`).addClass('remove')
      }

      n = index;

      if (n == 4) {
        grid.refreshItems().layout()
      }

      console.log("click跳頁:", n);

    } else {
      $('.nav_list li').removeClass('active')
      $(this).addClass('active')
      // $('.page').removeClass('remove')
      $(`.page:nth-child(${index + 1})`).removeClass('remove')
      $(`.page:nth-child(${index})`).addClass('remove')

      //update n
      n = index;

      if (n == 4) {
        grid.refreshItems().layout()
      }
      console.log("click不跳頁:", index);
    }

  })
} else {
  
}
// })

// mobile nav
$('.nav_btn').click(function () {
  $('.bar').toggleClass('rotate')
  $('.mobile_nav').toggleClass('rotate')
  $('.logo').toggleClass('disapear')
  console.log($('.mobile_nav'));
})

// 如果有hash# 在index&all 後面加上class(disapear & show)
if (window.location.hash) {
  $('.index').addClass('disapear')
  $('.all').addClass('show')

} else {
  $('.index').removeClass('disapear')
  $('.all').removeClass('show')
}

