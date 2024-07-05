document.addEventListener('DOMContentLoaded', () => {
    fetch('messages.csv')
        .then(response => response.text())
        .then(data => {
            const messages = data.split('\n').map(line => line.split(','));
            const messagesContainer = document.getElementById('messages');

            messages.forEach(([number, message]) => {
                if (number && message) {
                    const messageDiv = document.createElement('div');
                    messageDiv.classList.add('message');

                    const numberDiv = document.createElement('div');
                    numberDiv.classList.add('message-number');
                    numberDiv.textContent = number;

                    const textDiv = document.createElement('div');
                    textDiv.classList.add('message-text');
                    textDiv.textContent = message.trim();

                    messageDiv.appendChild(numberDiv);
                    messageDiv.appendChild(textDiv);

                    messageDiv.addEventListener('click', () => {
                        navigator.clipboard.writeText(message.trim());
                        messageDiv.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                            messageDiv.style.transform = 'scale(1)';
                        }, 200); // Reset scale after 200ms
                    });

                    messagesContainer.appendChild(messageDiv);
                }
            });
        });
});
