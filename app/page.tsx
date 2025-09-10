"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if(!input.password || !input.username){
      alert("please input all fields")
      return}
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login success:", data);

        // ✅ Redirect to dashboard (example)
        router.push("/dashboard");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className="min-h-[400px] pb-5 w-[600px] m-auto shadow-2xl rounded-[2rem] mt-20">
        <img className="w-[150px] pt-2 mx-auto" src="/mainflow.jpg" alt="Logo" />

        <div className="pl-[200px] pt-20">
          <div>
            <input
              name="username"
              value={input.username}
              onChange={handleChange}
              className="py-2 rounded border border-gray-700 outline-0 px-3"
              type="text"
              placeholder="Username"
            />
          </div>
          <div>
            <input
              name="password"
              value={input.password}
              onChange={handleChange}
              className="mt-5 py-2 rounded border border-gray-700 outline-0 px-3"
              type="password"
              placeholder="Password"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="hover:bg-blue-700 mx-auto block mt-3 w-fit border-2 border-blue-600 bg-blue-400 rounded py-3 px-5"
        >
          Submit
        </button>
      </div>
    </>
  );
}
