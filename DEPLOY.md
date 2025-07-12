# Instrucciones para Deploy en Vercel

## Variables de Entorno Requeridas

Configura las siguientes variables de entorno en tu proyecto de Vercel:

### Mercado Pago
```
MERCADOPAGO_ACCESS_TOKEN=your_mercadopago_access_token_here
```

### PayPal
```
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id_here
```

### Base URL
```
NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app
```

## Pasos para el Deploy

1. **Conectar el repositorio a Vercel**
   - Ve a [vercel.com](https://vercel.com)
   - Conecta tu repositorio de GitHub
   - Selecciona el framework: Next.js

2. **Configurar las variables de entorno**
   - En el dashboard de Vercel, ve a Settings > Environment Variables
   - Agrega las variables mencionadas arriba

3. **Deploy automático**
   - Vercel detectará automáticamente que es un proyecto Next.js
   - El build se ejecutará automáticamente con `npm run build`

## Solución de Problemas Comunes

### Error de SQLite
- El proyecto usa `better-sqlite3` que es compatible con Vercel
- La base de datos se creará automáticamente en el primer acceso

### Error de Tailwind CSS
- Se ha configurado Tailwind CSS v3.4.17
- Los archivos de configuración están correctamente configurados

### Error de dependencias
- Todas las dependencias están actualizadas y son compatibles con Vercel
- Se ha agregado `better-sqlite3` en lugar de `sqlite3`

## Verificación del Deploy

1. Verifica que el build sea exitoso
2. Revisa los logs de build en Vercel
3. Prueba las funcionalidades principales:
   - Lista de cursos
   - Filtros y búsqueda
   - Modal de pagos
   - APIs de cursos

## Notas Importantes

- La base de datos SQLite se creará automáticamente
- Los webhooks de Mercado Pago necesitan ser configurados en el dashboard de Mercado Pago
- Asegúrate de que las URLs de webhook apunten a tu dominio de Vercel 