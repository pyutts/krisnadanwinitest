import { NextResponse } from 'next/server';
import { getMessages, addMessage } from '@/lib/db';
import { Message, MessageResult } from '@/lib/types';

export async function GET() {
  try {
    const messages = await getMessages();

    // Konversi created_at ke Date jika masih string
    const formattedMessages: Message[] = messages.map((msg) => ({
      ...msg,
      created_at: new Date(msg.created_at),
    }));

    return NextResponse.json(formattedMessages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, message } = await request.json();

    if (!name || !message) {
      return NextResponse.json({ error: 'Name and message are required' }, { status: 400 });
    }

    const result: MessageResult = await addMessage(name, message);

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Error adding message:', error);
    return NextResponse.json({ error: 'Failed to add message' }, { status: 500 });
  }
}
