
// Función para iniciar la experiencia
function startExperience() {
    // Reproducir la canción de cumpleaños
    const birthdaySong = document.getElementById('birthdaySong');
    if (birthdaySong) {
        // Configurar audio para móviles
        birthdaySong.volume = 0.7; // Volumen moderado
        birthdaySong.loop = true; // Repetir la canción
        
        birthdaySong.play().catch(error => {
            console.log('No se pudo reproducir la canción automáticamente:', error);
            // Mostrar un mensaje especial para móviles
            showMobileAudioMessage();
        });
    }
    
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


// Función para crear corazones flotantes y elementos de cumpleaños
function createFloatingHearts() {
    const birthdayElements = ['🎂', '🎉', '🎈', '🎁', '💕', '💖', '💗', '💝', '💘', '💞', '🌟', '✨'];
    
    // Crear algunos elementos inmediatamente al cargar
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            createBirthdayElement();
        }, i * 500); // Cada 500ms
    }
    
    setInterval(() => {
        if (Math.random() > 0.6) { // 40% de probabilidad cada 1.5 segundos
            createBirthdayElement();
        }
    }, 1500);
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
    // Iniciar corazones flotantes inmediatamente
    createFloatingHearts();
    
    // Añadir controles de audio
    addAudioControls();
    
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

// Función para mostrar mensaje especial para móviles
function showMobileAudioMessage() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    const notification = document.createElement('div');
    notification.innerHTML = `
        <div style="background: linear-gradient(45deg, #ff6b6b, #ee5a52); color: white; padding: 20px; border-radius: 15px; text-align: center; box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);">
            <h3 style="margin: 0 0 10px 0;">🎵 ¡Activa la música para una experiencia completa! 🎵</h3>
            <p style="margin: 0 0 15px 0;">${isMobile ? 'En dispositivos móviles, necesitas activar la música manualmente. ¡Haz clic en el botón de abajo!' : 'Para una experiencia completa, haz clic en el botón de abajo para reproducir la canción de cumpleaños'}</p>
            <button onclick="playBirthdaySong()" style="background: white; color: #ff6b6b; border: none; padding: 12px 25px; border-radius: 25px; font-weight: bold; cursor: pointer; font-size: 1.1rem; box-shadow: 0 2px 10px rgba(0,0,0,0.2);">
                ▶️ Reproducir Música
            </button>
            ${isMobile ? '<p style="margin: 10px 0 0 0; font-size: 0.9rem; opacity: 0.8;">💡 Tip: También puedes usar los controles de abajo</p>' : ''}
        </div>
    `;
    notification.style.position = 'fixed';
    notification.style.top = '50%';
    notification.style.left = '50%';
    notification.style.transform = 'translate(-50%, -50%)';
    notification.style.zIndex = '10000';
    notification.style.maxWidth = isMobile ? '350px' : '400px';
    notification.style.animation = 'slideInRight 0.5s ease';
    
    document.body.appendChild(notification);
    
    // Auto-remover después de 15 segundos en móviles
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.5s ease forwards';
            setTimeout(() => {
                notification.remove();
            }, 500);
        }
    }, isMobile ? 15000 : 10000);
}

// Función para mostrar mensaje de permisos de audio (versión original)
function showAudioPermissionMessage() {
    showMobileAudioMessage(); // Usar la versión mejorada
}

// Función para reproducir la canción de cumpleaños
function playBirthdaySong() {
    const birthdaySong = document.getElementById('birthdaySong');
    if (birthdaySong) {
        birthdaySong.play().then(() => {
            console.log('Canción de cumpleaños reproduciéndose');
            // Ocultar el mensaje de permisos si existe
            const audioMessage = document.querySelector('[style*="position: fixed"][style*="top: 50%"]');
            if (audioMessage) {
                audioMessage.remove();
            }
        }).catch(error => {
            console.log('Error al reproducir la canción:', error);
        });
    }
}

// Función para pausar la canción
function pauseBirthdaySong() {
    const birthdaySong = document.getElementById('birthdaySong');
    if (birthdaySong) {
        birthdaySong.pause();
    }
}

// Función para añadir controles de audio
function addAudioControls() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    const audioControls = document.createElement('div');
    audioControls.innerHTML = `
        <div style="position: fixed; bottom: 20px; right: 20px; z-index: 1000; display: flex; gap: 10px; flex-direction: ${isMobile ? 'column' : 'row'};">
            <button onclick="playBirthdaySong()" style="background: linear-gradient(45deg, #ff6b6b, #ee5a52); color: white; border: none; padding: ${isMobile ? '15px' : '10px'}; border-radius: 50%; cursor: pointer; font-size: ${isMobile ? '1.5rem' : '1.2rem'}; box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4); transition: transform 0.2s;" title="Reproducir música" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                ▶️
            </button>
            <button onclick="pauseBirthdaySong()" style="background: linear-gradient(45deg, #4ecdc4, #44a08d); color: white; border: none; padding: ${isMobile ? '15px' : '10px'}; border-radius: 50%; cursor: pointer; font-size: ${isMobile ? '1.5rem' : '1.2rem'}; box-shadow: 0 4px 15px rgba(78, 205, 196, 0.4); transition: transform 0.2s;" title="Pausar música" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                ⏸️
            </button>
            ${isMobile ? '<div style="text-align: center; color: white; font-size: 0.8rem; margin-top: 5px; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">🎵 Música 🎵</div>' : ''}
        </div>
    `;
    document.body.appendChild(audioControls);
}

// Función para añadir foto personalizada
function addCustomPhoto(imageUrl, placeholder) {
    const photoPlaceholder = document.querySelectorAll('.photo-placeholder')[placeholder];
    if (photoPlaceholder) {
        photoPlaceholder.innerHTML = `<img src="${imageUrl}" alt="Foto especial" style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px;">`;
    }
}
