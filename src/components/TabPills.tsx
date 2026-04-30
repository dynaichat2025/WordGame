interface TabItem<K extends string> {
  key: K
  label: string
}

interface Props<K extends string> {
  items: TabItem<K>[]
  value: K
  onChange: (key: K) => void
  className?: string
}

export default function TabPills<K extends string>({ items, value, onChange, className = '' }: Props<K>) {
  return (
    <div className={`flex gap-1 bg-chip-gray rounded-pill p-1 ${className}`}>
      {items.map(t => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          className={`flex-1 py-2 rounded-pill text-sm font-bold transition-all ${
            value === t.key ? 'bg-uber-white text-uber-black shadow-card' : 'text-body-gray'
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}
