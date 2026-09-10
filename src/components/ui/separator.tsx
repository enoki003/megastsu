import * as React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { cn } from '@/lib/utils';

/* 罫は三段。hair（分割）/ inner（内枠）/ heavy（外枠）。既定は hair。 */
const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> & { weight?: 'hair' | 'inner' | 'heavy' }
>(({ className, orientation = 'horizontal', decorative = true, weight = 'hair', ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn(
      'shrink-0',
      weight === 'heavy' ? 'bg-rule' : weight === 'inner' ? 'bg-rule-inner' : 'bg-rule-hair',
      orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
      className
    )}
    {...props}
  />
));
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
