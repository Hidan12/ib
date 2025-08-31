import axios from 'axios';
import { NextResponse } from 'next/server';

const URL_EXTERNA = process.env.URL_EXTERNA


export async function POST(req) {
  
    const body = await req.json();
    const { search } = body;

    const data = await axios.post(`${URL_EXTERNA}/search-destinations`,
      {search: search}, {
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json'
      }
    }

    )

    return NextResponse.json(data.data);
  
}
