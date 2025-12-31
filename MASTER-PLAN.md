# ☀️ MASTER PLAN: Solar Auditor (Lead Gen App)

## 1. VISION & BRIEF (Contexto de Negocio)

**El Concepto:** "Engineering as Marketing".
Estamos construyendo una herramienta de **Ingeniería de Conversión** para el nicho de Energía Solar en Chile.
No es un "formulario de contacto". Es una **Calculadora de Auditoría Financiera**.

**El Problema:**
Las empresas solares tienen un alto costo por clic (CPC) y baja conversión porque los usuarios desconfían.

**La Solución:**
Aplicamos el principio de "Give to Get" (Dar para recibir). Entregamos un análisis financiero gratuito y personalizado (Ahorro, ROI, Costo) _antes_ de pedir el contacto, para filtrar leads y generar confianza técnica.

**El Usuario (User Persona):**
Dueño de casa en Chile, preocupado por el alza de la luz, escéptico de los vendedores, busca datos duros.

---

## 2. TECH STACK & ARQUITECTURA (Non-Negotiables)

### Core Stack

- **Framework:** Next.js 14+ (App Router).
- **Language:** TypeScript (Strict Mode).
- **Styling:** Tailwind CSS + `clsx` + `tailwind-merge`.
- **UI Components:** `shadcn/ui` (Radix Primitives).
- **Icons:** `lucide-react`.
- **State Management:** `zustand` (Store global para el Wizard).
- **Forms:** `react-hook-form` + `zod` (Validación estricta).
- **Charts:** `recharts` (Gráficos financieros responsivos).
- **Motion:** `framer-motion` (Micro-interacciones y transiciones).

### Estructura de Directorios (Domain Driven)

```text
src/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Landing Page (The Hook)
│   ├── calculator/      # Ruta del Wizard
│   │   └── page.tsx     # Contenedor del Wizard
│   └── result/          # Ruta de Resultados
├── components/
│   ├── ui/              # Shadcn components (Button, Card, Slider...)
│   ├── wizard/          # Pasos específicos (StepLocation, StepBill...)
│   ├── results/         # Dashboard (SavingsChart, SummaryCard)
│   └── layout/          # Header simple, Footer
├── lib/
│   ├── constants.ts     # DATABASE ESTÁTICA (Data Solar x Comuna)
│   ├── solar-logic.ts   # Motor matemático (Fórmulas puras)
│   └── utils.ts         # Helpers
├── store/
│   └── audit-store.ts   # Estado global (inputs del usuario)
└── types/
    └── index.ts         # Interfaces (SolarData, UserInput)
```

---

## 3. LÓGICA DE NEGOCIO Y DATOS (Logic Engine)

**Fuente de Datos (`src/lib/constants.ts`):**
NO usar APIs externas. Usar un objeto estático `DATA_SOLAR` basado en datos del Banco Mundial (Global Solar Atlas) y CNE Chile.

- **Clave:** Slug de la comuna (ej: `santiago`, `concepcion`).
- **Valores:**
  - `generationFactor`: kWh/kWp/año (ej: Santiago ~1600).
  - `priceKwh`: CLP (ej: ~165).

**Fórmula de Cálculo (`src/lib/solar-logic.ts`):**

1. **Consumo kWh Anual** = `(Boleta Mensual $ / Precio kWh) * 12`
2. **Potencia Requerida (kWp)** = `Consumo Anual / (Factor Generación * 0.85 Margin)`
3. **Paneles (550W)** = `Ceil(Potencia Requerida * 1000 / 550)`
4. **Ahorro Anual** = `Potencia Instalada * Factor Generación * 0.85 * Precio kWh`

---

## 4. UX & USER JOURNEY (Paso a Paso Detallado)

### Paso 0: El Hook (Landing)

- **Objetivo:** Clic inmediato.
- **Elemento:** Selector de Comuna + Título: "¿Es rentable la energía solar en [Comuna]?".

### Paso 1: El Dolor (Consumo)

- **Componente:** Slider Interactivo.
- **Rango:** $20.000 a $600.000 CLP.
- **Feedback Visual:** Emojis que cambian según el monto (🙂 -> 😐 -> 💸).
- **Psicología:** Usar un slider se siente como un juego, no como trabajo.

### Paso 2: El Filtro (Cualificación)

- **Pregunta:** "¿Tipo de Propiedad?"
- **Opciones (Cards Grandes):**
  - [🏠 Casa / Techo Propio] -> Lead Bueno.
  - [🏢 Comercial] -> Lead Bueno.
  - [🏢 Departamento / Arriendo] -> Lead Malo (Flag interno `isQualified: false`).

### Paso 3: La Magia (Fake Loading)

- **Duración:** 3 segundos obligatorios.
- **Animación:** Barra de progreso con textos cambiantes:
  - "Analizando radiación solar en [Comuna]..."
  - "Consultando tarifas de distribuidora..."
  - "Proyectando inflación a 20 años..."
- **Por qué:** Aumenta el valor percibido del reporte.

### Paso 4: El Muro (Lead Gate)

- **Copy:** "Tu análisis está listo. Hemos detectado un ahorro potencial alto."
- **Acción:** Formulario simple (Nombre + Email).
- **CTA:** "Ver Informe Completo".

### Paso 5: El Payoff (Dashboard)

- **Headline:** "Podrías ahorrar **$1.XXX.XXX** al año".
- **Visual:** Gráfico de Área (`recharts`) comparando "Gasto Acumulado CGE/Enel" (Rojo) vs "Gasto Solar" (Verde). La diferencia visual es el ahorro.
- **CTA Final:** Botón Sticky en móvil: "Solicitar Visita Técnica".

---

## 5. REGLAS PARA LA IA (AI Persona)

1. **Mobile First Obsession:** El 90% del tráfico vendrá de celulares (Ads). Los botones deben ser de 44px+ de alto. El Slider debe ser "touch-friendly".
2. **Component Driven:** No escribas todo en un archivo gigante. Separa lógica (`lib`), estado (`store`) y UI (`components`).
3. **Shadcn UI:** Usa los componentes base de Shadcn. No reinventes la rueda en el diseño de inputs o botones.
4. **Type Safety:** Todo debe estar tipado. Define las interfaces en `types/index.ts` antes de codear lógica.
5. **Actitud:** Eres un Senior Product Engineer. Prioriza la **Conversión** y la **Velocidad de Carga** sobre animaciones innecesarias.
