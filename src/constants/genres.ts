export const GENRES = [
  { id: 'tam-ly',     name: 'Tâm Lý',     english: 'Drama',     count: 142, hue: 22  },
  { id: 'tinh-cam',   name: 'Tình Cảm',   english: 'Romance',   count: 89,  hue: 350 },
  { id: 'hanh-dong',  name: 'Hành Động',  english: 'Action',    count: 67,  hue: 10  },
  { id: 'co-trang',   name: 'Cổ Trang',   english: 'Period',    count: 34,  hue: 30  },
  { id: 'nghe-thuat', name: 'Nghệ Thuật', english: 'Art-house', count: 28,  hue: 280 },
  { id: 'hai',        name: 'Hài',        english: 'Comedy',    count: 56,  hue: 50  },
  { id: 'kinh-di',    name: 'Kinh Dị',    english: 'Horror',    count: 19,  hue: 0   },
  { id: 'tieu-su',    name: 'Tiểu Sử',    english: 'Biopic',    count: 22,  hue: 220 },
  { id: 'gia-dinh',   name: 'Gia Đình',   english: 'Family',    count: 41,  hue: 38  },
  { id: 'am-nhac',    name: 'Âm Nhạc',    english: 'Musical',   count: 17,  hue: 200 },
] as const

export type Genre = (typeof GENRES)[number]

export function hslToHex(h: number, s: number, l: number): string {
  l /= 100
  s /= 100
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(-1, Math.min(k - 3, Math.min(9 - k, 1)))
    return Math.round(255 * color).toString(16).padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}
