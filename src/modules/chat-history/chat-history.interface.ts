import { Document } from 'mongoose';

export interface ChatHistory extends Document {
  encodetype: string,
  bot_id: string,
  call_id: string,
  campaign_id: string,
  transaction_id: string,
  status: string,
  time: string,
  type: string,
  begin_at: number,
  end_at: number,
  flow: Array<any>,
  called: string,
  caller: string,
  created_at: any
}
