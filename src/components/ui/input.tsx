import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/* DS components/forms/Input.jsx。囲まず、下罫だけ引く（記入線）。合焦で深緑に変わる。 */
const inputVariants = cva(
  'w-full box-border bg-transparent rounded-none font-mincho-body text-[15px] tracking-[0.04em] text-ink outline-none transition-[color,border-color] duration-[var(--dur-quick)] placeholder:text-ink-muted',
  {
    variants: {
      variant: {
        ruled: 'border-0 border-b border-b-input px-[2px] py-[8px] focus:border-b-fukamidori',
        boxed: 'border border-ink px-[14px] py-[11px] focus:border-fukamidori',
      },
    },
    defaultVariants: { variant: 'ruled' },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, type = 'text', ...props }, ref) => (
    <input ref={ref} type={type} className={cn(inputVariants({ variant }), className)} {...props} />
  )
);
Input.displayName = 'Input';

/* 欧文の小ラベル（PROFILE / KEYWORD など）。分類の印であって見出しではない。 */
const FieldLabel = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        'block mb-2 font-garamond text-[12px] uppercase tracking-[var(--tracking-label)] text-ink-muted',
        className
      )}
      {...props}
    />
  )
);
FieldLabel.displayName = 'FieldLabel';

/* 注記はゴシック。ブランド内でゴシックが許されるのはこの用途のみ。 */
const FieldHint = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('mt-[7px] mb-0 font-gothic text-[11px] text-ink-muted', className)} {...props} />
  )
);
FieldHint.displayName = 'FieldHint';

export { Input, FieldLabel, FieldHint, inputVariants };
