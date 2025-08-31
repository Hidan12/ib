import { NextResponse } from 'next/server';

export async function GET(req) {
  const headers = {
    'x-forwarded-for': req.headers.get('x-forwarded-for') || '',
    'x-real-ip': req.headers.get('x-real-ip') || '',
    'cf-connecting-ip': req.headers.get('cf-connecting-ip') || '',
    'x-forwarded-host': req.headers.get('x-forwarded-host') || '',
    'x-original-host': req.headers.get('x-original-host') || '',
  };

  return NextResponse.json(headers);
}
