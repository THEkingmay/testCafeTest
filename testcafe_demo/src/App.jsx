import { useState } from "react";

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");
  const [load , setLoad] = useState(false)
  const handleLogin = async (e) => {
    e.preventDefault(); // ป้องกัน form submit รีเฟรชหน้า

    try {
      setLoad(true)
      const res = await fetch("http://localhost:3000/login", {
        method: "POST", // ต้องระบุ method
        headers: {
          "Content-Type": "application/json", // แก้ชื่อ header ให้ถูกต้อง
        },
        body: JSON.stringify({ username, password }), // แก้ชื่อ, syntax ของ JSON
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      setResult(data.message || "Login successful");
    } catch (err) {
      setResult(err.message || "เกิดข้อผิดพลาด");
    }finally{
      setLoad(false)
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4">
      <form className="flex flex-col gap-2" onSubmit={handleLogin}>
        <input
          type="text"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          id="loginBtn"
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
         {load ? 'กำลังล็อกอิน...' : 'ล็อกอิน'}
        </button>
      </form>

      <div id="result" className="mt-4 text-red-600 font-semibold">
        {result}
      </div>
    </div>
  );
}
