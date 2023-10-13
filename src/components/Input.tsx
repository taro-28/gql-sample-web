import clsx from 'clsx'

export const Input = ({ className, ...props }: JSX.IntrinsicElements['input']) => (
  <input
    {...props}
    className={clsx('rounded-md border border-gray-500 p-1 font-normal', className)}
  />
)
