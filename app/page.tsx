import { button as buttonStyles } from "@nextui-org/theme";
import { title, subtitle } from "@/app/components/primitives";
import NextLink from "next/link";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Empower Your</h1>
        <br />
        <h1 className={title()}>Software Development Skills</h1>
        <br />
        <h1 className={title()}>with </h1>
        <h1 className={title({ color: "violet" })}>Guidly</h1>
        <br />
        <h2 className={subtitle({ class: "mt-6" })}>
          Connecting University Students and Guiders Together
        </h2>
      </div>

      <div className="flex gap-3">
        <NextLink
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href="/student"
        >
          Student
        </NextLink>
        <NextLink
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href="/guide"
        >
          Guide
        </NextLink>
      </div>
    </section>
  );
}
