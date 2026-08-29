export default function PageTitle({ title }: { title: string }) {
  return (
    <div className="mx-auto max-w-[1440px] px-[70px] pb-10 pt-16 max-lg:px-8">
      <h1 className="font-serif text-5xl text-ink">{title}</h1>
    </div>
  );
}
