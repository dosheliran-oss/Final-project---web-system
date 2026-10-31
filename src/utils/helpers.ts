// "https://swapi.info/api/people/1" -> "1" (a trailing slash is allowed)
export function getIdFromUrl(url: string): string {
  return url.split('/').filter(Boolean).pop() ?? ''
}
