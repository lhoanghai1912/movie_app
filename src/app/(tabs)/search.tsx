import { useState, useMemo } from 'react'
import { ScrollView, View, Text, Pressable, TextInput, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Loading, SectionHeader } from '@components/ui'
import { GenreTile, MovieCard } from '@components/movie'
import { GENRES } from '@constants/genres'
import { useDebounce } from '@hooks/useDebounce'
import { useSearchMovie } from '@hooks/useSearchMovie'
import { useTheme } from '@hooks/useTheme'

function goToGenre(slug: string) {
  router.push({ pathname: '/genre/[slug]', params: { slug } })
}

export default function SearchScreen() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 500)
  const insets = useSafeAreaInsets()
  const { data, isLoading } = useSearchMovie(debouncedQuery)
  const hasSearch = debouncedQuery.trim().length > 1
  const theme = useTheme()
  const contentStyle = useMemo(() => ({ paddingTop: insets.top, paddingBottom: 96 }), [insets.top])

  return (
    <ScrollView
      style={[s.scroll, { backgroundColor: theme.bg }]}
      contentContainerStyle={contentStyle}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={s.padH}>
        <Text style={[s.title, { color: theme.text }]}>Tìm kiếm</Text>
        <View style={[s.searchBar, { backgroundColor: theme.surface }]}>
          <MaterialCommunityIcons name="magnify" size={18} color={theme.text3} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Tên phim, đạo diễn, diễn viên..."
            placeholderTextColor={theme.text3}
            style={[s.input, { color: theme.text }]}
          />
          {query.length > 0 && (
            <Pressable onPress={() => setQuery('')}>
              <MaterialCommunityIcons name="close" size={16} color={theme.text3} />
            </Pressable>
          )}
        </View>
      </View>

      {isLoading && <Loading />}

      {/* No results */}
      {hasSearch && !isLoading && data?.length === 0 && (
        <View style={s.empty}>
          <Text style={[s.emptyText, { color: theme.text2 }]}>Không tìm thấy "{query}"</Text>
        </View>
      )}

      {/* Search results grid */}
      {hasSearch && !isLoading && data && data.length > 0 && (
        <View style={s.padH}>
          <SectionHeader title={`${data.length} kết quả`} />
          <View style={s.resultsRow}>
            {data.map(m => (
              <MovieCard key={m.slug} movie={m} width={108} />
            ))}
          </View>
        </View>
      )}

      {/* Browse genres */}
      {!hasSearch && (
        <>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={s.genrePillRow}
            style={s.genrePillScroll}
          >
            {GENRES.slice(0, 6).map(g => (
              <Pressable key={g.id} onPress={() => goToGenre(g.id)} style={[s.genrePill, { backgroundColor: theme.surface }]}>
                <Text style={[s.genrePillText, { color: theme.text }]}>{g.name}</Text>
              </Pressable>
            ))}
          </ScrollView>

          <View style={s.padH}>
            <Text style={[s.sectionTitle, { color: theme.text }]}>Thể loại</Text>
            <View style={s.genreGrid}>
              {Array.from({ length: Math.ceil(GENRES.length / 2) }).map((_, ri) => (
                <View key={`genre-row-${ri}`} style={s.genreGridRow}>
                  {GENRES.slice(ri * 2, ri * 2 + 2).map(g => (
                    <View key={g.id} style={s.flex1}>
                      <GenreTile genre={g} onPress={() => goToGenre(g.id)} />
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </View>
        </>
      )}
    </ScrollView>
  )
}

const s = StyleSheet.create({
  scroll: { flex: 1 },
  padH: { paddingHorizontal: 20 },
  title: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 16,
    marginTop: 4,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 24,
  },
  input: {
    flex: 1,
    fontSize: 15,
    padding: 0,
  },
  empty: { paddingVertical: 40, alignItems: 'center' },
  emptyText: { fontSize: 15 },
  resultsRow: { flexDirection: 'row', flexWrap: 'wrap' },
  genrePillScroll: { marginBottom: 24 },
  genrePillRow: { paddingHorizontal: 20, gap: 8, flexDirection: 'row' },
  genrePill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 9999,
  },
  genrePillText: { fontSize: 13 },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 14,
  },
  flex1: { flex: 1 },
  genreGrid: { gap: 10 },
  genreGridRow: { flexDirection: 'row', gap: 10 },
})
