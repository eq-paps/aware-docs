import type { DocStatus } from '../data/docs'

type StatusBadgeProps = {
  status: DocStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`status ${status.toLowerCase().replaceAll(' ', '-')}`}>
      {status}
    </span>
  )
}
