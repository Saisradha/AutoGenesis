import Workspace from "@/components/Workspace";

export const metadata = {
  title: "Workspace | AutoGenesis AI",
  description: "Experience the AutoGenesis AI command center.",
};

export default function WorkspacePage() {
  return (
    <main className="min-h-screen">
      <Workspace />
    </main>
  );
}
