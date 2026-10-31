interface FavoriteButtonProps {
  isFavorite: boolean
  onToggle: () => void
}

function FavoriteButton({ isFavorite, onToggle }: FavoriteButtonProps) {
  return (
    <button type="button" className="favorite-button" aria-pressed={isFavorite} onClick={onToggle}>
      {isFavorite ? '★ Remove' : '☆ Add to Favorites'}
    </button>
  )
}

export default FavoriteButton
