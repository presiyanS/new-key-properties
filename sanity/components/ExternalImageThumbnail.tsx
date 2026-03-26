export function createExternalImageThumbnail(url: string) {
  return function ExternalImageThumbnail() {
    return (
      <img
        src={url}
        alt=""
        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 2 }}
      />
    )
  }
}
