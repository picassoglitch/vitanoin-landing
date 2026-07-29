'use server'

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function submitVitanoinForm(formData: FormData) {
  const birth_date = formData.get('birth_date') as string;
  
  // Calculate age (Must be >= 18)
  const birthDateObj = new Date(birth_date);
  const today = new Date();
  let age = today.getFullYear() - birthDateObj.getFullYear();
  const monthDiff = today.getMonth() - birthDateObj.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
    age--;
  }

  if (age < 18) {
    return { success: false, message: 'Debes ser mayor de edad para participar.' };
  }

  const rawData = {
    full_name: formData.get('full_name') as string,
    birth_date: birth_date,
    city_state: formData.get('city_state') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string,
    instagram_handle: formData.get('instagram_handle') as string,
    instagram_link: formData.get('instagram_link') as string,
    follower_count: parseInt(formData.get('follower_count') as string, 10),
    is_profile_public: formData.get('is_profile_public') === 'true',
    time_creating_content: formData.get('time_creating_content') as string,
    primary_category: formData.get('primary_category') as string,
    avg_reel_views: parseInt(formData.get('avg_reel_views') as string || '0', 10),
    engagement_rate: parseFloat(formData.get('engagement_rate') as string || '0'),
    best_content_link: formData.get('best_content_link') as string,
    motivation: formData.get('motivation') as string,
    active_collaborations: formData.get('active_collaborations') as string,
    accepted_terms: formData.get('accepted_terms') === 'on',
  };

  const { error } = await supabase.from('vitanoin_applicants').insert([rawData]);

  if (error) {
    if (error.code === '23505') {
      return { success: false, message: 'Este correo electrónico ya está registrado.' };
    }
    return { success: false, message: error.message };
  }

  return { success: true };
}