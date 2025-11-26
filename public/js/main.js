    // Smooth scrolling para enlaces de navegación
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Manejador del formulario de contacto
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const nombre = formData.get('nombre');
            const telefono = formData.get('telefono');
            const servicio = formData.get('servicio');
            const mensaje = formData.get('mensaje');
            
            // Construye el texto que se enviará por WhatsApp
            const whatsappMessage = `Hola Miguel, mi nombre es ${nombre}. Me interesa el servicio de ${servicio}. ${mensaje}. Mi teléfono es ${telefono}.`;
            // Codifica el mensaje en la URL de WhatsApp
            const whatsappUrl = `https://wa.me/51905851831?text=${encodeURIComponent(whatsappMessage)}`;
            // Abre una nueva pestaña o ventana hacia WhatsApp Web / App con el mensaje prellenado
            window.open(whatsappUrl, '_blank');
        });

        // Funciones para el banner de cookies
            function aplicarConsentimiento(estadistica, comportamental) {
        if (typeof gtag === 'function') {
            gtag('consent', 'update', {
            'analytics_storage': estadistica ? 'granted' : 'denied',
            'ad_storage': comportamental ? 'granted' : 'denied'
            });
        }
        guardarConsentimiento(estadistica, comportamental);
        }

        function guardarConsentimiento(estadistica, comportamental) {
        localStorage.setItem("consentConfig", JSON.stringify({
            analytics_storage: estadistica,
            ad_storage: comportamental
        }));
        }

        function obtenerConsentimientoGuardado() {
        var consent = localStorage.getItem("consentConfig");
        return consent ? JSON.parse(consent) : null;
        }

        function ocultarBanner() {
        document.getElementById("consent-banner").style.display = 'none';
        document.getElementById("consent-config").style.display = 'none';
        }

        function gestionarConsentimiento(estadistica, comportamental) {
        aplicarConsentimiento(estadistica, comportamental);
        ocultarBanner();
        }

        window.aceptarTodo = () => gestionarConsentimiento(true, true);
        window.rechazarTodo = () => gestionarConsentimiento(false, false);
        window.actualizarConsentimiento = gestionarConsentimiento;

        window.guardarConfiguracion = function() {
        var estadistica = document.getElementById("consent-estadistica").checked;
        var comportamental = document.getElementById("consent-comportamental").checked;
        gestionarConsentimiento(estadistica, comportamental);
        };

        document.addEventListener("DOMContentLoaded", function() {
        var saved = obtenerConsentimientoGuardado();
        if (saved) {
            aplicarConsentimiento(saved.analytics_storage, saved.ad_storage);
            ocultarBanner();
        } else {
            document.getElementById("consent-banner").style.display = "block";
        }
        });