import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section>
      <h2>העמוד לא נמצא</h2>
      <Link to="/">Back to home</Link>
    </section>
  )
}

export default NotFoundPage
