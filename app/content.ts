// Every piece of copy and imagery on the landing page. Editing this file is the
// intended way to update the page — the components read from here.
//
// Wording follows 01_Formulario_Landing_The_Vitanoin_Collective.
//
// IMAGERY: the photographs under /public/images/ugc were cropped out of the
// design comp (Ejemplo web.png) so the page matches the approved look. They are
// comp-resolution — roughly the size they render at, so they will look soft on
// high-density screens — and the handles baked into them belong to real
// Instagram accounts. Swap in the original full-resolution files, with usage
// rights confirmed, before this goes public. Entries still marked
// `placeholder: true` carry sample wording from the comp for the same reason.

export const SITE = {
  brand: 'LABORATORIOS PANALAB',
  tagline: 'Personas en piel®',
  program: 'The Vitanoin Collective',
  country: 'MÉXICO',
  instagram: '@Panalabmx',
}

// Absolute so the same nav works from /terminos as well as the home page.
export const NAV = [
  { label: 'Registro', href: '/#registro' },
  { label: 'FAQs', href: '/#faqs' },
  { label: 'Bases de participación', href: '/#bases' },
  { label: 'TyC', href: '/terminos' },
]

export const HERO = {
  eyebrow: '— The Vitanoin Collective',
  titleLine1: 'Tu piel tiene una historia.',
  titleLine2Before: 'Queremos que seas ',
  titleEmphasis: 'tú',
  titleLine2After: ' quien la cuente.',
  body: 'Reconocemos tu dedicación, tu creatividad y el impacto que generas cada día. Por eso creamos The Vitanoin Collective: un programa exclusivo para creadoras de contenido que inspiran, educan y construyen confianza en el cuidado de la piel. Únete y sé parte de algo que transforma pieles e historias.',
  cta: 'Quiero formar parte del Collective',
}

// The tilted photo collage beside the headline.
export const COLLAGE = {
  noteTop: 'Historias reales que inspiran',
  noteBottom: 'Ciencia que se siente',
  placeholder: true,
  // The Instagram handle is part of each image, so it is not repeated in markup.
  cards: [
    { caption: 'Mi momento favorito con VITANOIN CS', src: '/images/ugc/collage-1.png', tilt: '-6deg', lift: '0px' },
    { caption: 'Constancia + Ciencia = Piel que se nota', src: '/images/ugc/collage-2.png', tilt: '3deg', lift: '-18px' },
    { caption: 'Mi aliado diario para una piel luminosa', src: '/images/ugc/collage-3.png', tilt: '-3deg', lift: '10px' },
    { caption: 'Compartir lo que me hace sentirme increíble', src: '/images/ugc/collage-4.png', tilt: '5deg', lift: '-8px' },
  ],
}

export const PRODUCT_SHOT = {
  src: '/images/producto-vitanoin.png' as string | null,
  alt: 'Vitanoin CS Serum y Vitanoin Lifting de Laboratorios Panalab',
}

// Spec section 1: "Estamos buscando a 500 creadoras". The design comp shows
// +600; 500 is the number in the approved document.
export const BENEFITS = [
  { icon: 'community', title: '+500', text: 'creadoras seleccionadas' },
  { icon: 'heart', title: null, text: 'Historias que transforman pieles y rutinas' },
  { icon: 'people', title: null, text: 'Comunidad que apoya, inspira y crece junta' },
  { icon: 'play', title: null, text: 'Contenido que educa e impacta de verdad' },
]

export const FORM_CARD = {
  title: '¡Regístrate y sé parte!',
  subtitle: 'Selección ordenada de 500 perfiles.',
  note: '¡Tu historia puede inspirar a miles más!',
  polaroidSrc: '/images/ugc/form-polaroid.png' as string | null,
}

// Answers are drawn from the approved document.
export const FAQS = {
  eyebrow: 'FAQs',
  title: 'Resolvemos tus dudas',
  linkLabel: 'Ver todas las preguntas',
  items: [
    {
      q: '¿Quiénes pueden participar?',
      a: 'Creadores mayores de edad con un perfil de Instagram y TikTok público y al menos 5,000 seguidores, que compartan contenido de skincare, belleza, lifestyle, bienestar, moda o maternidad.',
    },
    {
      q: '¿Cuáles son los beneficios?',
      a: 'Las 500 creadoras seleccionadas reciben un kit Vitanoin. Además, una de ellas se convertirá en la próxima Embajadora Panalab y recibirá $40,000 MXN en productos Panalab y un contrato de creadora por seis meses con visibilidad en los canales oficiales de Panalab.',
    },
    {
      q: '¿Cómo se seleccionan las participantes?',
      a: 'Nuestro equipo revisará tu perfil, tu comunidad, tus métricas y la calidad de tu contenido. La selección es ordenada y se notificará por correo electrónico o teléfono.',
    },
    {
      q: '¿Hasta cuándo puedo registrarme?',
      a: 'La fecha de cierre es el 6 de Septiembre de 2026, 23:59 horas del Centro de México. Sigue a ' + SITE.instagram + ' para no perderte de ningún aviso.',
    },
  ],
}

export const BASES = {
  eyebrow: 'BASES DE PARTICIPACIÓN',
  title: 'Todo lo que necesitas saber',
  linkLabel: 'Leer bases completas',
  items: [
    'Programa exclusivo para creadoras de contenido.',
    'Publicaciones originales sobre skincare y experiencia con Vitanoin.',
    'Compromiso con la comunidad y los valores de la marca.',
    'Se seleccionarán perfiles auténticos y con impacto positivo.',
  ],
}

// Spec section 3. A step may carry `ideas`, rendered as a sub-list.
export const STEPS = {
  eyebrow: '¿CÓMO PARTICIPAR?',
  title: 'Seis pasos para formar parte',
  items: [
    { text: 'Completa tu registro en esta landing.' },
    { text: 'Nuestro equipo revisará tu perfil, comunidad, métricas y calidad de contenido.' },
    { text: 'Si eres una de las 500 seleccionadas, recibirás un kit Vitanoin.' },
    {
      text: 'Crea un Reel y un TikTok con alguna de estas ideas de contenido para tu inspiración:',
      ideas: [
        { title: 'Unboxing del kit', text: 'Muestra el desempaque y tu reacción al recibir el producto.' },
        { title: 'Primera impresión', text: 'Graba la textura, sensación y aplicación inicial en tu piel.' },
        { title: 'Get Ready With Me (GRWM)', text: 'Integra el sérum Vitanoin dentro de tu rutina diaria de cuidado de la piel.' },
        { title: 'Evolución de uso', text: 'Muestra el cambio o apariencia de tu piel tras varios días de aplicación.' },
        { title: 'Producto favorito', text: 'Explica por qué Vitanoin se convirtió en un imprescindible de tu cosmetiquera.' },
      ],
    },
    { text: 'Comparte el Reel en Stories e incluye el enlace al punto de venta.' },
    { text: 'Comparte tus métricas y participa para convertirte en la próxima Embajadora Panalab.' },
  ],
}

// Spec section 8: product education.
export const PRODUCTS = {
  eyebrow: 'CONOCE TU PRODUCTO Y SUS BENEFICIOS',
  title: 'Los sérums Vitanoin de tu kit',
  items: [
    {
      name: 'Vitanoin C 5% Serum Facial',
      details: [
        { label: 'Beneficios', text: 'Ilumina la piel, ayuda a emparejar el tono facial y combate los signos de envejecimiento prematuro.' },
        { label: 'Ingredientes clave', text: 'Vitamina C pura y estabilizada al 5% + complejos antioxidantes.' },
        { label: 'Modo de uso', text: 'Aplicar de 3 a 5 gotas por la mañana sobre la piel limpia y seca de rostro y cuello, antes de tu crema hidratante y protector solar.' },
        { label: 'Perfil de usuario', text: 'Pieles opacas, con tono irregular o que buscan prevenir el envejecimiento y potenciar la luminosidad diaria.' },
      ],
    },
    {
      name: 'Vitanoin Lifting Serum Facial',
      details: [
        { label: 'Beneficios', text: 'Proporciona un efecto tensor inmediato, mejora la firmeza y elasticidad, y suaviza líneas de expresión.' },
        { label: 'Ingredientes clave', text: 'Péptidos tensores y activos reafirmantes de alta tecnología.' },
        { label: 'Modo de uso', text: 'Aplicar de 3 a 5 gotas por la mañana y/o noche sobre rostro y cuello limpios mediante suaves masajes ascendentes hasta su total absorción.' },
        { label: 'Perfil de usuario', text: 'Pieles que buscan combatir la flacidez, redefinir el óvalo facial o lograr un efecto tensor al instante.' },
      ],
    },
  ],
}

// PLACEHOLDER: both documents are listed as pending approval (spec section 7).
export const TYC = {
  eyebrow: 'TyC',
  title: 'Términos y condiciones',
  body: 'Al participar aceptas nuestros Términos y Condiciones y la Política de Privacidad.',
  cta: 'Consultar TyC',
  termsHref: '/terminos',
  privacyHref: '/terminos#privacidad',
  pending: true,
}

export const SOCIALS = [
  { name: 'Instagram', href: 'https://instagram.com/panalabmx', icon: 'instagram' },
  { name: 'TikTok', href: 'https://tiktok.com/@panalabmx', icon: 'tiktok' },
  { name: 'Facebook', href: 'https://facebook.com/panalabmx', icon: 'facebook' },
]

export const CONFIRMATION = {
  title: 'Tu historia ya dio el primer paso.',
  body: 'Gracias por registrarte en The Vitanoin Collective. Nuestro equipo revisará cuidadosamente tu perfil y contenido. En caso de ser seleccionada, nos comunicaremos contigo a través del correo electrónico o teléfono registrado.',
  follow: `Sigue a ${SITE.instagram} para conocer las próximas noticias de la convocatoria.`,
}
