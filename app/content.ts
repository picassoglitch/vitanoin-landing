// Every piece of copy and imagery on the landing page. Editing this file is the
// intended way to update the page — the components read from here.
//
// Wording follows 01_Formulario_Landing_The_Vitanoin_Collective.
//
// PLACEHOLDER: entries marked `placeholder: true` carry sample content taken
// from the design comp. Replace them with real, approved material before the
// page goes live — several are quotes attributed to named Instagram accounts.

export const SITE = {
  brand: 'LABORATORIOS PANALAB',
  tagline: 'Personas en piel®',
  program: 'The Vitanoin Collective',
  country: 'MÉXICO',
  instagram: '@Panalabmx',
}

export const NAV = [
  { label: 'Registro', href: '#registro' },
  { label: 'Ganadoras', href: '#ganadoras' },
  { label: 'FAQs', href: '#faqs' },
  { label: 'Bases de participación', href: '#bases' },
  { label: 'TyC', href: '#tyc' },
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
  cards: [
    { handle: '@creadora1', caption: 'Mi momento favorito con VITANOIN CS', src: null, tilt: '-6deg', lift: '0px' },
    { handle: '@creadora2', caption: 'Constancia + Ciencia = Piel que se nota', src: null, tilt: '3deg', lift: '-18px' },
    { handle: '@creadora3', caption: 'Mi aliado diario para una piel luminosa', src: null, tilt: '-3deg', lift: '10px' },
    { handle: '@creadora4', caption: 'Compartir lo que me hace sentirme increíble', src: null, tilt: '5deg', lift: '-8px' },
  ],
}

export const PRODUCT_SHOT = {
  src: null as string | null,
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

export const TESTIMONIAL = {
  placeholder: true,
  quote:
    'Desde que comparto mi rutina con Vitanoin, he conectado con una comunidad increíble y mi piel nunca se había visto mejor.',
  handle: '@creadora',
  src: null as string | null,
}

export const FORM_CARD = {
  title: '¡Regístrate y sé parte!',
  subtitle: 'Selección ordenada de 500 perfiles.',
  note: '¡Tu historia puede inspirar a miles más!',
  polaroidSrc: null as string | null,
}

export const WINNERS = {
  eyebrow: 'GANADORAS',
  title: 'Ellas ya son parte del cambio',
  linkLabel: 'Conoce a más ganadoras',
  placeholder: true,
  people: [
    { handle: '@creadora1', role: 'Creación de contenido', place: 'México', quote: 'Vitanoin transformó mi piel y mi contenido. Gracias por esta oportunidad.', src: null },
    { handle: '@creadora2', role: 'Beauty & Skincare', place: 'México', quote: 'Hoy inspiro a mi comunidad a cuidar su piel con ciencia.', src: null },
    { handle: '@creadora3', role: 'Lifestyle & Beauty', place: 'México', quote: 'Ser parte del Collective me ha permitido crecer y aprender cada día.', src: null },
  ],
}

// Answers are drawn from the approved document. The closing date is listed as
// pending there (section 7), so it is not stated as fact here.
export const FAQS = {
  eyebrow: 'FAQs',
  title: 'Resolvemos tus dudas',
  linkLabel: 'Ver todas las preguntas',
  items: [
    {
      q: '¿Quiénes pueden participar?',
      a: 'Creadoras mayores de edad con un perfil de Instagram público y al menos 5,000 seguidores, que compartan contenido de skincare, belleza, lifestyle, bienestar, moda o maternidad.',
    },
    {
      q: '¿Cuáles son los beneficios?',
      a: 'Las 500 creadoras seleccionadas reciben un kit Vitanoin. Además, una de ellas se convertirá en la próxima Embajadora Vitanoin y recibirá $40,000 MXN en productos Panalab, $18,000 MXN de remuneración por sus contenidos, una colaboración de seis meses y visibilidad en los canales oficiales de Panalab.',
    },
    {
      q: '¿Cómo se seleccionan las participantes?',
      a: 'Nuestro equipo revisará tu perfil, tu comunidad, tus métricas y la calidad de tu contenido. La selección es ordenada y se notificará por correo electrónico o teléfono.',
    },
    {
      q: '¿Hasta cuándo puedo registrarme?',
      a: 'La fecha de cierre se anunciará próximamente en los canales oficiales. Sigue a ' + SITE.instagram + ' para no perderte el aviso.',
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

// Spec section 3.
export const STEPS = {
  eyebrow: '¿CÓMO PARTICIPAR?',
  title: 'Seis pasos para formar parte',
  items: [
    'Completa tu registro en esta landing.',
    'Nuestro equipo revisará tu perfil, comunidad, métricas y calidad de contenido.',
    'Si eres una de las 500 seleccionadas, recibirás un kit Vitanoin y un código único.',
    'Crea un Reel con tu primera impresión o rutina usando Vitanoin.',
    'Comparte el Reel en Stories e incluye el enlace al punto de venta.',
    'Registra tu contenido y participa para convertirte en la próxima Embajadora Vitanoin.',
  ],
}

// PLACEHOLDER: both documents are listed as pending approval (spec section 7).
export const TYC = {
  eyebrow: 'TyC',
  title: 'Términos y condiciones',
  body: 'Al participar aceptas nuestros Términos y Condiciones y la Política de Privacidad.',
  cta: 'Consultar TyC',
  termsHref: '#tyc',
  privacyHref: '#tyc',
  pending: true,
}

export const COMMUNITY = {
  note: 'Nuestra comunidad no para de crecer',
  lastTile: 'Tú puedes ser la siguiente',
  placeholder: true,
  count: 9,
}

export const SOCIALS = [
  { name: 'Instagram', href: 'https://instagram.com/panalabmx', icon: 'instagram' },
  { name: 'TikTok', href: 'https://tiktok.com/@panalabmx', icon: 'tiktok' },
  { name: 'YouTube', href: 'https://youtube.com/@panalabmx', icon: 'youtube' },
  { name: 'Facebook', href: 'https://facebook.com/panalabmx', icon: 'facebook' },
]

export const CONFIRMATION = {
  title: 'Tu historia ya dio el primer paso.',
  body: 'Gracias por registrarte en The Vitanoin Collective. Nuestro equipo revisará cuidadosamente tu perfil y contenido. En caso de ser seleccionada, nos comunicaremos contigo a través del correo electrónico o teléfono registrado.',
  follow: `Sigue a ${SITE.instagram} para conocer las próximas noticias de la convocatoria.`,
}
