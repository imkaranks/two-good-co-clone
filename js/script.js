(function () {
  const $cursor = document.getElementById('cursor');
  const $videoCursor = document.getElementById('video-cursor');
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
    opacity: 1,
    stagger: 0.2
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

  function headerScrollAction($elem, props) {
    gsap.to($elem, {
      scrollTrigger: {
        trigger: '.header',
        scroller: '[data-scroll-container]',
        start: "top 0",
        end: "top -5%",
        scrub: true
      },
      ...props
    });
  }

  headerScrollAction('#primary-nav', { y: '-100%', opacity: 0 });

  headerScrollAction('.default-icon, .scrolled-icon', { y: -83 });

  function followMouse(event, $cursor) {
    $cursor.style.top = event.y + 'px';
    $cursor.style.left = event.x + 'px';
    gsap.to($cursor, {
      x: '-50%',
      y: '-50%',
      top: event.y,
      left: event.x,
      scale: 1,
      opacity: 1
    });
  }

  if (window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (event) => {
      if (event.target.closest('.hero__video')) {
        followMouse(event, $videoCursor);
      }
      else if (event.target.closest('.products__card')) {
        const target = event.target.closest('.products__card');
        gsap.to($cursor, {
          backgroundColor: `rgba(${target.getAttribute('data-rgba')})`
        });
        followMouse(event, $cursor);
      }
      else {
        gsap.to($cursor, {
          scale: 0,
          opacity: 0
        });
        gsap.to($videoCursor, {
          scale: 0,
          opacity: 0
        });
      }
    });
  }

  document.getElementById('copyright-year').textContent = new Date().getFullYear();
})();