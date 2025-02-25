import { NextResponse } from 'next/server';
import { getMessages, addMessage } from '@/lib/db';
import { Message, MessageResult } from '@/lib/types';

export async function GET() {
  try {
    const messages: Message[] = await getMessages();
    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, message } = await request.json();
    const result: MessageResult = await addMessage(name, message);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error adding message:', error);
    return NextResponse.json({ error: 'Failed to add message' }, { status: 500 });
  }
}