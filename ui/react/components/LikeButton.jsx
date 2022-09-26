import React, { useState } from "react";

export function LikeButton() {
  const [liked, setLiked] = useState(false);

  if (liked) {
    return <div>You've liked this</div>;
  }
  return <button onClick={() => setLiked(true)}>Like</button>;
}
