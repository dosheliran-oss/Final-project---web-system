import { useState } from 'react'
import { getCharacterImage } from '../data/characterImages'

interface CharacterImageProps {
  name: string
}

// "Obi-Wan Kenobi" -> "OK"
function getInitials(name: string): string {
  return name
    .split(/[\s-]+/)
    .filter(Boolean)
    .map((part) => part[0])
    .filter((_, index, letters) => index === 0 || index === letters.length - 1)
    .join('')
    .toUpperCase()
}

// Shows the character's image. If there is no URL, or the external image
// fails to load, a placeholder with the character's initials is shown instead.
function CharacterImage({ name }: CharacterImageProps) {
  const src = getCharacterImage(name)
  const [failed, setFailed] = useState(false)

  if (src === null || failed) {
    return (
      <div className="character-image character-image-placeholder" role="img" aria-label={name}>
        <span aria-hidden="true">{getInitials(name)}</span>
      </div>
    )
  }

  return (
    <img
      className="character-image"
      src={src}
      alt={name}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  )
}

export default CharacterImage
