/*document.getElementById('claimButton').addEventListener('click', function() {
    const images = document.getElementById('images').files;
    const phone = document.getElementById('phone').value;
    const network = document.getElementById('network').value;
    const alertMessageDiv = document.getElementById('alertMessage');

    alertMessageDiv.textContent = '';
    alertMessageDiv.style.color = 'red';

    if (images.length > 20) {
        alertMessageDiv.textContent = 'You can only upload up to 20 images.';
        return;
    }

    if (phone.length !== 14 || !phone.startsWith('+234')) {
        alertMessageDiv.textContent = 'Phone number must be in the format +234 XXXXXXXXXX.';
        return;
    }

    // Display result below
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    const detailsDiv = document.createElement('div');
    detailsDiv.style.padding = '20px';
    detailsDiv.style.backgroundColor = '#000';
    detailsDiv.style.color = 'gold';
    detailsDiv.innerHTML = `
        <div class="logo">
            <h1><span class="bm">BM</span></h1>
        </div>
        <p>Phone: ${phone}</p>
        <p>Network: ${network}</p>
    `;
    resultDiv.appendChild(detailsDiv);

    for (let i = 0; i < images.length; i++) {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(images[i]);
        img.style.height = '100px';
        img.style.margin = '10px';
        resultDiv.appendChild(img);
    }

    // Generate image
    html2canvas(resultDiv, { scale: 2 }).then(canvas => {
        resultDiv.innerHTML = ''; // Clear the previous content
        resultDiv.appendChild(canvas);

        // Create and show "Send for Approval" button
        let sendButton = document.createElement('button');
        sendButton.id = 'sendButton';
        sendButton.textContent = 'Send for Approval';
        sendButton.addEventListener('click', function() {
            const dataUrl = canvas.toDataURL('image/png');
            sendToTelegram(dataUrl);
        });
        resultDiv.appendChild(sendButton);
    }).catch(err => {
        console.error('Error generating canvas:', err);
        alertMessageDiv.textContent = 'Error generating image.';
    });
});

function sendToTelegram(imageData) {
    const botToken = '7239108538:AAHeXQhHXINWCz7gnM6_m3-611BTepRGUJg';
    const chatId = '-1002170868247';
    const alertMessageDiv = document.getElementById('alertMessage');

    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('photo', dataURItoBlob(imageData));
    formData.append('caption', 'Here is the claimed reward details');

    fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            alertMessageDiv.textContent = 'Image sent successfully!';
            alertMessageDiv.style.color = 'green';
        } else {
            alertMessageDiv.textContent = 'Failed to send image: ' + data.description;
        }
    })
    .catch(error => {
        console.error('Error sending image:', error);
        alertMessageDiv.textContent = 'Error sending image.';
    });
}

function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
}*/

/*
document.getElementById('claimButton').addEventListener('click', handleClaim);

function handleClaim() {
    const images = document.getElementById('images').files;
    const phone = document.getElementById('phone').value;
    const network = document.getElementById('network').value;
    const username = document.getElementById('username').value;
    const alertMessageDiv = document.getElementById('alertMessage');

    alertMessageDiv.textContent = '';
    alertMessageDiv.style.color = 'red';

    if (images.length > 5) {
        showAlert('You can only upload up to 5 images.', 'error');
        return;
    }

    if (!isValidPhoneNumber(phone)) {
        showAlert('Phone number must be in the format +234 XXXXXXXX.', 'error');
        return;
    }

    displayDetails(phone, network, images, username);
    generateImage();
}

function showAlert(message, type) {
    const alertMessageDiv = document.getElementById('alertMessage');
    alertMessageDiv.textContent = message;
    alertMessageDiv.style.color = type === 'error' ? 'red' : 'green';
}

function isValidPhoneNumber(phone) {
    return phone.length === 14 && phone.startsWith('+234');
}

function displayDetails(phone, network, images, username) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    const detailsDiv = document.createElement('div');
    detailsDiv.innerHTML = `
        <div class="logo">
            <h1><span class="bm">BM</span></h1>
        </div>
        <p>Phone: ${phone}</p>
        <p>Network: ${network}</p>
        ${username ? `<p>Username: ${username}</p>` : ''}
    `;
    resultDiv.appendChild(detailsDiv);

    Array.from(images).forEach(image => {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(image);
        img.classList.add('uploaded-image');
        resultDiv.appendChild(img);
    });
}

function generateImage() {
    const resultDiv = document.getElementById('result');
    html2canvas(resultDiv).then(canvas => {
        resultDiv.innerHTML = ''; // Clear the previous content
        resultDiv.appendChild(canvas);
        showSendButton(canvas);
    }).catch(err => {
        console.error('Error generating canvas:', err);
        showAlert('Error generating image.', 'error');
    });
}

function showSendButton(canvas) {
    const resultDiv = document.getElementById('result');
    const sendButton = document.createElement('button');
    sendButton.id = 'sendButton';
    sendButton.textContent = 'Send for Approval';
    sendButton.addEventListener('click', () => sendToTelegram(canvas.toDataURL('image/png')));
    resultDiv.appendChild(sendButton);
}

function sendToTelegram(imageData) {
    const botToken = '7239108538:AAHeXQhHXINWCz7gnM6_m3-611BTepRGUJg';
    const chatId = '-1002170868247';
    const alertMessageDiv = document.getElementById('alertMessage');

    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('photo', dataURItoBlob(imageData));
    formData.append('caption', 'Here are the claimed reward details');

    fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            showAlert('Image sent successfully!', 'success');
        } else {
            showAlert(`Failed to send image: ${data.description}`, 'error');
        }
    })
    .catch(error => {
        console.error('Error sending image:', error);
        showAlert('Error sending image.', 'error');
    });
}

function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
}
*/
    
    document.addEventListener("DOMContentLoaded", function() {
    Telegram.WebApp.ready(); // Signal to Telegram that the web app is ready
    Telegram.WebApp.expand(); // Expand the web app to use the full height of the screen
});

/*
    document.addEventListener("DOMContentLoaded", function() {
        const tg = window.Telegram.WebApp;
        tg.ready();
        tg.BackButton.show();

        tg.onEvent('backButtonClicked', function() {
            onBackButtonClicked(); // Trigger the custom modal
        });
        */

/*

tg.onEvent('backButtonClicked', function() {
  onBackButtonClicked(); // Trigger the custom modal

    const shouldClose = confirm("Changes that you made may not be saved. Are you sure you want to close?");
            if (shouldClose) {
                tg.close();
});
*/



/*
const tg = window.Telegram.WebApp;

tg.onEvent('backButtonClicked', function() {
  onBackButtonClicked(); // Trigger the custom modal
});
*/





// Show the modal
function showModal() {
  document.getElementById("custom-modal").style.display = "block";
}

// Hide the modal
function closeModal() {
  document.getElementById("custom-modal").style.display = "none";
}

// Handle the Cancel button click
document.getElementById("modal-cancel").onclick = function() {
  closeModal(); // Close the modal
};

// Handle the OK button click
document.getElementById("modal-ok").onclick = function() {
  closeModal(); // Close the modal
  // Implement your closing logic here, e.g., tg.close();

    tg.close();
  console.log("Web app closed");
};

// Example of triggering the modal
function onBackButtonClicked() {
  showModal(); // Display the modal when the back button is clicked
}









        document.getElementById('claimButton').addEventListener('click', handleClaim);

function handleClaim() {
    const images = document.getElementById('images').files;
    const phone = document.getElementById('phone').value;
    const network = document.getElementById('network').value;
    const username = document.getElementById('username').value;
    const alertMessageDiv = document.getElementById('alertMessage');

    alertMessageDiv.textContent = '';
    alertMessageDiv.style.color = 'red';

    if (images.length > 5) {
        showAlert('You can only upload up to 5 images.', 'error');
        return;
    }

    if (!isValidPhoneNumber(phone)) {
        showAlert('Phone number must be in the format +234 XXXXXXXX.', 'error');
        return;
    }

    displayDetails(phone, network, images, username);
    generateImage();
}

function showAlert(message, type) {
    const alertMessageDiv = document.getElementById('alertMessage');
    alertMessageDiv.textContent = message;
    alertMessageDiv.style.color = type === 'error' ? 'red' : 'green';
}

function isValidPhoneNumber(phone) {
    return phone.length === 14 && phone.startsWith('+234');
}

function getCurrentDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    return `Date: ${date}, Time: ${time}`;
}

function displayDetails(phone, network, images, username) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    const detailsDiv = document.createElement('div');
    const currentDateTime = getCurrentDateTime();
    detailsDiv.innerHTML = `
        <div class="logo">
            <h1><span class="bm">BM</span></h1>
        </div>
        <p>Phone: ${phone}</p>
        <p>Network: ${network}</p>
        ${username ? `<p>Username: ${username}</p>` : ''}
        <p class="date-time">${currentDateTime}</p>
    `;
    resultDiv.appendChild(detailsDiv);

    Array.from(images).forEach(image => {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(image);
        img.classList.add('uploaded-image');
        resultDiv.appendChild(img);
    });
}

function generateImage() {
    const resultDiv = document.getElementById('result');
    html2canvas(resultDiv).then(canvas => {
        resultDiv.innerHTML = ''; // Clear the previous content
        resultDiv.appendChild(canvas);
        showSendButton(canvas);
    }).catch(err => {
        console.error('Error generating canvas:', err);
        showAlert('Error generating image.', 'error');
    });
}

function showSendButton(canvas) {
    const resultDiv = document.getElementById('result');
    const sendButton = document.createElement('button');
    sendButton.id = 'sendButton';
    sendButton.textContent = 'Send for Approval';
    sendButton.addEventListener('click', () => sendToTelegram(canvas.toDataURL('image/png')));
    resultDiv.appendChild(sendButton);
}

function sendToTelegram(imageData) {
    const botToken = '7239108538:AAHeXQhHXINWCz7gnM6_m3-611BTepRGUJg';
    const chatId = '-1002170868247';
    const alertMessageDiv = document.getElementById('alertMessage');

    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('photo', dataURItoBlob(imageData));
    formData.append('caption', 'Here are the claimed reward details');

    fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            showAlert('Image sent successfully!', 'success');
        } else {
            showAlert(`Failed to send image: ${data.description}`, 'error');
        }
    })
    .catch(error => {
        console.error('Error sending image:', error);
        showAlert('Error sending image.', 'error');
    });
}

function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
}

