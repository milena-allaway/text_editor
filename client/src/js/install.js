// get the install button element
const butInstall = document.getElementById('buttonInstall');
// Initialize deferredPrompt for use later to show browser install prompt.
let deferredPrompt;

// Logic for installing the PWA
//an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    // make the install button visible
    butInstall.classList.remove('hidden');
    // Update the install button's text so that user knows they can install the PWA
    butInstall.textContent = 'Install Me';
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt and log result
    const outcome = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    // prompt has been used, set to null since it can't be used again
    deferredPrompt = null;
    // Hide the install button when the PWA has been installed.
    butInstall.classList.add('hidden');

});

// handler for the `appinstalled` event
window.addEventListener('appinstalled', () => {
    console.log('JATE was installed.');
    // clear the deferredPrompt, as it is no longer needed
    deferredPrompt = null;
});

//references:
// https://stackoverflow.com/questions/72343203/how-to-add-custom-install-button-for-pwa
//https://web.dev/articles/customize-install