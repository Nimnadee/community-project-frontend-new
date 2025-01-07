import { button as buttonStyles } from "@nextui-org/theme";
import { title, subtitle } from "@/app/components/primitives";
import NextLink from "next/link";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title({ color: "violet" })}>Frumose  </h1>
        <br />
        <h1 className={title()}>Resturent Management System </h1>
        <br />
        <br />

      </div>


    </section>
  );
}
