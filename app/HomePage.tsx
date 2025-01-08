"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import {
  AppProvider,
  type Router,
  type Navigation,
  type Session,
} from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
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

interface DemoProps {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
}

function CustomAppTitle() {
  return (
      <Box className="css-yzjoij" display="flex" alignItems="center">
        {/*<CustomIcon width="40" height="40" />*/}
        <Typography variant="h6" className="css-14tatqh-MuiTypography-root" sx={{ fontWeight: 'bold' }}>
          Frumos
        </Typography>
      </Box>
  );
}

export default function DashboardLayoutSidebarCollapsed(props: DemoProps) {
  const { window } = props;

  const [session, setSession] = React.useState<Session | null>({
    user: {
      name: 'Bharat Kashyap',
      email: 'bharatkashyap@outlook.com',
      image: 'https://avatars.githubusercontent.com/u/19550456',
    },
  });

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: 'Bharat Kashyap',
            email: 'bharatkashyap@outlook.com',
            image: 'https://avatars.githubusercontent.com/u/19550456',
          },
        });
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
            slots={{ appTitle: CustomAppTitle }}
        >
          <DemoPageContent pathname={router.pathname} />
        </DashboardLayout>
      </AppProvider>
  );
}