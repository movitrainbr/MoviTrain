// MENU MOBILE

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

if(menuToggle && nav){

    menuToggle.addEventListener('click', () => {

        nav.classList.toggle('active');

    });

}

// HEADER SCROLL

const header =
document.querySelector('header');

window.addEventListener('scroll', () => {

    if(window.scrollY > 50){

        header.classList.add('scrolled');

    } else {

        header.classList.remove('scrolled');

    }

});



// CURSOR GLOW

const glow = document.querySelector('.cursor-glow');

if(glow){

    window.addEventListener('mousemove', (e) => {

        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;

    });

}


// HERO PARALLAX

const phoneMockup =
document.querySelector('.phone-mockup');

window.addEventListener('mousemove', (e) => {

    const x =
    (window.innerWidth / 2 - e.clientX) / 25;

    const y =
    (window.innerHeight / 2 - e.clientY) / 25;

    phoneMockup.style.transform = `
        rotateY(${-x}deg)
        rotateX(${y}deg)
    `;

});



// SCROLL REVEAL

const reveals =
document.querySelectorAll('.reveal');

const revealOnScroll = () => {

    reveals.forEach((element) => {

        const windowHeight =
        window.innerHeight;

        const revealTop =
        element.getBoundingClientRect().top;

        if(revealTop < windowHeight - 100){

            element.classList.add('active');

        }

    });

};

window.addEventListener(
    'scroll',
    revealOnScroll
);

revealOnScroll();

// ====================
// FLOATING PARTICLES
// ====================

const particlesContainer =
document.querySelector('.particles');

for(let i = 0; i < 25; i++){

    const particle =
    document.createElement('span');

    particle.classList.add('particle');

    const size =
    Math.random() * 8 + 4;

    particle.style.width =
    `${size}px`;

    particle.style.height =
    `${size}px`;

    particle.style.left =
    `${Math.random() * 100}%`;

    particle.style.animationDuration =
    `${Math.random() * 10 + 10}s`;

    particle.style.animationDelay =
    `${Math.random() * 5}s`;

    particlesContainer.appendChild(
        particle
    );

}

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {

  const question = item.querySelector('.faq-question');

  question.addEventListener('click', () => {
    item.classList.toggle('active');
  });

});


window.addEventListener('load', () => {

    const loader = document.getElementById('loader');

    setTimeout(() => {

        loader.classList.add('hidden');

    }, 1800);

});