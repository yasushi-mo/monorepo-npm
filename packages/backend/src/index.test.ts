import { describe, it, expect } from "vitest";
import request from "supertest";
import express from "express";
import type { User, ApiResponse } from "@monorepo-npm/shared";

/** モックのExpressアプリケーション */
const app = express();
app.use(express.json());

const sampleUsers: User[] = [
  {
    id: "1",
    name: "田中太郎",
    email: "tanaka@example.com",
    createdAt: new Date("2023-01-01"),
  },
];

app.get("/api/users", (req, res) => {
  res.json({
    success: true,
    data: sampleUsers,
  });
});

describe("Backend API", () => {
  it("GET /api/users should return a list of users", async () => {
    const res = await request(app).get("/api/users");
    const responseBody: ApiResponse<User[]> = res.body;

    expect(res.status).toBe(200);
    expect(responseBody.success).toBe(true);
    if (responseBody.data) {
      expect(responseBody.data).toHaveLength(1);
      expect(responseBody.data[0].name).toBe("田中太郎");
    }
  });
});
