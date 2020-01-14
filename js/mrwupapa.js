
//AOS
AOS.init();
AOS.init({
  once: true, // whether animation should happen only once - while scrolling down

});


// muuri
var grid = new Muuri('.grid', {
  dragEnabled: true,

});

// swiper
var swiper = new Swiper('.swiper-container', {
  observer: true, //swiper 在分頁中無法正確初始化
  observeParents: true, //swiper 在分頁中無法正確初始化
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  centeredSlides: true,
  centeredSlidesBounds: true,
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

var width = $(window).width();
if (width > 576) {
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
} else {
  // console.log(width);
  var corner_swiper = new Swiper('.corner_swiper', {

    observer: true,
    observeParents: true,
    slidesPerView: 1,
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
}



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



var width = $(window).width();
var height = $(window).height();
var scroll_effect = true;
var finger_effect = true;
// console.log(width, height);

$(window).on('resize', function () {
  var width = $(window).width();
  var height = $(window).height();
  console.log(width);
  if (width >= 769) {
    scroll_effect = true;
  } else {
    scroll_effect = false;
  }
  if (769 < width < 1080) {
    finger_effect = true;
  } else {
    finger_effect = false;
  }
  // console.log(scroll_effect)
})
var number_li = $('.nav_list li').length;
n = 1;
//mousewheel
if (scroll_effect == true) {

  $('.page').on('mousewheel', function scroll(e) {

    if ($(this).hasClass('now')) {    //若此頁有'now'才執行下列程式->可避免一次滾多頁    
      if (e.deltaY == -1) {
        if (n < number_li) {
          n++
          $(`.page:nth-child(${n})`).addClass('remove')
          $('.page').removeClass('now')
          $(`.page:nth-child(${n + 1})`).addClass('now')
          $('.nav_list li').removeClass('active')
          $(`.nav_list li:nth-child(${n})`).addClass('active')
          if (n == 4) {
            grid.refreshItems().layout()
            $('.news .item').addClass('animated zoomIn')
          } else {
            $('.news .item').removeClass('animated zoomIn')
          }
        }

      } else {
        if (n > 1) {
          n--
          $(`.page:nth-child(${n + 1})`).removeClass('remove')
          $('.page').removeClass('now')
          $(`.page:nth-child(${n})`).addClass('now')
          $('.nav_list li').removeClass('active')
          $(`.nav_list li:nth-child(${n})`).addClass('active')

          if (n == 4) {
            grid.refreshItems().layout()
            $('.news .item').addClass('animated zoomIn')
          } else {
            $('.news .item').removeClass('animated zoomIn')
          }
        }
        $('.page').removeClass('now')
        $(`.page:nth-child(${n + 1})`).addClass('now')
      }
    }

  }
  );




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
        $('.news .item').addClass('animated zoomIn')
      } else {
        $('.news .item').removeClass('animated zoomIn')
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
        $('.news .item').addClass('animated zoomIn')
      } else {
        $('.news .item').removeClass('animated zoomIn')
      }
      console.log("click不跳頁:", index);
    }

  })
} else if (scroll_effect == false) {
  grid.refreshItems().layout()
}


if (finger_effect == true) {

  var page_up = function () {
    if (n < number_li) {
      n++
      $(`.page:nth-child(${n})`).addClass('remove')
      $('.page').removeClass('now')
      $(`.page:nth-child(${n + 1})`).addClass('now')
      $('.nav_list li').removeClass('active')
      $(`.nav_list li:nth-child(${n})`).addClass('active')
      if (n == 4) {
        grid.refreshItems().layout()
        $('.news .item').addClass('animated zoomIn')
      } else {
        $('.news .item').removeClass('animated zoomIn')
      }
    }
  }
  var page_down = function () {

    if (n > 1) {
      n--
      $(`.page:nth-child(${n + 1})`).removeClass('remove')
      $('.page').removeClass('now')
      $(`.page:nth-child(${n + 1})`).addClass('now')
      $('.nav_list li').removeClass('active')
      $(`.nav_list li:nth-child(${n})`).addClass('active')

      if (n == 4) {
        grid.refreshItems().layout()
        $('.news .item').addClass('animated zoomIn')
      } else {
        $('.news .item').removeClass('animated zoomIn')
      }
    }
  }
} else if (finger_effect == false) {
  grid.refreshItems().layout()
}



//detect finger swipe
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
    evt.originalEvent.touches; // jQuery
}

function handleTouchStart(evt) {
  const firstTouch = getTouches(evt)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
};

function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return;
  }

  var xUp = evt.touches[0].clientX;
  var yUp = evt.touches[0].clientY;

  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;

  if (Math.abs(xDiff) < Math.abs(yDiff)) {/*most significant*/

    if (yDiff > 0) {

      page_up();

    } else {

      page_down();

    }
  }
  /* reset values */
  xDown = null;
  yDown = null;

};


// mobile nav
$('.nav_btn').click(function () {
  $('.bar').toggleClass('rotate')
  $('.mobile_nav').toggleClass('rotate')
  $('.logo').toggleClass('disapear')
  $('.page').toggleClass('hide')
  // console.log($('.mobile_nav'));
})

// mobile nav 點擊連結後remove disapear
$('.mobile_nav li').click(function () {
  if ($(".bar").hasClass('rotate')) {
    $('.bar').removeClass('rotate')
    $('.mobile_nav').removeClass('rotate')
    $('.logo').removeClass('disapear')
    $('.page').removeClass('hide')
  }
  var index = $(".mobile_nav li").index(this) + 1;

    //check 是否跳頁 math.abs()->絕對值>1表示有跳頁
    if (Math.abs(n - index) > 1) {
      //跳頁
      //add this
      $(`.page`).removeClass('remove')

      //remove page->可以讓最後一頁不新增remove這個class
      for (let i = 1; i < index; i++) {
        $(`.page:nth-child(${i + 1})`).addClass('remove')
      }

      n = index;

      if (n == 4) {
        grid.refreshItems().layout()
        $('.news .item').addClass('animated zoomIn')
      } else {
        $('.news .item').removeClass('animated zoomIn')
      }

      console.log("click跳頁:", n);

    } else {      
      $(`.page:nth-child(${index + 1})`).removeClass('remove')
      $(`.page:nth-child(${index})`).addClass('remove')

      //update n
      n = index;

      if (n == 4) {
        grid.refreshItems().layout()
        $('.news .item').addClass('animated zoomIn')
      } else {
        $('.news .item').removeClass('animated zoomIn')
      }
      console.log("click不跳頁:", index);
    }

})

// 如果有hash# 在index&all 後面加上class(disapear & show)
if (window.location.hash) {
  $('.index').addClass('disapear')
  $('.all').addClass('show')

} else {
  $('.index').removeClass('disapear')
  $('.all').removeClass('show')
}

//回到最上&購物車

$(window).scroll(function (event) {
  var scroll = $(window).scrollTop();
  if (width <= 768) {
    if (scroll > 100) {
      $('.shopping_cart').addClass('fixed_cart');
      $('.backToTop').addClass('bump');

    } else {
      $('.shopping_cart').removeClass('fixed_cart');
      $('.backToTop').removeClass('bump');
    }

  }
});
// $('.backToTop').click(function () {

//   document.documentElement.scrollTop = 0;
// })







