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


    // --- FUNCIONALIDAD 2: VALIDACIÓN DE FORMULARIO DE CONTACTO ---

    // 1. Obtener el formulario de contacto
    const contactForm = document.getElementById('contact-form');

    // Verificamos si el formulario existe en la página actual
    if (contactForm) {
        // 2. Agregar un "escuchador de eventos" para cuando se envíe el formulario
        contactForm.addEventListener('submit', (event) => {
            // Prevenir el envío por defecto del formulario
            event.preventDefault();

            // 3. Obtener los valores de los campos
            const nombre = document.getElementById('nombre').value;
            const correo = document.getElementById('correo').value;
            const mensaje = document.getElementById('mensaje').value;

            // 4. Realizar la validación
            if (nombre === '' || correo === '' || mensaje === '') {
                alert('Por favor, completa todos los campos obligatorios.');
            } else {
                // Si todo está correcto, puedes mostrar un mensaje y resetear el formulario
                alert('¡Gracias! Tu mensaje ha sido enviado.');
                contactForm.reset();
            }
        });
    }
});