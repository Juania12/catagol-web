import Image from "next/image";

type NewsCardProps = {
  titulo: string;
  descripcion: string;
  imagen: string;
};

export default function NewsCard({
  titulo,
  descripcion,
  imagen,
}: NewsCardProps) {
  return (
    <article className="bg-white text-black rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition">

      <Image
        src={imagen}
        alt={titulo}
        width={600}
        height={300}
        className="w-full h-44 object-contain bg-white"
      />

      <div className="p-4">

        <h3 className="text-lg font-bold">
          {titulo}
        </h3>

        <p className="text-gray-600 mt-2">
          {descripcion}
        </p>

      </div>

    </article>
  );
}