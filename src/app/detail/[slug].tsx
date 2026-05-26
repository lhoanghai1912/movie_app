import { useLocalSearchParams } from 'expo-router'
import { DetailScreen } from '@features/detail'

export default function DetailPage() {
  const { slug } = useLocalSearchParams<{ slug: string }>()
  return <DetailScreen slug={slug} />
}
