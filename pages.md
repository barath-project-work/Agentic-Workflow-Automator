# 📋 AtlasAI — Complete UI Page & Component Inventory

> **Project:** AtlasAI — Agentic Sales Workflow Automation Platform
> **Status:** Design & Planning Phase
> **Date:** July 2026

---

## 📑 Table of Contents

1. [Navigation Structure](#-navigation-structure)
2. [Authentication Pages](#-authentication-pages-public)
3. [Shared Layout Components](#-shared-layout-components-app-shell)
4. [Dashboard Pages](#-dashboard-pages)
5. [Workflow Pages](#-workflow-pages)
6. [Customer/CRM Pages](#-customercrm-pages)
7. [Opportunity Pages](#-opportunity-pages)
8. [Task Pages](#-task-pages)
9. [Analytics & Reports Pages](#-analytics--reports-pages)
10. [Admin Pages](#-admin-pages-manager-role)
11. [User Settings Pages](#-user-settings-pages)
12. [Help & Support Pages](#-help--support-pages)
13. [Error & System Pages](#-error--system-pages)
14. [Shared / Reusable UI Components](#-shared--reusable-ui-components)
15. [File Structure](#-file-structure)

---

## 🧭 Navigation Structure

```
APP ROUTER TREE
═══════════════════════════════════════════════════════════

/public                          (Unauthenticated routes)
├── /login
├── /forgot-password
└── /reset-password/:token

/app                             (Authenticated routes — wrapped in AppLayout)
├── /app/dashboard                → Sales Rep Dashboard
│
├── /app/workflows                → Workflow List
│   ├── /app/workflows/create     → Create Workflow
│   ├── /app/workflows/:id        → Workflow Detail
│   └── /app/workflows/templates  → Workflow Templates
│       └── /app/workflows/templates/:id  → Template Detail
│
├── /app/customers                → Customer List
│   ├── /app/customers/create     → Create Customer
│   ├── /app/customers/:id        → Customer Detail
│   └── /app/customers/:id/edit   → Edit Customer
│
├── /app/opportunities            → Opportunity List
│   ├── /app/opportunities/create → Create Opportunity
│   ├── /app/opportunities/:id    → Opportunity Detail
│   └── /app/opportunities/:id/edit → Edit Opportunity
│
├── /app/tasks                    → Task List
│   ├── /app/tasks/:id            → Task Detail
│   └── /app/tasks/board          → Task Kanban Board
│
├── /app/analytics                → Analytics Dashboard
│   ├── /app/analytics/sales      → Sales Performance Reports
│   ├── /app/analytics/agents     → AI Agent Performance Reports
│   └── /app/analytics/custom     → Custom Report Builder
│
├── /app/admin                    → Admin Panel (MANAGER+)
│   ├── /app/admin/users          → User Management
│   ├── /app/admin/roles          → Role & Permissions Management
│   ├── /app/admin/audit-log      → Audit Log Viewer
│   ├── /app/admin/settings       → System Configuration
│   ├── /app/admin/integrations   → Integration Settings
│   ├── /app/admin/api-keys       → API Key Management
│   ├── /app/admin/email-templates → Email Template Editor
│   ├── /app/admin/guardrails     → Workflow Guardrails Config
│   └── /app/admin/import         → Data Import/Export
│
├── /app/settings                 → User Settings
│   ├── /app/settings/profile     → User Profile
│   ├── /app/settings/account     → Account Settings
│   ├── /app/settings/notifications → Notification Preferences
│   ├── /app/settings/api-keys    → Personal API Keys
│   └── /app/settings/appearance  → Theme Customization
│
├── /app/help                     → Help & Support
│   ├── /app/help/docs            → Documentation
│   ├── /app/help/api-reference   → API Reference
│   ├── /app/help/changelog       → Changelog
│   └── /app/help/contact         → Support / Contact
│
└── (Error routes)
    ├── /403                      → Forbidden
    ├── /404                      → Not Found
    ├── /500                      → Server Error
    └── /offline                  → Offline Page
```

---

## 🔐 Authentication Pages (Public)

### 1.1 Login Page `/login`

**Purpose:** User authentication entry point.

| Component | Description | State Variations |
|-----------|-------------|------------------|
| **LoginPage** | Page shell — centered card layout | — |
| **LoginForm** | Email + password form with validation | Default, Submitting, Error (invalid credentials), Error (account locked) |
| **EmailInput** | Text input with email validation | Default, Focused, Error, Disabled |
| **PasswordInput** | Password field with show/hide toggle | Default, Focused, Error, Disabled |
| **RememberMeCheckbox** | "Keep me signed in" toggle | Checked, Unchecked |
| **SubmitButton** | "Sign In" button | Default, Loading (spinner), Disabled |
| **ForgotPasswordLink** | Link to `/forgot-password` | — |
| **SignUpLink** | Callout if user registration is open | — |
| **SSOButtonGroup** | Optional SSO providers (Google, Microsoft, GitHub) | Default, Loading |
| **ErrorAlert** | Banner for auth errors | Visible, Hidden |
| **LoginFooter** | Company branding, version, copyright | — |

### 1.2 Forgot Password Page `/forgot-password`

**Purpose:** Initiate password reset flow.

| Component | Description | State Variations |
|-----------|-------------|------------------|
| **ForgotPasswordPage** | Page shell | — |
| **ForgotPasswordForm** | Email input + submit | Default, Submitting, Success (email sent), Error |
| **EmailInput** | Same as login | Default, Focused, Error |
| **BackToLoginLink** | Link to `/login` | — |
| **SuccessMessage** | "Check your email" info card | — |

### 1.3 Reset Password Page `/reset-password/:token`

**Purpose:** Set new password using reset token.

| Component | Description | State Variations |
|-----------|-------------|------------------|
| **ResetPasswordPage** | Page shell | — |
| **TokenValidator** | Validates token on mount | Validating, Valid, Invalid/Expired |
| **ResetPasswordForm** | New password + confirm password | Default, Submitting, Success, Error |
| **NewPasswordInput** | Password with strength meter | Empty, Weak, Medium, Strong |
| **ConfirmPasswordInput** | Confirm password with match validation | Matching, NotMatching |
| **PasswordStrengthIndicator** | Visual bar (red → yellow → green) | 0-4 segments filled |
| **SuccessConfirmation** | "Password reset successful" with login link | — |

### 1.4 Session Expired Modal (Overlay, not a page)

| Component | Description |
|-----------|-------------|
| **SessionExpiredModal** | Appears over current page when JWT expires |
| **CountdownTimer** | Shows time before redirect to login |
| **RedirectButton** | "Sign In Again" action |

---

## 🏗️ Shared Layout Components (App Shell)

These wrap every authenticated page:

### 2.1 AppLayout

| Component | Description | State Variations |
|-----------|-------------|------------------|
| **AppLayout** | Main shell: Sidebar + Header + Content area | — |
| **Sidebar** | Left navigation panel | Expanded, Collapsed (icon only) |
| **Header** | Top bar | — |
| **Content** | Main content area with `<Outlet />` | — |

### 2.2 Sidebar

| Component | Description | State Variations |
|-----------|-------------|------------------|
| **SidebarContainer** | Fixed left sidebar | Expanded (240px), Collapsed (64px) |
| **SidebarToggle** | Collapse/expand button | — |
| **LogoSection** | AtlasAI logo + brand mark | Expanded, Collapsed |
| **NavItem** | Single navigation link | Active, Inactive, Hover |
| **NavSection** | Group of nav items with heading | Expanded, Collapsed |
| **WorkspaceSwitcher** | Dropdown to switch context (optional) | — |
| **SidebarFooter** | User avatar + settings + logout | — |

### 2.3 Header

| Component | Description | State Variations |
|-----------|-------------|------------------|
| **HeaderContainer** | Fixed top bar | — |
| **Breadcrumbs** | Current location path | Home > Workflows > Create |
| **PageTitle** | Current page name | — |
| **GlobalSearch** | Command-palette-style search | Closed, Open (with results), No results |
| **NotificationBell** | Icon with unread count badge | Default (0), HasUnread (with count) |
| **NotificationPanel** | Dropdown list of recent notifications | Empty, HasItems, Loading |
| **UserMenu** | Avatar + dropdown profile menu | Closed, Open |
| **CreateQuickButton** | "+" button for quick actions | Default, DropdownOpen |

### 2.4 Notification Panel

| Component | Description | State Variations |
|-----------|-------------|------------------|
| **NotificationPanel** | Slide-down panel | Open, Closed |
| **NotificationItem** | Single notification row | Unread (bold), Read, Loading |
| **NotificationTypeIcon** | Icon per type (workflow, task, email) | — |
| **MarkAllReadButton** | Mark all as read | — |
| **ViewAllLink** | Link to full notifications page | — |
| **EmptyState** | "No notifications" illustration | — |

---

## 📊 Dashboard Pages

### 3.1 Sales Rep Dashboard `/app/dashboard`

**Purpose:** Personal daily overview for sales representatives.

| Component | Description | State Variations |
|-----------|-------------|------------------|
| **DashboardPage** | Page shell | — |
| **WelcomeCard** | "Good morning, {name}" with daily quote | — |
| **MetricsRow** | Row of KPI metric cards | Loading, Loaded, Error |
| **MetricCard** | Single stat (workflows run, emails sent, tasks done) | Default, Loading, TrendUp, TrendDown |
| **ActiveWorkflowCard** | Currently running workflow with progress | Running, Idle, None |
| **PendingTasksWidget** | List of tasks due today/this week | HasItems, Empty, Loading |
| **PendingTaskItem** | Single task row in widget | Default, Hover, Completed |
| **QuickActionsCard** | Buttons: New Workflow, New Customer, New Task | — |
| **RecentActivityFeed** | Timeline of recent actions | HasItems, Empty, Loading |
| **ActivityItem** | Single timeline entry | — |
| **UpcomingMeetingsWidget** | Today's calendar events | HasItems, Empty, Loading |
| **MeetingItem** | Single meeting entry | — |
| **WeeklySummaryChart** | Small bar chart of activity this week | Loading, Loaded |

### 3.2 Manager Dashboard `/app/dashboard` (Manager View)

**Purpose:** Team-wide performance overview for sales managers.

| Component | Description | State Variations |
|-----------|-------------|------------------|
| **ManagerDashboardPage** | Page shell | — |
| **TeamMetricsRow** | Team-level KPIs | Loading, Loaded |
| **TeamMetricCard** | Team metrics (total workflows, avg response, conversion) | — |
| **TeamPerformanceChart** | Line chart comparing reps | Loading, Loaded |
| **TeamMemberTable** | Rep list: name, workflows, tasks, conversions | Loading, Loaded, Empty, Error |
| **TeamMemberRow** | Single rep row | Default, Hover |
| **PipelineFunnelChart** | Opportunity pipeline stages | Loading, Loaded |
| **AgentEfficiencyCard** | AI agent success rate, avg duration | — |
| **LeaderboardWidget** | Top performers this week | — |
| **ExportReportButton** | Download dashboard as PDF/CSV | — |

### 3.3 Admin Dashboard `/app/dashboard` (Admin View)

**Purpose:** System-wide health and usage overview for admins.

| Component | Description |
|-----------|-------------|
| **AdminDashboardPage** | Page shell |
| **SystemHealthCards** | Service uptime, DB connections, Kafka lag |
| **UsageMetrics** | Active users, API calls, LLM token consumption |
| **CostCard** | Estimated OpenAI costs this month |
| **ServiceStatusGrid** | Status of each microservice (up/down) |
| **ErrorRateChart** | 24h error rate across all services |

---

## 🔄 Workflow Pages

### 4.1 Workflow List Page `/app/workflows`

**Purpose:** Browse, filter, and manage all workflow runs.

| Component | Description | State Variations |
|-----------|-------------|------------------|
| **WorkflowListPage** | Page shell | — |
| **PageHeader** | Title + CreateWorkflowButton | — |
| **CreateWorkflowButton** | Primary CTA → navigate to `/create` | — |
| **SearchBar** | Search workflows by goal text | Empty, HasText |
| **FilterBar** | Status + date range + type filters | — |
| **StatusFilterDropdown** | All, Running, Completed, Failed, Blocked | — |
| **DateRangePicker** | "Last 7 days", "This month", Custom | — |
| **ViewToggle** | Grid view / List view | Grid, List |
| **WorkflowCardGrid** | Grid of workflow cards (grid view) | Loading, Loaded, Empty, Error |
| **WorkflowCard** | Goal preview, status badge, progress, date | Running, Completed, Failed |
| **StatusBadge** | Colored chip: Running (blue), Completed (green), Failed (red) | Per status |
| **ProgressBar** | Steps completed / total steps | 0-100% |
| **WorkflowTable** | Table of workflows (list view) | Loading, Loaded, Empty |
| **WorkflowTableRow** | Single row: status, goal, date, actions | Default, Hover |
| **Pagination** | Page navigation | Page numbers, prev/next |
| **BatchActionBar** | Bulk select + action (cancel, delete) | Hidden, Visible (when items selected) |
| **EmptyState** | "No workflows yet" illustration + create CTA | — |
| **ErrorState** | "Failed to load" with retry button | — |

### 4.2 Create Workflow Page `/app/workflows/create`

**Purpose:** Natural language goal input with optional parameters.

| Component | Description | State Variations |
|-----------|-------------|------------------|
| **CreateWorkflowPage** | Page shell | — |
| **PageHeader** | "Create New Workflow" + back button | — |
| **GoalInput** | Large textarea for natural language goal | Empty, Typing, Filled |
| **CharacterCount** | "0/500 characters" | — |
| **GoalSuggestions** | Quick-fill chips: "Follow up with leads", "Send campaign email", etc. | Default, Hover, Selected |
| **ParameterPanel** | Collapsible advanced options panel | Collapsed, Expanded |
| **IndustrySelect** | Multi-select dropdown for industry | Empty, Selected |
| **LocationInput** | Text input for city/region | Empty, Filled |
| **DaysSinceContactSlider** | Range slider: 1-90 days | Dragging value |
| **EmailTemplateSelect** | Dropdown to pick email template | Default, Selected |
| **PrioritySelect** | Urgent / Normal / Low priority | — |
| **PreviewCard** | Live preview of what the workflow will do | — |
| **SubmitButton** | "Start Workflow" | Default, Loading (spinner), Disabled (invalid form) |
| **SuccessRedirect** | On success → navigate to `/workflows/:id` | — |
| **ErrorAlert** | Submission error | — |

### 4.3 Workflow Detail Page `/app/workflows/:id`

**Purpose:** Real-time monitoring and results viewing for a single workflow.

| Component | Description | State Variations |
|-----------|-------------|------------------|
| **WorkflowDetailPage** | Page shell | — |
| **PageHeader** | Workflow title + back + actions | — |
| **WorkflowStatusBanner** | Large status indicator at top | Running (animated), Completed (green), Failed (red), Blocked (yellow) |
| **CancelButton** | Cancel running workflow | Visible when running |
| **ReRunButton** | Re-run workflow with same params | — |
| **StepTimeline** | Vertical timeline of all steps | Running, Completed, Failed, Pending |
| **StepItem** | Single step: tool name, duration, status | Pending (gray), Running (blue pulse), Completed (green check), Failed (red X) |
| **StepInputCard** | Expandable: shows tool call arguments | Expanded, Collapsed |
| **StepOutputCard** | Expandable: shows tool response | Expanded, Collapsed |
| **StepDuration** | Time taken for this step | — |
| **ProgressTracker** | Big circular/linear progress | Steps done / total |
| **ResultReportCard** | AI-generated final summary | Loading, Loaded |
| **ResultMetricRow** | Key results: emails sent, meetings scheduled | — |
| **ResultActions** | Download report, share, export | — |
| **AuditLogSection** | Expandable: full action log for compliance | Expanded, Collapsed |
| **AuditLogEntry** | Single log line with timestamp | — |
| **RelatedTasksCard** | Tasks created by this workflow | HasItems, Empty |
| **RelatedTaskItem** | Link to related task | — |
| **PollingIndicator** | "Auto-refreshing every 3s" badge | Visible when running, Hidden when complete |

### 4.4 Workflow Templates Page `/app/workflows/templates`

**Purpose:** Pre-defined workflow templates for quick starting.

| Component | Description | State Variations |
|-----------|-------------|------------------|
| **WorkflowTemplatesPage** | Page shell | — |
| **TemplateCategoryFilter** | Tabs: All, Lead Follow-up, Campaign, Meeting Scheduling | — |
| **TemplateCardGrid** | Grid of template cards | Loading, Loaded, Empty |
| **TemplateCard** | Thumbnail, title, description, tags, use count | Default, Hover, Selected |
| **TemplateTag** | "Popular", "New", "CRM" tags | — |
| **CreateFromTemplateButton** | "Use Template" → pre-fills create form | — |

### 4.5 Template Detail Page `/app/workflows/templates/:id`

| Component | Description |
|-----------|-------------|
| **TemplateDetailPage** | Page shell |
| **TemplatePreview** | Steps preview, parameters, expected outcomes |
| **UseTemplateButton** | "Start with this template" |
| **TemplateMetadata** | Author, last updated, usage count |

---

## 📇 Customer/CRM Pages

### 5.1 Customer List Page `/app/customers`

**Purpose:** Browse, search, and filter customer records.

| Component | Description | State Variations |
|-----------|-------------|------------------|
| **CustomerListPage** | Page shell | — |
| **PageHeader** | Title + AddCustomerButton + ImportButton | — |
| **AddCustomerButton** | → navigate to `/create` | — |
| **ImportButton** | → import modal/page | — |
| **GlobalSearchBar** | Search across all customer fields | Empty, HasResults, NoResults |
| **FilterPanel** | Slide-out filter drawer | Closed, Open |
| **FilterChip** | Active filter pill (removable) | — |
| **IndustryMultiSelect** | Checkbox dropdown for industries | — |
| **LocationFilter** | Text/region filter | — |
| **DateRangeFilter** | Last contacted date range | — |
| **StatusFilter** | Active / Inactive / All | — |
| **ViewToggle** | Table / Card view | Table, Card |
| **CustomerTable** | Sortable columns: Name, Industry, Location, Last Contact, Actions | Loading, Loaded, Empty, Error |
| **CustomerTableRow** | Single row with data + actions menu | Default, Hover, Selected |
| **SortableHeader** | Clickable column header with sort arrow | Ascending, Descending, Neutral |
| **InlineSearchInput** | Per-column search (for table mode) | — |
| **TableActionsMenu** | Dropdown: View, Edit, Assign, Delete | — |
| **CustomerCard** | Card view item | Default, Hover |
| **Pagination** | Page controls | — |
| **PageSizeSelect** | "25 / 50 / 100 per page" | — |
| **BatchSelectCheckbox** | Check all / select rows | — |
| **BatchActionBar** | Bulk assign, bulk email, bulk delete | Hidden, Visible |
| **ExportButton** | Download filtered list as CSV/Excel | — |
| **EmptyState** | "No customers yet" | — |
| **LoadingSkeleton** | Animated placeholder rows | — |

### 5.2 Customer Detail Page `/app/customers/:id`

**Purpose:** 360° view of a single customer.

| Component | Description | State Variations |
|-----------|-------------|------------------|
| **CustomerDetailPage** | Page shell | Loading, Loaded, NotFound, Error |
| **CustomerHeader** | Name, company, contact info, status badge | — |
| **CustomerAvatar** | Initials or logo | — |
| **ContactInfoCard** | Email, phone, address, website | — |
| **ActivityTimeline** | Reverse-chronological timeline of all interactions | HasItems, Empty, Loading |
| **TimelineItem** | Single event: email sent, call, meeting, note | — |
| **TimelineItemTypeIcon** | Icon per event type | — |
| **AddNoteButton** | Quick add note to timeline | — |
| **QuickActionsCard** | Send email, Schedule meeting, Log call, Create task | — |
| **OpportunitiesSection** | Related opportunities table | HasItems, Empty |
| **OpportunitiesTable** | Sub-table of deals for this customer | — |
| **TasksSection** | Related tasks | HasItems, Empty |
| **RelatedTasksList** | Task items linked to this customer | — |
| **WorkflowsSection** | Workflows that included this customer | HasItems, Empty |
| **MetadataCard** | Created date, last updated, owner | — |
| **EditButton** | → navigate to `/edit` | — |
| **DeleteButton** | With confirmation dialog | — |
| **ActivityFilter** | Filter timeline by event type | — |

### 5.3 Create/Edit Customer Page `/app/customers/create` & `/app/customers/:id/edit`

| Component | Description | State Variations |
|-----------|-------------|------------------|
| **CustomerFormPage** | Page shell | Create mode, Edit mode |
| **CustomerForm** | Full customer form | Default, Submitting, Success, Error |
| **FormSection** | Grouped fields: "Basic Info", "Contact", "Company" | — |
| **NameInput** | — | — |
| **EmailInput** | With validation | — |
| **PhoneInput** | With country code selector | — |
| **IndustrySelect** | Dropdown | — |
| **LocationInput** | Free text | — |
| **ContactPersonInput** | — | — |
| **WebsiteInput** | URL validation | — |
| **NotesTextArea** | — | — |
| **TagsInput** | Multi-tag input | — |
| **FormActions** | Save, Cancel | Save (Loading), Disabled (invalid) |
| **DeleteSection** | (Edit mode only) Danger zone with delete button | — |
| **UnsavedChangesDialog** | Warn before navigating away | — |

### 5.4 Customer Import Page `/app/admin/import`

| Component | Description |
|-----------|-------------|
| **ImportPage** | Page shell |
| **FileDropZone** | Drag & drop CSV/Excel file |
| **ColumnMappingStep** | Map CSV columns to fields |
| **PreviewTable** | First 10 rows preview |
| **ImportSummary** | Success count, error count |
| **ErrorRowList** | Rows that failed import |

---

## 💰 Opportunity Pages

### 6.1 Opportunity List Page `/app/opportunities`

**Purpose:** Track sales deals/pipeline.

| Component | Description | State Variations |
|-----------|-------------|------------------|
| **OpportunityListPage** | Page shell | — |
| **ViewToggle** | Kanban Board / Table | Board, Table |
| **KanbanBoard** | Column-based pipeline view | Loading, Loaded, Empty |
| **KanbanColumn** | Single stage column (Prospecting, Qualified, Proposal, Negotiation, Won, Lost) | — |
| **ColumnHeader** | Stage name + deal count + total value | — |
| **KanbanCard** | Deal card: name, value, customer, owner, close date | Default, Dragging, Hover |
| **DragHandle** | Visual drag indicator | — |
| **OpportunityTable** | Table view | Loading, Loaded, Empty |
| **OpportunityTableRow** | Name, stage, value, probability, close date, owner | — |
| **StageBadge** | Colored per stage | — |
| **FilterBar** | Stage, value range, close date, owner | — |
| **CreateOpportunityButton** | → `/create` | — |

### 6.2 Opportunity Detail Page `/app/opportunities/:id`

| Component | Description |
|-----------|-------------|
| **OpportunityDetailPage** | Page shell |
| **OpportunityHeader** | Deal name, stage, value |
| **StageProgressIndicator** | Visual pipeline position |
| **StageChangeDropdown** | Change stage with confirmation |
| **ValueDisplay** | Deal amount with formatting |
| **CloseDateDisplay** | Date + days remaining count |
| **CustomerInfoCard** | Link to customer detail |
| **RelatedTasksSection** | Tasks for this opportunity |
| **ActivityTimeline** | Deal-specific timeline |
| **NotesSection** | Deal-specific notes |
| **ActionsMenu** | Edit, Clone, Delete, Mark Won/Lost |
| **ForecastProbability** | Percentage display |

### 6.3 Create/Edit Opportunity Page `/app/opportunities/create` & `/app/opportunities/:id/edit`

| Component | Description |
|-----------|-------------|
| **OpportunityFormPage** | Page shell |
| **OpportunityForm** | Full form |
| **NameInput** | — |
| **CustomerSelect** | Search and select customer |
| **StageSelect** | Dropdown with stage descriptions |
| **ValueInput** | Currency input |
| **CloseDatePicker** | Date picker |
| **ProbabilitySlider** | 0-100% |
| **OwnerSelect** | User assignment |
| **DescriptionTextArea** | — |
| **FormActions** | Save, Cancel |

---

## ✅ Task Pages

### 7.1 Task List Page `/app/tasks`

**Purpose:** View and manage AI-generated and manual tasks.

| Component | Description | State Variations |
|-----------|-------------|------------------|
| **TaskListPage** | Page shell | — |
| **FilterTabs** | All, Pending, In Progress, Completed, Failed | Active tab |
| **SearchBar** | Search by description | — |
| **TypeFilter** | Email, Meeting, Call, Follow-up, Review | — |
| **DateSortToggle** | Newest / Oldest first | — |
| **TaskCardList** | List of task cards | Loading, Loaded, Empty, Error |
| **TaskCard** | Type icon, description, due date, status, action | Pending, InProgress, Completed, Failed, Overdue |
| **TaskTypeIcon** | Icon per type | — |
| **TaskStatusBadge** | Status chip | Per status |
| **DueDateChip** | Date with overdue indicator (red if past) | Normal, Overdue |
| **TaskActions** | Complete, Snooze, Reassign | — |
| **CompleteCheckbox** | Mark as complete | Unchecked, Checked (with animation) |
| **QuickCompleteButton** | One-click complete | — |
| **EmptyState** | "All caught up!" illustration + create task CTA | — |

### 7.2 Task Detail Page `/app/tasks/:id`

| Component | Description |
|-----------|-------------|
| **TaskDetailPage** | Page shell |
| **TaskHeader** | Type badge, status, title |
| **TaskDescription** | Full description |
| **DueDateDisplay** | Date + countdown |
| **AssignedToDisplay** | User avatar + name |
| **RelatedWorkflowLink** | Link to parent workflow |
| **RelatedCustomerLink** | Link to related customer |
| **RelatedOpportunityLink** | Link to related opportunity |
| **ResultDisplay** | If completed, show result/notes |
| **CompleteButton** | Mark as complete |
| **EditButton** | Edit task |
| **SnoozeButton** | Snooze to tomorrow/next week |

### 7.3 Task Kanban Board `/app/tasks/board`

**Purpose:** Visual drag-and-drop task management.

| Component | Description |
|-----------|-------------|
| **TaskBoardPage** | Page shell |
| **KanbanBoard** | Columns: To Do, In Progress, Done |
| **KanbanColumn** | Per-status column |
| **DraggableTaskCard** | Card that can be dragged between columns |
| **AddTaskButton** | Quick-add task to column |

---

## 📈 Analytics & Reports Pages

### 8.1 Analytics Dashboard `/app/analytics`

**Purpose:** High-level metrics and trends.

| Component | Description | State Variations |
|-----------|-------------|------------------|
| **AnalyticsPage** | Page shell | — |
| **DateRangeSelector** | This week, month, quarter, custom | — |
| **MetricsGrid** | Grid of metric cards | Loading, Loaded |
| **MetricCard** | Title, value, trend arrow, sparkline | Up (green), Down (red), Neutral |
| **WorkflowVolumeChart** | Line chart: workflows over time | Loading, Loaded |
| **TaskCompletionChart** | Bar chart: tasks by type + status | — |
| **ConversionFunnelChart** | Funnel: leads → contacted → meeting → won | — |
| **AgentPerformanceChart** | AI agent metrics: success rate, avg duration | — |
| **TopPerformersTable** | Best-performing workflows or agents | — |
| **ExportDashboardButton** | Download as PDF | — |
| **ScheduleReportButton** | Set up automated report email | — |

### 8.2 Sales Performance Reports `/app/analytics/sales`

| Component | Description |
|-----------|-------------|
| **SalesPerformancePage** | Page shell |
| **ReportBuilder** | Select metrics, dimensions, date range |
| **PipelineVelocityChart** | How fast deals move through stages |
| **WinRateChart** | Won vs Lost ratio |
| **ActivityBreakdownChart** | Emails vs calls vs meetings |
| **TeamComparisonTable** | Compare reps side by side |
| **QuarterlyTrendChart** | Quarter-over-quarter comparison |

### 8.3 AI Agent Performance Reports `/app/analytics/agents`

| Component | Description |
|-----------|-------------|
| **AgentPerformancePage** | Page shell |
| **AgentSuccessRateChart** | Workflow completion rate over time |
| **AgentLatencyChart** | Average workflow duration |
| **ToolUsageBreakdown** | Pie chart of which tools agents use most |
| **TokenConsumptionChart** | LLM token usage over time |
| **CostEstimatorCard** | Estimated OpenAI costs |
| **ErrorBreakdownTable** | Common failure types and counts |
| **AgentLogsTable** | Raw agent action logs (searchable) |

### 8.4 Custom Report Builder `/app/analytics/custom`

| Component | Description |
|-----------|-------------|
| **CustomReportPage** | Page shell |
| **MetricSelector** | Choose metrics from list |
| **DimensionSelector** | Group by: date, user, customer, workflow type |
| **ChartTypeSelector** | Bar, Line, Pie, Table, Funnel |
| **PreviewPane** | Live chart preview |
| **SaveReportForm** | Name and save report |
| **SavedReportsList** | Previously saved custom reports |
| **ExportOptions** | PDF, CSV, PNG |

---

## 🔧 Admin Pages (MANAGER+ Role)

### 9.1 User Management `/app/admin/users`

**Purpose:** Manage system users.

| Component | Description | State Variations |
|-----------|-------------|------------------|
| **UserManagementPage** | Page shell | — |
| **UserTable** | All users with columns | Loading, Loaded, Empty |
| **UserTableRow** | Name, email, role, status, last login, actions | Active, Inactive |
| **RoleBadge** | USER / MANAGER / ADMIN | — |
| **StatusToggle** | Enable/disable user | On, Off |
| **InviteUserButton** | Open invite modal | — |
| **InviteUserModal** | Email input + role select + invite | Default, Sending, Success, Error |
| **EditUserModal** | Change name, email, role | — |
| **DeleteUserConfirmDialog** | Confirm with warning | — |

### 9.2 Role & Permissions Management `/app/admin/roles`

| Component | Description |
|-----------|-------------|
| **RoleManagementPage** | Page shell |
| **RoleList** | List of defined roles |
| **RoleCard** | Role name, user count, permissions summary |
| **PermissionTree** | Hierarchical checkbox tree of all permissions |
| **PermissionGroup** | Group: Workflows, Customers, Tasks, Analytics, Admin |
| **PermissionToggle** | Read / Write / Delete per group |
| **SaveButton** | Save changes |

### 9.3 Audit Log Viewer `/app/admin/audit-log`

**Purpose:** Compliance and security audit trail.

| Component | Description | State Variations |
|-----------|-------------|------------------|
| **AuditLogPage** | Page shell | — |
| **TimeRangeFilter** | Date range picker | — |
| **ActionTypeFilter** | Multi-select: LOGIN, WORKFLOW_START, TOOL_CALL, etc. | — |
| **ActorFilter** | Search by user | — |
| **EntityTypeFilter** | WORKFLOW, CUSTOMER, TASK, USER | — |
| **SearchInput** | Search across log details | — |
| **AuditLogTable** | Infinite scroll or paginated | Loading, Loaded, Empty |
| **AuditLogRow** | Timestamp, actor, action, entity, details | Default, Expanded |
| **ExpandableDetails** | JSON viewer for log details | Collapsed, Expanded |
| **ExportButton** | Download filtered logs as CSV | — |

### 9.4 System Configuration `/app/admin/settings`

| Component | Description |
|-----------|-------------|
| **SystemSettingsPage** | Page shell with tabs |
| **GeneralTab** | Company name, timezone, date format |
| **SecurityTab** | Password policy, session timeout, max login attempts |
| **WorkflowTab** | Max concurrent workflows, default timeout, retry policy |
| **LLMTab** | API key, model selection (GPT-4o / GPT-4o-mini), max tokens, cost alerts |
| **StorageTab** | Max file upload size, retention policies |

### 9.5 Integration Settings `/app/admin/integrations`

| Component | Description | State Variations |
|-----------|-------------|------------------|
| **IntegrationsPage** | Page shell | — |
| **IntegrationCard** | Single integration (SendGrid, Google Calendar, etc.) | Connected, Disconnected, Error |
| **ConnectButton** | OAuth or API key flow | — |
| **DisconnectConfirm** | Confirm disconnect dialog | — |
| **StatusIndicator** | Green dot (connected), Red dot (error) | — |
| **IntegrationConfigForm** | Per-integration settings | — |
| **WebhookSection** | Webhook URL management | — |
| **WebhookEntry** | URL, events, status | — |

### 9.6 API Key Management `/app/admin/api-keys`

| Component | Description |
|-----------|-------------|
| **ApiKeyManagementPage** | Page shell |
| **ApiKeyTable** | All API keys with name, prefix, created, last used, status |
| **ApiKeyRow** | Key entry with revoke action |
| **CreateApiKeyModal** | Name input + permission scope + create |
| **ApiKeyDisplay** | One-time display of new key (copy to clipboard) |
| **RevokeConfirmDialog** | Confirm revocation |
| **UsageQuotaDisplay** | Rate limit info per key |

### 9.7 Email Template Editor `/app/admin/email-templates`

| Component | Description |
|-----------|-------------|
| **EmailTemplatesPage** | Page shell |
| **TemplateList** | Sidebar list of templates |
| **TemplateEditor** | Rich text editor |
| **VariablePalette** | Insertable variables: {{customer.name}}, {{company}}, etc. |
| **PreviewPane** | Live preview of rendered template |
| **SaveButton** | Save template |
| **VersionHistory** | Previous versions diff |

### 9.8 Workflow Guardrails Configuration `/app/admin/guardrails`

| Component | Description |
|-----------|-------------|
| **GuardrailsPage** | Page shell |
| **GuardrailList** | List of defined guardrails |
| **GuardrailCard** | Rule: "Max emails per day", "Allowed contact hours", "Banned industries" |
| **GuardrailToggle** | Enable/disable individual guardrail |
| **GuardrailConfigForm** | Per-guardrail parameters |
| **AddGuardrailButton** | Create new rule |

---

## ⚙️ User Settings Pages

### 10.1 User Profile `/app/settings/profile`

| Component | Description |
|-----------|-------------|
| **ProfilePage** | Page shell |
| **AvatarUpload** | Click to upload, crop, save |
| **NameInput** | First + last name |
| **EmailDisplay** | Read-only with verification badge |
| **PhoneInput** | With country code |
| **JobTitleInput** | — |
| **BioTextArea** | Short bio |
| **SaveButton** | Save profile |

### 10.2 Account Settings `/app/settings/account`

| Component | Description |
|-----------|-------------|
| **AccountSettingsPage** | Page shell |
| **ChangePasswordForm** | Current password + new + confirm |
| **PasswordStrengthMeter** | Visual strength indicator |
| **ChangePasswordButton** | — |
| **SessionList** | Active sessions table (device, browser, last active, revoke) |
| **RevokeSessionButton** | Log out specific session |
| **DeleteAccountSection** | Danger zone with confirm flow |

### 10.3 Notification Preferences `/app/settings/notifications`

| Component | Description |
|-----------|-------------|
| **NotificationSettingsPage** | Page shell |
| **ChannelToggles** | In-app, Email, (future) Slack — on/off per channel |
| **EventPreferences** | Checklist: Workflow complete, Task assigned, Email sent, Error, etc. |
| **DigestFrequency** | Real-time, Daily digest, Weekly digest |

### 10.4 Personal API Keys `/app/settings/api-keys`

| Component | Description |
|-----------|-------------|
| **PersonalApiKeysPage** | Page shell |
| **ApiKeyList** | User's personal API keys |
| **ApiKeyActions** | Revoke, rename |

### 10.5 Theme Customization `/app/settings/appearance`

| Component | Description |
|-----------|-------------|
| **AppearancePage** | Page shell |
| **ThemeSelector** | Light / Dark / System |
| **PrimaryColorPicker** | Accent color selector |
| **SidebarModeToggle** | Expanded / Collapsed / Auto |
| **FontSizeSelector** | Small / Medium / Large |
| **PreviewPane** | Live preview of theme changes |

---

## ❓ Help & Support Pages

### 11.1 Documentation `/app/help/docs`

| Component | Description |
|-----------|-------------|
| **DocsPage** | Page shell |
| **DocSidebar** | Table of contents |
| **MarkdownRenderer** | Rendered documentation |
| **SearchDocs** | Search within documentation |

### 11.2 API Reference `/app/help/api-reference`

| Component | Description |
|-----------|-------------|
| **ApiReferencePage** | Page shell |
| **EndpointList** | Sidebar of all endpoints |
| **EndpointCard** | Method, path, description, params, example response |
| **TryItOutPanel** | Interactive API tester (optional) |

### 11.3 Changelog `/app/help/changelog`

| Component | Description |
|-----------|-------------|
| **ChangelogPage** | Page shell |
| **VersionEntry** | Version number, date, feature list, bug fixes |
| **BadgeNew** | "New" badge for recent entries |

### 11.4 Support / Contact `/app/help/contact`

| Component | Description |
|-----------|-------------|
| **ContactPage** | Page shell |
| **SupportForm** | Subject, category, message, priority |
| **PrioritySelect** | Low / Medium / High / Critical |
| **AttachmentUpload** | File upload for screenshots/logs |
| **SubmitButton** | Submit ticket |
| **LiveChatButton** | (Stretch) Connect to support chat |

---

## 🚨 Error & System Pages

| Page | Route | Description |
|------|-------|-------------|
| **NotFoundPage** | `/404` | "Page not found" with illustration + go home button |
| **ForbiddenPage** | `/403` | "Access denied" with contact admin message |
| **ServerErrorPage** | `/500` | "Something went wrong" with error ID + retry button |
| **OfflinePage** | `/offline` | "You're offline" with auto-reconnect detection |
| **MaintenancePage** | `/maintenance` | "Under maintenance" with estimated completion time |

---

## 🧩 Shared / Reusable UI Components

These are used across multiple pages and should be built as a shared component library:

### 13.1 Data Display

| Component | Description | State Variations |
|-----------|-------------|------------------|
| **DataTable** | Generic sortable, filterable, paginated table | Loading, Loaded, Empty, Error |
| **TableHeader** | Sortable column header | Neutral, Asc, Desc |
| **TableRow** | Single data row | Default, Hover, Selected, Active |
| **Pagination** | Page controls | First page, Middle, Last page |
| **PageSizeSelect** | Rows per page | — |
| **EmptyState** | Illustration + message + optional CTA | — |
| **LoadingSkeleton** | Animated placeholder shapes | — |
| **ErrorState** | Error message + retry button | — |
| **MetricCard** | KPI display card | Loading, Loaded, TrendUp, TrendDown |
| **StatusBadge** | Colored status label | Per status variant |
| **Timeline** | Vertical activity timeline | HasItems, Empty |
| **TimelineItem** | Single timeline entry | Default, Active |
| **KanbanBoard** | Drag-and-drop board | — |
| **KanbanColumn** | Column with cards | — |
| **KanbanCard** | Draggable card | Default, Dragging |
| **Avatar** | User/customer avatar | Image, Initials |
| **AvatarGroup** | Stacked avatars | — |

### 13.2 Feedback & Overlays

| Component | Description |
|-----------|-------------|
| **Modal** | Generic modal dialog |
| **ConfirmDialog** | Confirmation with cancel/confirm |
| **Drawer** | Slide-in side panel |
| **Tooltip** | Hover tooltip |
| **Popover** | Click-triggered popup |
| **Toast** | Auto-dismiss notification |
| **ToastContainer** | Stack of toasts |
| **Alert** | Inline alert (success, error, warning, info) |
| **ProgressBar** | Linear progress |
| **CircularProgress** | Spinner / circular progress |
| **Skeleton** | Loading placeholder |
| **FullPageLoader** | Centered spinner for page loads |

### 13.3 Inputs & Forms

| Component | Description |
|-----------|-------------|
| **Input** | Text input with label, error, helper text |
| **TextArea** | Multi-line input |
| **Select** | Dropdown select |
| **MultiSelect** | Checkbox dropdown |
| **DatePicker** | Calendar date picker |
| **DateRangePicker** | Range date picker |
| **TimePicker** | Time selector |
| **Slider** | Range slider |
| **Toggle** | On/off switch |
| **Checkbox** | Single checkbox |
| **RadioGroup** | Radio button group |
| **FileDropZone** | Drag-and-drop file upload |
| **TagInput** | Multi-tag input with autocomplete |
| **SearchInput** | Search with clear button |
| **FormField** | Wrapper: label + input + error |
| **FormSection** | Grouped form fields with heading |

### 13.4 Navigation & Layout

| Component | Description |
|-----------|-------------|
| **Tabs** | Tab navigation |
| **TabPanel** | Tab content panel |
| **Breadcrumbs** | Location path |
| **Sidebar** | Navigation sidebar |
| **Header** | Top bar |
| **Card** | Generic content card |
| **CardHeader** | Card title + actions |
| **CardBody** | Card content |
| **CardFooter** | Card actions |
| **Accordion** | Expandable sections |
| **AccordionItem** | Single collapsible item |
| **Grid** | Responsive grid |
| **Container** | Max-width container |
| **Section** | Page section with title |

### 13.5 Charts & Data Visualization

| Component | Description |
|-----------|-------------|
| **LineChart** | Time series data |
| **BarChart** | Category comparison |
| **PieChart** | Distribution |
| **FunnelChart** | Pipeline/stage conversion |
| **AreaChart** | Volume over time |
| **Sparkline** | Mini inline chart |
| **Gauge** | Single metric gauge |

---

## 🗂️ File Structure

```
frontend/src/
├── main.tsx                           # Entry point
├── App.tsx                            # Router + providers
├── routes.tsx                         # Route definitions
│
├── layouts/
│   ├── PublicLayout.tsx               # Unauthenticated wrapper
│   ├── AppLayout.tsx                  # Authenticated shell
│   └── AdminLayout.tsx                # Admin sub-layout
│
├── pages/
│   ├── auth/
│   │   ├── LoginPage.tsx
│   │   ├── ForgotPasswordPage.tsx
│   │   └── ResetPasswordPage.tsx
│   ├── dashboard/
│   │   ├── DashboardPage.tsx
│   │   ├── ManagerDashboardPage.tsx
│   │   └── AdminDashboardPage.tsx
│   ├── workflows/
│   │   ├── WorkflowCreatePage.tsx
│   │   ├── WorkflowListPage.tsx
│   │   ├── WorkflowDetailPage.tsx
│   │   ├── WorkflowTemplatesPage.tsx
│   │   └── WorkflowTemplateDetailPage.tsx
│   ├── customers/
│   │   ├── CustomerListPage.tsx
│   │   ├── CustomerDetailPage.tsx
│   │   └── CustomerFormPage.tsx
│   ├── opportunities/
│   │   ├── OpportunityListPage.tsx
│   │   ├── OpportunityDetailPage.tsx
│   │   └── OpportunityFormPage.tsx
│   ├── tasks/
│   │   ├── TaskListPage.tsx
│   │   ├── TaskDetailPage.tsx
│   │   └── TaskBoardPage.tsx
│   ├── analytics/
│   │   ├── AnalyticsPage.tsx
│   │   ├── SalesReportsPage.tsx
│   │   ├── AgentReportsPage.tsx
│   │   └── CustomReportPage.tsx
│   ├── admin/
│   │   ├── UserManagementPage.tsx
│   │   ├── RoleManagementPage.tsx
│   │   ├── AuditLogPage.tsx
│   │   ├── SystemSettingsPage.tsx
│   │   ├── IntegrationsPage.tsx
│   │   ├── ApiKeyManagementPage.tsx
│   │   ├── EmailTemplatesPage.tsx
│   │   └── GuardrailsPage.tsx
│   ├── settings/
│   │   ├── ProfilePage.tsx
│   │   ├── AccountSettingsPage.tsx
│   │   ├── NotificationSettingsPage.tsx
│   │   ├── PersonalApiKeysPage.tsx
│   │   └── AppearancePage.tsx
│   ├── help/
│   │   ├── DocsPage.tsx
│   │   ├── ApiReferencePage.tsx
│   │   ├── ChangelogPage.tsx
│   │   └── ContactPage.tsx
│   └── errors/
│       ├── NotFoundPage.tsx
│       ├── ForbiddenPage.tsx
│       ├── ServerErrorPage.tsx
│       └── OfflinePage.tsx
│
├── components/
│   ├── ui/                            # Shared primitives
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Modal.tsx
│   │   ├── Toast.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   ├── Tabs.tsx
│   │   ├── Avatar.tsx
│   │   ├── Tooltip.tsx
│   │   ├── Skeleton.tsx
│   │   └── ... (30+ components)
│   ├── data/                          # Data display components
│   │   ├── DataTable.tsx
│   │   ├── DataTableHeader.tsx
│   │   ├── Pagination.tsx
│   │   ├── EmptyState.tsx
│   │   ├── Timeline.tsx
│   │   ├── KanbanBoard.tsx
│   │   └── StatusBadge.tsx
│   ├── charts/                        # Chart components
│   │   ├── LineChart.tsx
│   │   ├── BarChart.tsx
│   │   ├── PieChart.tsx
│   │   ├── FunnelChart.tsx
│   │   ├── Sparkline.tsx
│   │   └── MetricCard.tsx
│   ├── layout/                        # Layout components
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   ├── Breadcrumbs.tsx
│   │   ├── NotificationPanel.tsx
│   │   ├── UserMenu.tsx
│   │   └── GlobalSearch.tsx
│   └── forms/                         # Form components
│       ├── FormField.tsx
│       ├── FormSection.tsx
│       ├── MultiSelect.tsx
│       ├── DatePicker.tsx
│       ├── DateRangePicker.tsx
│       ├── TagInput.tsx
│       └── FileDropZone.tsx
│
├── hooks/                             # Custom React hooks
│   ├── useAuth.ts
│   ├── useCustomers.ts
│   ├── useWorkflows.ts
│   ├── useTasks.ts
│   ├── useNotifications.ts
│   ├── useDebounce.ts
│   └── usePagination.ts
│
├── stores/                            # Zustand stores
│   ├── authStore.ts
│   └── uiStore.ts
│
├── services/                          # API client
│   ├── api.ts                         # Axios instance with interceptors
│   ├── authService.ts
│   ├── customerService.ts
│   ├── workflowService.ts
│   ├── taskService.ts
│   └── adminService.ts
│
├── types/                             # TypeScript types
│   ├── customer.ts
│   ├── workflow.ts
│   ├── task.ts
│   ├── user.ts
│   └── api.ts
│
├── utils/                             # Utility functions
│   ├── formatters.ts                  # Date, currency, etc.
│   ├── validators.ts                  # Form validation
│   └── constants.ts                   # Routes, enums, config
│
└── styles/                            # Global styles
    ├── globals.css
    ├── variables.css
    └── theme.ts                       # MUI theme config
```

---

**Total: ~50 pages, ~250+ components across 13 module groups.**

All pages are currently in the **Design & Planning Phase** — to be created during Phase 02+ development.
