import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function seedAdmin() {
  try {
    console.log('Creating admin account...')

    // Create admin user
    const { data, error: signUpError } = await supabase.auth.admin.createUser({
      email: 'admin@sdstextiles.com',
      password: 'Admin@123456',
      email_confirm: true,
      user_metadata: {
        role: 'admin',
      },
    })

    if (signUpError) {
      console.error('Error creating admin user:', signUpError)
      return
    }

    if (data.user) {
      console.log('Admin user created:', data.user.id)
      console.log('Email: admin@sdstextiles.com')
      console.log('Password: Admin@123456')
      console.log('⚠️ IMPORTANT: Change this password after first login!')
    }
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

seedAdmin()
