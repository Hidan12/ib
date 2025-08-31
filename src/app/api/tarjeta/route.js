import axios from 'axios';
import { NextResponse } from 'next/server';

const URL_PSE = process.env.URL_PSE

export async function POST(req) {
  try {
    const body = await req.json();
    console.log(body);
    console.log(URL_PSE,"/api/tarjeta/status");
    
    const { data } = await axios.post(
      `${URL_PSE}/api/tarjeta/status`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error", error.message);

    return NextResponse.json(
      { error: "Ocurrió un error" },
      { status: 500 }
    );
  }
}
