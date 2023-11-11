import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OpenAiApiService {

  private apiUrl = "http://localhost:3000"

  constructor(private http: HttpClient) { }

  public sendMessage(message: string) {
    return this.http.post<any>(`${this.apiUrl}/chat`, { message });
  }
}