import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { cn } from '@/lib/utils';

/* shadcn の select から挙動（Radix / 焦点管理 / キーボード操作）だけを取り、皮は捨てた。
   引金は Input と同じ下罫。開いた面は panel に 1px 墨、角丸なし・影なし。
   山形記号は二本のヘアラインから描く（DS Select.jsx と同じ手法。アイコン依存を作らない）。 */
const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const Chevron = ({ open }: { open?: boolean }) => (
  <span
    aria-hidden="true"
    className={cn(
      'w-[7px] h-[7px] border-r border-b border-r-ink-muted border-b-ink-muted transition-transform duration-[var(--dur-quick)]',
      open ? '-rotate-[135deg]' : 'rotate-45'
    )}
  />
);

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'flex w-full items-center justify-between gap-2 rounded-none border-0 border-b border-b-input bg-transparent px-[2px] py-[8px] font-mincho-body text-[15px] tracking-[0.04em] text-ink outline-none transition-[color,border-color] duration-[var(--dur-quick)] data-[state=open]:border-b-fukamidori focus:border-b-fukamidori disabled:opacity-40 [&>span]:truncate',
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <Chevron />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      position={position}
      className={cn(
        'relative z-50 min-w-[8rem] overflow-hidden rounded-none border border-rule bg-popover text-popover-foreground shadow-none',
        position === 'popper' && 'data-[side=bottom]:translate-y-1',
        className
      )}
      {...props}
    >
      <SelectPrimitive.Viewport className="p-[var(--frame-gap)]">{children}</SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn('px-[10px] py-[6px] font-garamond text-[11px] uppercase tracking-[var(--tracking-label)] text-ink-muted', className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-pointer select-none items-center rounded-none px-[10px] py-[8px] font-mincho-body text-[14px] tracking-[0.04em] text-ink outline-none transition-[color,background-color] duration-[var(--dur-quick)] data-[highlighted]:bg-accent data-[state=checked]:text-fukamidori data-[disabled]:opacity-40',
      className
    )}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator ref={ref} className={cn('my-[5px] h-px bg-rule-hair', className)} {...props} />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator };
