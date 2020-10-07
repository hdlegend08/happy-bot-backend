import * as mongoose from 'mongoose';

export const ChatHistorySchema = new mongoose.Schema(
  {
    encodetype: String,
    bot_id: String,
    call_id: String,
    campaign_id: String,
    transaction_id: String,
    status: String,
    time: String,
    type: String,
    begin_at: Number,
    end_at: Number,
    flow: Array,
    called: String,
    caller: String,
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);
