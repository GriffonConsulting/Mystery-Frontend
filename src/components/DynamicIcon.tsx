import { lazy, Suspense } from 'react';
import Loader from './Loader';

const getIcon = (icon: string) => {
  switch (icon) {
    case 'RemoveShoppingCart':
      return lazy(() => import('@mui/icons-material/RemoveShoppingCart'));
    case 'LockResetIcon':
      return lazy(() => import('@mui/icons-material/LockReset'));
    default:
      return lazy(() => import('@mui/icons-material/RemoveShoppingCart'));
  }
};

export interface DynamicIconProps {
  icon: string;
}

const DynamicIcon = ({ icon }: DynamicIconProps) => {
  const SelectedIcon = getIcon(icon);

  return (
    <Suspense fallback={<Loader />}>
      <SelectedIcon />
    </Suspense>
  );
};

export default DynamicIcon;
