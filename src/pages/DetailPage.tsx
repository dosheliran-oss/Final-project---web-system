import { Link, useParams } from 'react-router-dom'

function DetailPage() {
  const { id } = useParams()

  return (
    <section>
      <h2>Character Details for ID: {id}</h2>
      <Link to="/">Back to list</Link>
    </section>
  )
}

export default DetailPage
