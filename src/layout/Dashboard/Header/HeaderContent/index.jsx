import { useMemo } from 'react';
// material-ui
import { Box, useMediaQuery } from '@mui/material';

// project import
import AutoWidthSelect from './AutoWidthSelect';
import Profile from './Profile';
import Notification from './Notification';
import FullScreen from './FullScreen';
import MobileSection from './MobileSection';
import Localization from './Localization';
import Customization from './Customization';

import useConfig from 'hooks/useConfig';
import DrawerHeader from 'layout/Dashboard/Drawer/DrawerHeader';

import { MenuOrientation } from 'config';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const { i18n, menuOrientation } = useConfig();

  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const localization = useMemo(() => <Localization />, [i18n]);

  return (
    <>
      {menuOrientation === MenuOrientation.HORIZONTAL && !downLG && <DrawerHeader open={true} />}
      <AutoWidthSelect />
      {!downLG && localization}
      {downLG && <Box sx={{ width: '100%', ml: 1 }} />}
      {!downLG && <Notification />}
      {!downLG && <FullScreen />}
      {!downLG && <Customization />}
      <Profile />
      {downLG && <MobileSection />}
    </>
  );
};

export default HeaderContent;
