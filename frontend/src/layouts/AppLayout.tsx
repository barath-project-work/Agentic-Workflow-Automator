import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  IconButton,
  AppBar,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Badge,
  Collapse,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Loop as WorkflowIcon,
  People as CustomersIcon,
  Task as TaskIcon,
  AdminPanelSettings as AdminIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  ChevronLeft as ChevronLeftIcon,
  ExpandLess,
  ExpandMore,
  Assignment,
  WorkHistory,
  TrackChanges,
  Timeline,
  BarChart,
} from '@mui/icons-material';
import { useAuthStore } from '../stores/authStore';
import { useUIStore } from '../stores/uiStore';
import { demoNotifications } from '../services/mockData';

const DRAWER_WIDTH = 260;

interface NavSection {
  label: string;
  items: NavItem[];
}

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  badge?: number;
}

const navSections: NavSection[] = [
  {
    label: 'Overview',
    items: [
      { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
    ],
  },
  {
    label: 'Sales',
    items: [
      { label: 'Workflows', path: '/workflows', icon: <WorkflowIcon /> },
      { label: 'Customers', path: '/customers', icon: <CustomersIcon /> },
      { label: 'Opportunities', path: '/opportunities', icon: <TrackChanges /> },
      { label: 'Tasks', path: '/tasks', icon: <TaskIcon /> },
    ],
  },
  {
    label: 'Analytics',
    items: [
      { label: 'Dashboard', path: '/analytics', icon: <BarChart /> },
      { label: 'Sales Reports', path: '/analytics/sales', icon: <Timeline /> },
      { label: 'Agent Reports', path: '/analytics/agents', icon: <Assignment /> },
    ],
  },
  {
    label: 'Management',
    items: [
      { label: 'Users', path: '/admin/users', icon: <AdminIcon /> },
      { label: 'Audit Log', path: '/admin/audit-log', icon: <WorkHistory /> },
      { label: 'Integrations', path: '/admin/integrations', icon: <SettingsIcon /> },
    ],
  },
  {
    label: 'Settings',
    items: [
      { label: 'Profile', path: '/settings/profile', icon: <SettingsIcon /> },
      { label: 'Appearance', path: '/settings/appearance', icon: <WorkflowIcon /> },
      { label: 'Help', path: '/help/docs', icon: <HelpIcon /> },
    ],
  },
];

function getFlatNavItems(): NavItem[] {
  return navSections.flatMap(s => s.items);
}

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifAnchor, setNotifAnchor] = useState<null | HTMLElement>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const { demoMode, setDemoMode } = useUIStore();
  const unreadNotifs = demoNotifications.filter(n => !n.read);

  const allNavItems = getFlatNavItems();

  const toggleSection = (label: string) => {
    setExpandedSections(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const isActive = (path: string) => location.pathname.startsWith(path);

  const handleLogout = () => {
    setAnchorEl(null);
    logout();
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#F4F4F2' }}>
      {/* Header */}
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          width: `calc(100% - ${sidebarOpen ? DRAWER_WIDTH : 72}px)`,
          ml: `${sidebarOpen ? DRAWER_WIDTH : 72}px`,
          borderBottom: 1,
          borderColor: 'divider',
          transition: 'margin-left 0.25s ease, width 0.25s ease',
          bgcolor: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <Toolbar sx={{ minHeight: '64px !important' }}>
          <IconButton edge="start" onClick={() => setSidebarOpen(!sidebarOpen)} sx={{ mr: 1 }}>
            {sidebarOpen ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>

          <Typography variant="h6" noWrap sx={{ flexGrow: 1, ml: 1, fontWeight: 700, letterSpacing: '-0.02em', color: '#1C1C1C' }}>
            {allNavItems.find(i => isActive(i.path))?.label || 'Dashboard'}
          </Typography>

          {/* Demo mode toggle */}
          <Box
            onClick={() => setDemoMode(!demoMode)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.75,
              px: 1.5,
              py: 0.5,
              mr: 1,
              borderRadius: 2,
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontSize: '0.6875rem',
              fontWeight: 600,
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              bgcolor: demoMode ? '#FFF5F5' : '#E8F5E9',
              color: demoMode ? '#E23744' : '#1BA672',
              border: 1,
              borderColor: demoMode ? '#E2374420' : '#1BA67220',
              '&:hover': {
                bgcolor: demoMode ? '#FFEAEA' : '#D0F0D8',
              },
            }}
            title={demoMode ? 'Click to switch to Live mode' : 'Click to switch to Demo mode'}
          >
            <Box
              sx={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                bgcolor: demoMode ? '#E23744' : '#1BA672',
                flexShrink: 0,
              }}
            />
            {demoMode ? 'Demo' : 'Live'}
          </Box>

          <IconButton sx={{ mr: 1 }} onClick={(e) => setNotifAnchor(e.currentTarget)}>
            <Badge badgeContent={unreadNotifs.length} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Avatar
            sx={{
              width: 34,
              height: 34,
              cursor: 'pointer',
              bgcolor: '#E23744',
              fontWeight: 600,
              fontSize: '0.875rem',
              transition: 'transform 0.15s',
              '&:hover': { transform: 'scale(1.05)' },
            }}
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            {user?.name?.charAt(0) || 'U'}
          </Avatar>

          {/* User Menu */}
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)} PaperProps={{ sx: { minWidth: 200, mt: 1, borderRadius: 2 } }}>
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography variant="subtitle2" fontWeight={600}>{user?.name}</Typography>
              <Typography variant="caption" color="text.secondary">{user?.email}</Typography>
            </Box>
            <Divider />
            <MenuItem onClick={() => { setAnchorEl(null); navigate('/settings/profile'); }}>
              <ListItemText>Profile Settings</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => { setAnchorEl(null); navigate('/admin/settings'); }}>
              <ListItemText>System Settings</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout} sx={{ color: '#E23744' }}>
              <ListItemText primary="Logout" primaryTypographyProps={{ fontWeight: 500 }} />
            </MenuItem>
          </Menu>

          {/* Notifications Panel */}
          <Menu anchorEl={notifAnchor} open={Boolean(notifAnchor)} onClose={() => setNotifAnchor(null)} PaperProps={{ sx: { minWidth: 360, maxHeight: 480, mt: 1, borderRadius: 2 } }}>
            <Box sx={{ px: 2, py: 1.5, borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2" fontWeight={600}>Notifications</Typography>
              <Typography variant="caption" sx={{ color: '#E23744', cursor: 'pointer' }}>Mark all read</Typography>
            </Box>
            {demoNotifications.map((notif) => (
              <MenuItem key={notif.id} onClick={() => setNotifAnchor(null)} sx={{ flexDirection: 'column', alignItems: 'flex-start', py: 1.5, px: 2, bgcolor: notif.read ? 'transparent' : '#FFF5F5' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <Typography variant="caption" sx={{ fontWeight: notif.read ? 400 : 600, fontSize: '0.8125rem' }}>{notif.title}</Typography>
                  {!notif.read && <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#E23744' }} />}
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>{notif.message}</Typography>
              </MenuItem>
            ))}
            <Divider />
            <MenuItem onClick={() => setNotifAnchor(null)} sx={{ justifyContent: 'center' }}>
              <Typography variant="caption" sx={{ color: '#E23744', fontWeight: 500 }}>View All</Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: sidebarOpen ? DRAWER_WIDTH : 72,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: sidebarOpen ? DRAWER_WIDTH : 72,
            boxSizing: 'border-box',
            bgcolor: '#FFFFFF',
            borderRight: 1,
            borderColor: 'divider',
            transition: 'width 0.25s ease',
            overflowX: 'hidden',
          },
        }}
      >
        <Toolbar sx={{ minHeight: '64px !important', px: sidebarOpen ? 2.5 : 0, justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{
              width: 36, height: 36, borderRadius: '10px',
              background: 'linear-gradient(135deg, #E23744, #C41E2C)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Typography sx={{ color: '#FFF', fontWeight: 800, fontSize: '1.125rem' }}>A</Typography>
            </Box>
            {sidebarOpen && (
              <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', color: '#E23744', letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
                AtlasAI
              </Typography>
            )}
          </Box>
        </Toolbar>

        <Divider />

        <Box sx={{ flex: 1, overflow: 'auto', py: 1, px: sidebarOpen ? 1.5 : 0.5 }}>
          {navSections.map((section) => (
            <Box key={section.label} sx={{ mb: 1 }}>
              {sidebarOpen && (
                <ListItemButton
                  onClick={() => toggleSection(section.label)}
                  sx={{ borderRadius: 1, py: 0.5, px: 1, '&:hover': { bgcolor: '#FFF5F5' } }}
                >
                  <ListItemText
                    primary={section.label}
                    primaryTypographyProps={{ fontSize: '0.6875rem', fontWeight: 600, color: '#9C9C9C', textTransform: 'uppercase', letterSpacing: '0.08em' }}
                  />
                  {expandedSections[section.label] !== false ? <ExpandLess sx={{ fontSize: 16, color: '#9C9C9C' }} /> : <ExpandMore sx={{ fontSize: 16, color: '#9C9C9C' }} />}
                </ListItemButton>
              )}
              <Collapse in={sidebarOpen ? expandedSections[section.label] !== false : true}>
                <List disablePadding>
                  {section.items.map((item) => (
                    <ListItem key={item.path} disablePadding sx={{ mb: 0.25 }}>
                      <ListItemButton
                        selected={isActive(item.path)}
                        onClick={() => navigate(item.path)}
                        sx={{
                          borderRadius: 1,
                          minHeight: 40,
                          justifyContent: sidebarOpen ? 'initial' : 'center',
                          px: 1.5,
                          mx: sidebarOpen ? 0 : 0.5,
                          '&.Mui-selected': {
                            bgcolor: '#FFF5F5',
                            color: '#E23744',
                            '&:hover': { bgcolor: '#FFEAEA' },
                            '& .MuiListItemIcon-root': { color: '#E23744' },
                          },
                          '&:hover': { bgcolor: '#FAFAFA' },
                        }}
                      >
                        <ListItemIcon sx={{
                          minWidth: sidebarOpen ? 36 : 0,
                          justifyContent: 'center',
                          color: isActive(item.path) ? '#E23744' : '#696969',
                          '& .MuiSvgIcon-root': { fontSize: 20 },
                        }}>
                          {item.icon}
                        </ListItemIcon>
                        {sidebarOpen && (
                          <ListItemText
                            primary={item.label}
                            primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: isActive(item.path) ? 600 : 400 }}
                          />
                        )}
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </Box>
          ))}
        </Box>

        <Divider />
        <Box sx={{ p: sidebarOpen ? 2 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5 }}>
          <Avatar sx={{ width: 28, height: 28, bgcolor: '#E23744', fontSize: '0.75rem', fontWeight: 600 }}>
            {user?.name?.charAt(0) || 'U'}
          </Avatar>
          {sidebarOpen && (
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="caption" fontWeight={600} noWrap sx={{ display: 'block', fontSize: '0.8125rem' }}>{user?.name || 'User'}</Typography>
              <Typography variant="caption" color="text.secondary" noWrap sx={{ display: 'block', fontSize: '0.6875rem' }}>{user?.email || ''}</Typography>
            </Box>
          )}
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          bgcolor: '#F4F4F2',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Toolbar sx={{ minHeight: '64px !important' }} />
        <Box sx={{ p: 3, flex: 1 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
