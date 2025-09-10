"use client";

import { useParams } from "next/navigation";

export default function EditPage() {
  const { id } = useParams();

  return (
    <div>
      <h1>Edit Contact</h1>
      <p>Contact ID: {id}</p>
    </div>
  );
}
