import { NextRequest, NextResponse } from "next/server"
import { getWeatherHistory } from "@/lib/weather-history"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const lat = searchParams.get("lat")
  const lng = searchParams.get("lng")
  const days = searchParams.get("days")

  if (!lat || !lng) {
    return NextResponse.json(
      { error: "Latitude and longitude are required" },
      { status: 400 }
    )
  }

  const latitude = parseFloat(lat)
  const longitude = parseFloat(lng)
  const daysCount = days ? parseInt(days) : 30

  if (isNaN(latitude) || isNaN(longitude)) {
    return NextResponse.json(
      { error: "Invalid latitude or longitude" },
      { status: 400 }
    )
  }

  try {
    const history = await getWeatherHistory(latitude, longitude, daysCount)
    return NextResponse.json(history)
  } catch (error) {
    console.error("Weather history error:", error)
    return NextResponse.json(
      { error: "Failed to fetch weather history" },
      { status: 500 }
    )
  }
}
