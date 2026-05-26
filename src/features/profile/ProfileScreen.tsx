import { View, Text, Switch } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTranslation } from 'react-i18next'
import Constants from 'expo-constants'
import { useThemeStore } from '@shared/stores'
import { SettingsItem } from './components/SettingsItem'

export function ProfileScreen() {
  const insets = useSafeAreaInsets()
  const { t } = useTranslation()
  const { isDark, toggleTheme } = useThemeStore()
  const version = Constants.expoConfig?.version ?? '1.0.0'

  return (
    <View
      style={{ paddingTop: insets.top }}
      className="flex-1 bg-background-dark px-4"
    >
      <Text className="text-white text-xl font-bold py-4">{t('profile.title')}</Text>

      <SettingsItem
        icon="theme-light-dark"
        label={t('profile.darkMode')}
        rightElement={
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: '#555', true: '#E50914' }}
            thumbColor="#fff"
          />
        }
      />

      <SettingsItem
        icon="translate"
        label={t('profile.language')}
        value="Tiếng Việt"
      />

      <SettingsItem
        icon="information-outline"
        label={t('profile.version')}
        value={version}
        onPress={undefined}
      />
    </View>
  )
}
