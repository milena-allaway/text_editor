const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
//set up event handler for beforeinstallprompt event,
//make install button visible and set text to 'Install JATE'
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    butInstall.style.visibility = 'visible';
    butInstall.textContent = 'Install JATE';
});

// TODO: Implement a click event handler on the `butInstall` element
//add event handler for click event on install button,
//call prompt() on the event to trigger the install prompt
// set the install button to disabled to prevent multiple installations
//and change text to 'Installed'
butInstall.addEventListener('click', (event) => {
        event.prompt();
        butInstall.setAttribute('disabled', true);
        butInstall.textContent = 'Installed';
    });

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('JATE was installed.', event);
});
