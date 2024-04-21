import { ChangeEvent, useContext } from "react";
import { TKeySound, TypewriterContext } from "../contexts/typewriter-context";
import { motion } from 'framer-motion';
import LiveblocksProvider from "@liveblocks/yjs";
import { useEffect, useMemo, useState } from "react";
import { createEditor, Editor, Transforms } from "slate";
import { Editable, Slate, withReact } from "slate-react";
import { withYjs, YjsEditor } from "@slate-yjs/core";
import * as Y from "yjs";
import { useRoom } from "../liveblocks.config";

const KeySoundPath: Record<TKeySound, string> = {
  "hard": "/sounds/key-hard.wav",
  "subtle": "/sounds/key-subtle.wav"
}

export default function Typearea() {
  const room = useRoom();
  const [connected, setConnected] = useState(false);
  const [sharedType, setSharedType] = useState<Y.XmlText>();
  const [provider, setProvider] = useState<any>();
  const { keySound, content, setContent, isTypearea } = useContext(TypewriterContext);

  // Set up Liveblocks Yjs provider
  useEffect(() => {
    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksProvider(room, yDoc);
    const sharedDoc = yDoc.get("slate", Y.XmlText) as Y.XmlText;
    yProvider.on("sync", setConnected);

    setSharedType(sharedDoc);
    setProvider(yProvider);

    return () => {
      yDoc?.destroy();
      yProvider?.off("sync", setConnected);
      yProvider?.destroy();
    };
  }, [room]);

  if (!connected || !sharedType || !provider) {
    return <div>Loading...</div>;
  }

  const playTypeSound = () => {
    const soundPath: string = KeySoundPath[keySound];
    const audio = new Audio(soundPath);
    audio.play();
    audio.volume = 0.3;
  };

  const autoResize = (event: ChangeEvent<HTMLTextAreaElement>) => {
    playTypeSound();
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
    setContent(textarea.value);
  };

  return <div className="typeArea-textarea-wrapper">
    {/* {isTypearea && <motion.textarea
      initial={{
        opacity: 0 as number,
        y: 120 as number
      }}
      animate={{
        opacity: 1 as number,
        y: 0 as number
      }}
      className="outline-none focus:outline-none text-lg font-medium bg-transparent w-full h-full resize-none"
      placeholder="Start typing your thoughts..."
      autoFocus
      onChange={autoResize}
      value={content}
    />} */}
    {isTypearea && <SlateEditor sharedType={sharedType} />}
  </div>
}

const emptyNode = {
  children: [{ text: "" }],
};

function SlateEditor({ sharedType }: { sharedType: Y.XmlText }) {

  const { keySound, content, setContent, isTypearea } = useContext(TypewriterContext);
  const editor = useMemo(() => {
    const e = withReact(withYjs(createEditor(), sharedType));

    // Ensure editor always has at least 1 valid child
    const { normalizeNode } = e;
    e.normalizeNode = (entry) => {
      const [node] = entry;

      if (!Editor.isEditor(node) || node.children.length > 0) {
        return normalizeNode(entry);
      }

      Transforms.insertNodes(editor, emptyNode, { at: [0] });
    };

    return e;
  }, []);

  const playTypeSound = () => {
    const soundPath: string = KeySoundPath[keySound];
    const audio = new Audio(soundPath);
    audio.play();
    audio.volume = 0.3;
  };

  const autoResize = (event: ChangeEvent<HTMLTextAreaElement>) => {
    playTypeSound();
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
    setContent(textarea.value);
  };

  useEffect(() => {
    YjsEditor.connect(editor);
    return () => YjsEditor.disconnect(editor);
  }, [editor]);

  return (
    <div>
      <div>
        <Slate editor={editor} initialValue={[emptyNode]}>
          {/* <Editable placeholder="Start typing here..." /> */}
          <motion.textarea
            initial={{
              opacity: 0 as number,
              y: 120 as number
            }}
            animate={{
              opacity: 1 as number,
              y: 0 as number
            }}
            className="outline-none focus:outline-none text-lg font-medium bg-transparent w-full h-full resize-none"
            placeholder="Start typing your thoughts..."
            autoFocus
            onChange={autoResize}
            value={content}
          />
        </Slate>
      </div>
    </div>
  );
}
