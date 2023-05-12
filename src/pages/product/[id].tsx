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
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
    defaultPriceId: string;
  };
}

export default function product({ product }: IProductProps) {
  
  function handleBuyProduct(){
    console.log(product.defaultPriceId)
  }
  
  
  return (
    <ProductContainer>
      <ImageContainer>
        <Image
          src={product.imageUrl}
          width={520}
          height={480}
          alt=""
        />
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>
        <p>{product.description}</p>
        <button onClick={handleBuyProduct}>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      /* { params: { id: 'prod_Nq5dCWdyb4bbCs' }  } */
    ],
    // False: Vai da 404 se n passar o ID dos produtos em params
    // True: Vai tentar pegar o ID em params e vai tentar executar o method de baixo para gerar a versão static, mas tem um porém tem que esperar o method de baixo e dps vai executar o html, por esse motivo tem que esperar, fazer um loader
    // Pegar o loader. { isFallback } = userRouter
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params!.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(price.unit_amount! / 100),
        description: product.description,
        defaultPriceId: price.id
      },
    },
    revalidate: 60 * 60 * 1, // 1hours
  };
};
