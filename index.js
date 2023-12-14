import openai from "./config/open-ai.js";
import readlineSync from "readline-sync";
import colors from "colors";

async function main() {
  const chatHistory = [];
  console.log(colors.bold.green("Welcome to the Chatbot application!"));

  while (true) {
    const input = readlineSync.question(colors.yellow("You: "));

    if (input.toLowerCase() === "exit") {
      return;
    }

    try {
      const messages = chatHistory.map(([role, content]) => ({ role, content }));

      messages.push({ role: "user", content: input });

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
      });

      const completionText = completion.choices[0].message.content;
      console.log(colors.green("Bot: " + completionText));

      chatHistory.push(["user", input]);
      chatHistory.push(["assistant", completionText]);
    } catch (error) {
      console.log(colors.red(error));
    }
  }
}

main();
