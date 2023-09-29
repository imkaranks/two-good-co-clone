(function () {
  const $cursor = document.getElementById('cursor');
  const $productsSection = document.querySelector('.products');
  const $videoCursor = document.getElementById('video-cursor');
  const $videoSection = document.getElementById('video-wrapper');
  const $menuToggle = document.getElementById('menu-toggle');

  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true
  });
  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("[data-scroll-container]", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    pinType: document.querySelector("[data-scroll-container]").style.transform ? "transform" : "fixed"
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  ScrollTrigger.refresh();

  gsap.to('.hero__title > span > span', {
    y: 0,
    stagger: 0.3
  });

  $menuToggle.onclick = function (event) {
    const expanded = event.currentTarget.getAttribute('aria-expanded');
    const $menu = document.getElementById(event.currentTarget.getAttribute('aria-controls'));

    if (expanded === 'true') {
      gsap.to($menu, {
        y: '-100%',
        duration: 0.3
      });
      gsap.to('.default-icon, .scrolled-icon', {
        color: 'black',
        duration: 0.3
      });
      event.currentTarget.setAttribute('aria-expanded', false);
    } else {
      gsap.to($menu, {
        y: 0,
        duration: 0.3
      });
      gsap.to('.default-icon, .scrolled-icon', {
        color: 'white',
        duration: 0.3
      });
      event.currentTarget.setAttribute('aria-expanded', true);
    }
  }

  gsap.to('#primary-nav', {
    scrollTrigger: {
      trigger: '.header',
      scroller: '[data-scroll-container]',
      start: '75px 0px',
      end: '75px 150px',
      scrub: true
    },
    y: '-100%',
    opacity: 0
  });

  gsap.to('.default-icon, .scrolled-icon', {
    scrollTrigger: {
      trigger: '.header',
      scroller: '[data-scroll-container]',
      start: '75px 0px',
      end: '75px',
      scrub: true
    },
    y: -83
  });

  if (window.matchMedia('(pointer: fine)').matches) { // Not makes sense for touch devices so removing it
    followMouse($productsSection, $cursor);
    followMouse($videoSection, $videoCursor);
  }

  function followMouse($container, $cursor) {
    $container.addEventListener('mouseenter', (event) => {
      $cursor.style.top = event.y + 'px';
      $cursor.style.left = event.x + 'px';
      gsap.to($cursor, {
        x: '-50%',
        y: '-50%',
        scale: 1,
        opacity: 1
      });
    });

    $container.addEventListener('mousemove', (event) => {
      gsap.to($cursor, {
        top: event.y,
        left: event.x
      });
    });

    $container.addEventListener('mouseleave', (event) => {
      gsap.to($cursor, {
        scale: 0,
        opacity: 0
      });
    });
  }

  document.getElementById('copyright-year').textContent = new Date().getFullYear();
})();