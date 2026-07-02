import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { theme } from './styles/theme';
import { PublicLayout } from './layouts/PublicLayout';
import { AppLayout } from './layouts/AppLayout';
import { LoginPage } from './pages/auth/LoginPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { WorkflowListPage } from './pages/workflows/WorkflowListPage';
import { WorkflowCreatePage } from './pages/workflows/WorkflowCreatePage';
import { WorkflowDetailPage } from './pages/workflows/WorkflowDetailPage';
import { WorkflowTemplatesPage } from './pages/workflows/WorkflowTemplatesPage';
import { CustomerListPage } from './pages/customers/CustomerListPage';
import { CustomerDetailPage } from './pages/customers/CustomerDetailPage';
import { CustomerFormPage } from './pages/customers/CustomerFormPage';
import { OpportunityListPage } from './pages/opportunities/OpportunityListPage';
import { OpportunityDetailPage } from './pages/opportunities/OpportunityDetailPage';
import { OpportunityFormPage } from './pages/opportunities/OpportunityFormPage';
import { TaskListPage } from './pages/tasks/TaskListPage';
import { TaskDetailPage } from './pages/tasks/TaskDetailPage';
import { TaskBoardPage } from './pages/tasks/TaskBoardPage';
import { AnalyticsPage } from './pages/analytics/AnalyticsPage';
import { SalesReportsPage } from './pages/analytics/SalesReportsPage';
import { AgentReportsPage } from './pages/analytics/AgentReportsPage';
import { CustomReportPage } from './pages/analytics/CustomReportPage';
import { UserManagementPage } from './pages/admin/UserManagementPage';
import { RoleManagementPage } from './pages/admin/RoleManagementPage';
import { AuditLogPage } from './pages/admin/AuditLogPage';
import { SystemSettingsPage } from './pages/admin/SystemSettingsPage';
import { IntegrationsPage } from './pages/admin/IntegrationsPage';
import { ApiKeyManagementPage } from './pages/admin/ApiKeyManagementPage';
import { EmailTemplatesPage } from './pages/admin/EmailTemplatesPage';
import { GuardrailsPage } from './pages/admin/GuardrailsPage';
import { ProfilePage } from './pages/settings/ProfilePage';
import { AccountSettingsPage } from './pages/settings/AccountSettingsPage';
import { NotificationSettingsPage } from './pages/settings/NotificationSettingsPage';
import { PersonalApiKeysPage } from './pages/settings/PersonalApiKeysPage';
import { AppearancePage } from './pages/settings/AppearancePage';
import { DocsPage } from './pages/help/DocsPage';
import { ApiReferencePage } from './pages/help/ApiReferencePage';
import { ChangelogPage } from './pages/help/ChangelogPage';
import { ContactPage } from './pages/help/ContactPage';
import { NotFoundPage } from './pages/errors/NotFoundPage';
import { ForbiddenPage } from './pages/errors/ForbiddenPage';
import { ServerErrorPage } from './pages/errors/ServerErrorPage';
import { OfflinePage } from './pages/errors/OfflinePage';
import { MaintenancePage } from './pages/errors/MaintenancePage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route element={<PublicLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
          </Route>

          {/* Authenticated routes */}
          <Route element={<AppLayout />}>
            {/* Dashboard */}
            <Route path="/dashboard" element={<DashboardPage />} />

            {/* Workflows */}
            <Route path="/workflows" element={<WorkflowListPage />} />
            <Route path="/workflows/create" element={<WorkflowCreatePage />} />
            <Route path="/workflows/templates" element={<WorkflowTemplatesPage />} />
            <Route path="/workflows/:id" element={<WorkflowDetailPage />} />

            {/* Customers */}
            <Route path="/customers" element={<CustomerListPage />} />
            <Route path="/customers/create" element={<CustomerFormPage />} />
            <Route path="/customers/:id" element={<CustomerDetailPage />} />
            <Route path="/customers/:id/edit" element={<CustomerFormPage />} />

            {/* Opportunities */}
            <Route path="/opportunities" element={<OpportunityListPage />} />
            <Route path="/opportunities/create" element={<OpportunityFormPage />} />
            <Route path="/opportunities/:id" element={<OpportunityDetailPage />} />
            <Route path="/opportunities/:id/edit" element={<OpportunityFormPage />} />

            {/* Tasks */}
            <Route path="/tasks" element={<TaskListPage />} />
            <Route path="/tasks/board" element={<TaskBoardPage />} />
            <Route path="/tasks/:id" element={<TaskDetailPage />} />

            {/* Analytics */}
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/analytics/sales" element={<SalesReportsPage />} />
            <Route path="/analytics/agents" element={<AgentReportsPage />} />
            <Route path="/analytics/custom" element={<CustomReportPage />} />

            {/* Admin */}
            <Route path="/admin/users" element={<UserManagementPage />} />
            <Route path="/admin/roles" element={<RoleManagementPage />} />
            <Route path="/admin/audit-log" element={<AuditLogPage />} />
            <Route path="/admin/settings" element={<SystemSettingsPage />} />
            <Route path="/admin/integrations" element={<IntegrationsPage />} />
            <Route path="/admin/api-keys" element={<ApiKeyManagementPage />} />
            <Route path="/admin/email-templates" element={<EmailTemplatesPage />} />
            <Route path="/admin/guardrails" element={<GuardrailsPage />} />

            {/* Settings */}
            <Route path="/settings/profile" element={<ProfilePage />} />
            <Route path="/settings/account" element={<AccountSettingsPage />} />
            <Route path="/settings/notifications" element={<NotificationSettingsPage />} />
            <Route path="/settings/api-keys" element={<PersonalApiKeysPage />} />
            <Route path="/settings/appearance" element={<AppearancePage />} />

            {/* Help */}
            <Route path="/help/docs" element={<DocsPage />} />
            <Route path="/help/api-reference" element={<ApiReferencePage />} />
            <Route path="/help/changelog" element={<ChangelogPage />} />
            <Route path="/help/contact" element={<ContactPage />} />

            {/* Error pages */}
            <Route path="/403" element={<ForbiddenPage />} />
            <Route path="/500" element={<ServerErrorPage />} />
            <Route path="/offline" element={<OfflinePage />} />
            <Route path="/maintenance" element={<MaintenancePage />} />
          </Route>

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
