const list = document.querySelector('#kingdom-list');
const summary = document.querySelector('#kingdom-summary');
const feedback = document.querySelector('#kingdom-feedback');

function cell(label, value, asLink = false) {
  const wrapper = document.createElement('div');
  const heading = document.createElement('small');
  heading.textContent = label;
  wrapper.append(heading);
  const content = document.createElement(asLink ? 'a' : 'strong');
  content.textContent = value || '—';
  if (asLink && value) content.href = `mailto:${value}`;
  wrapper.append(content);
  return wrapper;
}

function render(members) {
  list.replaceChildren();
  const pending = members.filter((member) => member.status === 'pending').length;
  summary.textContent = `${members.length} ${members.length === 1 ? 'member' : 'members'} · ${pending} pending`;
  if (!members.length) {
    const empty = document.createElement('p');
    empty.className = 'kingdom-empty';
    empty.textContent = 'No signups yet.';
    list.append(empty);
    return;
  }
  members.forEach((member) => {
    const row = document.createElement('article');
    row.className = 'kingdom-member';
    const localAccount = member.provider === 'local';
    const details = document.createElement('div');
    details.className = 'kingdom-member-details';
    details.append(cell('Account type', localAccount ? 'Username & password' : 'Google'));
    details.append(localAccount ? cell('Lord ID', member.lordId) : cell('Email', member.email, true));
    row.append(cell('In-game username', member.inGameUsername || member.username), details);
    const state = document.createElement('div');
    const stateLabel = document.createElement('small');
    stateLabel.textContent = 'Access';
    const badge = document.createElement('span');
    badge.className = `kingdom-status ${member.status}`;
    badge.textContent = member.status;
    state.append(stateLabel, badge);
    row.append(state);
    const actions = document.createElement('div');
    actions.className = 'kingdom-member-actions';
    for (const [status, label] of [['approved', 'Approve'], ['terminated', 'Terminate']]) {
      if (member.status === status) continue;
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = label;
      if (status === 'terminated') button.className = 'terminate';
      button.addEventListener('click', async () => {
        if (status === 'terminated' && !window.confirm(`Terminate ${member.inGameUsername || member.username}'s kingdom access?`)) return;
        actions.querySelectorAll('button').forEach((item) => { item.disabled = true; });
        feedback.textContent = '';
        try {
          const response = await fetch(`/api/dashboard/kingdom-signups/${encodeURIComponent(member.id)}`, {
            method: 'PATCH', credentials: 'same-origin',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ status })
          });
          if (!response.ok) throw new Error('Could not update this signup. Refresh and try again.');
          feedback.textContent = `${member.inGameUsername || member.username}: ${status}.`;
          await load();
        } catch (error) {
          feedback.textContent = error.message;
          actions.querySelectorAll('button').forEach((item) => { item.disabled = false; });
        }
      });
      actions.append(button);
    }
    row.append(actions);
    list.append(row);
  });
}

async function load() {
  const response = await fetch('/api/dashboard/kingdom-signups', { credentials: 'same-origin' });
  if (!response.ok) throw new Error('Could not load kingdom members. Please sign in with your admin Discord account.');
  const data = await response.json();
  render(Array.isArray(data.members) ? data.members : []);
}

load().catch((error) => {
  summary.textContent = 'Unable to load signups';
  feedback.textContent = error.message;
});
