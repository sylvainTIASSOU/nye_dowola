import Image from "next/image";
import {ModeToggle} from "@/components/ModeToggle";

export default function Home() {
  return (
    <main className={"flex items-center justify-center"}>
      <ModeToggle/>
    </main>
  );
}
