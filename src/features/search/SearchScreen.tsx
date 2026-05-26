import { useState } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTranslation } from 'react-i18next'
import { Loading, Empty } from '@shared/components/ui'
import { useDebounce } from '@shared/hooks/useDebounce'
import { useSearch } from './hooks/useSearch'
import { SearchBar } from './components/SearchBar'
import { SearchResultGrid } from './components/SearchResultGrid'

export function SearchScreen() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 500)
  const insets = useSafeAreaInsets()
  const { t } = useTranslation()
  const { data, isLoading } = useSearch(debouncedQuery)

  return (
    <View
      style={{ paddingTop: insets.top }}
      className="flex-1 bg-background-dark"
    >
      <View className="px-4 py-3">
        <SearchBar value={query} onChangeText={setQuery} />
      </View>

      {isLoading && <Loading />}
      {!isLoading && data?.length === 0 && debouncedQuery.length > 1 && (
        <Empty message={t('search.noResults')} />
      )}
      {!isLoading && data && data.length > 0 && (
        <SearchResultGrid movies={data} />
      )}
    </View>
  )
}
