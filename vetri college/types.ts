
export interface FeatureItem {
  id: string;
  number: string;
  title: string;
  icon: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
