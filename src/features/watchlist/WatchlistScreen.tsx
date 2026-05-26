import { FlatList, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTranslation } from 'react-i18next'
import { Empty } from '@shared/components/ui'
import { useWatchlist } from './hooks/useWatchlist'
import { WatchlistItem } from './components/WatchlistItem'

export function WatchlistScreen() {
  const insets = useSafeAreaInsets()
  const { t } = useTranslation()
  const { items, remove } = useWatchlist()

  return (
    <View
      style={{ paddingTop: insets.top }}
      className="flex-1 bg-background-dark"
    >
      <Text className="text-white text-xl font-bold px-4 py-4">{t('watchlist.title')}</Text>
      {items.length === 0 ? (
        <Empty message={t('watchlist.empty')} />
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ paddingBottom: insets.bottom + 16 }}
          renderItem={({ item }) => (
            <WatchlistItem movie={item} onRemove={remove} />
          )}
        />
      )}
    </View>
  )
}
