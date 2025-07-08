# SIOM Academia - Landing Page

Una landing page corporativa moderna para una empresa de cursos, construida con Next.js, React, TailwindCSS y Framer Motion.

## 🚀 Características

- **Diseño Corporativo**: Inspirado en la cuenta de Instagram @siom_academia
- **Animaciones Profesionales**: Usando Framer Motion
- **Responsive Design**: Optimizado para todos los dispositivos
- **Pasarelas de Pago**: Integración con PayPal y Mercado Pago
- **Landing Page Completa**: Con todas las secciones necesarias

## 🛠️ Tecnologías

- **Next.js 15** - Framework de React
- **React 18** - Biblioteca de UI
- **TailwindCSS** - Framework de CSS
- **Framer Motion** - Animaciones
- **PayPal** - Pasarela de pagos internacional
- **Mercado Pago** - Pasarela de pagos para Latinoamérica

## 📦 Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd siomacademia-pagina

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
```

## ⚙️ Configuración

### 1. Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# PayPal (Obtén tus claves en https://developer.paypal.com/)
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id_here

# Mercado Pago (Obtén tu token en https://www.mercadopago.com/developers)
MERCADOPAGO_ACCESS_TOKEN=your_mercadopago_access_token_here

# URL Base (para webhooks y redirecciones)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 2. Configurar PayPal

1. Ve a [PayPal Developer Dashboard](https://developer.paypal.com/)
2. Crea una cuenta o inicia sesión
3. Ve a My Apps & Credentials
4. Crea una nueva app o usa la sandbox
5. Copia el Client ID
6. Pega el Client ID en tu archivo `.env.local`

### 3. Configurar Mercado Pago

1. Ve a [Mercado Pago Developers](https://www.mercadopago.com/developers)
2. Crea una cuenta o inicia sesión
3. Ve a Credentials
4. Copia el Access Token (test o production)
5. Pega el Access Token en tu archivo `.env.local`

## 🚀 Ejecutar el Proyecto

```bash
# Desarrollo
npm run dev

# Producción
npm run build
npm start
```

## 💳 Pasarelas de Pago

### PayPal Integration

La aplicación incluye una integración completa con PayPal:

- **API Route**: `/api/create-paypal-order`
- **Componente Modal**: `PaymentModal.js`
- **PayPal Buttons**: Para pagos seguros

### Mercado Pago Integration

Integración completa con Mercado Pago:

- **API Route**: `/api/create-mercadopago-preference`
- **Webhook**: `/api/webhook/mercadopago`
- **Redirección segura**: A Mercado Pago

### Funcionalidades de Pago

- ✅ PayPal (internacional)
- ✅ Mercado Pago (Latinoamérica)
- ✅ Validación en tiempo real
- ✅ Manejo de errores
- ✅ Confirmación de pago exitoso
- ✅ Diseño responsive del modal
- ✅ Selector de método de pago

### Configuración de Webhooks (Opcional)

Para manejar eventos de pago en producción:

#### Mercado Pago Webhooks:
1. Ve a Mercado Pago Dashboard > Webhooks
2. Crea un endpoint para tu dominio
3. URL: `https://tudominio.com/api/webhook/mercadopago`
4. Selecciona eventos: `payment.created`, `payment.updated`

## 📁 Estructura del Proyecto

```
siomacademia-pagina/
├── app/
│   ├── api/
│   │   ├── create-paypal-order/
│   │   │   └── route.js          # API para PayPal
│   │   ├── create-mercadopago-preference/
│   │   │   └── route.js          # API para Mercado Pago
│   │   └── webhook/
│   │       └── mercadopago/
│   │           └── route.js      # Webhook de Mercado Pago
│   ├── components/
│   │   └── PaymentModal.js       # Modal de pago
│   ├── globals.css               # Estilos globales
│   ├── layout.js                 # Layout principal
│   └── page.js                   # Página principal
├── public/                       # Archivos estáticos
└── package.json
```

## 🎨 Personalización

### Colores Principales

- **Azul Oscuro**: `#1A237E`
- **Azul Claro**: `#64B5F6`
- **Dorado**: `#FFD700`
- **Gris Claro**: `#F5F7FA`

### Secciones de la Landing

1. **Header**: Navegación sticky
2. **Hero**: Sección principal con CTA
3. **Sobre Nosotros**: Información de la empresa
4. **Cursos**: Catálogo con precios
5. **Testimonios**: Opiniones de clientes
6. **Equipo**: Miembros del equipo
7. **Contacto**: Formulario de contacto
8. **Footer**: Enlaces y redes sociales

## 🔧 Comandos Útiles

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar en producción
npm start

# Linting
npm run lint
```

## 📱 Responsive Design

La página está optimizada para:
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Pantallas grandes (1440px+)

## 🎭 Animaciones

Todas las animaciones están implementadas con Framer Motion:
- Entrada de elementos
- Hover effects
- Transiciones suaves
- Scroll-triggered animations

## 🔒 Seguridad

- ✅ Variables de entorno para claves sensibles
- ✅ Validación de formularios
- ✅ Manejo seguro de pagos con PayPal y Mercado Pago
- ✅ HTTPS en producción
- ✅ Webhooks para confirmación de pagos

## 🚀 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. Deploy automático

### Otros Proveedores

- **Netlify**: Soporte completo para Next.js
- **Railway**: Fácil despliegue
- **DigitalOcean**: Control total del servidor

## 📞 Soporte

Para soporte técnico o preguntas sobre la implementación, contacta al equipo de desarrollo.

---

**SIOM Academia** - Transformando vidas a través de la educación de calidad.
