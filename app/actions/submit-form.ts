'use server'

import { createClient } from '@supabase/supabase-js'

// Created per request so a missing env var surfaces as a handled error
// instead of crashing the module at import time.
function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !anonKey) return null
  return createClient(url, anonKey)
}

const MIN_FOLLOWERS = 5000

function calculateAge(birthDate: string) {
  const birthDateObj = new Date(birthDate)
  const today = new Date()
  let age = today.getFullYear() - birthDateObj.getFullYear()
  const monthDiff = today.getMonth() - birthDateObj.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
    age--
  }
  return age
}

function optionalNumber(value: FormDataEntryValue | null) {
  const parsed = parseFloat((value as string) ?? '')
  return Number.isFinite(parsed) ? parsed : null
}

export async function submitVitanoinForm(formData: FormData) {
  const birth_date = formData.get('birth_date') as string

  if (!birth_date || Number.isNaN(new Date(birth_date).getTime())) {
    return { success: false, message: 'Ingresa una fecha de nacimiento válida.' }
  }

  if (calculateAge(birth_date) < 18) {
    return { success: false, message: 'Debes ser mayor de edad para participar.' }
  }

  const follower_count = parseInt(formData.get('follower_count') as string, 10)
  if (!Number.isFinite(follower_count) || follower_count < MIN_FOLLOWERS) {
    return {
      success: false,
      message: `Necesitas al menos ${MIN_FOLLOWERS.toLocaleString('es-MX')} seguidores para participar.`,
    }
  }

  if (formData.get('is_profile_public') !== 'true') {
    return { success: false, message: 'Tu perfil de Instagram debe ser público para participar.' }
  }

  const active_collaborations = formData.get('active_collaborations') as string
  const collaboration_brands = ((formData.get('collaboration_brands') as string) || '').trim()

  if (active_collaborations === 'Sí' && !collaboration_brands) {
    return { success: false, message: 'Indica con qué marcas colaboras actualmente.' }
  }

  const consents = {
    confirmed_age: formData.get('confirmed_age') === 'on',
    confirmed_public_profile: formData.get('confirmed_public_profile') === 'on',
    accepted_terms: formData.get('accepted_terms') === 'on',
    accepted_privacy: formData.get('accepted_privacy') === 'on',
    authorized_content_use: formData.get('authorized_content_use') === 'on',
    accepted_communications: formData.get('accepted_communications') === 'on',
  }

  const missingConsent = Object.values(consents).some((accepted) => !accepted)
  if (missingConsent) {
    return { success: false, message: 'Debes aceptar todos los consentimientos para continuar.' }
  }

  const rawData = {
    full_name: (formData.get('full_name') as string).trim(),
    birth_date,
    city_state: (formData.get('city_state') as string).trim(),
    email: (formData.get('email') as string).trim().toLowerCase(),
    phone: (formData.get('phone') as string).trim(),
    instagram_handle: (formData.get('instagram_handle') as string).trim(),
    instagram_link: (formData.get('instagram_link') as string).trim(),
    follower_count,
    is_profile_public: true,
    time_creating_content: formData.get('time_creating_content') as string,
    primary_category: formData.get('primary_category') as string,
    avg_reel_views: optionalNumber(formData.get('avg_reel_views')) ?? 0,
    engagement_rate: optionalNumber(formData.get('engagement_rate')),
    best_content_link: (formData.get('best_content_link') as string).trim(),
    motivation: (formData.get('motivation') as string).trim(),
    active_collaborations,
    collaboration_brands: collaboration_brands || null,
    ...consents,
  }

  const supabase = getSupabaseClient()
  if (!supabase) {
    console.error('Supabase env vars are not configured.')
    return { success: false, message: 'El registro no está disponible en este momento. Inténtalo más tarde.' }
  }

  const { error } = await supabase.from('vitanoin_applicants').insert([rawData])

  if (error) {
    if (error.code === '23505') {
      return { success: false, message: 'Este correo electrónico ya está registrado.' }
    }
    console.error('Vitanoin application insert failed:', error)
    return { success: false, message: 'No pudimos guardar tu registro. Inténtalo de nuevo en unos minutos.' }
  }

  return { success: true }
}
