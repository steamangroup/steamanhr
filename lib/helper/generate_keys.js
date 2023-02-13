import crypto from "crypto";

import React from "react";

export default function Generatekeys() {
  const key1 = crypto.randomBytes(32).toString("hex");
  const key2 = crypto.randomBytes(32).toString("hex");
  console.log(key1);
  console.log("Second key");
  console.log(key2);
  return <div>generate_keys</div>;
}
