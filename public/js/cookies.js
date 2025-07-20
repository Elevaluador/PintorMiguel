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


