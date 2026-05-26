import { FlatList, RefreshControl, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTranslation } from 'react-i18next'
import { Loading } from '@shared/components/ui'
import { useHomeData } from './hooks/useHomeData'
import { Banner } from './components/Banner'
import { MovieSection } from './components/MovieSection'

export function HomeScreen() {
  const insets = useSafeAreaInsets()
  const { t } = useTranslation()
  const { newMovies, singleMovies, seriesMovies, isLoading, refetch, isRefetching } = useHomeData()

  if (isLoading) return <Loading />

  return (
    <FlatList
      data={[]}
      renderItem={null}
      keyExtractor={() => 'static'}
      style={{ backgroundColor: '#141414' }}
      contentContainerStyle={{ paddingTop: insets.top, paddingBottom: insets.bottom + 16 }}
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor="#E50914" />
      }
      ListHeaderComponent={
        <View>
          {newMovies[0] && <Banner movie={newMovies[0]} />}
          <MovieSection title={t('home.newMovies')} movies={newMovies} />
          <MovieSection title={t('home.singleMovies')} movies={singleMovies} />
          <MovieSection title={t('home.seriesMovies')} movies={seriesMovies} />
        </View>
      }
    />
  )
}
