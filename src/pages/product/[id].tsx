import { useRouter } from "next/router";
import { stripe } from "../lib/stripe";
import Image from "next/image";


import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "../styles/pages/product";
import { GetStaticPaths, GetStaticProps } from "next";
import Stripe from "stripe";


interface IProductProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string
  };
}


export default function product({ products }: IProductProps) {

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={products.imageUrl} width={520} height={480} alt={products.name} />
      </ImageContainer>

      <ProductDetails>
        <h1>{products.name}</h1>
        <span>{products.price}</span>
        <p>
          {products.description}
        </p>
        <button>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: {  }  }
    ],
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params!.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

    const price = product.default_price as Stripe.Price;

  return {
    props: {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price.unit_amount! / 100),
      description: product.description
    },
    revalidate: 60 * 60 * 1, // 1hours
  }
}
