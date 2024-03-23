import Image from "next/image";
import styles from "./page.module.css";

import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

export default async function Home() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  const { data } = await supabase.from('todos').select()

  return (
    <main className={styles.main}>
      <p>Content</p>
    </main>
  );
}
