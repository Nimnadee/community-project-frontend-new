"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import { AppProvider, type Router, type Navigation, type Session } from '@toolpad/core/AppProvider';
import { DashboardLayout, SidebarFooterProps } from '@toolpad/core/DashboardLayout';
import { Account, AccountPreview, AccountPopoverFooter, SignOutButton, AccountPreviewProps } from '@toolpad/core/Account';
import { useDemoRouter } from '@toolpad/core/internal';

const NAVIGATION: Navigation = [
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'products',
    title: 'Products',
    icon: <ShoppingCartIcon />,
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: <ShoppingCartIcon />,
  },
  {
    segment: 'reports',
    title: 'Reports',
    icon: <BarChartIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ pathname }: { pathname: string }) {
  return (
      <Box
          sx={{
            py: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
      >
        <Typography>Dashboard content for {pathname}</Typography>
      </Box>
  );
}

const accounts = [
  {
    id: 1,
    name: 'Bharat Kashyap',
    email: 'bharatkashyap@outlook.com',
    image: 'https://avatars.githubusercontent.com/u/19550456',
    projects: [
      {
        id: 3,
        title: 'Project X',
      },
    ],
  },
  {
    id: 2,
    name: 'Bharat MUI',
    email: 'bharat@mui.com',
    color: '#8B4513', // Brown color
    projects: [{ id: 4, title: 'Project A' }],
  },
];

function SidebarFooterAccountPopover() {
  return (
      <Stack direction="column">
        <Typography variant="body2" mx={2} mt={1}>
          Accounts
        </Typography>
        <MenuList>
          {accounts.map((account) => (
              <MenuItem
                  key={account.id}
                  component="button"
                  sx={{
                    justifyContent: 'flex-start',
                    width: '100%',
                    columnGap: 2,
                  }}
              >
                <ListItemIcon>
                  <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        fontSize: '0.95rem',
                        bgcolor: account.color,
                      }}
                      src={account.image ?? ''}
                      alt={account.name ?? ''}
                  >
                    {account.name[0]}
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      width: '100%',
                    }}
                    primary={account.name}
                    secondary={account.email}
                    primaryTypographyProps={{ variant: 'body2' }}
                    secondaryTypographyProps={{ variant: 'caption' }}
                />
              </MenuItem>
          ))}
        </MenuList>
        <Divider />
        <AccountPopoverFooter>
          <SignOutButton />
        </AccountPopoverFooter>
      </Stack>
  );
}

function AccountSidebarPreview(props: AccountPreviewProps & { mini: boolean }) {
  const { handleClick, open, mini } = props;
  return (
      <Stack direction="column" p={0} overflow="hidden">
        <Divider />
        <AccountPreview
            variant={mini ? 'condensed' : 'expanded'}
            handleClick={handleClick}
            open={open}
        />
      </Stack>
  );
}

const createPreviewComponent = (mini: boolean) => {
  function PreviewComponent(props: AccountPreviewProps) {
    return <AccountSidebarPreview {...props} mini={mini} />;
  }
  return PreviewComponent;
};

function SidebarFooterAccount({ mini }: SidebarFooterProps) {
  if (mini) return null;
  const PreviewComponent = React.useMemo(() => createPreviewComponent(mini), [mini]);
  return (
      <Account
          slots={{
            preview: PreviewComponent,
            popoverContent: SidebarFooterAccountPopover,
          }}
          slotProps={{
            popover: {
              transformOrigin: { horizontal: 'left', vertical: 'bottom' },
              anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
              disableAutoFocus: true,
              slotProps: {
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: (theme) =>
                        `drop-shadow(0px 2px 8px ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.32)'})`,
                    mt: 1,
                    '&::before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      bottom: 10,
                      left: 0,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translate(-50%, -50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                },
              },
            },
          }}
      />
  );
}

interface DemoProps {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
}

const demoSession = {
  user: {
    name: 'Bharat Kashyap',
    email: 'bharatkashyap@outlook.com',
    image: 'https://avatars.githubusercontent.com/u/19550456',
  },
};

export default function HomePage(props: DemoProps) {
  const { window } = props;

  const [session, setSession] = React.useState<Session | null>(demoSession);
  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession(demoSession);
      },
      signOut: () => {
        setSession(null);
      },
    };
  }, []);

  const router = useDemoRouter('/dashboard');

  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;

  return (
      <AppProvider
          session={session}
          authentication={authentication}
          navigation={NAVIGATION}
          router={router}
          theme={demoTheme}
          window={demoWindow}
      >
        <DashboardLayout
            defaultSidebarCollapsed
            slots={{ sidebarFooter: SidebarFooterAccount }}
        >
          <DemoPageContent pathname={router.pathname} />
        </DashboardLayout>
      </AppProvider>
  );
}