import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Input } from '@components/ui'
import { useTranslation } from 'react-i18next'

interface Props {
  value: string
  onChangeText: (text: string) => void
}

export function SearchBar({ value, onChangeText }: Props) {
  const { t } = useTranslation()
  return (
    <Input
      value={value}
      onChangeText={onChangeText}
      placeholder={t('search.placeholder')}
      leftIcon={<MaterialCommunityIcons name="magnify" size={20} color="#666" />}
      autoCapitalize="none"
      returnKeyType="search"
    />
  )
}
