import { NextResponse } from 'next/server';
import { getMessages, addMessage } from '@/lib/db';

export async function GET() {
  try {
    const messages = await getMessages();
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, message } = await req.json();
    const newMessage = await addMessage(name, message);
    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add message' }, { status: 500 });
  }
}
