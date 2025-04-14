const DISCORD_BOT_TOKEN "MTMzNzA1NDAyNTEyMzg4OTE5Mw.GRs-hv.ZcGz0msP4odGLsUb8UhqIvmONZRVmwmMDIzN-4";
const OPENROUTER_API_KEY = "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";


const MODEL = "anthropic/claude-3.5-haiku-20241022";
 // Other options: "gpt-3.5-turbo", "gemini-pro", "claude-2"


client.once('ready', () => {
    console.log(✅ Logged in as ${client.user.tag}!);
});

async function getAIResponse(userQuestion) {
    try {
        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: MODEL, // Choose a free model
                messages: [{ role: "user", content: userQuestion }]
            },
            {
                headers: {
                    "Authorization": Bearer ${OPENROUTER_API_KEY},
                    "Content-Type": "application/json"
                }
            }
        );

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error("❌ OpenRouter API Error:", error.response ? error.response.data : error);
        return "❌ Error processing request. Check logs for details.";
    }
}

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content.startsWith("!ask")) {
        const userQuestion = message.content.slice(5).trim();
        if (!userQuestion) {
            message.channel.send("❌ Please ask a question after '!ask'.");
            return;
        }

        const aiReply = await getAIResponse(userQuestion);
        message.channel.send(aiReply);
    }
});

client.login(DISCORD_BOT_TOKEN);