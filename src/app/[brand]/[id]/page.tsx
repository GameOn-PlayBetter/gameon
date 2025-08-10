import { redirect } from "next/navigation";

export default function BrandCoachAliasPage({
  params,
}: {
  params: { brand: string; id: string };
}) {
  // Keeps your canonical route at /[brand]/coach/[id]
  // but allows /[brand]/[id] (e.g., /styleon/90)
  redirect(`/${params.brand}/coach/${params.id}`);
}