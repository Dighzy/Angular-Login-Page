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
    this.openAiApiService.sendMessage(this.userMessage)
      .subscribe(res => {
        this.assistantReply = res.reply;
        this.chatMessages.push({ role: 'assistant', content: this.assistantReply });
        this.userMessage = '';
        });
  }
}