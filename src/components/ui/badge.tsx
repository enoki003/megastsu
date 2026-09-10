import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/* 分類札（DS components/forms/Tag.jsx）。shadcn の badge を置き換える。
   白抜き（墨ベタ）と罫のみの二種。字送り 0.3em に合わせ text-indent も同値入れる。 */
const badgeVariants = cva(
  'inline-block rounded-none border px-[11px] py-[4px] font-mincho-display text-[11px] tracking-[0.3em] indent-[0.3em] transition-[color,background-color,border-color] duration-[var(--dur-quick)]',
  {
    variants: {
      variant: {
        outline: 'border-input bg-transparent text-ink-muted',
        solid: 'border-ink bg-ink text-paper',
      },
      interactive: {
        true: 'cursor-pointer',
        false: 'cursor-default',
      },
    },
    compoundVariants: [
      { variant: 'outline', interactive: true, className: 'hover:border-fukamidori hover:text-fukamidori' },
    ],
    defaultVariants: { variant: 'outline', interactive: false },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

function Badge({ className, variant, interactive, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, interactive }), className)} {...props} />;
}

export { Badge, badgeVariants };
