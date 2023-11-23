const butInstall = document.getElementById('buttonInstall');
// Initialize deferredPrompt for use later to show browser install prompt.
let deferredPrompt;

// Logic for installing the PWA
//an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    butInstall.classList.remove('hidden');
    butInstall.textContent = 'Install Me';
    // butInstall.classList.toggle('hidden', false);
});

// Implement a click event handler on the `butInstall` element

butInstall.addEventListener('click', async () => {
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const outcome = await deferredPrompt.userChoice;
    console.log('User response to the install prompt:', outcome);
    // prompt has been used, set to null
    deferredPrompt = null;

    butInstall.classList.add('hidden');
    // const promptEvent = window.deferredPrompt;
    // if (promptEvent) {
    //     promptEvent.prompt();
    //     window.deferredPrompt = null;
    //     butInstall.classList.toggle('hidden', true);
    // }
});


// handler for the `appinstalled` event
// window.addEventListener('appinstalled', (event) => {
//     console.log('JATE was installed.', event);
window.addEventListener('appinstalled', () => {
    // Clear the deferredPrompt so it can be garbage collected
    // deferredPrompt = null;
    console.log('JATE was installed.');
    // change button text to indicate app was installed
    deferredPrompt = null;
});


// https://stackoverflow.com/questions/72343203/how-to-add-custom-install-button-for-pwa
//https://web.dev/articles/customize-install