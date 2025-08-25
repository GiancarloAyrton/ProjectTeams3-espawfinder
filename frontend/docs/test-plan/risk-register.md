# Espaw Finder — Matriz de Riesgos

## Escalas

- **Impacto**: Alto / Medio / Bajo
- **Probabilidad**: Alto / Medio / Bajo
- **Severidad** = Impacto × Probabilidad (Alto/Medio/Bajo, cualitativo)

## Riesgos

| ID  | Riesgo                                                               | Impacto | Prob. | Severidad | Mitigación                                                           | Pruebas asociadas                          |
| --- | -------------------------------------------------------------------- | ------- | ----- | --------- | -------------------------------------------------------------------- | ------------------------------------------ |
| R1  | No se crea la publicación por datos inválidos o faltantes            | Alto    | Med   | Alto      | Validación manual de requeridos; pruebas unit/integración            | TC-FOUND-REQ, TC-LOST-ERR, IT-\*-SUBMIT-OK |
| R2  | Búsqueda y filtros inconsistentes / payload mal formado              | Med     | Med   | Med       | Tests de construcción de FormData, regresión de `status`, `deviceId` | UT-FORMDATA-LOST, REG-STATUS-ENDPOINT      |
| R3  | Carga de archivos falla (tipo/tamaño) o no se envía en `FormData`    | Med     | Med   | Med       | Validaciones básicas, mock de archivo en tests                       | IT-\*-SUBMIT-OK                            |
| R4  | Endpoint incorrecto o cambios accidentales en la URL de subida       | Alto    | Bajo  | Med       | Test de regresión del endpoint                                       | REG-STATUS-ENDPOINT                        |
| R5  | Errores de backend (500/timeout) no se manejan y la UI queda colgada | Alto    | Med   | Alto      | Manejo de errores, re-habilitar botón, no redirigir                  | TC-LOST-ERR                                |
| R6  | Lat/long/ubicación no seteadas desde el mapa                         | Bajo    | Med   | Bajo      | Mock de MapView, tests de submit no dependientes de mapa             | IT-\*-SUBMIT-OK                            |
| R7  | Inconsistencia de `status` por tipo de formulario                    | Alto    | Bajo  | Med       | Test de regresión que valide `status` enviado                        | REG-STATUS-ENDPOINT                        |
| R8  | Falta de `deviceId` en publicaciones anónimas                        | Med     | Bajo  | Bajo      | Test de regresión para `deviceId`                                    | REG-STATUS-ENDPOINT                        |

> **Leyenda de pruebas** (ver `test-cases.md` para detalle):
>
> - `UT-*`: Unit
> - `IT-*`: Integration
> - `TC-*`: Casos negativos/errores
> - `REG-*`: Regresión
