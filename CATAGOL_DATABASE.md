# CATAGOL — Arquitectura de Base de Datos

Este documento define la estructura de datos de CATAGOL.

La base de datos debe permitir administrar ligas, temporadas, categorías, clubes, jugadores, partidos y noticias sin depender de archivos estáticos dentro del proyecto.

---

# 1. Principios generales

## Identificadores

Todas las tablas utilizarán identificadores UUID.

Ejemplo:

```text
550e8400-e29b-41d4-a716-446655440000
```

No utilizaremos identificadores numéricos autoincrementales.

---

## Fechas

Los registros administrativos utilizarán:

```text
created_at
updated_at
```

Los partidos utilizarán un campo con fecha y hora:

```text
fecha_hora
```

---

## Imágenes

La base de datos no almacenará archivos de imagen.

Solo almacenará rutas o URLs.

Ejemplo:

```text
/escudos/villa-cubas.png
```

En el futuro, las imágenes estarán alojadas en Supabase Storage.

---

## Eliminación de datos

Siempre que sea posible evitaremos borrar información histórica.

Las tablas principales tendrán:

```text
activo: true | false
```

Un club o una competición podrán desactivarse sin eliminar su historial.

---

## Estados controlados

Los partidos utilizarán únicamente estos estados:

```text
programado
en_vivo
finalizado
suspendido
postergado
cancelado
```

No se permitirán variantes escritas manualmente como:

```text
Final
FINAL
Terminado
```

---

# 2. Tabla: temporadas

Representa cada temporada deportiva.

## Campos

| Campo | Tipo | Descripción |
|---|---|---|
| id | uuid | Identificador único |
| nombre | text | Nombre visible, por ejemplo Temporada 2026 |
| anio | integer | Año de la temporada |
| fecha_inicio | date | Inicio oficial |
| fecha_fin | date | Finalización estimada |
| activa | boolean | Temporada actualmente seleccionada |
| created_at | timestamptz | Fecha de creación |
| updated_at | timestamptz | Última modificación |

## Ejemplo

```text
Temporada 2026
Año: 2026
Activa: sí
```

---

# 3. Tabla: ligas

Representa una institución o competencia organizadora.

## Campos

| Campo | Tipo | Descripción |
|---|---|---|
| id | uuid | Identificador único |
| nombre | text | Nombre completo |
| slug | text | Identificador para la URL |
| descripcion | text | Información general |
| logo_url | text | Logo de la liga |
| ciudad | text | Ciudad principal |
| provincia | text | Provincia |
| activa | boolean | Indica si se muestra públicamente |
| created_at | timestamptz | Fecha de creación |
| updated_at | timestamptz | Última modificación |

## Ejemplos

```text
Liga Catamarqueña
slug: catamarquena
```

```text
Liga Chacarera
slug: chacarera
```

## Reglas

- `slug` debe ser único.
- Una liga puede tener muchas categorías.
- Una liga puede participar en muchas temporadas.

---

# 4. Tabla: categorias

Representa una división deportiva dentro de una liga.

## Campos

| Campo | Tipo | Descripción |
|---|---|---|
| id | uuid | Identificador único |
| liga_id | uuid | Liga a la que pertenece |
| nombre | text | Primera A, Primera B, Reserva, etc. |
| slug | text | Identificador interno |
| descripcion | text | Información opcional |
| activa | boolean | Estado de la categoría |
| created_at | timestamptz | Fecha de creación |
| updated_at | timestamptz | Última modificación |

## Ejemplos

```text
Primera A
Primera B
Reserva
Femenino
Sub 17
```

## Relación

```text
liga 1 ─── N categorias
```

---

# 5. Tabla: equipos

Representa la identidad permanente de cada club.

La liga y la categoría no deben quedar guardadas permanentemente dentro del equipo, porque pueden cambiar según la temporada.

## Campos

| Campo | Tipo | Descripción |
|---|---|---|
| id | uuid | Identificador único |
| nombre | text | Nombre completo |
| nombre_corto | text | Nombre utilizado en resultados |
| slug | text | Ruta del club |
| escudo_url | text | Escudo |
| ciudad | text | Ciudad |
| departamento | text | Departamento |
| fundacion | integer | Año de fundación |
| descripcion | text | Historia o información general |
| activo | boolean | Estado del club |
| created_at | timestamptz | Fecha de creación |
| updated_at | timestamptz | Última modificación |

## Ejemplo

```text
Nombre: Club Sportivo Villa Cubas
Nombre corto: Villa Cubas
Slug: villa-cubas
```

## Reglas

- `slug` debe ser único.
- `nombre_corto` debe ser único.
- El equipo no guarda directamente su liga actual.
- La participación se define mediante inscripciones.

---

# 6. Tabla: inscripciones_equipos

Relaciona un equipo con una liga, categoría y temporada.

Esta tabla permite que un equipo participe en diferentes categorías o competiciones a lo largo de los años.

## Campos

| Campo | Tipo | Descripción |
|---|---|---|
| id | uuid | Identificador único |
| temporada_id | uuid | Temporada correspondiente |
| liga_id | uuid | Liga correspondiente |
| categoria_id | uuid | Categoría correspondiente |
| equipo_id | uuid | Equipo inscripto |
| grupo | text | Zona o grupo opcional |
| activo | boolean | Participación vigente |
| created_at | timestamptz | Fecha de creación |
| updated_at | timestamptz | Última modificación |

## Ejemplo

```text
Villa Cubas
Liga Catamarqueña
Primera A
Temporada 2026
```

## Restricción

No puede repetirse la misma combinación:

```text
temporada + liga + categoría + equipo
```

---

# 7. Tabla: jugadores

Representa a los futbolistas registrados.

La tabla se creará desde el comienzo, aunque inicialmente quede vacía.

## Campos

| Campo | Tipo | Descripción |
|---|---|---|
| id | uuid | Identificador único |
| nombre | text | Nombre |
| apellido | text | Apellido |
| slug | text | Ruta del jugador |
| fecha_nacimiento | date | Fecha de nacimiento |
| nacionalidad | text | Nacionalidad |
| posicion | text | Posición habitual |
| foto_url | text | Fotografía |
| altura_cm | integer | Altura opcional |
| peso_kg | numeric | Peso opcional |
| activo | boolean | Estado del jugador |
| created_at | timestamptz | Fecha de creación |
| updated_at | timestamptz | Última modificación |

## Posiciones permitidas inicialmente

```text
arquero
defensor
mediocampista
delantero
```

---

# 8. Tabla: planteles

Relaciona un jugador con un equipo durante una temporada.

## Campos

| Campo | Tipo | Descripción |
|---|---|---|
| id | uuid | Identificador único |
| jugador_id | uuid | Jugador |
| equipo_id | uuid | Equipo |
| temporada_id | uuid | Temporada |
| categoria_id | uuid | Categoría |
| dorsal | integer | Número de camiseta |
| desde | date | Fecha de incorporación |
| hasta | date | Fecha de finalización |
| activo | boolean | Pertenece actualmente al plantel |
| created_at | timestamptz | Fecha de creación |
| updated_at | timestamptz | Última modificación |

---

# 9. Tabla: fechas_competencia

Representa cada jornada de una categoría.

## Campos

| Campo | Tipo | Descripción |
|---|---|---|
| id | uuid | Identificador único |
| temporada_id | uuid | Temporada |
| liga_id | uuid | Liga |
| categoria_id | uuid | Categoría |
| numero | integer | Número de fecha |
| nombre | text | Nombre visible opcional |
| fecha_inicio | date | Inicio de la jornada |
| fecha_fin | date | Finalización |
| estado | text | Estado de la fecha |
| created_at | timestamptz | Fecha de creación |
| updated_at | timestamptz | Última modificación |

## Estados

```text
programada
en_curso
finalizada
```

---

# 10. Tabla: partidos

Representa un encuentro oficial.

## Campos

| Campo | Tipo | Descripción |
|---|---|---|
| id | uuid | Identificador único |
| temporada_id | uuid | Temporada |
| liga_id | uuid | Liga |
| categoria_id | uuid | Categoría |
| fecha_competencia_id | uuid | Jornada |
| local_id | uuid | Equipo local |
| visitante_id | uuid | Equipo visitante |
| fecha_hora | timestamptz | Fecha y hora |
| estadio | text | Estadio |
| goles_local | integer | Goles del local |
| goles_visitante | integer | Goles del visitante |
| estado | text | Estado del partido |
| observaciones | text | Información adicional |
| created_at | timestamptz | Fecha de creación |
| updated_at | timestamptz | Última modificación |

## Reglas

- El equipo local no puede ser igual al visitante.
- Los goles no pueden ser negativos.
- Los goles pueden quedar vacíos mientras el partido esté programado.
- Solo los partidos finalizados cuentan para la tabla.
- La tabla de posiciones se calcula desde esta tabla.

---

# 11. Tabla: eventos_partido

Representa la cronología de un partido.

## Campos

| Campo | Tipo | Descripción |
|---|---|---|
| id | uuid | Identificador único |
| partido_id | uuid | Partido |
| equipo_id | uuid | Equipo relacionado |
| jugador_id | uuid | Jugador relacionado, opcional |
| minuto | integer | Minuto del evento |
| minuto_extra | integer | Tiempo adicional |
| tipo | text | Tipo de evento |
| descripcion | text | Texto explicativo |
| created_at | timestamptz | Fecha de creación |

## Tipos iniciales

```text
gol
amarilla
roja
cambio
inicio
entretiempo
final
incidencia
```

Esta tabla podrá quedar sin utilizar durante las primeras versiones.

---

# 12. Tabla: noticias

Representa las publicaciones periodísticas.

## Campos

| Campo | Tipo | Descripción |
|---|---|---|
| id | uuid | Identificador único |
| temporada_id | uuid | Temporada opcional |
| liga_id | uuid | Liga relacionada, opcional |
| titulo | text | Título |
| slug | text | Ruta única |
| descripcion | text | Bajada |
| contenido | text | Desarrollo completo |
| imagen_url | text | Imagen principal |
| autor | text | Autor |
| estado | text | Estado editorial |
| publicada_en | timestamptz | Fecha de publicación |
| destacada | boolean | Aparece como noticia principal |
| created_at | timestamptz | Fecha de creación |
| updated_at | timestamptz | Última modificación |

## Estados

```text
borrador
publicada
archivada
```

## Reglas

- `slug` debe ser único.
- Solo las noticias publicadas se muestran en el sitio público.
- Una noticia puede estar relacionada con varios equipos.

---

# 13. Tabla: noticias_equipos

Relaciona noticias con clubes.

## Campos

| Campo | Tipo | Descripción |
|---|---|---|
| noticia_id | uuid | Noticia |
| equipo_id | uuid | Equipo |
| created_at | timestamptz | Fecha de creación |

## Restricción

No se puede repetir la misma relación:

```text
noticia + equipo
```

---

# 14. Tabla: perfiles_admin

Complementa los usuarios de Supabase Auth.

No almacena contraseñas.

Las contraseñas y sesiones serán gestionadas por Supabase Authentication.

## Campos

| Campo | Tipo | Descripción |
|---|---|---|
| id | uuid | Mismo ID del usuario autenticado |
| nombre | text | Nombre visible |
| rol | text | Rol administrativo |
| activo | boolean | Permiso de acceso |
| created_at | timestamptz | Fecha de creación |
| updated_at | timestamptz | Última modificación |

## Roles iniciales

```text
superadmin
editor
cargador
```

## Permisos esperados

### Superadmin

Puede administrar todo.

### Editor

Puede publicar y editar noticias.

### Cargador

Puede cargar y modificar partidos.

---

# 15. Relaciones principales

```text
temporadas
   ├── inscripciones_equipos
   ├── planteles
   ├── fechas_competencia
   ├── partidos
   └── noticias

ligas
   ├── categorias
   ├── inscripciones_equipos
   ├── fechas_competencia
   ├── partidos
   └── noticias

categorias
   ├── inscripciones_equipos
   ├── planteles
   ├── fechas_competencia
   └── partidos

equipos
   ├── inscripciones_equipos
   ├── planteles
   ├── partidos como local
   ├── partidos como visitante
   ├── eventos_partido
   └── noticias_equipos

jugadores
   ├── planteles
   └── eventos_partido

noticias
   └── noticias_equipos
```

---

# 16. Datos que no guardaremos directamente

## Tabla de posiciones

No se guardará como tabla permanente.

Se calculará utilizando partidos finalizados.

## Estadísticas de equipo

No se almacenarán inicialmente:

```text
PJ
PG
PE
PP
GF
GC
DG
PTS
```

Se calcularán desde los resultados.

## Forma reciente

No se guardará.

Se calculará utilizando los últimos partidos.

## Estado de forma

No se guardará.

Se calculará dinámicamente.

---

# 17. Índices necesarios

Se crearán índices para:

```text
equipos.slug
equipos.nombre_corto
ligas.slug
noticias.slug
partidos.fecha_hora
partidos.estado
partidos.local_id
partidos.visitante_id
inscripciones_equipos.temporada_id
inscripciones_equipos.liga_id
inscripciones_equipos.categoria_id
```

---

# 18. Seguridad

Todas las tablas públicas utilizarán Row Level Security.

## Lectura pública

Los visitantes podrán leer:

```text
temporadas activas
ligas activas
categorías activas
equipos activos
inscripciones activas
partidos
noticias publicadas
relaciones de noticias
```

## Escritura

Solo los administradores autenticados y autorizados podrán:

```text
crear
editar
desactivar
publicar
corregir resultados
```

---

# 19. Orden de implementación

Las tablas se crearán en este orden:

```text
1. temporadas
2. ligas
3. categorias
4. equipos
5. inscripciones_equipos
6. jugadores
7. planteles
8. fechas_competencia
9. partidos
10. eventos_partido
11. noticias
12. noticias_equipos
13. perfiles_admin
```

Este orden evita errores con claves foráneas.

---

# 20. Primera migración de datos

Los archivos actuales servirán como fuente inicial:

```text
src/app/data/competiciones.ts
src/app/data/equipos.ts
src/app/data/partidos.ts
src/app/data/proximos.ts
src/app/data/noticias.ts
```

No se eliminarán hasta confirmar que CATAGOL funciona correctamente leyendo los datos desde Supabase.

La migración será progresiva.

---

# 21. Regla de estabilidad

Durante la migración:

```text
archivos locales
      +
Supabase
```

convivirán temporalmente.

Solo eliminaremos los archivos locales cuando:

```text
npm run lint
npm run build
```

funcionen correctamente y todas las rutas muestren los datos esperados.

---

# Estado del diseño

```text
Modelo de datos: definido
Tablas creadas: pendiente
Datos migrados: pendiente
Supabase conectado: pendiente
RLS configurado: pendiente
```