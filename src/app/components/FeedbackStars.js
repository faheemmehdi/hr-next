"use client";
import { useState } from "react";
import { Star } from "lucide-react";

export default function FeedbackStars({ gap = "gap-1" }) {
  const [rating, setRating] = useState(0); // selected rating
  const [hover, setHover] = useState(0);   // hover effect

  return (
    <div className={`flex items-center ${gap}`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= rating;  // permanently filled
        const isHovered = star <= hover;  // temporary hover

        return (
          <Star
            key={star}
            size={17}
            className={`cursor-pointer transition-colors ${
              isHovered || isFilled ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
          />
        );
      })}
    </div>
  );
}