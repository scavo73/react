import { useState } from "react";

type User = {
  id: number;
  name: string;
  age: number;
};

type Column<T> = {
  key: keyof T;
  header: string;
};

type DataTableProps<T extends { id: number }> = {
  data: T[];
  columns: Column<T>[];
  editingId: number | null;
  draft: Partial<T>;
  onEdit: (row: T) => void;
  onChange: <K extends keyof T>(key: K, value: T[K]) => void;
};

function DataTable<T extends { id: number }>({
  data,
  columns,
  editingId,
  draft,
  onEdit,
  onChange,
}: DataTableProps<T>) {
  return (
    <table border={1} cellPadding={8} style={{ borderCollapse: "collapse" }}>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column.header}</th>
          ))}
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {data.map((row) => {
          const isEditing = row.id === editingId;

          return (
            <tr key={row.id}>
              {columns.map((column, index) => {
                if (isEditing && column.key !== "id") {
                  const value = draft[column.key] ?? row[column.key];

                  return (
                    <td key={index}>
                      <input
                        value={String(value)}
                        onChange={(e) => {
                          const rawValue = e.target.value;

                          if (typeof row[column.key] === "number") {
                            onChange(column.key, Number(rawValue) as T[keyof T]);
                          } else {
                            onChange(column.key, rawValue as T[keyof T]);
                          }
                        }}
                      />
                    </td>
                  );
                }

                return <td key={index}>{String(row[column.key])}</td>;
              })}

              <td>
                <button type="button" onClick={() => onEdit(row)}>
                  Edit
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

const initialUsers: User[] = [
  { id: 1, name: "Oskar", age: 21 },
  { id: 2, name: "Anna", age: 25 },
];

const columns: Column<User>[] = [
  { key: "name", header: "Name" },
  { key: "age", header: "Age" },
];

function App() {
  const [users] = useState<User[]>(initialUsers);

  // state that manages which row is being edited
  const [editingId, setEditingId] = useState<number | null>(null);

  // temporary editing state using Partial<T>
  const [draft, setDraft] = useState<Partial<User>>({});

  function startEdit(user: User) {
    setEditingId(user.id);
    setDraft({
      name: user.name,
      age: user.age,
    });
  }

  function handleChange<K extends keyof User>(key: K, value: User[K]) {
    setDraft((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Generic DataTable</h1>

      <DataTable
        data={users}
        columns={columns}
        editingId={editingId}
        draft={draft}
        onEdit={startEdit}
        onChange={handleChange}
      />
    </div>
  );
}

export default App;