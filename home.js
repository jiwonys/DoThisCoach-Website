const allowedSports = {
  general: {name: 'General athlete', title: 'You don’t need to go pro to train with purpose.', description: 'Whether it’s a weekly league or a weekend game, put a strength plan behind the sport you enjoy. DoThis brings your schedule, equipment, preferences, and training history together.'},
  volleyball: {name: 'Volleyball', title: 'Put a plan behind every rally.', description: 'On the sand or in the gym, your sport belongs in your strength plan. Give DoThis your volleyball schedule and training requests, then log the work that supports your time on court.'},
  tennis: {name: 'Tennis', title: 'Make your gym time part of your tennis week.', description: 'Fit strength training around court time and match days. Your tennis schedule, recent sessions, and recovery give DoThis the context to build your next workout.'},
  basketball: {name: 'Basketball', title: 'Your next lift knows about game night.', description: 'Keep strength sessions and basketball on the same calendar. Tell DoThis when you play and how you feel, then choose the training load that fits your day.'},
  soccer: {name: 'Soccer', title: 'Train with the next match in mind.', description: 'Bring practices, matches, and gym work into one week. DoThis uses your soccer schedule, equipment, and completed training to help shape the next session.'},
  pickleball: {name: 'Pickleball', title: 'Bring a little more purpose to your court time.', description: 'You play because you enjoy it. Give your gym training that same direction, with workouts shaped by your pickleball schedule, training goals, and recovery.'}
};
const sportLinks = [...document.querySelectorAll('[data-sport]')];
const sportImage = document.querySelector('#sport-image');
let activeSport = 'general';
let sportImageRequest = 0;
function setSport(requested, updateURL = false) {
  activeSport = Object.hasOwn(allowedSports, requested) ? requested : 'general';
  const sport = allowedSports[activeSport];
  document.body.dataset.selectedSport = activeSport;
  sportLinks.forEach(link => {
    if (link.dataset.sport === activeSport) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  });
  document.querySelectorAll('[data-download]').forEach(link => {
    link.href = activeSport === 'general' ? '/app/' : `/app/${activeSport}/`;
  });
  document.querySelector('#sport-name').textContent = sport.title;
  document.querySelector('#sport-description').textContent = sport.description;
  if (updateURL) {
    const url = new URL(location.href);
    url.searchParams.set('sport', activeSport);
    history.pushState({}, '', url);
  }
  const source = activeSport === 'general' ? '/assets/screenshots/progress-trends.webp' : `/assets/sports/${activeSport}-workout.webp`;
  const caption = document.querySelector('#sport-caption');
  const captionText = activeSport === 'general' ? 'Actual app screen · Training progress' : `DoThis App Store preview · ${sport.name}`;
  const request = ++sportImageRequest;
  if (sportImage.getAttribute('src') === source) {
    sportImage.removeAttribute('aria-busy');
    caption.textContent = captionText;
    return;
  }
  caption.textContent = 'Loading app preview…';
  sportImage.setAttribute('aria-busy', 'true');
  const next = new Image();
  next.onload = () => {
    if (request !== sportImageRequest) return;
    sportImage.src = source;
    sportImage.alt = activeSport === 'general' ? 'Actual DoThis Progress screen showing example training history and weight trends' : `DoThis App Store preview showing a workout for ${sport.name.toLowerCase()}`;
    sportImage.width = activeSport === 'general' ? 640 : 660;
    sportImage.height = activeSport === 'general' ? 1391 : 1434;
    sportImage.removeAttribute('aria-busy');
    caption.textContent = captionText;
  };
  next.onerror = () => {
    if (request !== sportImageRequest) return;
    sportImage.removeAttribute('aria-busy');
    caption.textContent = 'Preview unavailable. Select your sport again to retry.';
  };
  next.src = source;
}
sportLinks.forEach(link => link.addEventListener('click', event => {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  setSport(link.dataset.sport, true);
}));
setSport(new URL(location.href).searchParams.get('sport'));
addEventListener('popstate', () => setSport(new URL(location.href).searchParams.get('sport')));

const sessions = {
  prep: {label: 'Sports Prep', title: 'Get ready for the game.', description: 'A warm-up and cooldown for your sport, without an added strength session in this example.'},
  lighter: {label: 'Lighter Workout', title: 'Get some work in. Keep some in reserve.', description: 'A reduced training dose, with your match and recent workouts in mind.'},
  full: {label: 'Full Workout', title: 'Choose a full training session.', description: 'Your normal training dose, with your sport schedule, readiness, and recent sessions as context.'}
};
document.querySelectorAll('[data-dose]').forEach(button => button.addEventListener('click', () => {
  const session = sessions[button.dataset.dose];
  document.querySelectorAll('[data-dose]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  document.querySelector('#session-title').textContent = session.title;
  document.querySelector('#session-description').textContent = session.description;
}));

const features = {
  workout: {title: 'Walk into the gym with a plan.', description: 'Generate a workout for your sport and available equipment. Follow it set by set, log your weights and reps, or import a routine you already use.', points: ['Sessions shaped by your sport and schedule', 'Your requests and limitations considered', 'Completed sets inform future training'], image: 'adaptive-workout', alt: 'Actual DoThis workout screen showing upper-body strength and shoulder durability for beach volleyball', caption: 'Actual app screen · Beach volleyball example'},
  coach: {title: 'Your training comes with context.', description: 'Talk through a specific request or ask about your recent training. Coach uses your relevant history, schedule, and preferences to offer guidance. You make the final call.', points: ['Ask about workouts, recovery, and nutrition', 'Review, edit, or delete Coach memory', 'Confirm changes in the app yourself'], image: 'coach-memory', alt: 'Actual DoThis Coach Memory screen with editable training preferences', caption: 'Actual app screen · Coach memory example'},
  progress: {title: 'Keep a record of the work.', description: 'See completed sessions, logged sets, and weight trends together. Your next workout has a history to build on, and you have a clearer picture of your consistency.', points: ['Keep your completed workout history', 'Track the weights and reps you log', 'Review your progress over time'], image: 'progress-trends', alt: 'Actual DoThis Progress screen showing example training history and weight trends', caption: 'Actual app screen · Progress example'},
  food: {title: 'Keep your fuel in the picture.', description: 'Log meals and review nutrition totals alongside your training. Use search, barcode scanning, manual entry, or an AI estimate you can review.', points: ['Food and macro logging in the same app', 'Daily nutrition totals at a glance', 'Review and adjust AI estimates'], image: 'ai-nutrition', alt: 'Actual DoThis food logging screen with daily calories and macronutrients', caption: 'Actual app screen · Nutrition example'}
};
const featureTabs = [...document.querySelectorAll('[data-feature]')];
let featureImageRequest = 0;
function selectFeature(tab) {
  const feature = features[tab.dataset.feature];
  featureTabs.forEach(item => {
    item.setAttribute('aria-selected', String(item === tab));
    item.tabIndex = item === tab ? 0 : -1;
  });
  document.querySelector('#feature-panel').setAttribute('aria-labelledby', tab.id);
  document.querySelector('#feature-title').textContent = feature.title;
  document.querySelector('#feature-description').textContent = feature.description;
  document.querySelector('#feature-points').replaceChildren(...feature.points.map(point => {
    const item = document.createElement('li'); item.textContent = point; return item;
  }));
  const request = ++featureImageRequest;
  const caption = document.querySelector('#feature-caption');
  const image = document.querySelector('#feature-image');
  caption.textContent = 'Loading app screen…';
  image.setAttribute('aria-busy', 'true');
  const next = new Image();
  next.onload = () => {
    if (request !== featureImageRequest) return;
    image.src = next.src; image.alt = feature.alt;
    image.removeAttribute('aria-busy'); caption.textContent = feature.caption;
  };
  next.onerror = () => {
    if (request !== featureImageRequest) return;
    image.removeAttribute('aria-busy'); caption.textContent = 'Screen unavailable. Select the feature again to retry.';
  };
  next.src = `/assets/screenshots/${feature.image}.webp`;
}
featureTabs.forEach((tab,index) => {
  tab.addEventListener('click', () => selectFeature(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % featureTabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + featureTabs.length) % featureTabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = featureTabs.length - 1;
    if (next === undefined) return;
    event.preventDefault(); selectFeature(featureTabs[next]); featureTabs[next].focus();
  });
});

const menu = document.querySelector('.site-menu');
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { menu.open = false; }));
document.addEventListener('click', event => { if (!menu.contains(event.target)) menu.open = false; });
document.addEventListener('focusin', event => { if (!menu.contains(event.target)) menu.open = false; });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.open) { menu.open = false; menu.querySelector('summary').focus(); }
});
document.querySelector('#year').textContent = String(new Date().getFullYear());

// Local event only: no third-party tracker or personal data is added.
document.querySelectorAll('[data-download]').forEach(link => link.addEventListener('click', () => {
  window.dispatchEvent(new CustomEvent('dothis:cta', {detail: {event: 'homepage_app_store_click', sport: activeSport, location: link.dataset.ctaLocation}}));
}));
