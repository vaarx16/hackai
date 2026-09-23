async function sendMessage() {
    const prompt = document.getElementById("prompt").value;
    const chat = document.getElementById("chat");

    chat.innerHTML += `<p><b>Ty:</b> ${prompt}</p>`;

    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt })
        });

        const data = await response.json();

        chat.innerHTML += `<p><b>AI:</b> ${data.reply}</p>`;
    } catch (error) {
        chat.innerHTML += `<p><b>Błąd:</b> ${error.message}</p>`;
    }

    document.getElementById("prompt").value = "";
}
