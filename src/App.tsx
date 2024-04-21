import { KeySoundSelect } from "./components/key-sound-select";
import Typearea from "./components/typearea";
import { RoomProvider } from './liveblocks.config';
import { ClientSideSuspense } from "@liveblocks/react";

export default function App() {
  return <main className="typewriter-app-container p-12 max-md:pt-28">
    <KeySoundSelect />
    <div className="typeArea-container">
      <RoomProvider id="my-room" initialPresence={{}}>
        <ClientSideSuspense fallback="Loading…">
          {() => <Typearea />}
        </ClientSideSuspense>
      </RoomProvider>
    </div>
  </main>
}