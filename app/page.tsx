"use client";

import { init, id } from "@instantdb/react";
// import { init, id } from "@instantdb/admin";
import schema from "@/instant.schema";

const db = init({
  appId: process.env.NEXT_PUBLIC_INSTANT_APP_ID!,
  schema,
});

// const db = init({
//   appId: process.env.NEXT_PUBLIC_INSTANT_APP_ID,
//   adminToken: process.env.NEXT_PUBLIC_ADMIN_TOKEN,
// });

export default function Home() {
  const query = { message: {} };
  const { isLoading, error, data } = db.useQuery(query);
  const create = async () => {
    await db.transact(
      db.tx.message[id()].update({ text: crypto.randomUUID() })
    );
  };
  const Del = async (Id: string) => {
    await db.transact(db.tx.message[Id].delete());
  };
  return (
    <div className="flex flex-col">
      <div>
        <button onClick={create}>create</button>
      </div>
      <div>
        {data?.message.map((message, index) => {
          return (
            <div className="flex gap-2">
              <div key={`${message.id}-${index}`}>{message.text}</div>
              <div>
                <button onClick={() => Del(message.id)}>Del</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
