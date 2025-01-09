
"use strict";


// Code pour l'animation de la section de présentation
const firstPresentation = document.querySelector('.presentation');
const secondPresentation = document.querySelector('.presentation2');

// Ajoute un écouteur qui détecte la fin de l'animation de la première section
firstPresentation.addEventListener('animationend', () => {

    firstPresentation.style.transition = 'opacity 6s ease';
    firstPresentation.style.opacity = '0';

    // Attend la fin de la transition pour afficher la deuxième section
    setTimeout(() => {
        firstPresentation.style.display = 'none'; // Masque la première section
        secondPresentation.style.display = 'flex'; // Affiche la deuxième section
        secondPresentation.style.transition = 'opacity 6s ease';
        secondPresentation.style.opacity = '1';
    }, 5200);
});


// Code pour la section Compétences

gsap.registerPlugin(ScrollTrigger);

// Animation principale pour toutes les sections
function initSectionAnimations() {
    gsap.utils.toArray('section').forEach((section, i) => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top center",
                end: "bottom center",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power3.out"
        });
    });
}

// Animation du slider de compétences améliorée
function initSkillsSlider() {
    const track = document.querySelector('.skills-track');
    if (!track) return;

    // Duplique les cartes pour un défilement infini
    const cards = track.children;
    [...cards].forEach(card => {
        track.appendChild(card.cloneNode(true));
    });

    // Animation de défilement
    gsap.to(track, {
        x: `-=${track.offsetWidth / 2}`,
        duration: 20,
        ease: "none",
        repeat: -1,
        modifiers: {
            x: gsap.utils.unitize(
                x => parseFloat(x) % (track.offsetWidth / 2)
            )
        }
    });

    // Animation des cartes au survol
    gsap.utils.toArray('.skill-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.1,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

// Animation du hero
function initHeroAnimation() {
    const heroTl = gsap.timeline({
        defaults: { ease: "power3.out" }
    });

    heroTl
        .from('.main-title .name', {
            y: 100,
            opacity: 0,
            duration: 1.2
        })
        .from('.main-title .title', {
            y: 50,
            opacity: 0,
            duration: 1
        }, "-=0.8")
        .from('.scroll-indicator', {
            y: 20,
            opacity: 0,
            duration: 0.8
        }, "-=0.5");

    // Animation continue de l'indicateur de scroll
    gsap.to('.scroll-indicator', {
        y: 15,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "power1.inOut"
    });
}

// Animation des projets
function initProjectsAnimation() {
    const projects = gsap.utils.toArray('.project-card');
    
    projects.forEach(project => {
        const overlay = project.querySelector('.project-overlay');
        
        project.addEventListener('mouseenter', () => {
            gsap.to(overlay, {
                opacity: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        project.addEventListener('mouseleave', () => {
            gsap.to(overlay, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

// Curseur personnalisé
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX - 10,
            y: e.clientY - 10,
            duration: 0.2
        });
    });

    // Effet d'échelle sur les éléments interactifs
    const interactiveElements = document.querySelectorAll('a, button, .card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursor, {
                scale: 1.5,
                duration: 0.3
            });
        });

        el.addEventListener('mouseleave', () => {
            gsap.to(cursor, {
                scale: 1,
                duration: 0.3
            });
        });
    });
}

// Animation des titres
function initTitleAnimations() {
    gsap.utils.toArray('h2').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'back.out(1.7)'
        });
    });
}

// Animation de la timeline
function initTimelineAnimation() {
    const timelineItems = gsap.utils.toArray('.timeline-item');
    
    timelineItems.forEach((item, i) => {
        const direction = i % 2 === 0 ? 50 : -50;
        
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            x: direction,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    initHeroAnimation();
    initSectionAnimations();
    initSkillsSlider();
    initProjectsAnimation();
    initCustomCursor();
    initTitleAnimations();
    initTimelineAnimation();
});

// Animation de la navigation au scroll
ScrollTrigger.create({
    start: 'top -80',
    end: 99999,
    toggleClass: {
        targets: '.nav',
        className: 'nav-scrolled'
    }
});




//Code pour le caroussel de la section projects
window.onload = (e) => {
    e.preventDefault();
    const carouselInner = document.querySelector('.carousel-inner');
    const projectCards = Array.from(carouselInner.children);

    // Duplique les éléments pour remplir l'espace et permettre un défilement continu
    projectCards.forEach(card => {
        const clone = card.cloneNode(true);
        carouselInner.appendChild(clone);
        clone.classList.add('clone');
    });
};

// Code pour l'animation de la section PROJECTS - SCROLL + INTERSECTION OBSERVER - pour Ecran mobile
const projectCards = document.querySelectorAll(".carousel-inner div");

// Observateur pour la section PROJECTS
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animation lorsque l'élément entre dans le viewport
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
            // Pour désactiver l'observation après l'animation :
            // observer.unobserve(entry.target);
        } else {
            // Animation inverse lorsque l'élément sort du viewport
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateX(-20px)';
        }
    });
}, {
    root: null, 
    threshold: 0.5 
});



//Code pour la section Compétences


// gsap.to(".boxA", {
//     x: 935,
//     rotation: 360,
//     duration: 4,
//     toggleActions : "play reverse none reset",
// });

// gsap.to(".boxC", {
//     x: -935,
//     rotation: 360,
//     duration: 4,
//     toggleActions : "play reverse none reset",
// });

// gsap.to(".boxB", {
//     y: 50,
//     rotation: 360,
//     duration: 4,
//     toggleActions : "play reverse none reset", 
// })



//Code pour le caroussel de la section projects
  window.onload = (e) => {
    e.preventDefault();
    const carouselInner = document.querySelector('.carousel-inner');
    const projectCards = Array.from(carouselInner.children);

    // Duplique les éléments pour remplir l'espace et permettre un défilement continu
    projectCards.forEach(card => {
        const clone = card.cloneNode(true);
        carouselInner.appendChild(clone);
        clone.classList.add('clone');
    });
};



// Vérifie si l'écran est un écran mobile
const isMobile = window.matchMedia("(max-width: 750px)");

// Fonction permettant d'ajouter les cartes au gestionnaire d'observation
function handleCardsOnMobile() {
    // const isMobile = window.matchMedia("(max-width: 750px)");
    const projectCards = document.querySelectorAll(".project-card");
    if (isMobile.matches) { // Vérification si on est sur un écran mobile
        projectCards.forEach(card => {
            card.style.transition = "transform 0.5s, opacity 0.5s"; // Assure une transition
            // card.style.transform = 'translateX(20px)'; // Décalage
            observer.observe(card); // Ajoute la carte à l'observateur
        });
    }
    else {
        projectCards.forEach(card => {
            observer.unobserve(card); // Retire la carte de l'observateur
            card.style.opacity = "1"; // Assure qu'elles sont visibles
            card.style.transform = ""; // Supprime les transformations
        });
    }
}

// Appel la fonction au chargement de la page
handleCardsOnMobile();

// Ce code permet de détecter le redimensionnement
window.addEventListener("resize", handleCardsOnMobile);

// Ce code permet de détecter les changements dynamiques
isMobile.addEventListener("change", handleCardsOnMobile);



// MAJ PORTFOLIO---------------------------------------------------------------------------------------

