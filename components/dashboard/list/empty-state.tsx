"use client"

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description: string
  actions?: React.ReactNode
}

export function EmptyState({
  icon,
  title,
  description,
  actions
}: EmptyStateProps) {
  return (
    <div className="animate-in fade-in-50 flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
      {icon && <div className="text-muted-foreground mb-4">{icon}</div>}
      <h3 className="mb-2 text-lg font-medium">{title}</h3>
      <p className="text-muted-foreground mb-6 text-sm">{description}</p>
      {actions && <div className="flex justify-center">{actions}</div>}
    </div>
  )
}
