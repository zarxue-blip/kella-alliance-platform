/** Browser-side overview, composed inside the existing authenticated dashboard. */
export const workspaceDashboardClient = String.raw`
      function wsCount(value) {
        return typeof value === 'number' && Number.isFinite(value) ? value.toLocaleString('en') : '—';
      }

      function wsDate(value, options) {
        const date = value ? new Date(value) : null;
        return date && Number.isFinite(date.getTime()) ? new Intl.DateTimeFormat('en', Object.assign({ timeZone: 'UTC' }, options)).format(date) : '—';
      }

      function wsHref(path) {
        return path + (path.includes('?') ? '&' : '?') + 'dashboard=1';
      }

      function wsIcon(name) {
        const paths = {
          arrow: '<path d="M5 12h14m-5-5 5 5-5 5"/>',
          calendar: '<rect x="4" y="6" width="16" height="15" rx="2"/><path d="M8 3v6m8-6v6M4 11h16m-11 4h2"/>',
          people: '<circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2m2-15a3 3 0 0 1 0 6m2 9v-2a6 6 0 0 0-3-5"/>',
          check: '<path d="m5 12 4 4L19 6"/>',
          refresh: '<path d="M20 8a8 8 0 1 0 1 7M20 3v5h-5"/>',
          training: '<path d="m4 3 15 15-3 3L1 6l3-3Zm10 13 6-6M5 20l3-3m7-14 6 6-6 6m3-9L6 18"/>',
          research: '<path d="M4 4h6a4 4 0 0 1 2 2 4 4 0 0 1 2-2h6v15h-6a3 3 0 0 0-2 2 3 3 0 0 0-2-2H4V4Zm8 2v15"/>',
          hospital: '<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6V3Z"/>',
          base: '<path d="M3 21V9l4-3 5 3 5-3 4 3v12H3Zm5 0v-5h8v5M7 6V3m10 3V3m-5 6V2"/>',
          ticket: '<path d="M3 6h18v4a2 2 0 0 0 0 4v4H3v-4a2 2 0 0 0 0-4V6Zm12 0v3m0 3v2m0 3v1"/>',
          activity: '<path d="M3 12h4l3-7 4 14 3-7h4"/>'
        };
        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (paths[name] || paths.arrow) + '</svg>';
      }

      function wsLink(path, label, className, fullDocument) {
        return '<a class="' + (className || 'workspace-text-link') + '" href="' + escapeHtml(fullDocument ? path : wsHref(path)) + '"' + (fullDocument ? '' : ' data-link') + '>' + escapeHtml(label) + wsIcon('arrow') + '</a>';
      }

      function wsTool(path, title, detail, icon, fullDocument) {
        return '<a class="workspace-tool" href="' + escapeHtml(fullDocument ? path : wsHref(path)) + '"' + (fullDocument ? '' : ' data-link') + '><span class="workspace-tool-icon">' + wsIcon(icon) + '</span><span><strong>' + escapeHtml(title) + '</strong><small>' + escapeHtml(detail) + '</small></span>' + wsIcon('arrow') + '</a>';
      }

      function wsStat(label, value, hint, path) {
        const content = '<span class="workspace-stat-label">' + escapeHtml(label) + '</span><strong>' + escapeHtml(value) + '</strong><small>' + escapeHtml(hint) + '</small>';
        return path ? '<a class="workspace-stat" href="' + escapeHtml(wsHref(path)) + '" data-link>' + content + '</a>' : '<div class="workspace-stat">' + content + '</div>';
      }

      function workspaceOverviewHtml(data) {
        data = data || {};
        const summary = data.summary || {};
        const admin = data.isAdmin === true;
        const now = Date.now();
        const events = Array.isArray(data.events) ? data.events.filter(function(event) { return event && Number.isFinite(new Date(event.startsAt).getTime()); }).sort(function(a, b) { return new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(); }) : null;
        const upcoming = events ? events.filter(function(event) { return new Date(event.startsAt).getTime() >= now; }) : null;
        const next = upcoming && upcoming[0];
        const attending = next && Array.isArray(next.groups && next.groups.attending) ? next.groups.attending.length : null;
        const absent = next && Array.isArray(next.groups && next.groups.absent) ? next.groups.absent.length : null;
        const signups = admin && Array.isArray(data.signups) ? data.signups.filter(function(signup) { return signup.status === 'pending'; }) : null;
        const tickets = admin && Array.isArray(data.tickets) ? data.tickets.filter(function(ticket) { return typeof ticket.active === 'boolean' ? ticket.active : ['creating', 'open', 'closing', 'close-failed'].includes(ticket.status); }) : null;
        const errors = Array.isArray(data.errors) ? data.errors : [];
        const loading = data.loading === true;
        const today = wsDate(new Date().toISOString(), { weekday: 'long', month: 'long', day: 'numeric' });
        const heading = '<header class="workspace-page-head"><div><p class="workspace-eyebrow">' + escapeHtml(data.allianceName || 'Your community') + '</p><h1>Overview</h1><p>' + escapeHtml(today) + '<span aria-hidden="true"> · </span>UTC</p></div><div class="workspace-page-actions"><button class="workspace-button workspace-button-quiet" type="button" data-action="refresh-workspace"' + (loading ? ' disabled' : '') + '>' + wsIcon('refresh') + '<span>' + (loading ? 'Refreshing' : 'Refresh') + '</span></button>' + (admin ? wsLink('/tools?tool=events', 'Create event', 'workspace-button workspace-button-primary') : wsLink('/calendar', 'Calendar', 'workspace-button workspace-button-primary')) + '</div></header>';
        const notices = errors.length ? '<aside class="workspace-notice" role="status"><span>' + wsIcon('activity') + '</span><div><strong>Some information could not be loaded</strong><p>' + errors.map(function(error) { return escapeHtml(error.label || 'Dashboard') + ': ' + escapeHtml(error.message || 'Try refreshing.'); }).join(' · ') + '</p></div></aside>' : '';
        const stats = '<section class="workspace-stats" aria-label="Community at a glance">' + wsStat('Members', wsCount(summary.totalMembers), 'Active roster', '/members') + (admin ? wsStat('Check-ins today', wsCount(summary.todayCheckIns), 'Attendance · UTC', '/officer?section=attendance') + wsStat('Active alerts', wsCount(summary.activeAlerts), 'Alliance reports', '/officer?section=attendance') + wsStat('Migration requests', wsCount(summary.pendingApplications), 'Awaiting review', '/migration/admin') : wsStat('Upcoming events', upcoming ? wsCount(upcoming.length) : '—', 'Alliance calendar', '/calendar') + wsStat('Attending next', wsCount(attending), next ? 'Event responses' : 'No next event', next ? '/attendance/' + encodeURIComponent(next.id) : '/calendar') + wsStat('Absent next', wsCount(absent), next ? 'Event responses' : 'No next event')) + '</section>';
        let eventBody;
        if (next) {
          const description = typeof next.description === 'string' ? next.description.trim().slice(0, 190) : '';
          eventBody = '<div class="workspace-event-content"><div class="workspace-date-block"><span>' + escapeHtml(wsDate(next.startsAt, { month: 'short' })) + '</span><strong>' + escapeHtml(wsDate(next.startsAt, { day: '2-digit' })) + '</strong><small>' + escapeHtml(wsDate(next.startsAt, { weekday: 'short' })) + '</small></div><div class="workspace-event-copy"><p class="workspace-event-time">' + escapeHtml(wsDate(next.startsAt, { hour: '2-digit', minute: '2-digit', hour12: false })) + ' UTC</p><h3>' + escapeHtml(next.title || 'Alliance event') + '</h3>' + (description ? '<p class="workspace-event-description">' + escapeHtml(description) + '</p>' : '') + '<div class="workspace-event-attendance"><span><i class="workspace-dot workspace-dot-green" aria-hidden="true"></i><strong>' + wsCount(attending) + '</strong> attending</span><span><i class="workspace-dot" aria-hidden="true"></i><strong>' + wsCount(absent) + '</strong> absent</span></div>' + wsLink('/attendance/' + encodeURIComponent(next.id), 'View event', 'workspace-button workspace-button-primary') + '</div></div>';
        } else {
          eventBody = '<div class="workspace-empty workspace-empty-event">' + wsIcon('calendar') + '<h3>' + (loading ? 'Loading the calendar' : upcoming ? 'A clear calendar' : 'Calendar unavailable') + '</h3><p>' + (loading ? 'Your events will appear here.' : upcoming ? 'No upcoming events are scheduled.' : 'Refresh to load upcoming events.') + '</p>' + wsLink('/calendar', 'Open calendar') + '</div>';
        }
        const nextEvent = '<section class="workspace-panel workspace-next-event" aria-labelledby="workspace-next-event"><header class="workspace-section-head"><h2 id="workspace-next-event">Next event</h2><span class="workspace-section-meta">Alliance calendar</span></header>' + eventBody + '</section>';
        let attention;
        if (admin) {
          attention = '<section class="workspace-panel workspace-attention" aria-labelledby="workspace-attention"><header class="workspace-section-head"><h2 id="workspace-attention">Needs attention</h2><span class="workspace-section-meta">Admin</span></header><div class="workspace-attention-list">' +
            '<a href="/kingdom/admin" class="workspace-attention-row"><span class="workspace-attention-icon">' + wsIcon('people') + '</span><span><strong>Member requests</strong><small>' + (signups ? signups.length ? 'Waiting for approval' : 'No pending signups' : loading ? 'Loading requests' : 'Requests unavailable') + '</small></span><b>' + wsCount(signups ? signups.length : null) + '</b>' + wsIcon('arrow') + '</a>' +
            '<a href="' + escapeHtml(wsHref('/officer?section=attendance&kind=tickets')) + '" data-link class="workspace-attention-row"><span class="workspace-attention-icon">' + wsIcon('ticket') + '</span><span><strong>Open tickets</strong><small>' + (tickets ? tickets.length ? 'Support conversations' : 'No open tickets' : loading ? 'Loading tickets' : 'Tickets unavailable') + '</small></span><b>' + wsCount(tickets ? tickets.length : null) + '</b>' + wsIcon('arrow') + '</a>' +
            '<a href="' + escapeHtml(wsHref('/migration/admin')) + '" data-link class="workspace-attention-row"><span class="workspace-attention-icon">' + wsIcon('base') + '</span><span><strong>Migration</strong><small>Review applications</small></span><b>' + wsCount(summary.pendingApplications) + '</b>' + wsIcon('arrow') + '</a></div>' + (signups && tickets && signups.length === 0 && tickets.length === 0 && summary.pendingApplications === 0 ? '<p class="workspace-clear">' + wsIcon('check') + 'You’re all caught up.</p>' : '') + '</section>';
        } else {
          attention = '<section class="workspace-panel workspace-attention" aria-labelledby="workspace-attention"><header class="workspace-section-head"><h2 id="workspace-attention">Your tools</h2><span class="workspace-section-meta">Member workspace</span></header><div class="workspace-tools">' + wsTool('/base', 'Your kingdom', 'Open your saved settlement', 'base', true) + wsTool('/research', 'Research', 'Plan your next technology', 'research') + wsTool('/training-tools', 'Training', 'Units, resources & speedups', 'training') + wsTool('/hospital', 'Hospital', 'Calculate healing resources', 'hospital', true) + '</div></section>';
        }
        const schedule = upcoming ? upcoming.slice(1, 4) : [];
        const calendarRows = schedule.map(function(event) { return '<a class="workspace-agenda-row" href="' + escapeHtml(wsHref('/attendance/' + encodeURIComponent(event.id))) + '" data-link><time><span>' + escapeHtml(wsDate(event.startsAt, { month: 'short', day: 'numeric' })) + '</span><small>' + escapeHtml(wsDate(event.startsAt, { hour: '2-digit', minute: '2-digit', hour12: false })) + ' UTC</small></time><strong>' + escapeHtml(event.title || 'Alliance event') + '</strong>' + wsIcon('arrow') + '</a>'; }).join('');
        const agenda = '<section class="workspace-panel workspace-agenda" aria-labelledby="workspace-agenda"><header class="workspace-section-head"><h2 id="workspace-agenda">Coming up</h2>' + wsLink('/calendar', 'Full calendar') + '</header>' + (calendarRows || '<p class="workspace-list-empty">' + (loading ? 'Loading events…' : upcoming ? 'No additional events scheduled.' : 'Refresh to load the calendar.') + '</p>') + '</section>';
        const activity = admin && Array.isArray(summary.recentAdminActions) ? summary.recentAdminActions.slice(0, 5) : [];
        const activityRows = activity.map(function(item) {
          const type = String(item.type || 'Admin action').replace(/_/g, ' ');
          return '<li><span class="workspace-activity-marker" aria-hidden="true"></span><div><strong>' + escapeHtml(type.charAt(0).toUpperCase() + type.slice(1)) + '</strong><p>' + escapeHtml(item.officer || 'Dashboard') + (item.target ? '<span aria-hidden="true"> · </span>' + escapeHtml(item.target) : '') + '</p></div><time datetime="' + escapeHtml(item.sentAt || '') + '">' + escapeHtml(wsDate(item.sentAt, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false })) + ' UTC</time></li>';
        }).join('');
        const lowerSide = admin ? '<section class="workspace-panel workspace-activity" aria-labelledby="workspace-activity"><header class="workspace-section-head"><h2 id="workspace-activity">Recent activity</h2><span class="workspace-section-meta">Admin log</span></header>' + (activityRows ? '<ol>' + activityRows + '</ol>' : '<p class="workspace-list-empty">' + (loading ? 'Loading activity…' : !data.summary ? 'Activity could not be loaded.' : 'No recent admin activity.') + '</p>') + '</section>' : '<section class="workspace-panel workspace-community" aria-labelledby="workspace-community"><header class="workspace-section-head"><h2 id="workspace-community">Stay connected</h2></header><p>Know your alliance. Be ready for the next event.</p><div class="workspace-tools">' + wsTool('/members', 'Member roster', 'Find the people in your alliance', 'people') + wsTool('/calendar', 'Alliance calendar', 'All plans, in server time', 'calendar') + '</div></section>';
        const tools = admin ? '<section class="workspace-admin-shortcuts" aria-label="Member tools"><span>Member tools</span>' + wsLink('/base', 'Kingdom', 'workspace-shortcut', true) + wsLink('/research', 'Research', 'workspace-shortcut') + wsLink('/training-tools', 'Training', 'workspace-shortcut') + wsLink('/hospital', 'Hospital', 'workspace-shortcut', true) + '</section>' : '';
        return '<div class="workspace-overview"' + (loading ? ' aria-busy="true"' : '') + '>' + heading + notices + stats + '<div class="workspace-primary-grid">' + nextEvent + attention + '</div><div class="workspace-secondary-grid">' + agenda + lowerSide + '</div>' + tools + '<footer class="workspace-page-footer"><span>' + escapeHtml(data.allianceTag || 'Kella') + '<span aria-hidden="true"> / </span>' + (admin ? 'Admin workspace' : 'Member workspace') + '</span><span>All event times in UTC</span></footer></div>';
      }
`;
