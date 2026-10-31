interface StatusMessageProps {
  kind: 'loading' | 'error'
  message: string
}

function StatusMessage({ kind, message }: StatusMessageProps) {
  return (
    <p className={`status status-${kind}`} role={kind === 'error' ? 'alert' : 'status'}>
      {kind === 'error' ? `Error: ${message}` : message}
    </p>
  )
}

export default StatusMessage
