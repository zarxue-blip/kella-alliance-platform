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

function dateLabel(value) {
  if (!value) return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '—' : date.toLocaleString();
}

function paymentLabel(payment) {
  const amount = Number(payment.amountCents);
  const price = Number.isFinite(amount) ? `$${(amount / 100).toFixed(2)}` : '—';
  return `${payment.email} · ${price} · ${dateLabel(payment.paidAt)}`;
}

function paymentMatchScore(payment, member) {
  if (member.requestedTransactionId && payment.transactionId === member.requestedTransactionId) return 2;
  if (member.requestedPaymentEmail &&
      payment.email?.toLowerCase() === member.requestedPaymentEmail.toLowerCase()) return 1;
  return 0;
}

function setActionBusy(actions, busy) {
  actions.querySelectorAll('button, select, input').forEach((item) => { item.disabled = busy; });
}

async function responseError(response, fallback) {
  const body = await response.json().catch(() => null);
  return new Error(typeof body?.message === 'string' && body.message ? body.message : fallback);
}

function paymentMatchAction(member, payments, actions) {
  const panel = document.createElement('details');
  panel.className = 'kingdom-payment-match';
  const title = document.createElement('summary');
  title.textContent = 'Match verified payment';
  panel.append(title);

  const warning = document.createElement('p');
  warning.textContent = 'Submitted payment details are unverified. Check the applicant’s receipt against the Ko-fi record before linking it.';
  panel.append(warning);

  if (!payments.length) {
    const empty = document.createElement('p');
    empty.textContent = 'No unclaimed Forest Guardian payments are available.';
    panel.append(empty);
    return panel;
  }

  const selectLabel = document.createElement('label');
  selectLabel.textContent = 'Verified Ko-fi payment';
  const select = document.createElement('select');
  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.textContent = 'Choose a payment';
  select.append(placeholder);
  const sorted = [...payments].sort((a, b) =>
    paymentMatchScore(b, member) - paymentMatchScore(a, member) ||
    new Date(b.paidAt).getTime() - new Date(a.paidAt).getTime()
  );
  sorted.forEach((payment) => {
    const option = document.createElement('option');
    option.value = payment.id;
    option.textContent = paymentLabel(payment);
    select.append(option);
  });
  selectLabel.append(select);
  panel.append(selectLabel);

  const selectedDetails = document.createElement('div');
  selectedDetails.className = 'kingdom-payment-details';
  panel.append(selectedDetails);

  const confirmation = document.createElement('label');
  confirmation.className = 'kingdom-payment-confirmation';
  const verified = document.createElement('input');
  verified.type = 'checkbox';
  confirmation.append(verified, document.createTextNode(' I checked that this Ko-fi receipt belongs to this applicant.'));
  panel.append(confirmation);

  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = 'Link payment and approve';
  button.disabled = true;
  panel.append(button);

  function refreshSelection() {
    const payment = payments.find((item) => item.id === select.value);
    selectedDetails.replaceChildren();
    if (payment) {
      selectedDetails.append(
        cell('Ko-fi payer email', payment.email),
        cell('Ko-fi transaction ID', payment.transactionId),
        cell('Paid', dateLabel(payment.paidAt)),
        cell('Paid through', dateLabel(payment.paidThrough))
      );
    }
    button.disabled = !payment || !verified.checked;
  }
  select.addEventListener('change', refreshSelection);
  verified.addEventListener('change', refreshSelection);
  button.addEventListener('click', async () => {
    const payment = payments.find((item) => item.id === select.value);
    if (!payment || !verified.checked) return;
    const name = member.inGameUsername || member.username;
    setActionBusy(actions, true);
    feedback.textContent = '';
    try {
      const response = await fetch(`/api/dashboard/kingdom-signups/${encodeURIComponent(member.id)}/payment`, {
        method: 'PATCH', credentials: 'same-origin',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ paymentId: payment.id })
      });
      if (!response.ok) throw await responseError(response, 'Could not link this payment. Refresh and check whether it was already used.');
      feedback.textContent = `${name}: payment linked and access approved.`;
      await load();
    } catch (error) {
      feedback.textContent = error.message;
      setActionBusy(actions, false);
      refreshSelection();
    }
  });
  return panel;
}

function render(members, payments) {
  list.replaceChildren();
  const pending = members.filter((member) => member.status === 'pending').length;
  const unpaid = members.filter((member) => member.paymentRequired && member.paymentStatus !== 'paid').length;
  summary.textContent = `${members.length} ${members.length === 1 ? 'member' : 'members'} · ${pending} pending review · ${unpaid} without VIP membership`;
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
    const googleAccount = member.provider === 'google';
    const accountTypes = {
      local: 'Username & password', google: 'Google', discord: 'Discord', private: 'Private member link'
    };
    const details = document.createElement('div');
    details.className = 'kingdom-member-details';
    details.append(cell('Account type', accountTypes[member.provider] || member.provider));
    if (localAccount) details.append(cell('Lord ID', member.lordId));
    if (googleAccount) details.append(cell('Email', member.email, true));
    const paymentDetails = document.createElement('div');
    paymentDetails.className = 'kingdom-payment-details';
    if (member.paymentRequired) {
      paymentDetails.append(cell('Membership', member.paymentStatus === 'paid' ? 'Guardian VIP' : 'Regular'));
      if (member.paymentEmail) paymentDetails.append(cell('Bound payer email', member.paymentEmail));
      if (member.paidThrough) paymentDetails.append(cell('Paid through', dateLabel(member.paidThrough)));
      if (member.requestedPaymentEmail) paymentDetails.append(cell('Applicant’s payer email', member.requestedPaymentEmail));
      if (member.requestedTransactionId) paymentDetails.append(cell('Applicant’s transaction ID', member.requestedTransactionId));
    } else {
      paymentDetails.append(cell('Membership', member.hasVipAccess ? 'Granted VIP access' : 'Regular'));
    }
    details.append(paymentDetails);
    row.append(cell(localAccount || googleAccount ? 'In-game username' : member.provider === 'discord' ? 'Discord name' : 'Member name', member.inGameUsername || member.username), details);

    const state = document.createElement('div');
    const stateLabel = document.createElement('small');
    stateLabel.textContent = localAccount || googleAccount ? 'Review' : 'Access';
    const badge = document.createElement('span');
    badge.className = `kingdom-status ${member.status}`;
    badge.textContent = member.status;
    state.append(stateLabel, badge);
    row.append(state);

    const actions = document.createElement('div');
    actions.className = 'kingdom-member-actions';
    for (const [status, label] of localAccount || googleAccount ? [['approved', 'Approve regular access'], ['terminated', 'Terminate']] : []) {
      if (member.status === status) continue;
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = label;
      if (status === 'terminated') button.className = 'terminate';
      button.addEventListener('click', async () => {
        if (status === 'terminated' && !window.confirm(`Terminate ${member.inGameUsername || member.username}'s kingdom access?`)) return;
        setActionBusy(actions, true);
        feedback.textContent = '';
        try {
          const response = await fetch(`/api/dashboard/kingdom-signups/${encodeURIComponent(member.id)}`, {
            method: 'PATCH', credentials: 'same-origin',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ status })
          });
          if (!response.ok) throw await responseError(response, 'Could not update this signup. Refresh and try again.');
          feedback.textContent = `${member.inGameUsername || member.username}: ${status}${status === 'approved' && member.paymentRequired && member.paymentStatus !== 'paid' ? '; regular access approved (VIP requires membership)' : ''}.`;
          await load();
        } catch (error) {
          feedback.textContent = error.message;
          setActionBusy(actions, false);
        }
      });
      actions.append(button);
    }
    row.append(actions);
    if (member.paymentRequired && member.paymentStatus !== 'paid' && member.status !== 'terminated') {
      row.append(paymentMatchAction(member, payments, row));
    }
    list.append(row);
  });
}

async function load() {
  const response = await fetch('/api/dashboard/kingdom-signups', { credentials: 'same-origin' });
  if (!response.ok) throw new Error('Could not load kingdom members. Please sign in with your admin Discord account.');
  const data = await response.json();
  render(Array.isArray(data.members) ? data.members : [], Array.isArray(data.payments) ? data.payments : []);
}

load().catch((error) => {
  summary.textContent = 'Unable to load signups';
  feedback.textContent = error.message;
});
