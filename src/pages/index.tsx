import { Inter } from "next/font/google";
import { stripe } from "./lib/stripe";
import { GetStaticProps } from "next";
import Stripe from "stripe";import Image from "next/image";
import { HomeContainer, Product } from "./styles/pages/home";

const inter = Inter({ subsets: ["latin"] });


interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
  }[];
}

export default function Home({ products }: HomeProps) {
  return (
    <HomeContainer>
      {products.map((product) => {
        return (
          <Product key={product.id}>
            <Image src={product.imageUrl} width={520} height={480} alt={product.name} />
            <footer>
              <strong>{product.name}</strong>
              <span>{product.price}</span>
            </footer>
          </Product>
        );
      })}
    </HomeContainer>
  );
}

// getServerSideProps: O site só carrega se tiver isso. Roda a cada requisição feita, (req, res ...)
// getStaticProps: Mesma coisa do de cima, mas em produção. Não roda a cada requisição feita

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
    active: true,
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount! / 100),
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2,
  };
};
