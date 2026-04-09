type User = {
  id: number;
  name: string;
  age: number;
};

type Column<T> = {
  clave: keyof T;
  header: string;
};

type Props<T> = {
  data: T[];
  columns: Column<T>[];
};

function DataTable<T>({ data, columns }: Props<T>) {

  console.log(columns);
  if (data.length === 0) {
    return <p>No hay datos para mostrar.</p>;
  }

  return (
    <table   style={{
      width: "100%",
      borderCollapse: "collapse",
      border: "1px solid rgba(131, 131, 131, 0.33)",
      borderRadius: "8px",
      overflow: "hidden",
      fontSize: "14px",
      backgroundColor: "rgba(165, 172, 247, 0.04)",
    }}>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column.header}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, colIndex) => (
              <td key={colIndex}>{String(row[column.clave])}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const users: User[] = [
  { id: 1, name: "Oskar", age: 21 },
  { id: 2, name: "Anna", age: 25 },
  { id: 3, name: "Luis", age: 19 },
];

const columns: Column<User>[] = [
  { clave: "name", header: "Nombre" },
  { clave: "age", header: "Edad" },
];

function App() {

  return (
    <div style={{ padding: "20px" }}>
      <h1>Tabla</h1>
      <DataTable data={users} columns={columns} />
    </div>
  );
}

export default App;