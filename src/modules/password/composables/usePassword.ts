import { computed, ref, Ref } from 'vue'
import { SecurityLevel } from '../types/Password'

const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz'
const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const numbers = '0123456789'
const specialChars = '!@#$%^&*()-_+=[]{}|;:,.<>?/~'

const usePassword = () => {
  const password = ref<string>('')
  const passwordLength = ref(6)
  const includeUppercase = ref(false)
  const includeNumber = ref(false)
  const includeSpecialCharacters = ref(false)

  //methods

  const resetPassword = () => {
    password.value = ''
  }

  const toggleOption = (option: Ref<boolean>) => {
    resetPassword()
    option.value = !option.value
  }

  const generatePassword = () => {
    let validChars = lowercaseChars
    if (includeUppercase.value) validChars += uppercaseChars
    if (includeNumber.value) validChars += numbers
    if (includeSpecialCharacters.value) validChars += specialChars
    let generatedPassword = ''
    for (let i = 0; i < passwordLength.value; i++) {
      const randomIndex = Math.floor(Math.random() * validChars.length)
      generatedPassword += validChars.charAt(randomIndex)
    }
    password.value = generatedPassword
  }

  const securityLevel = computed<SecurityLevel>(() => {
    const countTrue = [
      includeUppercase.value,
      includeNumber.value,
      includeSpecialCharacters.value,
      passwordLength.value >= 12,
    ].filter(Boolean).length

    if (countTrue === 2 || countTrue === 3)
      return { color: 'warning', message: 'razoável' }
    if (countTrue === 4)
      return { color: 'success', message: 'forte', strong: true }
    return { color: 'error', message: 'fraca' }
  })

  return {
    password,
    passwordLength,
    includeNumber,
    includeSpecialCharacters,
    includeUppercase,
    toggleNumber: () => toggleOption(includeNumber),
    toggleSpecialCharacters: () => toggleOption(includeSpecialCharacters),
    toggleUppercase: () => toggleOption(includeUppercase),
    generatePassword,
    securityLevel,
  }
}

export default usePassword
