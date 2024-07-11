import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import i18n from '../../i18n';
import { ProductType } from '../../__generated__/api-generated';
import { ShoppingBasket } from '@mui/icons-material';
import { useTheme } from '@mui/material';
import { useCookies } from 'react-cookie';

const logoStyle = {
  width: '140px',
  height: 'auto',
  cursor: 'pointer',
};

function Header(): JSX.Element {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const [cookies] = useCookies(['basket']);

  const toggleDrawer = (newOpen: boolean): void => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 2,
      }}>
      <Container maxWidth="lg">
        <Toolbar
          variant="regular"
          sx={() => ({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            borderRadius: '999px',
            bgcolor: 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(24px)',
            maxHeight: 40,
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`,
          })}>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              ml: '-18px',
              px: 0,
            }}>
            <Link to="/">
              <img
                src={
                  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg'
                }
                style={logoStyle}
                alt="logo"
              />
            </Link>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {Object.keys(ProductType).map(pt => (
                <MenuItem
                  key={pt}
                  onClick={() => {
                    navigate(`/product/${pt}`);
                  }}
                  sx={{ py: '6px', px: '12px' }}>
                  <Typography variant="body2" color="text.primary">
                    {i18n.t(`${pt}.title`)}
                  </Typography>
                </MenuItem>
              ))}
              <MenuItem
                onClick={() => {
                  navigate(`/contact`);
                }}
                sx={{ py: '6px', px: '12px' }}>
                <Typography variant="body2" color="text.primary">
                  CONTACT
                </Typography>
              </MenuItem>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 0.5,
              alignItems: 'center',
            }}>
            <Link to="/authenticate/signup">
              <Button color="primary" variant="text" size="small">
                {i18n.t('signUp')}
              </Button>
            </Link>
            <Link to="/authenticate/signin">
              <Button color="primary" variant="contained" size="small">
                {i18n.t('signIn')}
              </Button>
            </Link>
            {cookies.basket && (
              <Link to="/order/basket">
                <div style={{ position: 'relative' }}>
                  <Button sx={{ m: 1 }} color="primary" variant="outlined">
                    <ShoppingBasket />
                    <span style={{ marginLeft: 8 }}>Panier</span>
                  </Button>
                  <span
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      backgroundColor: theme.palette.primary.main,
                      color: 'white',
                      borderRadius: 12,
                      width: 24,
                      height: 24,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {cookies.basket.length}
                  </span>
                </div>
              </Link>
            )}
          </Box>
          <Box sx={{ display: { sm: '', md: 'none' } }}>
            <Button
              variant="text"
              color="primary"
              aria-label="menu"
              onClick={() => toggleDrawer(true)}
              sx={{ minWidth: '30px', p: '4px' }}>
              <MenuIcon />
            </Button>
            <Drawer anchor="right" open={open} onClose={() => toggleDrawer(false)}>
              <Box
                sx={{
                  minWidth: '60dvw',
                  p: 2,
                  backgroundColor: 'background.paper',
                  flexGrow: 1,
                }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'end',
                    flexGrow: 1,
                  }}></Box>
                <MenuItem
                  onClick={() => {
                    console.log('toto');
                  }}>
                  MURDER PARTY
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate(`/contact`);
                  }}>
                  CONTACT
                </MenuItem>
                <Divider />
                <MenuItem>
                  <Link to="/authenticate/signup">
                    <Button color="primary" variant="outlined" sx={{ width: '100%' }}>
                      {i18n.t('signUp')}
                    </Button>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/authenticate/signin">
                    <Button color="primary" variant="contained" sx={{ width: '100%' }}>
                      {i18n.t('signIn')}
                    </Button>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/order/basket">
                    <Button color="primary" variant="contained" sx={{ width: '100%' }}>
                      {i18n.t('goToBasket')}
                    </Button>
                  </Link>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
