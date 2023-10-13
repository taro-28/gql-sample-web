import clsx from 'clsx'

export const Label = ({ className, ...props }: JSX.IntrinsicElements['label']) => (
  <label {...props} className={clsx('font-semibold', className)} />
)
