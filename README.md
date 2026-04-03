# Sistema de Tickets

Sistema de venta y gestión de tickets de transporte. Permite registrar rutas de bus, emitir tickets con código QR para validación, y gestionar el estado de cada ticket.

## Roles

- **Administrador**: gestiona rutas y consulta/valida/elimina tickets emitidos.
- **Cajero**: registra nuevos tickets y genera el comprobante imprimible con código QR.

## Requisitos

- .NET 8 SDK
- Node.js 18+

## Ejecución

**API:**
```bash
cd TicketSystem.API
dotnet run
```
Disponible en `http://localhost:5110`

**Frontend:**
```bash
cd ticket-system-ui
npx ng serve
```
Disponible en `http://localhost:4200`

Al abrir la aplicación se muestra una pantalla de inicio para seleccionar el rol.
