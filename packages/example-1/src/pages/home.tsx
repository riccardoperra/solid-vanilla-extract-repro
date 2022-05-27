import {createSignal} from 'solid-js';
import {Box, Button} from "@ui/vanilla-extract";
import {wrapper} from "./home.css";
import {Scaffold} from "./components/Scaffold";

export default function Home() {
  const [count, setCount] = createSignal(0);

  return (
    <Scaffold>
      <h1 class="text-2xl font-bold">Home</h1>
      <p class="mt-4">This is the home page.</p>

      <div class="flex items-center space-x-2">
        <button
          class="border rounded-lg px-2 border-gray-900"
          onClick={() => setCount(count() - 1)}
        >
          -
        </button>

        <output class="p-10px">Count: {count}</output>

        <button
          class="border rounded-lg px-2 border-gray-900"
          onClick={() => setCount(count() + 1)}
        >
          +
        </button>

        <Button color={'test'}>This is my broken button</Button>

        <Box paddingLeft={2}>Box</Box>
      </div>
    </Scaffold>
  );
}
