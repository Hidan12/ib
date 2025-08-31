import axios from 'axios';
import { NextResponse } from 'next/server';

const URL_PSE = process.env.URL_PSE

export async function GET(req, context) {
  try {
    const params = await context.params;
    const { uniqId } = params;
    console.log(uniqId, "tessss");
    
    const { data } = await axios.post(
      `${URL_PSE}/api/tarjeta/status`,
      {
        "status": "consulta",
        "uniqid": uniqId
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    console.log(data);
    
    return NextResponse.json(data);
  } catch (error) {
  if (axios.isAxiosError(error)) {
    console.error("Error response status:", error.response?.status);
    console.error("Error response data:", error.response?.data);
    console.error("Error request:", error.request);
  } else {
    console.error("Unexpected error:", error);
  }

  return NextResponse.json(
    { error: "Ocurrió un error" },
    { status: 500 }
  );
}
}
