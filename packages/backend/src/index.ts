import express from "express";
import type { Express, Request, Response } from "express";
import cors from "cors";
import type { User, ApiResponse } from "@monorepo-npm/shared";

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// サンプルデータ
const sampleUsers: User[] = [
  {
    id: "1",
    name: "田中太郎",
    email: "tanaka@example.com",
    createdAt: new Date("2023-01-01"),
  },
  {
    id: "2",
    name: "佐藤花子",
    email: "sato@example.com",
    createdAt: new Date("2023-01-02"),
  },
];

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello from backend!" });
});

app.get("/api/users", (req: Request, res: Response<ApiResponse<User[]>>) => {
  res.json({
    success: true,
    data: sampleUsers,
  });
});

app.get("/api/users/:id", (req: Request, res: Response<ApiResponse<User>>) => {
  const { id } = req.params;
  const user = sampleUsers.find((u) => u.id === id);

  if (!user) {
    res.status(404).json({
      success: false,
      error: "User not found",
    });
    return;
  }

  res.json({
    success: true,
    data: user,
  });
});

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
