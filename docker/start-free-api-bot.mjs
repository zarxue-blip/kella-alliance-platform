import { spawn } from "node:child_process";

const processes = new Map();
let shuttingDown = false;

function start(name, args) {
  console.log(`[startup] Starting ${name}: node ${args.join(" ")}`);
  const child = spawn("node", args, {
    stdio: ["ignore", "inherit", "inherit"],
    env: process.env
  });

  processes.set(name, child);

  child.on("exit", (code, signal) => {
    processes.delete(name);
    if (shuttingDown) return;

    const reason = signal ? `signal ${signal}` : `code ${code}`;
    console.error(`[startup] ${name} exited with ${reason}. Stopping service so Render shows the real failure.`);
    shutdown(code && code > 0 ? code : 1);
  });

  return child;
}

function shutdown(code = 0) {
  shuttingDown = true;
  for (const child of processes.values()) {
    if (!child.killed) child.kill("SIGTERM");
  }
  setTimeout(() => process.exit(code), 1000).unref();
}

process.on("SIGTERM", () => shutdown(0));
process.on("SIGINT", () => shutdown(0));

start("api", ["backend/dist/server.js"]);
start("kella-bot", ["discord-bot/dist/index.js"]);
