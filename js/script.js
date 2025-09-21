document.addEventListener('DOMContentLoaded', () => {

    // --- FUNCIONALIDAD 1: MENÚ DE NAVEGACIÓN RESPONSIVO ---

    // 1. Obtener los elementos del DOM
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.getElementById('main-nav');

    // 2. Agregar un "escuchador de eventos" para el clic en el botón de hamburguesa
    menuToggle.addEventListener('click', () => {
        // 3. Alternar la clase 'active' en el menú de navegación
        mainNav.classList.toggle('active');

        // 4. Actualizar el atributo ARIA para accesibilidad
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
        menuToggle.setAttribute('aria-expanded', !isExpanded);
    });

    // --- FUNCIONALIDAD 2: FORMULARIO DE CONTACTO ---

    console.log('El sitio web ha cargado completamente.');

    // 1. Obtener el formulario de contacto
    const contactForm = document.getElementById('contact-form');
    
    // URL del formulario en Formspree
    const formspreeUrl = 'https://formspree.io/f/xjkabyyl'; 

    // Si el formulario existe en esta página...
    if (contactForm) {
        // 2. Agregar un "escuchador de eventos" para cuando se envíe el formulario
        contactForm.addEventListener('submit', async (event) => {
            // Prevenir el envío por defecto del formulario
            event.preventDefault();

            // 3. Obtener los valores de los campos
            const nombre = document.getElementById('nombre').value;
            const correo = document.getElementById('correo').value;
            const telefono = document.getElementById('telefono').value;
            const mensaje = document.getElementById('mensaje').value;

            // 4. Realizar la validación
            if (nombre === '' || correo === '' || telefono === ''|| mensaje === '') {
                alert('Por favor, completa todos los campos obligatorios.');
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
                        alert('¡Gracias! Tu mensaje ha sido enviado.');
                        contactForm.reset();
                    } else {
                        alert('Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.');
                    }
                } catch (error) {
                    alert('Hubo un error en la conexión. Por favor, inténtalo de nuevo.');
                }
            }
        });
    }
});
