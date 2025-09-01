import React, { useEffect, useState } from "react";
import { User, ApiResponse } from "@monorepo-npm/shared";

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        const result: ApiResponse<User[]> = await response.json();

        if (result.success && result.data) {
          setUsers(result.data);
        } else {
          setError(result.error || "データの取得に失敗しました");
        }
      } catch (err) {
        setError("ネットワークエラーが発生しました");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>読み込み中...</div>;
  if (error) return <div>エラー: {error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>ユーザー一覧</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id} style={{ marginBottom: "10px" }}>
            <strong>{user.name}</strong> - {user.email}
            <br />
            <small>
              登録日: {new Date(user.createdAt).toLocaleDateString()}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
