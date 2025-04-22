// Tipo base para todas las reglas de Vuetify
export type ValidationRule = (value: string | null | undefined) => true | string

// Reglas reutilizables

export const required = (field: string): ValidationRule =>
  (v) => !!v || `${field} is required`

export const minLength = (min: number): ValidationRule =>
  (v) => (v && v.length >= min) || `Minimum ${min} characters required`

export const maxLength = (max: number): ValidationRule =>
  (v) => (v && v.length <= max) || `Maximum ${max} characters allowed`

export const haveUpperCaseCharacter = (): ValidationRule =>
  (v) => /(?=.*[A-Z])/.test(v||'') || 'Must have one uppercase character'

export const haveANumber = (): ValidationRule =>
  (v) => /(?=.*\d)/.test(v||'') || 'Must have one number'

export const haveSpecialCharacter = (): ValidationRule =>
  (v) => /([!@$%])/.test(v||'') || 'Must have one special character [!@#$%]'

export const emailRules: ValidationRule[] = [
  required('Email'),
  (v) => /.+@.+\..+/.test(v || '') || 'E-mail must be valid',
]

export const passwordRules: ValidationRule[] = [
  required('Password'),
  minLength(6),
  haveUpperCaseCharacter(),
  haveANumber(),
  haveSpecialCharacter()
]

export const confirmPasswordRules = (originalPassword: string): ValidationRule =>
  (v) => v === originalPassword || `Passwords must match ${v} - ${originalPassword}`

export const numberOnly: ValidationRule = 
  (v) => /^[0-9]+$/.test(v || '') || 'Only numbers allowed'

export const phoneRules: ValidationRule[] = [
  required('Phone'),
  (v) => /^[0-9]{10,15}$/.test(v || '') || 'Phone number must be valid',
]

export const passwordRequired = [
  required('Password')
]

export const nameRules = [
  required('Nombre')
]

export const urlRules: ValidationRule[] = [
  required('Url'),
  (v) => /^(https?:\/\/)[^\s$.?#].[^\s]*$/.test(v || '') || 'Debe ser una URL válida (ej: https://example.com)',
];