import Image from "next/image";
import styles from "./page.module.css";
import Test from "./Test";
import Link from "next/link";
import { Suspense } from "react";
import { displayGenres } from "@/lib/genres";

export default function Home() {
  console.log(displayGenres);
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Suspense fallback={<div>loading...</div>}>
          <Test />
        </Suspense>
        <Link href="/edit-writing">EditWriting</Link>
      </main>
    </div>
  );
}
