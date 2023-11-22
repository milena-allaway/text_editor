import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';

const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();

if (typeof editor === 'undefined') {
  loadSpinner();
}

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // register workbox service worker
  const workboxSW = new Workbox('./src-sw.js');
  workboxSW.register();
  console.log('ServiceWorker registration successful');
} else {
  console.error('Service workers are not supported in this browser.');
}

this.addEventListener('fetch', function (event) {
  // This fetch function is required for the SW to be detected and is intentionally empty
  // For a more robust, real-world SW example see: https://developers.google.com/web/fundamentals/primers/service-workers
});


