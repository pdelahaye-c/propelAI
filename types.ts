export interface AudioConfig {
  sampleRate: number;
}

export enum AgentState {
  DISCONNECTED = 'DISCONNECTED',
  CONNECTING = 'CONNECTING',
  LISTENING = 'LISTENING',
  SPEAKING = 'SPEAKING',
  ERROR = 'ERROR'
}

export interface LeadData {
  name?: string;
  phone?: string;
  interest?: string;
  budget?: string;
}
