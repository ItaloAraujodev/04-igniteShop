import { useRouter } from "next/router";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "../styles/pages/product";

export default function product() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { query } = useRouter(); // Pegando o paramentro da URL, que no caso o ID

  return (
    <ProductContainer>
      <ImageContainer></ImageContainer>

      <ProductDetails>
        <h1>Camiseta X</h1>
        <span>RS 79,90</span>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium
          perspiciatis quisquam iusto autem, voluptatem itaque! Sit,
          reprehenderit necessitatibus veritatis sint qui eligendi odit beatae,
          molestias delectus quia, autem asperiores voluptatem!
        </p>
        <button>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  );
}
