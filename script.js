const API_KEY = "sk-orca-yK7qw47NHEWBzcmo6tHYtsIBFJNeOmXjnrngPeKi3Mq";

async function sendMessage() {

    const input = document.getElementById("prompt");
    const chat = document.getElementById("chat");

    const message = input.value;

    if (!message) return;

    chat.innerHTML += `<p><b>Ty:</b> ${message}</p>`;

    input.value = "";

    try {

        const response = await fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "deepseek/deepseek-chat",
                    messages: [
                        {
                            role: "user",
                            content: message
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        const reply =
            data.choices?.[0]?.message?.content ||
            "Brak odpowiedzi.";

        chat.innerHTML += `<p><b>AI:</b> ${reply}</p>`;

    } catch (error) {

        chat.innerHTML += `<p><b>Błąd:</b> ${error}</p>`;

    }

    chat.scrollTop = chat.scrollHeight;
}
