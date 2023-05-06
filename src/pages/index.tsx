import { styled } from "./styles";
import { Inter } from "next/font/google";
import { HomeContainer, Product } from "./styles/pages/home";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

import camiseta1 from "../pages/assents/Camisetas/1.png";
import camiseta2 from "../pages/assents/Camisetas/2.png";
import camiseta3 from "../pages/assents/Camisetas/3.png";
import { stripe } from "./lib/stripe";
import { GetServerSideProps } from "next";
import Stripe from "stripe";

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
            <Image src={product.imageUrl} width={520} height={480} alt="" />
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

export const getServerSideProps: GetServerSideProps = async () => {
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
      price: price.unit_amount! / 100,
    };
  });

  return {
    props: {
      products,
    },
  };
};
