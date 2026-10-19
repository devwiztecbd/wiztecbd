"use client";

import { useEffect, useRef } from "react";
import { trackVisitor } from "@/utilities/api";

export default function AnalyticsTracker() {
  const isTracked = useRef(false);

  useEffect(() => {
    if (isTracked.current) return;
    isTracked.current = true;

    const track = async () => {
      try {
        const existingVisitorId = localStorage.getItem("visitorId");
        let visitorId = existingVisitorId;
        
        if (!visitorId) {
          visitorId = crypto.randomUUID();
          // Save immediately to avoid race conditions
          localStorage.setItem("visitorId", visitorId);
        }

        const data = await trackVisitor(
          {},
          {
            headers: {
              "x-visitor-id": visitorId,
            },
          }
        );
        
        const returnedId = data?.visitor?.visitorId;
        
        // Only update local storage if the server returned a noticeably different ID
        if (returnedId && returnedId !== visitorId) {
          localStorage.setItem("visitorId", returnedId);
        }
      } catch (error) {
        console.error("Failed to track visitor analytics:", error);
      }
    };

    track();
  }, []);

  return null;
}
