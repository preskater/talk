import { Icon } from '@/components/icon';
import { useTheme } from '@/hooks/use-theme';
import type { DeliveryState } from '@/data/types';

type DeliveryIndicatorProps = {
  state: DeliveryState;
  size?: number;
};

export function DeliveryIndicator({ state, size = 14 }: DeliveryIndicatorProps) {
  const theme = useTheme();
  if (state === 'sent') {
    return <Icon name="checkmark" size={size} color={theme.textTertiary} />;
  }
  if (state === 'delivered') {
    return <Icon name="checkmark.circle" size={size} color={theme.textTertiary} />;
  }
  return <Icon name="checkmark.circle.fill" size={size} color={theme.primary} />;
}
