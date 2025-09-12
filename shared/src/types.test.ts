import { describe, it, expect } from "vitest";
import type { User, ApiResponse } from "./types.js";

describe("Shared Types", () => {
  it("User type should be defined correctly", () => {
    const user: User = {
      id: "123",
      name: "Test User",
      email: "test@example.com",
      createdAt: new Date(),
    };
    expect(user.name).toBe("Test User");
  });

  it("ApiResponse type should handle success case", () => {
    const response: ApiResponse<string> = {
      success: true,
      data: "Success!",
    };
    expect(response.success).toBe(true);
    expect(response.data).toBe("Success!");
  });
});
