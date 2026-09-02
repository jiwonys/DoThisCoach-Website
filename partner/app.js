const API = 'https://api.dothiscoach.com/api/partners';
const AGREEMENT_VERSION = '2026-08-23-manual-us-v1';
const $ = (id) => document.getElementById(id);
const money = (cents) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format((Number(cents) || 0) / 100);
const publicView = $('public-view');
const dashboard = $('dashboard-view');
const sessionAction = $('session-action');
let currentDashboard = null;

function switchPanel(name) {
  document.querySelectorAll('.tab').forEach((tab) => {
    const active = tab.dataset.panel === name;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-selected', String(active));
  });
  document.querySelectorAll('.form-panel').forEach((panel) => panel.classList.toggle('active', panel.id === `${name}-form`));
}

document.querySelectorAll('.tab').forEach((tab) => tab.addEventListener('click', () => switchPanel(tab.dataset.panel)));
sessionAction.addEventListener('click', async () => {
  if (sessionAction.dataset.signedIn === 'true') {
    await fetch(`${API}/logout`, { method: 'POST', credentials: 'include' }).catch(() => {});
    location.reload();
    return;
  }
  switchPanel('login');
  $('login-form').scrollIntoView({ behavior: 'smooth', block: 'center' });
});

async function api(path, init = {}) {
  const response = await fetch(`${API}${path}`, { ...init, credentials: 'include', headers: { Accept: 'application/json', 'Content-Type': 'application/json', ...(init.headers || {}) } });
  const json = await response.json().catch(() => null);
  if (!response.ok || !json?.success) throw new Error(json?.error || `Request failed (${response.status})`);
  return json.data;
}

function formValues(form) {
  const values = Object.fromEntries(new FormData(form));
  for (const checkbox of form.querySelectorAll('input[type="checkbox"]')) values[checkbox.name] = checkbox.checked;
  if ('acceptedPromoterAgreement' in values) values.promoterAgreementVersion = AGREEMENT_VERSION;
  if ('acceptedFtcAgreement' in values) values.ftcAgreementVersion = AGREEMENT_VERSION;
  return values;
}

function validateSocialProfiles(form) {
  if (form.id !== 'apply-form') return '';
  const tiktok = form.elements.tiktokUsername;
  const instagram = form.elements.instagramUsername;
  tiktok.setCustomValidity('');
  instagram.setCustomValidity('');
  if (tiktok.value.trim() || instagram.value.trim()) return '';
  const error = 'Enter at least one TikTok or Instagram handle.';
  tiktok.setCustomValidity(error);
  tiktok.focus();
  form.reportValidity();
  return error;
}

for (const input of document.querySelectorAll('#apply-form [name="tiktokUsername"], #apply-form [name="instagramUsername"]')) {
  input.addEventListener('input', () => {
    for (const profileInput of document.querySelectorAll('#apply-form [name="tiktokUsername"], #apply-form [name="instagramUsername"]')) {
      profileInput.setCustomValidity('');
    }
    $('apply-message').textContent = '';
  });
}

function submitForm(formId, path, messageId) {
  const form = $(formId);
  form.addEventListener('submit', async (event) => {
    event.preventDefault(); const button = form.querySelector('button[type="submit"]'); const message = $(messageId);
    message.textContent = '';
    const validationError = validateSocialProfiles(form);
    if (validationError) { message.textContent = validationError; return; }
    button.disabled = true;
    try { renderDashboard(await api(path, { method: 'POST', body: JSON.stringify(formValues(form)) })); }
    catch (error) { message.textContent = error.message; }
    finally { button.disabled = false; }
  });
}

submitForm('apply-form', '/signup', 'apply-message');
submitForm('login-form', '/login', 'login-message');
submitForm('details-form', '/details', 'details-message');

function describeRequest(request) {
  if (!request) return 'Request the exact commissions that have completed their 30-day verification hold.';
  const labels = {
    verification_required: 'Reserved. DoThis administration must confirm your secure W-9 record, identity, and payout destination.',
    pending_admin_review: request.holdReason ? `Admin hold: ${request.holdReason}` : 'Verification complete. Awaiting manual payment review.',
    processing: 'Payment is processing.',
    paid: `Paid${request.paymentMethod ? ` by ${request.paymentMethod.toUpperCase()}` : ''}${request.paidAt ? ` on ${new Date(request.paidAt).toLocaleDateString()}` : ''}.`,
    rejected: `Rejected${request.rejectionReason ? `: ${request.rejectionReason}` : '.'}`,
    cancelled: 'Cancelled. Reserved commissions are available for a new request.',
  };
  return `${money(request.amountCents)} · ${request.commissionCount} commissions · ${labels[request.status] || request.status}`;
}

function renderDashboard(data) {
  currentDashboard = data; publicView.classList.add('hidden'); dashboard.classList.remove('hidden');
  sessionAction.textContent = 'Sign out'; sessionAction.dataset.signedIn = 'true';
  $('welcome-title').textContent = `Welcome, ${data.username}.`; $('partner-status').textContent = data.status; $('partner-status').className = `status ${data.status}`;
  $('partner-code').textContent = data.code || data.preferredCode || 'Reserved';
  const status = { pending: 'Application received. We will review your profile and requested code.', approved: data.codeStatus === 'active' ? 'Your code is active. Share it with clear partner disclosure.' : 'You are approved. Your App Store code is being prepared.', rejected: `Application not approved${data.rejectionReason ? `: ${data.rejectionReason}` : '.'}`, suspended: 'This partner account is paused.' };
  $('status-copy').textContent = status[data.status] || ''; $('code-card').classList.toggle('hidden', data.status !== 'approved');
  const payout = data.payout || {}; const metrics = payout.metrics || {};
  $('estimated-total').textContent = money(metrics.estimatedTotalCents); $('available-earnings').textContent = money(metrics.availableCents);
  $('pending-verification').textContent = money(metrics.pendingVerificationCents); $('tax-required').textContent = metrics.taxInformationRequired ? 'Yes' : 'No';
  $('details-card').classList.toggle('hidden', Boolean(payout.detailsComplete)); $('payout-card').classList.toggle('hidden', data.status !== 'approved' || !payout.detailsComplete);
  $('payout-copy').textContent = describeRequest(payout.activeRequest); const active = payout.activeRequest;
  $('request-payout').classList.toggle('hidden', Boolean(active && !['paid', 'rejected', 'cancelled'].includes(active.status))); $('request-payout').disabled = Number(metrics.availableCents) <= 0;
  $('cancel-payout').classList.toggle('hidden', !active || !['verification_required', 'pending_admin_review'].includes(active.status));
  $('payout-message').textContent = active?.status === 'verification_required'
    ? 'DoThis will contact you with secure manual verification instructions. Never send tax or bank information by email.'
    : '';
}

$('copy-code').addEventListener('click', async () => { await navigator.clipboard.writeText($('partner-code').textContent); $('copy-code').textContent = 'Copied'; setTimeout(() => { $('copy-code').textContent = 'Copy code'; }, 1600); });
$('request-payout').addEventListener('click', async () => { const button = $('request-payout'); button.disabled = true; $('payout-message').textContent = ''; try { renderDashboard(await api('/payout-requests', { method: 'POST', body: '{}' })); } catch (error) { $('payout-message').textContent = error.message; } finally { button.disabled = false; } });
$('cancel-payout').addEventListener('click', async () => { const request = currentDashboard?.payout?.activeRequest; if (!request) return; try { renderDashboard(await api(`/payout-requests/${encodeURIComponent(request.id)}/cancel`, { method: 'POST', body: '{}' })); } catch (error) { $('payout-message').textContent = error.message; } });
api('/session').then(renderDashboard).catch(() => {});
