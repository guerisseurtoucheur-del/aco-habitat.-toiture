"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-draw"
import "leaflet-draw/dist/leaflet.draw.css"
import {
  Layers,
  Camera,
  Ruler,
  Maximize2,
  Trash2,
  Map as MapIcon,
  Mountain,
  Landmark,
} from "lucide-react"

/* ── IGN tile URLs (free, no API key) ── */
const IGN_ORTHO =
  "https://data.geopf.fr/wmts?service=WMTS&request=GetTile&version=1.0.0&tilematrixset=PM&tilematrix={z}&tilecol={x}&tilerow={y}&layer=ORTHOIMAGERY.ORTHOPHOTOS&format=image/jpeg&style=normal"
const IGN_PLAN =
  "https://data.geopf.fr/wmts?service=WMTS&request=GetTile&version=1.0.0&tilematrixset=PM&tilematrix={z}&tilecol={x}&tilerow={y}&layer=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&format=image/png&style=normal"
const IGN_CADASTRE =
  "https://data.geopf.fr/wmts?service=WMTS&request=GetTile&version=1.0.0&tilematrixset=PM&tilematrix={z}&tilecol={x}&tilerow={y}&layer=CADASTRALPARCELS.PARCELLAIRE_EXPRESS&format=image/png&style=normal"

const ATTRIBUTION = "&copy; <a href='https://www.ign.fr'>IGN</a>"

/* ── Measurement helpers ── */
function calcPolygonArea(latlngs: L.LatLng[]): number {
  // Shoelace formula on projected coordinates for decent accuracy
  if (latlngs.length < 3) return 0
  let area = 0
  for (let i = 0; i < latlngs.length; i++) {
    const j = (i + 1) % latlngs.length
    // Use UTM-like projection: multiply by earth params
    const xi = latlngs[i].lng * Math.cos((latlngs[i].lat * Math.PI) / 180) * 111320
    const yi = latlngs[i].lat * 110540
    const xj = latlngs[j].lng * Math.cos((latlngs[j].lat * Math.PI) / 180) * 111320
    const yj = latlngs[j].lat * 110540
    area += xi * yj - xj * yi
  }
  return Math.abs(area / 2)
}

function calcPolylineLength(latlngs: L.LatLng[]): number {
  let total = 0
  for (let i = 1; i < latlngs.length; i++) {
    total += latlngs[i - 1].distanceTo(latlngs[i])
  }
  return total
}

export type MapMeasurement = {
  type: "area" | "length"
  value: number
  unit: string
}

export type MapCaptureData = {
  imageBase64: string
  bounds: { north: number; south: number; east: number; west: number }
  center: { lat: number; lng: number }
  zoom: number
  measurements: MapMeasurement[]
}

type LayerMode = "satellite" | "plan" | "cadastre"

export default function LeafletMap({
  center,
  zoom = 20,
  onCapture,
  onMeasurementsChange,
  className = "",
}: {
  center: { lat: number; lng: number }
  zoom?: number
  onCapture?: (data: MapCaptureData) => void
  onMeasurementsChange?: (measurements: MapMeasurement[]) => void
  className?: string
}) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const tileLayerRef = useRef<L.TileLayer | null>(null)
  const cadastreLayerRef = useRef<L.TileLayer | null>(null)
  const drawnItemsRef = useRef<L.FeatureGroup | null>(null)
  const drawControlRef = useRef<L.Control.Draw | null>(null)

  const [activeLayer, setActiveLayer] = useState<LayerMode>("satellite")
  const [showCadastre, setShowCadastre] = useState(false)
  const [measurements, setMeasurements] = useState<MapMeasurement[]>([])
  const [isCapturing, setIsCapturing] = useState(false)
  const [drawMode, setDrawMode] = useState<"none" | "polygon" | "polyline">("none")
  const [showLayerMenu, setShowLayerMenu] = useState(false)

  const drawHandlerRef = useRef<L.Draw.Polygon | L.Draw.Polyline | null>(null)

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return

    // Fix default marker icons
    delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
      iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    })

    const map = L.map(mapContainerRef.current, {
      center: [center.lat, center.lng],
      zoom,
      zoomControl: false,
      attributionControl: true,
    })

    // Add zoom control top-right
    L.control.zoom({ position: "topright" }).addTo(map)

    // Base tile layer (satellite by default)
    const tileLayer = L.tileLayer(IGN_ORTHO, {
      maxZoom: 21,
      maxNativeZoom: 20,
      attribution: ATTRIBUTION,
    }).addTo(map)

    tileLayerRef.current = tileLayer

    // Drawn items layer for measurements
    const drawnItems = new L.FeatureGroup()
    map.addLayer(drawnItems)
    drawnItemsRef.current = drawnItems

    // Listen for draw events
    map.on(L.Draw.Event.CREATED, (e: L.LeafletEvent) => {
      const event = e as L.DrawEvents.Created
      const layer = event.layer
      drawnItems.addLayer(layer)

      let measurement: MapMeasurement | null = null

      if (layer instanceof L.Polygon) {
        const latlngs = (layer.getLatLngs()[0] as L.LatLng[])
        const area = calcPolygonArea(latlngs)
        measurement = { type: "area", value: Math.round(area * 100) / 100, unit: "m2" }

        // Add label on polygon
        const center = layer.getBounds().getCenter()
        L.marker(center, {
          icon: L.divIcon({
            className: "leaflet-measurement-label",
            html: `<span>${area.toFixed(1)} m&sup2;</span>`,
            iconSize: [100, 24],
            iconAnchor: [50, 12],
          }),
        }).addTo(drawnItems)
      } else if (layer instanceof L.Polyline && !(layer instanceof L.Polygon)) {
        const latlngs = layer.getLatLngs() as L.LatLng[]
        const length = calcPolylineLength(latlngs)
        measurement = { type: "length", value: Math.round(length * 100) / 100, unit: "m" }

        const mid = latlngs[Math.floor(latlngs.length / 2)]
        L.marker(mid, {
          icon: L.divIcon({
            className: "leaflet-measurement-label",
            html: `<span>${length.toFixed(1)} m</span>`,
            iconSize: [80, 24],
            iconAnchor: [40, 12],
          }),
        }).addTo(drawnItems)
      }

      if (measurement) {
        setMeasurements((prev) => {
          const next = [...prev, measurement]
          onMeasurementsChange?.(next)
          return next
        })
      }

      setDrawMode("none")
    })

    map.on(L.Draw.Event.DRAWSTOP, () => {
      setDrawMode("none")
    })

    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Update center when props change
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView([center.lat, center.lng], zoom, { animate: true })
    }
  }, [center.lat, center.lng, zoom])

  // Switch base tile layer
  useEffect(() => {
    if (!mapRef.current || !tileLayerRef.current) return
    const map = mapRef.current
    map.removeLayer(tileLayerRef.current)

    const url = activeLayer === "satellite" ? IGN_ORTHO : activeLayer === "plan" ? IGN_PLAN : IGN_ORTHO
    const newLayer = L.tileLayer(url, { maxZoom: 21, maxNativeZoom: 20, attribution: ATTRIBUTION }).addTo(map)
    tileLayerRef.current = newLayer
  }, [activeLayer])

  // Toggle cadastre overlay
  useEffect(() => {
    if (!mapRef.current) return
    const map = mapRef.current

    if (showCadastre && !cadastreLayerRef.current) {
      cadastreLayerRef.current = L.tileLayer(IGN_CADASTRE, {
        maxZoom: 21,
        maxNativeZoom: 20,
        attribution: ATTRIBUTION,
        opacity: 0.7,
      }).addTo(map)
    } else if (!showCadastre && cadastreLayerRef.current) {
      map.removeLayer(cadastreLayerRef.current)
      cadastreLayerRef.current = null
    }
  }, [showCadastre])

  // Start drawing polygon
  const startDrawPolygon = useCallback(() => {
    if (!mapRef.current) return
    if (drawHandlerRef.current) {
      (drawHandlerRef.current as L.Draw.Polygon).disable()
    }
    const handler = new L.Draw.Polygon(mapRef.current, {
      shapeOptions: {
        color: "#3b82f6",
        weight: 2,
        fillColor: "#3b82f6",
        fillOpacity: 0.15,
      },
    })
    handler.enable()
    drawHandlerRef.current = handler
    setDrawMode("polygon")
  }, [])

  // Start drawing polyline
  const startDrawPolyline = useCallback(() => {
    if (!mapRef.current) return
    if (drawHandlerRef.current) {
      (drawHandlerRef.current as L.Draw.Polyline).disable()
    }
    const handler = new L.Draw.Polyline(mapRef.current, {
      shapeOptions: {
        color: "#f59e0b",
        weight: 2,
        dashArray: "6, 4",
      },
    })
    handler.enable()
    drawHandlerRef.current = handler
    setDrawMode("polyline")
  }, [])

  // Clear all drawings
  const clearDrawings = useCallback(() => {
    if (drawnItemsRef.current) {
      drawnItemsRef.current.clearLayers()
    }
    setMeasurements([])
    onMeasurementsChange?.([])
    setDrawMode("none")
  }, [onMeasurementsChange])

  // Capture map as image
  const captureMap = useCallback(async () => {
    if (!mapRef.current || !mapContainerRef.current) return
    setIsCapturing(true)

    try {
      // Use html2canvas to capture the map container
      const html2canvas = (await import("html2canvas")).default
      const canvas = await html2canvas(mapContainerRef.current, {
        useCORS: true,
        allowTaint: true,
        scale: 2,
        logging: false,
        backgroundColor: null,
      })

      const imageBase64 = canvas.toDataURL("image/jpeg", 0.9)
      const bounds = mapRef.current.getBounds()
      const mapCenter = mapRef.current.getCenter()

      onCapture?.({
        imageBase64,
        bounds: {
          north: bounds.getNorth(),
          south: bounds.getSouth(),
          east: bounds.getEast(),
          west: bounds.getWest(),
        },
        center: { lat: mapCenter.lat, lng: mapCenter.lng },
        zoom: mapRef.current.getZoom(),
        measurements,
      })
    } catch (err) {
      console.error("Capture failed:", err)
    } finally {
      setIsCapturing(false)
    }
  }, [measurements, onCapture])

  return (
    <div className={`relative flex flex-col ${className}`}>
      {/* Map container */}
      <div
        ref={mapContainerRef}
        className="relative z-0 w-full flex-1"
        style={{ background: "var(--color-card)", minHeight: "400px" }}
      />

      {/* Custom toolbar overlay */}
      <div className="absolute top-3 left-3 z-[1000] flex flex-col gap-2">
        {/* Layer switcher */}
        <div className="relative">
          <button
            onClick={() => setShowLayerMenu(!showLayerMenu)}
            className="flex items-center gap-2 rounded-lg border border-border bg-card/95 px-3 py-2 text-xs font-medium text-foreground shadow-lg backdrop-blur-md transition-colors hover:bg-secondary"
          >
            <Layers size={14} />
            <span className="hidden sm:inline">Couches</span>
          </button>
          {showLayerMenu && (
            <div className="absolute top-full left-0 mt-1 w-44 rounded-xl border border-border bg-card p-2 shadow-xl backdrop-blur-md">
              <button
                onClick={() => { setActiveLayer("satellite"); setShowLayerMenu(false) }}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs transition-colors ${activeLayer === "satellite" ? "bg-primary/20 text-primary" : "text-foreground hover:bg-secondary"}`}
              >
                <Mountain size={12} />
                Satellite IGN
              </button>
              <button
                onClick={() => { setActiveLayer("plan"); setShowLayerMenu(false) }}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs transition-colors ${activeLayer === "plan" ? "bg-primary/20 text-primary" : "text-foreground hover:bg-secondary"}`}
              >
                <MapIcon size={12} />
                Plan IGN
              </button>
              <div className="my-1 border-t border-border" />
              <button
                onClick={() => { setShowCadastre(!showCadastre); setShowLayerMenu(false) }}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs transition-colors ${showCadastre ? "bg-primary/20 text-primary" : "text-foreground hover:bg-secondary"}`}
              >
                <Landmark size={12} />
                Cadastre {showCadastre ? "(actif)" : ""}
              </button>
            </div>
          )}
        </div>

        {/* Measurement tools */}
        <button
          onClick={startDrawPolygon}
          className={`flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-medium shadow-lg backdrop-blur-md transition-colors ${drawMode === "polygon" ? "bg-primary text-primary-foreground" : "bg-card/95 text-foreground hover:bg-secondary"}`}
        >
          <Maximize2 size={14} />
          <span className="hidden sm:inline">Surface</span>
        </button>
        <button
          onClick={startDrawPolyline}
          className={`flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-medium shadow-lg backdrop-blur-md transition-colors ${drawMode === "polyline" ? "bg-accent text-accent-foreground" : "bg-card/95 text-foreground hover:bg-secondary"}`}
        >
          <Ruler size={14} />
          <span className="hidden sm:inline">Longueur</span>
        </button>
        {measurements.length > 0 && (
          <button
            onClick={clearDrawings}
            className="flex items-center gap-2 rounded-lg border border-destructive/50 bg-card/95 px-3 py-2 text-xs font-medium text-destructive shadow-lg backdrop-blur-md transition-colors hover:bg-destructive/10"
          >
            <Trash2 size={14} />
            <span className="hidden sm:inline">Effacer</span>
          </button>
        )}
      </div>

      {/* Capture button */}
      <div className="absolute right-3 bottom-3 z-[1000]">
        <button
          onClick={captureMap}
          disabled={isCapturing}
          className="flex items-center gap-2 rounded-xl border border-primary/50 bg-primary px-4 py-2.5 text-xs font-bold text-white shadow-lg transition-all hover:bg-primary/90 disabled:opacity-50"
        >
          {isCapturing ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <Camera size={14} />
          )}
          {isCapturing ? "Capture..." : "Capturer et analyser"}
        </button>
      </div>

      {/* Measurements panel */}
      {measurements.length > 0 && (
        <div className="absolute right-3 top-3 z-[1000] w-48 rounded-xl border border-border bg-card/95 p-3 shadow-lg backdrop-blur-md">
          <h4 className="mb-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Mesures
          </h4>
          <div className="flex flex-col gap-1.5">
            {measurements.map((m, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg bg-secondary/50 px-2.5 py-1.5">
                <span className="text-[10px] text-muted-foreground">
                  {m.type === "area" ? "Surface" : "Longueur"} {i + 1}
                </span>
                <span className="text-xs font-bold text-foreground">
                  {m.value.toFixed(1)} {m.unit === "m2" ? "m\u00B2" : "m"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
