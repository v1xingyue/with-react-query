import {
  QueryClient,
  QueryClientProvider,
  useQuery
} from "@tanstack/react-query"

const queryClient = new QueryClient()

function Example() {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("https://api.github.com/repos/TanStack/query").then((res) =>
        res.json()
      )
  })

  if (isPending) return "Loading..."

  if (error) return "An error has occurred: " + error.message

  return (
    <div
      style={{
        width: 500,
        height: 500,
        display: "flex",
        flexDirection: "column"
      }}>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{" "}
      <strong>✨ {data.stargazers_count}</strong>{" "}
      <strong>🍴 {data.forks_count}</strong>
    </div>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  )
}
