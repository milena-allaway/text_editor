const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
//set up event handler for beforeinstallprompt event,

window.addEventListener('beforeinstallprompt', (event) => {
    // event.preventDefault();
    // deferredPrompt = event;
    // butInstall.style.visibility = 'visible';
    // butInstall.textContent = 'Install JATE';
    window.deferredPrompt = event;
    butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
//add event handler for click event on install button,
//call prompt() on the event to trigger the install prompt

butInstall.addEventListener('click', () => {
    // if (deferredPrompt) {
    //     deferredPrompt.prompt();
    //     deferredPrompt.userChoice.then((choiceResult) => {
    //         if (choiceResult.outcome === 'accepted') {
    //             console.log('User accepted the install prompt');
        
    //         } else {
    //             console.log('User dismissed the install prompt');
    //         }
    //     });
    //     deferredPrompt = null; //reset the deferredPrompt variable

    //     butInstall.setAttribute('disabled', true);
    //     butInstall.textContent = 'Installed';
    // };
    const promptEvent = window.deferredPrompt;
    if (promptEvent) {
        promptEvent.prompt();
        window.deferredPrompt = null;
        butInstall.classList.toggle('hidden', true);
    }
});


// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('JATE was installed.', event);
});

// https://stackoverflow.com/questions/72343203/how-to-add-custom-install-button-for-pwa
//https://web.dev/articles/customize-install