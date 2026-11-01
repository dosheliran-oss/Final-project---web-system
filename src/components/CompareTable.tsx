import type { Character } from '../types'
import { getAlignment } from '../utils/alignment'
import { compareStat, displayValue, parseMeasurement } from '../utils/helpers'

interface CompareTableProps {
  a: Character
  b: Character
}

interface NumericRow {
  label: string
  valueA: string
  valueB: string
  numberA: number | null
  numberB: number | null
  // e.g. "taller by 56 cm"
  describe: (difference: number) => string
}

function CompareTable({ a, b }: CompareTableProps) {
  const numericRows: NumericRow[] = [
    {
      label: 'Height',
      valueA: displayValue(a.height, 'cm'),
      valueB: displayValue(b.height, 'cm'),
      numberA: parseMeasurement(a.height),
      numberB: parseMeasurement(b.height),
      describe: (difference) => `taller by ${difference} cm`,
    },
    {
      label: 'Mass',
      valueA: displayValue(a.mass, 'kg'),
      valueB: displayValue(b.mass, 'kg'),
      numberA: parseMeasurement(a.mass),
      numberB: parseMeasurement(b.mass),
      describe: (difference) => `heavier by ${difference} kg`,
    },
    {
      label: 'Films',
      valueA: String(a.film_count),
      valueB: String(b.film_count),
      numberA: a.film_count,
      numberB: b.film_count,
      describe: (difference) =>
        `in ${difference} more ${difference === 1 ? 'film' : 'films'}`,
    },
  ]

  // Text-only stats: shown side by side, no winner.
  const textRows = [
    { label: 'Birth year', valueA: displayValue(a.birth_year), valueB: displayValue(b.birth_year) },
    { label: 'Eye color', valueA: displayValue(a.eye_color), valueB: displayValue(b.eye_color) },
  ]

  function renderResult(row: NumericRow): string {
    const result = compareStat(row.numberA, row.numberB)
    if (result === null) return 'No winner (missing data)'
    if (result.winner === 'tie') return 'Equal'
    const winnerName = result.winner === 'a' ? a.name : b.name
    return `${winnerName} is ${row.describe(result.difference)}`
  }

  return (
    <div className="table-scroll">
      <table className="compare-table">
        <thead>
          <tr>
            <th scope="col">Stat</th>
            <th scope="col" className={`name-${getAlignment(a.name)}`}>
              {a.name}
            </th>
            <th scope="col" className={`name-${getAlignment(b.name)}`}>
              {b.name}
            </th>
            <th scope="col">Result</th>
          </tr>
        </thead>
        <tbody>
          {numericRows.map((row) => {
            const winner = compareStat(row.numberA, row.numberB)?.winner
            return (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                <td className={winner === 'a' ? 'winner' : undefined}>{row.valueA}</td>
                <td className={winner === 'b' ? 'winner' : undefined}>{row.valueB}</td>
                <td className="result">{renderResult(row)}</td>
              </tr>
            )
          })}
          {textRows.map((row) => (
            <tr key={row.label}>
              <th scope="row">{row.label}</th>
              <td>{row.valueA}</td>
              <td>{row.valueB}</td>
              <td>—</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CompareTable
