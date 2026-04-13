# cesar

Plataforma inicial para un curso de mindset enfocado en psicotrading.

## Qué incluye
- Inicio de sesión con persistencia local (`localStorage`).
- Calendario visual de clases en vivo para abril de 2026.
- 3 módulos del curso:
  1. Plano mental de la riqueza.
  2. Fluir para ganar en el trading.
  3. Integración al trading.
- Cada módulo muestra 10 lecciones, y cada lección incluye:
  - Botón de vídeo.
  - Botón de meditación.
  - Botón para marcar progreso.
- Progreso general del curso (0/30 hasta 30/30) guardado en navegador.

## Ejecutar localmente
```bash
python3 -m http.server 8000
```
Luego abre: `http://127.0.0.1:8000`.
