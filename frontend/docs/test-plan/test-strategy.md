# Espaw Finder — Estrategia de Pruebas

## 1. Alcance

Formularios de publicación:

- **LostPetForm** (Perdido)
- **FoundPetForm** (Encontrado)
- **LookingForMateForm** (Busca Pareja)
- **SolidarityHelpForm** (Ayuda Solidaria)

Flujos críticos:

- Completar campos requeridos
- Adjuntar archivos
- Envío (POST a `/backend/upload`)
- Manejo de éxito y error (feedback + redirección)
- Consistencia de `status`, `deviceId` y endpoint

## 2. Tipos de prueba

- **Unitarias (Jest)**  
  Validación de estructuras y utilidades: construcción de `FormData`.
- **Integración (RTL + Jest)**  
  Render del formulario, interacción del usuario, envío, mocks de red (`axios`), mocks de `MapView` y `FilePreview`.
- **Negativas**  
  Errores de backend; falta de campos requeridos (validación manual).
- **Regresión**  
  Asegurar `status`/`endpoint`/`deviceId` correctos para cada formulario.
- **E2E (Playwright)** _(planeado)_  
  Flujo “Publicar Perdido”: submit feliz y error (mock de respuesta).

## 3. Entorno

- **Frontend**: CRA (react-scripts), Jest + @testing-library/react, jsdom
- **E2E**: Playwright (headless)
- **Mocks**: `axios`, componentes de mapa/preview
- **Datos**: `localStorage.anonymousPostUUID` simulado en tests

## 4. Criterios de entrada

- Código compila
- Dependencias instaladas
- Mocks configurados (axios, MapView, FilePreview)

## 5. Criterios de salida (Definition of Done de pruebas)

- Cobertura mínima **≥ 80%** en statements y branches para componentes de formularios
- Todos los tests unit/integración/regresión **en verde**
- Al menos 1 E2E **pasando** del flujo “Perdido”
- Documentación presente: `risk-register.md`, `test-strategy.md`, `test-cases.md`

## 6. Métricas / “Datos de calidad”

- Reporte de cobertura (Jest): `coverage/lcov-report`
- Conteo de pruebas por tipo (unit/integration/regression/e2e)

## 7. Trazabilidad a riesgos

Ver tabla en `risk-register.md` y mapa TC en `test-cases.md`.

## 8. Automatización (CI)

Pipeline recomendado:

1. `npm ci`
2. `npm run lint`
3. `npm test -- --coverage`
   Publicar reporte HTML de cobertura.

## 9. Fuera de alcance (esta iteración)

- Tests de performance/carga (k6/Artillery) — **plan futuro**
- Casos UI complejos con mapa real (se mockea)
