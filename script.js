// Fecha de inicio de la relación (cambia esta fecha por la fecha real)
const startDate = new Date('2025-07-27'); // 27 de julio de 2025

// Función para iniciar la experiencia
function startExperience() {
    // Ocultar el botón de inicio
    const startBtn = document.querySelector('.start-btn');
    startBtn.style.display = 'none';
    
    // Mostrar las secciones con animación
    setTimeout(() => {
        showSection('messages');
        // Hacer scroll suave a la primera sección
        setTimeout(() => {
            smoothScrollToSection('messages');
        }, 200);
    }, 500);
    
    setTimeout(() => {
        showSection('gallery');
    }, 1000);
    
    setTimeout(() => {
        showSection('reasons');
    }, 1500);
    
    setTimeout(() => {
        showSection('final');
    }, 2000);
    
    // Iniciar contador de tiempo (solo si existe la sección)
    startTimeCounter();
    
    // Crear efecto de corazones flotantes
    createFloatingHearts();
    
    // Añadir efectos de click en las fotos
    addPhotoEffects();
}

// Función para mostrar secciones con animación
function showSection(sectionType) {
    let section;
    switch(sectionType) {
        case 'messages':
            section = document.querySelector('.messages-section');
            break;
        case 'gallery':
            section = document.querySelector('.gallery-section');
            break;
        case 'reasons':
            section = document.querySelector('.reasons-section');
            break;
        case 'counter':
            section = document.querySelector('.counter-section');
            break;
        case 'final':
            section = document.querySelector('.final-message');
            break;
    }
    
    if (section) {
        section.style.display = 'block';
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 100);
    }
}

// Función para hacer scroll suave a una sección
function smoothScrollToSection(sectionType) {
    let section;
    switch(sectionType) {
        case 'messages':
            section = document.querySelector('.messages-section');
            break;
        case 'gallery':
            section = document.querySelector('.gallery-section');
            break;
        case 'reasons':
            section = document.querySelector('.reasons-section');
            break;
        case 'counter':
            section = document.querySelector('.counter-section');
            break;
        case 'final':
            section = document.querySelector('.final-message');
            break;
    }
    
    if (section) {
        // Método más compatible con GitHub Pages
        const elementPosition = section.offsetTop;
        const offsetPosition = elementPosition - 50; // 50px de margen
        
        // Intentar scroll suave primero
        try {
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        } catch (e) {
            // Si falla, usar scroll manual
            smoothScrollManual(offsetPosition);
        }
        
        // Fallback para navegadores que no soportan smooth scroll
        if (!('scrollBehavior' in document.documentElement.style)) {
            smoothScrollManual(offsetPosition);
        }
    }
}

// Función de scroll manual como respaldo
function smoothScrollManual(targetPosition) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 800; // 800ms
    let start = null;

    function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Función para el contador de tiempo
function startTimeCounter() {
    function updateCounter() {
        // Verificar si los elementos del contador existen
        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        
        // Si no existen los elementos, no hacer nada
        if (!daysElement || !hoursElement || !minutesElement) {
            return;
        }
        
        const now = new Date();
        const timeDiff = now - startDate;
        
        // Si la fecha es futura, mostrar 0
        if (timeDiff < 0) {
            daysElement.textContent = '0';
            hoursElement.textContent = '0';
            minutesElement.textContent = '0';
            return;
        }
        
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        
        daysElement.textContent = days;
        hoursElement.textContent = hours;
        minutesElement.textContent = minutes;
    }
    
    updateCounter();
    setInterval(updateCounter, 1000); // Actualizar cada segundo
}

// Función para crear corazones flotantes y elementos de cumpleaños
function createFloatingHearts() {
    const birthdayElements = ['🎂', '🎉', '🎈', '🎁', '💕', '💖', '💗', '💝', '💘', '💞', '🌟', '✨'];
    
    setInterval(() => {
        if (Math.random() > 0.7) { // 30% de probabilidad cada 2 segundos
            createBirthdayElement();
        }
    }, 2000);
}

function createBirthdayElement() {
    const element = document.createElement('div');
    const birthdayElements = ['🎂', '🎉', '🎈', '🎁', '💕', '💖', '💗', '💝', '💘', '💞', '🌟', '✨'];
    element.textContent = birthdayElements[Math.floor(Math.random() * birthdayElements.length)];
    element.style.position = 'fixed';
    element.style.left = Math.random() * 100 + 'vw';
    element.style.top = '100vh';
    element.style.fontSize = '2rem';
    element.style.pointerEvents = 'none';
    element.style.zIndex = '1000';
    element.style.animation = 'floatUp 4s linear forwards';
    
    document.body.appendChild(element);
    
    setTimeout(() => {
        element.remove();
    }, 4000);
}

// Función para efectos en las fotos
function addPhotoEffects() {
    const photoPlaceholders = document.querySelectorAll('.photo-placeholder');
    
    photoPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', () => {
            // Efecto de click
            placeholder.style.transform = 'scale(0.95)';
            setTimeout(() => {
                placeholder.style.transform = 'scale(1)';
            }, 150);
            
            // Mostrar mensaje especial
            showSpecialMessage();
        });
    });
}

// Función para mostrar mensaje especial de cumpleaños
function showSpecialMessage() {
    const messages = [
        "¡Feliz cumpleaños mi amor! 🎂💕",
        "¡Que tengas el mejor día de tu vida! 🎉",
        "¡Eres la estrella de mi vida! ⭐",
        "¡Que todos tus sueños se cumplan! 🌟",
        "¡Te amo más que ayer, menos que mañana! 💖",
        "¡Que este año esté lleno de felicidad! 🎁"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    // Crear notificación
    const notification = document.createElement('div');
    notification.textContent = randomMessage;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.background = 'linear-gradient(45deg, #ff6b6b, #ee5a52)';
    notification.style.color = 'white';
    notification.style.padding = '15px 25px';
    notification.style.borderRadius = '25px';
    notification.style.fontSize = '1.1rem';
    notification.style.zIndex = '10000';
    notification.style.boxShadow = '0 4px 15px rgba(255, 107, 107, 0.4)';
    notification.style.animation = 'slideInRight 0.5s ease';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease forwards';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// Función para efecto de scroll suave
function smoothScroll() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(section);
    });
}

// Función para añadir efectos de teclado
function addKeyboardEffects() {
    let loveTyped = '';
    const loveWord = 'te amo';
    
    document.addEventListener('keydown', (e) => {
        loveTyped += e.key.toLowerCase();
        
        if (loveWord.includes(loveTyped)) {
            if (loveTyped === loveWord) {
                createLoveExplosion();
                loveTyped = '';
            }
        } else {
            loveTyped = e.key.toLowerCase();
        }
    });
}

// Función para explosión de cumpleaños
function createLoveExplosion() {
    const explosion = document.createElement('div');
    explosion.innerHTML = '🎂🎉🎈🎁💕💖💗💝💘💞🌟✨'.repeat(8);
    explosion.style.position = 'fixed';
    explosion.style.top = '50%';
    explosion.style.left = '50%';
    explosion.style.transform = 'translate(-50%, -50%)';
    explosion.style.fontSize = '3rem';
    explosion.style.pointerEvents = 'none';
    explosion.style.zIndex = '10000';
    explosion.style.animation = 'explode 2s ease forwards';
    
    document.body.appendChild(explosion);
    
    setTimeout(() => {
        explosion.remove();
    }, 2000);
}

// Función para personalizar mensajes
function customizeMessages() {
    // Aquí puedes cambiar los mensajes personalizados
    const customMessages = {
        mainTitle: "Para Mi Novia Hermosa",
        subtitle: "Un regalo hecho con mucho amor 💕",
        letterTitle: "Mi Carta Para Ti",
        letterContent: [
            "Querida mía,",
            "Esta página es un pequeño regalo para decirte cuánto te amo. Cada día a tu lado es una bendición, y quiero que sepas que eres la luz de mi vida.",
            "Eres mi mejor amiga, mi confidente, mi compañera de aventuras y el amor de mi vida. Gracias por ser tan especial.",
            "Con todo mi amor,<br>Tu novio ❤️"
        ],
        reasons: [
            "Tu sonrisa ilumina mi día",
            "Eres la persona más comprensiva que conozco",
            "Tu risa es mi música favorita",
            "Me haces sentir especial cada día",
            "Eres mi mejor amiga y mi amor"
        ],
        finalMessage: "Gracias por ser la persona más maravillosa del mundo. Eres mi todo y espero pasar el resto de mi vida contigo."
    };
    
    return customMessages;
}

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    // Añadir estilos CSS adicionales para animaciones
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @keyframes explode {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            50% {
                transform: translate(-50%, -50%) scale(1.5);
                opacity: 0.8;
            }
            100% {
                transform: translate(-50%, -50%) scale(3);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Inicializar efectos
    addKeyboardEffects();
    smoothScroll();
    
    // Añadir efecto de click en el título principal
    const mainTitle = document.querySelector('.main-title');
    mainTitle.addEventListener('click', () => {
        createLoveExplosion();
    });
});

// Función para cambiar la fecha de inicio (para personalizar)
function setStartDate(year, month, day) {
    startDate.setFullYear(year, month - 1, day);
    startTimeCounter(); // Reiniciar contador con nueva fecha
}

// Función para añadir foto personalizada
function addCustomPhoto(imageUrl, placeholder) {
    const photoPlaceholder = document.querySelectorAll('.photo-placeholder')[placeholder];
    if (photoPlaceholder) {
        photoPlaceholder.innerHTML = `<img src="${imageUrl}" alt="Foto especial" style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px;">`;
    }
}
