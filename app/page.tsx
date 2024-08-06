import { redirect } from "next/navigation";

export default function Home() {
  redirect('/daily-check');
  return (
    <main className="flex flex-col items-center justify-between py-16">
      <div className="z-10 w-full items-center justify-between text-sm lg:flex">
        <div className="text-center">
          <span className="text-4xl font-bold block">Monet Test Bot</span>
        </div>
        <p className="text-center mt-8 text-2xl text-primary">
          Tap to earn points!
        </p>


       
      </div>
    </main>
  );
}
