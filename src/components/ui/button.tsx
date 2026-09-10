import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/* Megastsu 版 Button。DS components/forms/Button.jsx を厳格に写す。
   角なし・影なし、明朝、字送り 0.14em。第一種は墨ベタ、第二種は罫のみ、第三種は罫すら持たない。
   実寸（padding / font-size）は DS の PAD・SIZE 表そのままで、ここ以外には存在しない値である。 */
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-none border whitespace-nowrap font-mincho-display tracking-[0.14em] cursor-pointer transition-[color,background-color,border-color,opacity] duration-[var(--dur-quick)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-40 disabled:cursor-default',
  {
    variants: {
      variant: {
        primary: 'border-ink bg-ink text-paper hover:bg-fukamidori-dark hover:border-fukamidori-dark',
        secondary: 'border-ink bg-transparent text-ink hover:text-fukamidori hover:border-fukamidori',
        ghost: 'border-transparent bg-transparent text-ink hover:text-fukamidori',
      },
      size: {
        sm: 'px-[16px] py-[7px] text-[12px]',
        md: 'px-[22px] py-[10px] text-[13px]',
        lg: 'px-[30px] py-[13px] text-[15px]',
      },
    },
    defaultVariants: { variant: 'secondary', size: 'md' },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
