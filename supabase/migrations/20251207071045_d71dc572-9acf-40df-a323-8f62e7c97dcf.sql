-- Add UPDATE policy for chat_messages
CREATE POLICY "Users can update their chat messages" ON chat_messages
  FOR UPDATE USING (EXISTS (
    SELECT 1 FROM conversations 
    WHERE conversations.id = chat_messages.conversation_id 
    AND conversations.user_id = auth.uid()
  ));

-- Add DELETE policy for chat_messages
CREATE POLICY "Users can delete their chat messages" ON chat_messages
  FOR DELETE USING (EXISTS (
    SELECT 1 FROM conversations 
    WHERE conversations.id = chat_messages.conversation_id 
    AND conversations.user_id = auth.uid()
  ));