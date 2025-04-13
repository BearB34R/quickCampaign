import Link from "next/link";
import Image from "next/image";
import { RocketPencil } from "./SVG";

export default function RocketButton({
  destination,
  decoration,
}: {
  destination: string;
  decoration: boolean;
}) {
  return (
    <Link href={destination} className="">
      {decoration ? (
        <div className="rotate-90">
          <RocketPencil />
        </div>
      ) : null}
    </Link>
  );
}
