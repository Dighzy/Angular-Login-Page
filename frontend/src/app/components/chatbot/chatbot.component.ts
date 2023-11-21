import { Component } from '@angular/core';
import { OpenAiApiService } from '../../service/open-ai-api.service.service';
import { NgZone } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent {
  userMessage!: string;
  assistantReply!: string;
  chatMessages: { role: string, content: string }[] = [];

  constructor(
    private openAiApiService: OpenAiApiService , 
    private zone: NgZone,
    private authService: AuthService)
    {} 
  ngOnInit(): void {
    // this.userId = this.authService.userId;
  }

  sendMessage() {
    const userMessage = this.userMessage;
    this.chatMessages.push({ role: 'user', content: userMessage });
  
    // Exibe "Digitando..." enquanto aguarda a resposta da API
    this.displayTypingIndicator();
  
    this.openAiApiService.sendMessage(userMessage)
      .subscribe(res => {
        // Limpa o indicador de digitação quando a resposta da API é recebida
        this.clearTypingIndicator();
  
        this.assistantReply = res.reply;
        this.chatMessages.push({ role: 'assistant', content: this.assistantReply });
        this.userMessage = '';
      });
  }
  
  displayTypingIndicator() {
    this.chatMessages.push({ role: 'assistant', content: 'Digitando...' });
  }
  
  clearTypingIndicator() {
    // Remove a última mensagem "Digitando..."
    const typingMessageIndex = this.chatMessages.findIndex(message =>
      message.role === 'assistant' && message.content === 'Digitando...'
    );
    if (typingMessageIndex !== -1) {
      this.chatMessages.splice(typingMessageIndex, 1);
    }
  }
  
}