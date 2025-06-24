import { MapContext } from "@/contexts/map-context";
import { useContext } from "react";

export function useMap() {
  const context = useContext(MapContext);
  return context;
}
