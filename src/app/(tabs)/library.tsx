import { useState, useMemo } from 'react'
import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native'
import { Image } from 'expo-image'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useWatchlist } from '@hooks/useWatchlist'
import { useTheme } from '@hooks/useTheme'

export default function LibraryScreen() {
  const insets = useSafeAreaInsets()
  const { items, remove } = useWatchlist()
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const theme = useTheme()
  const contentStyle = useMemo(() => ({ paddingTop: insets.top, paddingBottom: 96 }), [insets.top])

  return (
    <ScrollView
      style={[s.scroll, { backgroundColor: theme.bg }]}
      contentContainerStyle={contentStyle}
      showsVerticalScrollIndicator={false}
    >
      <View style={s.header}>
        <View>
          <Text style={[s.title, { color: theme.text }]}>Đã lưu</Text>
          <Text style={[s.count, { color: theme.text2 }]}>{items.length} bộ phim</Text>
        </View>
        <View style={s.toggleRow}>
          {(['list', 'grid'] as const).map(v => (
            <Pressable
              key={v}
              onPress={() => setView(v)}
              style={[s.toggleBtn, { backgroundColor: view === v ? theme.accent : theme.surface }]}
            >
              <MaterialCommunityIcons
                name={v === 'list' ? 'format-list-bulleted' : 'grid'}
                size={16}
                color="#FFFFFF"
              />
            </Pressable>
          ))}
        </View>
      </View>

      {items.length === 0 && (
        <View style={s.empty}>
          <Text style={s.emptyIcon}>🎬</Text>
          <Text style={[s.emptyText, { color: theme.text2 }]}>Chưa có phim nào được lưu</Text>
        </View>
      )}

      {view === 'grid' && items.length > 0 && (
        <View style={s.grid}>
          {items.map(m => (
            <Pressable
              key={m.slug}
              style={s.gridItem}
              onPress={() => router.push({ pathname: '/movie/[slug]', params: { slug: m.slug } })}
            >
              <View style={[s.gridPoster, { backgroundColor: theme.surface }]}>
                <Image
                  source={{ uri: m.thumb_url }}
                  style={StyleSheet.absoluteFill}
                  contentFit="cover"
                  transition={200}
                />
                <Pressable onPress={() => remove(m._id)} style={s.removeBtn}>
                  <MaterialCommunityIcons name="bookmark" size={14} color={theme.accent} />
                </Pressable>
              </View>
              <Text style={[s.gridTitle, { color: theme.text }]} numberOfLines={2}>{m.name}</Text>
              <Text style={[s.gridMeta, { color: theme.text2 }]}>{m.quality} · {m.language}</Text>
            </Pressable>
          ))}
        </View>
      )}

      {view === 'list' && items.length > 0 && (
        <View style={s.listContainer}>
          {items.map(m => (
            <Pressable
              key={m.slug}
              style={[s.listRow, { borderBottomColor: theme.line }]}
              onPress={() => router.push({ pathname: '/movie/[slug]', params: { slug: m.slug } })}
            >
              <View style={[s.listPoster, { backgroundColor: theme.surface }]}>
                <Image
                  source={{ uri: m.thumb_url }}
                  style={StyleSheet.absoluteFill}
                  contentFit="cover"
                  transition={200}
                />
              </View>
              <View style={s.listInfo}>
                <Text style={[s.listTitle, { color: theme.text }]} numberOfLines={2}>{m.name}</Text>
                <Text style={[s.listMeta, { color: theme.text2 }]}>{m.original_name}</Text>
                <Text style={[s.listMeta, { color: theme.text2 }]}>★ {m.quality} · {m.category?.[0]}</Text>
              </View>
              <Pressable onPress={() => remove(m._id)} style={s.listRemoveBtn}>
                <MaterialCommunityIcons name="bookmark" size={18} color={theme.accent} />
              </Pressable>
            </Pressable>
          ))}
        </View>
      )}
    </ScrollView>
  )
}

const s = StyleSheet.create({
  scroll: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: { fontSize: 24, fontWeight: '800' },
  count: { fontSize: 13, marginTop: 2 },
  toggleRow: { flexDirection: 'row', gap: 6 },
  toggleBtn: {
    width: 34,
    height: 34,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: { paddingTop: 64, alignItems: 'center' },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyText: { fontSize: 15 },
  grid: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  gridItem: { width: '46%' },
  gridPoster: {
    width: '100%',
    aspectRatio: 2 / 3,
    borderRadius: 12,
    overflow: 'hidden',
  },
  removeBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 8,
  },
  gridMeta: { fontSize: 11, marginTop: 2 },
  listContainer: { paddingHorizontal: 20 },
  listRow: {
    flexDirection: 'row',
    gap: 14,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  listPoster: {
    width: 64,
    height: 96,
    borderRadius: 10,
    overflow: 'hidden',
    flexShrink: 0,
  },
  listInfo: { flex: 1, minWidth: 0, justifyContent: 'center' },
  listTitle: { fontSize: 15, fontWeight: '600' },
  listMeta: { fontSize: 12, marginTop: 4 },
  listRemoveBtn: { padding: 6, alignSelf: 'center' },
})
