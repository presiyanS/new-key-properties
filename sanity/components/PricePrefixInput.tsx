import { StringInputProps, useFormValue, set } from 'sanity'

export function PricePrefixInput(props: StringInputProps) {
  const { value = '', elementProps } = props

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
      <span style={{
        padding: '0 10px',
        background: '#f1f3f5',
        border: '1px solid #ced4da',
        borderRight: 'none',
        borderRadius: '3px 0 0 3px',
        fontSize: '14px',
        color: '#495057',
        lineHeight: '35px',
        height: '35px',
        display: 'flex',
        alignItems: 'center',
      }}>
        €
      </span>
      <input
        {...elementProps}
        value={value}
        onChange={(e) => props.onChange(set(e.target.value))}
        style={{
          flex: 1,
          border: '1px solid #ced4da',
          borderRadius: '0 3px 3px 0',
          padding: '0 10px',
          fontSize: '14px',
          height: '35px',
          outline: 'none',
          background: 'white',
          color: '#212529',
        }}
      />
    </div>
  )
}
