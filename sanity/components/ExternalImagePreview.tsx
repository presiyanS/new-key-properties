import { StringInputProps } from 'sanity'

export function ExternalImagePreview(props: StringInputProps) {
  const url = props.value
  return (
    <div>
      {url && (
        <img
          src={url}
          alt=""
          style={{
            display: 'block',
            maxHeight: 160,
            maxWidth: '100%',
            borderRadius: 8,
            marginBottom: 8,
            objectFit: 'cover',
          }}
        />
      )}
      {props.renderDefault(props)}
    </div>
  )
}
