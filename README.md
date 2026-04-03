# Sistema de VoyagePasss

Sistema de venta y gestión de voyagePasses de transporte. Permite registrar rutas de bus, emitir voyagePasses con código QR para validación, y gestionar el estado de cada voyage-pass.

## Roles

- **Administrador**: gestiona rutas y consulta/valida/elimina voyagePasses emitidos.
- **Cajero**: registra nuevos voyagePasses y genera el comprobante imprimible con código QR.

## Requisitos

- .NET 8 SDK
- Node.js 18+

## Ejecución

**API:**
```bash
cd SmartJourney.API
dotnet run
```
Disponible en `http://localhost:5110`

**Frontend:**
```bash
cd smart-journey-ui
npx ng serve
```
Disponible en `http://localhost:4200`

Al abrir la aplicación se muestra una pantalla de inicio para seleccionar el rol.
