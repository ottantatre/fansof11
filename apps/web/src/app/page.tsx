import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  return (
    <main className="min-h-dvh flex items-center justify-center">
      <Card className="w-[520px]">
        <CardContent className="p-6 space-y-4">
          <h1 className="text-2xl font-bold">UI działa ✅</h1>
          <p className="opacity-80">shadcn/ui + Tailwind v4.</p>
          <div className="flex gap-3">
            <Button>Primary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="link">Link</Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
