(function () {
  const $cursor = document.getElementById('cursor');
  const $videoCursor = document.getElementById('video-cursor');
  const $testmonialReview = document.getElementById('review');

  const testimonials = [
    {
      id: 'm// 001',
      name: 'Cartier',
      review: 'Thank you so much for the beautiful catering; it means a lot working with a company such as two good co.'
    },
    {
      id: 'm// 002',
      name: 'Felicity T',
      review: 'The hampers we ordered were lovely and the team are wonderful to liase with.'
    },
    {
      id: 'm// 003',
      name: 'Barbara',
      review: 'My package just arrived and the presentation is so beautiful; elegant, magical and meaningful, with the items wrapped in delicious-smelling tissue paper. Georgeous; Will be back for more.'
    },
    {
      id: 'm// 004',
      name: 'Salesforce',
      review: 'I think I speak for everyone when I say we are very grateful to have been able to come in and help out for the day; The work you do is amazing.'
    },
    {
      id: 'm// 005',
      name: 'Cartier',
      review: 'Thank you so much for the beautiful catering; it means a lot working with a company such as two good co.'
    },
    {
      id: 'm// 006',
      name: 'Felicity T',
      review: 'The hampers we ordered were lovely and the team are wonderful to liase with.'
    },
    {
      id: 'm// 007',
      name: 'Barbara',
      review: 'My package just arrived and the presentation is so beautiful; elegant, magical and meaningful, with the items wrapped in delicious-smelling tissue paper. Georgeous; Will be back for more.'
    },
    {
      id: 'm// 008',
      name: 'Salesforce',
      review: 'I think I speak for everyone when I say we are very grateful to have been able to come in and help out for the day; The work you do is amazing.'
    },
  ];

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

  class PreLoader {
    constructor ($elem) {
      this.$elem = $elem;
      this.tl = null;
    }

    start() {
      this.tl = gsap.to(this.$elem + ' > div', {
        rotate: 360,
        repeat: -1
      });
    }

    stop() {
      gsap.to(this.$elem, {
        y: '-100%',
        duration: 0.3
      });

      this.tl.pause();
    }
  };

  class VideoPlayer {
    constructor (elem) {
      this.$player = document.querySelector(elem);
      this.$video = this.$player.querySelector('video');

      this.addEventListeners();
    }

    addEventListeners() {
      this.$player.addEventListener('click', () => this.toggleFullScreen());

      this.$video.play(); // For now, later will do something different
    }

    toggleFullScreen() {
      if (document.fullscreenElement === null) {
        this.$player.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
      this.$player.classList.toggle('fullscreen');
      this.$video.muted = !this.$video.muted;
    }
  };

  const preLoader = new PreLoader('#preloader');

  preLoader.start();

  window.addEventListener('load', () => {
    preLoader.stop();

    new VideoPlayer('.hero__video');

    gsap.to('.hero__title > span > span', {
      y: 0,
      opacity: 1,
      stagger: 0.2,
      delay: 0.3
    });
  });

  function loadTestimonials() {
    let clutter = '';

    testimonials.forEach((testimonial, i) => {
      clutter += `
        <div class="testimonial__author">
          <input type="radio" name="author" id="${testimonial.id}" ${i == 0 ? 'checked' : ''}>
          <label for="${testimonial.id}">
            <span class="visually-hidden">${testimonial.name}'s Review</span>
          </label>
          <div>
            <span class="text-500">${testimonial.id}</span>
            <span class="text-500">${testimonial.name}.</span>
          </div>
        </div>
      `;
    });

    document.querySelector('.testimonial__authors').innerHTML = clutter;
  };

  loadTestimonials();

  document.addEventListener('click', (event) => {
    if (event.target.closest('.menu-toggle')) {
      toggleMenu(event.target.closest('.menu-toggle'));
    } else if (event.target.closest('.testimonial__author > input')) {
      const testimonialId = event.target.closest('.testimonial__author > input').id;

      const review = testimonials.find(testimonial => testimonial.id === testimonialId)?.review;

      if (review) {
        $testmonialReview.textContent = review;
      }
    }
  });

  function toggleMenu($menuToggle) {
    const expanded = $menuToggle.getAttribute('aria-expanded');
    const $menu = document.getElementById(
      $menuToggle.getAttribute('aria-controls')
    );

    if (expanded === 'true') {
      gsap.to($menu, {
        y: '-100%',
        duration: 0.3
      });
      gsap.to('.header__logo', {
        color: 'black',
        duration: 0.3
      });
      $menuToggle.setAttribute('aria-expanded', false);
    } else {
      gsap.to($menu, {
        y: 0,
        duration: 0.3
      });
      gsap.to('.header__logo', {
        color: 'white',
        duration: 0.3
      });
      $menuToggle.setAttribute('aria-expanded', true);
    }
    $menuToggle.classList.toggle('expanded');
  }

  function headerScrollAction($elem, props) {
    gsap.to($elem, {
      scrollTrigger: {
        trigger: '.header',
        scroller: '[data-scroll-container]',
        start: "top 0",
        end: "top -15%",
        scrub: true
      },
      ...props
    });
  }

  headerScrollAction('#secondary-nav', { y: '-100%', opacity: 0 });

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

  const sectionTriggerProps = $trigger => ({
    trigger: $trigger,
    scroller: '[data-scroll-container]',
    start: "top bottom",
    end: window.matchMedia('(min-width: 50em)').matches ? "bottom 105%" : "bottom 120%",
    scrub: true
  });

  function cardTransition($elem, $trigger) {
    gsap.from($elem, {
      scrollTrigger: sectionTriggerProps($trigger),
      y: '10vh',
      opacity: 0,
      stagger: 0.2
    });
  }

  cardTransition('.products__card', '.products');

  cardTransition('.featured__item', '.featured');

  cardTransition('.footer__item svg > path', '.footer__wrapper');

  cardTransition('.impact .scroll-img-wrapper', '.impact');

  function headingTransition($trigger) {
    gsap.to('[data-scroll-heading]', {
      scrollTrigger: sectionTriggerProps($trigger),
      y: 0,
      opacity: 1
    });
  }

  ['.belief', '.testimonial'].forEach(item => headingTransition(item));

  function sectionTitleTransition($trigger) {
    gsap.to($trigger + ' .section__title', {
      scrollTrigger: {
        ...sectionTriggerProps($trigger),
        start: "top bottom",
        end: "20% 80%"
      },
      '--_underline-scale': '1'
    });
  }

  ['.featured__wrapper', '.testimonial__wrapper', '.footer'].forEach($section => sectionTitleTransition($section));

  document.getElementById('copyright-year').textContent = new Date().getFullYear();
})();