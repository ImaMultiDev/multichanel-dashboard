# Cuartel general

Panel web personal para gestionar **identidades musicales digitales**: varios proyectos en un solo sitio, cada uno con branding propio, enlaces a plataformas (Spotify, YouTube, Instagram, TikTok, Facebook, web oficial, etc.), recursos y notas rápidas. Pensado como herramienta creativa, no como un CRM corporativo.

## Características principales

- **Panel de identidades** con vista clara del estado de cada proyecto y accesos directos a redes.
- **Detalle por proyecto**: cabecera de branding editable, bloques de plataformas con iconos, enlaces y notas.
- **Interfaz oscura** con tipografía con carácter (Bebas Neue + DM Sans) y acentos por proyecto.
- **Persistencia** con PostgreSQL y Prisma ORM.

## Stack

| Tecnología | Uso |
|------------|-----|
| [Next.js](https://nextjs.org) 16 (App Router) | Framework full stack y UI |
| [React](https://react.dev) 19 | Componentes y formularios |
| [Tailwind CSS](https://tailwindcss.com) 4 | Estilos |
| [Prisma](https://www.prisma.io) 6 | ORM y modelo de datos |
| PostgreSQL | Base de datos relacional |

Despliegue habitual: aplicación en **Vercel**, base de datos en **Railway** (u otro proveedor PostgreSQL compatible).

## Requisitos

- Node.js **20.x** o superior (recomendado LTS).
- Una base de datos **PostgreSQL** accesible mediante URL de conexión.

## Puesta en marcha (local)

1. **Clonar el repositorio** e instalar dependencias:

   ```bash
   git clone <url-del-repo>
   cd multichanel
   npm ci
   ```

2. **Variables de entorno**: copia el ejemplo y configura la conexión a la base de datos.

   ```bash
   cp .env.example .env
   ```

   Edita `.env` y asigna un `DATABASE_URL` válido (incluye `sslmode=require` si tu proveedor lo exige).

3. **Aplicar el esquema** en la base de datos (elige una estrategia):

   - Desarrollo rápido sin historial de migraciones:

     ```bash
     npm run db:push
     ```

   - Flujo con migraciones versionadas:

     ```bash
     npm run db:migrate
     ```

4. **Arrancar el servidor de desarrollo**:

   ```bash
   npm run dev
   ```

   La aplicación estará en [http://localhost:3000](http://localhost:3000).

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo Next.js |
| `npm run build` | Compilación de producción |
| `npm run start` | Servidor Node tras `build` |
| `npm run lint` | ESLint |
| `npm run db:push` | Sincroniza el esquema Prisma con la BD (`db push`) |
| `npm run db:migrate` | Crea o aplica migraciones (`migrate dev`) |
| `npm run db:studio` | Abre Prisma Studio para inspeccionar datos |

Tras `npm install`, `postinstall` ejecuta `prisma generate` para generar el cliente Prisma.

## Variables de entorno

| Variable | Obligatoria | Descripción |
|----------|-------------|-------------|
| `DATABASE_URL` | Sí | URL de conexión PostgreSQL (`postgresql://…`) |

Los valores sensibles **no** deben subirse al repositorio. Solo se versiona `.env.example` como plantilla.

Imágenes de proyecto pueden referenciarse por URL pública (por ejemplo CDN tipo **Cloudinary**); no es obligatorio configurar claves en el servidor para el flujo actual básico.

## Estructura del proyecto (resumen)

```
├── prisma/
│   └── schema.prisma      # Modelo de datos (Project, Platform, ResourceLink, QuickNote)
├── src/
│   ├── app/               # Rutas App Router (panel, nueva identidad, proyecto por slug)
│   ├── actions/           # Server Actions (mutaciones)
│   ├── components/        # UI reutilizable y formularios
│   └── lib/               # Prisma client, utilidades (slug, URLs, orden de plataformas)
├── .env.example           # Plantilla de variables de entorno
└── package.json
```

## Despliegue en producción

1. **Base de datos**: crea una instancia PostgreSQL (Railway, Neon, Supabase, etc.) y obtén `DATABASE_URL`.

2. **Aplicación (Vercel)**:
   - Importa el repositorio y define la variable de entorno `DATABASE_URL` en el proyecto.
   - El comando de build por defecto (`next build`) ejecutará `postinstall` → `prisma generate`.
   - Asegura que el esquema esté aplicado en la BD de producción (`db push` manual, `migrate deploy` en CI/CD o pipeline propio).

3. Comprueba que la URL de Postgres permita conexiones desde los rangos IP del proveedor de hosting si aplica (SSL casi siempre requerido).

## Licencia y uso

Repositorio **privado** / uso personal salvo que indiques lo contrario. Ajusta esta sección según la licencia que quieras publicar.

---

¿Dudas sobre el modelo de datos o el despliegue? Revisa `prisma/schema.prisma` y la [documentación de Prisma Deploy](https://www.prisma.io/docs/orm/prisma-client/deployment).
