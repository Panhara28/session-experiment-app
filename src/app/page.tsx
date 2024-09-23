import { Suspense } from "react";
import styles from "./page.module.css";
import { Form } from "./form";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className="p-10 space-y-5">

        <p className="italic max-w-xl">
          <u>How to test</u>: Login and refresh the page to see iron-session in
          action.
        </p>

        <div className="grid grid-cols-1 gap-4 p-10 border border-slate-500 rounded-md max-w-xl">
          <Suspense fallback={<p className="text-lg">Loading...</p>}>
            <Form />
          </Suspense>
        </div>

      </main>
    </div>
  );
}
