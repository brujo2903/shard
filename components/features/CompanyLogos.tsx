import Image from 'next/image';

export function CompanyLogos() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">Trusted by Industry Leaders</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-50">
          {[1, 2, 3, 4].map((id) => (
            <div key={id} className="relative h-12">
              <Image
                src={`https://picsum.photos/seed/${id}/200/100`}
                alt={`Company ${id}`}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}