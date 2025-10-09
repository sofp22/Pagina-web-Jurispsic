document.addEventListener('DOMContentLoaded', () => {

    // --- FUNCIONALIDADES GLOBALES ---

    // 1. Obtener los elementos del DOM
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-message-status'); // Nuevo: Contenedor de mensajes

    // URL del formulario en Formspree
    const formspreeUrl = 'https://formspree.io/f/xjkabyyl'; 

    // --- FUNCIÓN DE UTILIDAD: Mostrar mensajes de estado ---

    function showStatusMessage(message, type) {
        if (!formStatus) return; // Si no existe el contenedor de mensajes, no hagas nada.
        
        formStatus.textContent = message;
        formStatus.className = type + ' show'; // Asigna la clase (success o error) y la clase 'show'
        formStatus.style.display = 'block';

        // Oculta el mensaje después de 5 segundos
        setTimeout(() => {
            formStatus.classList.remove('show');
            formStatus.style.display = 'none';
        }, 5000);
    }


    // --- FUNCIONALIDAD 1: MENÚ DE NAVEGACIÓN RESPONSIVO ---

    // 2. Agregar un "escuchador de eventos" para el clic en el botón de hamburguesa
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !isExpanded);
        });
    }


    // --- FUNCIONALIDAD 2: FORMULARIO DE CONTACTO ---

    // Si el formulario existe en esta página...
    if (contactForm) {
        // 2. Agregar un "escuchador de eventos" para cuando se envíe el formulario
        contactForm.addEventListener('submit', async (event) => {
            // Prevenir el envío por defecto del formulario
            event.preventDefault();

            // 3. Obtener los valores de los campos
            const nombre = document.getElementById('nombre').value;
            const correo = document.getElementById('correo').value;
            const mensaje = document.getElementById('mensaje').value;

            // El campo teléfono es opcional, por eso no lo incluimos en la validación estricta de vacíos.
            
            // 4. Realizar la validación
            if (nombre === '' || correo === '' || mensaje === '') {
                // CAMBIO: Usamos la nueva función showStatusMessage en lugar de alert()
                showStatusMessage('⚠️ Por favor, completa tu nombre, correo y mensaje.', 'error');
            } else {
                // Si la validación es exitosa, se envían los datos
                const formData = new FormData(contactForm);
                
                try {
                    const response = await fetch(formspreeUrl, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    });

                    if (response.ok) {
                        // CAMBIO: Usamos la nueva función showStatusMessage
                        showStatusMessage('✅ ¡Mensaje recibido! Nos pondremos en contacto contigo pronto.', 'success');
                        contactForm.reset();
                    } else {
                        // CAMBIO: Usamos la nueva función showStatusMessage para errores
                        showStatusMessage('❌ Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.', 'error');
                    }
                } catch (error) {
                    // CAMBIO: Usamos la nueva función showStatusMessage para errores de conexión
                    showStatusMessage('🌐 Error de conexión. Verifica tu red e inténtalo de nuevo.', 'error');
                }
            }
        });
    }
});