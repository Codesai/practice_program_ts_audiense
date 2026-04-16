export interface CommunicationTerminal {
  restockOrder: () => void;
  emergencyAlert: () => void;
}