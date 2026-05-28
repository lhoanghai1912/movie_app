import { useState, useMemo } from 'react'
import { ScrollView, View, Text, Switch, Pressable, StyleSheet, Modal } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Constants from 'expo-constants'
import { LinearGradient } from 'expo-linear-gradient'
import { THEME_LIST, type ThemeKey } from '@constants/themes'
import { useThemeStore } from '@store/theme.store'
import { useTheme } from '@hooks/useTheme'
import { useWatchlist } from '@hooks/useWatchlist'

type IconName = keyof typeof MaterialCommunityIcons.glyphMap

const LANGUAGES = [
  { key: 'vi', label: 'Tiếng Việt', sub: 'Vietnamese' },
  { key: 'en', label: 'English', sub: 'Tiếng Anh' },
]

export default function ProfileScreen() {
  const insets = useSafeAreaInsets()
  const [notif, setNotif] = useState(true)
  const [wifiOnly, setWifiOnly] = useState(true)
  const [showLang, setShowLang] = useState(false)
  const [lang, setLang] = useState('vi')
  const version = Constants.expoConfig?.version ?? '1.0.0'
  const { themeKey, setTheme } = useThemeStore()
  const theme = useTheme()
  const { items } = useWatchlist()

  const contentStyle = useMemo(() => ({ paddingTop: insets.top, paddingBottom: 96 }), [insets.top])

  const settings: { icon: IconName; label: string; badge: string; onPress?: () => void }[] = [
    { icon: 'translate', label: 'Ngôn ngữ', badge: lang === 'vi' ? 'Tiếng Việt' : 'English', onPress: () => setShowLang(true) },
    { icon: 'film', label: 'Chất lượng video', badge: 'FHD' },
    { icon: 'clock-outline', label: 'Lịch sử xem', badge: '0 phim' },
    { icon: 'information-outline', label: 'Phiên bản', badge: version },
  ]

  return (
    <>
      <ScrollView
        style={[s.scroll, { backgroundColor: theme.bg }]}
        contentContainerStyle={contentStyle}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar block */}
        <View style={s.avatarBlock}>
          <LinearGradient colors={theme.accentGradient} style={s.avatar}>
            <Text style={s.avatarText}>T</Text>
          </LinearGradient>
          <Text style={[s.name, { color: theme.text }]}>Tủ Phim</Text>
          <Text style={[s.since, { color: theme.text2 }]}>Thành viên từ 2024</Text>
          <View style={s.stats}>
            {([['0', 'Đã xem'], [String(items.length), 'Đã lưu'], ['0', 'Đã tải']] as [string, string][]).map(([n, l]) => (
              <View key={l} style={s.statItem}>
                <Text style={[s.statNum, { color: theme.text }]}>{n}</Text>
                <Text style={[s.statLabel, { color: theme.text2 }]}>{l}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Toggles */}
        <View style={[s.card, s.cardGap, { backgroundColor: theme.surface }]}>
          <View style={s.toggleRow}>
            <MaterialCommunityIcons name="bell-outline" size={18} color={theme.text2} />
            <Text style={[s.toggleLabel, { color: theme.text }]}>Thông báo phim mới</Text>
            <Switch
              value={notif}
              onValueChange={setNotif}
              trackColor={{ false: theme.surface2, true: theme.accent }}
              thumbColor="#FFFFFF"
            />
          </View>
          <View style={[s.divider, { backgroundColor: theme.line }]} />
          <View style={s.toggleRow}>
            <MaterialCommunityIcons name="wifi" size={18} color={theme.text2} />
            <Text style={[s.toggleLabel, { color: theme.text }]}>Chỉ tải qua Wi-Fi</Text>
            <Switch
              value={wifiOnly}
              onValueChange={setWifiOnly}
              trackColor={{ false: theme.surface2, true: theme.accent }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Theme picker */}
        <View style={[s.card, s.cardGap, { backgroundColor: theme.surface }]}>
          <View style={s.themeHeader}>
            <Text style={[s.themeTitle, { color: theme.text2 }]}>GIAO DIỆN MÀU</Text>
          </View>
          <View style={s.themeRow}>
            {THEME_LIST.map(t => (
              <Pressable
                key={t.key}
                onPress={() => setTheme(t.key as ThemeKey)}
                style={s.themeOption}
              >
                <View style={[
                  s.themeSwatch,
                  { backgroundColor: t.swatch },
                  themeKey === t.key && s.themeSwatchActive,
                  themeKey === t.key && { borderColor: theme.text },
                ]} />
                <Text style={[
                  s.themeLabel,
                  { color: themeKey === t.key ? theme.text : theme.text2 },
                  themeKey === t.key && s.themeLabelActive,
                ]}>{t.label}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Settings */}
        <View style={[s.card, { backgroundColor: theme.surface }]}>
          {settings.map((item, i) => (
            <View key={item.label}>
              <Pressable style={s.settingRow} onPress={item.onPress}>
                <MaterialCommunityIcons name={item.icon} size={18} color={theme.text2} />
                <Text style={[s.settingLabel, { color: theme.text }]}>{item.label}</Text>
                <Text style={[s.settingBadge, { color: theme.text3 }]}>{item.badge}</Text>
                <MaterialCommunityIcons name="chevron-right" size={14} color={theme.text3} />
              </Pressable>
              {i < settings.length - 1 && (
                <View style={[s.divider, { backgroundColor: theme.line, marginHorizontal: 16 }]} />
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Language picker sheet */}
      <Modal visible={showLang} transparent animationType="slide" onRequestClose={() => setShowLang(false)}>
        <Pressable style={s.overlay} onPress={() => setShowLang(false)}>
          <Pressable style={[s.sheet, { backgroundColor: theme.bg }]}>
            <View style={[s.sheetHandle, { backgroundColor: theme.line }]} />
            <Text style={[s.sheetTitle, { color: theme.text }]}>Chọn ngôn ngữ</Text>
            {LANGUAGES.map((l, i) => (
              <Pressable
                key={l.key}
                onPress={() => { setLang(l.key); setShowLang(false) }}
                style={[
                  s.langRow,
                  i < LANGUAGES.length - 1 && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: theme.line },
                ]}
              >
                <View style={s.flex1}>
                  <Text style={[s.langLabel, { color: theme.text }]}>{l.label}</Text>
                  <Text style={[s.langSub, { color: theme.text2 }]}>{l.sub}</Text>
                </View>
                {lang === l.key && (
                  <View style={[s.checkCircle, { backgroundColor: theme.accent }]}>
                    <MaterialCommunityIcons name="check" size={12} color="#FFFFFF" />
                  </View>
                )}
              </Pressable>
            ))}
          </Pressable>
        </Pressable>
      </Modal>
    </>
  )
}

const s = StyleSheet.create({
  scroll: { flex: 1 },
  avatarBlock: {
    alignItems: 'center',
    paddingTop: 28,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: { fontSize: 30, fontWeight: '800', color: '#FFFFFF' },
  name: { fontSize: 20, fontWeight: '700' },
  since: { fontSize: 13, marginTop: 2 },
  stats: { flexDirection: 'row', gap: 24, marginTop: 16 },
  statItem: { alignItems: 'center' },
  statNum: { fontSize: 20, fontWeight: '800' },
  statLabel: { fontSize: 11 },
  card: {
    marginHorizontal: 20,
    borderRadius: 14,
    overflow: 'hidden',
  },
  cardGap: { marginBottom: 16 },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  toggleLabel: { flex: 1, fontSize: 14 },
  divider: { height: StyleSheet.hairlineWidth },
  themeHeader: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 12 },
  themeTitle: { fontSize: 11, fontWeight: '600', letterSpacing: 0.6 },
  themeRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 4,
  },
  themeOption: { flex: 1, alignItems: 'center', gap: 8 },
  themeSwatch: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  themeSwatchActive: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  themeLabel: { fontSize: 11, textAlign: 'center' },
  themeLabelActive: { fontWeight: '700' },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  settingLabel: { flex: 1, fontSize: 14 },
  settingBadge: { fontSize: 12 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'flex-end',
  },
  sheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 36,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  sheetTitle: { fontSize: 18, fontWeight: '700', marginBottom: 16 },
  langRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  flex1: { flex: 1 },
  langLabel: { fontSize: 16, fontWeight: '600' },
  langSub: { fontSize: 12, marginTop: 2 },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
