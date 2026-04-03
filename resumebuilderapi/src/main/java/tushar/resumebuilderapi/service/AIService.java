package tushar.resumebuilderapi.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.stereotype.Service;

@Service
public class AIService {

    private final ChatClient chatClient;

    public AIService(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    public String generateResumeContent(String prompt) {
        return chatClient.prompt()
                .user(prompt)
                .call()
                .content();
    }

    public String optimizeBulletPoint(String bulletPoint, String role) {
        String systemPrompt = "You are a professional resume writer. Optimize the following bullet point for a " + role + " position. Use strong action verbs and quantify achievements where possible.";
        return chatClient.prompt()
                .system(systemPrompt)
                .user(bulletPoint)
                .call()
                .content();
    }
}
